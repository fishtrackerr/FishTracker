import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ConnectivityService } from './connectivity.service';

describe('ConnectivityService', () => {
  let service: ConnectivityService;

  beforeEach(() => {
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      get: () => true,
    });
    service = new ConnectivityService();
  });

  afterEach(() => {
    service.ngOnDestroy();
    vi.unstubAllGlobals();
  });

  it('starts online when navigator.onLine is true', () => {
    expect(service.isOnline()).toBe(true);
  });

  it('updates when offline and online events fire', () => {
    window.dispatchEvent(new Event('offline'));
    expect(service.isOnline()).toBe(false);

    window.dispatchEvent(new Event('online'));
    expect(service.isOnline()).toBe(true);
  });
});
