import { Injectable } from '@angular/core';
import { Catch, FishingSession, UserOptionCategory } from '../models';

export interface StatisticsFilter {
  dateFrom?: string;
  dateTo?: string;
  year?: number;
  month?: number;
  lakeId?: string;
  species?: string;
  bait?: string;
  rig?: string;
  sessionStatus?: FishingSession['status'];
  released?: boolean;
  blankSession?: boolean;
  hasImage?: boolean;
  personalRecord?: boolean;
}

export interface FilterPreset {
  id: string;
  name: string;
  filter: StatisticsFilter;
  createdAt: string;
}

const PRESETS_KEY = 'fish-tracker-filter-presets';

@Injectable({ providedIn: 'root' })
export class FilterService {
  private readonly activeFilter = { value: {} as StatisticsFilter };

  getActive(): StatisticsFilter {
    return { ...this.activeFilter.value };
  }

  setActive(filter: StatisticsFilter): void {
    this.activeFilter.value = { ...filter };
  }

  clearActive(): void {
    this.activeFilter.value = {};
  }

  countActive(filter: StatisticsFilter): number {
    return Object.values(filter).filter((v) => v !== undefined && v !== '').length;
  }

  applyToSessions(sessions: FishingSession[], filter: StatisticsFilter): FishingSession[] {
    return sessions.filter((s) => this.matchesSession(s, filter));
  }

  applyToCatches(catches: Catch[], filter: StatisticsFilter): Catch[] {
    return catches.filter((c) => this.matchesCatch(c, filter));
  }

  getPresets(): FilterPreset[] {
    try {
      const raw = localStorage.getItem(PRESETS_KEY);
      return raw ? (JSON.parse(raw) as FilterPreset[]) : [];
    } catch {
      return [];
    }
  }

  savePreset(name: string, filter: StatisticsFilter): FilterPreset {
    const presets = this.getPresets();
    const preset: FilterPreset = {
      id: crypto.randomUUID(),
      name,
      filter: { ...filter },
      createdAt: new Date().toISOString(),
    };
    presets.push(preset);
    localStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
    return preset;
  }

  deletePreset(id: string): void {
    const presets = this.getPresets().filter((p) => p.id !== id);
    localStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
  }

  /** Rewrite free-text option values in active filter and saved presets. */
  rewriteOptionValue(
    category: UserOptionCategory,
    oldValue: string,
    newValue: string,
  ): void {
    const field = this.filterFieldFor(category);
    if (!field) {
      return;
    }

    const active = this.activeFilter.value;
    if (active[field] === oldValue) {
      this.activeFilter.value = { ...active, [field]: newValue };
    }

    const presets = this.getPresets();
    let changed = false;
    const next = presets.map((preset) => {
      if (preset.filter[field] !== oldValue) {
        return preset;
      }
      changed = true;
      return {
        ...preset,
        filter: { ...preset.filter, [field]: newValue },
      };
    });
    if (changed) {
      localStorage.setItem(PRESETS_KEY, JSON.stringify(next));
    }
  }

  private filterFieldFor(
    category: UserOptionCategory,
  ): 'species' | 'bait' | 'rig' | undefined {
    if (category === 'species' || category === 'bait' || category === 'rig') {
      return category;
    }
    return undefined;
  }

  private matchesSession(s: FishingSession, f: StatisticsFilter): boolean {
    const start = new Date(s.startDate);
    if (f.dateFrom && start < new Date(f.dateFrom)) return false;
    if (f.dateTo && start > new Date(f.dateTo)) return false;
    if (f.year != null && start.getFullYear() !== f.year) return false;
    if (f.month != null && start.getMonth() + 1 !== f.month) return false;
    if (f.lakeId && s.lakeId !== f.lakeId) return false;
    if (f.sessionStatus && s.status !== f.sessionStatus) return false;
    if (f.blankSession != null && (s.catchCount === 0) !== f.blankSession) return false;
    return true;
  }

  private matchesCatch(c: Catch, f: StatisticsFilter): boolean {
    const caught = new Date(c.caughtAt);
    if (f.dateFrom && caught < new Date(f.dateFrom)) return false;
    if (f.dateTo && caught > new Date(f.dateTo)) return false;
    if (f.year != null && caught.getFullYear() !== f.year) return false;
    if (f.month != null && caught.getMonth() + 1 !== f.month) return false;
    if (f.species && c.species !== f.species) return false;
    if (f.bait && c.bait !== f.bait) return false;
    if (f.rig && c.rig !== f.rig) return false;
    if (f.released != null && c.released !== f.released) return false;
    if (f.hasImage != null && !!c.photoId !== f.hasImage) return false;
    if (f.personalRecord != null && c.isPersonalRecord !== f.personalRecord) return false;
    return true;
  }
}
