import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  ReleaseNoteItem,
  ReleaseNotesData,
} from '../../../core/services/release-notes.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-whats-new-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, TranslatePipe],
  host: { class: 'themed-dialog-host' },
  template: `
    <h2 mat-dialog-title>{{ 'whatsNew.title' | tr: { version: data.version } }}</h2>
    <mat-dialog-content>
      <p class="date">{{ data.date }}</p>
      @for (section of data.sections; track section.category) {
        <h3>{{ section.category }}</h3>
        <ul>
          @for (item of section.items; track noteMessage(item)) {
            <li>{{ noteMessage(item) }}</li>
          }
        </ul>
      }
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-stroked-button type="button" (click)="viewChangelog()">
        {{ 'whatsNew.viewChangelog' | tr }}
      </button>
      <button mat-flat-button type="button" (click)="dismiss()">
        {{ 'whatsNew.gotIt' | tr }}
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
      max-height: min(60vh, 420px);
    }
    .date {
      text-align: center;
      color: var(--text-muted);
      margin-top: 0;
    }
    h3 {
      color: var(--text-primary);
      margin-top: var(--spacing-md);
      margin-bottom: var(--spacing-xs);
      font-size: 0.95rem;
    }
    ul {
      margin: 0 0 var(--spacing-sm);
      padding-left: 1.25rem;
    }
    li {
      color: var(--text-secondary);
      margin-bottom: var(--spacing-xs);
    }
  `,
})
export class WhatsNewDialogComponent {
  readonly data = inject<ReleaseNotesData>(MAT_DIALOG_DATA);
  private readonly ref = inject(MatDialogRef<WhatsNewDialogComponent>);
  private readonly router = inject(Router);

  noteMessage(item: string | ReleaseNoteItem): string {
    return typeof item === 'string' ? item : item.message;
  }

  dismiss(): void {
    this.ref.close();
  }

  viewChangelog(): void {
    this.ref.close();
    void this.router.navigateByUrl('/release-notes');
  }
}
