import { Injectable, inject, signal, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { db } from '../db/fish-db';
import { PinLockService } from './pin-lock.service';
import { SessionRepository } from './session.repository';
import { RETURN_URL_KEY } from '../constants/storage-keys';

@Injectable({ providedIn: 'root' })
export class AppStartupService {
  private readonly pinLock = inject(PinLockService);
  private readonly sessionRepo = inject(SessionRepository);
  private readonly router = inject(Router);

  private readonly readySignal = signal(false);
  private initialNavigationDone = false;

  readonly isReady = this.readySignal.asReadonly();

  async initialize(): Promise<void> {
    await db.open();
    this.pinLock.initializeFromStorage();
    this.pinLock.subscribeToLockChanges((locked) => {
      if (locked && !this.router.url.startsWith('/pin/')) {
        this.storeReturnUrl(this.router.url);
        void this.router.navigate(['/pin/unlock']);
      }
    });
    this.readySignal.set(true);
    if (isDevMode()) {
      console.debug('[AppStartup] initialized');
    }
  }

  async performInitialNavigation(): Promise<void> {
    if (this.initialNavigationDone) {
      return;
    }
    this.initialNavigationDone = true;

    const intendedPath = this.getIntendedPath();
    const target = await this.resolveInitialRoute(intendedPath);

    if (isDevMode()) {
      console.debug('[AppStartup] initial navigation', { intendedPath, target });
    }

    const current = this.router.url.split('?')[0];
    if (current !== target.split('?')[0]) {
      await this.router.navigateByUrl(target);
    }
  }

  async resolveInitialRoute(intendedUrl?: string): Promise<string> {
    const path = intendedUrl ?? '/';

    if (path.startsWith('/pin/')) {
      return path;
    }

    if (!this.pinLock.hasPinConfigured()) {
      return '/pin/setup';
    }

    if (this.pinLock.isAppLocked()) {
      this.storeReturnUrl(path);
      return '/pin/unlock';
    }

    if (this.isPreservableDeepLink(path)) {
      return path;
    }

    const active = await this.getActiveSession();
    if (active) {
      return '/sessions/active';
    }

    return '/';
  }

  storeReturnUrl(url: string): void {
    if (url && !url.startsWith('/pin/')) {
      sessionStorage.setItem(RETURN_URL_KEY, url);
    }
  }

  consumeReturnUrl(): string {
    const url = sessionStorage.getItem(RETURN_URL_KEY) ?? '/';
    sessionStorage.removeItem(RETURN_URL_KEY);
    return url;
  }

  waitUntilReady(): Promise<void> {
    if (this.readySignal()) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      const check = (): void => {
        if (this.readySignal()) {
          resolve();
        } else {
          setTimeout(check, 10);
        }
      };
      check();
    });
  }

  private getIntendedPath(): string {
    const path = window.location.pathname;
    if (path && path !== '/') {
      return path + window.location.search;
    }
    return '/';
  }

  private isPreservableDeepLink(path: string): boolean {
    const base = path.split('?')[0];
    if (base === '/' || base === '') {
      return false;
    }
    if (base === '/sessions/active') {
      return true;
    }
    const shellRoutes = [
      '/sessions',
      '/lakes',
      '/gallery',
      '/statistics',
      '/settings',
      '/profile',
      '/release-notes',
    ];
    if (shellRoutes.some((r) => base === r || base.startsWith(r + '/'))) {
      return true;
    }
    return false;
  }

  private async getActiveSession() {
    const allActive = await this.sessionRepo.getAllActive();
    if (allActive.length === 0) {
      return undefined;
    }
    if (allActive.length > 1) {
      console.warn(
        '[AppStartup] Multiple active sessions found; using most recently updated',
        allActive.map((s) => s.id),
      );
      allActive.sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    }
    return allActive[0];
  }
}
