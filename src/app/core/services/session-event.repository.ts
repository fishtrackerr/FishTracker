import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { SessionEvent } from '../models';
import { ModeScopedRepository, NewModeEntity } from './mode-scoped.repository';

@Injectable({ providedIn: 'root' })
export class SessionEventRepository extends ModeScopedRepository {
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

  async getAllAcrossModes(): Promise<SessionEvent[]> {
    return db.sessionEvents.toArray();
  }

  async put(event: NewModeEntity<SessionEvent>): Promise<void> {
    await db.sessionEvents.put(this.withMode(event));
  }

  async deleteBySession(sessionId: string): Promise<void> {
    await db.sessionEvents.where('sessionId').equals(sessionId).delete();
  }

  async clearCurrentMode(): Promise<void> {
    const mode = this.activeMode();
    await db.sessionEvents.where('fishingMode').equals(mode).delete();
  }

  async clear(): Promise<void> {
    await db.sessionEvents.clear();
  }
}
