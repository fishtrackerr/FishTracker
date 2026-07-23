import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppStartupService } from './app-startup.service';
import { PinLockService } from './pin-lock.service';
import { SessionRepository } from './session.repository';
import { FishingSession } from '../models';

describe('AppStartupService.resolveInitialRoute', () => {
  let service: AppStartupService;
  let pinLock: {
    hasPinConfigured: ReturnType<typeof vi.fn>;
    isAppLocked: ReturnType<typeof vi.fn>;
  };
  let sessionRepo: { getAllActive: ReturnType<typeof vi.fn> };

  beforeEach(() => {
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
        { provide: Router, useValue: { url: '/', navigate: vi.fn(), navigateByUrl: vi.fn() } },
      ],
    });

    service = TestBed.inject(AppStartupService);
  });

  it('returns unlock when locked', async () => {
    pinLock.isAppLocked.mockReturnValue(true);
    const route = await service.resolveInitialRoute('/');
    expect(route).toBe('/pin/unlock');
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
});
