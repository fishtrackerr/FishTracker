import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  clearReturnUrl,
  consumePersistedReturnUrl,
  isSafeAppReturnUrl,
  persistReturnUrl,
  readReturnUrl,
} from './return-url';

describe('persistReturnUrl', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('stores a deep link', () => {
    persistReturnUrl('/settings');
    expect(readReturnUrl()).toBe('/settings');
  });

  it('does not overwrite a deep link with home', () => {
    persistReturnUrl('/settings');
    persistReturnUrl('/');
    expect(readReturnUrl()).toBe('/settings');
  });

  it('allows overwriting home with a deep link', () => {
    persistReturnUrl('/');
    persistReturnUrl('/sessions');
    expect(readReturnUrl()).toBe('/sessions');
  });

  it('ignores pin routes', () => {
    persistReturnUrl('/settings');
    persistReturnUrl('/pin/unlock');
    expect(readReturnUrl()).toBe('/settings');
  });

  it('rejects protocol-relative and absolute URLs', () => {
    persistReturnUrl('//evil.example/phish');
    expect(readReturnUrl()).toBe('/');
    persistReturnUrl('https://evil.example');
    expect(readReturnUrl()).toBe('/');
    persistReturnUrl('javascript:alert(1)');
    expect(readReturnUrl()).toBe('/');
  });

  it('consume clears storage', () => {
    persistReturnUrl('/gallery');
    expect(consumePersistedReturnUrl()).toBe('/gallery');
    expect(readReturnUrl()).toBe('/');
    clearReturnUrl();
  });
});

describe('isSafeAppReturnUrl', () => {
  it('accepts relative app paths', () => {
    expect(isSafeAppReturnUrl('/')).toBe(true);
    expect(isSafeAppReturnUrl('/sessions?x=1')).toBe(true);
  });

  it('rejects unsafe paths', () => {
    expect(isSafeAppReturnUrl('//evil.com')).toBe(false);
    expect(isSafeAppReturnUrl('/pin/unlock')).toBe(false);
    expect(isSafeAppReturnUrl('/mode-select')).toBe(false);
    expect(isSafeAppReturnUrl('https://x')).toBe(false);
    expect(isSafeAppReturnUrl('')).toBe(false);
  });
});
