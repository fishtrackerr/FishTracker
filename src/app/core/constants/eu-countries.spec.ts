import { describe, expect, it } from 'vitest';
import { EU_COUNTRIES, countrySelectOptions, isEuCountry } from './eu-countries';

describe('eu-countries', () => {
  it('lists 27 EU members', () => {
    expect(EU_COUNTRIES).toHaveLength(27);
  });

  it('detects EU country names', () => {
    expect(isEuCountry('Netherlands')).toBe(true);
    expect(isEuCountry('United Kingdom')).toBe(false);
  });

  it('prepends custom country for select options', () => {
    expect(countrySelectOptions('Norway')[0]).toBe('Norway');
    expect(countrySelectOptions('France')[0]).toBe('Austria');
    expect(countrySelectOptions()).toEqual([...EU_COUNTRIES]);
  });
});
