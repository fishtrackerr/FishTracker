import { Component, Input, output, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FilterService, StatisticsFilter } from '../../../core/services/filter.service';
import { ConfirmService } from '../../../core/services/confirm.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  template: `
    <div class="filter-panel" [class.compact]="compact">
      @if (!compact) {
        <h3 class="section-title">Filters @if (activeCount() > 0) { ({{ activeCount() }}) }</h3>
      }

      <div class="fields">
        <mat-form-field appearance="outline" class="full">
          <mat-label>Date from</mat-label>
          <input matInput type="date" [(ngModel)]="filter.dateFrom" (ngModelChange)="emitChange()" />
        </mat-form-field>
        <mat-form-field appearance="outline" class="full">
          <mat-label>Date to</mat-label>
          <input matInput type="date" [(ngModel)]="filter.dateTo" (ngModelChange)="emitChange()" />
        </mat-form-field>
        <mat-form-field appearance="outline" class="full">
          <mat-label>Species</mat-label>
          <input matInput [(ngModel)]="filter.species" (ngModelChange)="emitChange()" />
        </mat-form-field>
        <mat-form-field appearance="outline" class="full">
          <mat-label>Session status</mat-label>
          <mat-select [(ngModel)]="filter.sessionStatus" (ngModelChange)="emitChange()">
            <mat-option [value]="undefined">Any</mat-option>
            <mat-option value="active">Active</mat-option>
            <mat-option value="completed">Completed</mat-option>
            <mat-option value="planned">Planned</mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <div class="actions">
        <button mat-stroked-button type="button" (click)="clear()">Clear all</button>
        <button mat-stroked-button type="button" (click)="savePreset()">Save preset</button>
      </div>

      @if (presets().length > 0) {
        <div class="presets">
          @for (preset of presets(); track preset.id) {
            <div class="preset-row">
              <button mat-button type="button" (click)="applyPreset(preset.filter)">{{ preset.name }}</button>
              <button mat-icon-button type="button" aria-label="Delete preset" (click)="deletePreset(preset.id, preset.name)">×</button>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: `
    .filter-panel {
      background: var(--background-card);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-md);
      padding: var(--spacing-md);
    }
    .filter-panel.compact {
      border: none;
      padding: 0;
      background: transparent;
    }
    .section-title { text-align: center; margin: 0 0 var(--spacing-md); }
    .fields {
      display: grid;
      gap: var(--spacing-sm);
      grid-template-columns: 1fr;
    }
    @media (min-width: 769px) {
      .fields { grid-template-columns: 1fr 1fr; }
    }
    .full { width: 100%; }
    .actions { display: flex; gap: var(--spacing-sm); flex-wrap: wrap; margin-top: var(--spacing-sm); }
    .presets { margin-top: var(--spacing-md); }
    .preset-row { display: flex; align-items: center; justify-content: space-between; }
  `,
})
export class FilterPanelComponent implements OnInit {
  private readonly filterService = inject(FilterService);
  private readonly confirm = inject(ConfirmService);
  private readonly notifications = inject(NotificationService);

  @Input() filter: StatisticsFilter = {};
  @Input() compact = false;
  readonly filterChange = output<StatisticsFilter>();

  readonly presets = signal(this.filterService.getPresets());
  readonly activeCount = signal(0);

  ngOnInit(): void {
    this.activeCount.set(this.filterService.countActive(this.filter));
  }

  emitChange(): void {
    this.filterService.setActive(this.filter);
    this.activeCount.set(this.filterService.countActive(this.filter));
    this.filterChange.emit({ ...this.filter });
  }

  clear(): void {
    this.filter = {};
    this.filterService.clearActive();
    this.activeCount.set(0);
    this.filterChange.emit({});
  }

  savePreset(): void {
    const name = prompt('Preset name');
    if (!name?.trim()) return;
    this.filterService.savePreset(name.trim(), this.filter);
    this.presets.set(this.filterService.getPresets());
    this.notifications.success('Filter preset saved');
  }

  applyPreset(filter: StatisticsFilter): void {
    this.filter = { ...filter };
    this.emitChange();
  }

  async deletePreset(id: string, name: string): Promise<void> {
    const ok = await this.confirm.confirmDelete('Delete filter preset?', name);
    if (ok) {
      this.filterService.deletePreset(id);
      this.presets.set(this.filterService.getPresets());
    }
  }
}
