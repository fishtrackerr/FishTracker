import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FishingSpot, Lake } from '../models';
import { generateId, nowIso, onlyVisibleRecords, softDeleteRecord } from '../utils';
import { LakeRepository } from './lake.repository';
import { RelatedDataSyncService } from './related-data-sync.service';
import { SettingsService } from './settings.service';

@Injectable({ providedIn: 'root' })
export class LakeService {
  constructor(
    private readonly lakeRepo: LakeRepository,
    private readonly sync: RelatedDataSyncService,
    private readonly settings: SettingsService,
  ) {}

  watchAll(): Observable<Lake[]> {
    return this.lakeRepo.watchAll().pipe(map((lakes) => lakes.map((l) => this.withVisibleSpots(l))));
  }

  watchById(id: string): Observable<Lake | undefined> {
    return this.lakeRepo
      .watchById(id)
      .pipe(map((lake) => (lake ? this.withVisibleSpots(lake) : undefined)));
  }

  async getAll(): Promise<Lake[]> {
    const lakes = await this.lakeRepo.getAll();
    return lakes.map((l) => this.withVisibleSpots(l));
  }

  async getById(id: string): Promise<Lake | undefined> {
    const lake = await this.lakeRepo.getById(id);
    return lake ? this.withVisibleSpots(lake) : undefined;
  }

  async create(data: Partial<Lake>): Promise<Lake> {
    const now = nowIso();
    const country = data.country ?? this.settings.get().defaultCountry;
    const lake = {
      id: generateId(),
      name: data.name ?? 'New Lake',
      description: data.description,
      address: data.address,
      country,
      latitude: data.latitude,
      longitude: data.longitude,
      isFavorite: data.isFavorite ?? false,
      rules: data.rules,
      permitInformation: data.permitInformation,
      openingHours: data.openingHours,
      averageDepthM: data.averageDepthM,
      maximumDepthM: data.maximumDepthM,
      surfaceAreaHa: data.surfaceAreaHa,
      parking: data.parking,
      facilities: data.facilities,
      notes: data.notes,
      spots: [],
      photoIds: [],
      createdAt: now,
      updatedAt: now,
    };
    await this.lakeRepo.put(lake);
    return lake as unknown as Lake;
  }

  async update(id: string, data: Partial<Lake>): Promise<Lake | undefined> {
    const existing = await this.lakeRepo.getById(id);
    if (!existing) {
      return undefined;
    }
    const updated: Lake = { ...existing, ...data, id, updatedAt: nowIso() };
    await this.lakeRepo.put(updated);
    if (data.name !== undefined && data.name !== existing.name) {
      await this.sync.onLakeRenamed(id, existing.name, data.name);
    }
    return this.withVisibleSpots(updated);
  }

  async delete(id: string): Promise<void> {
    await this.lakeRepo.delete(id);
  }

  async toggleFavorite(id: string): Promise<void> {
    const lake = await this.lakeRepo.getById(id);
    if (lake) {
      await this.update(id, { isFavorite: !lake.isFavorite });
    }
  }

  async addSpot(lakeId: string, data: Partial<FishingSpot>): Promise<FishingSpot | undefined> {
    const lake = await this.lakeRepo.getById(lakeId);
    if (!lake) {
      return undefined;
    }
    const spot: FishingSpot = {
      id: generateId(),
      name: data.name ?? 'New Spot',
      latitude: data.latitude,
      longitude: data.longitude,
      waterDepthM: data.waterDepthM,
      bottomType: data.bottomType,
      distanceM: data.distanceM,
      vegetation: data.vegetation,
      snags: data.snags,
      recommendedBait: data.recommendedBait,
      notes: data.notes,
      isFavorite: data.isFavorite ?? false,
      visible: true,
    };
    lake.spots.push(spot);
    await this.update(lakeId, { spots: lake.spots });
    return spot;
  }

  async updateSpot(
    lakeId: string,
    spotId: string,
    data: Partial<FishingSpot>,
  ): Promise<void> {
    const lake = await this.lakeRepo.getById(lakeId);
    if (!lake) {
      return;
    }
    lake.spots = lake.spots.map((s) =>
      s.id === spotId ? { ...s, ...data, id: spotId } : s,
    );
    await this.update(lakeId, { spots: lake.spots });
    const updated = lake.spots.find((s) => s.id === spotId);
    if (updated) {
      await this.sync.onLakeSpotUpdated(lakeId, spotId, {
        name: updated.name,
        latitude: updated.latitude,
        longitude: updated.longitude,
        depth: updated.waterDepthM,
        bottomType: updated.bottomType,
        notes: updated.notes,
      });
    }
  }

  async deleteSpot(lakeId: string, spotId: string): Promise<void> {
    const lake = await this.lakeRepo.getById(lakeId);
    if (!lake) {
      return;
    }
    lake.spots = lake.spots.map((s) => (s.id === spotId ? softDeleteRecord(s) : s));
    await this.update(lakeId, { spots: lake.spots });
  }

  getSortedLakes(lakes: Lake[]): Lake[] {
    return [...lakes].sort((a, b) => {
      if (a.isFavorite !== b.isFavorite) {
        return a.isFavorite ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
  }

  /** Hide soft-deleted spots for UI reads; storage keeps the full list. */
  private withVisibleSpots(lake: Lake): Lake {
    return { ...lake, spots: onlyVisibleRecords(lake.spots ?? []) };
  }
}
