import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { AssistantPrompt } from '../models';
import { nowIso } from '../utils';
import { ModeScopedRepository, NewModeEntity } from './mode-scoped.repository';

@Injectable({ providedIn: 'root' })
export class AssistantPromptRepository extends ModeScopedRepository {
  watchAll(): Observable<AssistantPrompt[]> {
    return from(
      liveQuery(async () => {
        const mode = this.tryActiveMode();
        if (!mode) {
          return [];
        }
        const rows = await db.assistantPrompts.where('fishingMode').equals(mode).toArray();
        return this.onlyVisible(rows).sort((a, b) => a.title.localeCompare(b.title));
      }),
    );
  }

  async getAll(): Promise<AssistantPrompt[]> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return [];
    }
    return this.onlyVisible(
      (await db.assistantPrompts.where('fishingMode').equals(mode).toArray()).sort((a, b) =>
        a.title.localeCompare(b.title),
      ),
    );
  }

  async getAllAcrossModes(): Promise<AssistantPrompt[]> {
    return db.assistantPrompts.toArray();
  }

  async getById(id: string): Promise<AssistantPrompt | undefined> {
    return this.forActiveMode(await db.assistantPrompts.get(id));
  }

  async put(prompt: NewModeEntity<AssistantPrompt>): Promise<void> {
    await db.assistantPrompts.put(this.withMode(prompt));
  }

  async delete(id: string): Promise<void> {
    const row = await db.assistantPrompts.get(id);
    if (!row) {
      return;
    }
    await db.assistantPrompts.put({ ...row, visible: false, updatedAt: nowIso() });
  }

  async clearCurrentMode(): Promise<void> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return;
    }
    await db.assistantPrompts.where('fishingMode').equals(mode).delete();
  }

  async clear(): Promise<void> {
    await db.assistantPrompts.clear();
  }
}
