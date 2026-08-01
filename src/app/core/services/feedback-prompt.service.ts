import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FEEDBACK_PROMPT_DATE_KEY } from '../constants/storage-keys';
import { FeedbackPromptDialogComponent } from '../../shared/components/feedback-prompt-dialog/feedback-prompt-dialog.component';
import { DialogService } from './dialog.service';

@Injectable({ providedIn: 'root' })
export class FeedbackPromptService {
  private readonly dialog = inject(DialogService);
  private dialogOpen = false;

  async maybeShow(): Promise<void> {
    if (this.dialogOpen) {
      return;
    }

    const today = this.localDateKey();
    const lastShown = this.readLastShownDate();
    if (lastShown === today) {
      return;
    }

    this.dialogOpen = true;
    try {
      const ref = this.dialog.open(FeedbackPromptDialogComponent, {
        maxWidth: '480px',
        width: 'calc(100vw - 32px)',
        autoFocus: 'dialog',
      });
      await firstValueFrom(ref.afterClosed());
      this.writeLastShownDate(today);
    } finally {
      this.dialogOpen = false;
    }
  }

  /** Local calendar date as YYYY-MM-DD (midnight boundary). */
  private localDateKey(date = new Date()): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private readLastShownDate(): string | null {
    try {
      const value = localStorage.getItem(FEEDBACK_PROMPT_DATE_KEY);
      return value?.trim() || null;
    } catch {
      return null;
    }
  }

  private writeLastShownDate(dateKey: string): void {
    try {
      localStorage.setItem(FEEDBACK_PROMPT_DATE_KEY, dateKey);
    } catch {
      // Ignore quota / private-mode failures; dialog may reappear next visit.
    }
  }
}
