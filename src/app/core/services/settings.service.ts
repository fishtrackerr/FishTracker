import { Injectable, signal } from '@angular/core';
import { AppSettings, DEFAULT_SETTINGS } from '../models';
import {
  DEFAULT_FISHING_MODE,
  ModePreferences,
  defaultModePreferences,
  isFishingMode,
} from '../models/fishing-mode.model';

const STORAGE_KEY = 'fish-tracker-settings';

/** Keys allowed when hydrating settings from localStorage. */
const SETTINGS_KEYS = Object.keys(DEFAULT_SETTINGS) as (keyof AppSettings)[];

const OPTIONAL_SETTINGS_KEYS: (keyof AppSettings)[] = [
  'pinHash',
  'pinSalt',
  'lastLakeId',
  'homepageImageId',
  'defaultLakeId',
  'aiApiKey',
  'aiApiKeyEncrypted',
  'aiApiKeyIv',
  'aiKeySalt',
  'aiBaseUrl',
  'aiModel',
  'modePreferences',
];

const ALLOWED_SETTINGS_KEYS = new Set<keyof AppSettings>([
  ...SETTINGS_KEYS,
  ...OPTIONAL_SETTINGS_KEYS,
]);

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly settingsSignal = signal<AppSettings>(this.load());

  readonly settings = this.settingsSignal.asReadonly();

  get(): AppSettings {
    return this.settingsSignal();
  }

  update(partial: Partial<AppSettings>): void {
    const next: AppSettings = { ...this.settingsSignal(), ...partial };
    for (const key of Object.keys(partial) as (keyof AppSettings)[]) {
      if (partial[key] === undefined) {
        delete (next as unknown as Record<string, unknown>)[key];
      }
    }
    this.settingsSignal.set(next);
    this.persist(next);
  }

  /** Fully replaces settings (clears optional keys omitted from the payload). */
  replace(settings: AppSettings): void {
    const next = { ...settings };
    this.settingsSignal.set(next);
    this.persist(next);
  }

  private persist(settings: AppSettings): void {
    const toStore = { ...settings } as Record<string, unknown>;
    // Never persist plaintext once ciphertext exists; keep legacy plaintext until vault migrates.
    if (settings.aiApiKeyEncrypted || !settings.aiApiKey) {
      delete toStore['aiApiKey'];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  }

  private load(): AppSettings {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return { ...DEFAULT_SETTINGS, modePreferences: {} };
      }
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      const picked: Partial<AppSettings> = {};
      for (const key of ALLOWED_SETTINGS_KEYS) {
        if (Object.prototype.hasOwnProperty.call(parsed, key) && parsed[key] !== undefined) {
          (picked as Record<string, unknown>)[key] = parsed[key];
        }
      }
      const merged: AppSettings = { ...DEFAULT_SETTINGS, ...picked, modePreferences: {} };
      merged.modePreferences = this.migrateModePreferences(merged, picked.modePreferences);
      const carperPrefs = merged.modePreferences[DEFAULT_FISHING_MODE];
      if (carperPrefs) {
        merged.favoriteSpecies = carperPrefs.favoriteSpecies;
        merged.favoriteBaits = carperPrefs.favoriteBaits;
        merged.favoriteRigs = carperPrefs.favoriteRigs;
        merged.lastLakeId = carperPrefs.lastLakeId;
        merged.defaultLakeId = carperPrefs.defaultLakeId;
        merged.homepageImageId = carperPrefs.homepageImageId;
      }
      return merged;
    } catch {
      return { ...DEFAULT_SETTINGS, modePreferences: {} };
    }
  }

  private migrateModePreferences(
    settings: AppSettings,
    raw: AppSettings['modePreferences'],
  ): NonNullable<AppSettings['modePreferences']> {
    const result: NonNullable<AppSettings['modePreferences']> = {};

    if (raw && typeof raw === 'object') {
      for (const [key, value] of Object.entries(raw)) {
        if (!isFishingMode(key) || !value || typeof value !== 'object') {
          continue;
        }
        const defaults = defaultModePreferences(key);
        result[key] = {
          ...defaults,
          ...value,
          favoriteSpecies: Array.isArray(value.favoriteSpecies) && value.favoriteSpecies.length
            ? value.favoriteSpecies
            : defaults.favoriteSpecies,
          favoriteBaits: Array.isArray(value.favoriteBaits) && value.favoriteBaits.length
            ? value.favoriteBaits
            : defaults.favoriteBaits,
          favoriteRigs: Array.isArray(value.favoriteRigs) && value.favoriteRigs.length
            ? value.favoriteRigs
            : defaults.favoriteRigs,
        } satisfies ModePreferences;
      }
    }

    if (!result[DEFAULT_FISHING_MODE]) {
      result[DEFAULT_FISHING_MODE] = {
        favoriteSpecies: [...settings.favoriteSpecies],
        favoriteBaits: [...settings.favoriteBaits],
        favoriteRigs: [...settings.favoriteRigs],
        lastLakeId: settings.lastLakeId,
        defaultLakeId: settings.defaultLakeId,
        homepageImageId: settings.homepageImageId,
      };
    }

    return result;
  }
}
