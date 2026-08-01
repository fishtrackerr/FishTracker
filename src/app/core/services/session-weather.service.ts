import { Injectable } from '@angular/core';
import { SessionWeatherRecord, WeatherSnapshot } from '../models';
import { generateId } from '../utils';
import { SessionWeatherRepository } from './session-weather.repository';

@Injectable({ providedIn: 'root' })
export class SessionWeatherService {
  constructor(private readonly repo: SessionWeatherRepository) {}

  watchBySession(sessionId: string) {
    return this.repo.watchBySession(sessionId);
  }

  async getBySession(sessionId: string): Promise<SessionWeatherRecord[]> {
    return this.repo.getBySession(sessionId);
  }

  /** Append a weather snapshot to session history. */
  async record(sessionId: string, weather: WeatherSnapshot): Promise<SessionWeatherRecord> {
    const record = {
      id: generateId(),
      sessionId,
      capturedAt: weather.capturedAt,
      weather,
    };
    await this.repo.put(record);
    return record as SessionWeatherRecord;
  }

  async deleteBySession(sessionId: string): Promise<void> {
    await this.repo.deleteBySession(sessionId);
  }
}
