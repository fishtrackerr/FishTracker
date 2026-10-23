import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FishingSession } from '../../core/models';
import { ConnectivityService } from '../../core/services/connectivity.service';
import { FeedbackPromptService } from '../../core/services/feedback-prompt.service';
import { FishingModeService } from '../../core/services/fishing-mode.service';
import { I18nService } from '../../core/services/i18n.service';
import { PrivacyWelcomeService } from '../../core/services/privacy-welcome.service';
import { SessionService } from '../../core/services/session.service';
import { ShareService } from '../../core/services/share.service';
import { WhatsNewService } from '../../core/services/whats-new.service';
import { ShellComponent } from './shell.component';

describe('ShellComponent', () => {
  const activeSession$ = new BehaviorSubject<FishingSession | undefined>(undefined);
  const isOnline = signal(true);
  const shareAppViaWhatsApp = vi.fn();
  const maybeShowPrivacyWelcome = vi.fn().mockResolvedValue(undefined);
  const maybeShowWhatsNew = vi.fn().mockResolvedValue(undefined);
  const maybeShowFeedback = vi.fn().mockResolvedValue(undefined);

  beforeEach(async () => {
    activeSession$.next(undefined);
    isOnline.set(true);
    shareAppViaWhatsApp.mockClear();
    maybeShowPrivacyWelcome.mockClear();
    maybeShowWhatsNew.mockClear();
    maybeShowFeedback.mockClear();

    await TestBed.configureTestingModule({
      imports: [ShellComponent],
      providers: [
        provideRouter([]),
        {
          provide: SessionService,
          useValue: {
            watchActive: () => activeSession$.asObservable(),
          },
        },
        { provide: FishingModeService, useValue: { selectedMode: signal('carper') } },
        {
          provide: ConnectivityService,
          useValue: {
            isOnline: isOnline.asReadonly(),
          },
        },
        {
          provide: ShareService,
          useValue: {
            shareAppViaWhatsApp,
          },
        },
        {
          provide: PrivacyWelcomeService,
          useValue: {
            maybeShow: maybeShowPrivacyWelcome,
          },
        },
        {
          provide: WhatsNewService,
          useValue: {
            maybeShow: maybeShowWhatsNew,
          },
        },
        {
          provide: FeedbackPromptService,
          useValue: {
            maybeShow: maybeShowFeedback,
          },
        },
        {
          provide: I18nService,
          useValue: {
            t: (key: string) => key,
            language: signal('en'),
            dictionary: signal({}),
          },
        },
      ],
    }).compileComponents();
  });

  it('asks privacy welcome, WhatsNew, then feedback prompt on init', async () => {
    TestBed.createComponent(ShellComponent);
    expect(maybeShowPrivacyWelcome).toHaveBeenCalledTimes(1);
    await vi.waitFor(() => expect(maybeShowWhatsNew).toHaveBeenCalledTimes(1));
    await vi.waitFor(() => expect(maybeShowFeedback).toHaveBeenCalledTimes(1));
  });

  it('shows offline banner when offline', () => {
    isOnline.set(false);
    const fixture = TestBed.createComponent(ShellComponent);
    fixture.detectChanges();

    const banner = fixture.nativeElement.querySelector('.offline-banner') as HTMLElement | null;
    expect(banner).toBeTruthy();
    expect(banner?.textContent).toContain('connectivity.offlineBanner');
  });

  it('hides offline banner when online', () => {
    const fixture = TestBed.createComponent(ShellComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.offline-banner')).toBeNull();
  });


  const activeSession = {
    id: 'active-1',
    name: 'Morning Session',
    status: 'active',
    startDate: '2026-07-23T07:00:00.000Z',
    photoIds: [],
    catchCount: 0,
    totalCatchWeightKg: 0,
    createdAt: '2026-07-23T07:00:00.000Z',
    updatedAt: '2026-07-23T07:00:00.000Z',
  } as FishingSession;

  function navLabels(root: HTMLElement): (string | undefined)[] {
    return Array.from(root.querySelectorAll('.bottom-nav > a span, .bottom-nav .more-trigger span')).map(
      (el) => el.textContent?.trim(),
    );
  }

  it('shows the same five tabs without an active session', () => {
    const fixture = TestBed.createComponent(ShellComponent);
    fixture.detectChanges();

    expect(navLabels(fixture.nativeElement)).toEqual([
      'nav.home',
      'nav.sessions',
      'nav.gallery',
      'nav.stats',
      'nav.more',
    ]);
  });

  it('shows More menu trigger in the bottom nav', () => {
    const fixture = TestBed.createComponent(ShellComponent);
    fixture.detectChanges();

    const more = fixture.nativeElement.querySelector('.more-trigger') as HTMLButtonElement | null;
    expect(more).toBeTruthy();
    expect(more?.textContent).toContain('nav.more');
  });

  it('opens a dashboard-styled More menu from the trigger', () => {
    const fixture = TestBed.createComponent(ShellComponent);
    fixture.detectChanges();

    const more = fixture.nativeElement.querySelector('.more-trigger') as HTMLButtonElement;
    more.click();
    fixture.detectChanges();

    const menu = fixture.nativeElement.querySelector('.more-nav-menu') as HTMLElement | null;
    expect(menu).toBeTruthy();
    expect(menu?.textContent).toContain('nav.settings');
  });

  it('shares the app via WhatsApp from the shell', () => {
    const fixture = TestBed.createComponent(ShellComponent);
    fixture.detectChanges();

    fixture.componentInstance.shareViaWhatsApp();

    expect(shareAppViaWhatsApp).toHaveBeenCalledTimes(1);
  });

  it('keeps the same five tabs when a session is active (no Current/Assistant tab)', () => {
    const fixture = TestBed.createComponent(ShellComponent);
    activeSession$.next(activeSession);
    fixture.detectChanges();

    expect(navLabels(fixture.nativeElement)).toEqual([
      'nav.home',
      'nav.sessions',
      'nav.gallery',
      'nav.stats',
      'nav.more',
    ]);
  });

  it('keeps Lakes, Assistant, Share and Settings in the More menu', () => {
    const fixture = TestBed.createComponent(ShellComponent);
    activeSession$.next(activeSession);
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('.more-trigger') as HTMLButtonElement).click();
    fixture.detectChanges();

    const hrefs = Array.from(
      fixture.nativeElement.querySelectorAll('.more-nav-menu a') as NodeListOf<HTMLAnchorElement>,
    ).map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(['/lakes', '/assistant', '/settings']);
    expect(fixture.nativeElement.querySelector('.more-nav-menu').textContent).toContain(
      'nav.shareWhatsApp',
    );
  });

  it('shows a plain mode chip when no session is active', () => {
    const fixture = TestBed.createComponent(ShellComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('a.live-chip')).toBeNull();
    expect(fixture.nativeElement.querySelector('span.mode-chip')).toBeTruthy();
  });

  it('turns the mode chip into a LIVE link to the active session', () => {
    const fixture = TestBed.createComponent(ShellComponent);
    activeSession$.next(activeSession);
    fixture.detectChanges();

    const chip = fixture.nativeElement.querySelector('a.live-chip') as HTMLAnchorElement;
    expect(chip.getAttribute('href')).toBe('/sessions/active-1');
    expect(chip.textContent).toContain('nav.live');
    expect(chip.textContent).toContain('modeSelect.modes.carper');
  });
});
