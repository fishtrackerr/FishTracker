import { ModePreferences } from './fishing-mode.model';

export type WeightUnit = 'kg' | 'lbs';
export type LengthUnit = 'cm' | 'inch';
export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type ThemeMode = 'dark' | 'light' | 'system';
export type DistanceUnit = 'm' | 'ft';
export type AppLanguage = 'nl' | 'en' | 'de';

export interface AppSettings {
  weightUnit: WeightUnit;
  lengthUnit: LengthUnit;
  temperatureUnit: TemperatureUnit;
  distanceUnit: DistanceUnit;
  themeMode: ThemeMode;
  pinHash?: string;
  pinSalt?: string;
  lockTimeoutMinutes: number;
  pinEnabled: boolean;
  /** @deprecated Prefer modePreferences[mode].lastLakeId */
  lastLakeId?: string;
  /** @deprecated Prefer modePreferences[mode].favoriteSpecies */
  favoriteSpecies: string[];
  /** @deprecated Prefer modePreferences[mode].favoriteBaits */
  favoriteBaits: string[];
  /** @deprecated Prefer modePreferences[mode].favoriteRigs */
  favoriteRigs: string[];
  /** @deprecated Prefer modePreferences[mode].homepageImageId */
  homepageImageId?: string;
  detailedWeatherEnabled: boolean;
  autoLoadWeather: boolean;
  weatherRefreshMinutes: number;
  useGpsForWeather: boolean;
  showWeatherWarnings: boolean;
  gallerySortDefault: 'newest' | 'oldest' | 'favorite';
  galleryThumbnailSize: 'small' | 'medium' | 'large';
  galleryFavoritesFirst: boolean;
  language: AppLanguage;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  firstDayOfWeek: 0 | 1;
  /** @deprecated Prefer modePreferences[mode].defaultLakeId */
  defaultLakeId?: string;
  /** Prefills country when creating a new lake. */
  defaultCountry?: string;
  maxRodCount: number;
  aiChatEnabled: boolean;
  /** @deprecated Plaintext — migrated to encrypted fields on unlock; never persist. */
  aiApiKey?: string;
  /** AES-GCM ciphertext (base64) for the AI API key. */
  aiApiKeyEncrypted?: string;
  /** AES-GCM IV (base64). */
  aiApiKeyIv?: string;
  /** Salt for PIN-derived AI key wrapping key (base64). */
  aiKeySalt?: string;
  aiBaseUrl?: string;
  aiModel?: string;
  /** Per-mode lakes/favorites/homepage preferences. */
  modePreferences?: Partial<Record<string, ModePreferences>>;
}

export const DEFAULT_SETTINGS: AppSettings = {
  weightUnit: 'kg',
  lengthUnit: 'cm',
  temperatureUnit: 'celsius',
  distanceUnit: 'm',
  themeMode: 'dark',
  lockTimeoutMinutes: 5,
  pinEnabled: false,
  favoriteSpecies: ['Carp', 'Pike', 'Perch', 'Bream', 'Roach'],
  favoriteBaits: ['Boilie', 'Corn', 'Worm', 'Pellets'],
  favoriteRigs: ['Hair Rig', 'Method Feeder', 'Float Rig', 'Ledger'],
  detailedWeatherEnabled: true,
  autoLoadWeather: true,
  weatherRefreshMinutes: 30,
  useGpsForWeather: true,
  showWeatherWarnings: true,
  gallerySortDefault: 'newest',
  galleryThumbnailSize: 'medium',
  galleryFavoritesFirst: false,
  language: 'nl',
  dateFormat: 'dd/MM/yyyy',
  timeFormat: '24h',
  firstDayOfWeek: 1,
  maxRodCount: 10,
  aiChatEnabled: false,
  aiBaseUrl: 'https://api.openai.com/v1',
  aiModel: 'gpt-4o-mini',
  modePreferences: {},
};
