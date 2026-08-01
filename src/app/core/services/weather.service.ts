import { Injectable } from '@angular/core';
import {
  DailyForecast,
  HourlyForecast,
  WeatherSnapshot,
  WeatherWarning,
} from '../models';
import { fetchWithTimeout, moonPhase, nowIso } from '../utils';

interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
    surface_pressure: number;
    relative_humidity_2m: number;
    cloud_cover: number;
    precipitation: number;
    weather_code: number;
    uv_index?: number;
  };
  hourly?: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    weather_code: number[];
  };
  daily?: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max?: number[];
    weather_code?: number[];
    sunrise: string[];
    sunset: string[];
  };
}

interface WeatherCacheEntry {
  latitude: number;
  longitude: number;
  cachedAt: string;
  snapshot: WeatherSnapshot;
}

const WEATHER_CODES: Record<number, string> = {
  0: 'Clear',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Foggy',
  51: 'Light drizzle',
  53: 'Drizzle',
  55: 'Heavy drizzle',
  61: 'Light rain',
  63: 'Rain',
  65: 'Heavy rain',
  71: 'Light snow',
  73: 'Snow',
  75: 'Heavy snow',
  80: 'Rain showers',
  81: 'Rain showers',
  82: 'Heavy rain showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with hail',
  99: 'Thunderstorm with hail',
};

const CACHE_KEY = 'fish-tracker-weather-cache';
/** ~5 km — only reuse cache when it matches the requested location. */
const CACHE_COORD_TOLERANCE = 0.05;

@Injectable({ providedIn: 'root' })
export class WeatherService {
  async getSnapshot(latitude: number, longitude: number): Promise<WeatherSnapshot | null> {
    return this.fetchWeather(latitude, longitude, false);
  }

  async getDetailedForecast(
    latitude: number,
    longitude: number,
  ): Promise<WeatherSnapshot | null> {
    return this.fetchWeather(latitude, longitude, true);
  }

  getCachedSnapshot(): WeatherSnapshot | null {
    const entry = this.readCacheEntry();
    if (!entry) return null;
    return { ...entry.snapshot, isCached: true, source: 'cached' };
  }

  /** Cached snapshot only if it was stored for a nearby location. */
  getCachedSnapshotFor(latitude: number, longitude: number): WeatherSnapshot | null {
    const entry = this.readCacheEntry();
    if (!entry) return null;
    if (!this.isNearby(entry.latitude, entry.longitude, latitude, longitude)) {
      return null;
    }
    return { ...entry.snapshot, isCached: true, source: 'cached' };
  }

