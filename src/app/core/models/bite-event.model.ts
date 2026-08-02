import { FishingMode } from './fishing-mode.model';

export interface BiteEvent {
  id: string;
  fishingMode?: FishingMode;
  sessionId: string;
  rodId: string;
  sessionSpotId?: string;
  occurredAt: string;
  notes?: string;
  /** Soft-delete: false hides from UI; omit/true = visible. */
  visible?: boolean;
}
