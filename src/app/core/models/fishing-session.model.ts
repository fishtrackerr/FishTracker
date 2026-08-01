import { FishingMode } from './fishing-mode.model';
import { SessionRod } from './session-rod.model';
import { SessionSpot } from './session-spot.model';
import { WeatherSnapshot } from './weather-snapshot.model';

export type SessionStatus = 'planned' | 'active' | 'completed';

export interface FishingSession {
  id: string;
  fishingMode?: FishingMode;
  name: string;
  lakeId?: string;
  status: SessionStatus;
  startDate: string;
  endDate?: string;
  latitude?: number;
  longitude?: number;
  weather?: WeatherSnapshot;
  waterTemperatureC?: number;
  prebait?: string;
  notes?: string;
  tags?: string[];
  sessionSpots?: SessionSpot[];
  rods?: SessionRod[];
  /** @deprecated Legacy single spot — migrated to sessionSpots */
  legacySpotName?: string;
  legacySpotLatitude?: number;
  legacySpotLongitude?: number;
  coverImageId?: string;
  photoIds: string[];
  catchCount: number;
  biggestFishKg?: number;
  totalCatchWeightKg: number;
  createdAt: string;
  updatedAt: string;
}
