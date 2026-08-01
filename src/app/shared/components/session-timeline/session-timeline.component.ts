import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { of, switchMap } from 'rxjs';
import { SessionEvent } from '../../../core/models';
import { SessionEventService } from '../../../core/services/session-event.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-session-timeline',
  standalone: true,
  imports: [DatePipe, MatIconModule, TranslatePipe],
  template: `
    @if (events().length > 0) {
      <section class="timeline">
        <h3 class="section-title">{{ 'sessionTimeline.title' | tr }}</h3>
        <ul class="timeline-list">
          @for (event of events(); track event.id) {
            <li class="timeline-item">
              <mat-icon class="timeline-icon">{{ iconFor(event.type) }}</mat-icon>
              <div>
                <span class="timeline-desc">{{ event.description ?? event.type }}</span>
                <span class="timeline-time">{{ event.occurredAt | date:'short' }}</span>
              </div>
            </li>
          }
        </ul>
      </section>
    }
  `,
  styles: `
    .timeline-list { list-style: none; padding: 0; margin: 0; }
    .timeline-item {
      display: flex;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm) 0;
      border-bottom: 1px solid var(--border-primary);
    }
    .timeline-icon { color: var(--primary); flex-shrink: 0; }
    .timeline-desc { display: block; font-size: 0.9rem; }
    .timeline-time { font-size: 0.75rem; color: var(--text-muted); }
  `,
})
export class SessionTimelineComponent {
  private readonly sessionEvents = inject(SessionEventService);

  readonly sessionId = input.required<string>();

  readonly events = toSignal(
    toObservable(this.sessionId).pipe(
      switchMap((id) => (id ? this.sessionEvents.watchBySession(id) : of([] as SessionEvent[]))),
    ),
    { initialValue: [] as SessionEvent[] },
  );

  iconFor(type: SessionEvent['type']): string {
    const icons: Record<SessionEvent['type'], string> = {
      'session-start': 'play_arrow',
      'rod-created': 'add_circle',
      'rod-moved': 'swap_horiz',
      'rod-cast': 'south',
      bite: 'bolt',
      'fish-spotted': 'visibility',
      catch: 'set_meal',
      weather: 'cloud',
      note: 'note',
      'session-end': 'stop',
    };
    return icons[type] ?? 'circle';
  }
}
