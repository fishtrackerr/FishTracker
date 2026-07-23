import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-startup-splash',
  standalone: true,
  template: `
    <div class="splash" role="status" aria-live="polite" aria-label="Loading application">
      <img class="logo" src="icons/icon-192x192.png" alt="FishTracker logo" />
      <p class="label">Fishing Register</p>
      <p class="version">v{{ version() }}</p>
      <div class="spinner" aria-hidden="true"></div>
    </div>
  `,
  styles: `
    .splash {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100dvh;
      background: var(--background-primary, #0b0b0b);
      color: var(--text-primary, #fff);
      gap: 12px;
    }
    .logo {
      width: 84px;
      height: 84px;
      border-radius: 20px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
    }
    .label {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--primary, #ff6b00);
      margin: 0;
    }
    .version {
      font-size: 0.8rem;
      color: var(--text-secondary, #bbb);
      margin: 0;
      letter-spacing: 0.02em;
    }
    .spinner {
      width: 32px;
      height: 32px;
      border: 3px solid var(--border-primary, #333);
      border-top-color: var(--primary, #ff6b00);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-top: 8px;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `,
})
export class StartupSplashComponent {
  private readonly platformId = inject(PLATFORM_ID);

  readonly version = signal('0.0.0');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      void this.loadVersion();
    }
  }

  private async loadVersion(): Promise<void> {
    try {
      const response = await fetch('assets/version.json', {
        cache: 'no-store',
      });
      if (!response.ok) {
        return;
      }
      const payload = (await response.json()) as { version?: unknown };
      if (typeof payload.version === 'string' && payload.version.trim()) {
        this.version.set(payload.version);
      }
    } catch {
      // Keep default fallback when version file is unavailable.
    }
  }
}
