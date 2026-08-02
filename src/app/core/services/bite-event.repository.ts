import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { BiteEvent } from '../models';
import { ModeScopedRepository, NewModeEntity } from './mode-scoped.repository';

@Injectable({ providedIn: 'root' })
export class BiteEventRepository extends ModeScopedRepository {
  watchBySession(sessionId: string): Observable<BiteEvent[]> {
    return from(
      liveQuery(async () => {
        const rows = await db.biteEvents.where('sessionId').equals(sessionId).sortBy('occurredAt');
        return this.onlyVisible(rows);
      }),
    );
  }

  watchByRod(rodId: string): Observable<BiteEvent[]> {
    return from(
      liveQuery(async () => {
        const rows = await db.biteEvents.where('rodId').equals(rodId).sortBy('occurredAt');
        return this.onlyVisible(rows);
      }),
    );
  }

  async getAll(): Promise<BiteEvent[]> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return [];
    }
    return this.onlyVisible(await db.biteEvents.where('fishingMode').equals(mode).toArray());
  }

  async getAllAcrossModes(): Promise<BiteEvent[]> {
    return db.biteEvents.toArray();
  }

  async getBySession(sessionId: string): Promise<BiteEvent[]> {
    return this.onlyVisible(
      await db.biteEvents.where('sessionId').equals(sessionId).sortBy('occurredAt'),
    );
  }

  async getByRod(rodId: string): Promise<BiteEvent[]> {
    return this.onlyVisible(await db.biteEvents.where('rodId').equals(rodId).sortBy('occurredAt'));
  }

  async countByRod(rodId: string): Promise<number> {
    return (await this.getByRod(rodId)).length;
  }

  async getById(id: string): Promise<BiteEvent | undefined> {
    return this.forActiveMode(await db.biteEvents.get(id));
  }

  async getLatestByRod(rodId: string): Promise<BiteEvent | undefined> {
    const events = await this.getByRod(rodId);
    return events.at(-1);
  }

  async put(event: NewModeEntity<BiteEvent>): Promise<void> {
    await db.biteEvents.put(this.withMode(event));
  }

  async delete(id: string): Promise<void> {
    const row = await db.biteEvents.get(id);
    if (!row) {
      return;
    }
    await db.biteEvents.put({ ...row, visible: false });
  }

  async deleteBySession(sessionId: string): Promise<void> {
    const rows = await db.biteEvents.where('sessionId').equals(sessionId).toArray();
    await Promise.all(rows.map((row) => db.biteEvents.put({ ...row, visible: false })));
  }

  async deleteByRod(rodId: string): Promise<void> {
    const rows = await db.biteEvents.where('rodId').equals(rodId).toArray();
    await Promise.all(rows.map((row) => db.biteEvents.put({ ...row, visible: false })));
  }

  async clearCurrentMode(): Promise<void> {
    const mode = this.activeMode();
    await db.biteEvents.where('fishingMode').equals(mode).delete();
  }

  async clear(): Promise<void> {
    await db.biteEvents.clear();
  }
}
