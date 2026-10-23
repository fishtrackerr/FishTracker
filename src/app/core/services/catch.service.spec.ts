import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CatchService } from './catch.service';
import { Catch } from '../models';
import { fakeSessionModify } from './session-repository.fake';

describe('CatchService', () => {
  let service: CatchService;
  let catchRepo: {
    put: ReturnType<typeof vi.fn>;
    getById: ReturnType<typeof vi.fn>;
    getBySession: ReturnType<typeof vi.fn>;
    getAll: ReturnType<typeof vi.fn>;
    setPersonalRecord: ReturnType<typeof vi.fn>;
  };
  let sessionRepo: {
    getById: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    modify?: ReturnType<typeof vi.fn>;
  };
  let lakeRepo: { getById: ReturnType<typeof vi.fn> };
  let processFile: ReturnType<typeof vi.fn>;
  let imageDelete: ReturnType<typeof vi.fn>;
  let imageKept: ReturnType<typeof vi.fn>;
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
    lake?: Record<string, unknown> | null;
  }): void {
    catchRepo = {
      put: vi.fn().mockResolvedValue(undefined),
      getById: vi.fn(),
      getBySession: vi.fn().mockResolvedValue([]),
      getAll: vi.fn().mockResolvedValue([]),
      setPersonalRecord: vi.fn().mockResolvedValue(undefined),
    };
    processFile = vi.fn();
    imageDelete = vi.fn().mockResolvedValue(undefined);
    imageKept = vi.fn().mockResolvedValue(false);
    sessionEvents = { record: vi.fn() };
    i18n = {
      t: vi.fn((key: string, params?: Record<string, string>) => {
        if (key === 'common.unknown') return 'Unknown';
        if (key === 'activeSession.instantCatchEvent') return 'Quick catch logged';
        if (key === 'activeSession.catchEvent') return `${params?.['species']} caught`;
        return key;
      }),
    };
    sessionRepo = {
      getById: vi.fn().mockResolvedValue({
        id: 'session-1',
        lakeId: 'lake-1',
        catchCount: 0,
        totalCatchWeightKg: 0,
        coverImageId: 'lake-cover',
        rods: [
          {
            id: 'rod-1',
            sessionId: 'session-1',
            rodNumber: 1,
            name: 'Rod 1',
            bait: 'Boilie',
            rig: 'Hair Rig',
            biteCount: 0,
            fishSpottedCount: 0,
            isActive: true,
          },
        ],
        ...overrides?.session,
      }),
      put: vi.fn().mockResolvedValue(undefined),
    };
    sessionRepo.modify = vi.fn(fakeSessionModify(sessionRepo));
    lakeRepo = {
      getById: vi.fn().mockResolvedValue(
        overrides?.lake === null
          ? undefined
          : {
              id: 'lake-1',
              name: 'Lake A',
              coverImageId: 'lake-cover',
              photoIds: [],
              ...overrides?.lake,
            },
      ),
    };

    service = new CatchService(
      {
        put: catchRepo.put,
        getBySession: catchRepo.getBySession,
        getAll: catchRepo.getAll,
        setPersonalRecord: catchRepo.setPersonalRecord,
        watchBySession: vi.fn(),
        watchAll: vi.fn(),
        getById: catchRepo.getById,
        delete: vi.fn(),
        deleteBySession: vi.fn(),
      } as never,
      sessionRepo as never,
      lakeRepo as never,
      {
        getCurrentPosition:
          overrides?.getCurrentPosition ?? vi.fn().mockResolvedValue(null),
      } as never,
      {
        getSnapshot: overrides?.getSnapshot ?? vi.fn().mockResolvedValue(null),
        getCachedSnapshotFor:
          overrides?.getCachedSnapshotFor ?? vi.fn().mockReturnValue(null),
      } as never,
      { processFile, delete: imageDelete, isKeptByUser: imageKept } as never,
      sessionEvents as never,
      i18n as never,
    );
  }

  beforeEach(() => {
    createService();
  });

  describe('createQuick', () => {
    it('creates catch and keeps lake cover when catch has no photo', async () => {
      catchRepo.getBySession.mockResolvedValue([{ weightKg: 8.5 } as Catch]);

      const result = await service.createQuick('session-1', {
        species: 'Catfish',
        weightKg: 8.5,
        rodId: 'rod-1',
      });

      expect(result.species).toBe('Catfish');
      expect(result.rodId).toBe('rod-1');
      expect(result.sessionId).toBe('session-1');
      expect(catchRepo.put).toHaveBeenCalled();
      expect(sessionRepo.put).toHaveBeenCalledWith(
        expect.objectContaining({
          catchCount: 1,
          totalCatchWeightKg: 8.5,
          biggestFishKg: 8.5,
          coverImageId: 'lake-cover',
        }),
      );
    });

    it('sets catch photo as session coverImageId', async () => {
      processFile.mockResolvedValue('catch-photo-1');
      catchRepo.getBySession.mockResolvedValue([
        {
          weightKg: 3,
          photoId: 'catch-photo-1',
          caughtAt: '2026-07-15T12:00:00.000Z',
        } as Catch,
      ]);
      const photo = new File(['img'], 'catch.jpg', { type: 'image/jpeg' });

      const result = await service.createQuick('session-1', {
        species: 'Carp',
        weightKg: 3,
        photo,
        rodId: 'rod-1',
      });

      expect(processFile).toHaveBeenCalledWith(photo, 'catch', 'session-1');
      expect(result.photoId).toBe('catch-photo-1');
      expect(result.rodId).toBe('rod-1');
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

      const result = await service.create('session-1', { species: 'Pike', rodId: 'rod-1' });

      expect(result.weather).toEqual(baseWeather);
      expect(result.rodId).toBe('rod-1');
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
      expect(result.rodId).toBe('rod-1');
      expect(result.detailsPending).toBe(true);
      expect(result.weather).toEqual(sessionWeather);
      expect(result.weather).not.toBe(sessionWeather);
      expect(sessionEvents.record).toHaveBeenCalledWith(
        expect.objectContaining({
          description: 'Quick catch logged',
        }),
      );
    });

    it('names the species in the timeline when a catch is pending but has a species', async () => {
      await service.create('session-1', { species: 'Pike', detailsPending: true, rodId: 'rod-1' });
      expect(sessionEvents.record).toHaveBeenCalledWith(
        expect.objectContaining({ description: 'Pike caught' }),
      );
    });

    it('throws when the session has no rods', async () => {
      createService({ session: { rods: [] } });

      await expect(service.createInstant('session-1')).rejects.toMatchObject({
        name: 'CatchValidationError',
        message: 'catchForm.rodRequired',
      });
      expect(catchRepo.put).not.toHaveBeenCalled();
    });
  });

  describe('personal records', () => {
    const pike = (id: string, weightKg: number, isPersonalRecord: boolean) =>
      ({ id, sessionId: 'session-1', species: 'Pike', weightKg, isPersonalRecord }) as Catch;

    it('moves the record flag to the next-best catch when the record is deleted', async () => {
      const record = pike('c-big', 9, true);
      const second = pike('c-second', 7, false);
      catchRepo.getById.mockResolvedValue(record);
      catchRepo.getAll.mockResolvedValue([second]);

      await service.delete('c-big');

      expect(catchRepo.setPersonalRecord).toHaveBeenCalledWith('c-second', true);
    });

    it('soft-deletes the catch photo with the catch', async () => {
      catchRepo.getById.mockResolvedValue({ ...pike('c1', 5, false), photoId: 'img-1' });
      catchRepo.getAll.mockResolvedValue([]);
      await service.delete('c1');
      expect(imageDelete).toHaveBeenCalledWith('img-1');
    });

    it('keeps a photo the user made the homepage image or a favourite', async () => {
      catchRepo.getById.mockResolvedValue({ ...pike('c1', 5, false), photoId: 'img-1' });
      imageKept.mockResolvedValue(true);
      await service.delete('c1');
      expect(imageKept).toHaveBeenCalledWith('img-1');
      expect(imageDelete).not.toHaveBeenCalled();
    });

    it('keeps a photo that another catch still uses', async () => {
      catchRepo.getById.mockResolvedValue({ ...pike('c1', 5, false), photoId: 'img-1' });
      catchRepo.getAll.mockResolvedValue([{ ...pike('c2', 4, false), photoId: 'img-1' }]);
      await service.delete('c1');
      expect(imageDelete).not.toHaveBeenCalled();
    });

    it('keeps a photo the session also lists', async () => {
      createService({ session: { photoIds: ['img-1'] } });
      catchRepo.getById.mockResolvedValue({ ...pike('c1', 5, false), photoId: 'img-1' });
      await service.delete('c1');
      expect(imageDelete).not.toHaveBeenCalled();
    });

    it('does not touch images for a catch without a photo', async () => {
      catchRepo.getById.mockResolvedValue(pike('c1', 5, false));
      await service.delete('c1');
      expect(imageDelete).not.toHaveBeenCalled();
    });

    it('clears the flag on a former record once a bigger fish is saved', async () => {
      const former = pike('c-old', 5, true);
      catchRepo.getAll.mockResolvedValue([former, pike('c-new', 8, true)]);

      await service.createQuick('session-1', { species: 'Pike', weightKg: 8, rodId: 'rod-1' });

      expect(catchRepo.setPersonalRecord).toHaveBeenCalledWith('c-old', false);
    });
  });

  describe('update', () => {
    it('clears detailsPending and leaves weather and caughtAt intact', async () => {
      const existing: Catch = {
        id: 'catch-1',
        sessionId: 'session-1',
        rodId: 'rod-1',
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
      expect(updated?.rodId).toBe('rod-1');
      expect(updated?.detailsPending).toBe(false);
      expect(updated?.weather).toEqual(baseWeather);
      expect(updated?.caughtAt).toBe('2026-07-15T10:00:00.000Z');
      expect(updated?.latitude).toBe(52.1);
      expect(updated?.longitude).toBe(5.1);
    });
  });
});
