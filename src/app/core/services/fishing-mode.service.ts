import { Injectable, computed, inject, signal } from '@angular/core';
import { FISHING_MODE_KEY } from '../constants/storage-keys';
import {
  DEFAULT_FISHING_MODE,
  FISHING_MODES,
  FishingMode,
  ModePreferences,
  defaultModePreferences,
  isFishingMode,
} from '../models/fishing-mode.model';
import { SettingsService } from './settings.service';

@Injectable({ providedIn: 'root' })
export class FishingModeService {
  private readonly settings = inject(SettingsService);

  private readonly modeSignal = signal<FishingMode | null>(this.readStoredMode());

  readonly selectedMode = this.modeSignal.asReadonly();
  readonly hasMode = computed(() => this.modeSignal() !== null);
  readonly modes = FISHING_MODES;

  constructor() {
    const mode = this.modeSignal();
    if (mode) {
      this.syncLegacyFavorites(mode, this.getPreferences(mode));
    }
  }

  getMode(): FishingMode | null {
    return this.modeSignal();
  }

  requireMode(): FishingMode {
    const mode = this.modeSignal();
    if (!mode) {
      throw new Error('Fishing mode has not been selected');
    }
    return mode;
  }

  setMode(mode: FishingMode): void {
    if (!isFishingMode(mode)) {
      throw new Error(`Invalid fishing mode: ${String(mode)}`);
    }
    this.modeSignal.set(mode);
    this.persist(mode);
    this.ensureModePreferences(mode);
    this.syncLegacyFavorites(mode, this.getPreferences(mode));
  }

  clearMode(): void {
    this.modeSignal.set(null);
    try {
      sessionStorage.removeItem(FISHING_MODE_KEY);
    } catch {
      /* ignore */
    }
  }

  getActivePreferences(): ModePreferences {
    const mode = this.requireMode();
    return this.getPreferences(mode);
  }

  getPreferences(mode: FishingMode): ModePreferences {
    const stored = this.settings.get().modePreferences?.[mode];
    const defaults = defaultModePreferences(mode);
    if (!stored) {
      return defaults;
    }
    return {
      ...defaults,
      ...stored,
      favoriteSpecies: stored.favoriteSpecies?.length
        ? [...stored.favoriteSpecies]
        : defaults.favoriteSpecies,
      favoriteBaits: stored.favoriteBaits?.length
        ? [...stored.favoriteBaits]
        : defaults.favoriteBaits,
      favoriteRigs: stored.favoriteRigs?.length
        ? [...stored.favoriteRigs]
        : defaults.favoriteRigs,
    };
  }

  updateActivePreferences(partial: Partial<ModePreferences>): void {
    const mode = this.requireMode();
    this.updatePreferences(mode, partial);
  }

  updatePreferences(mode: FishingMode, partial: Partial<ModePreferences>): void {
    const current = this.getPreferences(mode);
    const next: ModePreferences = {
      ...current,
      ...partial,
    };
    for (const key of Object.keys(partial) as (keyof ModePreferences)[]) {
      if (partial[key] === undefined) {
        delete (next as unknown as Record<string, unknown>)[key];
      }
    }
    const all = { ...(this.settings.get().modePreferences ?? {}) };
    all[mode] = next;
    this.settings.update({ modePreferences: all });
    this.syncLegacyFavorites(mode, next);
  }

  /** Migration target for existing unscoped data. */
  getMigrationMode(): FishingMode {
    return DEFAULT_FISHING_MODE;
  }

  private ensureModePreferences(mode: FishingMode): void {
    const prefs = this.settings.get().modePreferences?.[mode];
    if (prefs) {
      return;
    }
    this.updatePreferences(mode, defaultModePreferences(mode));
  }

  private syncLegacyFavorites(mode: FishingMode, prefs: ModePreferences): void {
    // Keep top-level favorites in sync for the active mode so older call sites stay correct.
    if (this.modeSignal() === mode) {
      this.settings.update({
        favoriteSpecies: prefs.favoriteSpecies,
        favoriteBaits: prefs.favoriteBaits,
        favoriteRigs: prefs.favoriteRigs,
        lastLakeId: prefs.lastLakeId,
        defaultLakeId: prefs.defaultLakeId,
        homepageImageId: prefs.homepageImageId,
      });
    }
  }

  private readStoredMode(): FishingMode | null {
    try {
      const raw = sessionStorage.getItem(FISHING_MODE_KEY);
      if (isFishingMode(raw)) {
        return raw;
      }
    } catch {
      /* ignore */
    }
    return null;
  }

  private persist(mode: FishingMode): void {
    try {
      sessionStorage.setItem(FISHING_MODE_KEY, mode);
    } catch {
      /* ignore */
    }
  }
}
