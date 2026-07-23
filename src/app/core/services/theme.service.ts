import { Injectable, inject, signal, effect } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SettingsService } from './settings.service';
import { ThemeMode } from '../models';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly settings = inject(SettingsService);
  private readonly overlayContainer = inject(OverlayContainer);
  private readonly mediaQuery =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null;

  readonly resolvedTheme = signal<'dark' | 'light'>('dark');

  constructor() {
    effect(() => {
      const mode = this.settings.settings().themeMode;
      this.applyTheme(mode);
    });

    this.mediaQuery?.addEventListener('change', () => {
      if (this.settings.settings().themeMode === 'system') {
        this.applyTheme('system');
      }
    });
  }

  setTheme(mode: ThemeMode): void {
    this.settings.update({ themeMode: mode });
  }

  getSelectPanelClass(): string {
    return this.resolvedTheme() === 'dark' ? 'theme-dark-select-panel' : 'theme-light-select-panel';
  }

  private applyTheme(mode: ThemeMode): void {
    const resolved =
      mode === 'system'
        ? (this.mediaQuery?.matches ?? true)
          ? 'dark'
          : 'light'
        : mode;
    this.resolvedTheme.set(resolved);
    document.documentElement.setAttribute('data-theme', resolved);

    const overlayEl = this.overlayContainer.getContainerElement();
    overlayEl.classList.remove('theme-dark', 'theme-light', 'dark-theme', 'light-theme');
    overlayEl.classList.add(resolved === 'dark' ? 'theme-dark' : 'theme-light');
    overlayEl.setAttribute('data-theme', resolved);

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', resolved === 'dark' ? '#0b0b0b' : '#f7faff');
    }
  }
}
