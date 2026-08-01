import { WeatherSnapshot } from './weather-snapshot.model';

/** Persisted weather refresh for a fishing session (time-series). */
export interface SessionWeatherRecord {
  id: string;
  sessionId: string;
  /** ISO timestamp; mirrors weather.capturedAt for indexing. */
  capturedAt: string;
  weather: WeatherSnapshot;
}
