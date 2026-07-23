import { Injectable } from '@angular/core';
import { Catch, FishingSession, SessionSpot } from '../models';
import { generateId, nowIso } from '../utils';
import { BiteEventRepository } from './bite-event.repository';
import { CatchRepository } from './catch.repository';
import { FishSpottedRepository } from './fish-spotted.repository';
import { GeolocationService } from './geolocation.service';
import { ImageService } from './image.service';
import { LakeRepository } from './lake.repository';
import { RodSpotHistoryRepository } from './rod-spot-history.repository';
import { RodService } from './rod.service';
import { SessionEventRepository } from './session-event.repository';
import { SessionEventService } from './session-event.service';
import { SessionRepository } from './session.repository';
import { SettingsService } from './settings.service';
import { WeatherService } from './weather.service';

export interface StartSessionOptions {
  name: string;
  startDate: string;
  lakeId?: string;
  rodCount?: number;
  sessionSpots?: SessionSpot[];
}

export interface UpdateSessionOptions {
  name?: string;
  lakeId?: string;
  status?: FishingSession['status'];
  startDate?: string;
  endDate?: string;
  latitude?: number;
  longitude?: number;
  prebait?: string;
  notes?: string;
  tags?: string[];
  waterTemperatureC?: number;
  sessionSpots?: SessionSpot[];
  rodCount?: number;
}

export class SessionValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SessionValidationError';
  }
}

