import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FilterService, StatisticsFilter } from '../../../core/services/filter.service';
import { ConfirmService } from '../../../core/services/confirm.service';
import { DialogService } from '../../../core/services/dialog.service';
import { I18nService } from '../../../core/services/i18n.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ThemeService } from '../../../core/services/theme.service';
import { TextPromptDialogComponent } from '../text-prompt-dialog/text-prompt-dialog.component';
import { FilterPanelComponent } from './filter-panel.component';

describe('FilterPanelComponent', () => {
  const setActive = vi.fn();
  const clearActive = vi.fn();
  const savePreset = vi.fn();
  const open = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: FilterService,
          useValue: {
            getPresets: vi.fn().mockReturnValue([]),
            setActive,
            clearActive,
            savePreset,
            deletePreset: vi.fn(),
            countActive: (f: StatisticsFilter) =>
              Object.values(f).filter((v) => v !== undefined && v !== '').length,
          },
        },
        { provide: ConfirmService, useValue: { confirmDelete: vi.fn().mockResolvedValue(false) } },
        { provide: NotificationService, useValue: { success: vi.fn(), error: vi.fn() } },
        { provide: I18nService, useValue: { t: (key: string) => key } },
        { provide: ThemeService, useValue: { getSelectPanelClass: () => '' } },
        { provide: DialogService, useValue: { open } },
      ],
    });
  });

  function create(): FilterPanelComponent {
    return TestBed.runInInjectionContext(() => new FilterPanelComponent());
  }

  it('does not mutate the parent filter when the session status changes', () => {
    const component = create();
    const parent: StatisticsFilter = { species: 'Carp' };
    component.filter = parent;
    const emitted: StatisticsFilter[] = [];
    component.filterChange.subscribe((f) => emitted.push(f));

    component.onSessionStatusChange('active');

    expect(parent).toEqual({ species: 'Carp' });
    expect(emitted).toEqual([{ species: 'Carp', sessionStatus: 'active' }]);
    expect(emitted[0]).not.toBe(parent);
  });

  it('removes the session status in a new object when set back to any', () => {
    const component = create();
    const parent: StatisticsFilter = { sessionStatus: 'completed' };
    component.filter = parent;
    const emitted: StatisticsFilter[] = [];
    component.filterChange.subscribe((f) => emitted.push(f));

    component.onSessionStatusChange('');

    expect(parent).toEqual({ sessionStatus: 'completed' });
    expect(emitted).toEqual([{}]);
  });

  it('does not mutate the parent filter when a field is edited', () => {
    const component = create();
    const parent: StatisticsFilter = {};
    component.filter = parent;

    component.filter.dateFrom = '2026-01-01';
    component.emitChange();

    expect(parent).toEqual({});
    expect(setActive).toHaveBeenCalledWith({ dateFrom: '2026-01-01' });
  });

  it('syncs session status and active count when the input changes', () => {
    const component = create();
    component.filter = { sessionStatus: 'planned', species: 'Pike' };

    expect(component.sessionStatus).toBe('planned');
    expect(component.activeCount()).toBe(2);

    component.filter = {};

    expect(component.sessionStatus).toBe('');
    expect(component.activeCount()).toBe(0);
  });

  it('clears the filter and emits an empty object', () => {
    const component = create();
    component.filter = { sessionStatus: 'active' };
    const emitted: StatisticsFilter[] = [];
    component.filterChange.subscribe((f) => emitted.push(f));

    component.clear();

    expect(component.sessionStatus).toBe('');
    expect(clearActive).toHaveBeenCalled();
    expect(emitted).toEqual([{}]);
  });

  it('saves a preset with the name from the themed text prompt', async () => {
    open.mockReturnValue({ afterClosed: () => of('  Summer  ') });
    const component = create();
    component.filter = { species: 'Carp' };

    await component.savePreset();

    expect(open).toHaveBeenCalledWith(TextPromptDialogComponent, expect.anything());
    expect(savePreset).toHaveBeenCalledWith('Summer', { species: 'Carp' });
  });

  it('does not save a preset when the prompt is cancelled', async () => {
    open.mockReturnValue({ afterClosed: () => of(undefined) });
    const component = create();

    await component.savePreset();

    expect(savePreset).not.toHaveBeenCalled();
  });

  it('applies a preset as a copy and emits it', () => {
    const component = create();
    const preset: StatisticsFilter = { sessionStatus: 'completed' };
    const emitted: StatisticsFilter[] = [];
    component.filterChange.subscribe((f) => emitted.push(f));

    component.applyPreset(preset);
    component.onSessionStatusChange('');

    expect(preset).toEqual({ sessionStatus: 'completed' });
    expect(emitted[0]).toEqual({ sessionStatus: 'completed' });
  });
});
