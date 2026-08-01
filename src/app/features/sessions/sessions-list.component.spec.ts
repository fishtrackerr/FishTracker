import { TestBed } from '@angular/core/testing';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FishingSession } from '../../core/models';
import { DialogService } from '../../core/services/dialog.service';
import { FilterService } from '../../core/services/filter.service';
import { I18nService } from '../../core/services/i18n.service';
import { LakeService } from '../../core/services/lake.service';
import { NotificationService } from '../../core/services/notification.service';
import { RodSetupFlowService } from '../../core/services/rod-setup-flow.service';
import { SearchService } from '../../core/services/search.service';
import { SessionService } from '../../core/services/session.service';
import { SettingsService } from '../../core/services/settings.service';
import { ThemeService } from '../../core/services/theme.service';
import { SessionsListComponent } from './sessions-list.component';

describe('SessionsListComponent', () => {
  const sessions$ = new BehaviorSubject<FishingSession[]>([]);

  const searchServiceStub = {
    searchSessions: vi.fn((list: FishingSession[]) => list),
    sortSessions: vi.fn((list: FishingSession[]) => list),
  };

  beforeEach(() => {
    sessions$.next([]);
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        FilterService,
        {
          provide: SessionService,
          useValue: {
            watchAll: () => sessions$.asObservable(),
            getActive: vi.fn(),
            start: vi.fn(),
          },
        },
        {
          provide: LakeService,
          useValue: {
            watchAll: () => of([]),
            getAll: vi.fn().mockResolvedValue([]),
            getSortedLakes: vi.fn((lakes: unknown[]) => lakes),
          },
        },
        {
          provide: SettingsService,
          useValue: {
            get: vi.fn().mockReturnValue({}),
          },
        },
        {
          provide: NotificationService,
          useValue: {
            success: vi.fn(),
            error: vi.fn(),
          },
        },
        {
          provide: I18nService,
          useValue: {
            t: vi.fn((key: string) => key),
          },
        },
        {
          provide: SearchService,
          useValue: searchServiceStub,
        },
        {
          provide: DialogService,
          useValue: {
            open: vi.fn(),
          },
        },
        {
          provide: RodSetupFlowService,
          useValue: {
            promptAfterSessionCreate: vi.fn(),
          },
        },
        {
          provide: MatBottomSheet,
          useValue: {
            open: vi.fn(),
          },
        },
        {
          provide: ThemeService,
          useValue: {
            resolvedTheme: () => 'dark',
            getSelectPanelClass: () => 'theme-dark-select-panel',
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: vi.fn(),
          },
        },
      ],
    });
  });

  function createComponent(): SessionsListComponent {
    return TestBed.runInInjectionContext(() => new SessionsListComponent());
  }

  it('splits active session from history sessions', () => {
    sessions$.next([
      {
        id: 'active-1',
        name: 'Current Session',
        status: 'active',
        startDate: '2026-07-23T08:00:00.000Z',
        photoIds: [],
        catchCount: 0,
        totalCatchWeightKg: 0,
        createdAt: '2026-07-23T08:00:00.000Z',
        updatedAt: '2026-07-23T08:00:00.000Z',
      } as FishingSession,
      {
        id: 'completed-1',
        name: 'Completed Session',
        status: 'completed',
        startDate: '2026-07-22T08:00:00.000Z',
        photoIds: [],
        catchCount: 2,
        totalCatchWeightKg: 6,
        createdAt: '2026-07-22T08:00:00.000Z',
        updatedAt: '2026-07-22T20:00:00.000Z',
      } as FishingSession,
    ]);

    const component = createComponent();

    expect(component.currentSession()?.id).toBe('active-1');
    expect(component.showCurrentSession()).toBe(true);
    expect(component.historySessions().map((s) => s.id)).toEqual(['completed-1']);
    expect(component.visibleSessionCount()).toBe(2);
  });

  it('hides current session when status filter explicitly excludes active', () => {
    sessions$.next([
      {
        id: 'active-1',
        name: 'Current Session',
        status: 'active',
        startDate: '2026-07-23T08:00:00.000Z',
        photoIds: [],
        catchCount: 0,
        totalCatchWeightKg: 0,
        createdAt: '2026-07-23T08:00:00.000Z',
        updatedAt: '2026-07-23T08:00:00.000Z',
      } as FishingSession,
    ]);

    const component = createComponent();
    component.activeFilter.set({ sessionStatus: 'completed' });

    expect(component.showCurrentSession()).toBe(false);
    expect(component.visibleSessionCount()).toBe(0);
  });

  it('keeps current session visible for non-status filters', () => {
    sessions$.next([
      {
        id: 'active-1',
        name: 'Current Session',
        status: 'active',
        startDate: '2026-07-23T08:00:00.000Z',
        photoIds: [],
        catchCount: 0,
        totalCatchWeightKg: 0,
        createdAt: '2026-07-23T08:00:00.000Z',
        updatedAt: '2026-07-23T08:00:00.000Z',
      } as FishingSession,
    ]);

    const component = createComponent();
    component.activeFilter.set({ lakeId: 'other-lake' });

    expect(component.showCurrentSession()).toBe(true);
    expect(component.visibleSessionCount()).toBe(1);
  });
});
