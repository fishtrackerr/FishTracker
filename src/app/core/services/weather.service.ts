import { Injectable } from '@angular/core';
import {
  DailyForecast,
  HourlyForecast,
  WeatherSnapshot,
  WeatherWarning,
} from '../models';
import { moonPhase, nowIso } from '../utils';

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
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    weather_code: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    weather_code: number[];
    sunrise: string[];
    sunset: string[];
  };
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
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as WeatherSnapshot;
      return { ...parsed, isCached: true, source: 'cached' };
    } catch {
      return null;
    }
  }

  cacheSnapshot(snapshot: WeatherSnapshot): void {
    localStorage.setItem(CACHE_KEY, JSON.stringify(snapshot));
  }

  getWarnings(snapshot: WeatherSnapshot): WeatherWarning[] {
    const warnings: WeatherWarning[] = [];
    if (snapshot.stormWarning || snapshot.description.toLowerCase().includes('thunder')) {
      warnings.push({
        type: 'storm',
        message: 'Storm conditions detected',
        severity: 'danger',
      });
    }
    if ((snapshot.thunderstormProbability ?? 0) > 30) {
      warnings.push({
        type: 'thunder',
        message: `Thunderstorm probability ${snapshot.thunderstormProbability}%`,
        severity: 'danger',
      });
    }
    if (snapshot.windSpeedKmh > 50 || (snapshot.windGustKmh ?? 0) > 70) {
      warnings.push({
        type: 'wind',
        message: `Strong wind ${snapshot.windSpeedKmh} km/h`,
        severity: 'warning',
      });
    }
    if (snapshot.rain || (snapshot.rainAmountMm ?? 0) > 5) {
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
    return warnings;
  }

  private async fetchWeather(
    latitude: number,
    longitude: number,
    detailed: boolean,
  ): Promise<WeatherSnapshot | null> {
    try {
      const currentParams =
        'temperature_2m,apparent_temperature,wind_speed_10m,wind_direction_10m,wind_gusts_10m,surface_pressure,relative_humidity_2m,cloud_cover,precipitation,weather_code,uv_index';
      const params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        current: currentParams,
        timezone: 'auto',
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
      }

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
      );

      if (!response.ok) {
        return this.getCachedSnapshot();
      }

      const data = (await response.json()) as OpenMeteoResponse;
      const capturedAt = nowIso();
      const code = data.current.weather_code;
      const description = WEATHER_CODES[code] ?? 'Unknown';

      const hourly: HourlyForecast[] | undefined = data.hourly
        ? data.hourly.time.slice(0, 24).map((time, i) => ({
            time,
            temperatureC: data.hourly.temperature_2m[i],
            precipitationProbability: data.hourly.precipitation_probability[i] ?? 0,
            weatherCode: data.hourly.weather_code[i],
          }))
        : undefined;

      const daily: DailyForecast[] | undefined = data.daily
        ? data.daily.time.map((date, i) => ({
            date,
            tempMinC: data.daily.temperature_2m_min[i],
            tempMaxC: data.daily.temperature_2m_max[i],
            precipitationProbability: data.daily.precipitation_probability_max[i] ?? 0,
            weatherCode: data.daily.weather_code[i],
            sunrise: data.daily.sunrise[i] ?? '',
            sunset: data.daily.sunset[i] ?? '',
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
        source: 'live',
        hourly,
        daily,
      };

      this.cacheSnapshot(snapshot);
      return snapshot;
    } catch {
      return this.getCachedSnapshot();
    }
  }
}
