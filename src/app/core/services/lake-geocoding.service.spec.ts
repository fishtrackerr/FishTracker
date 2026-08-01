import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GEOCODE_CACHE_KEY } from '../constants/storage-keys';
import { LakeGeocodingService } from './lake-geocoding.service';

describe('LakeGeocodingService', () => {
  let service: LakeGeocodingService;

  beforeEach(() => {
    localStorage.clear();
    service = new LakeGeocodingService();
    vi.restoreAllMocks();
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      get: () => true,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  it('returns not-found for empty query', async () => {
    const result = await service.lookupCoordinates('   ');
    expect(result.status).toBe('not-found');
  });

  it('returns success when API returns valid coordinates', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [{ lat: '52.12345', lon: '4.98765', display_name: 'Test Lake' }],
      }),
    );

    const result = await service.lookupCoordinates('Test Lake');
    expect(result.status).toBe('success');
    if (result.status === 'success') {
      expect(result.latitude).toBe(52.12345);
      expect(result.longitude).toBe(4.98765);
      expect(result.displayName).toBe('Test Lake');
    }

    const store = JSON.parse(localStorage.getItem(GEOCODE_CACHE_KEY) ?? '{}') as {
      forward: Record<string, { latitude: number }>;
    };
    expect(store.forward['test lake']?.latitude).toBe(52.12345);
  });

  it('returns not-found when API responds with empty list', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [],
      }),
    );

    const result = await service.lookupCoordinates('Unknown Place');
    expect(result.status).toBe('not-found');
  });

  it('returns error when response is not ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));

    const result = await service.lookupCoordinates('Any Lake');
    expect(result.status).toBe('error');
  });

  it('returns cached forward lookup when offline', async () => {
    localStorage.setItem(
      GEOCODE_CACHE_KEY,
      JSON.stringify({
        forward: {
          'test lake': {
            latitude: 52.1,
            longitude: 5.1,
            displayName: 'Cached Lake',
            cachedAt: '2026-08-01T12:00:00.000Z',
          },
        },
        reverse: {},
      }),
    );
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      get: () => false,
    });
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const result = await service.lookupCoordinates('Test Lake');
    expect(result.status).toBe('success');
    if (result.status === 'success') {
      expect(result.latitude).toBe(52.1);
      expect(result.displayName).toBe('Cached Lake');
    }
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('reverseLookup returns short place label from address parts', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          display_name: 'Long Street, Neighborhood, Amsterdam, North Holland, Netherlands',
          address: {
            city: 'Amsterdam',
            state: 'North Holland',
            country: 'Netherlands',
          },
        }),
      }),
    );

    const result = await service.reverseLookup(52.37, 4.89);
    expect(result.status).toBe('success');
    if (result.status === 'success') {
      expect(result.locationName).toBe('Amsterdam, North Holland');
    }
  });

  it('returns cached reverse lookup when offline', async () => {
    localStorage.setItem(
      GEOCODE_CACHE_KEY,
      JSON.stringify({
        forward: {},
        reverse: {
          '52.37,4.89': {
            locationName: 'Amsterdam, North Holland',
            cachedAt: '2026-08-01T12:00:00.000Z',
          },
        },
      }),
    );
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      get: () => false,
    });
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const result = await service.reverseLookup(52.37, 4.89);
    expect(result.status).toBe('success');
    if (result.status === 'success') {
      expect(result.locationName).toBe('Amsterdam, North Holland');
    }
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('reverseLookup returns not-found when address is empty', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({}),
      }),
    );

    const result = await service.reverseLookup(52.37, 4.89);
    expect(result.status).toBe('not-found');
  });

  it('reverseLookup returns error for invalid coordinates', async () => {
    const result = await service.reverseLookup(Number.NaN, 4.89);
    expect(result.status).toBe('error');
  });

  it('formatPlaceLabel prefers town over county', () => {
    expect(
      service.formatPlaceLabel({
        address: { town: 'Volendam', country: 'Netherlands' },
      }),
    ).toBe('Volendam, Netherlands');
  });
});
