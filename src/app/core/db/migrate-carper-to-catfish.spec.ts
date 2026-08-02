import { describe, expect, it } from 'vitest';
import { FILTER_PRESETS_KEY_PREFIX, FISHING_MODE_KEY } from '../constants/storage-keys';
import type { ModePreferences } from '../models/fishing-mode.model';
import {
  CARPER_TO_CATFISH_TABLES,
  SETTINGS_STORAGE_KEY,
  SOURCE_MODE,
  TARGET_MODE,
  mergeModePreferencesForMigration,
  migrateCarperToCatfish,
  migrateLocalStorageForCarperToCatfish,
  resolveActiveSessionConflict,
  uniqueConcat,
} from './migrate-carper-to-catfish';

describe('uniqueConcat', () => {
  it('preserves first-seen order and drops duplicates', () => {
    expect(uniqueConcat(['a', 'b'], ['b', 'c'], undefined, ['a', 'd'])).toEqual([
      'a',
      'b',
      'c',
      'd',
    ]);
  });
});

describe('mergeModePreferencesForMigration', () => {
  const carper: ModePreferences = {
    favoriteSpecies: ['Carp'],
    favoriteBaits: ['Boilie'],
    favoriteRigs: ['Hair Rig'],
    lastLakeId: 'lake-carper',
    defaultLakeId: 'lake-default-c',
    homepageImageId: 'img-c',
  };

  const catfish: ModePreferences = {
    favoriteSpecies: ['Catfish', 'Carp'],
    favoriteBaits: ['Liver'],
    favoriteRigs: ['Ledger'],
    lastLakeId: 'lake-catfish',
    defaultLakeId: 'lake-default-cf',
    homepageImageId: 'img-cf',
  };

  it('is a no-op when carper prefs are missing', () => {
    expect(mergeModePreferencesForMigration({ [TARGET_MODE]: catfish })).toEqual({
      [TARGET_MODE]: catfish,
    });
    expect(mergeModePreferencesForMigration(undefined)).toEqual({});
  });

  it('moves carper prefs into empty catfish and drops carper', () => {
    expect(mergeModePreferencesForMigration({ [SOURCE_MODE]: carper })).toEqual({
      [TARGET_MODE]: carper,
    });
  });

  it('merges with carper winning lake/homepage and unique favorites', () => {
    expect(
      mergeModePreferencesForMigration({
        [SOURCE_MODE]: carper,
        [TARGET_MODE]: catfish,
      }),
    ).toEqual({
      [TARGET_MODE]: {
        favoriteSpecies: ['Carp', 'Catfish'],
        favoriteBaits: ['Boilie', 'Liver'],
        favoriteRigs: ['Hair Rig', 'Ledger'],
        lastLakeId: 'lake-carper',
        defaultLakeId: 'lake-default-c',
        homepageImageId: 'img-c',
      },
    });
  });

  it('falls back to catfish lake ids when carper omits them', () => {
    const sparseCarper: ModePreferences = {
      favoriteSpecies: ['Carp'],
      favoriteBaits: [],
      favoriteRigs: [],
    };
    expect(
      mergeModePreferencesForMigration({
        [SOURCE_MODE]: sparseCarper,
        [TARGET_MODE]: catfish,
      }),
    ).toEqual({
      [TARGET_MODE]: {
        favoriteSpecies: ['Carp', 'Catfish'],
        favoriteBaits: ['Liver'],
        favoriteRigs: ['Ledger'],
        lastLakeId: 'lake-catfish',
        defaultLakeId: 'lake-default-cf',
        homepageImageId: 'img-cf',
      },
    });
  });
});

describe('resolveActiveSessionConflict', () => {
  const now = '2026-08-02T12:00:00.000Z';

  it('demotes carper active when catfish already has active', () => {
    const patches = resolveActiveSessionConflict(
      [
        { id: 's-carper', fishingMode: SOURCE_MODE, status: 'active' },
        { id: 's-catfish', fishingMode: TARGET_MODE, status: 'active' },
      ],
      now,
    );
    expect(patches).toEqual([
      {
        id: 's-carper',
        status: 'completed',
        endDate: now,
        updatedAt: now,
      },
    ]);
  });

  it('keeps existing endDate when demoting', () => {
    const patches = resolveActiveSessionConflict(
      [
        {
          id: 's-carper',
          fishingMode: SOURCE_MODE,
          status: 'active',
          endDate: '2026-07-01T00:00:00.000Z',
        },
        { id: 's-catfish', fishingMode: TARGET_MODE, status: 'active' },
      ],
      now,
    );
    expect(patches[0]?.endDate).toBe('2026-07-01T00:00:00.000Z');
  });

  it('does nothing when only one mode has an active session', () => {
    expect(
      resolveActiveSessionConflict([
        { id: 's-carper', fishingMode: SOURCE_MODE, status: 'active' },
      ]),
    ).toEqual([]);
    expect(
      resolveActiveSessionConflict([
        { id: 's-catfish', fishingMode: TARGET_MODE, status: 'active' },
        { id: 's-carper', fishingMode: SOURCE_MODE, status: 'completed' },
      ]),
    ).toEqual([]);
  });
});

