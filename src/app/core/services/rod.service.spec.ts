import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RodService } from './rod.service';
import { FishingSession, SessionRod } from '../models';
import { fakeSessionModify } from './session-repository.fake';

describe('RodService', () => {
  let service: RodService;
  let sessionRepo: {
    put: ReturnType<typeof vi.fn>;
    getById: ReturnType<typeof vi.fn>;
    modify?: ReturnType<typeof vi.fn>;
  };
  let biteRepo: { countByRod: ReturnType<typeof vi.fn> };
  let fishSpottedRepo: { countByRod: ReturnType<typeof vi.fn> };
  let catchRepo: { getBySession: ReturnType<typeof vi.fn> };
  let historyRepo: { put: ReturnType<typeof vi.fn> };
  let sessionEvents: { record: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    sessionRepo = {
      put: vi.fn(async (s) => s),
      getById: vi.fn(async (id: string) => ({
        id,
        rods: [],
        sessionSpots: [],
      })),
    };
    sessionRepo.modify = vi.fn(fakeSessionModify(sessionRepo));
    biteRepo = { countByRod: vi.fn().mockResolvedValue(0) };
    fishSpottedRepo = { countByRod: vi.fn().mockResolvedValue(0) };
    catchRepo = { getBySession: vi.fn().mockResolvedValue([]) };
    historyRepo = { put: vi.fn().mockResolvedValue(undefined) };
    sessionEvents = { record: vi.fn().mockResolvedValue(undefined) };
    service = new RodService(
      sessionRepo as never,
      biteRepo as never,
      fishSpottedRepo as never,
      catchRepo as never,
      historyRepo as never,
      sessionEvents as never,
    );
  });

  it('creates rods from count', () => {
    const rods = service.createRodRecords('s-1', 3);
    expect(rods).toHaveLength(3);
    expect(rods[0].name).toBe('Rod 1');
    expect(rods[2].name).toBe('Rod 3');
    expect(rods[0].visible).toBe(true);
  });

  it('requires confirm when shrinking rods with activity', async () => {
    const session = {
      id: 's-1',
      rods: [
        {
          id: 'r-1',
          sessionId: 's-1',
          rodNumber: 1,
          name: 'Rod 1',
          biteCount: 2,
          fishSpottedCount: 0,
          isActive: true,
        },
        {
          id: 'r-2',
          sessionId: 's-1',
          rodNumber: 2,
          name: 'Rod 2',
          biteCount: 0,
          fishSpottedCount: 0,
          isActive: true,
        },
      ],
    } as FishingSession;
    sessionRepo.getById.mockResolvedValue(session);
    biteRepo.countByRod.mockResolvedValueOnce(2);
    const result = await service.resizeRodCount(session, 1);
    expect(result.requiresConfirm).toBe(true);
  });

  it('soft-deletes rods when shrinking with force', async () => {
    const session = {
      id: 's-1',
      rods: [
        {
          id: 'r-1',
          sessionId: 's-1',
          rodNumber: 1,
          name: 'Rod 1',
          biteCount: 2,
          fishSpottedCount: 0,
          isActive: true,
        },
        {
          id: 'r-2',
          sessionId: 's-1',
          rodNumber: 2,
          name: 'Rod 2',
          biteCount: 1,
          fishSpottedCount: 0,
          isActive: true,
        },
      ],
    } as FishingSession;
    sessionRepo.getById.mockResolvedValue(session);
    biteRepo.countByRod.mockResolvedValue(1);
    const result = await service.resizeRodCount(session, 1, true);
    expect(result.requiresConfirm).toBe(false);
    expect(result.session.rods).toHaveLength(2);
    expect(result.session.rods?.find((r) => r.id === 'r-2')?.visible).toBe(false);
    expect(result.session.rods?.find((r) => r.id === 'r-1')?.visible).not.toBe(false);
  });

  it('recasts to a new spot and records cast time', async () => {
    const session = {
      id: 's-1',
      rods: [
        {
          id: 'r-1',
          sessionId: 's-1',
          rodNumber: 1,
          name: 'Rod 1',
          sessionSpotId: 'spot-a',
          biteCount: 0,
          fishSpottedCount: 0,
          isActive: true,
        },
      ],
      sessionSpots: [
        { id: 'spot-a', name: 'Near bank' },
        { id: 'spot-b', name: 'Far margin' },
      ],
    } as FishingSession;
    sessionRepo.getById.mockResolvedValue(session);

    const updated = await service.recast(session, 'r-1', 'spot-b');
    const rod = updated.rods?.find((r) => r.id === 'r-1');
    expect(rod?.sessionSpotId).toBe('spot-b');
    expect(rod?.castAt).toBeTruthy();
    expect(historyRepo.put).toHaveBeenCalled();
    expect(sessionEvents.record).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'rod-moved' }),
    );
    expect(sessionEvents.record).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'rod-cast',
        description: 'Rod 1 cast at Far margin',
      }),
    );
  });

  it('recasts to the same spot without a move event', async () => {
    const session = {
      id: 's-1',
      rods: [
        {
          id: 'r-1',
          sessionId: 's-1',
          rodNumber: 1,
          name: 'Rod 1',
          sessionSpotId: 'spot-a',
          biteCount: 0,
          fishSpottedCount: 0,
          isActive: true,
        },
      ],
      sessionSpots: [{ id: 'spot-a', name: 'Near bank' }],
    } as FishingSession;
    sessionRepo.getById.mockResolvedValue(session);

    await service.recast(session, 'r-1', 'spot-a');
    expect(historyRepo.put).not.toHaveBeenCalled();
    expect(sessionEvents.record).not.toHaveBeenCalledWith(
      expect.objectContaining({ type: 'rod-moved' }),
    );
    expect(sessionEvents.record).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'rod-cast' }),
    );
  });

  describe('concurrent session updates', () => {
    const rod = (id: string, extra: Partial<SessionRod> = {}): SessionRod => ({
      id,
      sessionId: 's-1',
      rodNumber: 1,
      name: id,
      biteCount: 0,
      fishSpottedCount: 0,
      isActive: true,
      ...extra,
    });

    it('syncRodCounts merges counts into rods changed while counting', async () => {
      const before = { id: 's-1', rods: [rod('r-1')], sessionSpots: [] } as unknown as FishingSession;
      const latest = {
        id: 's-1',
        rods: [rod('r-1', { castAt: '2026-10-23T10:00:00.000Z' }), rod('r-2')],
        sessionSpots: [],
      } as unknown as FishingSession;
      sessionRepo.getById.mockResolvedValueOnce(before).mockResolvedValue(latest);
      biteRepo.countByRod.mockResolvedValue(3);

      const result = await service.syncRodCounts(before);

      expect(result.rods).toEqual([
        rod('r-1', { castAt: '2026-10-23T10:00:00.000Z', biteCount: 3 }),
        rod('r-2'),
      ]);
    });

    it('saveSessionRods keeps fields written by others since the caller read the session', async () => {
      const stale = { id: 's-1', rods: [], catchCount: 0 } as unknown as FishingSession;
      sessionRepo.getById.mockResolvedValue({ ...stale, catchCount: 4, weather: { description: 'Rain' } });

      const result = await service.saveSessionRods(stale, [rod('r-1')]);

      expect(result.catchCount).toBe(4);
      expect(result.weather?.description).toBe('Rain');
      expect(result.rods).toEqual([rod('r-1')]);
    });
  });

  describe('addSessionSpot', () => {
    it('adds a visible named spot to the latest stored session', async () => {
      sessionRepo.getById.mockResolvedValue({
        id: 's-1',
        rods: [],
        sessionSpots: [{ id: 'sp-1', name: 'Reeds', visible: true }],
      });

      const result = await service.addSessionSpot({ id: 's-1' } as FishingSession, '  Island ');

      expect(result.spot.name).toBe('Island');
      expect(result.spot.visible).toBe(true);
      expect(result.session.sessionSpots).toHaveLength(2);
      expect(result.session.sessionSpots?.[0].id).toBe('sp-1');
      expect(sessionRepo.put).toHaveBeenCalled();
    });

    it('reuses a visible spot with the same name', async () => {
      sessionRepo.getById.mockResolvedValue({
        id: 's-1',
        rods: [],
        sessionSpots: [{ id: 'sp-1', name: 'Reeds', visible: true }],
      });

      const result = await service.addSessionSpot({ id: 's-1' } as FishingSession, 'reeds');

      expect(result.spot.id).toBe('sp-1');
      expect(result.session.sessionSpots).toHaveLength(1);
    });

    it('rejects an empty name', async () => {
      await expect(service.addSessionSpot({ id: 's-1' } as FishingSession, '  ')).rejects.toThrow();
    });
  });
});
