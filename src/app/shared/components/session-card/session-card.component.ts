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
            <app-image-thumb [imageId]="session.coverImageId" placeholder="🌊" />
          </div>
          <div class="header-main">
            <div class="title-row">
              <h3 class="name">{{ session.name }}</h3>
              @if (session.status === 'active') {
                <span class="badge active">Active</span>
              } @else {
                <span class="badge" [class]="session.status">{{ session.status }}</span>
              }
            </div>
            @if (lakeName) {
              <p class="row lake">🌊 {{ lakeName }}</p>
            }
          </div>
        </div>

        <div class="card-body">
          <p class="row datetime">
            Start: {{ session.startDate | date:'d MMMM y, HH:mm' }}
          </p>
          <p class="row duration">Duration: {{ durationText() }}</p>

          <div class="stats-primary">
            <span>Catches: {{ session.catchCount }}</span>
            @if (session.biggestFishKg) {
              <span>Biggest: {{ session.biggestFishKg | formatWeight }}</span>
            }
            @if (session.totalCatchWeightKg > 0) {
              <span>Total: {{ session.totalCatchWeightKg | formatWeight }}</span>
            }
          </div>

          <app-expandable-section
            sectionId="session-{{ session.id }}-details"
            label="session details"
            [persistKey]="'session-card-details-' + session.id"
            [defaultExpanded]="false"
          >
            <div expandHeader class="expand-label">More information</div>
            @if (session.weather?.temperatureC != null) {
              <p class="row">Temperature: {{ session.weather!.temperatureC }}°C</p>
            }
            @if (session.notes) {
              <p class="row notes">{{ session.notes }}</p>
            }
            <p class="row muted">Updated: {{ session.updatedAt | date:'medium' }}</p>
          </app-expandable-section>

          <div class="actions" data-no-expand>
            @if (session.status === 'active') {
              <button mat-flat-button type="button" class="btn-primary" (click)="onContinue($event)">
                Continue
              </button>
            }
            <button mat-stroked-button type="button" (click)="onEdit($event)">Edit</button>
            <a mat-stroked-button [routerLink]="['/sessions', session.id]" (click)="$event.stopPropagation()">
              Details
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
      gap: var(--spacing-md);
      width: 100%;
      padding: var(--spacing-md);
      padding-right: 0;
    }
    .cover-wrap {
      width: 88px;
      height: 72px;
      flex-shrink: 0;
      border-radius: var(--radius-sm);
      overflow: hidden;
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
      gap: var(--spacing-xs);
      justify-content: center;
    }
    .card-body {
      padding: 0 var(--spacing-md) var(--spacing-md);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }
    .title-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--spacing-sm);
      justify-content: space-between;
    }
    .name {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 600;
      flex: 1;
      min-width: 0;
      word-break: break-word;
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
    .badge.completed { background: color-mix(in srgb, var(--success, #22c55e) 15%, transparent); color: var(--success, #22c55e); }
    .badge.planned { background: color-mix(in srgb, var(--info, #3b82f6) 15%, transparent); color: var(--info, #3b82f6); }
    .row {
      margin: 0;
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.4;
    }
    .row.muted { font-size: 0.8rem; color: var(--text-muted); }
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
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-sm);
      margin-top: var(--spacing-sm);
    }
    .btn-primary {
      background: var(--primary) !important;
      color: var(--text-on-primary) !important;
    }
    .card-body app-expandable-section {
      margin-top: var(--spacing-xs);
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
  private durationIntervalId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.startDurationTicker();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['session'] && !changes['session'].firstChange) {
      this.startDurationTicker();
    }
  }

  ngOnDestroy(): void {
    this.stopDurationTicker();
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
    this.editSession.emit(this.session);
  }
}
