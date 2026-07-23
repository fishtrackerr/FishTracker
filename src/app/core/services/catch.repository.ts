import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { Catch } from '../models';

@Injectable({ providedIn: 'root' })
export class CatchRepository {
  watchAll(): Observable<Catch[]> {
    return from(liveQuery(() => db.catches.orderBy('caughtAt').reverse().toArray()));
  }

  watchBySession(sessionId: string): Observable<Catch[]> {
    return from(
      liveQuery(() =>
        db.catches.where('sessionId').equals(sessionId).sortBy('caughtAt'),
      ),
    );
  }

  async getAll(): Promise<Catch[]> {
    return db.catches.toArray();
  }

  async getBySession(sessionId: string): Promise<Catch[]> {
    return db.catches.where('sessionId').equals(sessionId).toArray();
  }

  async getById(id: string): Promise<Catch | undefined> {
    return db.catches.get(id);
  }

  async put(catchRecord: Catch): Promise<void> {
    await db.catches.put(catchRecord);
  }

  async delete(id: string): Promise<void> {
    await db.catches.delete(id);
  }

  async deleteBySession(sessionId: string): Promise<void> {
    await db.catches.where('sessionId').equals(sessionId).delete();
  }

  async clear(): Promise<void> {
    await db.catches.clear();
  }
}
