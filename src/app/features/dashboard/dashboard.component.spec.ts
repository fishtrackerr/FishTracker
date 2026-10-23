import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FishingSession } from '../../core/models';
import { GeolocationService } from '../../core/services/geolocation.service';
import { I18nService } from '../../core/services/i18n.service';
import { ImageService } from '../../core/services/image.service';
import { NotificationService } from '../../core/services/notification.service';
import { PhotoPickService } from '../../core/services/photo-pick.service';
import { SessionService } from '../../core/services/session.service';
import { SessionStartFlowService } from '../../core/services/session-start-flow.service';
import { SettingsService } from '../../core/services/settings.service';
import { StatisticsService } from '../../core/services/statistics.service';
import { WeatherService } from '../../core/services/weather.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent session buttons', () => {
  const active$ = new BehaviorSubject<FishingSession | undefined>(undefined);
  const navigate = vi.fn().mockResolvedValue(true);
  const start = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    active$.next(undefined);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SessionService,
          useValue: {
            watchAll: () => new BehaviorSubject<FishingSession[]>([]),
            watchActive: () => active$.asObservable(),
          },
        },
        {
          provide: StatisticsService,
          useValue: { getDashboardStats: vi.fn().mockResolvedValue(null) },
        },
        {
          provide: WeatherService,
          useValue: { getCachedSnapshot: vi.fn().mockReturnValue(null) },
        },
        {
          provide: GeolocationService,
          useValue: { getCurrentPosition: vi.fn().mockResolvedValue(null) },
        },
        { provide: SettingsService, useValue: { get: vi.fn().mockReturnValue({}) } },
        {
          provide: ImageService,
          useValue: { getHomepageUrl: vi.fn().mockResolvedValue(null) },
        },
        { provide: PhotoPickService, useValue: { pickImage: vi.fn() } },
        { provide: NotificationService, useValue: { success: vi.fn(), error: vi.fn() } },
        {
          provide: I18nService,
          useValue: {
            t: vi.fn((key: string) => key),
            language: () => 'en',
            dictionary: () => ({}),
          },
        },
        provideRouter([]),
        {
          provide: SessionStartFlowService,
          useValue: { start, starting: () => false },
        },
      ],
    });
  });

  async function render(): Promise<HTMLElement> {
    vi.spyOn(TestBed.inject(Router), 'navigate').mockImplementation(navigate);
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    await vi.waitFor(() => {
      fixture.detectChanges();
      expect(root.querySelector('app-loading-state')).toBeNull();
    });
    return root;
  }

  it('offers Start session and no Continue button without an active session', async () => {
    const root = await render();

    const startBtn = root.querySelector('button.start-btn');
    expect(startBtn?.textContent).toContain('dashboard.startSession');
    expect(root.querySelector('button.continue-btn')).toBeNull();

    (startBtn as HTMLButtonElement).click();
    expect(start).toHaveBeenCalledOnce();
  });

  it('offers Continue session instead of Start when a session is active', async () => {
    active$.next({ id: 'a1', status: 'active', catchCount: 2 } as FishingSession);

    const root = await render();

    expect(root.textContent).not.toContain('dashboard.startSession');
    const continueBtn = root.querySelector('button.continue-btn') as HTMLButtonElement;
    expect(continueBtn.textContent).toContain('dashboard.continueActive');

    continueBtn.click();
    expect(navigate).toHaveBeenCalledWith(['/sessions/active'], { queryParams: { id: 'a1' } });
    expect(start).not.toHaveBeenCalled();
  });
});
