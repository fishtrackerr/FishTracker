import { Injectable } from '@angular/core';
import {
  FishingSpot,
  FishingSession,
  RodSpotHistory,
  SessionRod,
  SessionSpot,
} from '../models';
import { generateId, nowIso, onlyVisibleRecords, softDeleteRecord } from '../utils';
import { BiteEventRepository } from './bite-event.repository';
import { CatchRepository } from './catch.repository';
import { FishSpottedRepository } from './fish-spotted.repository';
import { RodSpotHistoryRepository } from './rod-spot-history.repository';
import { SessionEventService } from './session-event.service';
import { SessionRepository } from './session.repository';

export interface UpdateRodOptions {
  name?: string;
  sessionSpotId?: string;
  bait?: string;
  rig?: string;
  castAt?: string;
  retrievedAt?: string;
  isActive?: boolean;
  notes?: string;
}

@Injectable({ providedIn: 'root' })
export class RodService {
  constructor(
    private readonly sessionRepo: SessionRepository,
    private readonly biteRepo: BiteEventRepository,
    private readonly fishSpottedRepo: FishSpottedRepository,
    private readonly catchRepo: CatchRepository,
    private readonly historyRepo: RodSpotHistoryRepository,
    private readonly sessionEvents: SessionEventService,
  ) {}

  createRodRecords(sessionId: string, count: number): SessionRod[] {
    const rods: SessionRod[] = [];
    for (let i = 1; i <= count; i++) {
      rods.push({
        id: generateId(),
        sessionId,
        rodNumber: i,
        name: `Rod ${i}`,
        biteCount: 0,
        fishSpottedCount: 0,
        isActive: true,
        visible: true,
      });
    }
    return rods;
  }

  async ensureRods(session: FishingSession, count: number): Promise<FishingSession> {
    const full = await this.loadFull(session);
    const rods = full.rods ?? [];
    const visible = onlyVisibleRecords(rods);
    if (visible.length === count) {
      return full;
    }
    if (visible.length < count) {
      let need = count - visible.length;
      let newRods = rods.map((rod) => ({ ...rod }));
      const hidden = newRods
        .filter((r) => r.visible === false)
        .sort((a, b) => a.rodNumber - b.rodNumber);
      for (const hiddenRod of hidden) {
        if (need <= 0) {
          break;
        }
        newRods = newRods.map((r) =>
          r.id === hiddenRod.id ? { ...r, visible: true, isActive: true } : r,
        );
        need -= 1;
      }
      const visibleAfterRevive = onlyVisibleRecords(newRods);
      let nextNumber =
        Math.max(0, ...newRods.map((r) => r.rodNumber), visibleAfterRevive.length) + 1;
      while (need > 0) {
        const rod = this.createRodRecords(full.id, 1)[0];
        rod.rodNumber = nextNumber;
        rod.name = `Rod ${nextNumber}`;
        nextNumber += 1;
        newRods.push(rod);
        need -= 1;
        await this.sessionEvents.record({
          sessionId: full.id,
          type: 'rod-created',
          rodId: rod.id,
          description: `${rod.name} created`,
        });
      }
      return this.saveSessionRods(full, newRods);
    }
    return full;
  }

  async resizeRodCount(
    session: FishingSession,
    newCount: number,
    force = false,
  ): Promise<{ session: FishingSession; requiresConfirm: boolean; affectedRodIds: string[] }> {
    const full = await this.loadFull(session);
    const rods = full.rods ?? [];
    const visible = onlyVisibleRecords(rods).sort((a, b) => a.rodNumber - b.rodNumber);
    if (newCount < 1) {
      throw new Error('Rod count must be at least 1');
    }
    if (newCount >= visible.length) {
      const updated = await this.ensureRods(full, newCount);
      return { session: updated, requiresConfirm: false, affectedRodIds: [] };
    }

    const removed = visible.slice(newCount);
    const affectedRodIds: string[] = [];
    for (const rod of removed) {
      const bites = await this.biteRepo.countByRod(rod.id);
      const spotted = await this.fishSpottedRepo.countByRod(rod.id);
      const catches = (await this.catchRepo.getBySession(full.id)).filter(
        (c) => c.rodId === rod.id,
      );
      if (bites > 0 || spotted > 0 || catches.length > 0) {
        affectedRodIds.push(rod.id);
      }
    }

    if (affectedRodIds.length > 0 && !force) {
      return { session: full, requiresConfirm: true, affectedRodIds };
    }

    const hideIds = new Set(removed.map((r) => r.id));
    const updatedRods = rods.map((rod) =>
      hideIds.has(rod.id) ? softDeleteRecord(rod) : rod,
    );
    const updated = await this.saveSessionRods(full, updatedRods);
    return { session: updated, requiresConfirm: false, affectedRodIds };
  }

