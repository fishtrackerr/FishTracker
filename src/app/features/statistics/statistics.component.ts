import { Component, OnInit, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { StatisticsService, DashboardStats } from '../../core/services/statistics.service';
import { CatchRepository } from '../../core/services/catch.repository';
import { FilterService, StatisticsFilter } from '../../core/services/filter.service';
import { I18nService } from '../../core/services/i18n.service';
import { NotificationService } from '../../core/services/notification.service';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { FilterPanelComponent } from '../../shared/components/filter-panel/filter-panel.component';
import { FormatWeightPipe, FormatLengthPipe } from '../../core/pipes/format-units.pipe';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-statistics',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    MatButtonModule,
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
  private readonly notifications = inject(NotificationService);
  private readonly i18n = inject(I18nService);
  /** Incremented per load; only the latest request may apply its results. */
  private loadToken = 0;

  readonly stats = signal<DashboardStats | null>(null);
  readonly tempCorrelation = signal<{ label: string; count: number }[]>([]);
  readonly pressureCorrelation = signal<{ label: string; count: number }[]>([]);
  readonly moonCorrelation = signal<{ label: string; count: number }[]>([]);
  readonly activeFilter = signal<StatisticsFilter>({});

  async ngOnInit(): Promise<void> {
    await this.loadStats();
  }

  async loadStats(): Promise<void> {
    const token = ++this.loadToken;
    const filter = this.activeFilter();
    try {
      const [stats, allCatches] = await Promise.all([
        this.statsService.getDashboardStats(),
        this.catchRepo.getAll(),
      ]);
      if (token !== this.loadToken) return;
      const catches = this.filterService.applyToCatches(allCatches, filter);
      this.stats.set(stats);
      this.tempCorrelation.set(this.statsService.getCorrelationData(catches, 'temperatureC'));
      this.pressureCorrelation.set(this.statsService.getCorrelationData(catches, 'airPressureHpa'));
      this.moonCorrelation.set(this.statsService.getCorrelationData(catches, 'moonPhase'));
    } catch (error) {
      if (token !== this.loadToken) return;
      console.error('[Statistics] Failed to load statistics', error);
      this.notifications.error(this.i18n.t('statistics.loadError'));
    }
  }

  onFilterChange(filter: StatisticsFilter): void {
    this.activeFilter.set(filter);
    void this.loadStats();
  }

  maxCount(items: { count: number }[]): number {
    return Math.max(...items.map((i) => i.count), 1);
  }
}