@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor(
    private readonly sessionRepo: SessionRepository,
    private readonly catchRepo: CatchRepository,
    private readonly lakeRepo: LakeRepository,
    private readonly geo: GeolocationService,
    private readonly weather: WeatherService,
    private readonly image: ImageService,
    private readonly settings: SettingsService,
    private readonly rodService: RodService,
    private readonly sessionEvents: SessionEventService,
    private readonly biteEventRepo: BiteEventRepository,
    private readonly fishSpottedRepo: FishSpottedRepository,
    private readonly rodSpotHistoryRepo: RodSpotHistoryRepository,
    private readonly sessionEventRepo: SessionEventRepository,
  ) {}

  watchAll() {
    return this.sessionRepo.watchAll();
  }

  watchById(id: string) {
    return this.sessionRepo.watchById(id);
  }

  watchActive() {
    return this.sessionRepo.watchActive();
  }

  async getActive(): Promise<FishingSession | undefined> {
    return this.sessionRepo.getActive();
  }

  async getById(id: string): Promise<FishingSession | undefined> {
    return this.sessionRepo.getById(id);
  }

  async start(options: StartSessionOptions): Promise<FishingSession> {
    const existing = await this.sessionRepo.getActive();
    if (existing) {
      return existing;
    }

    const { name, startDate, lakeId, sessionSpots } = options;
    const lake = lakeId ? await this.lakeRepo.getById(lakeId) : undefined;
    const now = nowIso();
    const sessionId = generateId();
    const maxRodCount = this.settings.get().maxRodCount ?? 10;
    const rods =
      options.rodCount != null
        ? this.rodService.createRodRecords(
            sessionId,
            Math.min(Math.max(1, options.rodCount), maxRodCount),
          )
        : [];

    let latitude: number | undefined;
    let longitude: number | undefined;
    let weatherSnapshot = null;

    try {
      const position = await this.geo.getCurrentPosition();
      if (position) {
        latitude = position.latitude;
        longitude = position.longitude;
        weatherSnapshot = await this.weather.getSnapshot(
          position.latitude,
          position.longitude,
        );
      }
    } catch {
      // GPS and weather are optional
    }

    let coverImageId: string | undefined;
    try {
      coverImageId = await this.image.createCoverImage();
    } catch {
      // Cover image is optional
    }

    const session: FishingSession = {
      id: sessionId,
      name: name.trim() || (lake ? `Session at ${lake.name}` : 'Fishing Session'),
      lakeId,
      status: 'active',
      startDate,
      latitude,
      longitude,
      weather: weatherSnapshot ?? undefined,
      sessionSpots: sessionSpots ?? [],
      rods,
      photoIds: [],
      catchCount: 0,
      totalCatchWeightKg: 0,
      coverImageId,
      createdAt: now,
      updatedAt: now,
    };

    await this.sessionRepo.put(session);
    await this.sessionEvents.record({
      sessionId: session.id,
      type: 'session-start',
      description: `${session.name} started`,
      occurredAt: startDate,
    });
    for (const rod of rods) {
      await this.sessionEvents.record({
        sessionId: session.id,
        type: 'rod-created',
        rodId: rod.id,
        description: `${rod.name} created`,
      });
    }
    if (lakeId) {
      this.settings.update({ lastLakeId: lakeId });
    }
    return session;
  }

  async complete(id: string): Promise<FishingSession | undefined> {
    const session = await this.sessionRepo.getById(id);
    if (!session) {
      return undefined;
    }

    const catches = await this.catchRepo.getBySession(id);
    const totalWeight = catches.reduce((sum, c) => sum + (c.weightKg ?? 0), 0);
    const biggest = catches.reduce(
      (max, c) => Math.max(max, c.weightKg ?? 0),
      0,
    );

    const updated: FishingSession = {
      ...session,
      status: 'completed',
      endDate: nowIso(),
      catchCount: catches.length,
      totalCatchWeightKg: totalWeight,
      biggestFishKg: biggest > 0 ? biggest : undefined,
      updatedAt: nowIso(),
    };

    await this.sessionRepo.put(updated);
    await this.sessionEvents.record({
      sessionId: id,
      type: 'session-end',
      description: `${session.name} completed`,
    });
    return updated;
  }

  async update(id: string, data: Partial<FishingSession>): Promise<FishingSession | undefined> {
    const existing = await this.sessionRepo.getById(id);
    if (!existing) {
      return undefined;
    }
    const updated = { ...existing, ...data, id, updatedAt: nowIso() };
    await this.sessionRepo.put(updated);
    return updated;
  }

  async updateSession(
    id: string,
    options: UpdateSessionOptions,
    forceRodResize = false,
  ): Promise<FishingSession> {
    const existing = await this.sessionRepo.getById(id);
    if (!existing) {
      throw new SessionValidationError('Session not found');
    }

    const startDate = options.startDate ?? existing.startDate;
    const endDate = options.endDate !== undefined ? options.endDate : existing.endDate;

    if (endDate && new Date(endDate).getTime() < new Date(startDate).getTime()) {
      throw new SessionValidationError('End date cannot be earlier than start date');
    }

    const newStatus = options.status ?? existing.status;
    if (newStatus === 'active' && existing.status !== 'active') {
      const otherActive = await this.sessionRepo.getActive();
      if (otherActive && otherActive.id !== id) {
        throw new SessionValidationError('Another active session already exists');
      }
    }

    let sessionSpots = options.sessionSpots ?? existing.sessionSpots ?? [];
    let rods = existing.rods ?? [];

    if (options.rodCount != null) {
      const resize = await this.rodService.resizeRodCount(
        { ...existing, sessionSpots, rods },
        options.rodCount,
        forceRodResize,
      );
      if (resize.requiresConfirm) {
        throw new SessionValidationError(
          'Reducing rod count will remove rods with activity. Confirm to proceed.',
        );
      }
      rods = resize.session.rods ?? [];
    }

    const merged: FishingSession = {
      ...existing,
      ...options,
      startDate,
      endDate,
      status: newStatus,
      sessionSpots,
      rods,
      id,
      updatedAt: nowIso(),
    };

    const catches = await this.catchRepo.getBySession(id);
    const totalWeight = catches.reduce((sum, c) => sum + (c.weightKg ?? 0), 0);
    const biggest = catches.reduce((max, c) => Math.max(max, c.weightKg ?? 0), 0);
    merged.catchCount = catches.length;
    merged.totalCatchWeightKg = totalWeight;
    merged.biggestFishKg = biggest > 0 ? biggest : undefined;

    await this.sessionRepo.put(merged);
    return merged;
  }

  async refreshWeather(id: string): Promise<void> {
    const session = await this.sessionRepo.getById(id);
    if (!session) {
      return;
    }
    const lat = session.latitude;
    const lng = session.longitude;
    if (lat == null || lng == null) {
      const pos = await this.geo.getCurrentPosition();
      if (!pos) {
        return;
      }
      const weather = await this.weather.getSnapshot(pos.latitude, pos.longitude);
      await this.update(id, {
        latitude: pos.latitude,
        longitude: pos.longitude,
        weather: weather ?? undefined,
      });
      await this.sessionEvents.record({
        sessionId: id,
        type: 'weather',
        description: 'Weather updated',
      });
      return;
    }
    const weather = await this.weather.getSnapshot(lat, lng);
    if (weather) {
      await this.update(id, { weather });
      await this.sessionEvents.record({
        sessionId: id,
        type: 'weather',
        description: 'Weather updated',
      });
    }
  }

  async addSessionPhoto(sessionId: string, file: File): Promise<void> {
    const session = await this.sessionRepo.getById(sessionId);
    if (!session) {
      return;
    }
    const photoId = await this.image.processFile(file, 'session', sessionId);
    await this.update(sessionId, {
      photoIds: [...session.photoIds, photoId],
    });
  }

  async delete(id: string): Promise<void> {
    await this.catchRepo.deleteBySession(id);
    await this.biteEventRepo.deleteBySession(id);
    await this.fishSpottedRepo.deleteBySession(id);
    await this.sessionEventRepo.deleteBySession(id);
    const session = await this.sessionRepo.getById(id);
    if (session?.rods) {
      for (const rod of session.rods) {
        await this.rodSpotHistoryRepo.deleteByRod(rod.id);
      }
    }
    await this.sessionRepo.delete(id);
  }

  getDurationMs(session: FishingSession): number {
    const end = session.endDate ? new Date(session.endDate).getTime() : Date.now();
    return end - new Date(session.startDate).getTime();
  }
}
