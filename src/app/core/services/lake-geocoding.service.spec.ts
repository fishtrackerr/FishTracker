import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LakeGeocodingService } from './lake-geocoding.service';

describe('LakeGeocodingService', () => {
  let service: LakeGeocodingService;

  beforeEach(() => {
    service = new LakeGeocodingService();
    vi.restoreAllMocks();
  });

  it('returns not-found for empty query', async () => {
    const result = await service.lookupCoordinates('   ');
    expect(result.status).toBe('not-found');
  });

  it('returns success when API returns valid coordinates', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => [{ lat: '52.12345', lon: '4.98765', display_name: 'Test Lake' }],
    } as Response);

    const result = await service.lookupCoordinates('Test Lake');
    expect(result.status).toBe('success');
    if (result.status === 'success') {
      expect(result.latitude).toBe(52.12345);
      expect(result.longitude).toBe(4.98765);
      expect(result.displayName).toBe('Test Lake');
    }
  });

  it('returns not-found when API responds with empty list', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => [],
    } as Response);

    const result = await service.lookupCoordinates('Unknown Place');
    expect(result.status).toBe('not-found');
  });

  it('returns error when response is not ok', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValue({ ok: false } as Response);

    const result = await service.lookupCoordinates('Any Lake');
    expect(result.status).toBe('error');
  });
});
