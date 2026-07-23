import { Component, OnInit, inject, signal } from '@angular/core';
import { StatisticsService, DashboardStats } from '../../core/services/statistics.service';
import { CatchRepository } from '../../core/services/catch.repository';
import { FilterService, StatisticsFilter } from '../../core/services/filter.service';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { FilterPanelComponent } from '../../shared/components/filter-panel/filter-panel.component';
import { FormatWeightPipe, FormatLengthPipe } from '../../core/pipes/format-units.pipe';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    StatCardComponent,
    PageTitleComponent,
    FilterPanelComponent,
    FormatWeightPipe,
    FormatLengthPipe,
    TranslatePipe,
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent implements OnInit {
  private readonly statsService = inject(StatisticsService);
  private readonly catchRepo = inject(CatchRepository);
  private readonly filterService = inject(FilterService);

  readonly stats = signal<DashboardStats | null>(null);
  readonly tempCorrelation = signal<{ label: string; count: number }[]>([]);
  readonly pressureCorrelation = signal<{ label: string; count: number }[]>([]);
  readonly moonCorrelation = signal<{ label: string; count: number }[]>([]);
  readonly activeFilter = signal<StatisticsFilter>({});

  async ngOnInit(): Promise<void> {
    await this.loadStats();
  }

  async loadStats(): Promise<void> {
    const stats = await this.statsService.getDashboardStats();
    this.stats.set(stats);
    let catches = await this.catchRepo.getAll();
    const filter = this.activeFilter();
    catches = this.filterService.applyToCatches(catches, filter);
    this.tempCorrelation.set(this.statsService.getCorrelationData(catches, 'temperatureC'));
    this.pressureCorrelation.set(this.statsService.getCorrelationData(catches, 'airPressureHpa'));
    this.moonCorrelation.set(this.statsService.getCorrelationData(catches, 'moonPhase'));
  }

  onFilterChange(filter: StatisticsFilter): void {
    this.activeFilter.set(filter);
    void this.loadStats();
  }

  maxCount(items: { count: number }[]): number {
    return Math.max(...items.map((i) => i.count), 1);
  }
}
