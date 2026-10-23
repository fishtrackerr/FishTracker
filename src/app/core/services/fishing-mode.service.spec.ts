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

  it('persists selected mode in localStorage', () => {
    service.setMode('pike');
    expect(service.getMode()).toBe('pike');
    expect(localStorage.getItem('fish-tracker-fishing-mode')).toBe('pike');
    expect(sessionStorage.getItem('fish-tracker-fishing-mode')).toBeNull();
    expect(service.requireMode()).toBe('pike');
  });

  it('remembers the mode across restarts', () => {
    localStorage.setItem('fish-tracker-fishing-mode', 'bass');
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [FishingModeService, SettingsService] });
    expect(TestBed.inject(FishingModeService).getMode()).toBe('bass');
  });

  it('adopts a legacy sessionStorage mode when localStorage has none', () => {
    sessionStorage.setItem('fish-tracker-fishing-mode', 'feeder');
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [FishingModeService, SettingsService] });
    expect(TestBed.inject(FishingModeService).getMode()).toBe('feeder');
    expect(localStorage.getItem('fish-tracker-fishing-mode')).toBe('feeder');
  });

  it('ignores invalid stored modes', () => {
    localStorage.setItem('fish-tracker-fishing-mode', 'nonsense');
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [FishingModeService, SettingsService] });
    expect(TestBed.inject(FishingModeService).getMode()).toBeNull();
  });

  it('clears mode on clearMode', () => {
    service.setMode('bass');
    service.clearMode();
    expect(service.getMode()).toBeNull();
    expect(localStorage.getItem('fish-tracker-fishing-mode')).toBeNull();
    expect(sessionStorage.getItem('fish-tracker-fishing-mode')).toBeNull();
  });

  it('clearMode also removes a legacy sessionStorage copy', () => {
    service.setMode('bass');
    sessionStorage.setItem('fish-tracker-fishing-mode', 'bass');
    service.clearMode();
    expect(sessionStorage.getItem('fish-tracker-fishing-mode')).toBeNull();
  });

  it('seeds mode preferences on first selection', () => {
    service.setMode('feeder');
    const prefs = service.getActivePreferences();
    expect(prefs.favoriteSpecies.length).toBeGreaterThan(0);
    expect(prefs.favoriteBaits.length).toBeGreaterThan(0);
  });
});
