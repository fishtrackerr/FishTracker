import { Injectable } from '@angular/core';
import { Catch, FishingSession, Lake } from '../models';
import { CatchRepository } from './catch.repository';
import { LakeRepository } from './lake.repository';
import { SessionRepository } from './session.repository';

export interface DashboardStats {
  totalSessions: number;
  totalCatches: number;
  totalHours: number;
  biggestFishKg: number;
  longestFishCm: number;
  favoriteLake?: string;
  favoriteSpot?: string;
  bestBait?: string;
  bestRig?: string;
  bestMonth?: string;
  bestTimeOfDay?: string;
  blankSessions: number;
  averageWeightKg: number;
  averageLengthCm: number;
  catchRate: number;
  personalRecords: { species: string; weightKg: number; lengthCm: number }[];
  activeSessions?: number;
  plannedSessions?: number;
  completedSessions?: number;
  totalCatchWeightKg?: number;
  releasedCount?: number;
  retainedCount?: number;
  averageSessionDurationHours?: number;
  catchesPerSession?: number;
  speciesBreakdown?: { species: string; count: number; avgWeight: number }[];
  lakeBreakdown?: { lake: string; sessions: number; catches: number }[];
}

@Injectable({ providedIn: 'root' })
export class StatisticsService {
  constructor(
    private readonly sessionRepo: SessionRepository,
    private readonly catchRepo: CatchRepository,
    private readonly lakeRepo: LakeRepository,
  ) {}

  async getDashboardStats(): Promise<DashboardStats> {
    const sessions = await this.sessionRepo.getAll();
    const catches = await this.catchRepo.getAll();
    const lakes = await this.lakeRepo.getAll();
    return this.compute(sessions, catches, lakes);
  }

