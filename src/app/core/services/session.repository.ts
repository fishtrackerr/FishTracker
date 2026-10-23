import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { FishingSession } from '../models';
import { nowIso } from '../utils';
import { ModeScopedRepository, NewModeEntity } from './mode-scoped.repository';

@Injectable({ providedIn: 'root' })
export class SessionRepository extends ModeScopedRepository {
  watchAll(): Observable<FishingSession[]> {
    return from(
      liveQuery(async () => {
        const mode = this.tryActiveMode();
        if (!mode) {
          return [];
        }
        const rows = await db.sessions.where('fishingMode').equals(mode).toArray();
        return this.onlyVisible(rows).sort(
          (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
        );
      }),
    );
  }

  watchById(id: string): Observable<FishingSession | undefined> {
    return from(
      liveQuery(async () => this.forActiveMode(await db.sessions.get(id))),
    );
  }

  watchActive(): Observable<FishingSession | undefined> {
    return from(
      liveQuery(async () => {
        const mode = this.tryActiveMode();
        if (!mode) {
          return undefined;
        }
        const rows = await db.sessions
          .where('[fishingMode+status]')
          .equals([mode, 'active'])
          .toArray();
        return this.onlyVisible(rows)[0];
      }),
    );
  }

  async getAll(): Promise<FishingSession[]> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return [];
    }
    const rows = await db.sessions.where('fishingMode').equals(mode).toArray();
    return this.onlyVisible(rows).sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
    );
  }

  async getAllAcrossModes(): Promise<FishingSession[]> {
    return db.sessions.orderBy('startDate').reverse().toArray();
  }

  async getById(id: string): Promise<FishingSession | undefined> {
    return this.forActiveMode(await db.sessions.get(id));
  }

  async getActive(): Promise<FishingSession | undefined> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return undefined;
    }
    const rows = await db.sessions
      .where('[fishingMode+status]')
      .equals([mode, 'active'])
      .toArray();
    return this.onlyVisible(rows)[0];
  }

  async getAllActive(): Promise<FishingSession[]> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return [];
    }
    const rows = await db.sessions
      .where('[fishingMode+status]')
      .equals([mode, 'active'])
      .toArray();
    return this.onlyVisible(rows);
  }

  async put(session: NewModeEntity<FishingSession>): Promise<void> {
    await db.sessions.put(this.withMode(session));
  }

  /**
   * Applies `change` to the latest stored row and saves it in one transaction,
   * so concurrent updates (weather refresh, bite sync, catch stats) don't
   * overwrite each other. `change` must be synchronous.
   * Returns the saved row, or undefined when it is missing or in another mode.
   */
  async modify(
    id: string,
    change: (session: FishingSession) => void,
  ): Promise<FishingSession | undefined> {
    return db.transaction('rw', db.sessions, async () => {
      const row = this.forActiveMode(await db.sessions.get(id));
      if (!row) {
        return undefined;
      }
      change(row);
      row.updatedAt = nowIso();
      await db.sessions.put(row);
      return row;
    });
  }

  async delete(id: string): Promise<void> {
    const row = await db.sessions.get(id);
    if (!row) {
      return;
    }
    await db.sessions.put({ ...row, visible: false, updatedAt: nowIso() });
  }

  async clearCurrentMode(): Promise<void> {
    const mode = this.activeMode();
    await db.sessions.where('fishingMode').equals(mode).delete();
  }

  async clear(): Promise<void> {
    await db.sessions.clear();
  }
}
