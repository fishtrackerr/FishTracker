import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SessionService } from '../../core/services/session.service';
import { LakeService } from '../../core/services/lake.service';
import { SearchService } from '../../core/services/search.service';
import { FilterService, StatisticsFilter } from '../../core/services/filter.service';
import { SessionStartFlowService } from '../../core/services/session-start-flow.service';
import { ThemeService } from '../../core/services/theme.service';
import { SessionCardComponent } from '../../shared/components/session-card/session-card.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { FilterPanelComponent } from '../../shared/components/filter-panel/filter-panel.component';
import { FilterSheetComponent } from '../../shared/components/filter-panel/filter-sheet.component';
import { ExpandableSectionComponent } from '../../shared/components/expandable-section/expandable-section.component';
import { FishingSession } from '../../core/models';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-sessions-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    SessionCardComponent,
    EmptyStateComponent,
    PageTitleComponent,
    SearchBarComponent,
    FilterPanelComponent,
    ExpandableSectionComponent,
    TranslatePipe,
  ],
  templateUrl: './sessions-list.component.html',
  styleUrl: './sessions-list.component.css',
})
export class SessionsListComponent {
  private readonly sessionService = inject(SessionService);
  private readonly lakeService = inject(LakeService);
  private readonly searchService = inject(SearchService);
  private readonly filterService = inject(FilterService);
  private readonly router = inject(Router);
  private readonly sessionStartFlow = inject(SessionStartFlowService);
  private readonly bottomSheet = inject(MatBottomSheet);
  private readonly theme = inject(ThemeService);
  readonly selectPanelClass = this.theme.getSelectPanelClass();

  readonly allSessions = toSignal(this.sessionService.watchAll(), { initialValue: [] });
  readonly lakes = toSignal(this.lakeService.watchAll(), { initialValue: [] });
  readonly starting = this.sessionStartFlow.starting;
  readonly searchQuery = signal('');
  readonly sortBy = signal<'newest' | 'oldest' | 'name-asc' | 'name-desc' | 'most-catches'>('newest');
  readonly activeFilter = signal<StatisticsFilter>({});

  readonly filteredSessions = computed(() => {
    let list = this.allSessions();
    list = this.filterService.applyToSessions(list, this.activeFilter());
    list = this.searchService.searchSessions(list, this.searchQuery(), this.lakes());
    return this.searchService.sortSessions(list, this.sortBy());
  });

  readonly currentSession = computed(() =>
    this.allSessions().find((session) => session.status === 'active'),
  );

  readonly showCurrentSession = computed(() => {
    const current = this.currentSession();
    if (!current) {
      return false;
    }
    const statusFilter = this.activeFilter().sessionStatus;
    return !statusFilter || statusFilter === 'active';
  });

  readonly historySessions = computed(() => {
    const currentId = this.currentSession()?.id;
    return this.filteredSessions().filter(
      (session) => session.status !== 'active' && session.id !== currentId,
    );
  });

  readonly visibleSessionCount = computed(
    () => this.historySessions().length + (this.showCurrentSession() ? 1 : 0),
  );

  readonly filterCount = computed(() =>
    this.filterService.countActive(this.activeFilter()),
  );

  onSearch(query: string): void {
    this.searchQuery.set(query);
  }

  onFilterChange(filter: StatisticsFilter): void {
    this.activeFilter.set(filter);
  }

  getLakeName(lakeId?: string): string | undefined {
    if (!lakeId) return undefined;
    return this.lakes().find((l) => l.id === lakeId)?.name;
  }

  openMobileFilters(): void {
    const themeClass = this.theme.resolvedTheme() === 'dark' ? 'theme-dark' : 'theme-light';
    const backdropThemeClass =
      this.theme.resolvedTheme() === 'dark' ? 'theme-backdrop-dark' : 'theme-backdrop-light';
    const ref = this.bottomSheet.open(FilterSheetComponent, {
      data: { filter: this.activeFilter() },
      panelClass: ['themed-bottom-sheet', themeClass],
      // MatBottomSheetConfig types this as string, but CDK Overlay accepts string[]
      // and a space-separated string throws in classList.add.
      backdropClass: ['themed-backdrop', backdropThemeClass] as unknown as string,
    });
    ref.afterDismissed().subscribe((result: StatisticsFilter | undefined) => {
      if (result) {
        this.onFilterChange(result);
      }
    });
  }

  async editSession(session: FishingSession): Promise<void> {
    await this.router.navigate(['/sessions', session.id, 'edit']);
  }

  async startSession(): Promise<void> {
    await this.sessionStartFlow.start();
  }
}
