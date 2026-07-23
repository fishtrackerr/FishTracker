import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { toSignal } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';
import { SessionService } from '../../core/services/session.service';
import { StatisticsService, DashboardStats } from '../../core/services/statistics.service';
import { WeatherService } from '../../core/services/weather.service';
import { GeolocationService } from '../../core/services/geolocation.service';
import { LakeService } from '../../core/services/lake.service';
import { SettingsService } from '../../core/services/settings.service';
import { NotificationService } from '../../core/services/notification.service';
import { ImageService } from '../../core/services/image.service';
import { I18nService } from '../../core/services/i18n.service';
import { WeatherSnapshot } from '../../core/models';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { SessionCardComponent } from '../../shared/components/session-card/session-card.component';
import { WeatherCardComponent } from '../../shared/components/weather-card/weather-card.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { FormatWeightPipe } from '../../core/pipes/format-units.pipe';
import { DialogService } from '../../core/services/dialog.service';
import { RodSetupFlowService } from '../../core/services/rod-setup-flow.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import {
  SessionCreateDialogComponent,
  SessionCreateResult,
} from '../sessions/session-create-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    StatCardComponent,
    SessionCardComponent,
    WeatherCardComponent,
    ErrorStateComponent,
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
  private readonly lakeService = inject(LakeService);
  readonly settings = inject(SettingsService);
  private readonly notifications = inject(NotificationService);
  private readonly i18n = inject(I18nService);
  private readonly imageService = inject(ImageService);
  private readonly router = inject(Router);
  private readonly dialog = inject(DialogService);
  private readonly rodSetupFlow = inject(RodSetupFlowService);

  readonly sessions = toSignal(this.sessionService.watchAll(), { initialValue: [] });
  readonly activeSession = toSignal(this.sessionService.watchActive(), { initialValue: undefined });
  readonly stats = signal<DashboardStats | null>(null);
  readonly weather = signal<WeatherSnapshot | null>(null);
  readonly starting = signal(false);
  readonly loadError = signal<string | null>(null);
  readonly loading = signal(true);
  readonly homepageUrl = signal<string | null>(null);

  get recentSessions() {
    return this.sessions().slice(0, 5);
  }

  async ngOnInit(): Promise<void> {
    await this.loadDashboard();
  }

  async loadDashboard(): Promise<void> {
    this.loading.set(true);
    this.loadError.set(null);
    try {
      this.stats.set(await this.statsService.getDashboardStats());
      try {
        const pos = await this.geo.getCurrentPosition();
        if (pos) {
          const detailed = this.settings.get().detailedWeatherEnabled;
          const snapshot = detailed
            ? await this.weatherService.getDetailedForecast(pos.latitude, pos.longitude)
            : await this.weatherService.getSnapshot(pos.latitude, pos.longitude);
          this.weather.set(snapshot ?? this.weatherService.getCachedSnapshot());
        } else {
          this.weather.set(this.weatherService.getCachedSnapshot());
        }
      } catch {
        this.weather.set(this.weatherService.getCachedSnapshot());
      }
      this.homepageUrl.set(await this.imageService.getHomepageUrl());
    } catch {
      this.loadError.set('dashboard.loadError');
    } finally {
      this.loading.set(false);
    }
  }

  async startSession(): Promise<void> {
    if (this.starting()) {
      return;
    }
    try {
      const lakes = this.lakeService.getSortedLakes(await this.lakeService.getAll());
      const lastId = this.settings.get().lastLakeId;
      const defaultLake = lakes.find((l) => l.id === lastId);

      const ref = this.dialog.open(SessionCreateDialogComponent, {
        data: {
          lakes,
          defaultLakeId: defaultLake?.id,
          defaultName: defaultLake ? `Session at ${defaultLake.name}` : 'Fishing Session',
        },
        disableClose: true,
      });

      const result = await firstValueFrom(ref.afterClosed()) as SessionCreateResult | undefined;
      if (result) {
        await this.doStart(result);
      }
    } catch (error) {
      console.error('[Dashboard] startSession failed', error);
      this.notifications.error(this.i18n.t('dashboard.startFailed'));
    }
  }

  private async doStart(options: SessionCreateResult): Promise<void> {
    this.starting.set(true);
    try {
      const hadActive = !!(await this.sessionService.getActive());
      const session = await this.sessionService.start(options);
      if (!hadActive) {
        await this.rodSetupFlow.promptAfterSessionCreate(session);
      }
      this.notifications.success(this.i18n.t('dashboard.sessionStarted'));
      await this.router.navigate(['/sessions/active'], {
        queryParams: { id: session.id },
      });
    } catch (error) {
      console.error('[Dashboard] doStart failed', error);
      this.notifications.error(this.i18n.t('dashboard.createFailed'));
    } finally {
      this.starting.set(false);
    }
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
