import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { PinLockService } from '../../core/services/pin-lock.service';
import { AppStartupService } from '../../core/services/app-startup.service';
import { I18nService } from '../../core/services/i18n.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-pin-setup',
  standalone: true,
  imports: [MatButtonModule, TranslatePipe],
  templateUrl: './pin-setup.component.html',
  styleUrl: './pin.component.css',
})
export class PinSetupComponent {
  private readonly pinLock = inject(PinLockService);
  private readonly router = inject(Router);
  private readonly startup = inject(AppStartupService);
  private readonly i18n = inject(I18nService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly pin = signal('');
  readonly confirmPin = signal('');
  readonly step = signal<'enter' | 'confirm'>('enter');
  readonly error = signal('');
  readonly version = signal('0.0.0');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      void this.loadVersion();
    }
  }

  addDigit(d: string): void {
    this.error.set('');
    if (this.step() === 'enter' && this.pin().length < 6) {
      this.pin.update((p) => p + d);
    } else if (this.step() === 'confirm' && this.confirmPin().length < 6) {
      this.confirmPin.update((p) => p + d);
    }
  }

  removeDigit(): void {
    this.error.set('');
    if (this.step() === 'enter') {
      this.pin.update((p) => p.slice(0, -1));
    } else {
      this.confirmPin.update((p) => p.slice(0, -1));
    }
  }

  async next(): Promise<void> {
    if (this.step() === 'enter' && this.pin().length === 6) {
      this.step.set('confirm');
      return;
    }
    if (this.step() === 'confirm' && this.confirmPin().length === 6) {
      if (this.pin() !== this.confirmPin()) {
        this.error.set(this.i18n.t('pin.pinsDoNotMatch'));
        this.confirmPin.set('');
        return;
      }
      await this.pinLock.setupPin(this.pin());
      const target = await this.startup.resolveInitialRoute('/');
      await this.router.navigateByUrl(target);
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
      // Keep fallback if version metadata is unavailable.
    }
  }
}
