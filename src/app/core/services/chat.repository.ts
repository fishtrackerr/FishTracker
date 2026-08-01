import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { ChatMessage, ChatThread } from '../models';

@Injectable({ providedIn: 'root' })
export class ChatRepository {
  watchThreads(): Observable<ChatThread[]> {
    return from(liveQuery(() => db.chatThreads.orderBy('updatedAt').reverse().toArray()));
  }

  watchMessages(threadId: string): Observable<ChatMessage[]> {
    return from(
      liveQuery(() =>
        db.chatMessages.where('threadId').equals(threadId).sortBy('createdAt'),
      ),
    );
  }

  async getAllThreads(): Promise<ChatThread[]> {
    return db.chatThreads.orderBy('updatedAt').reverse().toArray();
  }

  async getAllMessages(): Promise<ChatMessage[]> {
    return db.chatMessages.toArray();
  }

  async getThread(id: string): Promise<ChatThread | undefined> {
    return db.chatThreads.get(id);
  }

  async getMessages(threadId: string): Promise<ChatMessage[]> {
    return db.chatMessages.where('threadId').equals(threadId).sortBy('createdAt');
  }

  async putThread(thread: ChatThread): Promise<void> {
    await db.chatThreads.put(thread);
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

  async clear(): Promise<void> {
    await db.transaction('rw', [db.chatThreads, db.chatMessages], async () => {
      await db.chatMessages.clear();
      await db.chatThreads.clear();
    });
  }
}
