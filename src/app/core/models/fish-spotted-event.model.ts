import { FishingMode } from './fishing-mode.model';

export interface FishSpottedEvent {
  id: string;
  fishingMode?: FishingMode;
  sessionId: string;
  rodId?: string;
  sessionSpotId?: string;
  latitude?: number;
  longitude?: number;
  spottedAt: string;
  notes?: string;
  /** Soft-delete: false hides from UI; omit/true = visible. */
  visible?: boolean;
}
