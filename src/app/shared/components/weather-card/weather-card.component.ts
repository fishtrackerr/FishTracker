import { DatePipe } from '@angular/common';
import { Component, Input, effect, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormatTempPipe } from '../../../core/pipes/format-units.pipe';
import { WeatherService } from '../../../core/services/weather.service';
import { GeolocationService } from '../../../core/services/geolocation.service';
import { SettingsService } from '../../../core/services/settings.service';
import { WeatherSnapshot, WeatherWarning } from '../../../core/models';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [FormatTempPipe, DatePipe, MatButtonModule, TranslatePipe],
  template: `
    @if (displayWeather(); as w) {
      <div class="weather-card">
        @if (w.isCached || w.source === 'cached') {
          <p class="cached-badge">{{ 'weather.cachedOffline' | tr }}</p>
        }
        @for (warning of warnings(); track warning.message) {
          <div class="warning" [class.danger]="warning.severity === 'danger'">
            ⚠ {{ warning.message }}
          </div>
        }
        <div class="main">
          <span class="temp">{{ w.temperatureC | formatTemp }}</span>
          <span class="desc">{{ w.description }}</span>
        </div>
        <div class="details">
          @if (w.feelsLikeC != null) {
            <span>{{ 'weather.feelsLike' | tr }} {{ w.feelsLikeC | formatTemp }}</span>
          }
          @if (w.tempMinC != null && w.tempMaxC != null) {
            <span>{{ 'weather.minMax' | tr }} {{ w.tempMinC | formatTemp }} – {{ w.tempMaxC | formatTemp }}</span>
          }
          <span>💨 {{ w.windSpeedKmh }} km/h</span>
          @if (w.windGustKmh) { <span>{{ 'weather.gusts' | tr }} {{ w.windGustKmh }} km/h</span> }
          <span>🌡 {{ w.airPressureHpa }} hPa</span>
          <span>💧 {{ w.humidity }}%</span>
          @if (w.rainProbability != null) {
            <span>{{ 'weather.rain' | tr }} {{ w.rainProbability }}%</span>
          }
          @if (w.sunrise) {
            <span>🌅 {{ w.sunrise | date:'shortTime' }}</span>
          }
          @if (w.sunset) {
            <span>🌇 {{ w.sunset | date:'shortTime' }}</span>
          }
          <span>🌙 {{ w.moonPhase }}</span>
        </div>
        @if (detailed && w.daily?.length) {
          <div class="forecast">
            <h4>{{ 'weather.dailyForecast' | tr }}</h4>
            @for (day of w.daily!.slice(0, 5); track day.date) {
              <div class="forecast-row">
                <span>{{ day.date | date:'EEE' }}</span>
                <span>{{ day.tempMinC | formatTemp }} – {{ day.tempMaxC | formatTemp }}</span>
                <span>{{ day.precipitationProbability }}%</span>
              </div>
            }
          </div>
        }
        @if (showRefresh) {
          <button mat-stroked-button type="button" class="refresh-btn" (click)="refresh()">
            {{ 'weather.refresh' | tr }}
          </button>
        }
      </div>
    } @else {
      <div class="weather-card unavailable">
        {{ 'weather.unavailable' | tr }}
        @if (showRefresh) {
          <button mat-stroked-button type="button" (click)="refresh()">{{ 'common.retry' | tr }}</button>
        }
      </div>
    }
  `,
  styles: `
    .weather-card {
      background: var(--background-card);
      border-radius: var(--radius-md);
      padding: var(--spacing-md);
      border: 1px solid var(--border-primary);
    }
    .cached-badge {
      font-size: 0.75rem;
      color: var(--warning);
      margin: 0 0 var(--spacing-sm);
    }
    .warning {
      background: rgba(255, 176, 32, 0.15);
      border: 1px solid var(--warning);
      padding: var(--spacing-sm);
      border-radius: var(--radius-sm);
      margin-bottom: var(--spacing-sm);
      font-size: 0.85rem;
    }
    .warning.danger {
      background: rgba(214, 69, 69, 0.15);
      border-color: var(--danger);
    }
    .main {
      display: flex;
      align-items: baseline;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-sm);
    }
    .temp {
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary);
    }
    .desc { color: var(--text-muted); }
    .details {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-sm);
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    .forecast { margin-top: var(--spacing-md); }
    .forecast h4 { margin: 0 0 var(--spacing-sm); color: var(--text-primary); }
    .forecast-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
      padding: 4px 0;
    }
    .unavailable {
      color: var(--text-muted);
      text-align: center;
    }
    .refresh-btn { margin-top: var(--spacing-md); width: 100%; }
  `,
})
export class WeatherCardComponent {
  private readonly weatherService = inject(WeatherService);
  private readonly geo = inject(GeolocationService);
  private readonly settings = inject(SettingsService);

  @Input() detailed = false;
  @Input() showRefresh = false;

  readonly weather = input<WeatherSnapshot | undefined>();

  readonly displayWeather = signal<WeatherSnapshot | null>(null);
  readonly warnings = signal<WeatherWarning[]>([]);

  constructor() {
    effect(() => {
      this.applyWeather(this.weather());
    });
  }

  private applyWeather(w?: WeatherSnapshot): void {
    if (w) {
      this.displayWeather.set(w);
      if (this.settings.get().showWeatherWarnings) {
        this.warnings.set(this.weatherService.getWarnings(w));
      } else {
        this.warnings.set([]);
      }
      return;
    }
    const cached = this.weatherService.getCachedSnapshot();
    this.displayWeather.set(cached);
    if (cached && this.settings.get().showWeatherWarnings) {
      this.warnings.set(this.weatherService.getWarnings(cached));
    } else {
      this.warnings.set([]);
    }
  }

  async refresh(): Promise<void> {
    const pos = await this.geo.getCurrentPosition();
    if (!pos) {
      this.displayWeather.set(this.weatherService.getCachedSnapshot());
      return;
    }
    const useDetailed = this.settings.get().detailedWeatherEnabled;
    const snapshot = useDetailed
      ? await this.weatherService.getDetailedForecast(pos.latitude, pos.longitude)
      : await this.weatherService.getSnapshot(pos.latitude, pos.longitude);
    this.applyWeather(
      snapshot ??
        this.weatherService.getCachedSnapshotFor(pos.latitude, pos.longitude) ??
        undefined,
    );
  }
}
