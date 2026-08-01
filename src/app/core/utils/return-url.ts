import { RETURN_URL_KEY } from '../constants/storage-keys';

function isHomeUrl(url: string): boolean {
  const base = url.split('?')[0];
  return base === '/' || base === '';
}

/**
 * Accept only same-app relative paths for post-unlock navigation.
 * Rejects protocol-relative (`//…`), absolute URLs, and PIN routes.
 */
export function isSafeAppReturnUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }
  if (!url.startsWith('/') || url.startsWith('//')) {
    return false;
  }
  if (url.includes('://')) {
    return false;
  }
  const path = url.split('?')[0].split('#')[0];
  if (path.startsWith('/pin/')) {
    return false;
  }
  if (path === '/mode-select' || path.startsWith('/mode-select/')) {
    return false;
  }
  return true;
}

/** Persist post-unlock destination. Never clobber a deep link with bare `/`. */
export function persistReturnUrl(url: string): void {
  if (!isSafeAppReturnUrl(url)) {
    return;
  }

  const existing = sessionStorage.getItem(RETURN_URL_KEY);
  if (existing && isSafeAppReturnUrl(existing) && !isHomeUrl(existing) && isHomeUrl(url)) {
    return;
  }

  sessionStorage.setItem(RETURN_URL_KEY, url);
}

export function readReturnUrl(): string {
  const raw = sessionStorage.getItem(RETURN_URL_KEY);
  if (raw && isSafeAppReturnUrl(raw)) {
    return raw;
  }
  return '/';
}

export function clearReturnUrl(): void {
  sessionStorage.removeItem(RETURN_URL_KEY);
}

export function consumePersistedReturnUrl(): string {
  const url = readReturnUrl();
  clearReturnUrl();
  return url;
}
