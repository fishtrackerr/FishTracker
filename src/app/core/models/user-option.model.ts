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
  category: UserOptionCategory;
  value: string;
  isFavorite: boolean;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}
