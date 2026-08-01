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
      liveQuery(() =>
        db.rodSpotHistory.where('rodId').equals(rodId).sortBy('changedAt'),
      ),
    );
  }

  async getByRod(rodId: string): Promise<RodSpotHistory[]> {
    return db.rodSpotHistory.where('rodId').equals(rodId).sortBy('changedAt');
  }

  async getBySessionRods(rodIds: string[]): Promise<RodSpotHistory[]> {
    if (rodIds.length === 0) {
      return [];
    }
    return db.rodSpotHistory.where('rodId').anyOf(rodIds).sortBy('changedAt');
  }

  async getAllAcrossModes(): Promise<RodSpotHistory[]> {
    return db.rodSpotHistory.toArray();
  }

  async put(entry: NewModeEntity<RodSpotHistory>): Promise<void> {
    await db.rodSpotHistory.put(this.withMode(entry));
  }

  async deleteByRod(rodId: string): Promise<void> {
    await db.rodSpotHistory.where('rodId').equals(rodId).delete();
  }

  async clearCurrentMode(): Promise<void> {
    const mode = this.activeMode();
    await db.rodSpotHistory.where('fishingMode').equals(mode).delete();
  }

  async clear(): Promise<void> {
    await db.rodSpotHistory.clear();
  }
}
