import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpandableSectionComponent } from './expandable-section.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ExpandableSectionComponent', () => {
  let fixture: ComponentFixture<ExpandableSectionComponent>;

  beforeEach(async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });

    await TestBed.configureTestingModule({
      imports: [ExpandableSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpandableSectionComponent);
    fixture.componentRef.setInput('label', 'test section');
    fixture.componentRef.setInput('defaultExpanded', true);
    fixture.detectChanges();
  });

  it('toggles aria-expanded on click', () => {
    const initial = fixture.componentInstance.expanded();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.toggle');
    button.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.expanded()).toBe(!initial);
    expect(button.getAttribute('aria-expanded')).toBe(String(!initial));
  });

  it('closes other sections in the same accordion group when opening', () => {
    const first = TestBed.createComponent(ExpandableSectionComponent);
    first.componentRef.setInput('label', 'first');
    first.componentRef.setInput('accordionGroup', 'test-group');
    first.componentRef.setInput('defaultExpanded', true);
    first.detectChanges();

    const second = TestBed.createComponent(ExpandableSectionComponent);
    second.componentRef.setInput('label', 'second');
    second.componentRef.setInput('accordionGroup', 'test-group');
    second.componentRef.setInput('defaultExpanded', false);
    second.detectChanges();

    expect(first.componentInstance.expanded()).toBe(true);
    expect(second.componentInstance.expanded()).toBe(false);

    second.componentInstance.setExpanded(true);
    first.detectChanges();
    second.detectChanges();

    expect(first.componentInstance.expanded()).toBe(false);
    expect(second.componentInstance.expanded()).toBe(true);

    first.destroy();
    second.destroy();
  });
});
