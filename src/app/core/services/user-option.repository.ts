import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { UserOption, UserOptionCategory } from '../models';
import { nowIso } from '../utils';
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
        const rows = await db.userOptions
          .where('[fishingMode+category]')
          .equals([mode, category])
          .toArray();
        return this.onlyVisible(rows);
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
        return this.onlyVisible(await db.userOptions.where('fishingMode').equals(mode).toArray());
      }),
    );
  }

  async getByCategory(category: UserOptionCategory): Promise<UserOption[]> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return [];
    }
    return this.onlyVisible(
      await db.userOptions.where('[fishingMode+category]').equals([mode, category]).toArray(),
    );
  }

  async getAll(): Promise<UserOption[]> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return [];
    }
    return this.onlyVisible(await db.userOptions.where('fishingMode').equals(mode).toArray());
  }

  async getAllAcrossModes(): Promise<UserOption[]> {
    return db.userOptions.toArray();
  }

  async put(option: NewModeEntity<UserOption>): Promise<void> {
    await db.userOptions.put(this.withMode(option));
  }

  async delete(id: string): Promise<void> {
    const row = await db.userOptions.get(id);
    if (!row) {
      return;
    }
    await db.userOptions.put({ ...row, visible: false, updatedAt: nowIso() });
  }

  /** Hard-delete category rows (used when regenerating defaults). */
  async deleteByCategory(category: UserOptionCategory): Promise<void> {
    const mode = this.activeMode();
    await db.userOptions.where('[fishingMode+category]').equals([mode, category]).delete();
  }

  async deleteNonDefaults(): Promise<void> {
    const all = await this.getAll();
    const now = nowIso();
    await Promise.all(
      all
        .filter((o) => !o.isDefault)
        .map((o) => db.userOptions.put({ ...o, visible: false, updatedAt: now })),
    );
  }

  async clearCurrentMode(): Promise<void> {
    const mode = this.activeMode();
    await db.userOptions.where('fishingMode').equals(mode).delete();
  }

  async clear(): Promise<void> {
    await db.userOptions.clear();
  }
}
