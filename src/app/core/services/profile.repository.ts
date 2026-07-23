import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { DEFAULT_PROFILE, UserProfile } from '../models';
import { nowIso } from '../utils';

@Injectable({ providedIn: 'root' })
export class ProfileRepository {
  watch(): Observable<UserProfile> {
    return from(
      liveQuery(async () => {
        const profile = await db.profiles.get('default');
        return profile ?? { ...DEFAULT_PROFILE, updatedAt: nowIso() };
      }),
    );
  }

  async get(): Promise<UserProfile> {
    const profile = await db.profiles.get('default');
    if (profile) return profile;
    const created = { ...DEFAULT_PROFILE, updatedAt: nowIso() };
    await db.profiles.put(created);
    return created;
  }

  async put(profile: UserProfile): Promise<void> {
    await db.profiles.put(profile);
  }
}
