import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FishingSession } from '../../core/models';
import { ConnectivityService } from '../../core/services/connectivity.service';
import { I18nService } from '../../core/services/i18n.service';
import { SessionService } from '../../core/services/session.service';
import { ShellComponent } from './shell.component';

describe('ShellComponent', () => {
  const activeSession$ = new BehaviorSubject<FishingSession | undefined>(undefined);
  const isOnline = signal(true);

  beforeEach(async () => {
    activeSession$.next(undefined);
    isOnline.set(true);

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
        {
          provide: ConnectivityService,
          useValue: {
            isOnline: isOnline.asReadonly(),
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


  it('hides current-session tab when no active session exists', () => {
    const fixture = TestBed.createComponent(ShellComponent);
    fixture.detectChanges();

    const links = fixture.nativeElement.querySelectorAll('.bottom-nav a span') as NodeListOf<HTMLSpanElement>;
    const currentLink = Array.from(links).find(
      (el) => el.textContent?.trim() === 'nav.current',
    );

    expect(currentLink).toBeUndefined();
  });

  it('shows More menu trigger in the bottom nav', () => {
    const fixture = TestBed.createComponent(ShellComponent);
    fixture.detectChanges();

    const more = fixture.nativeElement.querySelector('.more-trigger') as HTMLButtonElement | null;
    expect(more).toBeTruthy();
    expect(more?.textContent).toContain('nav.more');
  });

  it('shows current-session and assistant tabs when an active session exists', () => {
    const fixture = TestBed.createComponent(ShellComponent);
    activeSession$.next({
      id: 'active-1',
      name: 'Morning Session',
      status: 'active',
      startDate: '2026-07-23T07:00:00.000Z',
      photoIds: [],
      catchCount: 0,
      totalCatchWeightKg: 0,
      createdAt: '2026-07-23T07:00:00.000Z',
      updatedAt: '2026-07-23T07:00:00.000Z',
    } as FishingSession);
    fixture.detectChanges();

    const links = fixture.nativeElement.querySelectorAll('.bottom-nav a span') as NodeListOf<HTMLSpanElement>;
    const labels = Array.from(links).map((el) => el.textContent?.trim());
    expect(labels).toContain('nav.current');
    expect(labels).toContain('nav.assistant');
  });
});
