import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { WeatherService } from './weather.service';

const CACHE_KEY = 'fish-tracker-weather-cache';

const openMeteoPayload = {
  current: {
    temperature_2m: 18.4,
    apparent_temperature: 16.2,
    wind_speed_10m: 12.5,
    wind_direction_10m: 220,
    wind_gusts_10m: 24,
    surface_pressure: 1013.2,
    relative_humidity_2m: 62,
    cloud_cover: 40,
    precipitation: 0,
    weather_code: 1,
    uv_index: 3.2,
  },
  daily: {
    time: ['2026-08-01'],
    temperature_2m_max: [22],
    temperature_2m_min: [14],
    sunrise: ['2026-08-01T06:01'],
    sunset: ['2026-08-01T21:32'],
  },
};

describe('WeatherService', () => {
  let service: WeatherService;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    localStorage.clear();
    service = new WeatherService();
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      get: () => true,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  it('fetches live Open-Meteo data when online', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => openMeteoPayload,
    });

    const snapshot = await service.getSnapshot(52.37, 4.89);

    expect(snapshot?.source).toBe('live');
    expect(snapshot?.isCached).toBe(false);
    expect(snapshot?.temperatureC).toBe(18.4);
    expect(snapshot?.description).toBe('Mainly clear');
    expect(snapshot?.windSpeedKmh).toBe(12.5);
    expect(fetchMock).toHaveBeenCalledOnce();

    const url = String(fetchMock.mock.calls[0][0]);
    expect(url).toContain('api.open-meteo.com/v1/forecast');
    expect(url).toContain('temperature_unit=celsius');
    expect(url).toContain('wind_speed_unit=kmh');
    expect(fetchMock.mock.calls[0][1]).toMatchObject({ cache: 'no-store' });
    expect((fetchMock.mock.calls[0][1] as RequestInit).signal).toBeInstanceOf(AbortSignal);
  });

  it('stores cache keyed by coordinates', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => openMeteoPayload,
    });

    await service.getSnapshot(52.37, 4.89);

    const nearby = service.getCachedSnapshotFor(52.38, 4.9);
    expect(nearby?.temperatureC).toBe(18.4);
    expect(nearby?.source).toBe('cached');

    const farAway = service.getCachedSnapshotFor(48.85, 2.35);
    expect(farAway).toBeNull();
  });

  it('does not reuse legacy cache without coordinates for a location', () => {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        description: 'Clear',
        temperatureC: 99,
        windSpeedKmh: 1,
        windDirection: 0,
        airPressureHpa: 1000,
        humidity: 50,
        cloudCoverage: 0,
        rain: false,
        sunrise: '',
        sunset: '',
        moonPhase: 'Full Moon',
        capturedAt: '2026-01-01T00:00:00.000Z',
        source: 'live',
      }),
    );

    expect(service.getCachedSnapshotFor(52.37, 4.89)).toBeNull();
    expect(service.getCachedSnapshot()?.temperatureC).toBe(99);
  });

  it('returns nearby cache when the network request fails', async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: async () => openMeteoPayload,
      })
      .mockResolvedValueOnce({ ok: false });

    await service.getSnapshot(52.37, 4.89);
    const fallback = await service.getSnapshot(52.37, 4.89);

    expect(fallback?.source).toBe('cached');
    expect(fallback?.temperatureC).toBe(18.4);
  });

  it('skips the network and uses nearby cache when offline', async () => {
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      get: () => false,
    });
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        latitude: 52.37,
        longitude: 4.89,
        cachedAt: '2026-08-01T12:00:00.000Z',
        snapshot: {
          description: 'Clear',
          temperatureC: 20,
          windSpeedKmh: 5,
          windDirection: 90,
          airPressureHpa: 1010,
          humidity: 55,
          cloudCoverage: 10,
          rain: false,
          sunrise: '',
          sunset: '',
          moonPhase: 'Waxing Crescent',
          capturedAt: '2026-08-01T12:00:00.000Z',
          source: 'live',
        },
      }),
    );

    const snapshot = await service.getSnapshot(52.37, 4.89);

    expect(fetchMock).not.toHaveBeenCalled();
    expect(snapshot?.source).toBe('cached');
    expect(snapshot?.temperatureC).toBe(20);
  });

  it('clearCache removes stored weather', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => openMeteoPayload,
    });
    await service.getSnapshot(52.37, 4.89);
    service.clearCache();
    expect(service.getCachedSnapshot()).toBeNull();
  });

  describe('getWarnings', () => {
    const base = {
      description: 'Clear',
      temperatureC: 20,
      windSpeedKmh: 10,
      windDirection: 90,
      airPressureHpa: 1010,
      humidity: 50,
      cloudCoverage: 10,
      rain: false,
      sunrise: '',
      sunset: '',
      moonPhase: 'Full Moon',
      capturedAt: '2026-08-01T12:00:00.000Z',
    };

    it('flags current storm as a single danger warning', () => {
      const warnings = service.getWarnings({
        ...base,
        description: 'Thunderstorm',
        stormWarning: true,
        thunderstormProbability: 80,
      });
      expect(warnings.filter((w) => w.type === 'storm' || w.type === 'thunder')).toHaveLength(1);
      expect(warnings[0].severity).toBe('danger');
    });

    it('flags upcoming hourly thunder within 3 hours', () => {
      const warnings = service.getWarnings({
        ...base,
        hourly: [
          { time: '1', temperatureC: 20, precipitationProbability: 40, weatherCode: 2 },
          { time: '2', temperatureC: 19, precipitationProbability: 60, weatherCode: 95 },
          { time: '3', temperatureC: 18, precipitationProbability: 50, weatherCode: 3 },
        ],
      });
      expect(warnings.some((w) => w.message.includes('within 3 hours'))).toBe(true);
      expect(warnings.find((w) => w.type === 'storm')?.severity).toBe('danger');
    });

    it('escalates extreme wind to danger', () => {
      const warnings = service.getWarnings({
        ...base,
        windSpeedKmh: 75,
        windGustKmh: 95,
      });
      const wind = warnings.find((w) => w.type === 'wind');
      expect(wind?.severity).toBe('danger');
    });

    it('flags strong wind as warning', () => {
      const warnings = service.getWarnings({
        ...base,
        windSpeedKmh: 55,
        windGustKmh: 72,
      });
      expect(warnings.find((w) => w.type === 'wind')?.severity).toBe('warning');
    });

    it('does not warn on light rain alone', () => {
      const warnings = service.getWarnings({
        ...base,
        rain: true,
        rainAmountMm: 0.5,
        rainProbability: 20,
      });
      expect(warnings.some((w) => w.type === 'rain')).toBe(false);
    });

    it('flags fire-weather risk from hot dry windy conditions', () => {
      const warningLevel = service.getWarnings({
        ...base,
        temperatureC: 32,
        humidity: 28,
        windSpeedKmh: 28,
      });
      expect(warningLevel.find((w) => w.type === 'fire')?.severity).toBe('warning');

      const dangerLevel = service.getWarnings({
        ...base,
        temperatureC: 36,
        humidity: 20,
        windSpeedKmh: 40,
      });
      expect(dangerLevel.find((w) => w.type === 'fire')?.severity).toBe('danger');
    });
  });
});
