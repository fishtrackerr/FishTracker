import { DatePipe } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  output,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FishingSession } from '../../../core/models';
import { FormatWeightPipe } from '../../../core/pipes/format-units.pipe';
import { ImageThumbComponent } from '../image-thumb/image-thumb.component';
import { ExpandableSectionComponent } from '../expandable-section/expandable-section.component';
import { SessionService } from '../../../core/services/session.service';
import { formatDuration } from '../../../core/utils';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-session-card',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    MatButtonModule,
    ImageThumbComponent,
    FormatWeightPipe,
    ExpandableSectionComponent,
    TranslatePipe,
  ],
  template: `
    <article class="session-card">
      <app-expandable-section
        class="session-card-expand"
        [sectionId]="'session-card-' + session.id"
        label="session"
        [persistKey]="'session-card-' + session.id"
        [defaultExpanded]="defaultExpanded"
        [flat]="true"
      >
        <div expandHeader class="card-header">
          <div class="cover-wrap">
            <app-image-thumb [imageId]="coverImageId()" placeholder="🌊" />
          </div>
          <div class="header-main">
            <h3 class="name">{{ session.name }}</h3>
            @if (lakeName) {
              <p class="row lake">🌊 {{ lakeName }}</p>
            }
            <div class="badges">
              <span class="badge" [class]="session.status">{{ ('sessionStatus.' + session.status) | tr }}</span>
              @if (session.catchCount > 0) {
                <span
                  class="badge catches"
                  [attr.aria-label]="('sessionCard.catchesBadge' | tr: { count: session.catchCount })"
                >
                  🐟 {{ session.catchCount }}
                </span>
              }
            </div>
          </div>
        </div>

        <div class="card-body">
          <p class="row datetime">
            {{ 'sessionCard.start' | tr }} {{ session.startDate | date:'d MMMM y, HH:mm' }}
          </p>
          <p class="row duration">{{ 'sessionCard.duration' | tr }} {{ durationText() }}</p>

          <div class="stats-primary">
            <span>{{ 'sessionCard.catches' | tr }} {{ session.catchCount }}</span>
            @if (session.biggestFishKg) {
              <span>{{ 'sessionCard.biggest' | tr }} {{ session.biggestFishKg | formatWeight }}</span>
            }
            @if (session.totalCatchWeightKg > 0) {
              <span>{{ 'sessionCard.total' | tr }} {{ session.totalCatchWeightKg | formatWeight }}</span>
            }
          </div>

          <div class="more-info-box">
            <app-expandable-section
              sectionId="session-{{ session.id }}-details"
              label="session details"
              [persistKey]="'session-card-details-' + session.id"
              [defaultExpanded]="false"
              [flat]="true"
            >
              <div expandHeader class="expand-label">{{ 'sessionCard.moreInformation' | tr }}</div>
              <div class="more-info-body">
                @if (session.weather?.temperatureC != null) {
                  <p class="row">{{ 'sessionCard.temperature' | tr }} {{ session.weather!.temperatureC }}°C</p>
                }
                @if (session.notes) {
                  <p class="row notes">{{ session.notes }}</p>
                }
                <p class="row muted">{{ 'sessionCard.updated' | tr }} {{ session.updatedAt | date:'medium' }}</p>
              </div>
            </app-expandable-section>
          </div>

          <div class="actions" data-no-expand>
            @if (session.status === 'active') {
              <button mat-flat-button type="button" class="btn-primary" (click)="onContinue($event)">
                {{ 'common.continue' | tr }}
              </button>
            }
            <button mat-stroked-button type="button" (click)="onEdit($event)">{{ 'common.edit' | tr }}</button>
            <a mat-stroked-button [routerLink]="['/sessions', session.id]" (click)="$event.stopPropagation()">
              {{ 'sessionCard.details' | tr }}
            </a>
          </div>
        </div>
      </app-expandable-section>
    </article>
  `,
  styles: `
    .session-card {
      display: flex;
      flex-direction: column;
      background: var(--background-card);
      border-radius: var(--radius-md);
      overflow: hidden;
      border: 1px solid var(--border-primary);
      margin-bottom: var(--spacing-md);
    }
    .session-card-expand {
      display: block;
    }
    .card-header {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-md);
      width: 100%;
      padding: var(--spacing-md);
      padding-right: var(--spacing-xs);
      min-width: 0;
    }
    .cover-wrap {
      width: 80px;
      height: 80px;
      flex-shrink: 0;
      border-radius: var(--radius-sm);
      overflow: hidden;
      background: var(--background-secondary);
    }
    .cover-wrap app-image-thumb {
      display: block;
      width: 100%;
      height: 100%;
    }
    .header-main {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
      justify-content: center;
      padding-right: var(--spacing-xs);
    }
    .name {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      line-height: 1.3;
      color: var(--text-primary);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      overflow-wrap: break-word;
      word-break: normal;
    }
    .row.lake {
      font-size: 0.85rem;
      color: var(--text-muted);
    }
    .badges {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--spacing-xs);
    }
    .badge {
      text-transform: capitalize;
      padding: 2px 10px;
      border-radius: var(--radius-sm);
      font-size: 0.75rem;
      font-weight: 600;
      flex-shrink: 0;
    }
    .badge.active {
      background: color-mix(in srgb, var(--primary) 15%, transparent);
      color: var(--primary);
    }
    .badge.completed {
      background: color-mix(in srgb, var(--success, #22c55e) 15%, transparent);
      color: var(--success, #22c55e);
    }
    .badge.planned {
      background: color-mix(in srgb, var(--info, #3b82f6) 15%, transparent);
      color: var(--info, #3b82f6);
    }
    .badge.catches {
      text-transform: none;
      background: color-mix(in srgb, var(--success, #22c55e) 15%, transparent);
      color: var(--success, #22c55e);
    }
    .card-body {
      padding: 4px 20px 20px;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }
    .row {
      margin: 0;
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.4;
    }
    .row.muted {
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    .row.notes {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .stats-primary {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-sm) var(--spacing-md);
      font-size: 0.9rem;
      color: var(--text-primary);
      margin: var(--spacing-xs) 0;
    }
    .expand-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-secondary);
    }
    .more-info-box {
      margin-top: var(--spacing-xs);
      padding: 8px 16px;
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-md);
      background: var(--background-secondary);
    }
    .more-info-body {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
      padding: 8px 0;
    }
    .actions {
      display: flex;
      flex-wrap: nowrap;
      gap: var(--spacing-sm);
      margin-top: var(--spacing-sm);
    }
    .actions > button,
    .actions > a {
      flex: 1 1 0;
      min-width: 0;
    }
    .btn-primary {
      font-weight: 600 !important;
    }
    .card-body app-expandable-section {
      display: block;
    }
  `,
})
export class SessionCardComponent implements OnInit, OnChanges, OnDestroy {
  private readonly router = inject(Router);
  private readonly sessionService = inject(SessionService);

