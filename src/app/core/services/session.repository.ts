import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { FishingSession } from '../models';

@Injectable({ providedIn: 'root' })
export class SessionRepository {
  watchAll(): Observable<FishingSession[]> {
    return from(
      liveQuery(() => db.sessions.orderBy('startDate').reverse().toArray()),
    );
  }

  watchById(id: string): Observable<FishingSession | undefined> {
    return from(liveQuery(() => db.sessions.get(id)));
  }

  watchActive(): Observable<FishingSession | undefined> {
    return from(
      liveQuery(() => db.sessions.where('status').equals('active').first()),
    );
  }

  async getAll(): Promise<FishingSession[]> {
    return db.sessions.orderBy('startDate').reverse().toArray();
  }

  async getById(id: string): Promise<FishingSession | undefined> {
    return db.sessions.get(id);
  }

  async getActive(): Promise<FishingSession | undefined> {
    return db.sessions.where('status').equals('active').first();
  }

  async getAllActive(): Promise<FishingSession[]> {
    return db.sessions.where('status').equals('active').toArray();
  }

  async put(session: FishingSession): Promise<void> {
    await db.sessions.put(session);
  }

  async delete(id: string): Promise<void> {
    await db.sessions.delete(id);
  }

  async clear(): Promise<void> {
    await db.sessions.clear();
  }
}
