import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Lake } from '../../core/models';
import { nowIso } from '../../core/utils';

export interface SessionCreateResult {
  name: string;
  startDate: string;
  lakeId?: string;
}

export interface SessionCreateDialogData {
  lakes: Lake[];
  defaultLakeId?: string;
  defaultName?: string;
}

@Component({
  selector: 'app-session-create-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  template: `
    <h2 mat-dialog-title class="dialog-title">Start Fishing Session</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="full">
        <mat-label>Session name</mat-label>
        <input matInput [(ngModel)]="name" required />
      </mat-form-field>
      @if (!name.trim()) {
        <p class="field-error">Session name is required</p>
      }

      <mat-form-field appearance="outline" class="full">
        <mat-label>Start date & time</mat-label>
        <input matInput type="datetime-local" [(ngModel)]="startDateLocal" required />
      </mat-form-field>

      <mat-form-field appearance="outline" class="full">
        <mat-label>Lake (optional)</mat-label>
        <mat-select [(ngModel)]="lakeId">
          <mat-option value="">None</mat-option>
          @for (lake of data.lakes; track lake.id) {
            <mat-option [value]="lake.id">
              @if (lake.isFavorite) { ⭐ }
              {{ lake.name }}
            </mat-option>
          }
        </mat-select>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close type="button">Cancel</button>
      <button
        mat-flat-button
        type="button"
        [disabled]="!canSave() || saving()"
        (click)="save()"
      >
        {{ saving() ? 'Starting...' : 'Start Session' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: `
    :host {
      display: block;
      color: var(--text-primary);
      background: var(--background-card);
    }
    .dialog-title { text-align: center; width: 100%; }
    .full { width: 100%; }
    .field-error { color: var(--danger, #d64545); font-size: 0.85rem; margin: -8px 0 8px; }
    button[mat-flat-button] {
      background: var(--primary) !important;
      color: var(--text-on-primary) !important;
    }
  `,
})
export class SessionCreateDialogComponent {
  readonly data = inject<SessionCreateDialogData>(MAT_DIALOG_DATA);
  private readonly ref = inject(MatDialogRef<SessionCreateDialogComponent, SessionCreateResult | undefined>);

  name = this.data.defaultName ?? 'Fishing Session';
  startDateLocal = toLocalDatetimeInput(nowIso());
  lakeId = this.data.defaultLakeId ?? '';
  readonly saving = signal(false);

  canSave(): boolean {
    return this.name.trim().length > 0 && this.startDateLocal.length > 0;
  }

  save(): void {
    if (!this.canSave()) {
      return;
    }
    this.saving.set(true);
    const startDate = new Date(this.startDateLocal).toISOString();
    this.ref.close({
      name: this.name.trim(),
      startDate,
      lakeId: this.lakeId || undefined,
    });
  }
}

function toLocalDatetimeInput(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
