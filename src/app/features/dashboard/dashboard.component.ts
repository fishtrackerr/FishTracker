import { Component, OnInit, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { toSignal } from '@angular/core/rxjs-interop';
import { SessionService } from '../../core/services/session.service';
import { StatisticsService, DashboardStats } from '../../core/services/statistics.service';
import { WeatherService } from '../../core/services/weather.service';
import { GeolocationService } from '../../core/services/geolocation.service';
import { SettingsService } from '../../core/services/settings.service';
import { ImageService } from '../../core/services/image.service';
import { WeatherSnapshot } from '../../core/models';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { SessionCardComponent } from '../../shared/components/session-card/session-card.component';
import { WeatherCardComponent } from '../../shared/components/weather-card/weather-card.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { FormatWeightPipe } from '../../core/pipes/format-units.pipe';
import { SessionStartFlowService } from '../../core/services/session-start-flow.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatDialogModule,
    RouterLink,
    StatCardComponent,
    SessionCardComponent,
    WeatherCardComponent,
    ErrorStateComponent,
    LoadingStateComponent,
    PageTitleComponent,
    FormatWeightPipe,
    TranslatePipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private readonly sessionService = inject(SessionService);
  private readonly statsService = inject(StatisticsService);
  private readonly weatherService = inject(WeatherService);
  private readonly geo = inject(GeolocationService);
  readonly settings = inject(SettingsService);
  private readonly imageService = inject(ImageService);
  private readonly router = inject(Router);
  private readonly sessionStartFlow = inject(SessionStartFlowService);

  readonly sessions = toSignal(this.sessionService.watchAll(), { initialValue: [] });
  readonly activeSession = toSignal(this.sessionService.watchActive(), { initialValue: undefined });
  readonly stats = signal<DashboardStats | null>(null);
  readonly weather = signal<WeatherSnapshot | null>(null);
  readonly starting = this.sessionStartFlow.starting;
  readonly loadError = signal<string | null>(null);
  readonly loading = signal(true);
  readonly homepageUrl = signal<string | null>(null);

  readonly recentSessions = computed(() => this.sessions().slice(0, 5));

  async ngOnInit(): Promise<void> {
    await this.loadDashboard();
  }

  async loadDashboard(): Promise<void> {
    this.loading.set(true);
    this.loadError.set(null);
    try {
      this.stats.set(await this.statsService.getDashboardStats());
      this.homepageUrl.set(await this.imageService.getHomepageUrl());
      this.weather.set(this.weatherService.getCachedSnapshot());
    } catch {
      this.loadError.set('dashboard.loadError');
    } finally {
      this.loading.set(false);
    }

    void this.loadWeatherInBackground();
  }

  private async loadWeatherInBackground(): Promise<void> {
    try {
      const pos = await this.geo.getCurrentPosition();
      if (pos) {
        const detailed = this.settings.get().detailedWeatherEnabled;
        const snapshot = detailed
          ? await this.weatherService.getDetailedForecast(pos.latitude, pos.longitude)
          : await this.weatherService.getSnapshot(pos.latitude, pos.longitude);
        this.weather.set(
          snapshot ??
            this.weatherService.getCachedSnapshotFor(pos.latitude, pos.longitude),
        );
      } else {
        this.weather.set(this.weatherService.getCachedSnapshot());
      }
    } catch {
      this.weather.set(this.weatherService.getCachedSnapshot());
    }
  }

  async startSession(): Promise<void> {
    await this.sessionStartFlow.start();
  }

  continueSession(): void {
    const active = this.activeSession();
    if (active) {
      void this.router.navigate(['/sessions/active'], {
        queryParams: { id: active.id },
      });
    }
  }
}
