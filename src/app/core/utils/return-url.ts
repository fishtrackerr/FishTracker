import { RETURN_URL_KEY } from '../constants/storage-keys';

function isHomeUrl(url: string): boolean {
  const base = url.split('?')[0];
  return base === '/' || base === '';
}

/** Persist post-unlock destination. Never clobber a deep link with bare `/`. */
export function persistReturnUrl(url: string): void {
  if (!url || url.startsWith('/pin/')) {
    return;
  }

  const existing = sessionStorage.getItem(RETURN_URL_KEY);
  if (existing && !isHomeUrl(existing) && isHomeUrl(url)) {
    return;
  }

  sessionStorage.setItem(RETURN_URL_KEY, url);
}

export function readReturnUrl(): string {
  return sessionStorage.getItem(RETURN_URL_KEY) ?? '/';
}

export function clearReturnUrl(): void {
  sessionStorage.removeItem(RETURN_URL_KEY);
}

export function consumePersistedReturnUrl(): string {
  const url = readReturnUrl();
  clearReturnUrl();
  return url;
}
