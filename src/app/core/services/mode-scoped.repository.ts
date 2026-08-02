import { inject } from '@angular/core';
import { FishingMode } from '../models';
import { isVisibleRecord, onlyVisibleRecords, WithVisibility } from '../utils';
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

  protected withMode<T extends { fishingMode?: FishingMode } & WithVisibility>(
    entity: T,
  ): T & { fishingMode: FishingMode; visible: boolean } {
    return {
      ...entity,
      fishingMode: entity.fishingMode ?? this.activeMode(),
      visible: entity.visible !== false,
    };
  }

  /**
   * Returns the entity only when it belongs to the active fishing mode
   * and is not soft-deleted (unless includeHidden).
   */
  protected forActiveMode<T extends { fishingMode?: FishingMode } & WithVisibility>(
    entity: T | undefined,
    options?: { includeHidden?: boolean },
  ): T | undefined {
    if (!entity) {
      return undefined;
    }
    const mode = this.tryActiveMode();
    if (!mode || !entity.fishingMode || entity.fishingMode !== mode) {
      return undefined;
    }
    if (!options?.includeHidden && !isVisibleRecord(entity)) {
      return undefined;
    }
    return entity;
  }

  protected onlyVisible<T extends WithVisibility>(rows: T[]): T[] {
    return onlyVisibleRecords(rows);
  }
}
