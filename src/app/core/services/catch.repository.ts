import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { Catch } from '../models';
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
        return rows.sort(
          (a, b) => new Date(b.caughtAt).getTime() - new Date(a.caughtAt).getTime(),
        );
      }),
    );
  }

  watchBySession(sessionId: string): Observable<Catch[]> {
    return from(
      liveQuery(() =>
        db.catches.where('sessionId').equals(sessionId).sortBy('caughtAt'),
      ),
    );
  }

  async getAll(): Promise<Catch[]> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return [];
    }
    return db.catches.where('fishingMode').equals(mode).toArray();
  }

  async getAllAcrossModes(): Promise<Catch[]> {
    return db.catches.toArray();
  }

  async getBySession(sessionId: string): Promise<Catch[]> {
    return db.catches.where('sessionId').equals(sessionId).toArray();
  }

  async getById(id: string): Promise<Catch | undefined> {
    return this.forActiveMode(await db.catches.get(id));
  }

  async put(catchRecord: NewModeEntity<Catch>): Promise<void> {
    await db.catches.put(this.withMode(catchRecord));
  }

  async delete(id: string): Promise<void> {
    await db.catches.delete(id);
  }

  async deleteBySession(sessionId: string): Promise<void> {
    await db.catches.where('sessionId').equals(sessionId).delete();
  }

  async clearCurrentMode(): Promise<void> {
    const mode = this.activeMode();
    await db.catches.where('fishingMode').equals(mode).delete();
  }

  async clear(): Promise<void> {
    await db.catches.clear();
  }
}
