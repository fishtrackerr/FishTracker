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
import { I18nService } from '../../core/services/i18n.service';

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
          useValue: {},
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
          provide: I18nService,
          useValue: {
            supportedLanguages: ['en', 'nl', 'de'],
            setLanguage: vi.fn().mockResolvedValue(undefined),
            t: (key: string) => key,
          },
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
});
