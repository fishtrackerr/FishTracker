import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { UserOption, UserOptionCategory } from '../models';
import { ModeScopedRepository, NewModeEntity } from './mode-scoped.repository';

@Injectable({ providedIn: 'root' })
export class UserOptionRepository extends ModeScopedRepository {
  watchByCategory(category: UserOptionCategory): Observable<UserOption[]> {
    return from(
      liveQuery(async () => {
        const mode = this.tryActiveMode();
        if (!mode) {
          return [];
        }
        return db.userOptions.where('[fishingMode+category]').equals([mode, category]).toArray();
      }),
    );
  }

  watchAll(): Observable<UserOption[]> {
    return from(
      liveQuery(async () => {
        const mode = this.tryActiveMode();
        if (!mode) {
          return [];
        }
        return db.userOptions.where('fishingMode').equals(mode).toArray();
      }),
    );
  }

  async getByCategory(category: UserOptionCategory): Promise<UserOption[]> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return [];
    }
    return db.userOptions.where('[fishingMode+category]').equals([mode, category]).toArray();
  }

  async getAll(): Promise<UserOption[]> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return [];
    }
    return db.userOptions.where('fishingMode').equals(mode).toArray();
  }

  async getAllAcrossModes(): Promise<UserOption[]> {
    return db.userOptions.toArray();
  }

  async put(option: NewModeEntity<UserOption>): Promise<void> {
    await db.userOptions.put(this.withMode(option));
  }

  async delete(id: string): Promise<void> {
    await db.userOptions.delete(id);
  }

  async deleteByCategory(category: UserOptionCategory): Promise<void> {
    const mode = this.activeMode();
    await db.userOptions.where('[fishingMode+category]').equals([mode, category]).delete();
  }

  async deleteNonDefaults(): Promise<void> {
    const all = await this.getAll();
    const toDelete = all.filter((o) => !o.isDefault);
    await db.userOptions.bulkDelete(toDelete.map((o) => o.id));
  }

  async clearCurrentMode(): Promise<void> {
    const mode = this.activeMode();
    await db.userOptions.where('fishingMode').equals(mode).delete();
  }

  async clear(): Promise<void> {
    await db.userOptions.clear();
  }
}
