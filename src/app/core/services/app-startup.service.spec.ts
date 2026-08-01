import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppStartupService } from './app-startup.service';
import { PinLockService } from './pin-lock.service';
import { FishingModeService } from './fishing-mode.service';
import { SessionRepository } from './session.repository';
import { SessionWeatherMonitorService } from './session-weather-monitor.service';
import { FishingSession } from '../models';
import { RETURN_URL_KEY } from '../constants/storage-keys';
import { db } from '../db/fish-db';

const fishingModeStub = {
  hasMode: vi.fn().mockReturnValue(true),
  getMode: vi.fn().mockReturnValue('carper'),
};

describe('AppStartupService.initialize', () => {
  let service: AppStartupService;
  let pinLock: {
    initializeFromStorage: ReturnType<typeof vi.fn>;
    subscribeToLockChanges: ReturnType<typeof vi.fn>;
  };
  let weatherMonitor: { start: ReturnType<typeof vi.fn> };
  let openSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    openSpy = vi.spyOn(db, 'open');
    pinLock = {
      initializeFromStorage: vi.fn(),
      subscribeToLockChanges: vi.fn(),
    };
    weatherMonitor = { start: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        AppStartupService,
        { provide: PinLockService, useValue: pinLock },
        { provide: FishingModeService, useValue: fishingModeStub },
        { provide: SessionRepository, useValue: { getAllActive: vi.fn().mockResolvedValue([]) } },
        { provide: SessionWeatherMonitorService, useValue: weatherMonitor },
        { provide: Router, useValue: { url: '/', navigate: vi.fn(), navigateByUrl: vi.fn() } },
      ],
    });

    service = TestBed.inject(AppStartupService);
  });

  afterEach(() => {
    openSpy.mockRestore();
  });

  it('marks ready after successful open', async () => {
    openSpy.mockResolvedValue(db as never);
    await service.initialize();
    expect(service.isReady()).toBe(true);
    expect(service.dbRecoveryKind()).toBeNull();
    expect(pinLock.initializeFromStorage).toHaveBeenCalled();
    expect(weatherMonitor.start).toHaveBeenCalled();
  });

  it('records versionMismatch without becoming ready', async () => {
    const err = new Error('Version mismatch');
    err.name = 'VersionError';
    openSpy.mockRejectedValue(err);

    await service.initialize();

    expect(service.isReady()).toBe(false);
    expect(service.dbRecoveryKind()).toBe('versionMismatch');
    expect(service.dbOpenError()).toContain('Version mismatch');
    expect(pinLock.initializeFromStorage).not.toHaveBeenCalled();
  });

  it('records upgradeFailed for UpgradeError', async () => {
    const err = new Error('Upgrade failed');
    err.name = 'UpgradeError';
    openSpy.mockRejectedValue(err);

    await service.initialize();

    expect(service.dbRecoveryKind()).toBe('upgradeFailed');
    expect(service.isReady()).toBe(false);
  });

  it('retryOpenDb finishes init after a previous failure', async () => {
    const err = new Error('Upgrade failed');
    err.name = 'UpgradeError';
    openSpy.mockRejectedValueOnce(err).mockResolvedValueOnce(db as never);

    await service.initialize();
    expect(service.isReady()).toBe(false);

    const ok = await service.retryOpenDb();
    expect(ok).toBe(true);
    expect(service.isReady()).toBe(true);
    expect(service.dbRecoveryKind()).toBeNull();
    expect(pinLock.initializeFromStorage).toHaveBeenCalledTimes(1);
  });
});

describe('AppStartupService.resolveInitialRoute', () => {
  let service: AppStartupService;
  let pinLock: {
    hasPinConfigured: ReturnType<typeof vi.fn>;
    isAppLocked: ReturnType<typeof vi.fn>;
  };
  let sessionRepo: { getAllActive: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    sessionStorage.clear();
    fishingModeStub.hasMode.mockReturnValue(true);
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
        { provide: FishingModeService, useValue: fishingModeStub },
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

  it('returns mode select when no fishing mode chosen', async () => {
    fishingModeStub.hasMode.mockReturnValue(false);
    const route = await service.resolveInitialRoute('/');
    expect(route).toBe('/mode-select');
  });

  it('stores deep link when redirecting to mode select', async () => {
    fishingModeStub.hasMode.mockReturnValue(false);
    const route = await service.resolveInitialRoute('/settings');
    expect(route).toBe('/mode-select');
    expect(sessionStorage.getItem(RETURN_URL_KEY)).toBe('/settings');
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
