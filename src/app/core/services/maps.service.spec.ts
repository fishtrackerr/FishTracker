import { describe, it, expect, vi, beforeEach } from 'vitest';
import { signal } from '@angular/core';
import { MapsService } from './maps.service';

describe('MapsService', () => {
  let service: MapsService;
  let geo: { getCurrentPositionDetailed: ReturnType<typeof vi.fn> };
  let notify: { error: ReturnType<typeof vi.fn>; offline: ReturnType<typeof vi.fn> };
  let online: ReturnType<typeof signal<boolean>>;
  let i18n: { t: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    geo = { getCurrentPositionDetailed: vi.fn() };
    notify = { error: vi.fn(), offline: vi.fn() };
    online = signal(true);
    i18n = { t: vi.fn((key: string) => key) };
    service = new MapsService(
      geo as never,
      notify as never,
      { isOnline: online.asReadonly() } as never,
      i18n as never,
    );
    vi.spyOn(window, 'open').mockReset().mockImplementation(() => null);
  });

  it('validates coordinates', () => {
    expect(service.isValidCoordinate(52.1, 4.3)).toBe(true);
    expect(service.isValidCoordinate(undefined, 4)).toBe(false);
    expect(service.isValidCoordinate(91, 0)).toBe(false);
    expect(service.isValidCoordinate(NaN, 0)).toBe(false);
  });

  it('builds location URL', () => {
    expect(service.buildLocationUrl(52.1, 4.3)).toContain('52.1,4.3');
  });

  it('builds directions URL', () => {
    const url = service.buildDirectionsUrl(
      { latitude: 52, longitude: 4 },
      { latitude: 53, longitude: 5 },
    );
    expect(url).toContain('origin=52,4');
    expect(url).toContain('destination=53,5');
  });

  it('rejects invalid openLocation', () => {
    expect(service.openLocation(999, 0)).toBe(false);
    expect(window.open).not.toHaveBeenCalled();
  });

  it('opens valid location when online', () => {
    expect(service.openLocation(52.1, 4.3)).toBe(true);
    expect(window.open).toHaveBeenCalled();
  });

  it('blocks openLocation when offline and shows snackbar', () => {
    online.set(false);
    expect(service.openLocation(52.1, 4.3)).toBe(false);
    expect(window.open).not.toHaveBeenCalled();
    expect(notify.offline).toHaveBeenCalledWith('connectivity.mapsOffline');
  });

  it('shows error when geolocation denied', async () => {
    geo.getCurrentPositionDetailed.mockResolvedValue({ success: false, reason: 'denied' });
    const ok = await service.openCurrentLocation();
    expect(ok).toBe(false);
    expect(notify.error).toHaveBeenCalledWith(expect.stringContaining('permission denied'));
  });
});
