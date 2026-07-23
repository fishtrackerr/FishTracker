import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { Lake } from '../models';

@Injectable({ providedIn: 'root' })
export class LakeRepository {
  watchAll(): Observable<Lake[]> {
    return from(liveQuery(() => db.lakes.orderBy('name').toArray()));
  }

  watchById(id: string): Observable<Lake | undefined> {
    return from(liveQuery(() => db.lakes.get(id)));
  }

  async getAll(): Promise<Lake[]> {
    return db.lakes.orderBy('name').toArray();
  }

  async getById(id: string): Promise<Lake | undefined> {
    return db.lakes.get(id);
  }

  async put(lake: Lake): Promise<void> {
    await db.lakes.put(lake);
  }

  async delete(id: string): Promise<void> {
    await db.lakes.delete(id);
  }

  async clear(): Promise<void> {
    await db.lakes.clear();
  }
}
