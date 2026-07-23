import { Component, Input, inject, signal, effect } from '@angular/core';
import { Catch, FishingSession, RodSpotHistory, SessionRod } from '../../../core/models';
import { RodSpotHistoryRepository } from '../../../core/services/rod-spot-history.repository';
import { ExpandableSectionComponent } from '../expandable-section/expandable-section.component';

export interface RodSummaryLine {
  rod: SessionRod;
  startedAt?: string;
  finalSpot?: string;
  movements: RodSpotHistory[];
  bites: number;
  fishSpotted: number;
  catches: number;
}

@Component({
  selector: 'app-rod-summary',
  standalone: true,
  imports: [ExpandableSectionComponent],
  template: `
    @if (summaries().length > 0) {
      <app-expandable-section sectionId="rod-summary" label="Rod change summary" [defaultExpanded]="false">
        <div expandHeader class="expand-label">Rod Summary</div>
        @for (line of summaries(); track line.rod.id) {
          <div class="summary-block">
            <strong>{{ line.rod.name }}</strong>
            <ul>
              @if (line.startedAt) {
                <li>Started at {{ line.startedAt }}</li>
              }
              @for (move of line.movements; track move.id) {
                <li>Moved to {{ spotName(move.toSessionSpotId) }} at {{ formatTime(move.changedAt) }}</li>
              }
              <li>{{ line.bites }} bites</li>
              <li>{{ line.fishSpotted }} fish spotted</li>
              <li>{{ line.catches }} catches</li>
            </ul>
          </div>
        }
        <div class="totals">
          <p>Total rods: {{ session.rods?.length ?? 0 }}</p>
          <p>Total bites: {{ totalBites() }}</p>
          <p>Total spotted: {{ totalSpotted() }}</p>
          <p>Total catches: {{ totalCatches() }}</p>
          @if (bestRod()) { <p>Best rod: {{ bestRod() }}</p> }
          @if (bestSpot()) { <p>Best spot: {{ bestSpot() }}</p> }
        </div>
      </app-expandable-section>
    }
  `,
  styles: `
    .expand-label { font-weight: 600; color: var(--text-secondary); }
    .summary-block { margin-bottom: var(--spacing-md); }
    .summary-block ul { margin: var(--spacing-xs) 0; padding-left: var(--spacing-lg); font-size: 0.9rem; color: var(--text-secondary); }
    .totals { border-top: 1px solid var(--border-primary); padding-top: var(--spacing-sm); font-size: 0.9rem; }
    .totals p { margin: var(--spacing-xs) 0; }
  `,
})
export class RodSummaryComponent {
  private readonly historyRepo = inject(RodSpotHistoryRepository);

  @Input({ required: true }) session!: FishingSession;
  @Input() catches: Catch[] = [];

  readonly summaries = signal<RodSummaryLine[]>([]);

  constructor() {
    effect(() => {
      void this.buildSummaries();
    });
  }

  async buildSummaries(): Promise<void> {
    const rods = this.session.rods ?? [];
    if (rods.length === 0) {
      this.summaries.set([]);
      return;
    }
    const lines: RodSummaryLine[] = [];
    for (const rod of rods) {
      const movements = await this.historyRepo.getByRod(rod.id);
      const firstMove = movements[0];
      lines.push({
        rod,
        startedAt: firstMove?.fromSessionSpotId
          ? this.spotName(firstMove.fromSessionSpotId)
          : this.spotName(rod.sessionSpotId),
        finalSpot: this.spotName(rod.sessionSpotId),
        movements,
        bites: rod.biteCount,
        fishSpotted: rod.fishSpottedCount,
        catches: this.catches.filter((c) => c.rodId === rod.id).length,
      });
    }
    this.summaries.set(lines);
  }

  spotName(sessionSpotId?: string): string {
    if (!sessionSpotId) {
      return 'Unassigned';
    }
    return this.session.sessionSpots?.find((s) => s.id === sessionSpotId)?.name ?? 'Unknown';
  }

  formatTime(iso: string): string {
    return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  totalBites(): number {
    return (this.session.rods ?? []).reduce((sum, r) => sum + r.biteCount, 0);
  }

  totalSpotted(): number {
    return (this.session.rods ?? []).reduce((sum, r) => sum + r.fishSpottedCount, 0);
  }

  totalCatches(): number {
    return this.catches.length;
  }

  bestRod(): string | undefined {
    const rods = this.session.rods ?? [];
    if (rods.length === 0) return undefined;
    const best = rods.reduce((a, b) => {
      const aCatches = this.catches.filter((c) => c.rodId === a.id).length + a.biteCount;
      const bCatches = this.catches.filter((c) => c.rodId === b.id).length + b.biteCount;
      return bCatches > aCatches ? b : a;
    });
    return best.name;
  }

  bestSpot(): string | undefined {
    const spotCounts = new Map<string, number>();
    for (const c of this.catches) {
      if (c.sessionSpotId) {
        spotCounts.set(c.sessionSpotId, (spotCounts.get(c.sessionSpotId) ?? 0) + 1);
      }
    }
    let bestId: string | undefined;
    let max = 0;
    for (const [id, count] of spotCounts) {
      if (count > max) {
        max = count;
        bestId = id;
      }
    }
    return bestId ? this.spotName(bestId) : undefined;
  }
}
