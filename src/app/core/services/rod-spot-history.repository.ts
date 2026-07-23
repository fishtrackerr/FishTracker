import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { RodSpotHistory } from '../models';

@Injectable({ providedIn: 'root' })
export class RodSpotHistoryRepository {
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

  async put(entry: RodSpotHistory): Promise<void> {
    await db.rodSpotHistory.put(entry);
  }

  async deleteByRod(rodId: string): Promise<void> {
    await db.rodSpotHistory.where('rodId').equals(rodId).delete();
  }

  async clear(): Promise<void> {
    await db.rodSpotHistory.clear();
  }
}
