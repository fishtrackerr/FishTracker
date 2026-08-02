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
      liveQuery(async () => {
        const rows = await db.sessionWeather
          .where('sessionId')
          .equals(sessionId)
          .sortBy('capturedAt');
        return this.onlyVisible(rows);
      }),
    );
  }

  async getAll(): Promise<SessionWeatherRecord[]> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return [];
    }
    return this.onlyVisible(await db.sessionWeather.where('fishingMode').equals(mode).toArray());
  }

  async getAllAcrossModes(): Promise<SessionWeatherRecord[]> {
    return db.sessionWeather.toArray();
  }

  async getBySession(sessionId: string): Promise<SessionWeatherRecord[]> {
    return this.onlyVisible(
      await db.sessionWeather.where('sessionId').equals(sessionId).sortBy('capturedAt'),
    );
  }

  async getById(id: string): Promise<SessionWeatherRecord | undefined> {
    return this.forActiveMode(await db.sessionWeather.get(id));
  }

  async put(record: NewModeEntity<SessionWeatherRecord>): Promise<void> {
    await db.sessionWeather.put(this.withMode(record));
  }

  async delete(id: string): Promise<void> {
    const row = await db.sessionWeather.get(id);
    if (!row) {
      return;
    }
    await db.sessionWeather.put({ ...row, visible: false });
  }

  async deleteBySession(sessionId: string): Promise<void> {
    const rows = await db.sessionWeather.where('sessionId').equals(sessionId).toArray();
    await Promise.all(rows.map((row) => db.sessionWeather.put({ ...row, visible: false })));
  }

  async clearCurrentMode(): Promise<void> {
    const mode = this.activeMode();
    await db.sessionWeather.where('fishingMode').equals(mode).delete();
  }

  async clear(): Promise<void> {
    await db.sessionWeather.clear();
  }
}
