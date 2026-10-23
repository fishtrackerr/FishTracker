import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import type { SessionRod } from '../../../core/models';
import { I18nService } from '../../../core/services/i18n.service';
import { RodTileComponent, rodMarkerColor } from './rod-tile.component';

const rod = (extra: Partial<SessionRod> = {}): SessionRod => ({
  id: 'rod-1',
  sessionId: 's1',
  rodNumber: 1,
  name: 'Rod 1',
  biteCount: 0,
  fishSpottedCount: 0,
  isActive: true,
  ...extra,
});

describe('rodMarkerColor', () => {
  it('maps rods to the six theme marker colours, repeating after six', () => {
    expect(rodMarkerColor(1)).toBe('var(--rod-1)');
    expect(rodMarkerColor(6)).toBe('var(--rod-6)');
    expect(rodMarkerColor(7)).toBe('var(--rod-1)');
  });

  it('falls back to the first colour for an invalid rod number', () => {
    expect(rodMarkerColor(0)).toBe('var(--rod-1)');
  });
});

describe('RodTileComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RodTileComponent],
      providers: [
        {
          provide: I18nService,
          useValue: {
            t: (key: string, params?: Record<string, unknown>) =>
              key === 'sessionScreen.castAt'
                ? `cast ${params?.['time']}`
                : key === 'sessionScreen.biteCount'
                  ? `${params?.['count']} bites`
                  : key,
            language: signal('en'),
            dictionary: signal({}),
          },
        },
      ],
    });
  });

  function render(r: SessionRod, variant: 'live' | 'compact' = 'live') {
    const fixture = TestBed.createComponent(RodTileComponent);
    fixture.componentRef.setInput('rod', r);
    fixture.componentRef.setInput('spotName', 'Swim 4');
    fixture.componentRef.setInput('variant', variant);
    fixture.detectChanges();
    return fixture;
  }

  it('shows marker, name, spot and the "bait · cast · bites" line', () => {
    const castAt = new Date(2026, 6, 23, 7, 5).toISOString();
    const fixture = render(rod({ rodNumber: 2, bait: 'Boilie', castAt, biteCount: 3 }));
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('.rod-marker')?.textContent?.trim()).toBe('2');
    expect(el.querySelector('.rod-name')?.textContent).toContain('Swim 4');
    expect(el.querySelector('.rod-line')?.textContent?.trim()).toBe('Boilie · cast 07:05 · 3 bites');
    expect(fixture.componentInstance.rodColor()).toBe('var(--rod-2)');
  });

  it('emits bite, catchTap and open from the live tile', () => {
    const fixture = render(rod());
    const events: string[] = [];
    fixture.componentInstance.bite.subscribe(() => events.push('bite'));
    fixture.componentInstance.catchTap.subscribe(() => events.push('catch'));
    fixture.componentInstance.open.subscribe(() => events.push('open'));
    const el = fixture.nativeElement as HTMLElement;

    (el.querySelector('.bite-btn') as HTMLButtonElement).click();
    (el.querySelector('.catch-btn') as HTMLButtonElement).click();
    (el.querySelector('.tile-open') as HTMLButtonElement).click();
    (el.querySelector('.more-btn') as HTMLButtonElement).click();

    expect(events).toEqual(['bite', 'catch', 'open', 'open']);
  });

  it('compact variant has no big buttons, only a small +1, and greys out inactive rods', () => {
    const fixture = render(rod({ isActive: false }), 'compact');
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('.tile-actions')).toBeNull();
    expect(el.querySelector('.bite-small')).not.toBeNull();
    expect(el.querySelector('.rod-tile')?.classList).toContain('inactive');
    expect(el.querySelector('.status')?.textContent?.trim()).toBe('rod.inactive');
  });
});
