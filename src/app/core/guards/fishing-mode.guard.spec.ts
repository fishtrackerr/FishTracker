import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AppStartupService } from '../services/app-startup.service';
import { FishingModeService } from '../services/fishing-mode.service';
import { modeNotSelectedGuard } from './fishing-mode.guard';

describe('modeNotSelectedGuard', () => {
  let hasMode: boolean;
  let resolveUnlockedDestination: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    hasMode = false;
    resolveUnlockedDestination = vi.fn().mockResolvedValue('/sessions/active?id=s1');
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AppStartupService,
          useValue: { waitUntilReady: vi.fn().mockResolvedValue(undefined), resolveUnlockedDestination },
        },
        { provide: FishingModeService, useValue: { hasMode: () => hasMode } },
        { provide: Router, useValue: { parseUrl: (url: string) => ({ url }) } },
      ],
    });
  });

  const run = () =>
    TestBed.runInInjectionContext(() =>
      modeNotSelectedGuard({} as ActivatedRouteSnapshot, { url: '/mode-select' } as RouterStateSnapshot),
    );

  it('allows the mode picker before a mode is chosen', async () => {
    expect(await run()).toBe(true);
  });

  it('sends the user on once a mode is chosen', async () => {
    hasMode = true;
    expect(await run()).toEqual({ url: '/sessions/active?id=s1' });
    expect(resolveUnlockedDestination).toHaveBeenCalledWith('/');
  });
});
