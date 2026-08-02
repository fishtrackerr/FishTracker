import { FishingMode } from './fishing-mode.model';

export type UserOptionCategory =
  | 'species'
  | 'bait'
  | 'baitFlavor'
  | 'rig'
  | 'hookSize'
  | 'lineType'
  | 'method'
  | 'weatherType'
  | 'tag';

export interface UserOption {
  id: string;
  fishingMode?: FishingMode;
  category: UserOptionCategory;
  value: string;
  isFavorite: boolean;
  isDefault: boolean;
  /** Soft-delete: false hides from UI; omit/true = visible. */
  visible?: boolean;
  createdAt: string;
  updatedAt: string;
}
