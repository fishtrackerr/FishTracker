import { Component, inject, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { FilterPanelComponent } from '../filter-panel/filter-panel.component';
import { StatisticsFilter } from '../../../core/services/filter.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

export interface FilterSheetData {
  filter: StatisticsFilter;
}

@Component({
  selector: 'app-filter-sheet',
  standalone: true,
  imports: [FilterPanelComponent, MatButtonModule, TranslatePipe],
  template: `
    <div class="sheet">
      <div class="sheet-header">
        <h3>{{ 'filters.title' | tr }}</h3>
        <button mat-button type="button" (click)="close()">{{ 'common.close' | tr }}</button>
      </div>
      <app-filter-panel
        [filter]="data.filter"
        [compact]="true"
        (filterChange)="onChange($event)"
      />
      <div class="sheet-actions">
        <button mat-flat-button type="button" (click)="apply()">{{ 'filters.apply' | tr }}</button>
      </div>
    </div>
  `,
  styles: `
    .sheet {
      padding: var(--spacing-md);
      max-height: 80vh;
      overflow-y: auto;
      color: var(--text-primary);
      background: var(--background-card);
    }
    .sheet-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-md);
    }
    .sheet-header h3 {
      margin: 0;
      text-align: center;
      flex: 1;
      color: var(--primary);
    }
    .sheet-actions { margin-top: var(--spacing-md); }
    .sheet-actions button { width: 100%; }
  `,
})
export class FilterSheetComponent {
  private readonly sheetRef = inject(MatBottomSheetRef<FilterSheetComponent>);
  private currentFilter: StatisticsFilter;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) readonly data: FilterSheetData) {
    this.currentFilter = { ...data.filter };
  }

  onChange(filter: StatisticsFilter): void {
    this.currentFilter = filter;
  }

  apply(): void {
    this.sheetRef.dismiss(this.currentFilter);
  }

  close(): void {
    this.sheetRef.dismiss();
  }
}
