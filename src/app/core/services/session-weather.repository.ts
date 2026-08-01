import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { SessionWeatherRecord } from '../models';
import { ModeScopedRepository, NewModeEntity } from './mode-scoped.repository';

@Injectable({ providedIn: 'root' })
export class SessionWeatherRepository extends ModeScopedRepository {
  watchBySession(sessionId: string): Observable<SessionWeatherRecord[]> {
    return from(
      liveQuery(() =>
        db.sessionWeather.where('sessionId').equals(sessionId).sortBy('capturedAt'),
      ),
    );
  }

  async getAll(): Promise<SessionWeatherRecord[]> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return [];
    }
    return db.sessionWeather.where('fishingMode').equals(mode).toArray();
  }

  async getAllAcrossModes(): Promise<SessionWeatherRecord[]> {
    return db.sessionWeather.toArray();
  }

  async getBySession(sessionId: string): Promise<SessionWeatherRecord[]> {
    return db.sessionWeather.where('sessionId').equals(sessionId).sortBy('capturedAt');
  }

  async getById(id: string): Promise<SessionWeatherRecord | undefined> {
    return this.forActiveMode(await db.sessionWeather.get(id));
  }

  async put(record: NewModeEntity<SessionWeatherRecord>): Promise<void> {
    await db.sessionWeather.put(this.withMode(record));
  }

  async delete(id: string): Promise<void> {
    await db.sessionWeather.delete(id);
  }

  async deleteBySession(sessionId: string): Promise<void> {
    await db.sessionWeather.where('sessionId').equals(sessionId).delete();
  }

  async clearCurrentMode(): Promise<void> {
    const mode = this.activeMode();
    await db.sessionWeather.where('fishingMode').equals(mode).delete();
  }

  async clear(): Promise<void> {
    await db.sessionWeather.clear();
  }
}
