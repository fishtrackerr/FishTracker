import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { ChatMessage, ChatThread } from '../models';
import { ModeScopedRepository, NewModeEntity } from './mode-scoped.repository';

@Injectable({ providedIn: 'root' })
export class ChatRepository extends ModeScopedRepository {
  watchThreads(): Observable<ChatThread[]> {
    return from(
      liveQuery(async () => {
        const mode = this.tryActiveMode();
        if (!mode) {
          return [];
        }
        const rows = await db.chatThreads.where('fishingMode').equals(mode).toArray();
        return rows.sort(
          (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
      }),
    );
  }

  watchMessages(threadId: string): Observable<ChatMessage[]> {
    return from(
      liveQuery(() =>
        db.chatMessages.where('threadId').equals(threadId).sortBy('createdAt'),
      ),
    );
  }

  async getAllThreads(): Promise<ChatThread[]> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return [];
    }
    const rows = await db.chatThreads.where('fishingMode').equals(mode).toArray();
    return rows.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  }

  async getAllThreadsAcrossModes(): Promise<ChatThread[]> {
    return db.chatThreads.orderBy('updatedAt').reverse().toArray();
  }

  async getAllMessages(): Promise<ChatMessage[]> {
    const threads = await this.getAllThreads();
    const threadIds = new Set(threads.map((t) => t.id));
    const all = await db.chatMessages.toArray();
    return all.filter((m) => threadIds.has(m.threadId));
  }

  async getAllMessagesAcrossModes(): Promise<ChatMessage[]> {
    return db.chatMessages.toArray();
  }

  async getThread(id: string): Promise<ChatThread | undefined> {
    return this.forActiveMode(await db.chatThreads.get(id));
  }

  async getMessages(threadId: string): Promise<ChatMessage[]> {
    return db.chatMessages.where('threadId').equals(threadId).sortBy('createdAt');
  }

  async getLatestMessage(threadId: string): Promise<ChatMessage | undefined> {
    const messages = await db.chatMessages
      .where('threadId')
      .equals(threadId)
      .sortBy('createdAt');
    return messages.at(-1);
  }

  async putThread(thread: NewModeEntity<ChatThread>): Promise<void> {
    await db.chatThreads.put(this.withMode(thread));
  }

  async putMessage(message: ChatMessage): Promise<void> {
    await db.chatMessages.put(message);
  }

  async deleteThread(id: string): Promise<void> {
    await db.transaction('rw', [db.chatThreads, db.chatMessages], async () => {
      await db.chatMessages.where('threadId').equals(id).delete();
      await db.chatThreads.delete(id);
    });
  }

  async clearCurrentMode(): Promise<void> {
    const mode = this.activeMode();
    const threads = await db.chatThreads.where('fishingMode').equals(mode).toArray();
    const ids = threads.map((t) => t.id);
    await db.transaction('rw', [db.chatThreads, db.chatMessages], async () => {
      for (const id of ids) {
        await db.chatMessages.where('threadId').equals(id).delete();
      }
      await db.chatThreads.where('fishingMode').equals(mode).delete();
    });
  }

  async clear(): Promise<void> {
    await db.transaction('rw', [db.chatThreads, db.chatMessages], async () => {
      await db.chatMessages.clear();
      await db.chatThreads.clear();
    });
  }
}
