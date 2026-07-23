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
});
