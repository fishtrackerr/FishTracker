import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SessionRod } from '../../../core/models';
import { I18nService } from '../../../core/services/i18n.service';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

/** Theme colour for a rod marker (--rod-1 … --rod-6, repeating; invalid numbers use rod 1). */
export function rodMarkerColor(rodNumber: number): string {
  const index = ((Math.max(1, rodNumber || 1) - 1) % 6) + 1;
  return `var(--rod-${index})`;
}

/**
 * One rod on the session screen. `live` shows the big Bite +1 / Catch buttons;
 * `compact` is a small row (inactive rods, finished sessions) with a small +1.
 * The name area and the ⋮ button emit `open` (the parent opens the rod sheet).
 */
@Component({
  selector: 'app-rod-tile',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule, TranslatePipe],
  template: `
    <article
      class="rod-tile"
      [class.compact]="variant() === 'compact'"
      [class.inactive]="!rod().isActive"
      [style.--rod-color]="rodColor()"
    >
      <div class="tile-head">
        <button type="button" class="tile-open" (click)="open.emit()">
          <span class="rod-marker" aria-hidden="true">{{ rod().rodNumber }}</span>
          <span class="tile-text">
            <span class="rod-name">
              {{ rod().name }}
              @if (spotName()) {
                <span class="spot">· {{ spotName() }}</span>
              }
            </span>
            <span class="rod-line">{{ detailLine() }}</span>
          </span>
          @if (!rod().isActive) {
            <span class="status">{{ 'rod.inactive' | tr }}</span>
          }
        </button>
        @if (variant() === 'compact') {
          <button
            mat-stroked-button
            type="button"
            class="bite-small"
            [attr.aria-label]="('sessionScreen.bitePlusOne' | tr) + ' ' + rod().name"
            (click)="bite.emit()"
          >
            +1
          </button>
        }
        <button
          mat-icon-button
          type="button"
          class="more-btn"
          [attr.aria-label]="('sessionScreen.rodOptions' | tr) + ' ' + rod().name"
          (click)="open.emit()"
        >
          <mat-icon>more_vert</mat-icon>
        </button>
      </div>
      @if (variant() === 'live') {
        <div class="tile-actions">
          <button mat-stroked-button type="button" class="bite-btn" (click)="bite.emit()">
            {{ 'sessionScreen.bitePlusOne' | tr }}
          </button>
          <button mat-flat-button type="button" class="catch-btn" (click)="catchTap.emit()">
            {{ 'sessionScreen.catch' | tr }}
          </button>
        </div>
      }
    </article>
  `,
  styles: `
    :host {
      display: block;
    }
    .rod-tile {
      background: var(--background-card);
      border: 1px solid var(--border-primary);
      border-left: 4px solid var(--rod-color, var(--primary));
      border-radius: var(--radius-md);
      padding: var(--spacing-sm) var(--spacing-sm) var(--spacing-md);
      box-shadow: var(--shadow-sm);
    }
    .rod-tile.compact {
      padding-bottom: var(--spacing-sm);
    }
    .rod-tile.inactive {
      opacity: 0.65;
      border-left-color: var(--border-strong);
    }
    .tile-head {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
    }
    .tile-open {
      flex: 1;
      min-width: 0;
      min-height: 48px;
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-xs);
      border: 0;
      border-radius: var(--radius-sm);
      background: transparent;
      color: var(--text-primary);
      font: inherit;
      text-align: left;
      cursor: pointer;
    }
    .tile-open:focus-visible {
      outline: 2px solid var(--border-active);
      outline-offset: 2px;
    }
    .rod-marker {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: var(--radius-sm);
      background: var(--rod-color, var(--primary));
      color: var(--rod-marker-text);
      box-shadow: var(--rod-glow) var(--rod-color, transparent);
      font-family: var(--font-label);
      font-weight: 700;
      font-size: 1.15rem;
    }
    .compact .rod-marker {
      width: 32px;
      height: 32px;
      font-size: 1rem;
    }
    .inactive .rod-marker {
      background: var(--background-raised);
      color: var(--text-muted);
      box-shadow: none;
    }
    .tile-text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }
    .rod-name {
      font-family: var(--font-label);
      font-weight: 700;
      font-size: 1.1rem;
      letter-spacing: var(--label-spacing);
      text-transform: var(--label-transform);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .spot {
      color: var(--text-secondary);
      font-weight: 600;
    }
    .rod-line {
      font-size: 0.85rem;
      color: var(--text-secondary);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .status {
      flex-shrink: 0;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-muted);
      font-family: var(--font-label);
      text-transform: var(--label-transform);
    }
    .more-btn {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      color: var(--text-secondary);
    }
    .bite-small {
      flex-shrink: 0;
      min-width: 52px;
      height: 44px !important;
    }
    .tile-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-sm);
      margin-top: var(--spacing-sm);
      padding: 0 var(--spacing-xs);
    }
    .tile-actions button {
      height: 64px !important;
      font-size: 1.15rem !important;
    }
  `,
})
export class RodTileComponent {
  private readonly i18n = inject(I18nService);

  readonly rod = input.required<SessionRod>();
  readonly spotName = input('');
  readonly variant = input<'live' | 'compact'>('live');

  readonly bite = output<void>();
  readonly catchTap = output<void>();
  readonly open = output<void>();

  readonly rodColor = computed(() => rodMarkerColor(this.rod().rodNumber));

  /** "bait · cast HH:mm · N bites" (parts without data are left out). */
  readonly detailLine = computed(() => {
    const rod = this.rod();
    const parts: string[] = [];
    if (rod.bait) {
      parts.push(rod.bait);
    }
    if (rod.castAt) {
      const time = new Date(rod.castAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      parts.push(this.i18n.t('sessionScreen.castAt', { time }));
    }
    parts.push(this.i18n.t('sessionScreen.biteCount', { count: rod.biteCount }));
    return parts.join(' · ');
  });
}
