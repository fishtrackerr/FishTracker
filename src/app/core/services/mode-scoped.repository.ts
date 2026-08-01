import { inject } from '@angular/core';
import { FishingMode } from '../models';
import { FishingModeService } from './fishing-mode.service';

/** Entity that may omit fishingMode; repositories stamp the active mode on write. */
export type NewModeEntity<T extends { fishingMode?: FishingMode }> = T;

/** Shared helpers for mode-scoped Dexie repositories. */
export abstract class ModeScopedRepository {
  protected readonly fishingMode = inject(FishingModeService);

  protected activeMode(): FishingMode {
    return this.fishingMode.requireMode();
  }

  /** Active mode when selected; null before mode-select / after full reset. */
  protected tryActiveMode(): FishingMode | null {
    return this.fishingMode.getMode();
  }

  protected withMode<T extends { fishingMode?: FishingMode }>(
    entity: T,
  ): T & { fishingMode: FishingMode } {
    return {
      ...entity,
      fishingMode: entity.fishingMode ?? this.activeMode(),
    };
  }

  /** Returns the entity only when it belongs to the active fishing mode. */
  protected forActiveMode<T extends { fishingMode?: FishingMode }>(
    entity: T | undefined,
  ): T | undefined {
    if (!entity) {
      return undefined;
    }
    const mode = this.tryActiveMode();
    if (!mode || !entity.fishingMode || entity.fishingMode !== mode) {
      return undefined;
    }
    return entity;
  }
}
