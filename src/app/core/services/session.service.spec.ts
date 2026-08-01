import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SessionService, StartSessionOptions } from './session.service';
import { FishingSession } from '../models';

describe('SessionService.start', () => {
  let service: SessionService;
  let sessionRepo: {
    getActive: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    getById: ReturnType<typeof vi.fn>;
  };
  let lakeRepo: { getById: ReturnType<typeof vi.fn> };
  let geo: { getCurrentPosition: ReturnType<typeof vi.fn> };
  let weather: {
    getSnapshot: ReturnType<typeof vi.fn>;
    getCachedSnapshotFor: ReturnType<typeof vi.fn>;
  };
  let image: { createCoverImage: ReturnType<typeof vi.fn> };
  let settings: { update: ReturnType<typeof vi.fn>; get: ReturnType<typeof vi.fn> };
  const emptyDeps = {
    rodService: {
      createRodRecords: vi.fn().mockReturnValue([{ id: 'r-1', name: 'Rod 1', biteCount: 0, fishSpottedCount: 0, isActive: true, sessionId: 'x', rodNumber: 1 }]),
      resizeRodCount: vi.fn(),
    },
    sessionEvents: { record: vi.fn() },
    biteEventRepo: { deleteBySession: vi.fn() },
    fishSpottedRepo: { deleteBySession: vi.fn() },
    rodSpotHistoryRepo: { deleteByRod: vi.fn() },
    sessionEventRepo: { deleteBySession: vi.fn() },
    sessionWeather: { record: vi.fn(), deleteBySession: vi.fn() },
  };

  beforeEach(() => {
    sessionRepo = {
      getActive: vi.fn().mockResolvedValue(undefined),
      put: vi.fn().mockResolvedValue(undefined),
      getById: vi.fn().mockImplementation(async (id: string) => ({
        id,
        latitude: 52.1,
        longitude: 5.1,
      })),
    };
    lakeRepo = { getById: vi.fn().mockResolvedValue({ id: 'lake-1', name: 'Lake A' }) };
    geo = { getCurrentPosition: vi.fn().mockResolvedValue(null) };
    weather = {
      getSnapshot: vi.fn().mockResolvedValue(null),
      getCachedSnapshotFor: vi.fn().mockReturnValue(null),
    };
    image = { createCoverImage: vi.fn().mockResolvedValue(undefined) };
    settings = { update: vi.fn(), get: vi.fn().mockReturnValue({ maxRodCount: 10 }) };

    service = new SessionService(
      sessionRepo as never,
      {} as never,
      lakeRepo as never,
      geo as never,
      weather as never,
      image as never,
      settings as never,
      emptyDeps.rodService as never,
      emptyDeps.sessionEvents as never,
      emptyDeps.biteEventRepo as never,
      emptyDeps.fishSpottedRepo as never,
      emptyDeps.rodSpotHistoryRepo as never,
      emptyDeps.sessionEventRepo as never,
      emptyDeps.sessionWeather as never,
    );
  });

  it('creates minimal session with name and start date only', async () => {
    const options: StartSessionOptions = {
      name: 'Morning Session',
      startDate: '2026-07-15T08:00:00.000Z',
    };

    const session = await service.start(options);

    expect(session.name).toBe('Morning Session');
    expect(session.status).toBe('active');
    expect(session.lakeId).toBeUndefined();
    expect(session.weather).toBeUndefined();
    expect(session.coverImageId).toBeUndefined();
    expect(session.rods).toHaveLength(0);
    expect(sessionRepo.put).toHaveBeenCalledOnce();
  });

  it('creates session with lake', async () => {
    const session = await service.start({
      name: 'Lake Session',
      startDate: '2026-07-15T08:00:00.000Z',
      lakeId: 'lake-1',
    });

    expect(session.lakeId).toBe('lake-1');
    expect(settings.update).toHaveBeenCalledWith({ lastLakeId: 'lake-1' });
  });

  it('returns existing active session without creating duplicate', async () => {
    const existing = { id: 's-1', status: 'active' } as FishingSession;
    sessionRepo.getActive.mockResolvedValue(existing);

    const session = await service.start({
      name: 'New',
      startDate: '2026-07-15T08:00:00.000Z',
    });

    expect(session).toBe(existing);
    expect(sessionRepo.put).not.toHaveBeenCalled();
  });

  it('continues when cover image creation fails', async () => {
    image.createCoverImage.mockRejectedValue(new Error('fetch failed'));

    const session = await service.start({
      name: 'No Cover',
      startDate: '2026-07-15T08:00:00.000Z',
    });

    expect(session.coverImageId).toBeUndefined();
    expect(sessionRepo.put).toHaveBeenCalled();
  });

  it('uses cached weather at start and refreshes live weather asynchronously', async () => {
    emptyDeps.sessionWeather.record.mockClear();
    const snapshot = {
      description: 'Clear',
      temperatureC: 18,
      windSpeedKmh: 10,
      windDirection: 90,
      airPressureHpa: 1013,
      humidity: 50,
      cloudCoverage: 10,
      rain: false,
      sunrise: '2026-07-15T04:00:00.000Z',
      sunset: '2026-07-15T20:00:00.000Z',
      moonPhase: 'Waxing Crescent',
      capturedAt: '2026-07-15T08:00:00.000Z',
    };
    geo.getCurrentPosition.mockResolvedValue({ latitude: 52.1, longitude: 5.1 });
    weather.getCachedSnapshotFor.mockReturnValue(snapshot);
    weather.getSnapshot.mockResolvedValue(snapshot);
    settings.get.mockReturnValue({ maxRodCount: 10, useGpsForWeather: false });

    const session = await service.start({
      name: 'With Weather',
      startDate: '2026-07-15T08:00:00.000Z',
    });

    expect(session.weather).toEqual(snapshot);
    expect(weather.getCachedSnapshotFor).toHaveBeenCalledWith(52.1, 5.1);
    expect(emptyDeps.sessionWeather.record).toHaveBeenCalledWith(session.id, snapshot);

    // Async enrichment: refreshWeather uses getSnapshot after persist.
    await vi.waitFor(() => {
      expect(weather.getSnapshot).toHaveBeenCalledWith(52.1, 5.1);
    });
  });
});

