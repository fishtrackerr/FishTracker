import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Catch, FishingSession, SessionRod } from '../../core/models';
import { FormatWeightPipe } from '../../core/pipes/format-units.pipe';
import { CatchService } from '../../core/services/catch.service';
import { I18nService } from '../../core/services/i18n.service';
import { LakeService } from '../../core/services/lake.service';
import { SessionService } from '../../core/services/session.service';
import { formatDuration } from '../../core/utils';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

export interface RodSummaryRow {
  rod: SessionRod;
  spot: string;
  bait: string;
  bites: number;
  fish: number;
}

/**
 * End-of-session summary (`/sessions/:id/summary`), shown right after ending a session:
 * stats, biggest fish, a per-rod table and a last-notes field.
 */
@Component({
  selector: 'app-session-summary',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormatWeightPipe,
    TranslatePipe,
  ],
  templateUrl: './session-summary.component.html',
  styleUrl: './session-summary.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionSummaryComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly sessionService = inject(SessionService);
  private readonly catchService = inject(CatchService);
  private readonly lakeService = inject(LakeService);
  private readonly i18n = inject(I18nService);

  private readonly sessionId$ = this.route.paramMap.pipe(map((p) => p.get('id') ?? ''));

  /** `null` while loading, `undefined` when not found (or in another fishing mode). */
  readonly session = toSignal<FishingSession | undefined | null>(
    this.sessionId$.pipe(switchMap((id) => this.sessionService.watchById(id))),
    { initialValue: null },
  );
  readonly catches = toSignal(
    this.sessionId$.pipe(switchMap((id) => this.catchService.watchBySession(id))),
    { initialValue: [] as Catch[] },
  );

  readonly lakeName = signal('');
  readonly notes = signal('');
  private notesSource: string | undefined;
  private hydratedSessionId = '';

  readonly rods = computed<SessionRod[]>(() =>
    [...(this.session()?.rods ?? [])].sort((a, b) => a.rodNumber - b.rodNumber),
  );

  /** Swim name when every rod is on the same spot, else ''. */
  readonly swim = computed(() => {
    const rods = this.rods();
    const spotId = rods[0]?.sessionSpotId;
    if (!spotId || rods.some((r) => r.sessionSpotId !== spotId)) {
      return '';
    }
    return this.spotName(spotId);
  });

  readonly duration = computed(() => {
    const s = this.session();
    return s ? formatDuration(this.sessionService.getDurationMs(s)) : '';
  });

  readonly catchCount = computed(() => this.catches().length);
  readonly biteCount = computed(() => this.rods().reduce((sum, r) => sum + r.biteCount, 0));
  readonly totalWeightKg = computed(() =>
    this.catches().reduce((sum, c) => sum + (c.weightKg ?? 0), 0),
  );

  /** Heaviest catch of the session (ties: the first one); undefined without any weight. */
  readonly biggest = computed<Catch | undefined>(() => {
    let best: Catch | undefined;
    for (const c of this.catches()) {
      if ((c.weightKg ?? 0) > (best?.weightKg ?? 0)) {
        best = c;
      }
    }
    return best;
  });
  readonly biggestRod = computed(() => {
    const rodId = this.biggest()?.rodId;
    return rodId ? this.rods().find((r) => r.id === rodId) : undefined;
  });

  readonly rodRows = computed<RodSummaryRow[]>(() =>
    this.rods().map((rod) => ({
      rod,
      spot: this.spotName(rod.sessionSpotId),
      bait: rod.bait ?? '',
      bites: rod.biteCount,
      fish: this.catches().filter((c) => c.rodId === rod.id).length,
    })),
  );

  constructor() {
    effect(() => {
      const s = this.session();
      if (!s) {
        return;
      }
      untracked(() => {
        this.hydrateNotes(s);
        // A live session has nothing to summarise yet: show the session itself.
        if (s.status === 'active') {
          void this.router.navigate(['/sessions', s.id], { replaceUrl: true });
        }
      });
    });
    effect(() => {
      const lakeId = this.session()?.lakeId;
      untracked(() => void this.loadLakeName(lakeId));
    });
  }

  spotName(sessionSpotId?: string): string {
    if (!sessionSpotId) {
      return '';
    }
    return this.session()?.sessionSpots?.find((sp) => sp.id === sessionSpotId)?.name ?? '';
  }

  rodLabel(rod: SessionRod): string {
    return this.i18n.t('rod.sheetTitle', { n: rod.rodNumber });
  }

  /** Saves the notes when they changed (blur, Open session, Done). */
  async saveNotes(): Promise<void> {
    const s = this.session();
    if (!s) {
      return;
    }
    const value = this.notes();
    if (value === this.notesSource) {
      return;
    }
    this.notesSource = value;
    await this.sessionService.update(s.id, { notes: value || undefined });
  }

  async openSession(): Promise<void> {
    const s = this.session();
    if (!s) {
      return;
    }
    await this.saveNotes();
    await this.router.navigate(['/sessions', s.id]);
  }

  async done(): Promise<void> {
    await this.saveNotes();
    await this.router.navigate(['/']);
  }

  private hydrateNotes(s: FishingSession): void {
    const newSession = s.id !== this.hydratedSessionId;
    this.hydratedSessionId = s.id;
    // Take over stored notes unless the user has typed something not saved yet.
    if (newSession || ((s.notes ?? '') !== this.notesSource && this.notes() === this.notesSource)) {
      this.notesSource = s.notes ?? '';
      this.notes.set(this.notesSource);
    }
  }

  private async loadLakeName(lakeId: string | undefined): Promise<void> {
    if (!lakeId) {
      this.lakeName.set('');
      return;
    }
    const lake = await this.lakeService.getById(lakeId);
    this.lakeName.set(lake?.name ?? '');
  }
}
