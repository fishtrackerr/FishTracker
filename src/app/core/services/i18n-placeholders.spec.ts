import { describe, expect, it } from 'vitest';
import de from '../../../assets/i18n/de.json';
import en from '../../../assets/i18n/en.json';
import nl from '../../../assets/i18n/nl.json';

/** I18nService only fills {{name}}; a single-brace {name} would be shown (or stored) literally. */
function singleBracePlaceholders(dict: unknown, path = ''): string[] {
  if (typeof dict === 'string') {
    return /(^|[^{])\{[A-Za-z]+\}(?!\})/.test(dict) ? [path] : [];
  }
  if (dict && typeof dict === 'object') {
    return Object.entries(dict).flatMap(([key, value]) =>
      singleBracePlaceholders(value, path ? `${path}.${key}` : key),
    );
  }
  return [];
}

describe('i18n placeholders', () => {
  it.each([
    ['en', en],
    ['nl', nl],
    ['de', de],
  ])('%s uses {{name}} placeholders only', (_lang, dict) => {
    expect(singleBracePlaceholders(dict)).toEqual([]);
  });
});
