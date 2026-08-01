import { describe, expect, it } from 'vitest';
import { WeatherWarning } from '../models';
import {
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
