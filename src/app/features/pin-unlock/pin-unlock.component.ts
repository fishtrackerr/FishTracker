import { ChangeDetectionStrategy, Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PinLockService } from '../../core/services/pin-lock.service';
import { AppStartupService } from '../../core/services/app-startup.service';
import { I18nService } from '../../core/services/i18n.service';
import { SwUpdateService } from '../../core/services/sw-update.service';
import { fetchWithTimeout } from '../../core/utils';
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
  private readonly platformId = inject(PLATFORM_ID);

  readonly pin = signal('');
  readonly error = signal('');
  readonly version = signal('0.0.0');
  readonly checkingForUpdates = signal(false);
  readonly lockoutActive = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      void this.loadVersion();
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
      await this.loadVersion();
      this.swUpdate.checkForUpdatesNow();
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

  private async loadVersion(): Promise<void> {
    try {
      const response = await fetchWithTimeout(
        `assets/version.json?ngsw-bypass=true&t=${Date.now()}`,
        { cache: 'no-store' },
      );
      if (!response.ok) {
        return;
      }

      const payload = (await response.json()) as { version?: unknown };
      if (typeof payload.version === 'string' && payload.version.trim()) {
        this.version.set(payload.version);
      }
    } catch {
      // Keep the fallback version when metadata cannot be loaded.
    }
  }
}
