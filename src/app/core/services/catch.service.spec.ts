import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CatchService } from './catch.service';
import { Catch } from '../models';

describe('CatchService', () => {
  let service: CatchService;
  let catchRepo: {
    put: ReturnType<typeof vi.fn>;
    getById: ReturnType<typeof vi.fn>;
    getBySession: ReturnType<typeof vi.fn>;
    getAll: ReturnType<typeof vi.fn>;
  };
  let sessionRepo: {
    getById: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
  };
  let processFile: ReturnType<typeof vi.fn>;
  let sessionEvents: { record: ReturnType<typeof vi.fn> };
  let i18n: { t: ReturnType<typeof vi.fn> };

  const baseWeather = {
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

  function createService(overrides?: {
    getCurrentPosition?: ReturnType<typeof vi.fn>;
    getCachedSnapshotFor?: ReturnType<typeof vi.fn>;
    getSnapshot?: ReturnType<typeof vi.fn>;
    session?: Record<string, unknown>;
  }): void {
    catchRepo = {
      put: vi.fn().mockResolvedValue(undefined),
      getById: vi.fn(),
      getBySession: vi.fn().mockResolvedValue([]),
      getAll: vi.fn().mockResolvedValue([]),
    };
    processFile = vi.fn();
    sessionEvents = { record: vi.fn() };
    i18n = {
      t: vi.fn((key: string) => {
        if (key === 'common.unknown') return 'Unknown';
        if (key === 'activeSession.instantCatchEvent') return 'Quick catch logged';
        return key;
      }),
    };
    sessionRepo = {
      getById: vi.fn().mockResolvedValue({
        id: 'session-1',
        catchCount: 0,
        totalCatchWeightKg: 0,
        coverImageId: 'generated-cover',
        ...overrides?.session,
      }),
      put: vi.fn().mockResolvedValue(undefined),
    };

    service = new CatchService(
      {
        put: catchRepo.put,
        getBySession: catchRepo.getBySession,
        getAll: catchRepo.getAll,
        watchBySession: vi.fn(),
        watchAll: vi.fn(),
        getById: catchRepo.getById,
        delete: vi.fn(),
        deleteBySession: vi.fn(),
      } as never,
      sessionRepo as never,
      {
        getCurrentPosition:
          overrides?.getCurrentPosition ?? vi.fn().mockResolvedValue(null),
      } as never,
      {
        getSnapshot: overrides?.getSnapshot ?? vi.fn().mockResolvedValue(null),
        getCachedSnapshotFor:
          overrides?.getCachedSnapshotFor ?? vi.fn().mockReturnValue(null),
      } as never,
      { processFile } as never,
      sessionEvents as never,
      i18n as never,
    );
  }

  beforeEach(() => {
    createService();
  });

  describe('createQuick', () => {
    it('creates catch and updates session stats', async () => {
      catchRepo.getBySession.mockResolvedValue([{ weightKg: 8.5 } as Catch]);

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
          coverImageId: 'generated-cover',
        }),
      );
    });

    it('sets catch photo as session coverImageId', async () => {
      processFile.mockResolvedValue('catch-photo-1');
      catchRepo.getBySession.mockResolvedValue([
        { weightKg: 3, photoId: 'catch-photo-1' } as Catch,
      ]);
      const photo = new File(['img'], 'catch.jpg', { type: 'image/jpeg' });

      const result = await service.createQuick('session-1', {
        species: 'Carp',
        weightKg: 3,
        photo,
      });

      expect(processFile).toHaveBeenCalledWith(photo, 'catch', 'session-1');
      expect(result.photoId).toBe('catch-photo-1');
      expect(sessionRepo.put).toHaveBeenCalledWith(
        expect.objectContaining({
          coverImageId: 'catch-photo-1',
          catchCount: 1,
        }),
      );
    });

    it('uses cached weather instead of live fetch when session has no weather', async () => {
      const getCachedSnapshotFor = vi.fn().mockReturnValue(baseWeather);
      const getSnapshot = vi.fn();
      const getCurrentPosition = vi
        .fn()
        .mockResolvedValue({ latitude: 52.1, longitude: 5.1 });

      createService({ getCachedSnapshotFor, getSnapshot, getCurrentPosition });

      const result = await service.create('session-1', { species: 'Pike' });

      expect(result.weather).toEqual(baseWeather);
      expect(result.weather).not.toBe(baseWeather);
      expect(getCachedSnapshotFor).toHaveBeenCalledWith(52.1, 5.1);
      expect(getSnapshot).not.toHaveBeenCalled();
    });
  });

  describe('createInstant', () => {
    it('sets detailsPending and deep-copies session weather', async () => {
      const sessionWeather = { ...baseWeather, temperatureC: 19 };
      createService({ session: { weather: sessionWeather } });
      catchRepo.getBySession.mockResolvedValue([]);

      const result = await service.createInstant('session-1');

      expect(result.species).toBe('Unknown');
      expect(result.detailsPending).toBe(true);
      expect(result.weather).toEqual(sessionWeather);
      expect(result.weather).not.toBe(sessionWeather);
      expect(sessionEvents.record).toHaveBeenCalledWith(
        expect.objectContaining({
          description: 'Quick catch logged',
        }),
      );
    });
  });

  describe('update', () => {
    it('clears detailsPending and leaves weather and caughtAt intact', async () => {
      const existing: Catch = {
        id: 'catch-1',
        sessionId: 'session-1',
        species: 'Unknown',
        caughtAt: '2026-07-15T10:00:00.000Z',
        latitude: 52.1,
        longitude: 5.1,
        weather: baseWeather,
        detailsPending: true,
        createdAt: '2026-07-15T10:00:00.000Z',
        updatedAt: '2026-07-15T10:00:00.000Z',
      };
      catchRepo.getById.mockResolvedValue(existing);
      catchRepo.getBySession.mockResolvedValue([]);
      catchRepo.getAll.mockResolvedValue([]);

      const updated = await service.update('catch-1', {
        species: 'Carp',
        weightKg: 4.2,
        detailsPending: false,
      });

      expect(updated?.species).toBe('Carp');
      expect(updated?.detailsPending).toBe(false);
      expect(updated?.weather).toEqual(baseWeather);
      expect(updated?.caughtAt).toBe('2026-07-15T10:00:00.000Z');
      expect(updated?.latitude).toBe(52.1);
      expect(updated?.longitude).toBe(5.1);
    });
  });
});
