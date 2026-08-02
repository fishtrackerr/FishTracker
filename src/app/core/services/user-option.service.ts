import { Injectable } from '@angular/core';
import {
  USER_OPTION_CATEGORIES,
  UserOption,
  UserOptionCategory,
  defaultValuesForCategory,
} from '../models';
import { generateId, nowIso } from '../utils';
import { FishingModeService } from './fishing-mode.service';
import { RelatedDataSyncService } from './related-data-sync.service';
import { UserOptionRepository } from './user-option.repository';

@Injectable({ providedIn: 'root' })
export class UserOptionService {
  constructor(
    private readonly repo: UserOptionRepository,
    private readonly sync: RelatedDataSyncService,
    private readonly fishingMode: FishingModeService,
  ) {}

  watchByCategory(category: UserOptionCategory) {
    return this.repo.watchByCategory(category);
  }

  async getSortedOptions(category: UserOptionCategory): Promise<UserOption[]> {
    const options = await this.repo.getByCategory(category);
    return options.sort((a, b) => {
      if (a.isFavorite !== b.isFavorite) {
        return a.isFavorite ? -1 : 1;
      }
      if (a.isDefault !== b.isDefault) {
        return a.isDefault ? -1 : 1;
      }
      return a.value.localeCompare(b.value);
    });
  }

  normalize(value: string): string {
    return value.trim();
  }

  async findByValue(category: UserOptionCategory, value: string): Promise<UserOption | undefined> {
    const normalized = this.normalize(value).toLowerCase();
    const options = await this.repo.getByCategory(category);
    return options.find((o) => o.value.toLowerCase() === normalized);
  }

  async saveOption(
    category: UserOptionCategory,
    value: string,
    isFavorite = false,
  ): Promise<UserOption> {
    const trimmed = this.normalize(value);
    if (!trimmed) {
      throw new Error('Option value cannot be empty');
    }
    const existing = await this.findByValue(category, trimmed);
    if (existing) {
      return existing;
    }
    const now = nowIso();
    const option: UserOption = {
      id: generateId(),
      fishingMode: this.fishingMode.requireMode(),
      category,
      value: trimmed,
      isFavorite,
      isDefault: false,
      createdAt: now,
      updatedAt: now,
    };
    await this.repo.put(option);
    return option;
  }

  async toggleFavorite(id: string): Promise<void> {
    const all = await this.repo.getAll();
    const option = all.find((o) => o.id === id);
    if (!option) {
      return;
    }
    await this.repo.put({
      ...option,
      isFavorite: !option.isFavorite,
      updatedAt: nowIso(),
    });
  }

  /**
   * Rename an option and rewrite matching free-text usages (catches, rods, filters, settings).
   * If the target value already exists in the same category, merges into that option.
   */
  async rename(id: string, newValue: string): Promise<UserOption | undefined> {
    const all = await this.repo.getAll();
    const option = all.find((o) => o.id === id);
    if (!option) {
      return undefined;
    }

    const trimmed = this.normalize(newValue);
    if (!trimmed) {
      throw new Error('Option value cannot be empty');
    }

    const oldValue = option.value;
    if (oldValue === trimmed) {
      return option;
    }

    const conflict = await this.findByValue(option.category, trimmed);
    let survivor: UserOption;

    if (conflict && conflict.id !== option.id) {
      if (option.isFavorite && !conflict.isFavorite) {
        survivor = { ...conflict, isFavorite: true, updatedAt: nowIso() };
        await this.repo.put(survivor);
      } else {
        survivor = conflict;
      }
      await this.repo.delete(option.id);
    } else {
      survivor = { ...option, value: trimmed, updatedAt: nowIso() };
      await this.repo.put(survivor);
    }

    await this.sync.onOptionRenamed(option.category, oldValue, survivor.value);
    return survivor;
  }

  async deleteOption(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async resetCategory(category: UserOptionCategory, keepFavorites = true): Promise<void> {
    const options = await this.repo.getByCategory(category);
    const defaults = this.getDefaultValues(category);
    for (const option of options) {
      if (option.isDefault) {
        continue;
      }
      if (keepFavorites && option.isFavorite) {
        continue;
      }
      await this.repo.delete(option.id);
    }
    for (const value of defaults) {
      const existing = await this.findByValue(category, value);
      if (!existing) {
        await this.saveDefault(category, value);
      }
    }
  }

  async resetAllCustom(keepFavorites = true): Promise<void> {
    for (const category of USER_OPTION_CATEGORIES) {
      await this.resetCategory(category, keepFavorites);
    }
  }

  async restoreDefaults(category?: UserOptionCategory): Promise<void> {
    if (category) {
      await this.repo.deleteByCategory(category);
      for (const value of this.getDefaultValues(category)) {
        await this.saveDefault(category, value);
      }
      return;
    }
    await this.repo.clearCurrentMode();
    for (const cat of USER_OPTION_CATEGORIES) {
      for (const value of this.getDefaultValues(cat)) {
        await this.saveDefault(cat, value);
      }
    }
  }

  /**
   * Seeds missing defaults for every category in the current mode.
   * Safe to call repeatedly — existing values are left alone.
   */
  async ensureDefaultsForCurrentMode(): Promise<void> {
    for (const cat of USER_OPTION_CATEGORIES) {
      for (const value of this.getDefaultValues(cat)) {
        const existing = await this.findByValue(cat, value);
        if (!existing) {
          await this.saveDefault(cat, value);
        }
      }
    }
  }

  private getDefaultValues(category: UserOptionCategory): string[] {
    return defaultValuesForCategory(category, this.fishingMode.requireMode());
  }

  private async saveDefault(category: UserOptionCategory, value: string): Promise<void> {
    const now = nowIso();
    await this.repo.put({
      id: generateId(),
      fishingMode: this.fishingMode.requireMode(),
      category,
      value,
      isFavorite: false,
      isDefault: true,
      createdAt: now,
      updatedAt: now,
    });
  }
}
