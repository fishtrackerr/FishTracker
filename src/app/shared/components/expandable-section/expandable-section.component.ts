import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
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
export class ExpandableSectionComponent implements OnInit, OnDestroy {
  private static readonly accordionGroups = new Map<string, Set<ExpandableSectionComponent>>();

  private readonly platformId = inject(PLATFORM_ID);

  @Input() sectionId = `expand-${Math.random().toString(36).slice(2, 9)}`;
  @Input() label = 'section';
  @Input() collapsible = true;
  @Input() persistKey?: string;
  @Input() defaultExpanded = false;
  @Input() flat = false;
  /** When set, at most one section in the group can be expanded. */
  @Input() accordionGroup?: string;

  readonly expanded = signal(false);

  ngOnInit(): void {
    this.registerAccordion();

    let shouldExpand = this.defaultExpanded;
    if (this.persistKey && isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(`expand-${this.persistKey}`);
      if (stored !== null) {
        shouldExpand = stored === 'true';
      }
    }

    if (shouldExpand && this.accordionGroup && this.hasExpandedSibling()) {
      shouldExpand = false;
    }

    this.setExpanded(shouldExpand, { persist: false, collapseSiblings: shouldExpand });
  }

  ngOnDestroy(): void {
    this.unregisterAccordion();
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
    this.setExpanded(!this.expanded());
  }

  /** Opens or closes this section; accordion siblings close when opening. */
  setExpanded(
    next: boolean,
    options: { persist?: boolean; collapseSiblings?: boolean } = {},
  ): void {
    const persist = options.persist !== false;
    const collapseSiblings = options.collapseSiblings !== false;

    if (next && collapseSiblings && this.accordionGroup) {
      for (const sibling of this.siblings()) {
        if (sibling !== this && sibling.expanded()) {
          sibling.setExpanded(false, { persist: true, collapseSiblings: false });
        }
      }
    }

    this.expanded.set(next);

    if (persist && this.persistKey && isPlatformBrowser(this.platformId)) {
      localStorage.setItem(`expand-${this.persistKey}`, String(next));
    }
  }

  private registerAccordion(): void {
    if (!this.accordionGroup) {
      return;
    }
    let group = ExpandableSectionComponent.accordionGroups.get(this.accordionGroup);
    if (!group) {
      group = new Set();
      ExpandableSectionComponent.accordionGroups.set(this.accordionGroup, group);
    }
    group.add(this);
  }

  private unregisterAccordion(): void {
    if (!this.accordionGroup) {
      return;
    }
    const group = ExpandableSectionComponent.accordionGroups.get(this.accordionGroup);
    if (!group) {
      return;
    }
    group.delete(this);
    if (group.size === 0) {
      ExpandableSectionComponent.accordionGroups.delete(this.accordionGroup);
    }
  }

  private siblings(): Iterable<ExpandableSectionComponent> {
    if (!this.accordionGroup) {
      return [];
    }
    return ExpandableSectionComponent.accordionGroups.get(this.accordionGroup) ?? [];
  }

  private hasExpandedSibling(): boolean {
    for (const sibling of this.siblings()) {
      if (sibling !== this && sibling.expanded()) {
        return true;
      }
    }
    return false;
  }
}
