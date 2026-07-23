import { Component, OnInit, inject, signal } from '@angular/core';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import {
  ReleaseNoteItem,
  ReleaseNotesData,
  ReleaseNotesService,
} from '../../core/services/release-notes.service';

@Component({
  selector: 'app-release-notes',
  standalone: true,
  imports: [PageTitleComponent, TranslatePipe],
  template: `
    <app-page-title title="releaseNotes.title" />
    @if (loading()) {
      <p>{{ 'releaseNotes.loading' | tr }}</p>
    } @else if (notes(); as n) {
      <div class="release-notes app-card">
        <h2>{{ 'releaseNotes.version' | tr }} {{ n.version }}</h2>
        <p class="date">{{ n.date }}</p>
        @for (section of n.sections; track section.category) {
          <h3>{{ section.category }}</h3>
          <ul>
            @for (item of section.items; track item) {
              <li>
                {{ noteMessage(item) }}
                @if (noteCommitUrl(item); as url) {
                  <a class="commit-link" [href]="url" target="_blank" rel="noopener noreferrer">
                    ({{ noteCommitLabel(item) }})
                  </a>
                }
              </li>
            }
          </ul>
        }
      </div>
    } @else {
      <p>{{ 'releaseNotes.empty' | tr }}</p>
    }
  `,
  styles: `
    .release-notes h2 { text-align: center; color: var(--text-primary); }
    .date { text-align: center; color: var(--text-muted); }
    h3 { color: var(--text-primary); margin-top: var(--spacing-md); }
    li { color: var(--text-secondary); margin-bottom: var(--spacing-xs); }
    .commit-link { margin-left: 6px; color: var(--primary); text-decoration: underline; }
  `,
})
export class ReleaseNotesComponent implements OnInit {
  private readonly releaseNotesService = inject(ReleaseNotesService);

  readonly notes = signal<ReleaseNotesData | null>(null);
  readonly loading = signal(true);

  async ngOnInit(): Promise<void> {
    this.notes.set(await this.releaseNotesService.getReleaseNotes());
    this.loading.set(false);
  }

  noteMessage(item: string | ReleaseNoteItem): string {
    return typeof item === 'string' ? item : item.message;
  }

  noteCommitUrl(item: string | ReleaseNoteItem): string | undefined {
    if (typeof item === 'string') {
      return undefined;
    }
    return item.commitUrl;
  }

  noteCommitLabel(item: string | ReleaseNoteItem): string {
    if (typeof item === 'string') {
      return '';
    }
    return item.shortHash ?? 'commit';
  }
}
