import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SwUpdate } from '@angular/service-worker';
import { fetchWithTimeout } from '../utils';
import { isNativeApp } from '../utils/platform';

/**
 * Detects a newer `version.json` than the one currently controlling the page.
 * Does **not** hard-reload by itself — that races the service worker and blanks
 * Android. Instead it asks Angular's SwUpdate to install; SwUpdateService prompts.
 */
@Injectable({ providedIn: 'root' })
export class VersionCheckService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly swUpdate = inject(SwUpdate);
  private readonly versionUrl = 'assets/version.json';
  private currentVersion: string | null = null;
  private readonly checkIntervalMs = 5 * 60 * 1000;

  constructor() {
    if (!isPlatformBrowser(this.platformId) || isNativeApp()) {
      return;
    }

    void this.initialize();
  }

  private async initialize(): Promise<void> {
    this.currentVersion = await this.readVersion(false);
    void this.checkRemoteVersion();
    window.setInterval(() => {
      void this.checkRemoteVersion();
    }, this.checkIntervalMs);
  }

  private buildVersionUrl(bypassSw: boolean): string {
    if (!bypassSw) {
      return `${this.versionUrl}?t=${Date.now()}`;
    }

    const ts = Date.now();
    return `${this.versionUrl}?ngsw-bypass=true&t=${ts}`;
  }

  private async readVersion(bypassSw: boolean): Promise<string | null> {
    try {
      const response = await fetchWithTimeout(this.buildVersionUrl(bypassSw), {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      });

      if (!response.ok) {
        return null;
      }

      const payload = (await response.json()) as { version?: unknown };
      return typeof payload.version === 'string' ? payload.version : null;
    } catch {
      return null;
    }
  }

  private async checkRemoteVersion(): Promise<void> {
    const remoteVersion = await this.readVersion(true);
    if (!remoteVersion || !this.currentVersion) {
      return;
    }

    if (remoteVersion === this.currentVersion) {
      return;
    }

    // Hand off to the service worker update pipeline — never hard-reload here.
    if (this.swUpdate.isEnabled) {
      try {
        await this.swUpdate.checkForUpdate();
      } catch (err) {
        console.error('[VersionCheck] SW check failed', err);
      }
    }
  }
}
