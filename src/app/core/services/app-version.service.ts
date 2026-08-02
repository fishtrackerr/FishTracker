import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { fetchWithTimeout } from '../utils';

/** Force a full document navigation so WebView / SW pick up the new assets. */
export function hardReloadApp(): void {
  if (typeof window === 'undefined') {
    return;
  }
  const url = new URL(window.location.href);
  url.searchParams.set('_reload', String(Date.now()));
  window.location.replace(url.toString());
}

/**
 * Displays the version of the **currently running** build (served assets),
 * not a remote bypass fetch that can disagree until reopen.
 */
@Injectable({ providedIn: 'root' })
export class AppVersionService {
  private readonly platformId = inject(PLATFORM_ID);
  readonly version = signal('0.0.0');

  async refreshInstalledVersion(): Promise<string> {
    if (!isPlatformBrowser(this.platformId)) {
      return this.version();
    }

    try {
      const response = await fetchWithTimeout(`assets/version.json?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
        },
      });
      if (!response.ok) {
        return this.version();
      }
      const payload = (await response.json()) as { version?: unknown };
      if (typeof payload.version === 'string' && payload.version.trim()) {
        this.version.set(payload.version.trim());
      }
    } catch {
      // Keep previous / fallback.
    }
    return this.version();
  }
}
