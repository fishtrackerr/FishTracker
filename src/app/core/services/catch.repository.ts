import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { Catch } from '../models';
import { nowIso } from '../utils';
import { ModeScopedRepository, NewModeEntity } from './mode-scoped.repository';

@Injectable({ providedIn: 'root' })
export class CatchRepository extends ModeScopedRepository {
  watchAll(): Observable<Catch[]> {
    return from(
      liveQuery(async () => {
        const mode = this.tryActiveMode();
        if (!mode) {
          return [];
        }
        const rows = await db.catches.where('fishingMode').equals(mode).toArray();
        return this.onlyVisible(rows).sort(
          (a, b) => new Date(b.caughtAt).getTime() - new Date(a.caughtAt).getTime(),
        );
      }),
    );
  }

  watchBySession(sessionId: string): Observable<Catch[]> {
    return from(
      liveQuery(async () => {
        const rows = await db.catches.where('sessionId').equals(sessionId).sortBy('caughtAt');
        return this.onlyVisible(rows);
      }),
    );
  }

  async getAll(): Promise<Catch[]> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return [];
    }
    return this.onlyVisible(await db.catches.where('fishingMode').equals(mode).toArray());
  }

  async getAllAcrossModes(): Promise<Catch[]> {
    return db.catches.toArray();
  }

  async getBySession(sessionId: string): Promise<Catch[]> {
    return this.onlyVisible(await db.catches.where('sessionId').equals(sessionId).toArray());
  }

  async getById(id: string): Promise<Catch | undefined> {
    return this.forActiveMode(await db.catches.get(id));
  }

  async put(catchRecord: NewModeEntity<Catch>): Promise<void> {
    await db.catches.put(this.withMode(catchRecord));
  }

  async delete(id: string): Promise<void> {
    const row = await db.catches.get(id);
    if (!row) {
      return;
    }
    await db.catches.put({ ...row, visible: false, updatedAt: nowIso() });
  }

  async deleteBySession(sessionId: string): Promise<void> {
    const rows = await db.catches.where('sessionId').equals(sessionId).toArray();
    const now = nowIso();
    await Promise.all(
      rows.map((row) => db.catches.put({ ...row, visible: false, updatedAt: now })),
    );
  }

  async clearCurrentMode(): Promise<void> {
    const mode = this.activeMode();
    await db.catches.where('fishingMode').equals(mode).delete();
  }

  async clear(): Promise<void> {
    await db.catches.clear();
  }
}
