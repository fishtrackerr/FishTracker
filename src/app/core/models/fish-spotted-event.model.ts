export interface FishSpottedEvent {
  id: string;
  sessionId: string;
  rodId?: string;
  sessionSpotId?: string;
  latitude?: number;
  longitude?: number;
  spottedAt: string;
  notes?: string;
}
