import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PIN_MAX_ATTEMPTS } from '../models/app-lock-state.model';
import { PinLockService } from './pin-lock.service';
import { SecretVaultService } from './secret-vault.service';
import { SettingsService } from './settings.service';

describe('PinLockService', () => {
  let service: PinLockService;
  let router: { url: string; navigate: ReturnType<typeof vi.fn> };
  let settingsGet: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    router = { url: '/sessions', navigate: vi.fn() };
    settingsGet = vi.fn().mockReturnValue({
      pinHash: 'abc',
      pinSalt: 'def',
      lockTimeoutMinutes: 15,
    });

    TestBed.configureTestingModule({
      providers: [
        PinLockService,
        {
          provide: SettingsService,
          useValue: {
            get: settingsGet,
            update: vi.fn(),
          },
        },
        {
          provide: SecretVaultService,
          useValue: {
            lock: vi.fn(),
            unlockWithPin: vi.fn().mockResolvedValue(undefined),
            rewrapWithPin: vi.fn().mockResolvedValue(undefined),
            restoreFromSession: vi.fn(),
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
    expect(TestBed.inject(SecretVaultService).restoreFromSession).toHaveBeenCalled();
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

  it('applies lockout after repeated failed attempts', async () => {
    // Invalid base64 / hash path → always incorrect
    settingsGet.mockReturnValue({
      pinHash: btoa('abcd'),
      pinSalt: btoa('1234567890123456'),
      lockTimeoutMinutes: 15,
    });

    for (let i = 0; i < PIN_MAX_ATTEMPTS - 1; i++) {
      const result = await service.verifyPin('000000');
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.reason).toBe('incorrect');
      }
    }

    const locked = await service.verifyPin('000000');
    expect(locked.ok).toBe(false);
    if (!locked.ok) {
      expect(locked.reason).toBe('lockout');
      expect(locked.lockoutRemainingMs).toBeGreaterThan(0);
    }
    expect(service.getLockoutRemainingMs()).toBeGreaterThan(0);

    const whileLocked = await service.verifyPin('000000');
    expect(whileLocked.ok).toBe(false);
    if (!whileLocked.ok) {
      expect(whileLocked.reason).toBe('lockout');
    }
  });
});
