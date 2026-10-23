import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { ImageType, StoredImage } from '../models';
import { isVisibleRecord } from '../utils';
import { ModeScopedRepository, NewModeEntity } from './mode-scoped.repository';

@Injectable({ providedIn: 'root' })
export class ImageRepository extends ModeScopedRepository {
  watchGallery(): Observable<StoredImage[]> {
    return from(
      liveQuery(async () => {
        const mode = this.tryActiveMode();
        if (!mode) {
          return [];
        }
        const rows = await db.images.where('fishingMode').equals(mode).toArray();
        return this.onlyVisible(rows)
          .filter((img) => img.type !== 'cover')
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }),
    );
  }

  watchByParent(parentId: string): Observable<StoredImage[]> {
    return from(
      liveQuery(async () => {
        const rows = await db.images.where('parentId').equals(parentId).sortBy('createdAt');
        return this.onlyVisible(rows);
      }),
    );
  }

  async getById(id: string): Promise<StoredImage | undefined> {
    return this.forActiveMode(await db.images.get(id));
  }

  async getAll(): Promise<StoredImage[]> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return [];
    }
    return this.onlyVisible(await db.images.where('fishingMode').equals(mode).toArray());
  }

  async getAllAcrossModes(): Promise<StoredImage[]> {
    return db.images.toArray();
  }

  async getGalleryImages(): Promise<StoredImage[]> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return [];
    }
    const rows = await db.images.where('fishingMode').equals(mode).toArray();
    return this.onlyVisible(rows).filter((img) => img.type !== 'cover');
  }

  async getFavorites(): Promise<StoredImage[]> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return [];
    }
    const rows = await db.images.where('fishingMode').equals(mode).toArray();
    return this.onlyVisible(rows).filter((img) => img.isFavorite);
  }

  async getHomepageImage(): Promise<StoredImage | undefined> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return undefined;
    }
    const rows = await db.images.where('fishingMode').equals(mode).toArray();
    return this.onlyVisible(rows).find((img) => img.isHomepageImage);
  }

  async clearHomepageFlags(): Promise<void> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return;
    }
    const homepageImages = await db.images
      .where('fishingMode')
      .equals(mode)
      .filter((img) => img.isHomepageImage && isVisibleRecord(img))
      .toArray();
    await Promise.all(
      homepageImages.map((img) =>
        db.images.update(img.id, { isHomepageImage: false }),
      ),
    );
  }

  async put(image: NewModeEntity<StoredImage>): Promise<void> {
    await db.images.put(this.withMode(image));
  }

  async delete(id: string): Promise<void> {
    const row = await db.images.get(id);
    if (!row) {
      return;
    }
    await db.images.put({ ...row, visible: false });
  }

  async clearCurrentMode(): Promise<void> {
    const mode = this.activeMode();
    await db.images.where('fishingMode').equals(mode).delete();
  }

  async clear(): Promise<void> {
    await db.images.clear();
  }

  /**
   * Visible session and catch photos of one session: rows with this parentId
   * plus explicitly linked ids, read by index instead of scanning the mode.
   */
  async getSessionImages(sessionId: string, linkedIds: string[]): Promise<StoredImage[]> {
    const [byParent, linked] = await Promise.all([
      db.images.where('parentId').equals(sessionId).toArray(),
      db.images.bulkGet(linkedIds),
    ]);
    const byId = new Map<string, StoredImage>();
    for (const row of [...byParent, ...linked]) {
      const image = this.forActiveMode(row);
      if (image && (image.type === 'session' || image.type === 'catch')) {
        byId.set(image.id, image);
      }
    }
    return [...byId.values()];
  }

  /** Permanently removes an image row (for internal images the user never sees). */
  async purge(id: string): Promise<void> {
    await db.images.delete(id);
  }

  async getByType(type: ImageType): Promise<StoredImage[]> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return [];
    }
    const rows = await db.images.where('fishingMode').equals(mode).toArray();
    return this.onlyVisible(rows).filter((img) => img.type === type);
  }
}
