import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { FilterService } from './filter.service';
import { FishingModeService } from './fishing-mode.service';
import { FishingSession } from '../models';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        FilterService,
        {
          provide: FishingModeService,
          useValue: { getMode: () => 'carper' },
        },
      ],
    });
    service = TestBed.inject(FilterService);
  });

  it('counts active filters', () => {
    expect(service.countActive({ species: 'Catfish', sessionStatus: 'active' })).toBe(2);
    expect(service.countActive({})).toBe(0);
  });

  it('filters sessions by status', () => {
    const sessions: FishingSession[] = [
      { id: '1', status: 'active' } as FishingSession,
      { id: '2', status: 'completed' } as FishingSession,
    ];
    const result = service.applyToSessions(sessions, { sessionStatus: 'active' });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('clears active filter', () => {
    service.setActive({ species: 'Pike' });
    service.clearActive();
    expect(service.getActive()).toEqual({});
  });
});
