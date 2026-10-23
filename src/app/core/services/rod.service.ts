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
    if (onlyVisibleRecords(full.rods ?? []).length >= count) {
      return full;
    }
    let created: SessionRod[] = [];
    const updated = await this.modifyRods(full, (rods) => {
      const result = this.growRods(full.id, rods, count);
      created = result.created;
      return result.rods;
    });
    for (const rod of created) {
      await this.sessionEvents.record({
        sessionId: full.id,
        type: 'rod-created',
        rodId: rod.id,
        description: `${rod.name} created`,
      });
    }
    return updated;
  }

  /** Revives hidden rods first, then creates new ones until `count` are visible. */
  private growRods(
    sessionId: string,
    rods: SessionRod[],
    count: number,
  ): { rods: SessionRod[]; created: SessionRod[] } {
    let need = count - onlyVisibleRecords(rods).length;
    if (need <= 0) {
      return { rods, created: [] };
    }
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
    const created: SessionRod[] = [];
    while (need > 0) {
      const rod = this.createRodRecords(sessionId, 1)[0];
      rod.rodNumber = nextNumber;
      rod.name = `Rod ${nextNumber}`;
      nextNumber += 1;
      newRods.push(rod);
      created.push(rod);
      need -= 1;
    }
    return { rods: newRods, created };
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
    const updated = await this.modifyRods(full, (latestRods) =>
      latestRods.map((rod) => (hideIds.has(rod.id) ? softDeleteRecord(rod) : rod)),
    );
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

    const updatedSession = await this.modifyRods(full, (latestRods) =>
      latestRods.map((r) => (r.id === rodId ? { ...r, sessionSpotId } : r)),
    );

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
    const updated = await this.modifyRods(full, (latestRods) =>
      latestRods.map((rod) =>
        rod.id === rodId ? { ...rod, ...options, id: rodId, sessionId: full.id } : rod,
      ),
    );

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
    const counts = new Map<string, Pick<SessionRod, 'biteCount' | 'fishSpottedCount'>>();
    for (const rod of full.rods ?? []) {
      counts.set(rod.id, {
        biteCount: await this.biteRepo.countByRod(rod.id),
        fishSpottedCount: await this.fishSpottedRepo.countByRod(rod.id),
      });
    }
    // Merge counts into the latest rods so rod edits made meanwhile are kept.
    return this.modifyRods(full, (latestRods) =>
      latestRods.map((rod) => {
        const rodCounts = counts.get(rod.id);
        return rodCounts ? { ...rod, ...rodCounts } : rod;
      }),
    );
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

  /**
   * Adds a manually named spot to the session (no lake spot). Runs inside one
   * repository transaction; a visible spot with the same name (case-insensitive)
   * is reused instead of duplicated.
   */
  async addSessionSpot(
    session: FishingSession,
    name: string,
  ): Promise<{ session: FishingSession; spot: SessionSpot }> {
    const trimmed = name.trim();
    if (!trimmed) {
      throw new Error('Spot name is required');
    }
    let spot: SessionSpot = { id: generateId(), name: trimmed, visible: true };
    const add = (spots: SessionSpot[]): SessionSpot[] => {
      const existing = onlyVisibleRecords(spots).find(
        (s) => s.name.trim().toLowerCase() === trimmed.toLowerCase(),
      );
      if (existing) {
        spot = existing;
        return spots;
      }
      return [...spots, spot];
    };
    const updated = await this.sessionRepo.modify(session.id, (latest) => {
      latest.sessionSpots = add(latest.sessionSpots ?? []);
    });
    return {
      session: updated ?? { ...session, sessionSpots: add(session.sessionSpots ?? []) },
      spot,
    };
  }

  /** Replaces only `rods`; other session fields keep their latest stored values. */
  async saveSessionRods(session: FishingSession, rods: SessionRod[]): Promise<FishingSession> {
    return this.modifyRods(session, () => rods);
  }

  /**
   * Derives the new rods from the latest stored rods inside one transaction, so
   * rod edits, bite syncs and catch stats never overwrite each other.
   * When the row is gone (deleted or other mode) nothing is written.
   */
  private async modifyRods(
    session: FishingSession,
    change: (rods: SessionRod[]) => SessionRod[],
  ): Promise<FishingSession> {
    const updated = await this.sessionRepo.modify(session.id, (latest) => {
      latest.rods = change(latest.rods ?? []);
    });
    return updated ?? { ...session, rods: change(session.rods ?? []) };
  }

  getRodCatchCount(sessionId: string, rodId: string, catches: { rodId?: string }[]): number {
    return catches.filter((c) => c.rodId === rodId).length;
  }

  /** Prefer DB row so soft-deleted nested rods/spots are not dropped on save. */
  private async loadFull(session: FishingSession): Promise<FishingSession> {
    return (await this.sessionRepo.getById(session.id)) ?? session;
  }
}
