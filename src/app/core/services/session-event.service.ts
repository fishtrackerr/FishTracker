import { Injectable } from '@angular/core';
import { SessionEvent, SessionEventType } from '../models';
import { generateId, nowIso } from '../utils';
import { SessionEventRepository } from './session-event.repository';

export interface RecordSessionEventOptions {
  sessionId: string;
  type: SessionEventType;
  rodId?: string;
  sessionSpotId?: string;
  description?: string;
  occurredAt?: string;
}

@Injectable({ providedIn: 'root' })
export class SessionEventService {
  constructor(private readonly repo: SessionEventRepository) {}

  watchBySession(sessionId: string) {
    return this.repo.watchBySession(sessionId);
  }

  async getBySession(sessionId: string): Promise<SessionEvent[]> {
    return this.repo.getBySession(sessionId);
  }

  async record(options: RecordSessionEventOptions): Promise<SessionEvent> {
    const event: SessionEvent = {
      id: generateId(),
      sessionId: options.sessionId,
      type: options.type,
      rodId: options.rodId,
      sessionSpotId: options.sessionSpotId,
      description: options.description,
      occurredAt: options.occurredAt ?? nowIso(),
    };
    await this.repo.put(event);
    return event;
  }

  async deleteBySession(sessionId: string): Promise<void> {
    await this.repo.deleteBySession(sessionId);
  }
}
