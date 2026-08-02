import { Injectable } from '@angular/core';
import {
  BiteEvent,
  Catch,
  FishSpottedEvent,
  FishingSession,
  Lake,
  MODE_DEFAULT_PREFERENCES,
  SessionRod,
  SessionSpot,
} from '../models';
import { generateId } from '../utils';
import { BiteEventRepository } from './bite-event.repository';
import { CatchRepository } from './catch.repository';
import { FishSpottedRepository } from './fish-spotted.repository';
import { FishingModeService } from './fishing-mode.service';
import { LakeRepository } from './lake.repository';
import { SessionEventRepository } from './session-event.repository';
import { SessionRepository } from './session.repository';

export interface DemoDataResult {
  lakes: number;
  sessions: number;
  catches: number;
  bites: number;
  fishSpotted: number;
}

/** Builds varied lakes / sessions / rods / catches for AI and UI testing (active mode). */
@Injectable({ providedIn: 'root' })
export class DemoDataService {
  constructor(
    private readonly lakes: LakeRepository,
    private readonly sessions: SessionRepository,
    private readonly catches: CatchRepository,
    private readonly bites: BiteEventRepository,
    private readonly fishSpotted: FishSpottedRepository,
    private readonly sessionEvents: SessionEventRepository,
    private readonly fishingMode: FishingModeService,
  ) {}

