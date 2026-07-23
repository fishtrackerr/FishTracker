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
import { FishingSession, Lake, SessionStatus } from '../../core/models';
import { UpdateSessionOptions } from '../../core/services/session.service';

export interface SessionEditDialogData {
  session: FishingSession;
  lakes: Lake[];
}

export interface SessionEditResult extends UpdateSessionOptions {}

@Component({
  selector: 'app-session-edit-dialog',
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
    <h2 mat-dialog-title class="dialog-title">Edit Session</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="full">
        <mat-label>Session name</mat-label>
        <input matInput [(ngModel)]="name" required />
      </mat-form-field>
      @if (!name.trim()) {
        <p class="field-error">Session name is required</p>
      }

      <mat-form-field appearance="outline" class="full">
        <mat-label>Lake</mat-label>
        <mat-select [(ngModel)]="lakeId">
          <mat-option value="">None</mat-option>
          @for (lake of data.lakes; track lake.id) {
            <mat-option [value]="lake.id">{{ lake.name }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full">
        <mat-label>Status</mat-label>
        <mat-select [(ngModel)]="status">
          @for (s of statuses; track s) {
            <mat-option [value]="s">{{ s }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full">
        <mat-label>Start date & time</mat-label>
        <input matInput type="datetime-local" [(ngModel)]="startDateLocal" required />
      </mat-form-field>

      <mat-form-field appearance="outline" class="full">
        <mat-label>End date & time (optional)</mat-label>
        <input matInput type="datetime-local" [(ngModel)]="endDateLocal" />
      </mat-form-field>
      @if (dateErrorMessage) {
        <p class="field-error">{{ dateErrorMessage }}</p>
      }

      <mat-form-field appearance="outline" class="full">
        <mat-label>Prebait</mat-label>
        <input matInput [(ngModel)]="prebait" />
      </mat-form-field>

      <mat-form-field appearance="outline" class="full">
        <mat-label>Notes</mat-label>
        <textarea matInput rows="3" [(ngModel)]="notes"></textarea>
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
        {{ saving() ? 'Saving...' : 'Save' }}
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
export class SessionEditDialogComponent {
  readonly data = inject<SessionEditDialogData>(MAT_DIALOG_DATA);
  private readonly ref = inject(MatDialogRef<SessionEditDialogComponent, SessionEditResult | undefined>);

  readonly statuses: SessionStatus[] = ['planned', 'active', 'completed'];
  name = this.data.session.name;
  lakeId = this.data.session.lakeId ?? '';
  status = this.data.session.status;
  startDateLocal = toLocalDatetimeInput(this.data.session.startDate);
  endDateLocal = this.data.session.endDate
    ? toLocalDatetimeInput(this.data.session.endDate)
    : '';
  prebait = this.data.session.prebait ?? '';
  notes = this.data.session.notes ?? '';
  readonly saving = signal(false);

  canSave(): boolean {
    if (!this.name.trim() || !this.startDateLocal) {
      return false;
    }
    if (this.endDateLocal) {
      const start = new Date(this.startDateLocal).getTime();
      const end = new Date(this.endDateLocal).getTime();
      if (end < start) {
        return false;
      }
    }
    return true;
  }

  get dateErrorMessage(): string {
    if (!this.endDateLocal || !this.startDateLocal) {
      return '';
    }
    const start = new Date(this.startDateLocal).getTime();
    const end = new Date(this.endDateLocal).getTime();
    if (end < start) {
      return 'End date cannot be earlier than start date';
    }
    return '';
  }

  save(): void {
    if (!this.canSave()) {
      return;
    }
    this.saving.set(true);
    const result: SessionEditResult = {
      name: this.name.trim(),
      lakeId: this.lakeId || undefined,
      status: this.status,
      startDate: new Date(this.startDateLocal).toISOString(),
      endDate: this.endDateLocal ? new Date(this.endDateLocal).toISOString() : undefined,
      prebait: this.prebait || undefined,
      notes: this.notes || undefined,
    };
    this.ref.close(result);
  }
}

function toLocalDatetimeInput(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
