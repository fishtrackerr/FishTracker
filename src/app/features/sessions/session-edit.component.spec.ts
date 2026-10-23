import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { FishingSession } from '../../core/models';
import { ConfirmService } from '../../core/services/confirm.service';
import { I18nService } from '../../core/services/i18n.service';
import { LakeService } from '../../core/services/lake.service';
import { NotificationService } from '../../core/services/notification.service';
import { RodService } from '../../core/services/rod.service';
import { SessionService } from '../../core/services/session.service';
import { SettingsService } from '../../core/services/settings.service';
import { SessionEditComponent } from './session-edit.component';

const session = {
  id: 's-1',
  name: 'Night',
  status: 'completed',
  startDate: '2026-08-01T18:00:00.000Z',
  endDate: '2026-08-02T06:00:00.000Z',
  rods: [],
  sessionSpots: [],
} as unknown as FishingSession;

describe('SessionEditComponent returnUrl', () => {
  const navigate = vi.fn().mockResolvedValue(true);
  const navigateByUrl = vi.fn().mockResolvedValue(true);
  const updateSession = vi.fn().mockResolvedValue(session);

  function create(query: Record<string, string> = {}): SessionEditComponent {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: 's-1' })),
            snapshot: { queryParamMap: convertToParamMap(query) },
          },
        },
        { provide: Router, useValue: { navigate, navigateByUrl } },
        {
          provide: SessionService,
          useValue: { watchByIdIncludingHidden: () => of(session), updateSession },
        },
        {
          provide: LakeService,
          useValue: { watchAll: () => of([]), getById: vi.fn().mockResolvedValue(undefined) },
        },
        { provide: ConfirmService, useValue: { confirm: vi.fn() } },
        { provide: NotificationService, useValue: { success: vi.fn(), error: vi.fn() } },
        { provide: RodService, useValue: {} },
        { provide: SettingsService, useValue: { settings: () => ({ maxRodCount: 5 }) } },
        { provide: I18nService, useValue: { t: (key: string) => key } },
      ],
    });
    const component = TestBed.runInInjectionContext(() => new SessionEditComponent());
    TestBed.tick();
    return component;
  }

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.resetTestingModule();
  });

  it('saves and returns to the returnUrl', async () => {
    const component = create({ returnUrl: '/sessions/s-1' });
    await component.save();
    expect(updateSession).toHaveBeenCalled();
    expect(navigateByUrl).toHaveBeenCalledWith('/sessions/s-1');
    expect(navigate).not.toHaveBeenCalled();
  });

  it('saves and falls back to the session screen without a returnUrl', async () => {
    const component = create();
    await component.save();
    expect(navigate).toHaveBeenCalledWith(['/sessions', 's-1']);
  });

  it('cancels to the returnUrl', async () => {
    const component = create({ returnUrl: '/sessions/s-1' });
    await component.cancel();
    expect(navigateByUrl).toHaveBeenCalledWith('/sessions/s-1');
    expect(updateSession).not.toHaveBeenCalled();
  });

  it('ignores an unsafe returnUrl on cancel', async () => {
    const component = create({ returnUrl: 'https://evil.example/' });
    await component.cancel();
    expect(navigateByUrl).not.toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(['/sessions', 's-1']);
  });
});
