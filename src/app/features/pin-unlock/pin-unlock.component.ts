import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { PinLockService } from '../../core/services/pin-lock.service';
import { AppStartupService } from '../../core/services/app-startup.service';
import { I18nService } from '../../core/services/i18n.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-pin-unlock',
  standalone: true,
  imports: [MatButtonModule, TranslatePipe],
  templateUrl: './pin-unlock.component.html',
  styleUrl: '../pin-setup/pin.component.css',
})
export class PinUnlockComponent {
  private readonly pinLock = inject(PinLockService);
  private readonly router = inject(Router);
  private readonly startup = inject(AppStartupService);
  private readonly i18n = inject(I18nService);

  readonly pin = signal('');
  readonly error = signal('');

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
}
