import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { ProfileDocument } from '../models';
import { generateId, nowIso } from '../utils';

@Injectable({ providedIn: 'root' })
export class ProfileDocumentRepository {
  watchAll(): Observable<ProfileDocument[]> {
    return from(liveQuery(() => db.profileDocuments.orderBy('title').toArray()));
  }

  async getAll(): Promise<ProfileDocument[]> {
    return db.profileDocuments.orderBy('title').toArray();
  }

  async getById(id: string): Promise<ProfileDocument | undefined> {
    return db.profileDocuments.get(id);
  }

  async put(doc: ProfileDocument): Promise<void> {
    await db.profileDocuments.put(doc);
  }

  async delete(id: string): Promise<void> {
    await db.profileDocuments.delete(id);
  }

  async create(data: Partial<ProfileDocument>): Promise<ProfileDocument> {
    const now = nowIso();
    const doc: ProfileDocument = {
      id: generateId(),
      type: data.type ?? 'other',
      title: data.title ?? 'Document',
      description: data.description,
      issueDate: data.issueDate,
      expiryDate: data.expiryDate,
      imageIds: data.imageIds ?? [],
      createdAt: now,
      updatedAt: now,
    };
    await this.put(doc);
    return doc;
  }
}