  compute(
    sessions: FishingSession[],
    catches: Catch[],
    lakes: Lake[],
  ): DashboardStats {
    const completed = sessions.filter((s) => s.status === 'completed');
    const totalHours = completed.reduce((sum, s) => {
      const end = s.endDate ? new Date(s.endDate).getTime() : Date.now();
      return sum + (end - new Date(s.startDate).getTime()) / 3600000;
    }, 0);

    const weights = catches.filter((c) => c.weightKg).map((c) => c.weightKg!);
    const lengths = catches.filter((c) => c.lengthCm).map((c) => c.lengthCm!);

    const lakeCounts = new Map<string, number>();
    sessions.forEach((s) => {
      if (s.lakeId) {
        lakeCounts.set(s.lakeId, (lakeCounts.get(s.lakeId) ?? 0) + 1);
      }
    });
    const favoriteLakeId = [...lakeCounts.entries()].sort(
      (a, b) => b[1] - a[1],
    )[0]?.[0];
    const favoriteLake = lakes.find((l) => l.id === favoriteLakeId)?.name;

    const spotCounts = new Map<string, number>();
    catches.forEach((c) => {
      if (c.spotId) {
        spotCounts.set(c.spotId, (spotCounts.get(c.spotId) ?? 0) + 1);
      }
    });
    const favoriteSpotId = [...spotCounts.entries()].sort(
      (a, b) => b[1] - a[1],
    )[0]?.[0];
    let favoriteSpot: string | undefined;
    if (favoriteSpotId) {
      for (const lake of lakes) {
        const spot = lake.spots.find((s) => s.id === favoriteSpotId);
        if (spot) {
          favoriteSpot = spot.name;
          break;
        }
      }
    }

    const baitCounts = this.countField(catches, 'bait');
    const rigCounts = this.countField(catches, 'rig');
    const monthCounts = new Map<string, number>();
    const hourCounts = new Map<number, number>();
    catches.forEach((c) => {
      const d = new Date(c.caughtAt);
      const month = d.toLocaleString('default', { month: 'long' });
      monthCounts.set(month, (monthCounts.get(month) ?? 0) + 1);
      const hour = d.getHours();
      hourCounts.set(hour, (hourCounts.get(hour) ?? 0) + 1);
    });

    const bestMonth = [...monthCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
    const bestHour = [...hourCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
    const bestTimeOfDay = bestHour != null ? `${bestHour}:00` : undefined;

    const blankSessions = completed.filter((s) => s.catchCount === 0).length;
    const activeSessions = sessions.filter((s) => s.status === 'active').length;
    const plannedSessions = sessions.filter((s) => s.status === 'planned').length;
    const releasedCount = catches.filter((c) => c.released).length;
    const totalCatchWeightKg = weights.reduce((a, b) => a + b, 0);

    const speciesCounts = new Map<string, { count: number; totalWeight: number }>();
    catches.forEach((c) => {
      const entry = speciesCounts.get(c.species) ?? { count: 0, totalWeight: 0 };
      entry.count++;
      entry.totalWeight += c.weightKg ?? 0;
      speciesCounts.set(c.species, entry);
    });

    const lakeBreakdown = lakes.map((lake) => ({
      lake: lake.name,
      sessions: sessions.filter((s) => s.lakeId === lake.id).length,
      catches: catches.filter((c) => {
        const session = sessions.find((s) => s.id === c.sessionId);
        return session?.lakeId === lake.id;
      }).length,
    })).filter((l) => l.sessions > 0 || l.catches > 0);

    const speciesMap = new Map<string, { weightKg: number; lengthCm: number }>();
    catches.forEach((c) => {
      const existing = speciesMap.get(c.species) ?? { weightKg: 0, lengthCm: 0 };
      speciesMap.set(c.species, {
        weightKg: Math.max(existing.weightKg, c.weightKg ?? 0),
        lengthCm: Math.max(existing.lengthCm, c.lengthCm ?? 0),
      });
    });

    return {
      totalSessions: sessions.length,
      totalCatches: catches.length,
      totalHours,
      biggestFishKg: weights.length ? Math.max(...weights) : 0,
      longestFishCm: lengths.length ? Math.max(...lengths) : 0,
      favoriteLake,
      favoriteSpot,
      bestBait: baitCounts[0]?.[0],
      bestRig: rigCounts[0]?.[0],
      bestMonth,
      bestTimeOfDay,
      blankSessions,
      averageWeightKg: weights.length
        ? weights.reduce((a, b) => a + b, 0) / weights.length
        : 0,
      averageLengthCm: lengths.length
        ? lengths.reduce((a, b) => a + b, 0) / lengths.length
        : 0,
      catchRate: totalHours > 0 ? catches.length / totalHours : 0,
      personalRecords: [...speciesMap.entries()].map(([species, rec]) => ({
        species,
        ...rec,
      })),
      activeSessions,
      plannedSessions,
      completedSessions: completed.length,
      totalCatchWeightKg,
      releasedCount,
      retainedCount: catches.length - releasedCount,
      averageSessionDurationHours: completed.length ? totalHours / completed.length : 0,
      catchesPerSession: sessions.length ? catches.length / sessions.length : 0,
      speciesBreakdown: [...speciesCounts.entries()].map(([species, data]) => ({
        species,
        count: data.count,
        avgWeight: data.count ? data.totalWeight / data.count : 0,
      })),
      lakeBreakdown,
    };
  }

  getCorrelationData(catches: Catch[], field: 'temperatureC' | 'airPressureHpa' | 'moonPhase') {
    const buckets = new Map<string, { catches: number; sessions: number }>();
    catches.forEach((c) => {
      let key = 'Unknown';
      if (field === 'temperatureC' && c.weather?.temperatureC != null) {
        const temp = Math.round(c.weather.temperatureC / 5) * 5;
        key = `${temp}°C`;
      } else if (field === 'airPressureHpa' && c.weather?.airPressureHpa != null) {
        const pressure = Math.round(c.weather.airPressureHpa / 10) * 10;
        key = `${pressure} hPa`;
      } else if (field === 'moonPhase' && c.weather?.moonPhase) {
        key = c.weather.moonPhase;
      }
      const bucket = buckets.get(key) ?? { catches: 0, sessions: 0 };
      bucket.catches++;
      buckets.set(key, bucket);
    });
    return [...buckets.entries()]
      .map(([label, data]) => ({ label, count: data.catches }))
      .sort((a, b) => b.count - a.count);
  }

  private countField(
    catches: Catch[],
    field: 'bait' | 'rig',
  ): [string, number][] {
    const counts = new Map<string, number>();
    catches.forEach((c) => {
      const val = c[field];
      if (val) {
        counts.set(val, (counts.get(val) ?? 0) + 1);
      }
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }
}
