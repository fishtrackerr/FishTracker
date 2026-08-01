import { Injectable, inject } from '@angular/core';
import { db } from '../db/fish-db';
import { DEFAULT_SETTINGS, UserOptionCategory } from '../models';
import { BiteEventRepository } from './bite-event.repository';
import { CatchRepository } from './catch.repository';
import { ChatRepository } from './chat.repository';
import { FilterService } from './filter.service';
import { FishSpottedRepository } from './fish-spotted.repository';
import { ImageRepository } from './image.repository';
import { LakeRepository } from './lake.repository';
import { RodSpotHistoryRepository } from './rod-spot-history.repository';
import { SessionEventRepository } from './session-event.repository';
import { SessionRepository } from './session.repository';
import { SessionWeatherRepository } from './session-weather.repository';
import { SettingsService } from './settings.service';
import { ThemeService } from './theme.service';
import { UserOptionRepository } from './user-option.repository';
import { UserOptionService } from './user-option.service';
import { ImageService } from './image.service';

const WEATHER_CACHE_KEY = 'fish-tracker-weather-cache';
const PRESETS_KEY = 'fish-tracker-filter-presets';
const LOCK_STATE_KEY = 'fish-tracker-lock-state';

@Injectable({ providedIn: 'root' })
export class ResetService {
  private readonly settings = inject(SettingsService);
  private readonly theme = inject(ThemeService);
  private readonly filterService = inject(FilterService);
  private readonly userOptions = inject(UserOptionService);
  private readonly imageService = inject(ImageService);
  private readonly sessionRepo = inject(SessionRepository);
  private readonly catchRepo = inject(CatchRepository);
  private readonly lakeRepo = inject(LakeRepository);
  private readonly imageRepo = inject(ImageRepository);
  private readonly biteEventRepo = inject(BiteEventRepository);
  private readonly fishSpottedRepo = inject(FishSpottedRepository);
  private readonly rodSpotHistoryRepo = inject(RodSpotHistoryRepository);
  private readonly sessionEventRepo = inject(SessionEventRepository);
  private readonly sessionWeatherRepo = inject(SessionWeatherRepository);
  private readonly userOptionRepo = inject(UserOptionRepository);
  private readonly chatRepo = inject(ChatRepository);

  async resetCustomOptionsCategory(
    category: UserOptionCategory,
    keepFavorites = true,
  ): Promise<void> {
    await this.userOptions.resetCategory(category, keepFavorites);
  }

  async resetAllCustomOptions(keepFavorites = true): Promise<void> {
    await this.userOptions.resetAllCustom(keepFavorites);
  }

  async restoreDefaultOptions(category?: UserOptionCategory): Promise<void> {
    await this.userOptions.restoreDefaults(category);
  }

  resetFilters(): void {
    localStorage.removeItem(PRESETS_KEY);
    this.filterService.clearActive();
  }

  async resetAppearance(): Promise<void> {
    this.theme.setTheme(DEFAULT_SETTINGS.themeMode);
    this.settings.update({
      gallerySortDefault: DEFAULT_SETTINGS.gallerySortDefault,
      galleryThumbnailSize: DEFAULT_SETTINGS.galleryThumbnailSize,
      galleryFavoritesFirst: DEFAULT_SETTINGS.galleryFavoritesFirst,
    });
    await this.imageService.clearHomepageImage();
    this.clearExpandStates();
  }

  resetWeather(): void {
    localStorage.removeItem(WEATHER_CACHE_KEY);
    this.settings.update({
      detailedWeatherEnabled: DEFAULT_SETTINGS.detailedWeatherEnabled,
      autoLoadWeather: DEFAULT_SETTINGS.autoLoadWeather,
      weatherRefreshMinutes: DEFAULT_SETTINGS.weatherRefreshMinutes,
      useGpsForWeather: DEFAULT_SETTINGS.useGpsForWeather,
      showWeatherWarnings: DEFAULT_SETTINGS.showWeatherWarnings,
    });
  }

  resetSecurity(): void {
    this.settings.update({
      lockTimeoutMinutes: DEFAULT_SETTINGS.lockTimeoutMinutes,
    });
  }

  async resetAllSettings(): Promise<void> {
    const pinHash = this.settings.get().pinHash;
    const pinSalt = this.settings.get().pinSalt;
    const pinEnabled = this.settings.get().pinEnabled;
    this.settings.update({ ...DEFAULT_SETTINGS, pinHash, pinSalt, pinEnabled });
    this.resetFilters();
    await this.resetAppearance();
    this.resetWeather();
    this.resetSecurity();
  }

  async resetFullApplication(): Promise<void> {
    await db.transaction(
      'rw',
      [
        db.sessions,
        db.catches,
        db.lakes,
        db.images,
        db.profiles,
        db.profileDocuments,
        db.biteEvents,
        db.fishSpottedEvents,
        db.rodSpotHistory,
        db.sessionEvents,
        db.sessionWeather,
        db.userOptions,
        db.chatThreads,
        db.chatMessages,
      ],
      async () => {
        await this.sessionRepo.clear();
        await this.catchRepo.clear();
        await this.lakeRepo.clear();
        await this.imageRepo.clear();
        await db.profiles.clear();
        await db.profileDocuments.clear();
        await this.biteEventRepo.clear();
        await this.fishSpottedRepo.clear();
        await this.rodSpotHistoryRepo.clear();
        await this.sessionEventRepo.clear();
        await this.sessionWeatherRepo.clear();
        await this.userOptionRepo.clear();
        await this.chatRepo.clear();
      },
    );
    localStorage.removeItem(PRESETS_KEY);
    localStorage.removeItem(WEATHER_CACHE_KEY);
    localStorage.removeItem(LOCK_STATE_KEY);
    this.clearExpandStates();
    this.settings.update({ ...DEFAULT_SETTINGS });
    await this.userOptions.restoreDefaults();
  }

  private clearExpandStates(): void {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('expand-')) {
        keysToRemove.push(key);
      }
    }
    for (const key of keysToRemove) {
      localStorage.removeItem(key);
    }
  }
}