describe('SessionService.updateSession', () => {
  let service: SessionService;
  let sessionRepo: {
    getById: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    getActive: ReturnType<typeof vi.fn>;
  };
  let catchRepo: { getBySession: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    sessionRepo = {
      getById: vi.fn(),
      put: vi.fn().mockResolvedValue(undefined),
      getActive: vi.fn().mockResolvedValue(undefined),
    };
    catchRepo = {
      getBySession: vi.fn().mockResolvedValue([
        { weightKg: 5 },
        { weightKg: 12 },
      ]),
    };

    service = new SessionService(
      sessionRepo as never,
      catchRepo as never,
      {} as never,
      {} as never,
      {} as never,
      {} as never,
      { get: vi.fn().mockReturnValue({ maxRodCount: 10 }) } as never,
      {
        resizeRodCount: vi.fn().mockImplementation(async (session) => ({
          session,
          requiresConfirm: false,
          affectedRodIds: [],
        })),
      } as never,
      { record: vi.fn() } as never,
      { deleteBySession: vi.fn() } as never,
      { deleteBySession: vi.fn() } as never,
      { deleteByRod: vi.fn() } as never,
      { deleteBySession: vi.fn() } as never,
      { record: vi.fn(), deleteBySession: vi.fn() } as never,
    );
  });

  it('rejects end date before start date', async () => {
    sessionRepo.getById.mockResolvedValue({
      id: 's-1',
      startDate: '2026-07-15T12:00:00.000Z',
      status: 'completed',
    });

    await expect(
      service.updateSession('s-1', { endDate: '2026-07-15T08:00:00.000Z' }),
    ).rejects.toThrow('End date cannot be earlier than start date');
  });

  it('recalculates stats and preserves catch count', async () => {
    sessionRepo.getById.mockResolvedValue({
      id: 's-1',
      name: 'Test',
      startDate: '2026-07-15T08:00:00.000Z',
      status: 'active',
      catchCount: 0,
      totalCatchWeightKg: 0,
    });

    const updated = await service.updateSession('s-1', {
      name: 'Updated',
      startDate: '2026-07-15T06:00:00.000Z',
    });

    expect(updated.name).toBe('Updated');
    expect(updated.catchCount).toBe(2);
    expect(updated.totalCatchWeightKg).toBe(17);
    expect(updated.biggestFishKg).toBe(12);
    expect(sessionRepo.put).toHaveBeenCalled();
  });
});
