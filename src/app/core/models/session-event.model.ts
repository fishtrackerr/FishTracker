import { FishingMode } from './fishing-mode.model';

export type SessionEventType =
  | 'session-start'
  | 'rod-created'
  | 'rod-moved'
  | 'rod-cast'
  | 'bite'
  | 'fish-spotted'
  | 'catch'
  | 'weather'
  | 'note'
  | 'session-end';

export interface SessionEvent {
  id: string;
  fishingMode?: FishingMode;
  sessionId: string;
  type: SessionEventType;
  rodId?: string;
  sessionSpotId?: string;
  occurredAt: string;
  description?: string;
}
