import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeService } from '../../core/services/theme.service';
import { SessionCreateDialogComponent } from './session-create-dialog.component';

describe('SessionCreateDialogComponent', () => {
  const close = vi.fn();

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [SessionCreateDialogComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            lakes: [
              { id: 'l1', name: 'Lake One', isFavorite: false },
            ],
          },
        },
        {
          provide: MatDialogRef,
          useValue: {
            close,
          },
        },
        {
          provide: ThemeService,
          useValue: {
            getSelectPanelClass: () => 'theme-dark-select-panel',
          },
        },
      ],
    }).compileComponents();
  });

  it('disables save when session name is blank', () => {
    const fixture = TestBed.createComponent(SessionCreateDialogComponent);
    const component = fixture.componentInstance;
    component.name = '   ';

    expect(component.canSave()).toBe(false);
  });

  it('closes with normalized payload when save is valid', () => {
    const fixture = TestBed.createComponent(SessionCreateDialogComponent);
    const component = fixture.componentInstance;

    component.name = '  Evening Session  ';
    component.startDateLocal = '2026-07-23T18:45';
    component.lakeId = 'l1';

    component.save();

    expect(close).toHaveBeenCalledOnce();
    const payload = close.mock.calls[0][0];
    expect(payload.name).toBe('Evening Session');
    expect(payload.lakeId).toBe('l1');
    expect(new Date(payload.startDate).toISOString()).toBe(payload.startDate);
  });
});
