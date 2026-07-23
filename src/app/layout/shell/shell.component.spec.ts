import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FishingSession } from '../../core/models';
import { I18nService } from '../../core/services/i18n.service';
import { SessionService } from '../../core/services/session.service';
import { ShellComponent } from './shell.component';

describe('ShellComponent', () => {
  const activeSession$ = new BehaviorSubject<FishingSession | undefined>(undefined);

  beforeEach(async () => {
    activeSession$.next(undefined);

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

  it('hides current-session tab when no active session exists', () => {
    const fixture = TestBed.createComponent(ShellComponent);
    fixture.detectChanges();

    const links = fixture.nativeElement.querySelectorAll('.bottom-nav a span') as NodeListOf<HTMLSpanElement>;
    const currentLink = Array.from(links).find(
      (el) => el.textContent?.trim() === 'nav.current',
    );

    expect(currentLink).toBeUndefined();
  });

  it('shows current-session tab when an active session exists', () => {
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
    const currentLink = Array.from(links).find(
      (el) => el.textContent?.trim() === 'nav.current',
    );

    expect(currentLink).toBeDefined();
  });
});
