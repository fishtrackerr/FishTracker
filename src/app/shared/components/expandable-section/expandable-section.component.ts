import { Component, Input, signal, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-expandable-section',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './expandable-section.component.html',
  styleUrl: './expandable-section.component.css',
})
export class ExpandableSectionComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);

  @Input() sectionId = `expand-${Math.random().toString(36).slice(2, 9)}`;
  @Input() label = 'section';
  @Input() collapsible = true;
  @Input() persistKey?: string;
  @Input() defaultExpanded = false;
  @Input() flat = false;

  readonly expanded = signal(false);

  ngOnInit(): void {
    if (this.persistKey && isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(`expand-${this.persistKey}`);
      if (stored !== null) {
        this.expanded.set(stored === 'true');
        return;
      }
    }
    this.expanded.set(this.defaultExpanded);
  }

  onHeaderClick(event: MouseEvent): void {
    if (!this.collapsible) {
      return;
    }
    const target = event.target as HTMLElement;
    if (target.closest('button, a, input, textarea, select, [data-no-expand]')) {
      return;
    }
    this.toggle();
  }

  toggle(event?: Event): void {
    event?.stopPropagation();
    this.expanded.update((v) => !v);
    if (this.persistKey && isPlatformBrowser(this.platformId)) {
      localStorage.setItem(`expand-${this.persistKey}`, String(this.expanded()));
    }
  }
}
