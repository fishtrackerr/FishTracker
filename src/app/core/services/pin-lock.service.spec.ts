import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PinLockService } from './pin-lock.service';
import { SettingsService } from './settings.service';

describe('PinLockService', () => {
  let service: PinLockService;
  let router: { url: string; navigate: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    router = { url: '/sessions', navigate: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        PinLockService,
        {
          provide: SettingsService,
          useValue: {
            get: vi.fn().mockReturnValue({
              pinHash: 'abc',
              pinSalt: 'def',
              lockTimeoutMinutes: 15,
            }),
          },
        },
        { provide: Router, useValue: router },
      ],
    });

    service = TestBed.inject(PinLockService);
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('locks on cold start even when localStorage says unlocked', () => {
    localStorage.setItem(
      'fish-tracker-lock-state',
      JSON.stringify({
        isLocked: false,
        lastActivityAt: new Date().toISOString(),
      }),
    );
    service.initializeFromStorage();
    expect(service.isAppLocked()).toBe(true);
  });

  it('stays unlocked when unlock session exists and activity is recent', () => {
    sessionStorage.setItem('fish-tracker-unlock-session', '1');
    localStorage.setItem(
      'fish-tracker-lock-state',
      JSON.stringify({
        isLocked: false,
        lastActivityAt: new Date().toISOString(),
      }),
    );
    service.initializeFromStorage();
    expect(service.isAppLocked()).toBe(false);
  });

  it('locks after inactivity timeout even with unlock session', () => {
    sessionStorage.setItem('fish-tracker-unlock-session', '1');
    const past = new Date(Date.now() - 20 * 60 * 1000).toISOString();
    localStorage.setItem(
      'fish-tracker-lock-state',
      JSON.stringify({ isLocked: false, lastActivityAt: past }),
    );
    service.initializeFromStorage();
    expect(service.isAppLocked()).toBe(true);
  });

  it('persists unlock on unlock()', () => {
    service.initializeFromStorage();
    service.lock();
    service.unlock();
    expect(service.isAppLocked()).toBe(false);
    const stored = JSON.parse(localStorage.getItem('fish-tracker-lock-state')!);
    expect(stored.isLocked).toBe(false);
    expect(stored.lastActivityAt).toBeDefined();
    expect(sessionStorage.getItem('fish-tracker-unlock-session')).toBe('1');
  });

  it('navigates to unlock on lock when not on pin page', () => {
    service.initializeFromStorage();
    service.unlock();
    service.lock();
    expect(router.navigate).toHaveBeenCalledWith(['/pin/unlock']);
    expect(sessionStorage.getItem('fish-tracker-return-url')).toBe('/sessions');
    expect(sessionStorage.getItem('fish-tracker-unlock-session')).toBeNull();
  });
});
