import { Injectable, inject } from '@angular/core';
import { Catch, FishingSession, SessionSpot, UserOptionCategory } from '../models';
import { nowIso } from '../utils';
import de from '../../../assets/i18n/de.json';
import en from '../../../assets/i18n/en.json';
import nl from '../../../assets/i18n/nl.json';
import { CatchRepository } from './catch.repository';
import { FilterService } from './filter.service';
import { FishingModeService } from './fishing-mode.service';
import { I18nService } from './i18n.service';
import { LakeRepository } from './lake.repository';
import { SessionRepository } from './session.repository';
import { SettingsService } from './settings.service';

type Dictionary = Record<string, unknown>;

const TITLE_DICTS: Dictionary[] = [en as Dictionary, nl as Dictionary, de as Dictionary];

@Injectable({ providedIn: 'root' })
export class RelatedDataSyncService {
  private readonly sessions = inject(SessionRepository);
  private readonly catches = inject(CatchRepository);
  private readonly lakes = inject(LakeRepository);
  private readonly settings = inject(SettingsService);
  private readonly fishingMode = inject(FishingModeService);
  private readonly filters = inject(FilterService);
  private readonly i18n = inject(I18nService);

  async onLakeRenamed(lakeId: string, oldName: string, newName: string): Promise<void> {
    if (oldName === newName) {
      return;
    }
    const oldTitles = this.defaultSessionTitlesFor(oldName);
    const newTitle = this.i18n.t('sessions.defaultNameAtLake', { lake: newName });
    const sessions = await this.sessions.getAll();
    for (const session of sessions) {
      if (session.lakeId !== lakeId) {
        continue;
      }
      if (!oldTitles.has(session.name)) {
        continue;
      }
      await this.sessions.put({
        ...session,
        name: newTitle,
        updatedAt: nowIso(),
      });
    }
  }

  async onLakeSpotUpdated(
    lakeId: string,
    lakeSpotId: string,
    patch: Pick<SessionSpot, 'name' | 'latitude' | 'longitude' | 'depth' | 'bottomType' | 'notes'>,
  ): Promise<void> {
    const sessions = await this.sessions.getAll();
    for (const session of sessions) {
      if (session.lakeId && session.lakeId !== lakeId) {
        continue;
      }
      const spots = session.sessionSpots ?? [];
      let changed = false;
      const nextSpots = spots.map((spot) => {
        if (spot.lakeSpotId !== lakeSpotId) {
          return spot;
        }
        changed = true;
        return {
          ...spot,
          name: patch.name,
          latitude: patch.latitude,
          longitude: patch.longitude,
          depth: patch.depth,
          bottomType: patch.bottomType,
          notes: patch.notes,
        };
      });
      if (changed) {
        await this.sessions.put({
          ...session,
          sessionSpots: nextSpots,
          updatedAt: nowIso(),
        });
      }
    }
  }

  async onOptionRenamed(
    category: UserOptionCategory,
    oldValue: string,
    newValue: string,
  ): Promise<void> {
    if (oldValue === newValue) {
      return;
    }

    await this.rewriteCatches(category, oldValue, newValue);
    await this.rewriteSessions(category, oldValue, newValue);
    await this.rewriteLakeSpots(category, oldValue, newValue);
    this.rewriteSettingsFavorites(category, oldValue, newValue);
    this.filters.rewriteOptionValue(category, oldValue, newValue);
  }

  /** Titles that match auto-generated defaults across locales + legacy English. */
  defaultSessionTitlesFor(lakeName: string): Set<string> {
    const titles = new Set<string>();
    titles.add(`Session at ${lakeName}`);
    for (const dict of TITLE_DICTS) {
      const template = this.getByPath(dict, 'sessions.defaultNameAtLake');
      if (typeof template === 'string') {
        titles.add(template.replaceAll('{{lake}}', lakeName));
      }
    }
    return titles;
  }

  private async rewriteCatches(
    category: UserOptionCategory,
    oldValue: string,
    newValue: string,
  ): Promise<void> {
    const all = await this.catches.getAll();
    for (const record of all) {
      const next = this.patchCatch(record, category, oldValue, newValue);
      if (next) {
        await this.catches.put(next);
      }
    }
  }

  private patchCatch(
    record: Catch,
    category: UserOptionCategory,
    oldValue: string,
    newValue: string,
  ): Catch | null {
    let changed = false;
    const next: Catch = { ...record };

    const replaceField = (field: keyof Catch) => {
      if (next[field] === oldValue) {
        (next as unknown as Record<string, unknown>)[field] = newValue;
        changed = true;
      }
    };

    switch (category) {
      case 'species':
        replaceField('species');
        break;
      case 'bait':
        replaceField('bait');
        break;
      case 'baitFlavor':
        replaceField('baitFlavor');
        break;
      case 'rig':
        replaceField('rig');
        break;
      case 'hookSize':
        replaceField('hookSize');
        break;
      case 'lineType':
        replaceField('line');
        break;
      case 'method':
        replaceField('method');
        break;
      case 'weatherType':
        replaceField('weatherType');
        break;
      case 'tag':
        if (next.tags?.includes(oldValue)) {
          next.tags = next.tags.map((t) => (t === oldValue ? newValue : t));
          changed = true;
        }
        break;
      default:
        break;
    }

    if (!changed) {
      return null;
    }
    next.updatedAt = nowIso();
    return next;
  }

