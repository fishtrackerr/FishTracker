import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { UserOption, UserOptionCategory } from '../models';

@Injectable({ providedIn: 'root' })
export class UserOptionRepository {
  watchByCategory(category: UserOptionCategory): Observable<UserOption[]> {
    return from(
      liveQuery(() => db.userOptions.where('category').equals(category).toArray()),
    );
  }

  watchAll(): Observable<UserOption[]> {
    return from(liveQuery(() => db.userOptions.toArray()));
  }

  async getByCategory(category: UserOptionCategory): Promise<UserOption[]> {
    return db.userOptions.where('category').equals(category).toArray();
  }

  async getAll(): Promise<UserOption[]> {
    return db.userOptions.toArray();
  }

  async put(option: UserOption): Promise<void> {
    await db.userOptions.put(option);
  }

  async delete(id: string): Promise<void> {
    await db.userOptions.delete(id);
  }

  async deleteByCategory(category: UserOptionCategory): Promise<void> {
    await db.userOptions.where('category').equals(category).delete();
  }

  async deleteNonDefaults(): Promise<void> {
    const all = await db.userOptions.toArray();
    const toDelete = all.filter((o) => !o.isDefault);
    await db.userOptions.bulkDelete(toDelete.map((o) => o.id));
  }

  async clear(): Promise<void> {
    await db.userOptions.clear();
  }
}
