import { beforeEach, describe, expect, it } from 'vitest';
import { DEFAULT_SETTINGS } from '../models';
import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads default settings when storage is empty', () => {
    const service = new SettingsService();

    expect(service.get()).toEqual(DEFAULT_SETTINGS);
  });

  it('merges stored settings with defaults', () => {
    localStorage.setItem(
      'fish-tracker-settings',
      JSON.stringify({
        themeMode: 'light',
        language: 'en',
      }),
    );

    const service = new SettingsService();

    expect(service.get().themeMode).toBe('light');
    expect(service.get().language).toBe('en');
    expect(service.get().favoriteSpecies.length).toBeGreaterThan(0);
  });

  it('updates signal and persists changes to localStorage', () => {
    const service = new SettingsService();

    service.update({ themeMode: 'system', weatherRefreshMinutes: 45 });

    expect(service.settings().themeMode).toBe('system');
    expect(service.settings().weatherRefreshMinutes).toBe(45);

    const raw = localStorage.getItem('fish-tracker-settings');
    expect(raw).toBeTruthy();
    expect(JSON.parse(raw as string)).toEqual(
      expect.objectContaining({
        themeMode: 'system',
        weatherRefreshMinutes: 45,
      }),
    );
  });

  it('falls back to defaults when stored json is invalid', () => {
    localStorage.setItem('fish-tracker-settings', '{invalid json');

    const service = new SettingsService();

    expect(service.get()).toEqual(DEFAULT_SETTINGS);
  });
});
