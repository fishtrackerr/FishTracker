import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { of } from 'rxjs';
import { SettingsComponent } from './settings.component';
import { SettingsService } from '../../core/services/settings.service';
import { BackupService, BackupSaveCancelledError } from '../../core/services/backup.service';
import { PinLockService } from '../../core/services/pin-lock.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { ThemeService } from '../../core/services/theme.service';
import { ImageService } from '../../core/services/image.service';
import { PhotoPickService } from '../../core/services/photo-pick.service';
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
import { AssistantPromptService } from '../../core/services/assistant-prompt.service';
import { DialogService } from '../../core/services/dialog.service';
import { TextPromptDialogComponent } from '../../shared/components/text-prompt-dialog/text-prompt-dialog.component';
import { AssistantPromptDialogComponent } from '../assistant/assistant-prompt-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStartupService } from '../../core/services/app-startup.service';

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
            saveToFile: vi.fn().mockResolvedValue(undefined),
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
            getSelectPanelClass: () => '',
          },
        },
        {
          provide: ImageService,
          useValue: {
            clearHomepageImage: vi.fn(),
          },
        },
        {
          provide: PhotoPickService,
          useValue: {
            pickImage: vi.fn(),
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
          provide: AssistantPromptService,
          useValue: {
            watchAll: vi.fn().mockReturnValue(of([])),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
          },
        },
        {
          provide: DialogService,
          useValue: {
            open: vi.fn(),
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
            language: () => 'en',
            dictionary: () => ({}),
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
            canPersist: signal(true).asReadonly(),
            getAiApiKey: () => '',
            setAiApiKey: vi.fn().mockResolvedValue(true),
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
            setMode: vi.fn(),
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
            deleteOption: vi.fn(),
            ensureDefaultsForCurrentMode: vi.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: Router,
          useValue: { navigateByUrl: vi.fn(), events: of(), createUrlTree: vi.fn(), serializeUrl: vi.fn(() => '') },
        },
        { provide: ActivatedRoute, useValue: {} },
        {
          provide: AppStartupService,
          useValue: { resolveUnlockedDestination: vi.fn().mockResolvedValue('/') },
        },
      ],
    });
  });

  describe('changeFishingMode', () => {
    function setup(answer: boolean) {
      const confirm = TestBed.inject(ConfirmService).confirm as ReturnType<typeof vi.fn>;
      confirm.mockResolvedValueOnce(answer);
      const component = TestBed.runInInjectionContext(() => new SettingsComponent());
      return {
        component,
        confirm,
        mode: TestBed.inject(FishingModeService),
        router: TestBed.inject(Router),
        startup: TestBed.inject(AppStartupService),
      };
    }

    it('lists every fishing mode', () => {
      const { component } = setup(false);
      expect(component.fishingModes).toEqual([
        'carper',
        'catfish',
        'pike',
        'bass',
        'feeder',
        'general',
      ]);
    });

    it('does nothing for the already active mode', async () => {
      const { component, confirm, mode } = setup(true);
      await component.changeFishingMode('carper');
      expect(confirm).not.toHaveBeenCalled();
      expect(mode.setMode).not.toHaveBeenCalled();
    });

    it('keeps the mode when the switch is declined', async () => {
      const { component, mode, router } = setup(false);
      await component.changeFishingMode('pike');
      expect(mode.setMode).not.toHaveBeenCalled();
      expect(router.navigateByUrl).not.toHaveBeenCalled();
    });

    it('switches mode and navigates to the resolved destination after confirm', async () => {
      const { component, mode, router, startup } = setup(true);
      vi.mocked(startup.resolveUnlockedDestination).mockResolvedValueOnce('/sessions/active');
      await component.changeFishingMode('pike');
      expect(mode.setMode).toHaveBeenCalledWith('pike');
      expect(startup.resolveUnlockedDestination).toHaveBeenCalledWith('/');
      expect(router.navigateByUrl).toHaveBeenCalledWith('/sessions/active');
    });

    it('seeds the options of the new mode after switching, before navigating', async () => {
      const { component, mode, router } = setup(true);
      const ensure = TestBed.inject(UserOptionService).ensureDefaultsForCurrentMode as ReturnType<
        typeof vi.fn
      >;
      await component.changeFishingMode('pike');
      expect(ensure).toHaveBeenCalled();
      expect(vi.mocked(mode.setMode).mock.invocationCallOrder[0]).toBeLessThan(
        ensure.mock.invocationCallOrder[0],
      );
      expect(ensure.mock.invocationCallOrder[0]).toBeLessThan(
        vi.mocked(router.navigateByUrl).mock.invocationCallOrder[0],
      );
    });

    it('snaps the rendered select back to the current mode when the switch is declined', async () => {
      const confirm = TestBed.inject(ConfirmService).confirm as ReturnType<typeof vi.fn>;
      confirm.mockResolvedValueOnce(false);
      const fixture = TestBed.createComponent(SettingsComponent);
      fixture.detectChanges();
      await fixture.whenStable();
      const select = fixture.componentInstance.modeSelect();
      expect(select).toBeTruthy();
      expect(select!.value).toBe('carper');
      select!.writeValue('pike');
      expect(select!.value).toBe('pike');
      await fixture.componentInstance.changeFishingMode('pike');
      fixture.detectChanges();
      expect(select!.value).toBe('carper');
    });
  });

  describe('lock timeout', () => {
    it('offers fixed choices with 0 as only-at-start', () => {
      const component = TestBed.runInInjectionContext(() => new SettingsComponent());
      settingsState.update((s) => ({ ...s, lockTimeoutMinutes: 15 }));
      expect(component.lockTimeoutOptions()).toEqual([5, 15, 30, 60, 240, 0]);
      expect(component.lockTimeoutLabel(0)).toBe('settings.lockOptionStart');
      expect(component.lockTimeoutLabel(60)).toBe('settings.lockOptionHour');
      expect(component.lockTimeoutLabel(240)).toBe('settings.lockOptionHours');
    });

    it('keeps a legacy custom value selectable', () => {
      const component = TestBed.runInInjectionContext(() => new SettingsComponent());
      settingsState.update((s) => ({ ...s, lockTimeoutMinutes: 7 }));
      expect(component.lockTimeoutOptions()).toEqual([5, 7, 15, 30, 60, 240, 0]);
      settingsState.update((s) => ({ ...s, lockTimeoutMinutes: 15 }));
    });

    it('stores the chosen value', () => {
      const component = TestBed.runInInjectionContext(() => new SettingsComponent());
      component.updateLockTimeout(0);
      expect(update).toHaveBeenCalledWith({ lockTimeoutMinutes: 0 });
    });
  });

  describe('resetFullApplication', () => {
    function setup(confirmAnswers: boolean[]) {
      const confirm = TestBed.inject(ConfirmService).confirm as ReturnType<typeof vi.fn>;
      confirmAnswers.forEach((answer) => confirm.mockResolvedValueOnce(answer));
      const backup = TestBed.inject(BackupService);
      vi.mocked(backup.export).mockResolvedValue({} as never);
      const component = TestBed.runInInjectionContext(() => new SettingsComponent());
      component.fullResetInput.set('RESET');
      return { component, confirm, backup, reset: TestBed.inject(ResetService) };
    }

    it('asks nothing when RESET was not typed', async () => {
      const { component, confirm, reset } = setup([]);
      component.fullResetInput.set('reset?');

      await component.resetFullApplication();

      expect(confirm).not.toHaveBeenCalled();
      expect(reset.resetFullApplication).not.toHaveBeenCalled();
    });

    it('stops when the requested backup could not be saved', async () => {
      const { component, backup, reset } = setup([true, true]);
      vi.mocked(backup.saveToFile).mockRejectedValueOnce(new Error('disk full'));

      await component.resetFullApplication();

      expect(reset.resetFullApplication).not.toHaveBeenCalled();
      expect(TestBed.inject(NotificationService).error).toHaveBeenCalledWith(
        'messages.fullResetExportFailed',
      );
    });

    it('stops when the share sheet is dismissed', async () => {
      const { component, backup, reset } = setup([true, true]);
      vi.mocked(backup.saveToFile).mockRejectedValueOnce(new BackupSaveCancelledError());

      await component.resetFullApplication();

      expect(reset.resetFullApplication).not.toHaveBeenCalled();
      expect(component.message()).toBe('messages.exportCancelled');
    });

    it('resets after a saved backup and the final confirm', async () => {
      const { component, backup, reset } = setup([true, true]);

      await component.resetFullApplication();

      expect(backup.saveToFile).toHaveBeenCalledTimes(1);
      expect(reset.resetFullApplication).toHaveBeenCalledTimes(1);
    });

    it('resets without a backup when export is declined', async () => {
      const { component, backup, reset } = setup([false, true]);

      await component.resetFullApplication();

      expect(backup.saveToFile).not.toHaveBeenCalled();
      expect(reset.resetFullApplication).toHaveBeenCalledTimes(1);
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

  describe('option prompts', () => {
    function dialogReturning(value: string | undefined) {
      const open = TestBed.inject(DialogService).open as ReturnType<typeof vi.fn>;
      open.mockReturnValue({ afterClosed: () => of(value) });
      return open;
    }

    it('adds an option through the themed text prompt', async () => {
      const open = dialogReturning('  Tench  ');
      const component = TestBed.runInInjectionContext(() => new SettingsComponent());

      await component.addOption('species');

      expect(open).toHaveBeenCalledWith(TextPromptDialogComponent, expect.anything());
      expect(TestBed.inject(UserOptionService).saveOption).toHaveBeenCalledWith('species', 'Tench');
    });

    it('does not add an option when the prompt is cancelled', async () => {
      dialogReturning(undefined);
      const component = TestBed.runInInjectionContext(() => new SettingsComponent());

      await component.addOption('species');

      expect(TestBed.inject(UserOptionService).saveOption).not.toHaveBeenCalled();
    });

    it('renames an option with the prompt prefilled', async () => {
      const open = dialogReturning('Mirror carp');
      const component = TestBed.runInInjectionContext(() => new SettingsComponent());

      await component.renameOption({ id: 'opt-1', value: 'Carp' } as never);

      expect(open).toHaveBeenCalledWith(
        TextPromptDialogComponent,
        expect.objectContaining({ data: expect.objectContaining({ initialValue: 'Carp' }) }),
      );
      expect(TestBed.inject(UserOptionService).rename).toHaveBeenCalledWith('opt-1', 'Mirror carp');
    });

    it('skips rename when the value is unchanged', async () => {
      dialogReturning('Carp');
      const component = TestBed.runInInjectionContext(() => new SettingsComponent());

      await component.renameOption({ id: 'opt-1', value: 'Carp' } as never);

      expect(TestBed.inject(UserOptionService).rename).not.toHaveBeenCalled();
    });
  });

  it('opens the assistant prompt dialog through DialogService', async () => {
    const open = TestBed.inject(DialogService).open as ReturnType<typeof vi.fn>;
    open.mockReturnValue({ afterClosed: () => of(undefined) });
    const component = TestBed.runInInjectionContext(() => new SettingsComponent());

    await component.addPrompt();

    expect(open).toHaveBeenCalledWith(AssistantPromptDialogComponent, expect.objectContaining({ data: {} }));
    expect(TestBed.inject(AssistantPromptService).create).not.toHaveBeenCalled();
  });

  it('shares the app via WhatsApp', () => {
    const component = TestBed.runInInjectionContext(() => new SettingsComponent());

    component.shareViaWhatsApp();

    expect(shareAppViaWhatsApp).toHaveBeenCalledTimes(1);
  });
});
