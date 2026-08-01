import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { TranslatePipe } from '../../pipes/translate.pipe';

export interface ConfirmDialogData {
  title: string;
  itemName?: string;
  message?: string;
  confirmLabel?: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, TranslatePipe],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      @if (data.itemName) {
        <p>{{ 'confirm.deleteItem' | tr: { item: data.itemName } }}</p>
      }
      <p>{{ data.message ?? ('confirm.cannotUndo' | tr) }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-stroked-button mat-dialog-close type="button">{{ 'confirm.cancel' | tr }}</button>
      <button mat-flat-button type="button" (click)="confirm()">
        {{ data.confirmLabel ?? ('confirm.delete' | tr) }}
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
  `,
})
export class ConfirmDialogComponent {
  readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);
  private readonly ref = inject(MatDialogRef<ConfirmDialogComponent, boolean>);

  confirm(): void {
    this.ref.close(true);
  }
}