  @Input({ required: true }) session!: FishingSession;
  @Input() lakeName?: string;
  @Input() defaultExpanded = false;

  readonly continueSession = output<FishingSession>();
  readonly editSession = output<FishingSession>();

  readonly durationText = signal('');
  readonly coverImageId = signal<string | undefined>(undefined);
  private durationIntervalId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.startDurationTicker();
    void this.refreshCover();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['session'] && !changes['session'].firstChange) {
      this.startDurationTicker();
      void this.refreshCover();
    }
  }

  ngOnDestroy(): void {
    this.stopDurationTicker();
  }

  private async refreshCover(): Promise<void> {
    const session = this.session;
    if (!session) {
      this.coverImageId.set(undefined);
      return;
    }
    this.coverImageId.set(await this.sessionService.resolveCoverImageId(session));
  }

  private startDurationTicker(): void {
    this.stopDurationTicker();
    this.tickDuration();
    if (this.session.status === 'active') {
      this.durationIntervalId = setInterval(() => this.tickDuration(), 1000);
    }
  }

  private tickDuration(): void {
    this.durationText.set(
      formatDuration(this.sessionService.getDurationMs(this.session)),
    );
  }

  private stopDurationTicker(): void {
    if (this.durationIntervalId) {
      clearInterval(this.durationIntervalId);
      this.durationIntervalId = undefined;
    }
  }

  onContinue(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    void this.router.navigate(['/sessions/active']);
    this.continueSession.emit(this.session);
  }

  onEdit(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    void this.router.navigate(['/sessions', this.session.id, 'edit']);
    this.editSession.emit(this.session);
  }
}
