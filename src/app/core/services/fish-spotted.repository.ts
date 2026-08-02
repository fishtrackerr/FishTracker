import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { FishSpottedEvent } from '../models';
import { ModeScopedRepository, NewModeEntity } from './mode-scoped.repository';

@Injectable({ providedIn: 'root' })
export class FishSpottedRepository extends ModeScopedRepository {
  watchBySession(sessionId: string): Observable<FishSpottedEvent[]> {
    return from(
      liveQuery(async () => {
        const rows = await db.fishSpottedEvents
          .where('sessionId')
          .equals(sessionId)
          .sortBy('spottedAt');
        return this.onlyVisible(rows);
      }),
    );
  }

  watchByRod(rodId: string): Observable<FishSpottedEvent[]> {
    return from(
      liveQuery(async () => {
        const rows = await db.fishSpottedEvents.where('rodId').equals(rodId).sortBy('spottedAt');
        return this.onlyVisible(rows);
      }),
    );
  }

  async getBySession(sessionId: string): Promise<FishSpottedEvent[]> {
    return this.onlyVisible(
      await db.fishSpottedEvents.where('sessionId').equals(sessionId).sortBy('spottedAt'),
    );
  }

  async getAllAcrossModes(): Promise<FishSpottedEvent[]> {
    return db.fishSpottedEvents.toArray();
  }

  async countByRod(rodId: string): Promise<number> {
    const rows = await db.fishSpottedEvents.where('rodId').equals(rodId).toArray();
    return this.onlyVisible(rows).length;
  }

  async put(event: NewModeEntity<FishSpottedEvent>): Promise<void> {
    await db.fishSpottedEvents.put(this.withMode(event));
  }

  async delete(id: string): Promise<void> {
    const row = await db.fishSpottedEvents.get(id);
    if (!row) {
      return;
    }
    await db.fishSpottedEvents.put({ ...row, visible: false });
  }

  async deleteBySession(sessionId: string): Promise<void> {
    const rows = await db.fishSpottedEvents.where('sessionId').equals(sessionId).toArray();
    await Promise.all(rows.map((row) => db.fishSpottedEvents.put({ ...row, visible: false })));
  }

  async clearCurrentMode(): Promise<void> {
    const mode = this.activeMode();
    await db.fishSpottedEvents.where('fishingMode').equals(mode).delete();
  }

  async clear(): Promise<void> {
    await db.fishSpottedEvents.clear();
  }
}
