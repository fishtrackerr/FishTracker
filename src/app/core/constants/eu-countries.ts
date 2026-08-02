/** Official English short names of EU member states (27). */
export const EU_COUNTRIES = [
  'Austria',
  'Belgium',
  'Bulgaria',
  'Croatia',
  'Cyprus',
  'Czechia',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Ireland',
  'Italy',
  'Latvia',
  'Lithuania',
  'Luxembourg',
  'Malta',
  'Netherlands',
  'Poland',
  'Portugal',
  'Romania',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
] as const;

export type EuCountry = (typeof EU_COUNTRIES)[number];

export function isEuCountry(value: string | undefined | null): value is EuCountry {
  return !!value && (EU_COUNTRIES as readonly string[]).includes(value);
}

/** EU list plus a legacy/custom value so existing lakes keep their selection. */
export function countrySelectOptions(current?: string | null): string[] {
  if (current && !isEuCountry(current)) {
    return [current, ...EU_COUNTRIES];
  }
  return [...EU_COUNTRIES];
}
