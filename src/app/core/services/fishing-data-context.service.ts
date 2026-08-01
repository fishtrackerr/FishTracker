import { Injectable } from '@angular/core';
import { Catch, FishingSession, Lake } from '../models';
import { CatchRepository } from './catch.repository';
import { LakeRepository } from './lake.repository';
import { SessionRepository } from './session.repository';
import { StatisticsService } from './statistics.service';

export interface FishingDataContext {
  summary: {
    totalSessions: number;
    totalCatches: number;
    totalHours: number;
    favoriteLake?: string;
    bestBait?: string;
    bestRig?: string;
    bestMonth?: string;
    bestTimeOfDay?: string;
    biggestFishKg: number;
    catchRate: number;
  };
  lakes: Array<{
    name: string;
    sessions: number;
    catches: number;
    spotCount: number;
  }>;
  species: Array<{ species: string; count: number; avgWeightKg: number; bestWeightKg: number }>;
  catchHours: Array<{ hour: number; count: number }>;
  baits: Array<{ bait: string; count: number }>;
  rigs: Array<{ rig: string; count: number }>;
  recentSessions: Array<{
    name: string;
    lake?: string;
    status: string;
    startDate: string;
    catchCount: number;
  }>;
}

@Injectable({ providedIn: 'root' })
export class FishingDataContextService {
  constructor(
    private readonly sessionRepo: SessionRepository,
    private readonly catchRepo: CatchRepository,
    private readonly lakeRepo: LakeRepository,
    private readonly statsService: StatisticsService,
  ) {}

  async build(): Promise<FishingDataContext> {
    const sessions = await this.sessionRepo.getAll();
    const catches = await this.catchRepo.getAll();
    const lakes = await this.lakeRepo.getAll();
    return this.buildFrom(sessions, catches, lakes);
  }

  buildFrom(sessions: FishingSession[], catches: Catch[], lakes: Lake[]): FishingDataContext {
    const stats = this.statsService.compute(sessions, catches, lakes);
    const lakeById = new Map(lakes.map((l) => [l.id, l]));

    const hourCounts = new Map<number, number>();
    const baitCounts = new Map<string, number>();
    const rigCounts = new Map<string, number>();
    for (const c of catches) {
      const hour = new Date(c.caughtAt).getHours();
      hourCounts.set(hour, (hourCounts.get(hour) ?? 0) + 1);
      if (c.bait) {
        baitCounts.set(c.bait, (baitCounts.get(c.bait) ?? 0) + 1);
      }
      if (c.rig) {
        rigCounts.set(c.rig, (rigCounts.get(c.rig) ?? 0) + 1);
      }
    }

    const speciesBest = new Map<string, number>();
    for (const pr of stats.personalRecords) {
      speciesBest.set(pr.species, pr.weightKg);
    }

    const recentSessions = [...sessions]
      .sort((a, b) => b.startDate.localeCompare(a.startDate))
      .slice(0, 15)
      .map((s) => ({
        name: s.name,
        lake: s.lakeId ? lakeById.get(s.lakeId)?.name : undefined,
        status: s.status,
        startDate: s.startDate,
        catchCount: s.catchCount,
      }));

    return {
      summary: {
        totalSessions: stats.totalSessions,
        totalCatches: stats.totalCatches,
        totalHours: Math.round(stats.totalHours * 10) / 10,
        favoriteLake: stats.favoriteLake,
        bestBait: stats.bestBait,
        bestRig: stats.bestRig,
        bestMonth: stats.bestMonth,
        bestTimeOfDay: stats.bestTimeOfDay,
        biggestFishKg: stats.biggestFishKg,
        catchRate: Math.round(stats.catchRate * 100) / 100,
      },
      lakes: (stats.lakeBreakdown ?? []).map((l) => {
        const lake = lakes.find((x) => x.name === l.lake);
        return {
          name: l.lake,
          sessions: l.sessions,
          catches: l.catches,
          spotCount: lake?.spots.length ?? 0,
        };
      }),
      species: (stats.speciesBreakdown ?? []).map((s) => ({
        species: s.species,
        count: s.count,
        avgWeightKg: Math.round(s.avgWeight * 100) / 100,
        bestWeightKg: speciesBest.get(s.species) ?? 0,
      })),
      catchHours: [...hourCounts.entries()]
        .map(([hour, count]) => ({ hour, count }))
        .sort((a, b) => b.count - a.count),
      baits: [...baitCounts.entries()]
        .map(([bait, count]) => ({ bait, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
      rigs: [...rigCounts.entries()]
        .map(([rig, count]) => ({ rig, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
      recentSessions,
    };
  }

  toPromptText(context: FishingDataContext): string {
    return JSON.stringify(context, null, 2);
  }
}
