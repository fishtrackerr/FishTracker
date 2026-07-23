import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { DialogService } from '../../core/services/dialog.service';
import { RodSetupFlowService } from '../../core/services/rod-setup-flow.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { firstValueFrom } from 'rxjs';
import { SessionService } from '../../core/services/session.service';
import { LakeService } from '../../core/services/lake.service';
import { SettingsService } from '../../core/services/settings.service';
import { NotificationService } from '../../core/services/notification.service';
import { SearchService } from '../../core/services/search.service';
import { FilterService, StatisticsFilter } from '../../core/services/filter.service';
import { SessionCardComponent } from '../../shared/components/session-card/session-card.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { FilterPanelComponent } from '../../shared/components/filter-panel/filter-panel.component';
import { FilterSheetComponent } from '../../shared/components/filter-panel/filter-sheet.component';
import { ExpandableSectionComponent } from '../../shared/components/expandable-section/expandable-section.component';
import {
  SessionCreateDialogComponent,
  SessionCreateResult,
} from './session-create-dialog.component';
import { FishingSession } from '../../core/models';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { I18nService } from '../../core/services/i18n.service';

@Component({
  selector: 'app-sessions-list',
  standalone: true,
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
  private readonly settings = inject(SettingsService);
  private readonly notifications = inject(NotificationService);
  private readonly i18n = inject(I18nService);
  private readonly searchService = inject(SearchService);
  private readonly filterService = inject(FilterService);
  private readonly router = inject(Router);
  private readonly dialog = inject(DialogService);
  private readonly rodSetupFlow = inject(RodSetupFlowService);
  private readonly bottomSheet = inject(MatBottomSheet);

  readonly allSessions = toSignal(this.sessionService.watchAll(), { initialValue: [] });
  readonly lakes = toSignal(this.lakeService.watchAll(), { initialValue: [] });
  readonly starting = signal(false);
  readonly searchQuery = signal('');
  readonly sortBy = signal<'newest' | 'oldest' | 'name-asc' | 'name-desc' | 'most-catches'>('newest');
  readonly activeFilter = signal<StatisticsFilter>({});

  readonly sessions = computed(() => {
    let list = this.allSessions();
    list = this.filterService.applyToSessions(list, this.activeFilter());
    list = this.searchService.searchSessions(list, this.searchQuery(), this.lakes());
    return this.searchService.sortSessions(list, this.sortBy());
  });

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
    const ref = this.bottomSheet.open(FilterSheetComponent, {
      data: { filter: this.activeFilter() },
      panelClass: 'themed-bottom-sheet',
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
    if (this.starting()) {
      return;
    }
    try {
      const lakes = this.lakeService.getSortedLakes(await this.lakeService.getAll());
      const lastId = this.settings.get().lastLakeId;
      const defaultLake = lakes.find((l) => l.id === lastId);

      const ref = this.dialog.open(SessionCreateDialogComponent, {
        data: {
          lakes,
          defaultLakeId: defaultLake?.id,
          defaultName: defaultLake ? `Session at ${defaultLake.name}` : 'Fishing Session',
        },
        disableClose: true,
      });

      const result = await firstValueFrom(ref.afterClosed()) as SessionCreateResult | undefined;
      if (!result) {
        return;
      }

      this.starting.set(true);
      const hadActive = !!(await this.sessionService.getActive());
      const session = await this.sessionService.start(result);
      if (!hadActive) {
        await this.rodSetupFlow.promptAfterSessionCreate(session);
      }
      this.notifications.success(this.i18n.t('sessions.sessionStarted'));
      await this.router.navigate(['/sessions/active']);
    } catch (error) {
      console.error('[SessionsList] startSession failed', error);
      this.notifications.error(this.i18n.t('sessions.createFailed'));
    } finally {
      this.starting.set(false);
    }
  }
}
