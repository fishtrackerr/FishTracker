import { Injectable, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { FishingSession, WeatherSnapshot, WeatherWarning } from '../models';
import { NotificationService } from './notification.service';
import { SessionEventService } from './session-event.service';
import { SessionService } from './session.service';
import { SettingsService } from './settings.service';
import { WeatherService } from './weather.service';

const MIN_REFRESH_MINUTES = 5;

/** Exported for unit tests — fingerprint of a warning for escalate detection. */
export function weatherWarningFingerprint(warning: WeatherWarning): string {
  return `${warning.type}:${warning.severity}`;
}

/**
 * Returns warnings that are new or higher severity than previously alerted.
 * Updates `previous` in place to match the current warning set.
 */
export function takeEscalatedWarnings(
  previous: Set<string>,
  warnings: WeatherWarning[],
): WeatherWarning[] {
  const escalated: WeatherWarning[] = [];

  for (const warning of warnings) {
    const fp = weatherWarningFingerprint(warning);
    if (previous.has(fp)) {
      continue;
    }
    const hadDanger = previous.has(`${warning.type}:danger`);
    const hadWarning = previous.has(`${warning.type}:warning`);
    if (warning.severity === 'danger' && hadDanger) {
      continue;
    }
    if (warning.severity === 'warning' && (hadWarning || hadDanger)) {
      continue;
    }
    escalated.push(warning);
  }

  previous.clear();
  for (const warning of warnings) {
    previous.add(weatherWarningFingerprint(warning));
  }

  return escalated;
}

@Injectable({ providedIn: 'root' })
export class SessionWeatherMonitorService implements OnDestroy {
  private readonly sessionService = inject(SessionService);
  private readonly weatherService = inject(WeatherService);
  private readonly settings = inject(SettingsService);
  private readonly notifications = inject(NotificationService);
  private readonly sessionEvents = inject(SessionEventService);

  private started = false;
  private sessionSub?: Subscription;
  private pollTimerId?: ReturnType<typeof setInterval>;
  private activeSessionId: string | null = null;
  private readonly fingerprintsBySession = new Map<string, Set<string>>();
  private refreshInFlight = false;

  /** Begin watching the active session and polling weather. Safe to call once. */
  start(): void {
    if (this.started) {
      return;
    }
    this.started = true;
    this.sessionSub = this.sessionService.watchActive().subscribe((session) => {
      void this.onActiveSession(session);
    });
  }

  ngOnDestroy(): void {
    this.sessionSub?.unsubscribe();
    this.clearPollTimer();
  }

  private async onActiveSession(session: FishingSession | undefined): Promise<void> {
    if (!session) {
      this.activeSessionId = null;
      this.clearPollTimer();
      return;
    }

    const sessionChanged = session.id !== this.activeSessionId;
    this.activeSessionId = session.id;

    if (!sessionChanged) {
      return;
    }

    this.fingerprintsBySession.delete(session.id);
    this.evaluateAndAlert(session.id, session.weather);
    this.restartPollTimer();
    if (this.settings.get().autoLoadWeather) {
      void this.pollRefresh();
    }
  }

  private restartPollTimer(): void {
    this.clearPollTimer();
    const { autoLoadWeather, weatherRefreshMinutes } = this.settings.get();
    if (!autoLoadWeather || !this.activeSessionId) {
      return;
    }
    const minutes = Math.max(
      MIN_REFRESH_MINUTES,
      weatherRefreshMinutes || MIN_REFRESH_MINUTES,
    );
    this.pollTimerId = setInterval(() => {
      void this.pollRefresh();
    }, minutes * 60 * 1000);
  }

  private clearPollTimer(): void {
    if (this.pollTimerId != null) {
      clearInterval(this.pollTimerId);
      this.pollTimerId = undefined;
    }
  }

  private async pollRefresh(): Promise<void> {
    const sessionId = this.activeSessionId;
    if (!sessionId || this.refreshInFlight) {
      return;
    }
    if (!this.settings.get().autoLoadWeather) {
      return;
    }

    this.refreshInFlight = true;
    try {
      await this.sessionService.refreshWeather(sessionId);
      const session = await this.sessionService.getById(sessionId);
      if (session?.weather) {
        this.evaluateAndAlert(sessionId, session.weather);
      }
    } finally {
      this.refreshInFlight = false;
    }
  }

  private evaluateAndAlert(
    sessionId: string,
    weather: WeatherSnapshot | undefined,
  ): void {
    if (!weather || !this.settings.get().showWeatherWarnings) {
      return;
    }

    const warnings = this.weatherService.getWarnings(weather);
    let fingerprints = this.fingerprintsBySession.get(sessionId);
    if (!fingerprints) {
      fingerprints = new Set();
      this.fingerprintsBySession.set(sessionId, fingerprints);
    }

    const escalated = takeEscalatedWarnings(fingerprints, warnings);
    if (escalated.length === 0) {
      return;
    }

    const primary =
      escalated.find((w) => w.severity === 'danger') ?? escalated[0];
    this.notifications.weatherWarning(primary.message);

    for (const danger of escalated.filter((w) => w.severity === 'danger')) {
      void this.sessionEvents.record({
        sessionId,
        type: 'weather',
        description: `Weather alert: ${danger.message}`,
      });
    }
  }
}
