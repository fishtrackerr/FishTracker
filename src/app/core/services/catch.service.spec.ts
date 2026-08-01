import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CatchService } from './catch.service';
import { Catch } from '../models';

describe('CatchService.createQuick', () => {
  let service: CatchService;
  let catchRepo: { put: ReturnType<typeof vi.fn> };
  let sessionRepo: {
    getById: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
  };
  let catchRepoGetBySession: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    catchRepo = { put: vi.fn().mockResolvedValue(undefined) };
    catchRepoGetBySession = vi.fn().mockResolvedValue([]);
    sessionRepo = {
      getById: vi.fn().mockResolvedValue({
        id: 'session-1',
        catchCount: 0,
        totalCatchWeightKg: 0,
      }),
      put: vi.fn().mockResolvedValue(undefined),
    };

    service = new CatchService(
      {
        put: catchRepo.put,
        getBySession: catchRepoGetBySession,
        getAll: vi.fn().mockResolvedValue([]),
        watchBySession: vi.fn(),
        watchAll: vi.fn(),
        getById: vi.fn(),
        delete: vi.fn(),
        deleteBySession: vi.fn(),
      } as never,
      sessionRepo as never,
      { getCurrentPosition: vi.fn().mockResolvedValue(null) } as never,
      {
        getSnapshot: vi.fn().mockResolvedValue(null),
        getCachedSnapshotFor: vi.fn().mockReturnValue(null),
      } as never,
      { processFile: vi.fn() } as never,
      { record: vi.fn() } as never,
    );
  });

  it('creates catch and updates session stats', async () => {
    catchRepoGetBySession.mockResolvedValue([
      { weightKg: 8.5 } as Catch,
    ]);

    const result = await service.createQuick('session-1', {
      species: 'Catfish',
      weightKg: 8.5,
    });

    expect(result.species).toBe('Catfish');
    expect(result.sessionId).toBe('session-1');
    expect(catchRepo.put).toHaveBeenCalled();
    expect(sessionRepo.put).toHaveBeenCalledWith(
      expect.objectContaining({
        catchCount: 1,
        totalCatchWeightKg: 8.5,
        biggestFishKg: 8.5,
      }),
    );
  });

  it('uses cached weather instead of live fetch when session has no weather', async () => {
    const cached = {
      description: 'Cloudy',
      temperatureC: 12,
      windSpeedKmh: 8,
      windDirection: 45,
      airPressureHpa: 1005,
      humidity: 70,
      cloudCoverage: 80,
      rain: false,
      sunrise: '',
      sunset: '',
      moonPhase: 'Full Moon',
      capturedAt: '2026-07-15T08:00:00.000Z',
    };
    const getCachedSnapshotFor = vi.fn().mockReturnValue(cached);
    const getSnapshot = vi.fn();
    const getCurrentPosition = vi.fn().mockResolvedValue({ latitude: 52.1, longitude: 5.1 });

    service = new CatchService(
      {
        put: catchRepo.put,
        getBySession: catchRepoGetBySession,
        getAll: vi.fn().mockResolvedValue([]),
        watchBySession: vi.fn(),
        watchAll: vi.fn(),
        getById: vi.fn(),
        delete: vi.fn(),
        deleteBySession: vi.fn(),
      } as never,
      sessionRepo as never,
      { getCurrentPosition } as never,
      { getSnapshot, getCachedSnapshotFor } as never,
      { processFile: vi.fn() } as never,
      { record: vi.fn() } as never,
    );

    const result = await service.create('session-1', { species: 'Pike' });

    expect(result.weather).toEqual(cached);
    expect(getCachedSnapshotFor).toHaveBeenCalledWith(52.1, 5.1);
    expect(getSnapshot).not.toHaveBeenCalled();
  });
});
