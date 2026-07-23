import { Component, OnInit, inject, signal } from '@angular/core';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';

interface ReleaseNotesData {
  version: string;
  date: string;
  sections: { category: string; items: string[] }[];
}

@Component({
  selector: 'app-release-notes',
  standalone: true,
  imports: [PageTitleComponent],
  template: `
    <app-page-title title="Release Notes" />
    @if (loading()) {
      <p>Loading release notes...</p>
    } @else if (notes(); as n) {
      <div class="release-notes app-card">
        <h2>Version {{ n.version }}</h2>
        <p class="date">{{ n.date }}</p>
        @for (section of n.sections; track section.category) {
          <h3>{{ section.category }}</h3>
          <ul>
            @for (item of section.items; track item) {
              <li>{{ item }}</li>
            }
          </ul>
        }
      </div>
    } @else {
      <p>No release notes available.</p>
    }
  `,
  styles: `
    .release-notes h2 { text-align: center; color: var(--text-primary); }
    .date { text-align: center; color: var(--text-muted); }
    h3 { color: var(--text-primary); margin-top: var(--spacing-md); }
    li { color: var(--text-secondary); margin-bottom: var(--spacing-xs); }
  `,
})
export class ReleaseNotesComponent implements OnInit {
  readonly notes = signal<ReleaseNotesData | null>(null);
  readonly loading = signal(true);

  ngOnInit(): void {
    fetch('assets/release-notes.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((data: ReleaseNotesData | null) => this.notes.set(data))
      .catch(() => this.notes.set(null))
      .finally(() => this.loading.set(false));
  }
}
