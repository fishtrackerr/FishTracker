import { Injectable, signal } from '@angular/core';
import { AppSettings, DEFAULT_SETTINGS } from '../models';

const STORAGE_KEY = 'fish-tracker-settings';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly settingsSignal = signal<AppSettings>(this.load());

  readonly settings = this.settingsSignal.asReadonly();

  get(): AppSettings {
    return this.settingsSignal();
  }

  update(partial: Partial<AppSettings>): void {
    const next = { ...this.settingsSignal(), ...partial };
    this.settingsSignal.set(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  private load(): AppSettings {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return { ...DEFAULT_SETTINGS };
      }
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  }
}
