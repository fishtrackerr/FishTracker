import { FishingMode } from './fishing-mode.model';
import { WeatherSnapshot } from './weather-snapshot.model';

/** Persisted weather refresh for a fishing session (time-series). */
export interface SessionWeatherRecord {
  id: string;
  fishingMode?: FishingMode;
  sessionId: string;
  /** ISO timestamp; mirrors weather.capturedAt for indexing. */
  capturedAt: string;
  weather: WeatherSnapshot;
  /** Soft-delete: false hides from UI; omit/true = visible. */
  visible?: boolean;
}
