export const FISHING_MODES = [
  'carper',
  'catfish',
  'pike',
  'bass',
  'feeder',
  'general',
] as const;

export type FishingMode = (typeof FISHING_MODES)[number];

export const DEFAULT_FISHING_MODE: FishingMode = 'carper';

export interface ModePreferences {
  lastLakeId?: string;
  defaultLakeId?: string;
  homepageImageId?: string;
  favoriteSpecies: string[];
  favoriteBaits: string[];
  favoriteRigs: string[];
}

export const MODE_DEFAULT_PREFERENCES: Record<FishingMode, ModePreferences> = {
  carper: {
    favoriteSpecies: ['Carp', 'Mirror Carp', 'Common Carp', 'Grass Carp'],
    favoriteBaits: ['Boilie', 'Corn', 'Pellets', 'Particle'],
    favoriteRigs: ['Hair Rig', 'Chod Rig', 'Hinged Stiff', 'Zig Rig'],
  },
  catfish: {
    favoriteSpecies: ['Catfish', 'Wels Catfish'],
    favoriteBaits: ['Pellet', 'Squid', 'Liver', 'Boilie'],
    favoriteRigs: ['Ledger', 'Float Rig', 'Hair Rig'],
  },
  pike: {
    favoriteSpecies: ['Pike', 'Zander'],
    favoriteBaits: ['Deadbait', 'Lure', 'Spinner', 'Softbait'],
    favoriteRigs: ['Wire Trace', 'Float Rig', 'Jerkbait'],
  },
  bass: {
    favoriteSpecies: ['Bass', 'Largemouth Bass', 'Smallmouth Bass'],
    favoriteBaits: ['Softbait', 'Crankbait', 'Jig', 'Spinnerbait'],
    favoriteRigs: ['Texas Rig', 'Carolina Rig', 'Drop Shot'],
  },
  feeder: {
    favoriteSpecies: ['Bream', 'Roach', 'Carp', 'Tench', 'Ide'],
    favoriteBaits: ['Maggot', 'Corn', 'Worm', 'Pellets', 'Groundbait'],
    favoriteRigs: ['Method Feeder', 'Cage Feeder', 'Inline Feeder', 'Helikopter'],
  },
  general: {
    favoriteSpecies: ['Carp', 'Pike', 'Perch', 'Bream', 'Roach', 'Catfish'],
    favoriteBaits: ['Boilie', 'Corn', 'Worm', 'Pellets', 'Lure'],
    favoriteRigs: ['Hair Rig', 'Method Feeder', 'Float Rig', 'Ledger'],
  },
};

export function isFishingMode(value: unknown): value is FishingMode {
  return typeof value === 'string' && (FISHING_MODES as readonly string[]).includes(value);
}

export function defaultModePreferences(mode: FishingMode): ModePreferences {
  const defaults = MODE_DEFAULT_PREFERENCES[mode];
  return {
    favoriteSpecies: [...defaults.favoriteSpecies],
    favoriteBaits: [...defaults.favoriteBaits],
    favoriteRigs: [...defaults.favoriteRigs],
  };
}
