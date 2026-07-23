import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';
import { db } from '../db/fish-db';
import { ImageType, StoredImage } from '../models';

@Injectable({ providedIn: 'root' })
export class ImageRepository {
  watchGallery(): Observable<StoredImage[]> {
    return from(
      liveQuery(() =>
        db.images
          .filter((img) => img.type !== 'cover')
          .reverse()
          .sortBy('createdAt'),
      ),
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
    return db.images.get(id);
  }

  async getAll(): Promise<StoredImage[]> {
    return db.images.toArray();
  }

  async getGalleryImages(): Promise<StoredImage[]> {
    return db.images.filter((img) => img.type !== 'cover').toArray();
  }

  async getFavorites(): Promise<StoredImage[]> {
    return db.images.filter((img) => img.isFavorite).toArray();
  }

  async getHomepageImage(): Promise<StoredImage | undefined> {
    return db.images.filter((img) => img.isHomepageImage).first();
  }

  async clearHomepageFlags(): Promise<void> {
    const homepageImages = await db.images.filter((img) => img.isHomepageImage).toArray();
    await Promise.all(
      homepageImages.map((img) =>
        db.images.update(img.id, { isHomepageImage: false }),
      ),
    );
  }

  async put(image: StoredImage): Promise<void> {
    await db.images.put(image);
  }

  async delete(id: string): Promise<void> {
    await db.images.delete(id);
  }

  async clear(): Promise<void> {
    await db.images.clear();
  }

  async getByType(type: ImageType): Promise<StoredImage[]> {
    return db.images.where('type').equals(type).toArray();
  }
}
