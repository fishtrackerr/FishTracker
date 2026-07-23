import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { BiteEvent } from '../models';

@Injectable({ providedIn: 'root' })
export class BiteEventRepository {
  watchBySession(sessionId: string): Observable<BiteEvent[]> {
    return from(
      liveQuery(() =>
        db.biteEvents.where('sessionId').equals(sessionId).sortBy('occurredAt'),
      ),
    );
  }

  watchByRod(rodId: string): Observable<BiteEvent[]> {
    return from(
      liveQuery(() =>
        db.biteEvents.where('rodId').equals(rodId).sortBy('occurredAt'),
      ),
    );
  }

  async getAll(): Promise<BiteEvent[]> {
    return db.biteEvents.toArray();
  }

  async getBySession(sessionId: string): Promise<BiteEvent[]> {
    return db.biteEvents.where('sessionId').equals(sessionId).sortBy('occurredAt');
  }

  async getByRod(rodId: string): Promise<BiteEvent[]> {
    return db.biteEvents.where('rodId').equals(rodId).sortBy('occurredAt');
  }

  async countByRod(rodId: string): Promise<number> {
    return db.biteEvents.where('rodId').equals(rodId).count();
  }

  async getById(id: string): Promise<BiteEvent | undefined> {
    return db.biteEvents.get(id);
  }

  async getLatestByRod(rodId: string): Promise<BiteEvent | undefined> {
    const events = await db.biteEvents.where('rodId').equals(rodId).sortBy('occurredAt');
    return events.at(-1);
  }

  async put(event: BiteEvent): Promise<void> {
    await db.biteEvents.put(event);
  }

  async delete(id: string): Promise<void> {
    await db.biteEvents.delete(id);
  }

  async deleteBySession(sessionId: string): Promise<void> {
    await db.biteEvents.where('sessionId').equals(sessionId).delete();
  }

  async deleteByRod(rodId: string): Promise<void> {
    await db.biteEvents.where('rodId').equals(rodId).delete();
  }

  async clear(): Promise<void> {
    await db.biteEvents.clear();
  }
}
