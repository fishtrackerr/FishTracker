import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PRIVACY_WELCOME_SEEN_KEY } from '../constants/storage-keys';
import { PrivacyWelcomeDialogComponent } from '../../shared/components/privacy-welcome-dialog/privacy-welcome-dialog.component';
import { DialogService } from './dialog.service';

@Injectable({ providedIn: 'root' })
export class PrivacyWelcomeService {
  private readonly dialog = inject(DialogService);
  private dialogOpen = false;

  async maybeShow(): Promise<void> {
    if (this.dialogOpen || this.hasSeen()) {
      return;
    }

    this.dialogOpen = true;
    try {
      const ref = this.dialog.open(PrivacyWelcomeDialogComponent, {
        maxWidth: '480px',
        width: 'calc(100vw - 32px)',
        autoFocus: 'dialog',
        disableClose: true,
      });
      await firstValueFrom(ref.afterClosed());
      this.markSeen();
    } finally {
      this.dialogOpen = false;
    }
  }

  private hasSeen(): boolean {
    try {
      return localStorage.getItem(PRIVACY_WELCOME_SEEN_KEY) === '1';
    } catch {
      return false;
    }
  }

  private markSeen(): void {
    try {
      localStorage.setItem(PRIVACY_WELCOME_SEEN_KEY, '1');
    } catch {
      // Ignore quota / private-mode failures; dialog may reappear next visit.
    }
  }
}