  async assignSpot(
    session: FishingSession,
    rodId: string,
    sessionSpotId?: string,
  ): Promise<FishingSession> {
    const full = await this.loadFull(session);
    const rods = full.rods ?? [];
    const rod = rods.find((r) => r.id === rodId);
    if (!rod) {
      return full;
    }
    const fromSpotId = rod.sessionSpotId;
    if (fromSpotId === sessionSpotId) {
      return full;
    }

    const updatedRod: SessionRod = { ...rod, sessionSpotId };
    const updatedRods = rods.map((r) => (r.id === rodId ? updatedRod : r));
    const updatedSession = await this.saveSessionRods(full, updatedRods);

    const history: RodSpotHistory = {
      id: generateId(),
      rodId,
      fromSessionSpotId: fromSpotId,
      toSessionSpotId: sessionSpotId ?? '',
      changedAt: nowIso(),
    };
    if (sessionSpotId) {
      await this.historyRepo.put(history);
    }

    const spotName =
      onlyVisibleRecords(full.sessionSpots ?? []).find((s) => s.id === sessionSpotId)?.name ??
      'unassigned';
    await this.sessionEvents.record({
      sessionId: full.id,
      type: 'rod-moved',
      rodId,
      sessionSpotId,
      description: `${rod.name} moved to ${spotName}`,
    });

    return updatedSession;
  }

  /**
   * Recast a rod: optionally move it to a new session spot and record cast time.
   * Spot may stay the same; castAt is always updated.
   */
  async recast(
    session: FishingSession,
    rodId: string,
    sessionSpotId?: string,
  ): Promise<FishingSession> {
    const full = await this.loadFull(session);
    const rod = (full.rods ?? []).find((r) => r.id === rodId);
    if (!rod) {
      return full;
    }

    const nextSpotId = sessionSpotId || undefined;
    let updated = full;
    if ((rod.sessionSpotId ?? '') !== (nextSpotId ?? '')) {
      updated = await this.assignSpot(updated, rodId, nextSpotId);
    }

    return this.updateRod(updated, rodId, {
      castAt: nowIso(),
      sessionSpotId: nextSpotId,
    });
  }

  async updateRod(
    session: FishingSession,
    rodId: string,
    options: UpdateRodOptions,
  ): Promise<FishingSession> {
    const full = await this.loadFull(session);
    const rods = full.rods ?? [];
    const existing = rods.find((r) => r.id === rodId);
    const updatedRods = rods.map((rod) =>
      rod.id === rodId ? { ...rod, ...options, id: rodId, sessionId: full.id } : rod,
    );
    const updated = await this.saveSessionRods(full, updatedRods);

    if (options.castAt) {
      const rodName = existing?.name ?? rodId;
      const spotId = options.sessionSpotId ?? existing?.sessionSpotId;
      const spotName =
        onlyVisibleRecords(full.sessionSpots ?? []).find((s) => s.id === spotId)?.name ??
        'unassigned';
      await this.sessionEvents.record({
        sessionId: full.id,
        type: 'rod-cast',
        rodId,
        sessionSpotId: spotId,
        description: `${rodName} cast at ${spotName}`,
        occurredAt: options.castAt,
      });
    }

    return updated;
  }

  async syncRodCounts(session: FishingSession): Promise<FishingSession> {
    const full = await this.loadFull(session);
    const rods = full.rods ?? [];
    const updatedRods: SessionRod[] = [];
    for (const rod of rods) {
      const biteCount = await this.biteRepo.countByRod(rod.id);
      const fishSpottedCount = await this.fishSpottedRepo.countByRod(rod.id);
      updatedRods.push({ ...rod, biteCount, fishSpottedCount });
    }
    return this.saveSessionRods(full, updatedRods);
  }

  snapshotFromLakeSpot(spot: FishingSpot): SessionSpot {
    return {
      id: generateId(),
      lakeSpotId: spot.id,
      name: spot.name,
      latitude: spot.latitude,
      longitude: spot.longitude,
      depth: spot.waterDepthM,
      bottomType: spot.bottomType,
      notes: spot.notes,
      visible: true,
    };
  }

  async saveSessionRods(session: FishingSession, rods: SessionRod[]): Promise<FishingSession> {
    const updated: FishingSession = {
      ...session,
      rods,
      updatedAt: nowIso(),
    };
    await this.sessionRepo.put(updated);
    return updated;
  }

  async saveSessionSpots(session: FishingSession, sessionSpots: SessionSpot[]): Promise<FishingSession> {
    const full = await this.loadFull(session);
    const updated: FishingSession = {
      ...full,
      sessionSpots,
      updatedAt: nowIso(),
    };
    await this.sessionRepo.put(updated);
    return updated;
  }

  getRodCatchCount(sessionId: string, rodId: string, catches: { rodId?: string }[]): number {
    return catches.filter((c) => c.rodId === rodId).length;
  }

  /** Prefer DB row so soft-deleted nested rods/spots are not dropped on save. */
  private async loadFull(session: FishingSession): Promise<FishingSession> {
    return (await this.sessionRepo.getById(session.id)) ?? session;
  }
}
