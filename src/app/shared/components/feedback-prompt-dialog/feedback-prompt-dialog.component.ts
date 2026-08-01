import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { openFeedbackMailto } from '../../../core/constants/feedback';
import { I18nService } from '../../../core/services/i18n.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-feedback-prompt-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, TranslatePipe],
  host: { class: 'themed-dialog-host' },
  template: `
    <h2 mat-dialog-title>{{ 'feedbackPrompt.title' | tr }}</h2>
    <mat-dialog-content>
      <p>{{ 'feedbackPrompt.message' | tr }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-stroked-button type="button" (click)="dismiss()">
        {{ 'feedbackPrompt.notNow' | tr }}
      </button>
      <button mat-flat-button type="button" (click)="sendFeedback()">
        {{ 'feedbackPrompt.send' | tr }}
      </button>
    </mat-dialog-actions>
  `,
  styles: `
    :host {
      display: block;
      color: var(--text-primary);
      background: var(--background-card);
    }
    h2 {
      color: var(--primary) !important;
      text-align: center;
    }
    mat-dialog-content {
      color: var(--text-primary);
    }
    mat-dialog-content p {
      margin: 0;
      color: var(--text-secondary);
      text-align: center;
    }
  `,
})
export class FeedbackPromptDialogComponent {
  private readonly ref = inject(MatDialogRef<FeedbackPromptDialogComponent>);
  private readonly i18n = inject(I18nService);

  dismiss(): void {
    this.ref.close();
  }

  sendFeedback(): void {
    this.ref.close('send');
    openFeedbackMailto(this.i18n.t('settings.feedbackSubject'));
  }
}
