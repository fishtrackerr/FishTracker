import { Injectable, inject } from '@angular/core';
import { db } from '../db/fish-db';
import { DEFAULT_SETTINGS, UserOptionCategory } from '../models';
import { defaultModePreferences } from '../models/fishing-mode.model';
import {
  FISHING_MODE_KEY,
  FILTER_PRESETS_KEY_PREFIX,
  LOCK_STATE_KEY,
  UNLOCK_SESSION_KEY,
  WEATHER_CACHE_KEY,
} from '../constants/storage-keys';
import { BiteEventRepository } from './bite-event.repository';
import { AssistantPromptRepository } from './assistant-prompt.repository';
import { CatchRepository } from './catch.repository';
import { ChatRepository } from './chat.repository';
import { FilterService } from './filter.service';
import { FishSpottedRepository } from './fish-spotted.repository';
import { FishingModeService } from './fishing-mode.service';
import { ImageRepository } from './image.repository';
import { ImageService } from './image.service';
import { LakeRepository } from './lake.repository';
import { RodSpotHistoryRepository } from './rod-spot-history.repository';
import { SecretVaultService } from './secret-vault.service';
import { SessionEventRepository } from './session-event.repository';
import { SessionRepository } from './session.repository';
import { SessionWeatherRepository } from './session-weather.repository';
import { SettingsService } from './settings.service';
import { ThemeService } from './theme.service';
import { UserOptionRepository } from './user-option.repository';
import { UserOptionService } from './user-option.service';

@Injectable({ providedIn: 'root' })
export class ResetService {
  private readonly settings = inject(SettingsService);
  private readonly fishingMode = inject(FishingModeService);
  private readonly vault = inject(SecretVaultService);
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
  private readonly assistantPromptRepo = inject(AssistantPromptRepository);

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
    this.filterService.clearActive();
    this.clearFilterPresetKeys();
  }

  async resetAppearance(options?: { clearHomepage?: boolean }): Promise<void> {
    this.theme.setTheme(DEFAULT_SETTINGS.themeMode);
    this.settings.update({
      gallerySortDefault: DEFAULT_SETTINGS.gallerySortDefault,
      galleryThumbnailSize: DEFAULT_SETTINGS.galleryThumbnailSize,
      galleryFavoritesFirst: DEFAULT_SETTINGS.galleryFavoritesFirst,
    });
    if (options?.clearHomepage !== false && this.fishingMode.hasMode()) {
      await this.imageService.clearHomepageImage();
    }
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
    const current = this.settings.get();
    const pinHash = current.pinHash;
    const pinSalt = current.pinSalt;
    const pinEnabled = current.pinEnabled;
    const modePreferences = current.modePreferences ?? {};
    this.settings.replace({
      ...DEFAULT_SETTINGS,
      pinHash,
      pinSalt,
      pinEnabled,
      modePreferences,
    });
    await this.vault.clearAiApiKey();
    this.resetFilters();
    // Keep modePreferences (incl. homepage/favorites) intact for all modes.
    await this.resetAppearance({ clearHomepage: false });
    this.resetWeather();
    this.resetSecurity();
  }

  /** Clears fishing data for the currently selected mode only. */
  async resetCurrentMode(): Promise<void> {
    const mode = this.fishingMode.requireMode();
    await db.transaction(
      'rw',
      [
        db.sessions,
        db.catches,
        db.lakes,
        db.images,
        db.biteEvents,
        db.fishSpottedEvents,
        db.rodSpotHistory,
        db.sessionEvents,
        db.sessionWeather,
        db.userOptions,
        db.chatThreads,
        db.chatMessages,
        db.assistantPrompts,
      ],
      async () => {
        await this.sessionRepo.clearCurrentMode();
        await this.catchRepo.clearCurrentMode();
        await this.lakeRepo.clearCurrentMode();
        await this.imageRepo.clearCurrentMode();
        await this.biteEventRepo.clearCurrentMode();
        await this.fishSpottedRepo.clearCurrentMode();
        await this.rodSpotHistoryRepo.clearCurrentMode();
        await this.sessionEventRepo.clearCurrentMode();
        await this.sessionWeatherRepo.clearCurrentMode();
        await this.userOptionRepo.clearCurrentMode();
        await this.chatRepo.clearCurrentMode();
        await this.assistantPromptRepo.clearCurrentMode();
      },
    );
    this.filterService.clearActive();
    localStorage.removeItem(`${FILTER_PRESETS_KEY_PREFIX}:${mode}`);
    this.fishingMode.updatePreferences(mode, defaultModePreferences(mode));
    await this.userOptions.ensureDefaultsForCurrentMode();
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
        db.assistantPrompts,
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
        await this.assistantPromptRepo.clear();
      },
    );
    this.clearFilterPresetKeys();
    localStorage.removeItem(WEATHER_CACHE_KEY);
    localStorage.removeItem(LOCK_STATE_KEY);
    try {
      sessionStorage.removeItem(UNLOCK_SESSION_KEY);
      sessionStorage.removeItem(FISHING_MODE_KEY);
    } catch {
      /* ignore */
    }
    this.clearExpandStates();
    this.settings.replace({ ...DEFAULT_SETTINGS, modePreferences: {} });
    this.vault.lock();
    this.fishingMode.clearMode();
  }

  private clearFilterPresetKeys(): void {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key === 'fish-tracker-filter-presets' ||
        key?.startsWith(`${FILTER_PRESETS_KEY_PREFIX}:`)
      ) {
        keysToRemove.push(key);
      }
    }
    for (const key of keysToRemove) {
      localStorage.removeItem(key);
    }
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
