import { FishingMode } from './fishing-mode.model';
import { WeatherSnapshot } from './weather-snapshot.model';

export interface Catch {
  id: string;
  fishingMode?: FishingMode;
  sessionId: string;
  rodId?: string;
  sessionSpotId?: string;
  species: string;
  fishName?: string;
  caughtAt: string;
  weightKg?: number;
  lengthCm?: number;
  bait?: string;
  baitFlavor?: string;
  rig?: string;
  hookSize?: string;
  line?: string;
  method?: string;
  weatherType?: string;
  tags?: string[];
  /** @deprecated Use sessionSpotId — kept for lake spot backward compat */
  spotId?: string;
  latitude?: number;
  longitude?: number;
  distanceM?: number;
  waterDepthM?: number;
  waterTemperatureC?: number;
  photoId?: string;
  notes?: string;
  released?: boolean;
  isPersonalRecord?: boolean;
  prebait?: string;
  weather?: WeatherSnapshot;
  /** True when logged instantly; details still need to be filled in. */
  detailsPending?: boolean;
  /** Soft-delete: false hides from UI; omit/true = visible. */
  visible?: boolean;
  createdAt: string;
  updatedAt: string;
}
