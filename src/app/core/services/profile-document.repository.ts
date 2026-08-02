import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { ProfileDocument } from '../models';
import { generateId, isVisibleRecord, nowIso, onlyVisibleRecords, withVisibleDefault } from '../utils';

@Injectable({ providedIn: 'root' })
export class ProfileDocumentRepository {
  watchAll(): Observable<ProfileDocument[]> {
    return from(
      liveQuery(async () =>
        onlyVisibleRecords(await db.profileDocuments.orderBy('title').toArray()),
      ),
    );
  }

  async getAll(): Promise<ProfileDocument[]> {
    return onlyVisibleRecords(await db.profileDocuments.orderBy('title').toArray());
  }

  async getById(id: string): Promise<ProfileDocument | undefined> {
    const doc = await db.profileDocuments.get(id);
    return isVisibleRecord(doc) ? doc : undefined;
  }

  async put(doc: ProfileDocument): Promise<void> {
    await db.profileDocuments.put(withVisibleDefault(doc));
  }

  async delete(id: string): Promise<void> {
    const row = await db.profileDocuments.get(id);
    if (!row) {
      return;
    }
    await db.profileDocuments.put({ ...row, visible: false, updatedAt: nowIso() });
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
      visible: true,
      createdAt: now,
      updatedAt: now,
    };
    await this.put(doc);
    return doc;
  }
}
