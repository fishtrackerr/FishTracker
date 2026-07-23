import { Injectable, computed, inject, signal } from '@angular/core';
import { SettingsService } from './settings.service';
import { AppLanguage } from '../models';

type Dictionary = Record<string, unknown>;

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly settings = inject(SettingsService);
  private readonly cache = new Map<AppLanguage, Dictionary>();

  readonly supportedLanguages: readonly AppLanguage[] = ['nl', 'en', 'de'];
  readonly language = signal<AppLanguage>('nl');
  readonly dictionary = signal<Dictionary>({});
  readonly loaded = computed(() => Object.keys(this.dictionary()).length > 0);

  constructor() {
    const fromSettings = this.normalizeLanguage(this.settings.get().language);
    this.language.set(fromSettings);
    void this.loadLanguage(fromSettings);
  }

  async setLanguage(language: AppLanguage): Promise<void> {
    const normalized = this.normalizeLanguage(language);
    this.language.set(normalized);
    this.settings.update({ language: normalized });
    await this.loadLanguage(normalized);
  }

  t(key: string, params?: Record<string, string | number>): string {
    const raw = this.getByPath(this.dictionary(), key);
    const base = typeof raw === 'string' ? raw : key;

    if (!params) {
      return base;
    }

    return Object.entries(params).reduce((acc, [paramKey, value]) => {
      return acc.replaceAll(`{{${paramKey}}}`, String(value));
    }, base);
  }

  private async loadLanguage(language: AppLanguage): Promise<void> {
    if (this.cache.has(language)) {
      this.dictionary.set(this.cache.get(language) ?? {});
      return;
    }

    try {
      const response = await fetch(`assets/i18n/${language}.json`, {
        cache: 'no-store',
      });
      if (!response.ok) {
        throw new Error(`Failed to load language: ${language}`);
      }
      const data = (await response.json()) as Dictionary;
      this.cache.set(language, data);
      this.dictionary.set(data);
    } catch {
      if (language !== 'nl') {
        await this.loadLanguage('nl');
      } else {
        this.dictionary.set({});
      }
    }
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
