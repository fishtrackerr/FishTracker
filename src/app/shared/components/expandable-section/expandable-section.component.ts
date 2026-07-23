import { Component, Input, signal, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-expandable-section',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <section class="expandable" [class.expanded]="expanded()" [class.flat]="flat">
      <div class="header" [class.clickable]="collapsible" (click)="onHeaderClick($event)">
        <div class="header-content">
          <ng-content select="[expandHeader]" />
        </div>
        @if (collapsible) {
          <button
            type="button"
            class="toggle"
            [attr.aria-expanded]="expanded()"
            [attr.aria-controls]="sectionId"
            (click)="toggle($event)"
          >
            <span class="toggle-icon" aria-hidden="true">{{ expanded() ? '▲' : '▼' }}</span>
            <span class="sr-only">{{ expanded() ? 'Collapse' : 'Expand' }} {{ label }}</span>
          </button>
        }
      </div>
      <div [id]="sectionId" class="body" [class.collapsed]="collapsible && !expanded()">
        <ng-content />
      </div>
    </section>
  `,
  styles: `
    .expandable {
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-md);
      background: var(--background-card);
      overflow: hidden;
    }
    .header {
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm) var(--spacing-md);
    }
    .header.clickable {
      cursor: pointer;
    }
    .header-content {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
    }
    .toggle {
      background: none;
      border: none;
      color: var(--primary);
      cursor: pointer;
      padding: 4px 8px;
      font-size: 1rem;
      flex-shrink: 0;
      align-self: center;
    }
    .flat {
      border: none;
      border-radius: 0;
      background: transparent;
    }
    .flat .header {
      padding: 0;
      align-items: stretch;
    }
    .flat .toggle {
      align-self: stretch;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 40px;
      padding: var(--spacing-md) var(--spacing-sm);
    }
    .flat .body {
      padding: 0;
    }
    .flat .body.collapsed {
      padding: 0;
    }
    .body {
      padding: 0 var(--spacing-md) var(--spacing-md);
      transition: max-height 0.2s ease, opacity 0.2s ease;
    }
    .body.collapsed {
      max-height: 0;
      padding-top: 0;
      padding-bottom: 0;
      opacity: 0;
      overflow: hidden;
      pointer-events: none;
    }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }
  `,
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
