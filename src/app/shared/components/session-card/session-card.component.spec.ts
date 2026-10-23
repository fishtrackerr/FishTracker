import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FishingSession } from '../../../core/models';
import { SessionService } from '../../../core/services/session.service';
import { SessionCardComponent } from './session-card.component';

describe('SessionCardComponent', () => {
  let navigate: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    navigate = vi.fn().mockResolvedValue(true);
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: { navigate } },
        {
          provide: SessionService,
          useValue: { getDurationMs: () => 0, resolveCoverImageId: async () => undefined },
        },
      ],
    });
  });

  function createComponent(): SessionCardComponent {
    const component = TestBed.runInInjectionContext(() => new SessionCardComponent());
    component.session = { id: 's1', status: 'completed' } as FishingSession;
    return component;
  }

  it('navigates to the edit page exactly once on edit', () => {
    const component = createComponent();
    const event = new Event('click');
    const stop = vi.spyOn(event, 'stopPropagation');

    component.onEdit(event);

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(['/sessions', 's1', 'edit']);
    expect(stop).toHaveBeenCalled();
  });

  it('navigates to the active session and emits on continue', () => {
    const component = createComponent();
    const emitted: FishingSession[] = [];
    component.continueSession.subscribe((s) => emitted.push(s));

    component.onContinue(new Event('click'));

    expect(navigate).toHaveBeenCalledWith(['/sessions/active']);
    expect(emitted).toEqual([component.session]);
  });
});
