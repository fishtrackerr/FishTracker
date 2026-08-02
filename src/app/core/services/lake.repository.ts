import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { Lake } from '../models';
import { nowIso } from '../utils';
import { ModeScopedRepository, NewModeEntity } from './mode-scoped.repository';

@Injectable({ providedIn: 'root' })
export class LakeRepository extends ModeScopedRepository {
  watchAll(): Observable<Lake[]> {
    return from(
      liveQuery(async () => {
        const mode = this.tryActiveMode();
        if (!mode) {
          return [];
        }
        const rows = await db.lakes.where('fishingMode').equals(mode).toArray();
        return this.onlyVisible(rows).sort((a, b) => a.name.localeCompare(b.name));
      }),
    );
  }

  watchById(id: string): Observable<Lake | undefined> {
    return from(liveQuery(async () => this.forActiveMode(await db.lakes.get(id))));
  }

  async getAll(): Promise<Lake[]> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return [];
    }
    const rows = await db.lakes.where('fishingMode').equals(mode).toArray();
    return this.onlyVisible(rows).sort((a, b) => a.name.localeCompare(b.name));
  }

  async getAllAcrossModes(): Promise<Lake[]> {
    return db.lakes.orderBy('name').toArray();
  }

  async getById(id: string): Promise<Lake | undefined> {
    return this.forActiveMode(await db.lakes.get(id));
  }

  async put(lake: NewModeEntity<Lake>): Promise<void> {
    await db.lakes.put(this.withMode(lake));
  }

  async delete(id: string): Promise<void> {
    const row = await db.lakes.get(id);
    if (!row) {
      return;
    }
    await db.lakes.put({ ...row, visible: false, updatedAt: nowIso() });
  }

  async clearCurrentMode(): Promise<void> {
    const mode = this.activeMode();
    await db.lakes.where('fishingMode').equals(mode).delete();
  }

  async clear(): Promise<void> {
    await db.lakes.clear();
  }
}
