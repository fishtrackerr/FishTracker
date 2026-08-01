import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  clearReturnUrl,
  consumePersistedReturnUrl,
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

  it('consume clears storage', () => {
    persistReturnUrl('/gallery');
    expect(consumePersistedReturnUrl()).toBe('/gallery');
    expect(readReturnUrl()).toBe('/');
    clearReturnUrl();
  });
});
