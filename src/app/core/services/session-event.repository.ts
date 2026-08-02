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
      liveQuery(async () => {
        const rows = await db.sessionEvents
          .where('sessionId')
          .equals(sessionId)
          .sortBy('occurredAt');
        return this.onlyVisible(rows);
      }),
    );
  }

  async getBySession(sessionId: string): Promise<SessionEvent[]> {
    return this.onlyVisible(
      await db.sessionEvents.where('sessionId').equals(sessionId).sortBy('occurredAt'),
    );
  }

  async getAllAcrossModes(): Promise<SessionEvent[]> {
    return db.sessionEvents.toArray();
  }

  async put(event: NewModeEntity<SessionEvent>): Promise<void> {
    await db.sessionEvents.put(this.withMode(event));
  }

  async deleteBySession(sessionId: string): Promise<void> {
    const rows = await db.sessionEvents.where('sessionId').equals(sessionId).toArray();
    await Promise.all(rows.map((row) => db.sessionEvents.put({ ...row, visible: false })));
  }

  async clearCurrentMode(): Promise<void> {
    const mode = this.activeMode();
    await db.sessionEvents.where('fishingMode').equals(mode).delete();
  }

  async clear(): Promise<void> {
    await db.sessionEvents.clear();
  }
}
