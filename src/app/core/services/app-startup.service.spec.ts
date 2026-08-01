import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppStartupService } from './app-startup.service';
import { PinLockService } from './pin-lock.service';
import { SessionRepository } from './session.repository';
import { SessionWeatherMonitorService } from './session-weather-monitor.service';
import { FishingSession } from '../models';
import { RETURN_URL_KEY } from '../constants/storage-keys';

describe('AppStartupService.resolveInitialRoute', () => {
  let service: AppStartupService;
  let pinLock: {
    hasPinConfigured: ReturnType<typeof vi.fn>;
    isAppLocked: ReturnType<typeof vi.fn>;
  };
  let sessionRepo: { getAllActive: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    sessionStorage.clear();
    pinLock = {
      hasPinConfigured: vi.fn().mockReturnValue(true),
      isAppLocked: vi.fn().mockReturnValue(false),
    };
    sessionRepo = {
      getAllActive: vi.fn().mockResolvedValue([]),
    };

    TestBed.configureTestingModule({
      providers: [
        AppStartupService,
        { provide: PinLockService, useValue: pinLock },
        { provide: SessionRepository, useValue: sessionRepo },
        { provide: SessionWeatherMonitorService, useValue: { start: vi.fn() } },
        { provide: Router, useValue: { url: '/', navigate: vi.fn(), navigateByUrl: vi.fn() } },
      ],
    });

    service = TestBed.inject(AppStartupService);
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('returns unlock when locked', async () => {
    pinLock.isAppLocked.mockReturnValue(true);
    const route = await service.resolveInitialRoute('/');
    expect(route).toBe('/pin/unlock');
  });

  it('stores intended deep link when locked', async () => {
    pinLock.isAppLocked.mockReturnValue(true);
    await service.resolveInitialRoute('/settings');
    expect(sessionStorage.getItem(RETURN_URL_KEY)).toBe('/settings');
  });

  it('does not let a later home store wipe a deep-link return url', () => {
    service.storeReturnUrl('/settings');
    service.storeReturnUrl('/');
    expect(sessionStorage.getItem(RETURN_URL_KEY)).toBe('/settings');
  });

  it('returns setup when no PIN configured', async () => {
    pinLock.hasPinConfigured.mockReturnValue(false);
    const route = await service.resolveInitialRoute('/');
    expect(route).toBe('/pin/setup');
  });

  it('returns active session when at home and session exists', async () => {
    sessionRepo.getAllActive.mockResolvedValue([
      { id: 's-1', status: 'active', updatedAt: '2026-07-15T10:00:00.000Z' } as FishingSession,
    ]);

    const route = await service.resolveInitialRoute('/');
    expect(route).toBe('/sessions/active');
  });

  it('preserves deep link to settings', async () => {
    const route = await service.resolveInitialRoute('/settings');
    expect(route).toBe('/settings');
  });

  it('returns home when no active session', async () => {
    const route = await service.resolveInitialRoute('/');
    expect(route).toBe('/');
  });

  it('restores return url when resolving unlock while already unlocked', async () => {
    sessionStorage.setItem(RETURN_URL_KEY, '/gallery');
    const first = await service.resolveInitialRoute('/pin/unlock');
    const second = await service.resolveInitialRoute('/pin/unlock');
    expect(first).toBe('/gallery');
    expect(second).toBe('/gallery');
    expect(sessionStorage.getItem(RETURN_URL_KEY)).toBeNull();
  });
});
