import { Injectable, computed, inject, signal } from '@angular/core';
import { SettingsService } from './settings.service';
import { AppLanguage } from '../models';
import de from '../../../assets/i18n/de.json';
import en from '../../../assets/i18n/en.json';
import nl from '../../../assets/i18n/nl.json';

type Dictionary = Record<string, unknown>;

/** Bundled dictionaries — always available offline (no network fetch). */
const BUNDLED: Record<AppLanguage, Dictionary> = {
  nl: nl as Dictionary,
  en: en as Dictionary,
  de: de as Dictionary,
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly settings = inject(SettingsService);
  private readonly cache = new Map<AppLanguage, Dictionary>(
    (Object.entries(BUNDLED) as [AppLanguage, Dictionary][]).map(([lang, dict]) => [lang, dict]),
  );
  /** Ultimate offline safety net when a key is missing in the active language. */
  private readonly fallbackLanguage: AppLanguage = 'en';

  readonly supportedLanguages: readonly AppLanguage[] = ['nl', 'en', 'de'];
  readonly language = signal<AppLanguage>('nl');
  readonly dictionary = signal<Dictionary>({});
  readonly loaded = computed(() => Object.keys(this.dictionary()).length > 0);

  constructor() {
    const fromSettings = this.normalizeLanguage(this.settings.get().language);
    this.language.set(fromSettings);
    this.applyLanguage(fromSettings);
  }

  async setLanguage(language: AppLanguage): Promise<void> {
    const normalized = this.normalizeLanguage(language);
    this.language.set(normalized);
    this.settings.update({ language: normalized });
    this.applyLanguage(normalized);
  }

  t(key: string, params?: Record<string, string | number>): string {
    const fromActive = this.getByPath(this.dictionary(), key);
    let base = typeof fromActive === 'string' ? fromActive : '';

    if (!base && this.language() !== this.fallbackLanguage) {
      const fromFallback = this.getByPath(this.cache.get(this.fallbackLanguage) ?? {}, key);
      base = typeof fromFallback === 'string' ? fromFallback : '';
    }

    if (!base) {
      base = key;
    }

    if (!params) {
      return base;
    }

    return Object.entries(params).reduce((acc, [paramKey, value]) => {
      return acc.replaceAll(`{{${paramKey}}}`, String(value));
    }, base);
  }

  private applyLanguage(language: AppLanguage): void {
    const data = this.cache.get(language) ?? BUNDLED.en;
    this.dictionary.set(data);
  }

  private getByPath(obj: Dictionary, path: string): unknown {
    return path.split('.').reduce<unknown>((acc, segment) => {
      if (acc && typeof acc === 'object' && segment in (acc as Dictionary)) {
        return (acc as Dictionary)[segment];
      }
      return undefined;
    }, obj);
  }

  private normalizeLanguage(language: string): AppLanguage {
    return this.supportedLanguages.includes(language as AppLanguage)
      ? (language as AppLanguage)
      : 'nl';
  }
}
