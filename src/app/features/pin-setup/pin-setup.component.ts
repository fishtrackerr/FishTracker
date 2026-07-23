import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { PinLockService } from '../../core/services/pin-lock.service';
import { AppStartupService } from '../../core/services/app-startup.service';

@Component({
  selector: 'app-pin-setup',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './pin-setup.component.html',
  styleUrl: './pin.component.css',
})
export class PinSetupComponent {
  private readonly pinLock = inject(PinLockService);
  private readonly router = inject(Router);
  private readonly startup = inject(AppStartupService);

  readonly pin = signal('');
  readonly confirmPin = signal('');
  readonly step = signal<'enter' | 'confirm'>('enter');
  readonly error = signal('');

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
        this.error.set('PINs do not match');
        this.confirmPin.set('');
        return;
      }
      await this.pinLock.setupPin(this.pin());
      const target = await this.startup.resolveInitialRoute('/');
      await this.router.navigateByUrl(target);
    }
  }
}
