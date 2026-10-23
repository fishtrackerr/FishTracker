import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { firstValueFrom } from 'rxjs';
import { DialogService } from '../../../core/services/dialog.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

export interface TextPromptDialogData {
  title: string;
  label?: string;
  initialValue?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  maxLength?: number;
}

/** Themed replacement for `window.prompt`: one text field, returns the trimmed value. */
@Component({
  selector: 'app-text-prompt-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    TranslatePipe,
  ],
  template: `
    <form (ngSubmit)="confirm()">
      <h2 mat-dialog-title>{{ data.title }}</h2>
      <mat-dialog-content>
        <mat-form-field appearance="outline" class="full">
          @if (data.label) {
            <mat-label>{{ data.label }}</mat-label>
          }
          <input
            matInput
            name="value"
            cdkFocusInitial
            [(ngModel)]="value"
            [attr.maxlength]="data.maxLength ?? null"
          />
        </mat-form-field>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-stroked-button mat-dialog-close type="button">
          {{ data.cancelLabel ?? ('common.cancel' | tr) }}
        </button>
        <button mat-flat-button type="submit" [disabled]="!canConfirm()">
          {{ data.confirmLabel ?? ('common.save' | tr) }}
        </button>
      </mat-dialog-actions>
    </form>
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
    .full {
      width: 100%;
      display: block;
    }
    mat-dialog-content {
      min-width: min(100%, 320px);
      padding-top: 0.5rem;
    }
  `,
})
export class TextPromptDialogComponent {
  readonly data = inject<TextPromptDialogData>(MAT_DIALOG_DATA);
  private readonly ref = inject(MatDialogRef<TextPromptDialogComponent, string | undefined>);

  value = this.data.initialValue ?? '';

  canConfirm(): boolean {
    return this.value.trim().length > 0;
  }

  confirm(): void {
    if (!this.canConfirm()) {
      return;
    }
    this.ref.close(this.value.trim());
  }
}

/** Opens {@link TextPromptDialogComponent}; resolves to the trimmed value, or undefined when cancelled. */
export async function promptForText(
  dialog: DialogService,
  data: TextPromptDialogData,
): Promise<string | undefined> {
  const ref = dialog.open<TextPromptDialogComponent, TextPromptDialogData, string | undefined>(
    TextPromptDialogComponent,
    { data, width: '420px', maxWidth: '95vw' },
  );
  const result = await firstValueFrom(ref.afterClosed());
  return result?.trim() || undefined;
}
