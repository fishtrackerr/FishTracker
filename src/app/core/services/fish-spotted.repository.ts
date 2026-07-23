import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { FishSpottedEvent } from '../models';

@Injectable({ providedIn: 'root' })
export class FishSpottedRepository {
  watchBySession(sessionId: string): Observable<FishSpottedEvent[]> {
    return from(
      liveQuery(() =>
        db.fishSpottedEvents.where('sessionId').equals(sessionId).sortBy('spottedAt'),
      ),
    );
  }

  watchByRod(rodId: string): Observable<FishSpottedEvent[]> {
    return from(
      liveQuery(() =>
        db.fishSpottedEvents.where('rodId').equals(rodId).sortBy('spottedAt'),
      ),
    );
  }

  async getBySession(sessionId: string): Promise<FishSpottedEvent[]> {
    return db.fishSpottedEvents.where('sessionId').equals(sessionId).sortBy('spottedAt');
  }

  async countByRod(rodId: string): Promise<number> {
    return db.fishSpottedEvents.where('rodId').equals(rodId).count();
  }

  async put(event: FishSpottedEvent): Promise<void> {
    await db.fishSpottedEvents.put(event);
  }

  async delete(id: string): Promise<void> {
    await db.fishSpottedEvents.delete(id);
  }

  async deleteBySession(sessionId: string): Promise<void> {
    await db.fishSpottedEvents.where('sessionId').equals(sessionId).delete();
  }

  async clear(): Promise<void> {
    await db.fishSpottedEvents.clear();
  }
}
