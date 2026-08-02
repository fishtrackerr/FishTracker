import { ChangeDetectionStrategy, Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppVersionService, hardReloadApp } from '../../core/services/app-version.service';
import { PinLockService } from '../../core/services/pin-lock.service';
import { AppStartupService } from '../../core/services/app-startup.service';
import { I18nService } from '../../core/services/i18n.service';
import { SwUpdateService } from '../../core/services/sw-update.service';
import { isNativeApp } from '../../core/utils/platform';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-pin-unlock',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule, TranslatePipe],
  templateUrl: './pin-unlock.component.html',
  styleUrl: '../pin-setup/pin.component.css',
})
export class PinUnlockComponent {
  private readonly pinLock = inject(PinLockService);
  private readonly router = inject(Router);
  private readonly startup = inject(AppStartupService);
  private readonly i18n = inject(I18nService);
  private readonly swUpdate = inject(SwUpdateService);
  private readonly appVersion = inject(AppVersionService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly pin = signal('');
  readonly error = signal('');
  readonly version = this.appVersion.version;
  readonly checkingForUpdates = signal(false);
  readonly lockoutActive = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      void this.appVersion.refreshInstalledVersion();
      this.refreshLockoutMessage();
    }
  }

  addDigit(d: string): void {
    if (this.pinLock.getLockoutRemainingMs() > 0) {
      this.refreshLockoutMessage();
      return;
    }
    this.error.set('');
    this.lockoutActive.set(false);
    if (this.pin().length < 6) {
      this.pin.update((p) => p + d);
      if (this.pin().length === 6) {
        void this.verify();
      }
    }
  }

  removeDigit(): void {
    if (this.pinLock.getLockoutRemainingMs() > 0) {
      return;
    }
    this.error.set('');
    this.pin.update((p) => p.slice(0, -1));
  }

  async checkForUpdates(): Promise<void> {
    this.checkingForUpdates.set(true);

    try {
      // Keep label on the running build; SW prompt handles activate + hard reload.
      const checked = await this.swUpdate.checkForUpdatesNow();
      await this.appVersion.refreshInstalledVersion();
      // Capacitor has no SW updates — refresh the WebView via a clean entry load.
      if (!checked && isNativeApp()) {
        hardReloadApp();
      }
    } finally {
      this.checkingForUpdates.set(false);
    }
  }

  async verify(): Promise<void> {
    const result = await this.pinLock.verifyPin(this.pin());
    if (result.ok) {
      const returnUrl = this.startup.consumeReturnUrl();
      const target = await this.startup.resolveInitialRoute(returnUrl);
      await this.router.navigateByUrl(target);
      return;
    }

    this.pin.set('');
    if (result.reason === 'lockout') {
      this.lockoutActive.set(true);
      this.error.set(
        this.i18n.t('pin.lockout', {
          seconds: String(Math.ceil((result.lockoutRemainingMs ?? 0) / 1000)),
        }),
      );
      return;
    }
    this.lockoutActive.set(false);
    this.error.set(this.i18n.t('pin.incorrectPin'));
  }

  private refreshLockoutMessage(): void {
    const remaining = this.pinLock.getLockoutRemainingMs();
    if (remaining > 0) {
      this.lockoutActive.set(true);
      this.error.set(
        this.i18n.t('pin.lockout', {
          seconds: String(Math.ceil(remaining / 1000)),
        }),
      );
    }
  }
}