describe('migrateLocalStorageForCarperToCatfish', () => {
  function memoryStorage(initial: Record<string, string> = {}): Storage {
    const map = new Map(Object.entries(initial));
    return {
      get length() {
        return map.size;
      },
      clear: () => map.clear(),
      getItem: (key: string) => map.get(key) ?? null,
      key: (index: number) => [...map.keys()][index] ?? null,
      removeItem: (key: string) => {
        map.delete(key);
      },
      setItem: (key: string, value: string) => {
        map.set(key, value);
      },
    };
  }

  it('moves modePreferences, filter presets, and active mode', () => {
    const local = memoryStorage({
      [SETTINGS_STORAGE_KEY]: JSON.stringify({
        modePreferences: {
          [SOURCE_MODE]: {
            favoriteSpecies: ['Carp'],
            favoriteBaits: [],
            favoriteRigs: [],
            lastLakeId: 'lake-1',
          },
        },
      }),
      [`${FILTER_PRESETS_KEY_PREFIX}:${SOURCE_MODE}`]: '[{"name":"A"}]',
      [`${FILTER_PRESETS_KEY_PREFIX}:${TARGET_MODE}`]: '[{"name":"B"}]',
    });
    const session = memoryStorage({
      [FISHING_MODE_KEY]: SOURCE_MODE,
    });

    migrateLocalStorageForCarperToCatfish(local, session);

    const settings = JSON.parse(local.getItem(SETTINGS_STORAGE_KEY)!);
    expect(settings.modePreferences.carper).toBeUndefined();
    expect(settings.modePreferences.catfish.lastLakeId).toBe('lake-1');
    expect(local.getItem(`${FILTER_PRESETS_KEY_PREFIX}:${SOURCE_MODE}`)).toBeNull();
    expect(local.getItem(`${FILTER_PRESETS_KEY_PREFIX}:${TARGET_MODE}`)).toBe(
      '[{"name":"A"}]',
    );
    expect(session.getItem(FISHING_MODE_KEY)).toBe(TARGET_MODE);
  });

  it('leaves non-carper session mode unchanged', () => {
    const session = memoryStorage({ [FISHING_MODE_KEY]: 'pike' });
    migrateLocalStorageForCarperToCatfish(memoryStorage(), session);
    expect(session.getItem(FISHING_MODE_KEY)).toBe('pike');
  });
});

describe('migrateCarperToCatfish', () => {
  it('demotes conflicting active session then remaps carper rows', async () => {
    const sessions = [
      { id: 's1', fishingMode: SOURCE_MODE, status: 'active' },
      { id: 's2', fishingMode: TARGET_MODE, status: 'active' },
    ];
    const lakes = [
      { id: 'l1', fishingMode: SOURCE_MODE },
      { id: 'l2', fishingMode: 'pike' },
    ];
    const updates: Array<{ table: string; id: string; patch: Record<string, unknown> }> =
      [];

    const tableData: Record<string, unknown[]> = {
      sessions,
      lakes,
    };
    for (const name of CARPER_TO_CATFISH_TABLES) {
      if (!tableData[name]) {
        tableData[name] = [];
      }
    }

    const tx = {
      table: (name: string) => ({
        toArray: async () => tableData[name] ?? [],
        update: async (id: string, patch: Record<string, unknown>) => {
          updates.push({ table: name, id, patch });
          const rows = tableData[name] as Array<Record<string, unknown>>;
          const row = rows.find((r) => r['id'] === id);
          if (row) {
            Object.assign(row, patch);
          }
        },
      }),
    };

    await migrateCarperToCatfish(tx as never);

    expect(updates.some((u) => u.table === 'sessions' && u.id === 's1' && u.patch['status'] === 'completed')).toBe(
      true,
    );
    expect(
      updates.some(
        (u) =>
          u.table === 'sessions' &&
          u.id === 's1' &&
          u.patch['fishingMode'] === TARGET_MODE,
      ),
    ).toBe(true);
    expect(
      updates.some(
        (u) => u.table === 'lakes' && u.id === 'l1' && u.patch['fishingMode'] === TARGET_MODE,
      ),
    ).toBe(true);
    expect(updates.some((u) => u.id === 'l2')).toBe(false);
    expect(updates.some((u) => u.id === 's2' && u.patch['fishingMode'])).toBe(false);
  });

  it('is a no-op remap when there are no carper rows', async () => {
    const updates: unknown[] = [];
    const tx = {
      table: () => ({
        toArray: async () => [{ id: 'x', fishingMode: TARGET_MODE, status: 'completed' }],
        update: async (...args: unknown[]) => {
          updates.push(args);
        },
      }),
    };
    await migrateCarperToCatfish(tx as never);
    expect(updates).toEqual([]);
  });
});
