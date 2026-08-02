import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RodService } from './rod.service';
import { FishingSession } from '../models';

describe('RodService', () => {
  let service: RodService;
  let sessionRepo: { put: ReturnType<typeof vi.fn>; getById: ReturnType<typeof vi.fn> };
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
});
