import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  convertToParamMap,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { FishingSession } from '../models';
import { SessionService } from '../services/session.service';
import { activeSessionRedirectGuard } from './active-session.guard';

describe('activeSessionRedirectGuard (/sessions/active)', () => {
  const getActive = vi.fn<SessionService['getActive']>();
  const getById = vi.fn<SessionService['getById']>();

  const session = (id: string, status: FishingSession['status']) =>
    ({ id, status }) as FishingSession;

  beforeEach(() => {
    vi.clearAllMocks();
    getActive.mockResolvedValue(undefined);
    getById.mockResolvedValue(undefined);
    TestBed.configureTestingModule({
      providers: [
        { provide: SessionService, useValue: { getActive, getById } },
        {
          provide: Router,
          useValue: { createUrlTree: (commands: unknown[]) => ({ commands }) },
        },
      ],
    });
  });

  const run = (query: Record<string, string> = {}) =>
    TestBed.runInInjectionContext(() =>
      activeSessionRedirectGuard(
        { queryParamMap: convertToParamMap(query) } as ActivatedRouteSnapshot,
        { url: '/sessions/active' } as RouterStateSnapshot,
      ),
    );

  it('redirects to the active session of the current mode', async () => {
    getActive.mockResolvedValue(session('a1', 'active'));
    expect(await run()).toEqual({ commands: ['/sessions', 'a1'] });
  });

  it('honours ?id= when it names an active session', async () => {
    getById.mockResolvedValue(session('s1', 'active'));
    getActive.mockResolvedValue(session('a1', 'active'));
    expect(await run({ id: 's1' })).toEqual({ commands: ['/sessions', 's1'] });
    expect(getById).toHaveBeenCalledWith('s1');
  });

  it('ignores ?id= of a session that is not active and falls back to the active one', async () => {
    getById.mockResolvedValue(session('old', 'completed'));
    getActive.mockResolvedValue(session('a1', 'active'));
    expect(await run({ id: 'old' })).toEqual({ commands: ['/sessions', 'a1'] });
  });

  it('redirects home when no session is active', async () => {
    expect(await run({ id: 'missing' })).toEqual({ commands: ['/'] });
  });
});
