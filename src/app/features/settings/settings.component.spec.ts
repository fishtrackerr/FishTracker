import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { of } from 'rxjs';
import { SettingsComponent } from './settings.component';
import { SettingsService } from '../../core/services/settings.service';
import { BackupService } from '../../core/services/backup.service';
import { PinLockService } from '../../core/services/pin-lock.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { ThemeService } from '../../core/services/theme.service';
import { ImageService } from '../../core/services/image.service';
import { WeatherService } from '../../core/services/weather.service';
import { LakeService } from '../../core/services/lake.service';
import { NotificationService } from '../../core/services/notification.service';
import { ResetService } from '../../core/services/reset.service';
import { DemoDataService } from '../../core/services/demo-data.service';
import { I18nService } from '../../core/services/i18n.service';
import { PwaInstallService } from '../../core/services/pwa-install.service';
import { ShareService } from '../../core/services/share.service';
import { SecretVaultService } from '../../core/services/secret-vault.service';
import { FishingModeService } from '../../core/services/fishing-mode.service';
import { UserOptionService } from '../../core/services/user-option.service';
import { Router } from '@angular/router';

const settingsState = signal({
  themeMode: 'dark',
  language: 'en',
  weightUnit: 'kg',
  lengthUnit: 'cm',
  temperatureUnit: 'celsius',
  distanceUnit: 'm',
  lockTimeoutMinutes: 15,
  detailedWeatherEnabled: true,
  autoLoadWeather: true,
  useGpsForWeather: false,
  showWeatherWarnings: true,
  weatherRefreshMinutes: 15,
  gallerySortDefault: 'newest',
  galleryThumbnailSize: 'medium',
  galleryFavoritesFirst: false,
  defaultLakeId: undefined as string | undefined,
  maxRodCount: 3,
  timeFormat: '24h',
  firstDayOfWeek: 1 as 0 | 1,
  pinHash: 'hash',
  pinSalt: 'salt',
  pinEnabled: true,
});

describe('SettingsComponent', () => {
  const lock = vi.fn();
  const changePin = vi.fn<PinLockService['changePin']>().mockResolvedValue(true);
  const update = vi.fn<SettingsService['update']>();
  const shareAppViaWhatsApp = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: SettingsService,
          useValue: {
            settings: settingsState,
            get: () => settingsState(),
            update,
          },
        },
        {
          provide: BackupService,
          useValue: {
            export: vi.fn(),
            downloadJson: vi.fn(),
            import: vi.fn(),
          },
        },
        {
          provide: PinLockService,
          useValue: {
            lock,
            changePin,
          },
        },
        {
          provide: ConfirmService,
          useValue: {
            confirm: vi.fn().mockResolvedValue(false),
          },
        },
        {
          provide: ThemeService,
          useValue: {
            setTheme: vi.fn(),
          },
        },
        {
          provide: ImageService,
          useValue: {
            clearHomepageImage: vi.fn(),
          },
        },
        {
          provide: WeatherService,
          useValue: {
            clearCache: vi.fn(),
          },
        },
        {
          provide: LakeService,
          useValue: {
            watchAll: vi.fn().mockReturnValue(of([])),
          },
        },
        {
          provide: NotificationService,
          useValue: {
            success: vi.fn(),
            error: vi.fn(),
          },
        },
        {
          provide: ResetService,
          useValue: {
            resetCustomOptionsCategory: vi.fn(),
            resetAllCustomOptions: vi.fn(),
            resetFilters: vi.fn(),
            resetAppearance: vi.fn(),
            resetWeather: vi.fn(),
            resetSecurity: vi.fn(),
            resetAllSettings: vi.fn(),
            resetFullApplication: vi.fn(),
          },
        },
        {
          provide: DemoDataService,
          useValue: {
            generateForActiveMode: vi.fn(),
          },
        },
        {
          provide: I18nService,
          useValue: {
            supportedLanguages: ['en', 'nl', 'de'],
            setLanguage: vi.fn().mockResolvedValue(undefined),
            t: (key: string) => key,
          },
        },
        {
          provide: PwaInstallService,
          useValue: {
            canInstall: signal(false).asReadonly(),
            showIosHint: signal(false).asReadonly(),
            promptInstall: vi.fn(),
          },
        },
        {
          provide: ShareService,
          useValue: {
            shareAppViaWhatsApp,
          },
        },
        {
          provide: SecretVaultService,
          useValue: {
            aiApiKey: signal('').asReadonly(),
            getAiApiKey: () => '',
            setAiApiKey: vi.fn().mockResolvedValue(undefined),
            clearAiApiKey: vi.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: FishingModeService,
          useValue: {
            getActivePreferences: () => ({
              favoriteSpecies: [],
              favoriteBaits: [],
              favoriteRigs: [],
            }),
            updateActivePreferences: vi.fn(),
            getMode: () => 'carper',
          },
        },
        {
          provide: UserOptionService,
          useValue: {
            getSortedOptions: vi.fn().mockResolvedValue([]),
            saveOption: vi.fn(),
            toggleFavorite: vi.fn(),
            rename: vi.fn(),
          },
        },
        {
          provide: Router,
          useValue: { navigateByUrl: vi.fn() },
        },
      ],
    });
  });

  it('locks the app when logout is invoked', () => {
    const component = TestBed.runInInjectionContext(() => new SettingsComponent());

    component.logout();

    expect(lock).toHaveBeenCalledTimes(1);
  });

  it('shows mismatch message when PIN confirmation is invalid', async () => {
    const component = TestBed.runInInjectionContext(() => new SettingsComponent());
    component.newPin = '123456';
    component.confirmPin = '123450';

    await component.changePin();

    expect(component.message()).toBe('messages.pinMismatch');
    expect(changePin).not.toHaveBeenCalled();
  });

  it('updates lock timeout in settings service', () => {
    const component = TestBed.runInInjectionContext(() => new SettingsComponent());

    component.updateLockTimeout(25);

    expect(update).toHaveBeenCalledWith({ lockTimeoutMinutes: 25 });
  });

  it('opens mailto link for feedback', () => {
    const open = vi.fn();
    vi.stubGlobal('open', open);
    const component = TestBed.runInInjectionContext(() => new SettingsComponent());

    component.sendFeedback();

    expect(open).toHaveBeenCalledWith(
      `mailto:erwin.torrenga@live.nl?subject=${encodeURIComponent('settings.feedbackSubject')}`,
      '_self',
    );

    vi.unstubAllGlobals();
  });

  it('shares the app via WhatsApp', () => {
    const component = TestBed.runInInjectionContext(() => new SettingsComponent());

    component.shareViaWhatsApp();

    expect(shareAppViaWhatsApp).toHaveBeenCalledTimes(1);
  });
});
