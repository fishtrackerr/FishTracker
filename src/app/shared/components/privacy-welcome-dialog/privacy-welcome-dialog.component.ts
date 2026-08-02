import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-privacy-welcome-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, TranslatePipe],
  host: { class: 'themed-dialog-host' },
  template: `
    <h2 mat-dialog-title>{{ 'privacyWelcome.title' | tr }}</h2>
    <mat-dialog-content>
      <div class="icon-wrap" aria-hidden="true">
        <mat-icon>phonelink_lock</mat-icon>
      </div>
      <p class="lead">{{ 'privacyWelcome.lead' | tr }}</p>
      <p>{{ 'privacyWelcome.body' | tr }}</p>
      <p class="note">{{ 'privacyWelcome.note' | tr }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-flat-button type="button" (click)="dismiss()">
        {{ 'privacyWelcome.gotIt' | tr }}
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
      text-align: center;
    }
    .icon-wrap {
      display: flex;
      justify-content: center;
      margin-bottom: var(--spacing-sm);
    }
    .icon-wrap mat-icon {
      font-size: 40px;
      width: 40px;
      height: 40px;
      color: var(--primary);
    }
    .lead {
      font-size: 1.05rem;
      font-weight: 600;
      margin: 0 0 var(--spacing-sm);
      color: var(--text-primary);
    }
    p {
      margin: 0 0 var(--spacing-sm);
      color: var(--text-secondary);
      line-height: 1.45;
    }
    .note {
      margin-bottom: 0;
      font-size: 0.9rem;
      color: var(--text-muted);
    }
  `,
})
export class PrivacyWelcomeDialogComponent {
  private readonly ref = inject(MatDialogRef<PrivacyWelcomeDialogComponent>);

  dismiss(): void {
    this.ref.close();
  }
}
