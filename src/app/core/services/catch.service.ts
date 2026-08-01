import { Injectable } from '@angular/core';
import { Catch } from '../models';
import { generateId, nowIso } from '../utils';
import { CatchRepository } from './catch.repository';
import { GeolocationService } from './geolocation.service';
import { SessionEventService } from './session-event.service';
import { SessionRepository } from './session.repository';
import { WeatherService } from './weather.service';
import { ImageService } from './image.service';

export interface QuickCatchInput {
  species: string;
  weightKg?: number;
  lengthCm?: number;
  bait?: string;
  rig?: string;
  notes?: string;
  photo?: File;
  released?: boolean;
  rodId?: string;
  sessionSpotId?: string;
}

export interface FullCatchInput extends QuickCatchInput {
  fishName?: string;
  baitFlavor?: string;
  hookSize?: string;
  line?: string;
  method?: string;
  weatherType?: string;
  tags?: string[];
  spotId?: string;
  distanceM?: number;
  waterDepthM?: number;
  waterTemperatureC?: number;
  prebait?: string;
  caughtAt?: string;
}

@Injectable({ providedIn: 'root' })
export class CatchService {
  constructor(
    private readonly catchRepo: CatchRepository,
    private readonly sessionRepo: SessionRepository,
    private readonly geo: GeolocationService,
    private readonly weather: WeatherService,
    private readonly image: ImageService,
    private readonly sessionEvents: SessionEventService,
  ) {}

  watchBySession(sessionId: string) {
    return this.catchRepo.watchBySession(sessionId);
  }

  watchAll() {
    return this.catchRepo.watchAll();
  }

  async getById(id: string): Promise<Catch | undefined> {
    return this.catchRepo.getById(id);
  }

  async createQuick(sessionId: string, input: QuickCatchInput): Promise<Catch> {
    return this.create(sessionId, input);
  }

  async create(sessionId: string, input: FullCatchInput): Promise<Catch> {
    const session = await this.sessionRepo.getById(sessionId);
    const position = await this.geo.getCurrentPosition();
    const lat = position?.latitude ?? session?.latitude;
    const lng = position?.longitude ?? session?.longitude;
    let weatherSnapshot = session?.weather;
    if (lat != null && lng != null && !weatherSnapshot) {
      // Cache only — never block catch save on a live Open-Meteo round-trip.
      weatherSnapshot = this.weather.getCachedSnapshotFor(lat, lng) ?? undefined;
    }

    const rod = input.rodId ? session?.rods?.find((r) => r.id === input.rodId) : undefined;
    const sessionSpotId = input.sessionSpotId ?? rod?.sessionSpotId;

    let photoId: string | undefined;
    if (input.photo) {
      photoId = await this.image.processFile(input.photo, 'catch', sessionId);
    }

    const now = nowIso();
    const catchRecord: Catch = {
      id: generateId(),
      sessionId,
      rodId: input.rodId,
      sessionSpotId,
      species: input.species,
      fishName: input.fishName,
      caughtAt: input.caughtAt ?? now,
      weightKg: input.weightKg,
      lengthCm: input.lengthCm,
      bait: input.bait ?? rod?.bait,
      baitFlavor: input.baitFlavor,
      rig: input.rig ?? rod?.rig,
      hookSize: input.hookSize,
      line: input.line,
      method: input.method,
      weatherType: input.weatherType,
      tags: input.tags,
      spotId: input.spotId,
      latitude: lat,
      longitude: lng,
      distanceM: input.distanceM,
      waterDepthM: input.waterDepthM,
      waterTemperatureC: input.waterTemperatureC ?? session?.waterTemperatureC,
      photoId,
      notes: input.notes,
      released: input.released,
      prebait: input.prebait,
      weather: weatherSnapshot,
      createdAt: now,
      updatedAt: now,
    };

    catchRecord.isPersonalRecord = await this.checkPersonalRecord(catchRecord);
    await this.catchRepo.put(catchRecord);
    await this.updateSessionStats(sessionId);
    await this.sessionEvents.record({
      sessionId,
      type: 'catch',
      rodId: input.rodId,
      sessionSpotId,
      description: `${input.species} caught`,
      occurredAt: catchRecord.caughtAt,
    });
    return catchRecord;
  }

  async update(id: string, data: Partial<Catch>): Promise<Catch | undefined> {
    const existing = await this.catchRepo.getById(id);
    if (!existing) {
      return undefined;
    }
    const updated = { ...existing, ...data, id, updatedAt: nowIso() };
    updated.isPersonalRecord = await this.checkPersonalRecord(updated);
    await this.catchRepo.put(updated);
    await this.updateSessionStats(existing.sessionId);
    return updated;
  }

  async delete(id: string): Promise<void> {
    const existing = await this.catchRepo.getById(id);
    if (!existing) {
      return;
    }
    await this.catchRepo.delete(id);
    await this.updateSessionStats(existing.sessionId);
  }

  private async checkPersonalRecord(catchRecord: Catch): Promise<boolean> {
    const all = await this.catchRepo.getAll();
    const sameSpecies = all.filter(
      (c) => c.species === catchRecord.species && c.id !== catchRecord.id,
    );
    const maxWeight = sameSpecies.reduce(
      (max, c) => Math.max(max, c.weightKg ?? 0),
      0,
    );
    const maxLength = sameSpecies.reduce(
      (max, c) => Math.max(max, c.lengthCm ?? 0),
      0,
    );
    const weightRecord =
      catchRecord.weightKg != null && catchRecord.weightKg > maxWeight;
    const lengthRecord =
      catchRecord.lengthCm != null && catchRecord.lengthCm > maxLength;
    return weightRecord || lengthRecord;
  }

  private async updateSessionStats(sessionId: string): Promise<void> {
    const session = await this.sessionRepo.getById(sessionId);
    if (!session) {
      return;
    }
    const catches = await this.catchRepo.getBySession(sessionId);
    const totalWeight = catches.reduce((sum, c) => sum + (c.weightKg ?? 0), 0);
    const biggest = catches.reduce(
      (max, c) => Math.max(max, c.weightKg ?? 0),
      0,
    );
    await this.sessionRepo.put({
      ...session,
      catchCount: catches.length,
      totalCatchWeightKg: totalWeight,
      biggestFishKg: biggest > 0 ? biggest : undefined,
      updatedAt: nowIso(),
    });
  }
}
