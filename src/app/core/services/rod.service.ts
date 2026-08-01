import { Injectable } from '@angular/core';
import {
  FishingSpot,
  FishingSession,
  RodSpotHistory,
  SessionRod,
  SessionSpot,
} from '../models';
import { generateId, nowIso } from '../utils';
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
      });
    }
    return rods;
  }

  async ensureRods(session: FishingSession, count: number): Promise<FishingSession> {
    const rods = session.rods ?? [];
    if (rods.length === count) {
      return session;
    }
    if (rods.length < count) {
      const newRods = [...rods];
      for (let i = rods.length + 1; i <= count; i++) {
        const rod = this.createRodRecords(session.id, 1)[0];
        rod.rodNumber = i;
        rod.name = `Rod ${i}`;
        newRods.push(rod);
        await this.sessionEvents.record({
          sessionId: session.id,
          type: 'rod-created',
          rodId: rod.id,
          description: `${rod.name} created`,
        });
      }
      return this.saveSessionRods(session, newRods);
    }
    return session;
  }

  async resizeRodCount(
    session: FishingSession,
    newCount: number,
    force = false,
  ): Promise<{ session: FishingSession; requiresConfirm: boolean; affectedRodIds: string[] }> {
    const rods = session.rods ?? [];
    if (newCount < 1) {
      throw new Error('Rod count must be at least 1');
    }
    if (newCount >= rods.length) {
      const updated = await this.ensureRods(session, newCount);
      return { session: updated, requiresConfirm: false, affectedRodIds: [] };
    }

    const removed = rods.slice(newCount);
    const affectedRodIds: string[] = [];
    for (const rod of removed) {
      const bites = await this.biteRepo.countByRod(rod.id);
      const spotted = await this.fishSpottedRepo.countByRod(rod.id);
      const catches = (await this.catchRepo.getBySession(session.id)).filter(
        (c) => c.rodId === rod.id,
      );
      if (bites > 0 || spotted > 0 || catches.length > 0) {
        affectedRodIds.push(rod.id);
      }
    }

    if (affectedRodIds.length > 0 && !force) {
      return { session, requiresConfirm: true, affectedRodIds };
    }

    const kept = rods.slice(0, newCount);
    const updated = await this.saveSessionRods(session, kept);
    return { session: updated, requiresConfirm: false, affectedRodIds };
  }

  async assignSpot(
    session: FishingSession,
    rodId: string,
    sessionSpotId?: string,
  ): Promise<FishingSession> {
    const rods = session.rods ?? [];
    const rod = rods.find((r) => r.id === rodId);
    if (!rod) {
      return session;
    }
    const fromSpotId = rod.sessionSpotId;
    if (fromSpotId === sessionSpotId) {
      return session;
    }

    const updatedRod: SessionRod = { ...rod, sessionSpotId };
    const updatedRods = rods.map((r) => (r.id === rodId ? updatedRod : r));
    const updatedSession = await this.saveSessionRods(session, updatedRods);

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

    const spotName = session.sessionSpots?.find((s) => s.id === sessionSpotId)?.name ?? 'unassigned';
    await this.sessionEvents.record({
      sessionId: session.id,
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
    const rod = (session.rods ?? []).find((r) => r.id === rodId);
    if (!rod) {
      return session;
    }

    const nextSpotId = sessionSpotId || undefined;
    let updated = session;
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
    const rods = session.rods ?? [];
    const existing = rods.find((r) => r.id === rodId);
    const updatedRods = rods.map((rod) =>
      rod.id === rodId ? { ...rod, ...options, id: rodId, sessionId: session.id } : rod,
    );
    const updated = await this.saveSessionRods(session, updatedRods);

    if (options.castAt) {
      const rodName = existing?.name ?? rodId;
      const spotId = options.sessionSpotId ?? existing?.sessionSpotId;
      const spotName =
        session.sessionSpots?.find((s) => s.id === spotId)?.name ?? 'unassigned';
      await this.sessionEvents.record({
        sessionId: session.id,
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
    const rods = session.rods ?? [];
    const updatedRods: SessionRod[] = [];
    for (const rod of rods) {
      const biteCount = await this.biteRepo.countByRod(rod.id);
      const fishSpottedCount = await this.fishSpottedRepo.countByRod(rod.id);
      updatedRods.push({ ...rod, biteCount, fishSpottedCount });
    }
    return this.saveSessionRods(session, updatedRods);
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
    const updated: FishingSession = {
      ...session,
      sessionSpots,
      updatedAt: nowIso(),
    };
    await this.sessionRepo.put(updated);
    return updated;
  }

  getRodCatchCount(sessionId: string, rodId: string, catches: { rodId?: string }[]): number {
    return catches.filter((c) => c.rodId === rodId).length;
  }
}
