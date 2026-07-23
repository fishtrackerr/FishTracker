export interface BiteEvent {
  id: string;
  sessionId: string;
  rodId: string;
  sessionSpotId?: string;
  occurredAt: string;
  notes?: string;
}
