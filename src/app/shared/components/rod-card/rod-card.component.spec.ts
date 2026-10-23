import { describe, expect, it } from 'vitest';
import { SessionRod } from '../../../core/models';
import { RodCardComponent } from './rod-card.component';

describe('RodCardComponent.rodColor', () => {
  const colorFor = (rodNumber: number): string => {
    const card = Object.create(RodCardComponent.prototype) as RodCardComponent;
    card.rod = { rodNumber } as SessionRod;
    return card.rodColor;
  };

  it('maps rods to the six theme marker colours, repeating after six', () => {
    expect(colorFor(1)).toBe('var(--rod-1)');
    expect(colorFor(6)).toBe('var(--rod-6)');
    expect(colorFor(7)).toBe('var(--rod-1)');
  });

  it('falls back to the first colour for an invalid rod number', () => {
    expect(colorFor(0)).toBe('var(--rod-1)');
  });
});
