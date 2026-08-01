import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { FishingModeService } from './fishing-mode.service';
import { SettingsService } from './settings.service';

describe('FishingModeService', () => {
  let service: FishingModeService;

  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [FishingModeService, SettingsService],
    });
    service = TestBed.inject(FishingModeService);
  });

  afterEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it('starts with no mode selected', () => {
    expect(service.getMode()).toBeNull();
    expect(service.hasMode()).toBe(false);
  });

  it('persists selected mode in sessionStorage', () => {
    service.setMode('pike');
    expect(service.getMode()).toBe('pike');
    expect(sessionStorage.getItem('fish-tracker-fishing-mode')).toBe('pike');
    expect(service.requireMode()).toBe('pike');
  });

  it('clears mode on clearMode', () => {
    service.setMode('bass');
    service.clearMode();
    expect(service.getMode()).toBeNull();
    expect(sessionStorage.getItem('fish-tracker-fishing-mode')).toBeNull();
  });

  it('seeds mode preferences on first selection', () => {
    service.setMode('feeder');
    const prefs = service.getActivePreferences();
    expect(prefs.favoriteSpecies.length).toBeGreaterThan(0);
    expect(prefs.favoriteBaits.length).toBeGreaterThan(0);
  });
});
