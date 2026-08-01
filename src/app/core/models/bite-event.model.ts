import { FishingMode } from './fishing-mode.model';

export interface BiteEvent {
  id: string;
  fishingMode?: FishingMode;
  sessionId: string;
  rodId: string;
  sessionSpotId?: string;
  occurredAt: string;
  notes?: string;
}
