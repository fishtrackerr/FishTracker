import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { Lake } from '../../core/models';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-lake-picker-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatListModule, TranslatePipe],
  template: `
    <h2 mat-dialog-title>{{ 'dashboard.selectLake' | tr }}</h2>
    <mat-dialog-content>
      <mat-selection-list [multiple]="false">
        @for (lake of data.lakes; track lake.id) {
          <mat-list-option
            [selected]="lake.id === selectedId"
            (click)="select(lake.id)"
          >
            @if (lake.isFavorite) { ⭐ }
            {{ lake.name }}
          </mat-list-option>
        }
      </mat-selection-list>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-stroked-button mat-dialog-close>{{ 'common.cancel' | tr }}</button>
      <button mat-flat-button (click)="confirm()">{{ 'dashboard.start' | tr }}</button>
    </mat-dialog-actions>
  `,
})
export class LakePickerDialogComponent {
  readonly data = inject<{ lakes: Lake[]; selectedId: string }>(MAT_DIALOG_DATA);
  private readonly ref = inject(MatDialogRef<LakePickerDialogComponent>);

  selectedId = this.data.selectedId;

  select(id: string): void {
    this.selectedId = id;
  }

  confirm(): void {
    this.ref.close(this.selectedId);
  }
}
