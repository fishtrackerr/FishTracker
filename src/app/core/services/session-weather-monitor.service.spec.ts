import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';
import { WeatherWarning } from '../models';
import { ConnectivityService } from './connectivity.service';
import { FishingModeService } from './fishing-mode.service';
import { NotificationService } from './notification.service';
import { SessionEventService } from './session-event.service';
import { SessionService } from './session.service';
import { SettingsService } from './settings.service';
import { WeatherService } from './weather.service';
import {
  SessionWeatherMonitorService,
  takeEscalatedWarnings,
  weatherWarningFingerprint,
} from './session-weather-monitor.service';

describe('takeEscalatedWarnings', () => {
  const stormDanger: WeatherWarning = {
    type: 'storm',
    message: 'Storm conditions detected',
    severity: 'danger',
  };
  const windWarning: WeatherWarning = {
    type: 'wind',
    message: 'Strong wind 55 km/h',
    severity: 'warning',
  };
  const windDanger: WeatherWarning = {
    type: 'wind',
    message: 'Dangerous wind 80 km/h',
    severity: 'danger',
  };

  it('builds fingerprints as type:severity', () => {
    expect(weatherWarningFingerprint(stormDanger)).toBe('storm:danger');
  });

  it('alerts on first appearance of warnings', () => {
    const previous = new Set<string>();
    const escalated = takeEscalatedWarnings(previous, [stormDanger, windWarning]);
    expect(escalated).toEqual([stormDanger, windWarning]);
    expect(previous.has('storm:danger')).toBe(true);
    expect(previous.has('wind:warning')).toBe(true);
  });

  it('does not re-alert the same warning fingerprint', () => {
    const previous = new Set(['storm:danger', 'wind:warning']);
    const escalated = takeEscalatedWarnings(previous, [stormDanger, windWarning]);
    expect(escalated).toEqual([]);
  });

  it('alerts when severity escalates from warning to danger', () => {
    const previous = new Set(['wind:warning']);
    const escalated = takeEscalatedWarnings(previous, [windDanger]);
    expect(escalated).toEqual([windDanger]);
    expect(previous.has('wind:danger')).toBe(true);
    expect(previous.has('wind:warning')).toBe(false);
  });

  it('does not alert when severity drops from danger to warning', () => {
    const previous = new Set(['wind:danger']);
    const escalated = takeEscalatedWarnings(previous, [windWarning]);
    expect(escalated).toEqual([]);
  });

  it('re-alerts after a warning clears and returns', () => {
    const previous = new Set<string>();
    takeEscalatedWarnings(previous, [stormDanger]);
    takeEscalatedWarnings(previous, []);
    const again = takeEscalatedWarnings(previous, [stormDanger]);
    expect(again).toEqual([stormDanger]);
  });
});

describe('SessionWeatherMonitorService', () => {
  it('re-subscribes to the active session when the fishing mode is chosen', async () => {
    const mode = signal<string | null>(null);
    const watchActive = vi.fn(() => of(mode() ? { id: 's1', weather: undefined } : undefined));
    TestBed.configureTestingModule({
      providers: [
        { provide: FishingModeService, useValue: { selectedMode: mode.asReadonly() } },
        { provide: SessionService, useValue: { watchActive } },
        { provide: WeatherService, useValue: {} },
        { provide: SettingsService, useValue: { get: () => ({ autoLoadWeather: false }) } },
        { provide: NotificationService, useValue: {} },
        { provide: SessionEventService, useValue: {} },
        { provide: ConnectivityService, useValue: { online$: of(true) } },
      ],
    });
    const monitor = TestBed.inject(SessionWeatherMonitorService);

    monitor.start();
    TestBed.tick();
    expect(watchActive).toHaveBeenCalledTimes(1);

    mode.set('pike');
    TestBed.tick();

    expect(watchActive).toHaveBeenCalledTimes(2);
    monitor.ngOnDestroy();
  });
});
