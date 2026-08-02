import { FishingMode } from './fishing-mode.model';

export type ImageType =
  | 'cover'
  | 'session'
  | 'catch'
  | 'lake'
  | 'profile'
  | 'document'
  | 'general';

export interface StoredImage {
  id: string;
  fishingMode?: FishingMode;
  type: ImageType;
  parentId?: string;
  fileName: string;
  blob: Blob;
  thumbnailBlob: Blob;
  mimeType: string;
  createdAt: string;
  isFavorite: boolean;
  isHomepageImage: boolean;
  thumbnailId?: string;
  /** Soft-delete: false hides from UI; omit/true = visible. */
  visible?: boolean;
}
