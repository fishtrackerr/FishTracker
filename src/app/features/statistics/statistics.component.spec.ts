import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Catch } from '../../core/models';
import { CatchRepository } from '../../core/services/catch.repository';
import { FilterService, StatisticsFilter } from '../../core/services/filter.service';
import { I18nService } from '../../core/services/i18n.service';
import { NotificationService } from '../../core/services/notification.service';
import { DashboardStats, StatisticsService } from '../../core/services/statistics.service';
import { StatisticsComponent } from './statistics.component';

describe('StatisticsComponent', () => {
  let getDashboardStats: ReturnType<typeof vi.fn>;
  let getAll: ReturnType<typeof vi.fn>;
  let notifyError: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    getDashboardStats = vi.fn().mockResolvedValue({ totalCatches: 1 } as unknown as DashboardStats);
    getAll = vi.fn().mockResolvedValue([]);
    notifyError = vi.fn();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StatisticsService,
          useValue: {
            getDashboardStats,
            getCorrelationData: (catches: Catch[]) => [{ label: 'n', count: catches.length }],
          },
        },
        { provide: CatchRepository, useValue: { getAll } },
        {
          provide: FilterService,
          useValue: {
            applyToCatches: (catches: Catch[], filter: StatisticsFilter) =>
              filter.species ? catches.filter((c) => c.species === filter.species) : catches,
          },
        },
        { provide: NotificationService, useValue: { error: notifyError } },
        { provide: I18nService, useValue: { t: (key: string) => key } },
      ],
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function createComponent(): StatisticsComponent {
    return TestBed.runInInjectionContext(() => new StatisticsComponent());
  }

  it('loads stats and correlation data', async () => {
    getAll.mockResolvedValue([{ species: 'Carp' }, { species: 'Pike' }] as Catch[]);
    const component = createComponent();

    await component.loadStats();

    expect(component.stats()).toEqual({ totalCatches: 1 });
    expect(component.tempCorrelation()).toEqual([{ label: 'n', count: 2 }]);
    expect(notifyError).not.toHaveBeenCalled();
  });

  it('shows an error notification when loading fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    getDashboardStats.mockRejectedValue(new Error('IndexedDB down'));
    const component = createComponent();

    await component.loadStats();

    expect(notifyError).toHaveBeenCalledWith('statistics.loadError');
    expect(component.stats()).toBeNull();
  });

  it('only applies the result of the latest load', async () => {
    let resolveFirst!: (catches: Catch[]) => void;
    getAll
      .mockReturnValueOnce(new Promise<Catch[]>((resolve) => (resolveFirst = resolve)))
      .mockResolvedValueOnce([{ species: 'Carp' }] as Catch[]);
    const component = createComponent();

    const first = component.loadStats();
    component.activeFilter.set({ species: 'Carp' });
    await component.loadStats();
    resolveFirst([{ species: 'Carp' }, { species: 'Pike' }, { species: 'Bream' }] as Catch[]);
    await first;

    expect(component.tempCorrelation()).toEqual([{ label: 'n', count: 1 }]);
  });
});
