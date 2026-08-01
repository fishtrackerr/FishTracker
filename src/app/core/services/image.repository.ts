import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { ImageType, StoredImage } from '../models';
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
        return rows
          .filter((img) => img.type !== 'cover')
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }),
    );
  }

  watchByParent(parentId: string): Observable<StoredImage[]> {
    return from(
      liveQuery(() =>
        db.images.where('parentId').equals(parentId).sortBy('createdAt'),
      ),
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
    return db.images.where('fishingMode').equals(mode).toArray();
  }

  async getAllAcrossModes(): Promise<StoredImage[]> {
    return db.images.toArray();
  }

  async getGalleryImages(): Promise<StoredImage[]> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return [];
    }
    return db.images
      .where('fishingMode')
      .equals(mode)
      .filter((img) => img.type !== 'cover')
      .toArray();
  }

  async getFavorites(): Promise<StoredImage[]> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return [];
    }
    return db.images
      .where('fishingMode')
      .equals(mode)
      .filter((img) => img.isFavorite)
      .toArray();
  }

  async getHomepageImage(): Promise<StoredImage | undefined> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return undefined;
    }
    return db.images
      .where('fishingMode')
      .equals(mode)
      .filter((img) => img.isHomepageImage)
      .first();
  }

  async clearHomepageFlags(): Promise<void> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return;
    }
    const homepageImages = await db.images
      .where('fishingMode')
      .equals(mode)
      .filter((img) => img.isHomepageImage)
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
    await db.images.delete(id);
  }

  async clearCurrentMode(): Promise<void> {
    const mode = this.activeMode();
    await db.images.where('fishingMode').equals(mode).delete();
  }

  async clear(): Promise<void> {
    await db.images.clear();
  }

  async getByType(type: ImageType): Promise<StoredImage[]> {
    const mode = this.tryActiveMode();
    if (!mode) {
      return [];
    }
    return db.images
      .where('fishingMode')
      .equals(mode)
      .filter((img) => img.type === type)
      .toArray();
  }
}
