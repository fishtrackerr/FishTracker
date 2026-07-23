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
}
