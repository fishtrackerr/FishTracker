import { Injectable, signal } from '@angular/core';
import { AppSettings, DEFAULT_SETTINGS } from '../models';

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
        return { ...DEFAULT_SETTINGS };
      }
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      const picked: Partial<AppSettings> = {};
      for (const key of ALLOWED_SETTINGS_KEYS) {
        if (Object.prototype.hasOwnProperty.call(parsed, key) && parsed[key] !== undefined) {
          (picked as Record<string, unknown>)[key] = parsed[key];
        }
      }
      return { ...DEFAULT_SETTINGS, ...picked };
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  }
}
