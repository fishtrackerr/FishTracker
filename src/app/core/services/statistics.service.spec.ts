import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Catch, FishingSession, Lake } from '../models';
import { StatisticsService } from './statistics.service';

function makeSession(partial: Partial<FishingSession>): FishingSession {
  return {
    id: 'session-1',
    name: 'Session',
    status: 'completed',
    startDate: '2026-07-20T06:00:00.000Z',
    endDate: '2026-07-20T10:00:00.000Z',
    photoIds: [],
    catchCount: 0,
    totalCatchWeightKg: 0,
    createdAt: '2026-07-20T06:00:00.000Z',
    updatedAt: '2026-07-20T10:00:00.000Z',
    ...partial,
  };
}

function makeCatch(partial: Partial<Catch>): Catch {
  return {
    id: 'catch-1',
    sessionId: 'session-1',
    species: 'Carp',
    caughtAt: '2026-07-20T07:00:00.000Z',
    createdAt: '2026-07-20T07:00:00.000Z',
    updatedAt: '2026-07-20T07:00:00.000Z',
    ...partial,
  };
}

function makeLake(partial: Partial<Lake>): Lake {
  return {
    id: 'lake-1',
    name: 'Lake',
    isFavorite: false,
    spots: [],
    photoIds: [],
    createdAt: '2026-07-20T06:00:00.000Z',
    updatedAt: '2026-07-20T10:00:00.000Z',
    ...partial,
  };
}

describe('StatisticsService', () => {
  const sessionRepo = {
    getAll: vi.fn(),
  };
  const catchRepo = {
    getAll: vi.fn(),
  };
  const lakeRepo = {
    getAll: vi.fn(),
  };

  let service: StatisticsService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new StatisticsService(sessionRepo as never, catchRepo as never, lakeRepo as never);
  });

  it('computes dashboard summary metrics', () => {
    const sessions = [
      makeSession({
        id: 's1',
        lakeId: 'l1',
        catchCount: 2,
        totalCatchWeightKg: 12,
      }),
      makeSession({
        id: 's2',
        status: 'planned',
        lakeId: 'l1',
      }),
    ];
    const catches = [
      makeCatch({
        id: 'c1',
        sessionId: 's1',
        species: 'Carp',
        weightKg: 7,
        lengthCm: 80,
        bait: 'Corn',
        rig: 'Hair Rig',
        spotId: 'spot-1',
        released: true,
      }),
      makeCatch({
        id: 'c2',
        sessionId: 's1',
        species: 'Carp',
        weightKg: 5,
        lengthCm: 70,
        bait: 'Corn',
        rig: 'Hair Rig',
        spotId: 'spot-1',
      }),
    ];
    const lakes = [
      makeLake({
        id: 'l1',
        name: 'Mirror Lake',
        spots: [{ id: 'spot-1', name: 'North Bank', isFavorite: false }],
      }),
    ];

    const stats = service.compute(sessions, catches, lakes);

    expect(stats.totalSessions).toBe(2);
    expect(stats.totalCatches).toBe(2);
    expect(stats.biggestFishKg).toBe(7);
    expect(stats.longestFishCm).toBe(80);
    expect(stats.favoriteLake).toBe('Mirror Lake');
    expect(stats.favoriteSpot).toBe('North Bank');
    expect(stats.bestBait).toBe('Corn');
    expect(stats.bestRig).toBe('Hair Rig');
    expect(stats.totalCatchWeightKg).toBe(12);
    expect(stats.releasedCount).toBe(1);
    expect(stats.retainedCount).toBe(1);
    expect(stats.completedSessions).toBe(1);
    expect(stats.plannedSessions).toBe(1);
    expect(stats.speciesBreakdown).toEqual([
      {
        species: 'Carp',
        count: 2,
        avgWeight: 6,
      },
    ]);
    expect(stats.personalRecords).toContainEqual({
      species: 'Carp',
      weightKg: 7,
      lengthCm: 80,
    });
  });

  it('builds correlation buckets for weather fields', () => {
    const catches = [
      makeCatch({
        id: 'c1',
        weather: {
          description: 'Clear',
          capturedAt: '2026-07-20T07:00:00.000Z',
          temperatureC: 18,
          windSpeedKmh: 8,
          windDirection: 180,
          airPressureHpa: 1008,
          humidity: 65,
          cloudCoverage: 20,
          rain: false,
          sunrise: '2026-07-20T05:20:00.000Z',
          sunset: '2026-07-20T20:40:00.000Z',
          moonPhase: 'Full Moon',
        },
      }),
      makeCatch({
        id: 'c2',
        weather: {
          description: 'Cloudy',
          capturedAt: '2026-07-20T08:00:00.000Z',
          temperatureC: 19,
          windSpeedKmh: 10,
          windDirection: 200,
          airPressureHpa: 1008,
          humidity: 70,
          cloudCoverage: 35,
          rain: false,
          sunrise: '2026-07-20T05:20:00.000Z',
          sunset: '2026-07-20T20:40:00.000Z',
          moonPhase: 'Full Moon',
        },
      }),
    ];

    expect(service.getCorrelationData(catches, 'temperatureC')).toContainEqual({
      label: '20°C',
      count: 2,
    });
    expect(service.getCorrelationData(catches, 'moonPhase')).toContainEqual({
      label: 'Full Moon',
      count: 2,
    });
    expect(service.getCorrelationData(catches, 'airPressureHpa')).toContainEqual({
      label: '1010 hPa',
      count: 2,
    });
  });

  it('reads data from repositories for dashboard stats', async () => {
    const sessions = [makeSession({ id: 's1' })];
    const catches = [makeCatch({ id: 'c1' })];
    const lakes = [makeLake({ id: 'l1' })];

    sessionRepo.getAll.mockResolvedValue(sessions);
    catchRepo.getAll.mockResolvedValue(catches);
    lakeRepo.getAll.mockResolvedValue(lakes);

    const stats = await service.getDashboardStats();

    expect(sessionRepo.getAll).toHaveBeenCalledTimes(1);
    expect(catchRepo.getAll).toHaveBeenCalledTimes(1);
    expect(lakeRepo.getAll).toHaveBeenCalledTimes(1);
    expect(stats.totalSessions).toBe(1);
    expect(stats.totalCatches).toBe(1);
  });
});
