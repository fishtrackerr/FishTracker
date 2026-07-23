import { Component, inject, signal } from '@angular/core';
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
import { ConfirmService } from '../../core/services/confirm.service';
import { ThemeService } from '../../core/services/theme.service';
import { ImageService } from '../../core/services/image.service';
import { WeatherService } from '../../core/services/weather.service';
import { LakeService } from '../../core/services/lake.service';
import { NotificationService } from '../../core/services/notification.service';
import { ResetService } from '../../core/services/reset.service';
import { BackupData, ThemeMode, UserOptionCategory } from '../../core/models';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';

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
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  private readonly settingsService = inject(SettingsService);
  private readonly backupService = inject(BackupService);
  private readonly pinLock = inject(PinLockService);
  private readonly confirm = inject(ConfirmService);
  private readonly theme = inject(ThemeService);
  private readonly imageService = inject(ImageService);
  private readonly weatherService = inject(WeatherService);
  private readonly lakeService = inject(LakeService);
  private readonly notifications = inject(NotificationService);
  private readonly resetService = inject(ResetService);

  readonly settings = this.settingsService.settings;
  readonly lakes = toSignal(this.lakeService.watchAll(), { initialValue: [] });
  readonly message = signal('');
  readonly exporting = signal(false);
  readonly fullResetInput = signal('');
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

  updateUnits(field: 'weightUnit' | 'lengthUnit' | 'temperatureUnit' | 'distanceUnit', value: string): void {
    this.settingsService.update({ [field]: value });
  }

  updateTheme(mode: ThemeMode): void {
    this.theme.setTheme(mode);
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
      this.message.set('PIN must be 6 digits and match confirmation');
      return;
    }
    const ok = await this.pinLock.changePin(this.oldPin, this.newPin);
    this.message.set(ok ? 'PIN changed' : 'Current PIN incorrect');
    this.oldPin = this.newPin = this.confirmPin = '';
  }

  lockNow(): void {
    this.pinLock.lock();
  }

  async exportBackup(): Promise<void> {
    this.exporting.set(true);
    try {
      const data = await this.backupService.export();
      this.backupService.downloadJson(data);
      this.message.set('Backup exported');
    } catch {
      this.message.set('Export failed');
    } finally {
      this.exporting.set(false);
    }
  }

  async importBackup(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const ok = await this.confirm.confirm({
      title: 'Import backup?',
      message: 'This will replace all data. This action cannot be undone.',
      confirmLabel: 'Import',
    });
    if (!ok) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text) as BackupData;
      await this.backupService.import(data);
      this.message.set('Backup restored successfully');
    } catch {
      this.message.set('Import failed — invalid backup file');
    }
    input.value = '';
  }

  clearWeatherCache(): void {
    localStorage.removeItem('fish-tracker-weather-cache');
    this.notifications.success('Weather cache cleared');
  }

  async clearHomepageImage(): Promise<void> {
    await this.imageService.clearHomepageImage();
    this.notifications.success('Homepage image cleared');
  }

  async resetOptionCategory(category: UserOptionCategory): Promise<void> {
    const ok = await this.confirm.confirm({
      title: `Reset ${category} options?`,
      message: 'Custom options in this category will be removed. Defaults are restored.',
      confirmLabel: 'Reset',
    });
    if (!ok) return;
    await this.resetService.resetCustomOptionsCategory(category, true);
    this.notifications.success(`${category} options reset`);
  }

  async resetAllCustomOptions(): Promise<void> {
    const ok = await this.confirm.confirm({
      title: 'Reset all custom options?',
      message: 'All custom dropdown options will be removed. Favorites are kept where possible.',
      confirmLabel: 'Reset all',
    });
    if (!ok) return;
    await this.resetService.resetAllCustomOptions(true);
    this.notifications.success('Custom options reset');
  }

  async resetFilters(): Promise<void> {
    const ok = await this.confirm.confirm({
      title: 'Reset filters?',
      message: 'Saved filter presets and active filters will be cleared.',
      confirmLabel: 'Reset filters',
    });
    if (!ok) return;
    this.resetService.resetFilters();
    this.notifications.success('Filters reset');
  }

  async resetAppearance(): Promise<void> {
    const ok = await this.confirm.confirm({
      title: 'Reset appearance?',
      message: 'Theme, gallery preferences, expanded card states, and homepage image will be reset.',
      confirmLabel: 'Reset',
    });
    if (!ok) return;
    await this.resetService.resetAppearance();
    this.notifications.success('Appearance reset');
  }

  async resetWeatherSettings(): Promise<void> {
    const ok = await this.confirm.confirm({
      title: 'Reset weather settings?',
      message: 'Weather cache and provider settings will be restored to defaults.',
      confirmLabel: 'Reset',
    });
    if (!ok) return;
    this.resetService.resetWeather();
    this.notifications.success('Weather settings reset');
  }

  async resetSecuritySettings(): Promise<void> {
    const ok = await this.confirm.confirm({
      title: 'Reset security settings?',
      message: 'Auto-lock timeout will reset. Your PIN is kept unless you remove it separately.',
      confirmLabel: 'Reset',
    });
    if (!ok) return;
    this.resetService.resetSecurity();
    this.notifications.success('Security settings reset');
  }

  async resetAllSettings(): Promise<void> {
    const ok = await this.confirm.confirm({
      title: 'Reset all settings?',
      message: 'All preferences will reset to defaults. Fishing data is not deleted.',
      confirmLabel: 'Reset settings',
    });
    if (!ok) return;
    await this.resetService.resetAllSettings();
    this.notifications.success('All settings reset');
  }

  async resetFullApplication(): Promise<void> {
    const exportFirst = await this.confirm.confirm({
      title: 'Export before reset?',
      message: 'Full reset permanently deletes all locally stored data. Export a backup first?',
      confirmLabel: 'Export backup',
    });
    if (exportFirst) {
      await this.exportBackup();
    }
    const typed = this.fullResetInput().trim();
    if (typed !== 'RESET') {
      this.notifications.error('Type RESET to confirm full application reset.');
      return;
    }
    const ok = await this.confirm.confirm({
      title: 'Reset entire application?',
      message: 'This permanently removes all sessions, catches, lakes, images, profile, and settings.',
      confirmLabel: 'Delete everything',
    });
    if (!ok) return;
    await this.resetService.resetFullApplication();
    this.fullResetInput.set('');
    this.notifications.success('Application reset complete');
  }
}
