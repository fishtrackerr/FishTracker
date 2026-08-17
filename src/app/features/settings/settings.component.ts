import { Component, inject, signal, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { firstValueFrom } from 'rxjs';
import { AssistantPrompt, BackupData, ThemeMode, USER_OPTION_VALUE_MAX_LENGTH, UserOption, UserOptionCategory, AppLanguage } from '../../core/models';
import { openFeedbackMailto } from '../../core/constants/feedback';
import { EU_COUNTRIES } from '../../core/constants/eu-countries';
import { AssistantPromptService } from '../../core/services/assistant-prompt.service';
import { BackupService } from '../../core/services/backup.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { DemoDataService } from '../../core/services/demo-data.service';
import { FishingModeService } from '../../core/services/fishing-mode.service';
import { I18nService } from '../../core/services/i18n.service';
import { ImageService } from '../../core/services/image.service';
import { LakeService } from '../../core/services/lake.service';
import { NotificationService } from '../../core/services/notification.service';
import { PhotoPickService } from '../../core/services/photo-pick.service';
import { PinLockService } from '../../core/services/pin-lock.service';
import { PwaInstallService } from '../../core/services/pwa-install.service';
import { ResetService } from '../../core/services/reset.service';
import { SecretVaultService } from '../../core/services/secret-vault.service';
import { SettingsService } from '../../core/services/settings.service';
import { ShareService } from '../../core/services/share.service';
import { ThemeService } from '../../core/services/theme.service';
import { UserOptionService } from '../../core/services/user-option.service';
import { WeatherService } from '../../core/services/weather.service';
import { ExpandableSectionComponent } from '../../shared/components/expandable-section/expandable-section.component';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { AssistantPromptDialogComponent } from '../assistant/assistant-prompt-dialog.component';

/** Reject backup files larger than this before parsing. */
const MAX_BACKUP_FILE_BYTES = 50 * 1024 * 1024;

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    PageTitleComponent,
    ExpandableSectionComponent,
    TranslatePipe,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  private readonly settingsService = inject(SettingsService);
  private readonly backupService = inject(BackupService);
  private readonly pinLock = inject(PinLockService);
  private readonly vault = inject(SecretVaultService);
  private readonly confirm = inject(ConfirmService);
  private readonly theme = inject(ThemeService);
  private readonly imageService = inject(ImageService);
  private readonly photoPick = inject(PhotoPickService);
  private readonly weatherService = inject(WeatherService);
  private readonly lakeService = inject(LakeService);
  private readonly notifications = inject(NotificationService);
  private readonly resetService = inject(ResetService);
  private readonly demoData = inject(DemoDataService);
  private readonly i18n = inject(I18nService);
  readonly pwaInstall = inject(PwaInstallService);
  private readonly share = inject(ShareService);
  private readonly userOptions = inject(UserOptionService);
  private readonly fishingMode = inject(FishingModeService);
  private readonly assistantPrompts = inject(AssistantPromptService);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  readonly settings = this.settingsService.settings;
  readonly modePreferences = () => this.fishingMode.getActivePreferences();
  readonly aiApiKey = this.vault.aiApiKey;
  readonly supportedLanguages = this.i18n.supportedLanguages;
  readonly lakes = toSignal(this.lakeService.watchAll(), { initialValue: [] });
  readonly customPrompts = toSignal(this.assistantPrompts.watchAll(), { initialValue: [] as AssistantPrompt[] });
  readonly selectPanelClass = this.theme.getSelectPanelClass();
  readonly countryOptions = EU_COUNTRIES;
  readonly message = signal('');
  readonly exporting = signal(false);
  readonly generatingDemo = signal(false);
  readonly changingHomepage = signal(false);
  readonly fullResetInput = signal('');
  readonly managedOptions = signal<Record<UserOptionCategory, UserOption[]>>({
    species: [],
    bait: [],
    baitFlavor: [],
    rig: [],
    hookSize: [],
    lineType: [],
    method: [],
    weatherType: [],
    tag: [],
  });
  readonly optionCategories: UserOptionCategory[] = [
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

  oldPin = '';
  newPin = '';
  confirmPin = '';

  ngOnInit(): void {
    void this.bootstrapOptions();
  }

  private async bootstrapOptions(): Promise<void> {
    try {
      await this.userOptions.ensureDefaultsForCurrentMode();
    } catch (error) {
      console.error('[Settings] ensure option defaults failed', error);
    }
    await this.reloadManagedOptions();
  }

  updateUnits(field: 'weightUnit' | 'lengthUnit' | 'temperatureUnit' | 'distanceUnit', value: string): void {
    this.settingsService.update({ [field]: value });
  }

  updateTheme(mode: ThemeMode): void {
    this.theme.setTheme(mode);
  }

  updateLanguage(language: AppLanguage): void {
    void this.i18n.setLanguage(language);
  }

  async installApp(): Promise<void> {
    await this.pwaInstall.promptInstall();
  }

  sendFeedback(): void {
    openFeedbackMailto(this.i18n.t('settings.feedbackSubject'));
  }

  shareViaWhatsApp(): void {
    this.share.shareAppViaWhatsApp();
  }

  updateSetting<K extends keyof ReturnType<SettingsService['get']>>(
    field: K,
    value: ReturnType<SettingsService['get']>[K],
  ): void {
    this.settingsService.update({ [field]: value });
  }

  updateDefaultLake(lakeId: string | undefined): void {
    this.fishingMode.updateActivePreferences({ defaultLakeId: lakeId });
  }

  updateDefaultCountry(country: string): void {
    this.settingsService.update({ defaultCountry: country || undefined });
  }

  updateLockTimeout(value: number): void {
    this.settingsService.update({ lockTimeoutMinutes: value });
  }

  async changePin(): Promise<void> {
    if (this.newPin.length !== 6 || this.newPin !== this.confirmPin) {
      this.message.set(this.i18n.t('messages.pinMismatch'));
      return;
    }
    const ok = await this.pinLock.changePin(this.oldPin, this.newPin);
    this.message.set(ok ? this.i18n.t('messages.pinChanged') : this.i18n.t('messages.pinIncorrect'));
    this.oldPin = this.newPin = this.confirmPin = '';
  }

  logout(): void {
    this.pinLock.lock();
  }

  async exportBackup(): Promise<void> {
    this.exporting.set(true);
    try {
      const data = await this.backupService.export();
      this.backupService.downloadJson(data);
      this.message.set(this.i18n.t('messages.backupExported'));
    } catch {
      this.message.set(this.i18n.t('messages.exportFailed'));
    } finally {
      this.exporting.set(false);
    }
  }

  async generateDemoData(): Promise<void> {
    const ok = await this.confirm.confirm({
      title: this.i18n.t('settings.generateDemoTitle'),
      message: this.i18n.t('settings.generateDemoMessage'),
      confirmLabel: this.i18n.t('settings.generateDemoConfirm'),
    });
    if (!ok) {
      return;
    }
    this.generatingDemo.set(true);
    try {
      const result = await this.demoData.generateForActiveMode();
      this.notifications.success(
        this.i18n.t('settings.generateDemoSuccess', {
          lakes: String(result.lakes),
          sessions: String(result.sessions),
          catches: String(result.catches),
        }),
      );
    } catch (error) {
      console.error('[Settings] Demo data generation failed', error);
      this.notifications.error(this.i18n.t('settings.generateDemoFailed'));
    } finally {
      this.generatingDemo.set(false);
    }
  }

  async importBackup(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    try {
      if (file.size > MAX_BACKUP_FILE_BYTES) {
        throw new Error('Backup file is too large');
      }
      const text = await file.text();
      const raw = JSON.parse(text) as unknown;
      const preview = this.backupService.validate(raw);
      const summary = this.i18n.t('settings.importPreview', {
        sessions: String(preview.sessionCount),
        catches: String(preview.catchCount),
        lakes: String(preview.lakeCount),
        images: String(preview.imageCount),
      });
      const ok = await this.confirm.confirm({
        title: this.i18n.t('settings.importConfirmTitle'),
        message: `${summary}\n\n${this.i18n.t('settings.importConfirmMessage')}`,
        confirmLabel: this.i18n.t('common.import'),
      });
      if (!ok) {
        input.value = '';
        return;
      }
      await this.backupService.import(raw as BackupData);
      this.message.set(this.i18n.t('messages.backupRestored'));
    } catch {
      this.message.set(this.i18n.t('messages.importFailed'));
    }
    input.value = '';
  }

  clearWeatherCache(): void {
    this.weatherService.clearCache();
    this.notifications.success(this.i18n.t('messages.weatherCacheCleared'));
  }

  updateAiApiKey(value: string): void {
    void this.vault.setAiApiKey(value || undefined);
  }

  clearAiKey(): void {
    void this.vault.clearAiApiKey().then(() => {
      this.notifications.success(this.i18n.t('settings.aiKeyCleared'));
    });
  }

  async changeHomepageImage(): Promise<void> {
    if (this.changingHomepage()) {
      return;
    }
    const file = await this.photoPick.pickImage({ capture: false });
    if (!file) {
      return;
    }
    this.changingHomepage.set(true);
    try {
      const id = await this.imageService.processFile(file, 'cover');
      await this.imageService.setHomepageImage(id);
      this.notifications.success(this.i18n.t('gallery.homepageUpdated'));
    } catch {
      this.notifications.error(this.i18n.t('images.uploadFailed'));
    } finally {
      this.changingHomepage.set(false);
    }
  }

  async clearHomepageImage(): Promise<void> {
    await this.imageService.clearHomepageImage();
    this.notifications.success(this.i18n.t('settings.homepageImageCleared'));
  }

  async resetOptionCategory(category: UserOptionCategory): Promise<void> {
    const categoryLabel = this.categoryLabel(category);
    const ok = await this.confirm.confirm({
      title: `${this.i18n.t('common.reset')} ${categoryLabel}?`,
      message: this.i18n.t('settings.customOptions'),
      confirmLabel: this.i18n.t('common.reset'),
    });
    if (!ok) return;
    await this.resetService.resetCustomOptionsCategory(category, true);
    await this.reloadManagedOptions();
    this.notifications.success(`${categoryLabel} ${this.i18n.t('common.reset')}`);
  }

  async resetAllCustomOptions(): Promise<void> {
    const ok = await this.confirm.confirm({
      title: this.i18n.t('settings.resetAllCustomTitle'),
      message: this.i18n.t('settings.resetAllCustomMessage'),
      confirmLabel: this.i18n.t('settings.resetAllCustomConfirm'),
    });
    if (!ok) return;
    await this.resetService.resetAllCustomOptions(true);
    await this.reloadManagedOptions();
    this.notifications.success(this.i18n.t('settings.customOptionsReset'));
  }

  async renameOption(option: UserOption): Promise<void> {
    const next = window.prompt(
      this.i18n.t('settings.renameOptionPrompt', { value: option.value }),
      option.value,
    );
    if (next == null) {
      return;
    }
    const trimmed = next.trim().slice(0, USER_OPTION_VALUE_MAX_LENGTH);
    if (!trimmed || trimmed === option.value) {
      return;
    }
    try {
      await this.userOptions.rename(option.id, trimmed);
      await this.reloadManagedOptions();
      this.notifications.success(this.i18n.t('settings.optionRenamed'));
    } catch (error) {
      console.error('[Settings] rename option failed', error);
      this.notifications.error(this.i18n.t('common.errorGeneric'));
    }
  }

  async addOption(category: UserOptionCategory): Promise<void> {
    const next = window.prompt(this.i18n.t('settings.addOptionPrompt', { category: this.categoryLabel(category) }));
    if (next == null) {
      return;
    }
    const trimmed = next.trim().slice(0, USER_OPTION_VALUE_MAX_LENGTH);
    if (!trimmed) {
      return;
    }
    try {
      await this.userOptions.saveOption(category, trimmed);
      await this.reloadManagedOptions();
      this.notifications.success(this.i18n.t('settings.optionAdded'));
    } catch (error) {
      console.error('[Settings] add option failed', error);
      this.notifications.error(this.i18n.t('common.errorGeneric'));
    }
  }

  async deleteOption(option: UserOption): Promise<void> {
    const ok = await this.confirm.confirm({
      title: this.i18n.t('settings.deleteOptionTitle'),
      message: this.i18n.t('settings.deleteOptionMessage', { value: option.value }),
      confirmLabel: this.i18n.t('common.delete'),
    });
    if (!ok) {
      return;
    }
    try {
      await this.userOptions.deleteOption(option.id);
      await this.reloadManagedOptions();
      this.notifications.success(this.i18n.t('settings.optionDeleted'));
    } catch (error) {
      console.error('[Settings] delete option failed', error);
      this.notifications.error(this.i18n.t('common.errorGeneric'));
    }
  }

  async addPrompt(): Promise<void> {
    const result = await firstValueFrom(
      this.dialog.open(AssistantPromptDialogComponent, {
        data: {},
        width: '420px',
        maxWidth: '95vw',
      }).afterClosed(),
    );
    if (!result) {
      return;
    }
    try {
      await this.assistantPrompts.create(result);
      this.notifications.success(this.i18n.t('settings.promptSaved'));
    } catch (error) {
      console.error('[Settings] create prompt failed', error);
      this.notifications.error(this.i18n.t('common.errorGeneric'));
    }
  }

  async editPrompt(prompt: AssistantPrompt): Promise<void> {
    const result = await firstValueFrom(
      this.dialog.open(AssistantPromptDialogComponent, {
        data: { prompt },
        width: '420px',
        maxWidth: '95vw',
      }).afterClosed(),
    );
    if (!result) {
      return;
    }
    try {
      await this.assistantPrompts.update(prompt.id, result);
      this.notifications.success(this.i18n.t('settings.promptSaved'));
    } catch (error) {
      console.error('[Settings] update prompt failed', error);
      this.notifications.error(this.i18n.t('common.errorGeneric'));
    }
  }

  async deletePrompt(prompt: AssistantPrompt): Promise<void> {
    const ok = await this.confirm.confirm({
      title: this.i18n.t('settings.deletePromptTitle'),
      message: this.i18n.t('settings.deletePromptMessage', { title: prompt.title }),
      confirmLabel: this.i18n.t('common.delete'),
    });
    if (!ok) {
      return;
    }
    try {
      await this.assistantPrompts.delete(prompt.id);
      this.notifications.success(this.i18n.t('settings.promptDeleted'));
    } catch (error) {
      console.error('[Settings] delete prompt failed', error);
      this.notifications.error(this.i18n.t('common.errorGeneric'));
    }
  }

  private async reloadManagedOptions(): Promise<void> {
    const next = { ...this.managedOptions() };
    for (const category of this.optionCategories) {
      next[category] = await this.userOptions.getSortedOptions(category);
    }
    this.managedOptions.set(next);
  }

  async resetFilters(): Promise<void> {
    const ok = await this.confirm.confirm({
      title: this.i18n.t('settings.resetFiltersTitle'),
      message: this.i18n.t('settings.resetFiltersMessage'),
      confirmLabel: this.i18n.t('settings.resetFiltersConfirm'),
    });
    if (!ok) return;
    this.resetService.resetFilters();
    this.notifications.success(this.i18n.t('settings.filtersReset'));
  }

  async resetAppearance(): Promise<void> {
    const ok = await this.confirm.confirm({
      title: this.i18n.t('settings.resetAppearanceTitle'),
      message: this.i18n.t('settings.resetAppearanceMessage'),
      confirmLabel: this.i18n.t('common.reset'),
    });
    if (!ok) return;
    await this.resetService.resetAppearance();
    this.notifications.success(this.i18n.t('settings.appearanceReset'));
  }

  async resetWeatherSettings(): Promise<void> {
    const ok = await this.confirm.confirm({
      title: this.i18n.t('settings.resetWeatherTitle'),
      message: this.i18n.t('settings.resetWeatherMessage'),
      confirmLabel: this.i18n.t('common.reset'),
    });
    if (!ok) return;
    this.resetService.resetWeather();
    this.notifications.success(this.i18n.t('settings.weatherSettingsReset'));
  }

  async resetSecuritySettings(): Promise<void> {
    const ok = await this.confirm.confirm({
      title: this.i18n.t('settings.resetSecurityTitle'),
      message: this.i18n.t('settings.resetSecurityMessage'),
      confirmLabel: this.i18n.t('common.reset'),
    });
    if (!ok) return;
    this.resetService.resetSecurity();
    this.notifications.success(this.i18n.t('settings.securitySettingsReset'));
  }

  async resetAllSettings(): Promise<void> {
    const ok = await this.confirm.confirm({
      title: this.i18n.t('settings.resetAllSettingsTitle'),
      message: this.i18n.t('settings.resetAllSettingsMessage'),
      confirmLabel: this.i18n.t('settings.resetSettingsConfirm'),
    });
    if (!ok) return;
    await this.resetService.resetAllSettings();
    this.notifications.success(this.i18n.t('settings.allSettingsReset'));
  }

  async resetCurrentMode(): Promise<void> {
    const ok = await this.confirm.confirm({
      title: this.i18n.t('settings.resetCurrentModeTitle'),
      message: this.i18n.t('settings.resetCurrentModeMessage'),
      confirmLabel: this.i18n.t('settings.resetCurrentModeConfirm'),
    });
    if (!ok) return;
    await this.resetService.resetCurrentMode();
    await this.reloadManagedOptions();
    this.notifications.success(this.i18n.t('settings.currentModeReset'));
  }

  async resetFullApplication(): Promise<void> {
    const exportFirst = await this.confirm.confirm({
      title: this.i18n.t('settings.exportBeforeResetTitle'),
      message: this.i18n.t('settings.exportBeforeResetMessage'),
      confirmLabel: this.i18n.t('settings.exportBackupConfirm'),
    });
    if (exportFirst) {
      await this.exportBackup();
    }
    const typed = this.fullResetInput().trim();
    if (typed !== 'RESET') {
      this.notifications.error(this.i18n.t('messages.fullResetTypeReset'));
      return;
    }
    const ok = await this.confirm.confirm({
      title: this.i18n.t('settings.resetEntireTitle'),
      message: this.i18n.t('settings.resetEntireMessage'),
      confirmLabel: this.i18n.t('settings.deleteEverythingConfirm'),
    });
    if (!ok) return;
    await this.resetService.resetFullApplication();
    this.fullResetInput.set('');
    this.notifications.success(this.i18n.t('messages.applicationResetComplete'));
    await this.router.navigateByUrl('/mode-select');
  }

  languageLabel(language: AppLanguage): string {
    if (language === 'nl') return 'Nederlands';
    if (language === 'en') return 'English';
    return 'Deutsch';
  }

  categoryLabel(category: UserOptionCategory): string {
    return this.i18n.t(`options.category.${category}`);
  }
}