  private async rewriteSessions(
    category: UserOptionCategory,
    oldValue: string,
    newValue: string,
  ): Promise<void> {
    if (category !== 'bait' && category !== 'rig' && category !== 'tag') {
      return;
    }
    const sessions = await this.sessions.getAll();
    for (const session of sessions) {
      const next = this.patchSession(session, category, oldValue, newValue);
      if (next) {
        await this.sessions.put(next);
      }
    }
  }

  private patchSession(
    session: FishingSession,
    category: 'bait' | 'rig' | 'tag',
    oldValue: string,
    newValue: string,
  ): FishingSession | null {
    let changed = false;
    let rods = session.rods;
    let tags = session.tags;

    if (category === 'bait' || category === 'rig') {
      rods = (session.rods ?? []).map((rod) => {
        if (category === 'bait' && rod.bait === oldValue) {
          changed = true;
          return { ...rod, bait: newValue };
        }
        if (category === 'rig' && rod.rig === oldValue) {
          changed = true;
          return { ...rod, rig: newValue };
        }
        return rod;
      });
    }

    if (category === 'tag' && tags?.includes(oldValue)) {
      tags = tags.map((t) => (t === oldValue ? newValue : t));
      changed = true;
    }

    if (!changed) {
      return null;
    }
    return {
      ...session,
      rods,
      tags,
      updatedAt: nowIso(),
    };
  }

  private async rewriteLakeSpots(
    category: UserOptionCategory,
    oldValue: string,
    newValue: string,
  ): Promise<void> {
    if (category !== 'bait') {
      return;
    }
    const lakes = await this.lakes.getAll();
    for (const lake of lakes) {
      let changed = false;
      const spots = lake.spots.map((spot) => {
        if (spot.recommendedBait === oldValue) {
          changed = true;
          return { ...spot, recommendedBait: newValue };
        }
        return spot;
      });
      if (changed) {
        await this.lakes.put({
          ...lake,
          spots,
          updatedAt: nowIso(),
        });
      }
    }
  }

  private rewriteSettingsFavorites(
    category: UserOptionCategory,
    oldValue: string,
    newValue: string,
  ): void {
    const settings = this.settings.get();
    const replaceIn = (list: string[] | undefined): string[] | undefined => {
      if (!list?.includes(oldValue)) {
        return undefined;
      }
      return list.map((v) => (v === oldValue ? newValue : v));
    };

    const mode = this.fishingMode.getMode();
    const patch: Partial<typeof settings> = {};

    if (mode) {
      const modePrefs = { ...(settings.modePreferences ?? {}) };
      const prefs = modePrefs[mode];
      if (prefs) {
        const next = { ...prefs };
        if (category === 'species') {
          const favoriteSpecies = replaceIn(prefs.favoriteSpecies);
          if (favoriteSpecies) {
            next.favoriteSpecies = favoriteSpecies;
          }
        } else if (category === 'bait') {
          const favoriteBaits = replaceIn(prefs.favoriteBaits);
          if (favoriteBaits) {
            next.favoriteBaits = favoriteBaits;
          }
        } else if (category === 'rig') {
          const favoriteRigs = replaceIn(prefs.favoriteRigs);
          if (favoriteRigs) {
            next.favoriteRigs = favoriteRigs;
          }
        }
        modePrefs[mode] = next;
        patch.modePreferences = modePrefs;
      }
    }

    if (category === 'species') {
      const favoriteSpecies = replaceIn(settings.favoriteSpecies);
      if (favoriteSpecies) {
        patch.favoriteSpecies = favoriteSpecies;
      }
    } else if (category === 'bait') {
      const favoriteBaits = replaceIn(settings.favoriteBaits);
      if (favoriteBaits) {
        patch.favoriteBaits = favoriteBaits;
      }
    } else if (category === 'rig') {
      const favoriteRigs = replaceIn(settings.favoriteRigs);
      if (favoriteRigs) {
        patch.favoriteRigs = favoriteRigs;
      }
    }

    if (Object.keys(patch).length > 0) {
      this.settings.update(patch);
    }
  }

  private getByPath(obj: Dictionary, path: string): unknown {
    return path.split('.').reduce<unknown>((acc, segment) => {
      if (acc && typeof acc === 'object' && segment in (acc as Dictionary)) {
        return (acc as Dictionary)[segment];
      }
      return undefined;
    }, obj);
  }
}
