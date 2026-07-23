import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { SessionEvent } from '../models';

@Injectable({ providedIn: 'root' })
export class SessionEventRepository {
  watchBySession(sessionId: string): Observable<SessionEvent[]> {
    return from(
      liveQuery(() =>
        db.sessionEvents.where('sessionId').equals(sessionId).sortBy('occurredAt'),
      ),
    );
  }

  async getBySession(sessionId: string): Promise<SessionEvent[]> {
    return db.sessionEvents.where('sessionId').equals(sessionId).sortBy('occurredAt');
  }

  async put(event: SessionEvent): Promise<void> {
    await db.sessionEvents.put(event);
  }

  async deleteBySession(sessionId: string): Promise<void> {
    await db.sessionEvents.where('sessionId').equals(sessionId).delete();
  }

  async clear(): Promise<void> {
    await db.sessionEvents.clear();
  }
}
