import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { SessionWeatherRecord } from '../models';

@Injectable({ providedIn: 'root' })
export class SessionWeatherRepository {
  watchBySession(sessionId: string): Observable<SessionWeatherRecord[]> {
    return from(
      liveQuery(() =>
        db.sessionWeather.where('sessionId').equals(sessionId).sortBy('capturedAt'),
      ),
    );
  }

  async getAll(): Promise<SessionWeatherRecord[]> {
    return db.sessionWeather.toArray();
  }

  async getBySession(sessionId: string): Promise<SessionWeatherRecord[]> {
    return db.sessionWeather.where('sessionId').equals(sessionId).sortBy('capturedAt');
  }

  async getById(id: string): Promise<SessionWeatherRecord | undefined> {
    return db.sessionWeather.get(id);
  }

  async put(record: SessionWeatherRecord): Promise<void> {
    await db.sessionWeather.put(record);
  }

  async delete(id: string): Promise<void> {
    await db.sessionWeather.delete(id);
  }

  async deleteBySession(sessionId: string): Promise<void> {
    await db.sessionWeather.where('sessionId').equals(sessionId).delete();
  }

  async clear(): Promise<void> {
    await db.sessionWeather.clear();
  }
}
