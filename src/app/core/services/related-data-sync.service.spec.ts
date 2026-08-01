import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RelatedDataSyncService } from './related-data-sync.service';
import { Catch, FishingSession, Lake } from '../models';

describe('RelatedDataSyncService', () => {
  let service: RelatedDataSyncService;
  let sessions: { getAll: ReturnType<typeof vi.fn>; put: ReturnType<typeof vi.fn> };
  let catches: { getAll: ReturnType<typeof vi.fn>; put: ReturnType<typeof vi.fn> };
  let lakes: { getAll: ReturnType<typeof vi.fn>; put: ReturnType<typeof vi.fn> };
  let settings: { get: ReturnType<typeof vi.fn>; update: ReturnType<typeof vi.fn> };
  let filters: { rewriteOptionValue: ReturnType<typeof vi.fn> };
  let i18n: { t: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    sessions = { getAll: vi.fn().mockResolvedValue([]), put: vi.fn() };
    catches = { getAll: vi.fn().mockResolvedValue([]), put: vi.fn() };
    lakes = { getAll: vi.fn().mockResolvedValue([]), put: vi.fn() };
    settings = {
      get: vi.fn().mockReturnValue({
        favoriteSpecies: ['Carp'],
        favoriteBaits: ['Corn'],
        favoriteRigs: ['Hair Rig'],
      }),
      update: vi.fn(),
    };
    filters = { rewriteOptionValue: vi.fn() };
    i18n = {
      t: vi.fn((key: string, params?: Record<string, string>) => {
        if (key === 'sessions.defaultNameAtLake') {
          return `Session at ${params?.['lake']}`;
        }
        return key;
      }),
    };

    service = Object.create(RelatedDataSyncService.prototype) as RelatedDataSyncService;
    Object.assign(service, {
      sessions,
      catches,
      lakes,
      settings,
      fishingMode: { getMode: vi.fn().mockReturnValue('carper') },
      filters,
      i18n,
    });
  });

  it('rewrites default session titles across locales and leaves custom titles alone', async () => {
    const sessionsList: FishingSession[] = [
      session({ id: '1', lakeId: 'lake-1', name: 'Session at Old Lake' }),
      session({ id: '2', lakeId: 'lake-1', name: 'Sessie bij Old Lake' }),
      session({ id: '3', lakeId: 'lake-1', name: 'Sitzung am Old Lake' }),
      session({ id: '4', lakeId: 'lake-1', name: 'My custom trip' }),
      session({ id: '5', lakeId: 'other', name: 'Session at Old Lake' }),
    ];
    sessions.getAll.mockResolvedValue(sessionsList);

    await service.onLakeRenamed('lake-1', 'Old Lake', 'New Lake');

    expect(sessions.put).toHaveBeenCalledTimes(3);
    expect(sessions.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: '1', name: 'Session at New Lake' }),
    );
    expect(sessions.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: '2', name: 'Session at New Lake' }),
    );
    expect(sessions.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: '3', name: 'Session at New Lake' }),
    );
    expect(sessions.put).not.toHaveBeenCalledWith(expect.objectContaining({ id: '4' }));
    expect(sessions.put).not.toHaveBeenCalledWith(expect.objectContaining({ id: '5' }));
  });

  it('patches session spots linked by lakeSpotId', async () => {
    sessions.getAll.mockResolvedValue([
      session({
        id: 's1',
        lakeId: 'lake-1',
        sessionSpots: [
          {
            id: 'ss1',
            lakeSpotId: 'spot-1',
            name: 'Old Spot',
            depth: 1,
          },
          {
            id: 'ss2',
            lakeSpotId: 'other',
            name: 'Keep',
          },
        ],
      }),
    ]);

    await service.onLakeSpotUpdated('lake-1', 'spot-1', {
      name: 'New Spot',
      latitude: 1,
      longitude: 2,
      depth: 3.5,
      bottomType: 'gravel',
      notes: 'updated',
    });

    expect(sessions.put).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 's1',
        sessionSpots: [
          expect.objectContaining({
            id: 'ss1',
            name: 'New Spot',
            latitude: 1,
            longitude: 2,
            depth: 3.5,
            bottomType: 'gravel',
            notes: 'updated',
          }),
          expect.objectContaining({ id: 'ss2', name: 'Keep' }),
        ],
      }),
    );
  });

  it('rewrites option strings on catches, rods, settings, lakes, and filters', async () => {
    catches.getAll.mockResolvedValue([
      catchRecord({ id: 'c1', species: 'Carp', bait: 'Corn', tags: ['Corn', 'night'] }),
      catchRecord({ id: 'c2', species: 'Pike', bait: 'Worm' }),
    ]);
    sessions.getAll.mockResolvedValue([
      session({
        id: 's1',
        rods: [
          {
            id: 'r1',
            sessionId: 's1',
            rodNumber: 1,
            name: 'Rod 1',
            bait: 'Corn',
            biteCount: 0,
            fishSpottedCount: 0,
            isActive: true,
          },
        ],
        tags: ['Corn'],
      }),
    ]);
    lakes.getAll.mockResolvedValue([
      lake({
        id: 'l1',
        spots: [
          {
            id: 'sp1',
            name: 'A',
            recommendedBait: 'Corn',
            isFavorite: false,
          },
        ],
      }),
    ]);

    await service.onOptionRenamed('bait', 'Corn', 'Tiger Nut');

    expect(catches.put).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'c1',
        bait: 'Tiger Nut',
        tags: ['Corn', 'night'],
      }),
    );
    expect(catches.put).not.toHaveBeenCalledWith(expect.objectContaining({ id: 'c2' }));
    expect(sessions.put).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 's1',
        rods: [expect.objectContaining({ bait: 'Tiger Nut' })],
        tags: ['Corn'],
      }),
    );
    expect(lakes.put).toHaveBeenCalledWith(
      expect.objectContaining({
        spots: [expect.objectContaining({ recommendedBait: 'Tiger Nut' })],
      }),
    );
    expect(settings.update).toHaveBeenCalledWith({ favoriteBaits: ['Tiger Nut'] });
    expect(filters.rewriteOptionValue).toHaveBeenCalledWith('bait', 'Corn', 'Tiger Nut');
  });

  it('rewrites tag options on catches and sessions', async () => {
    catches.getAll.mockResolvedValue([
      catchRecord({ id: 'c1', tags: ['night', 'solo'] }),
    ]);
    sessions.getAll.mockResolvedValue([
      session({ id: 's1', tags: ['night'] }),
    ]);

    await service.onOptionRenamed('tag', 'night', 'avond');

    expect(catches.put).toHaveBeenCalledWith(
      expect.objectContaining({ tags: ['avond', 'solo'] }),
    );
    expect(sessions.put).toHaveBeenCalledWith(
      expect.objectContaining({ tags: ['avond'] }),
    );
  });

  it('builds default titles for all locales', () => {
    const titles = service.defaultSessionTitlesFor('Meerpolder');
    expect(titles.has('Session at Meerpolder')).toBe(true);
    expect(titles.has('Sessie bij Meerpolder')).toBe(true);
    expect(titles.has('Sitzung am Meerpolder')).toBe(true);
  });
});

function session(partial: Partial<FishingSession> & { id: string }): FishingSession {
  return {
    name: 'Session',
    status: 'completed',
    startDate: '2026-01-01T00:00:00.000Z',
    sessionSpots: [],
    rods: [],
    photoIds: [],
    catchCount: 0,
    totalCatchWeightKg: 0,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...partial,
  };
}

function catchRecord(partial: Partial<Catch> & { id: string }): Catch {
  return {
    sessionId: 's1',
    species: 'Carp',
    caughtAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...partial,
  };
}

function lake(partial: Partial<Lake> & { id: string }): Lake {
  return {
    name: 'Lake',
    isFavorite: false,
    spots: [],
    photoIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...partial,
  };
}

// silence unused import if category used only in calls