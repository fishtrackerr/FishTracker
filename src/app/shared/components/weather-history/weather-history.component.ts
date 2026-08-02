import { DatePipe } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { map, of, switchMap } from 'rxjs';
import { SessionWeatherRecord } from '../../../core/models';
import { FormatTempPipe } from '../../../core/pipes/format-units.pipe';
import { SessionWeatherService } from '../../../core/services/session-weather.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

const PREVIEW_LIMIT = 5;

@Component({
  selector: 'app-weather-history',
  standalone: true,
  imports: [DatePipe, FormatTempPipe, TranslatePipe, RouterLink, MatButtonModule],
  template: `
    @if (history().length > 1) {
      <section class="weather-history app-card">
        <h3 class="section-title">
          {{ 'weatherHistory.title' | tr }} ({{ history().length }})
        </h3>
        <ul class="history-list">
          @for (record of visibleHistory(); track record.id) {
            <li
              class="history-item"
              [class.selected]="selectedId() === record.id"
              (click)="toggle(record.id)"
            >
              <div class="row">
                <span class="temp">{{ record.weather.temperatureC | formatTemp }}</span>
                <span class="desc">{{ record.weather.description }}</span>
                <span class="time">{{ record.capturedAt | date:'short' }}</span>
              </div>
              @if (selectedId() === record.id) {
                <div class="details">
                  <span>💨 {{ record.weather.windSpeedKmh }} km/h</span>
                  <span>🌡 {{ record.weather.airPressureHpa }} hPa</span>
                  <span>💧 {{ record.weather.humidity }}%</span>
                  @if (record.weather.rainProbability != null) {
                    <span>Rain {{ record.weather.rainProbability }}%</span>
                  }
                  <span>🌙 {{ record.weather.moonPhase }}</span>
                </div>
              }
            </li>
          }
        </ul>
        @if (showMoreLink()) {
          <a
            mat-stroked-button
            class="more-btn"
            [routerLink]="['/sessions', sessionId(), 'weather-history']"
          >
            {{ 'weatherHistory.more' | tr }}
          </a>
        }
      </section>
    }
  `,
  styles: `
    .weather-history {
      margin-top: var(--spacing-md);
    }
    .section-title {
      margin: 0 0 var(--spacing-sm);
      font-size: 1rem;
      color: var(--text-muted);
    }
    .history-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .history-item {
      padding: var(--spacing-sm) 0;
      border-bottom: 1px solid var(--border-primary);
      cursor: pointer;
    }
    .history-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    .history-item.selected {
      background: color-mix(in srgb, var(--primary) 8%, transparent);
      margin-inline: calc(-1 * var(--spacing-sm));
      padding-inline: var(--spacing-sm);
      border-radius: var(--radius-sm);
    }
    .row {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: var(--spacing-sm);
    }
    .temp {
      font-weight: 600;
      color: var(--primary);
    }
    .desc {
      flex: 1;
      min-width: 0;
      color: var(--text-primary);
      font-size: 0.9rem;
    }
    .time {
      font-size: 0.75rem;
      color: var(--text-muted);
    }
    .details {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-sm);
      margin-top: var(--spacing-sm);
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    .more-btn {
      width: 100%;
      margin-top: var(--spacing-md);
    }
  `,
})
export class WeatherHistoryComponent {
  private readonly sessionWeather = inject(SessionWeatherService);

  readonly sessionId = input.required<string>();
  /** When true, list every record (full history page). */
  readonly showAll = input(false);
  readonly selectedId = signal<string | null>(null);

  readonly history = toSignal(
    toObservable(this.sessionId).pipe(
      switchMap((id) =>
        id
          ? this.sessionWeather.watchBySession(id)
          : of([] as SessionWeatherRecord[]),
      ),
      map((records) =>
        [...records].sort((a, b) => b.capturedAt.localeCompare(a.capturedAt)),
      ),
    ),
    { initialValue: [] as SessionWeatherRecord[] },
  );

  readonly visibleHistory = computed(() => {
    const all = this.history();
    if (this.showAll() || all.length <= PREVIEW_LIMIT) {
      return all;
    }
    return all.slice(0, PREVIEW_LIMIT);
  });

  readonly showMoreLink = computed(
    () => !this.showAll() && this.history().length > PREVIEW_LIMIT,
  );

  toggle(id: string): void {
    this.selectedId.update((current) => (current === id ? null : id));
  }
}
