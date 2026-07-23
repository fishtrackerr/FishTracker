import { ChangeDetectionStrategy, Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { PinLockService } from '../../core/services/pin-lock.service';
import { AppStartupService } from '../../core/services/app-startup.service';
import { I18nService } from '../../core/services/i18n.service';
import { SwUpdateService } from '../../core/services/sw-update.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-pin-unlock',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, TranslatePipe],
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

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      void this.loadVersion();
    }
  }

  addDigit(d: string): void {
    this.error.set('');
    if (this.pin().length < 6) {
      this.pin.update((p) => p + d);
      if (this.pin().length === 6) {
        void this.verify();
      }
    }
  }

  removeDigit(): void {
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
    const valid = await this.pinLock.verifyPin(this.pin());
    if (valid) {
      const returnUrl = this.startup.consumeReturnUrl();
      const target = await this.startup.resolveInitialRoute(returnUrl);
      await this.router.navigateByUrl(target);
    } else {
      this.error.set(this.i18n.t('pin.incorrectPin'));
      this.pin.set('');
    }
  }

  private async loadVersion(): Promise<void> {
    try {
      const response = await fetch(`assets/version.json?ngsw-bypass=true&t=${Date.now()}`, {
        cache: 'no-store',
      });
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
