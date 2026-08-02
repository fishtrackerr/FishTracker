import type { Transaction } from 'dexie';
import {
  FILTER_PRESETS_KEY_PREFIX,
  FISHING_MODE_KEY,
} from '../constants/storage-keys';
import type { ModePreferences } from '../models/fishing-mode.model';
import { nowIso } from '../utils';

export const SETTINGS_STORAGE_KEY = 'fish-tracker-settings';

export const SOURCE_MODE = 'carper' as const;
export const TARGET_MODE = 'catfish' as const;

export const CARPER_TO_CATFISH_TABLES = [
  'sessions',
  'catches',
  'lakes',
  'images',
  'biteEvents',
  'fishSpottedEvents',
  'rodSpotHistory',
  'sessionEvents',
  'sessionWeather',
  'userOptions',
  'chatThreads',
] as const;

type ModeScopedRow = {
  id: string;
  fishingMode?: string;
  status?: string;
  endDate?: string;
  updatedAt?: string;
};

/** Unique concat preserving first-seen order (carper favorites first). */
export function uniqueConcat(...lists: Array<string[] | undefined>): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const list of lists) {
    if (!list) {
      continue;
    }
    for (const item of list) {
      if (!seen.has(item)) {
        seen.add(item);
        out.push(item);
      }
    }
  }
  return out;
}

/**
 * Merge carper prefs into catfish (carper wins for lake/homepage IDs;
 * favorites = unique concat carper then catfish), then drop carper.
 */
export function mergeModePreferencesForMigration(
  prefs: Partial<Record<string, ModePreferences>> | undefined,
): Partial<Record<string, ModePreferences>> {
  const result: Partial<Record<string, ModePreferences>> = { ...(prefs ?? {}) };
  const carper = result[SOURCE_MODE];
  if (!carper) {
    return result;
  }

  const catfish = result[TARGET_MODE];
  result[TARGET_MODE] = {
    favoriteSpecies: uniqueConcat(carper.favoriteSpecies, catfish?.favoriteSpecies),
    favoriteBaits: uniqueConcat(carper.favoriteBaits, catfish?.favoriteBaits),
    favoriteRigs: uniqueConcat(carper.favoriteRigs, catfish?.favoriteRigs),
    lastLakeId: carper.lastLakeId ?? catfish?.lastLakeId,
    defaultLakeId: carper.defaultLakeId ?? catfish?.defaultLakeId,
    homepageImageId: carper.homepageImageId ?? catfish?.homepageImageId,
  };
  delete result[SOURCE_MODE];
  return result;
}

export interface SessionDemotePatch {
  id: string;
  status: 'completed';
  endDate: string;
  updatedAt: string;
}

/** If both modes have an active session, demote the carper one before remap. */
export function resolveActiveSessionConflict(
  sessions: ModeScopedRow[],
  now: string = nowIso(),
): SessionDemotePatch[] {
  const carperActive = sessions.filter(
    (s) => s.fishingMode === SOURCE_MODE && s.status === 'active',
  );
  const catfishActive = sessions.some(
    (s) => s.fishingMode === TARGET_MODE && s.status === 'active',
  );
  if (!catfishActive || carperActive.length === 0) {
    return [];
  }
  return carperActive.map((s) => ({
    id: s.id,
    status: 'completed' as const,
    endDate: s.endDate ?? now,
    updatedAt: now,
  }));
}

export function migrateLocalStorageForCarperToCatfish(
  storage: Storage | undefined = typeof localStorage !== 'undefined' ? localStorage : undefined,
  sessionStore: Storage | undefined =
    typeof sessionStorage !== 'undefined' ? sessionStorage : undefined,
): void {
  if (storage) {
    try {
      const raw = storage.getItem(SETTINGS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          modePreferences?: Partial<Record<string, ModePreferences>>;
        };
        if (parsed && typeof parsed === 'object') {
          parsed.modePreferences = mergeModePreferencesForMigration(parsed.modePreferences);
          storage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(parsed));
        }
      }
    } catch {
      // Ignore corrupt settings during migration.
    }

    const carperPresetsKey = `${FILTER_PRESETS_KEY_PREFIX}:${SOURCE_MODE}`;
    const catfishPresetsKey = `${FILTER_PRESETS_KEY_PREFIX}:${TARGET_MODE}`;
    try {
      const carperPresets = storage.getItem(carperPresetsKey);
      if (carperPresets != null) {
        storage.setItem(catfishPresetsKey, carperPresets);
        storage.removeItem(carperPresetsKey);
      }
    } catch {
      // Ignore storage errors.
    }
  }

  if (sessionStore) {
    try {
      if (sessionStore.getItem(FISHING_MODE_KEY) === SOURCE_MODE) {
        sessionStore.setItem(FISHING_MODE_KEY, TARGET_MODE);
      }
    } catch {
      // Ignore sessionStorage errors (private mode, etc.).
    }
  }
}

/** Dexie v8 upgrade: remaps carper rows to catfish and migrates related storage. */
export async function migrateCarperToCatfish(
  tx: Transaction,
  storage?: Storage,
  sessionStore?: Storage,
): Promise<void> {
  const sessions = (await tx.table('sessions').toArray()) as ModeScopedRow[];
  const demotions = resolveActiveSessionConflict(sessions);
  for (const patch of demotions) {
    await tx.table('sessions').update(patch.id, {
      status: patch.status,
      endDate: patch.endDate,
      updatedAt: patch.updatedAt,
    });
  }

  for (const tableName of CARPER_TO_CATFISH_TABLES) {
    const rows = (await tx.table(tableName).toArray()) as ModeScopedRow[];
    for (const row of rows) {
      if (row.fishingMode === SOURCE_MODE) {
        await tx.table(tableName).update(row.id, { fishingMode: TARGET_MODE });
      }
    }
  }

  migrateLocalStorageForCarperToCatfish(storage, sessionStore);
}
