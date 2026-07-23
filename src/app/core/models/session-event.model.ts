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
  sessionId: string;
  type: SessionEventType;
  rodId?: string;
  sessionSpotId?: string;
  occurredAt: string;
  description?: string;
}
