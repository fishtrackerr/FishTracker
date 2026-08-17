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

/** Max length for option values (settings UI + service + backup). */
export const USER_OPTION_VALUE_MAX_LENGTH = 80;

const USER_OPTION_CATEGORY_SET = new Set<UserOptionCategory>([
  'species',
  'bait',
  'baitFlavor',
  'rig',
  'hookSize',
  'lineType',
  'method',
  'weatherType',
  'tag',
]);

export function isUserOptionCategory(value: unknown): value is UserOptionCategory {
  return typeof value === 'string' && USER_OPTION_CATEGORY_SET.has(value as UserOptionCategory);
}

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
