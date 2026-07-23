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
  lastLakeId?: string;
  favoriteSpecies: string[];
  favoriteBaits: string[];
  favoriteRigs: string[];
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
  defaultLakeId?: string;
  maxRodCount: number;
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
};
