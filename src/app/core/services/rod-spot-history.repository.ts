import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { RodSpotHistory } from '../models';
import { ModeScopedRepository, NewModeEntity } from './mode-scoped.repository';

@Injectable({ providedIn: 'root' })
export class RodSpotHistoryRepository extends ModeScopedRepository {
  watchByRod(rodId: string): Observable<RodSpotHistory[]> {
    return from(
      liveQuery(async () => {
        const rows = await db.rodSpotHistory.where('rodId').equals(rodId).sortBy('changedAt');
        return this.onlyVisible(rows);
      }),
    );
  }

  async getByRod(rodId: string): Promise<RodSpotHistory[]> {
    return this.onlyVisible(
      await db.rodSpotHistory.where('rodId').equals(rodId).sortBy('changedAt'),
    );
  }

  async getBySessionRods(rodIds: string[]): Promise<RodSpotHistory[]> {
    if (rodIds.length === 0) {
      return [];
    }
    return this.onlyVisible(
      await db.rodSpotHistory.where('rodId').anyOf(rodIds).sortBy('changedAt'),
    );
  }

  async getAllAcrossModes(): Promise<RodSpotHistory[]> {
    return db.rodSpotHistory.toArray();
  }

  async put(entry: NewModeEntity<RodSpotHistory>): Promise<void> {
    await db.rodSpotHistory.put(this.withMode(entry));
  }

  async deleteByRod(rodId: string): Promise<void> {
    const rows = await db.rodSpotHistory.where('rodId').equals(rodId).toArray();
    await Promise.all(rows.map((row) => db.rodSpotHistory.put({ ...row, visible: false })));
  }

  async clearCurrentMode(): Promise<void> {
    const mode = this.activeMode();
    await db.rodSpotHistory.where('fishingMode').equals(mode).delete();
  }

  async clear(): Promise<void> {
    await db.rodSpotHistory.clear();
  }
}
