import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SettingsService } from './settings.service';
import { signal } from '@angular/core';

describe('ThemeService', () => {
  let overlayEl: HTMLElement;
  const settingsSignal = signal({ themeMode: 'dark' as const });

  beforeEach(() => {
    overlayEl = document.createElement('div');
    document.documentElement.removeAttribute('data-theme');

    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        {
          provide: SettingsService,
          useValue: {
            settings: settingsSignal.asReadonly(),
            update: vi.fn(),
          },
        },
        {
          provide: OverlayContainer,
          useValue: {
            getContainerElement: () => overlayEl,
          },
        },
      ],
    });
  });

  it('sets data-theme on document element for dark mode', () => {
    TestBed.inject(ThemeService);
    TestBed.flushEffects();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('syncs overlay container theme class', () => {
    TestBed.inject(ThemeService);
    TestBed.flushEffects();
    expect(overlayEl.classList.contains('theme-dark')).toBe(true);
    expect(overlayEl.getAttribute('data-theme')).toBe('dark');
  });

  it('returns select panel class for dark theme', () => {
    const theme = TestBed.inject(ThemeService);
    TestBed.flushEffects();
    expect(theme.getSelectPanelClass()).toBe('theme-dark-select-panel');
  });
});
