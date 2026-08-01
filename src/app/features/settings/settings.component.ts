import { Component, inject, signal, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SettingsService } from '../../core/services/settings.service';
import { BackupService } from '../../core/services/backup.service';
import { PinLockService } from '../../core/services/pin-lock.service';
import { SecretVaultService } from '../../core/services/secret-vault.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { ThemeService } from '../../core/services/theme.service';
import { ImageService } from '../../core/services/image.service';
import { WeatherService } from '../../core/services/weather.service';
import { LakeService } from '../../core/services/lake.service';
import { NotificationService } from '../../core/services/notification.service';
import { ResetService } from '../../core/services/reset.service';
import { I18nService } from '../../core/services/i18n.service';
import { PwaInstallService } from '../../core/services/pwa-install.service';
import { ShareService } from '../../core/services/share.service';
import { UserOptionService } from '../../core/services/user-option.service';
import { BackupData, ThemeMode, UserOption, UserOptionCategory, AppLanguage } from '../../core/models';
import { openFeedbackMailto } from '../../core/constants/feedback';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { ExpandableSectionComponent } from '../../shared/components/expandable-section/expandable-section.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

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
    MatSlideToggleModule,
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
  private readonly weatherService = inject(WeatherService);
  private readonly lakeService = inject(LakeService);
  private readonly notifications = inject(NotificationService);
  private readonly resetService = inject(ResetService);
  private readonly i18n = inject(I18nService);
  readonly pwaInstall = inject(PwaInstallService);
  private readonly share = inject(ShareService);
  private readonly userOptions = inject(UserOptionService);

  readonly settings = this.settingsService.settings;
  readonly aiApiKey = this.vault.aiApiKey;
  readonly supportedLanguages = this.i18n.supportedLanguages;
  readonly lakes = toSignal(this.lakeService.watchAll(), { initialValue: [] });
  readonly message = signal('');
  readonly exporting = signal(false);
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
    void this.reloadManagedOptions();
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
    const trimmed = next.trim();
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
