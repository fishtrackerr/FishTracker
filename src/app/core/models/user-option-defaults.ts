import { FishingMode, MODE_DEFAULT_PREFERENCES } from './fishing-mode.model';
import { UserOptionCategory } from './user-option.model';

/** All option categories used by catch forms and settings. */
export const USER_OPTION_CATEGORIES: UserOptionCategory[] = [
  'species',
  'bait',
  'baitFlavor',
  'rig',
  'hookSize',
  'lineType',
  'method',
  'weatherType',
  'tag',
];

/** Shared defaults that are useful across fishing modes. */
const SHARED_DEFAULTS: Record<
  Exclude<UserOptionCategory, 'species' | 'bait' | 'rig'>,
  string[]
> = {
  baitFlavor: ['Sweet', 'Spicy', 'Fishy', 'Fruity', 'Natural', 'Garlic', 'Scopex', 'Strawberry'],
  hookSize: ['2', '4', '6', '8', '10', '1/0', '2/0', '4/0'],
  lineType: ['Monofilament', 'Fluorocarbon', 'Braid', 'Coated Braid', 'Hooklink'],
  method: ['Bottom', 'Margin', 'Zig', 'Surface', 'Feeder', 'Float', 'Lure', 'Ledger'],
  weatherType: ['Sunny', 'Cloudy', 'Overcast', 'Rain', 'Wind', 'Fog', 'Storm', 'Clear night'],
  tag: ['demo', 'night', 'weekend', 'trophy', 'practice', 'prebait', 'social'],
};

/** Mode-specific extras layered on top of shared lists. */
const MODE_EXTRA_DEFAULTS: Partial<
  Record<FishingMode, Partial<Record<UserOptionCategory, string[]>>>
> = {
  carper: {
    baitFlavor: ['Pineapple', 'Tutti Frutti', 'Krill'],
    method: ['Solid bag', 'PVA stick', 'Spod & cast'],
    tag: ['carping', 'session'],
  },
  catfish: {
    baitFlavor: ['Blood', 'Cheese'],
    hookSize: ['6/0', '8/0'],
    method: ['Clonk', 'Vertical'],
    tag: ['catfishing'],
  },
  pike: {
    baitFlavor: ['Fish oil'],
    method: ['Trolling', 'Spinning', 'Deadbaiting'],
    tag: ['predator'],
  },
  bass: {
    method: ['Spinning', 'Jigging', 'Topwater'],
    tag: ['bass'],
  },
  feeder: {
    method: ['Method feeder', 'Cage feeder', 'Bomb'],
    baitFlavor: ['Vanilla', 'Chocolate'],
    tag: ['match', 'feeder'],
  },
  general: {
    tag: ['mixed'],
  },
};

export function defaultValuesForCategory(
  category: UserOptionCategory,
  mode: FishingMode,
): string[] {
  const prefs = MODE_DEFAULT_PREFERENCES[mode];
  let base: string[] = [];
  switch (category) {
    case 'species':
      base = prefs.favoriteSpecies;
      break;
    case 'bait':
      base = prefs.favoriteBaits;
      break;
    case 'rig':
      base = prefs.favoriteRigs;
      break;
    default:
      base = SHARED_DEFAULTS[category];
      break;
  }
  const extras = MODE_EXTRA_DEFAULTS[mode]?.[category] ?? [];
  return uniquePreserveOrder([...base, ...extras]);
}

function uniquePreserveOrder(values: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const value of values) {
    const key = value.toLowerCase();
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    result.push(value);
  }
  return result;
}