  async generateForActiveMode(): Promise<DemoDataResult> {
    const mode = this.fishingMode.requireMode();
    const prefs = MODE_DEFAULT_PREFERENCES[mode];
    const species = prefs.favoriteSpecies;
    const baits = prefs.favoriteBaits;
    const rigs = prefs.favoriteRigs;
    const now = Date.now();

    const lakeDefs = [
      {
        name: 'Demo Lake North',
        country: 'NL',
        latitude: 52.37,
        longitude: 4.89,
        address: 'Amsterdam area',
        isFavorite: true,
        spots: [
          { name: 'Dam wall', waterDepthM: 3.2, bottomType: 'Clay' },
          { name: 'Reed bed', waterDepthM: 1.8, bottomType: 'Silt' },
          { name: 'Far margin', waterDepthM: 2.5, bottomType: 'Gravel' },
        ],
      },
      {
        name: 'Demo Lake South',
        country: 'BE',
        latitude: 51.05,
        longitude: 3.72,
        address: 'Ghent area',
        isFavorite: false,
        spots: [
          { name: 'Point', waterDepthM: 4.0, bottomType: 'Sand' },
          { name: 'Bay', waterDepthM: 2.1, bottomType: 'Mud' },
        ],
      },
      {
        name: 'Demo Canal Stretch',
        country: 'NL',
        latitude: 51.92,
        longitude: 5.57,
        address: 'Riverland',
        isFavorite: true,
        spots: [
          { name: 'Bridge peg', waterDepthM: 2.8, bottomType: 'Gravel' },
          { name: 'Tree line', waterDepthM: 1.5, bottomType: 'Silt' },
        ],
      },
    ] as const;

    const createdLakes: Lake[] = [];
    for (const def of lakeDefs) {
      const lakeId = generateId();
      const createdAt = isoDaysAgo(now, 40 + createdLakes.length * 3);
      const spots = def.spots.map((s) => ({
        id: generateId(),
        name: s.name,
        waterDepthM: s.waterDepthM,
        bottomType: s.bottomType,
        isFavorite: false,
        visible: true as const,
      }));
      const lake: Lake = {
        id: lakeId,
        name: def.name,
        address: def.address,
        country: def.country,
        latitude: def.latitude,
        longitude: def.longitude,
        isFavorite: def.isFavorite,
        description: `Sample ${mode} venue for AI testing`,
        averageDepthM: 2.5,
        maximumDepthM: 5,
        surfaceAreaHa: 12 + createdLakes.length * 4,
        spots,
        photoIds: [],
        visible: true,
        createdAt,
        updatedAt: createdAt,
      };
      await this.lakes.put(lake);
      createdLakes.push(lake);
    }

    this.fishingMode.updateActivePreferences({ lastLakeId: createdLakes[0].id });

    const sessionPlans: Array<{
      lake: Lake;
      daysAgo: number;
      durationHours: number;
      rodCount: number;
      catchCount: number;
      name: string;
      status: FishingSession['status'];
    }> = [
      {
        lake: createdLakes[0],
        daysAgo: 28,
        durationHours: 48,
        rodCount: 3,
        catchCount: 4,
        name: 'Weekend North Bank',
        status: 'completed',
      },
      {
        lake: createdLakes[0],
        daysAgo: 18,
        durationHours: 12,
        rodCount: 2,
        catchCount: 2,
        name: 'Evening reeds',
        status: 'completed',
      },
      {
        lake: createdLakes[1],
        daysAgo: 12,
        durationHours: 36,
        rodCount: 4,
        catchCount: 5,
        name: 'South bay campaign',
        status: 'completed',
      },
      {
        lake: createdLakes[2],
        daysAgo: 6,
        durationHours: 8,
        rodCount: 2,
        catchCount: 1,
        name: 'Canal day trip',
        status: 'completed',
      },
      {
        lake: createdLakes[1],
        daysAgo: 2,
        durationHours: 24,
        rodCount: 3,
        catchCount: 3,
        name: 'Cold front session',
        status: 'completed',
      },
      {
        lake: createdLakes[0],
        daysAgo: 0,
        durationHours: 0,
        rodCount: 2,
        catchCount: 0,
        name: 'Planned demo trip',
        status: 'planned',
      },
    ];

    let catchTotal = 0;
    let biteTotal = 0;
    let spottedTotal = 0;
    let sessionTotal = 0;

    for (const plan of sessionPlans) {
      const sessionId = generateId();
      const startMs = now - plan.daysAgo * 24 * 60 * 60 * 1000;
      const startDate = new Date(startMs).toISOString();
      const endDate =
        plan.status === 'completed'
          ? new Date(startMs + plan.durationHours * 60 * 60 * 1000).toISOString()
          : undefined;

      const lakeSpots = plan.lake.spots;
      const sessionSpots: SessionSpot[] = lakeSpots.slice(0, Math.min(2, lakeSpots.length)).map(
        (spot) => ({
          id: generateId(),
          lakeSpotId: spot.id,
          name: spot.name,
          latitude: plan.lake.latitude,
          longitude: plan.lake.longitude,
          depth: spot.waterDepthM,
          bottomType: spot.bottomType,
          visible: true,
        }),
      );

      const rods: SessionRod[] = [];
      for (let i = 1; i <= plan.rodCount; i++) {
        const spot = sessionSpots[(i - 1) % Math.max(sessionSpots.length, 1)];
        rods.push({
          id: generateId(),
          sessionId,
          rodNumber: i,
          name: `Rod ${i}`,
          sessionSpotId: spot?.id,
          bait: baits[(i - 1) % baits.length],
          rig: rigs[(i - 1) % rigs.length],
          castAt: plan.status === 'planned' ? undefined : startDate,
          biteCount: 0,
          fishSpottedCount: 0,
          isActive: true,
          visible: true,
        });
      }

      const sessionCatches: Catch[] = [];
      for (let c = 0; c < plan.catchCount; c++) {
        const rod = rods[c % rods.length];
        const caughtAt = new Date(
          startMs + ((c + 1) / (plan.catchCount + 1)) * plan.durationHours * 60 * 60 * 1000,
        ).toISOString();
        const weightKg = round1(1.2 + ((c * 1.7 + plan.rodCount) % 9));
        const catchRecord: Catch = {
          id: generateId(),
          sessionId,
          rodId: rod.id,
          sessionSpotId: rod.sessionSpotId,
          species: species[c % species.length],
          caughtAt,
          weightKg,
          lengthCm: Math.round(35 + weightKg * 8),
          bait: rod.bait ?? baits[c % baits.length],
          rig: rod.rig ?? rigs[c % rigs.length],
          method: c % 2 === 0 ? 'Bottom' : 'Margin',
          released: c % 3 !== 0,
          isPersonalRecord: c === 0 && plan.catchCount >= 3,
          notes: c === 0 ? 'Demo catch for AI context' : undefined,
          latitude: plan.lake.latitude,
          longitude: plan.lake.longitude,
          waterDepthM: sessionSpots[0]?.depth,
          visible: true,
          createdAt: caughtAt,
          updatedAt: caughtAt,
        };
        sessionCatches.push(catchRecord);
        await this.catches.put(catchRecord);
        catchTotal += 1;

        await this.sessionEvents.put({
          id: generateId(),
          sessionId,
          type: 'catch',
          description: `${catchRecord.species} ${weightKg}kg`,
          rodId: rod.id,
          sessionSpotId: rod.sessionSpotId,
          occurredAt: caughtAt,
          visible: true,
        });
      }

      for (let b = 0; b < Math.min(plan.rodCount, 3); b++) {
        if (plan.status === 'planned') {
          break;
        }
        const rod = rods[b];
        const occurredAt = new Date(startMs + (b + 1) * 90 * 60 * 1000).toISOString();
        const bite: BiteEvent = {
          id: generateId(),
          sessionId,
          rodId: rod.id,
          sessionSpotId: rod.sessionSpotId,
          occurredAt,
          notes: 'Demo bite',
          visible: true,
        };
        await this.bites.put(bite);
        rod.biteCount += 1;
        biteTotal += 1;
      }

      if (plan.status !== 'planned' && rods.length > 0) {
        const rod = rods[0];
        const spottedAt = new Date(startMs + 3 * 60 * 60 * 1000).toISOString();
        const spotted: FishSpottedEvent = {
          id: generateId(),
          sessionId,
          rodId: rod.id,
          sessionSpotId: rod.sessionSpotId,
          latitude: plan.lake.latitude,
          longitude: plan.lake.longitude,
          spottedAt,
          notes: 'Shows near far margin',
          visible: true,
        };
        await this.fishSpotted.put(spotted);
        rod.fishSpottedCount += 1;
        spottedTotal += 1;
      }

      const totalWeight = sessionCatches.reduce((sum, c) => sum + (c.weightKg ?? 0), 0);
      const biggest = sessionCatches.reduce((max, c) => Math.max(max, c.weightKg ?? 0), 0);
      const session: FishingSession = {
        id: sessionId,
        name: plan.name,
        lakeId: plan.lake.id,
        status: plan.status,
        startDate:
          plan.status === 'planned'
            ? new Date(now + 3 * 24 * 60 * 60 * 1000).toISOString()
            : startDate,
        endDate,
        latitude: plan.lake.latitude,
        longitude: plan.lake.longitude,
        waterTemperatureC: 12 + (plan.daysAgo % 8),
        prebait: baits[0],
        notes: `Demo ${mode} session for assistant testing`,
        tags: ['demo', mode],
        sessionSpots,
        rods,
        photoIds: [],
        catchCount: sessionCatches.length,
        biggestFishKg: biggest > 0 ? biggest : undefined,
        totalCatchWeightKg: round1(totalWeight),
        visible: true,
        createdAt: startDate,
        updatedAt: endDate ?? startDate,
      };
      await this.sessions.put(session);
      sessionTotal += 1;

      await this.sessionEvents.put({
        id: generateId(),
        sessionId,
        type: 'session-start',
        description: `${session.name} started`,
        occurredAt: session.startDate,
        visible: true,
      });
      if (endDate) {
        await this.sessionEvents.put({
          id: generateId(),
          sessionId,
          type: 'session-end',
          description: `${session.name} completed`,
          occurredAt: endDate,
          visible: true,
        });
      }
    }

    return {
      lakes: createdLakes.length,
      sessions: sessionTotal,
      catches: catchTotal,
      bites: biteTotal,
      fishSpotted: spottedTotal,
    };
  }
}

function isoDaysAgo(nowMs: number, days: number): string {
  return new Date(nowMs - days * 24 * 60 * 60 * 1000).toISOString();
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}
