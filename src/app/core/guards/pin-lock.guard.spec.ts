import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { pinLockGuard } from './pin-lock.guard';
import { AppStartupService } from '../services/app-startup.service';
import { PinLockService } from '../services/pin-lock.service';

describe('pinLockGuard', () => {
  let startup: { waitUntilReady: ReturnType<typeof vi.fn>; storeReturnUrl: ReturnType<typeof vi.fn> };
  let pinLock: {
    hasPinConfigured: ReturnType<typeof vi.fn>;
    isAppLocked: ReturnType<typeof vi.fn>;
  };
  let router: { createUrlTree: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    startup = {
      waitUntilReady: vi.fn().mockResolvedValue(undefined),
      storeReturnUrl: vi.fn(),
    };
    pinLock = {
      hasPinConfigured: vi.fn().mockReturnValue(true),
      isAppLocked: vi.fn().mockReturnValue(true),
    };
    router = {
      createUrlTree: vi.fn((commands: string[]) => ({ commands })),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AppStartupService, useValue: startup },
        { provide: PinLockService, useValue: pinLock },
        { provide: Router, useValue: router },
      ],
    });
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('stores state.url (not router.url) when locked', async () => {
    const result = await TestBed.runInInjectionContext(() =>
      pinLockGuard({} as ActivatedRouteSnapshot, { url: '/settings' } as RouterStateSnapshot),
    );

    expect(startup.storeReturnUrl).toHaveBeenCalledWith('/settings');
    expect(router.createUrlTree).toHaveBeenCalledWith(['/pin/unlock']);
    expect(result).toEqual({ commands: ['/pin/unlock'] });
  });
});
