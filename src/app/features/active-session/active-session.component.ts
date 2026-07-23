import { Component, OnDestroy, OnInit, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { DialogService } from '../../core/services/dialog.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { switchMap, of } from 'rxjs';
import { SessionService } from '../../core/services/session.service';
import { CatchService } from '../../core/services/catch.service';
import { WeatherCardComponent } from '../../shared/components/weather-card/weather-card.component';
import { firstValueFrom } from 'rxjs';
import { QuickCatchDialogComponent } from '../catches/quick-catch-dialog.component';
import { QuickCatchInput } from '../../core/services/catch.service';
import { formatDuration } from '../../core/utils';
import { FormatWeightPipe } from '../../core/pipes/format-units.pipe';
import { DatePipe } from '@angular/common';
import { MapsLinkButtonComponent } from '../../shared/components/maps-link-button/maps-link-button.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { ConfirmService } from '../../core/services/confirm.service';
import { NotificationService } from '../../core/services/notification.service';
import { I18nService } from '../../core/services/i18n.service';

@Component({
  selector: 'app-active-session',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    WeatherCardComponent,
    FormatWeightPipe,
    MapsLinkButtonComponent,
    TranslatePipe,
  ],
  templateUrl: './active-session.component.html',
  styleUrl: './active-session.component.css',
})
export class ActiveSessionComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly sessionService = inject(SessionService);
  private readonly catchService = inject(CatchService);
  private readonly dialog = inject(DialogService);
  private readonly confirm = inject(ConfirmService);
  private readonly notifications = inject(NotificationService);
  private readonly i18n = inject(I18nService);

  readonly session = toSignal(
    this.route.paramMap.pipe(
      switchMap(() => this.sessionService.watchActive()),
    ),
  );

  readonly catches = toSignal(
    toObservable(this.session).pipe(
      switchMap((s) => (s ? this.catchService.watchBySession(s.id) : of([]))),
    ),
    { initialValue: [] },
  );

  readonly timer = signal('00:00:00');
  readonly showNotes = signal(false);
  notes = '';
  private intervalId?: ReturnType<typeof setInterval>;
  private notesSessionId = '';

  constructor() {
    effect(() => {
      const s = this.session();
      if (s && s.id !== this.notesSessionId) {
        this.notesSessionId = s.id;
        this.notes = s.notes ?? '';
      }
    });
  }

  ngOnInit(): void {
    this.intervalId = setInterval(() => this.updateTimer(), 1000);
    this.updateTimer();
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  updateTimer(): void {
    const s = this.session();
    if (s) {
      this.timer.set(formatDuration(this.sessionService.getDurationMs(s)));
    }
  }

  async refreshWeather(): Promise<void> {
    const s = this.session();
    if (s) await this.sessionService.refreshWeather(s.id);
  }

  async quickCatch(): Promise<void> {
    const s = this.session();
    if (!s) return;
    const ref = this.dialog.open(QuickCatchDialogComponent, {
      width: '100%',
      maxWidth: '480px',
    });
    const result = await firstValueFrom(ref.afterClosed()) as QuickCatchInput | undefined;
    if (result?.species) {
      await this.catchService.createQuick(s.id, result);
    }
  }

  async quickCamera(): Promise<void> {
    const s = this.session();
    if (!s) return;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) await this.sessionService.addSessionPhoto(s.id, file);
    };
    input.click();
  }

  async openDetails(): Promise<void> {
    const s = this.session();
    if (!s) return;
    await this.router.navigate(['/sessions', s.id]);
  }

  async openEdit(): Promise<void> {
    const s = this.session();
    if (!s) return;
    await this.router.navigate(['/sessions', s.id, 'edit']);
  }

  toggleNotes(): void {
    this.showNotes.update((v) => !v);
  }

  async saveNotes(): Promise<void> {
    const s = this.session();
    if (s) await this.sessionService.update(s.id, { notes: this.notes });
  }

  async complete(): Promise<void> {
    const s = this.session();
    if (!s) return;

    const confirmed = await this.confirm.confirm({
      title: this.i18n.t('activeSession.endSession'),
      message: this.i18n.t('activeSession.endSessionConfirm') || 'End this fishing session?',
      confirmLabel: this.i18n.t('activeSession.endSession'),
    });

    if (!confirmed) return;

    try {
      await this.sessionService.complete(s.id);
      this.notifications.success(this.i18n.t('activeSession.sessionEnded') || 'Session ended');
      await this.router.navigate(['/sessions']);
    } catch (error) {
      console.error('[ActiveSession] Failed to complete session', error);
      this.notifications.error(this.i18n.t('activeSession.endFailed') || 'Failed to end session');
    }
  }
}