  cacheSnapshot(snapshot: WeatherSnapshot, latitude?: number, longitude?: number): void {
    const entry: WeatherCacheEntry = {
      latitude: latitude ?? 0,
      longitude: longitude ?? 0,
      cachedAt: snapshot.capturedAt || nowIso(),
      snapshot: { ...snapshot, isCached: false, source: 'live' },
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  }

  clearCache(): void {
    localStorage.removeItem(CACHE_KEY);
  }

  getWarnings(snapshot: WeatherSnapshot): WeatherWarning[] {
    const warnings: WeatherWarning[] = [];

    const hasCurrentStorm =
      !!snapshot.stormWarning ||
      snapshot.description.toLowerCase().includes('thunder');
    const upcomingThunder =
      snapshot.hourly?.slice(0, 3).some((h) => h.weatherCode >= 95) ?? false;
    const thunderProb = snapshot.thunderstormProbability ?? 0;

    // Single storm/thunder entry — avoid double-shouting the same hazard.
    if (hasCurrentStorm || upcomingThunder || thunderProb > 30) {
      let message = 'Storm conditions detected';
      let type: WeatherWarning['type'] = 'storm';
      if (!hasCurrentStorm && upcomingThunder) {
        message = 'Thunderstorm expected within 3 hours';
      } else if (!hasCurrentStorm && thunderProb > 30) {
        type = 'thunder';
        message = `Thunderstorm probability ${thunderProb}%`;
      }
      warnings.push({ type, message, severity: 'danger' });
    }

    const gusts = snapshot.windGustKmh ?? 0;
    if (snapshot.windSpeedKmh > 70 || gusts > 90) {
      warnings.push({
        type: 'wind',
        message:
          gusts > snapshot.windSpeedKmh
            ? `Dangerous wind gusts ${gusts} km/h`
            : `Dangerous wind ${snapshot.windSpeedKmh} km/h`,
        severity: 'danger',
      });
    } else if (snapshot.windSpeedKmh > 50 || gusts > 70) {
      warnings.push({
        type: 'wind',
        message: `Strong wind ${snapshot.windSpeedKmh} km/h`,
        severity: 'warning',
      });
    }

    if ((snapshot.rainAmountMm ?? 0) > 5 || (snapshot.rainProbability ?? 0) >= 70) {
      warnings.push({
        type: 'rain',
        message: 'Heavy rain expected',
        severity: 'warning',
      });
    }

    if (snapshot.temperatureC >= 35 || snapshot.temperatureC <= -10) {
      warnings.push({
        type: 'temperature',
        message: `Extreme temperature ${snapshot.temperatureC}°C`,
        severity: 'warning',
      });
    }

    const fireDanger =
      snapshot.temperatureC >= 35 &&
      snapshot.humidity <= 25 &&
      snapshot.windSpeedKmh >= 35;
    const fireWarning =
      snapshot.temperatureC >= 30 &&
      snapshot.humidity <= 30 &&
      snapshot.windSpeedKmh >= 25;
    if (fireDanger) {
      warnings.push({
        type: 'fire',
        message: 'Extreme fire-weather risk (hot, dry, windy)',
        severity: 'danger',
      });
    } else if (fireWarning) {
      warnings.push({
        type: 'fire',
        message: 'High fire-weather risk (hot, dry, windy)',
        severity: 'warning',
      });
    }

    return warnings;
  }

  private async fetchWeather(
    latitude: number,
    longitude: number,
    detailed: boolean,
  ): Promise<WeatherSnapshot | null> {
    const online = typeof navigator === 'undefined' || navigator.onLine !== false;

    if (!online) {
      return this.getCachedSnapshotFor(latitude, longitude);
    }

    try {
      const currentParams =
        'temperature_2m,apparent_temperature,wind_speed_10m,wind_direction_10m,wind_gusts_10m,surface_pressure,relative_humidity_2m,cloud_cover,precipitation,weather_code,uv_index';
      const params = new URLSearchParams({
        latitude: latitude.toFixed(4),
        longitude: longitude.toFixed(4),
        current: currentParams,
        timezone: 'auto',
        temperature_unit: 'celsius',
        wind_speed_unit: 'kmh',
        precipitation_unit: 'mm',
      });

      if (detailed) {
        params.set(
          'hourly',
          'temperature_2m,precipitation_probability,weather_code',
        );
        params.set(
          'daily',
          'temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code,sunrise,sunset',
        );
        params.set('forecast_days', '7');
      } else {
        params.set('daily', 'sunrise,sunset,temperature_2m_max,temperature_2m_min');
        params.set('forecast_days', '1');
      }

      const response = await fetchWithTimeout(
        `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
        { cache: 'no-store' },
      );

      if (!response.ok) {
        return this.getCachedSnapshotFor(latitude, longitude);
      }

      const data = (await response.json()) as OpenMeteoResponse;
      if (!data.current) {
        return this.getCachedSnapshotFor(latitude, longitude);
      }

      const capturedAt = nowIso();
      const code = data.current.weather_code;
      const description = WEATHER_CODES[code] ?? 'Unknown';

      const hourly: HourlyForecast[] | undefined = data.hourly
        ? data.hourly.time.slice(0, 24).map((time, i) => ({
            time,
            temperatureC: data.hourly!.temperature_2m[i],
            precipitationProbability: data.hourly!.precipitation_probability[i] ?? 0,
            weatherCode: data.hourly!.weather_code[i],
          }))
        : undefined;

      const daily: DailyForecast[] | undefined = data.daily
        ? data.daily.time.map((date, i) => ({
            date,
            tempMinC: data.daily!.temperature_2m_min[i],
            tempMaxC: data.daily!.temperature_2m_max[i],
            precipitationProbability:
              data.daily!.precipitation_probability_max?.[i] ?? 0,
            weatherCode: data.daily!.weather_code?.[i] ?? code,
            sunrise: data.daily!.sunrise[i] ?? '',
            sunset: data.daily!.sunset[i] ?? '',
          }))
        : undefined;

      const thunderstormProbability =
        hourly?.find((h) => h.weatherCode >= 95)?.precipitationProbability ?? 0;

      const snapshot: WeatherSnapshot = {
        description,
        temperatureC: data.current.temperature_2m,
        feelsLikeC: data.current.apparent_temperature,
        tempMinC: data.daily?.temperature_2m_min[0],
        tempMaxC: data.daily?.temperature_2m_max[0],
        windSpeedKmh: data.current.wind_speed_10m,
        windDirection: data.current.wind_direction_10m,
        windGustKmh: data.current.wind_gusts_10m,
        airPressureHpa: data.current.surface_pressure,
        humidity: data.current.relative_humidity_2m,
        cloudCoverage: data.current.cloud_cover,
        rain: data.current.precipitation > 0,
        rainProbability: hourly?.[0]?.precipitationProbability,
        rainAmountMm: data.current.precipitation,
        uvIndex: data.current.uv_index,
        stormWarning: code >= 95,
        thunderstormProbability,
        sunrise: data.daily?.sunrise[0] ?? '',
        sunset: data.daily?.sunset[0] ?? '',
        moonPhase: moonPhase(new Date(capturedAt)),
        capturedAt,
        isCached: false,
        source: 'live',
        hourly,
        daily,
      };

      this.cacheSnapshot(snapshot, latitude, longitude);
      return snapshot;
    } catch {
      return this.getCachedSnapshotFor(latitude, longitude);
    }
  }

  private readCacheEntry(): WeatherCacheEntry | null {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as WeatherCacheEntry | WeatherSnapshot;

      // New format: { latitude, longitude, cachedAt, snapshot }
      if (
        parsed &&
        typeof parsed === 'object' &&
        'snapshot' in parsed &&
        (parsed as WeatherCacheEntry).snapshot &&
        typeof (parsed as WeatherCacheEntry).latitude === 'number'
      ) {
        return parsed as WeatherCacheEntry;
      }

      // Legacy format: bare WeatherSnapshot (no coordinates) — treat as unusable for location match
      if (
        parsed &&
        typeof parsed === 'object' &&
        'temperatureC' in parsed &&
        'capturedAt' in parsed
      ) {
        return {
          latitude: Number.NaN,
          longitude: Number.NaN,
          cachedAt: (parsed as WeatherSnapshot).capturedAt,
          snapshot: parsed as WeatherSnapshot,
        };
      }

      return null;
    } catch {
      return null;
    }
  }

  private isNearby(
    latA: number,
    lngA: number,
    latB: number,
    lngB: number,
  ): boolean {
    if (!Number.isFinite(latA) || !Number.isFinite(lngA)) {
      return false;
    }
    return (
      Math.abs(latA - latB) <= CACHE_COORD_TOLERANCE &&
      Math.abs(lngA - lngB) <= CACHE_COORD_TOLERANCE
    );
  }
}
