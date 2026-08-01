import { Injectable } from '@angular/core';
import { ImageRepository } from './image.repository';
import { ImageType, StoredImage } from '../models';
import { fetchWithTimeout, generateId, nowIso } from '../utils';
import { FishingModeService } from './fishing-mode.service';
import { SettingsService } from './settings.service';

const COVER_IMAGES = [
  'assets/images/covers/cover-1.svg',
  'assets/images/covers/cover-2.svg',
  'assets/images/covers/cover-3.svg',
  'assets/images/covers/cover-4.svg',
];

const PLACEHOLDER = 'assets/images/img-not-found.svg';

@Injectable({ providedIn: 'root' })
export class ImageService {
  private readonly urlCache = new Map<string, string>();
  private readonly fullUrlCache = new Map<string, string>();

  constructor(
    private readonly imageRepo: ImageRepository,
    private readonly settings: SettingsService,
    private readonly fishingMode: FishingModeService,
  ) {}

  async processFile(
    file: File,
    type: ImageType,
    parentId?: string,
  ): Promise<string> {
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image');
    }
    const maxBytes = 20 * 1024 * 1024;
    if (file.size > maxBytes) {
      throw new Error('Image exceeds 20 MB limit');
    }
    const { blob, thumbnailBlob } = await this.compressImage(file);
    const id = generateId();
    const image = {
      id,
      type,
      parentId,
      fileName: file.name,
      blob,
      thumbnailBlob,
      mimeType: 'image/jpeg',
      createdAt: nowIso(),
      isFavorite: false,
      isHomepageImage: false,
    };
    await this.imageRepo.put(image);
    return id;
  }

  async createCoverImage(): Promise<string | undefined> {
    try {
      const path = COVER_IMAGES[Math.floor(Math.random() * COVER_IMAGES.length)];
      const response = await fetchWithTimeout(path);
      if (!response.ok) {
        return undefined;
      }
      const svgBlob = await response.blob();
      const { blob, thumbnailBlob } = await this.compressImage(
        new File([svgBlob], 'cover.svg', { type: svgBlob.type || 'image/svg+xml' }),
      );
      if (!blob || blob.size === 0) {
        return undefined;
      }
      const id = generateId();
      await this.imageRepo.put({
        id,
        type: 'cover',
        fileName: 'cover.jpg',
        blob,
        thumbnailBlob,
        mimeType: 'image/jpeg',
        createdAt: nowIso(),
        isFavorite: false,
        isHomepageImage: false,
      });
      return id;
    } catch {
      return undefined;
    }
  }

  async getObjectUrl(id: string): Promise<string | null> {
    if (this.urlCache.has(id)) {
      return this.urlCache.get(id)!;
    }
    const image = await this.imageRepo.getById(id);
    if (!image) {
      return null;
    }
    const url = URL.createObjectURL(image.thumbnailBlob);
    this.urlCache.set(id, url);
    return url;
  }

  async getFullObjectUrl(id: string): Promise<string | null> {
    if (this.fullUrlCache.has(id)) {
      return this.fullUrlCache.get(id)!;
    }
    const image = await this.imageRepo.getById(id);
    if (!image) {
      return null;
    }
    const url = URL.createObjectURL(image.blob);
    this.fullUrlCache.set(id, url);
    return url;
  }

  getPlaceholderUrl(): string {
    return PLACEHOLDER;
  }

  async getHomepageUrl(): Promise<string> {
    const homepageId = this.fishingMode.getActivePreferences().homepageImageId;
    if (homepageId) {
      const url = await this.getObjectUrl(homepageId);
      if (url) return url;
    }
    const homepageImage = await this.imageRepo.getHomepageImage();
    if (homepageImage) {
      const url = await this.getObjectUrl(homepageImage.id);
      if (url) return url;
    }
    return PLACEHOLDER;
  }

  async setFavorite(id: string, isFavorite: boolean): Promise<void> {
    const image = await this.imageRepo.getById(id);
    if (!image) return;
    await this.imageRepo.put({ ...image, isFavorite });
  }

  async toggleFavorite(id: string): Promise<boolean> {
    const image = await this.imageRepo.getById(id);
    if (!image) return false;
    const isFavorite = !image.isFavorite;
    await this.imageRepo.put({ ...image, isFavorite });
    return isFavorite;
  }

  async setHomepageImage(id: string): Promise<void> {
    await this.imageRepo.clearHomepageFlags();
    const image = await this.imageRepo.getById(id);
    if (!image) return;
    await this.imageRepo.put({ ...image, isHomepageImage: true });
    this.fishingMode.updateActivePreferences({ homepageImageId: id });
  }

  async clearHomepageImage(): Promise<void> {
    await this.imageRepo.clearHomepageFlags();
    this.fishingMode.updateActivePreferences({ homepageImageId: undefined });
  }

  async delete(id: string): Promise<void> {
    this.revokeUrl(id);
    this.revokeFullUrl(id);
    await this.imageRepo.delete(id);
    if (this.fishingMode.getActivePreferences().homepageImageId === id) {
      this.fishingMode.updateActivePreferences({ homepageImageId: undefined });
    }
  }

  revokeUrl(id: string): void {
    const url = this.urlCache.get(id);
    if (url) {
      URL.revokeObjectURL(url);
      this.urlCache.delete(id);
    }
  }

  revokeFullUrl(id: string): void {
    const url = this.fullUrlCache.get(id);
    if (url) {
      URL.revokeObjectURL(url);
      this.fullUrlCache.delete(id);
    }
  }

  revokeAllFullUrls(): void {
    for (const id of [...this.fullUrlCache.keys()]) {
      this.revokeFullUrl(id);
    }
  }

  private async compressImage(
    file: File,
  ): Promise<{ blob: Blob; thumbnailBlob: Blob }> {
    const img = await this.loadImage(file);
    const blob = await this.resizeToBlob(img, 1200, 0.8);
    const thumbnailBlob = await this.resizeToBlob(img, 200, 0.7);
    return { blob, thumbnailBlob };
  }

  private loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        if (img.width === 0 || img.height === 0) {
          reject(new Error('Invalid image dimensions'));
          return;
        }
        resolve(img);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load image'));
      };
      img.src = url;
    });
  }

  private resizeToBlob(
    img: HTMLImageElement,
    maxSize: number,
    quality: number,
  ): Promise<Blob> {
    const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
    const width = Math.round(img.width * scale);
    const height = Math.round(img.height * scale);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0, width, height);
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob!), 'image/jpeg', quality);
    });
  }
}
