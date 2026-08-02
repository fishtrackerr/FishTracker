import { Component, OnInit, inject, signal } from '@angular/core';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import {
  ReleaseNoteItem,
  ReleaseNotesData,
  ReleaseNotesEntry,
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
    } @else if (entries().length > 0) {
      @for (n of entries(); track n.version) {
        <div class="release-notes app-card">
          <h2>{{ 'releaseNotes.version' | tr }} {{ n.version }}</h2>
          <p class="date">{{ n.date }}</p>
          @for (section of n.sections; track section.category) {
            <h3>{{ section.category }}</h3>
            <ul>
              @for (item of section.items; track noteMessage(item)) {
                <li>{{ noteMessage(item) }}</li>
              }
            </ul>
          }
        </div>
      }
    } @else {
      <p>{{ 'releaseNotes.empty' | tr }}</p>
    }
  `,
  styles: `
    .release-notes {
      margin-bottom: var(--spacing-md);
    }
    .release-notes h2 { text-align: center; color: var(--text-primary); }
    .date { text-align: center; color: var(--text-muted); }
    h3 { color: var(--text-primary); margin-top: var(--spacing-md); }
    li { color: var(--text-secondary); margin-bottom: var(--spacing-xs); }
  `,
})
export class ReleaseNotesComponent implements OnInit {
  private readonly releaseNotesService = inject(ReleaseNotesService);

  readonly entries = signal<ReleaseNotesEntry[]>([]);
  readonly loading = signal(true);

  async ngOnInit(): Promise<void> {
    const notes = await this.releaseNotesService.getReleaseNotes();
    this.entries.set(this.toEntries(notes));
    this.loading.set(false);
  }

  noteMessage(item: string | ReleaseNoteItem): string {
    return typeof item === 'string' ? item : item.message;
  }

  private toEntries(notes: ReleaseNotesData | null): ReleaseNotesEntry[] {
    if (!notes) {
      return [];
    }
    if (notes.releases && notes.releases.length > 0) {
      return notes.releases.filter((release) => this.hasRealContent(release));
    }
    return this.hasRealContent(notes) ? [notes] : [];
  }

  private hasRealContent(entry: ReleaseNotesEntry): boolean {
    return entry.sections.some((section) =>
      section.items.some((item) => {
        const message = typeof item === 'string' ? item : item.message;
        return !!message && message !== 'No conventional commits found since last tag.';
      }),
    );
  }
}
