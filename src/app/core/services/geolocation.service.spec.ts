import { describe, expect, it, vi } from 'vitest';
import { GeolocationService } from './geolocation.service';

describe('GeolocationService', () => {
  it('returns unavailable when geolocation is not supported', async () => {
    const service = new GeolocationService();
    const original = navigator.geolocation;

    Object.defineProperty(navigator, 'geolocation', {
      configurable: true,
      value: undefined,
    });

    const result = await service.getCurrentPositionDetailed();

    expect(result).toEqual({ success: false, reason: 'unavailable' });

    Object.defineProperty(navigator, 'geolocation', {
      configurable: true,
      value: original,
    });
  });

  it('maps successful position response', async () => {
    const service = new GeolocationService();
    const original = navigator.geolocation;

    Object.defineProperty(navigator, 'geolocation', {
      configurable: true,
      value: {
        getCurrentPosition: (onSuccess: PositionCallback) => {
          onSuccess({
            coords: {
              latitude: 52.1,
              longitude: 5.1,
            },
          } as GeolocationPosition);
        },
      },
    });

    const result = await service.getCurrentPositionDetailed();

    expect(result).toEqual({
      success: true,
      latitude: 52.1,
      longitude: 5.1,
    });

    Object.defineProperty(navigator, 'geolocation', {
      configurable: true,
      value: original,
    });
  });

  it('maps geolocation error codes to expected failure reasons', async () => {
    const service = new GeolocationService();
    const original = navigator.geolocation;

    const getCurrentPosition = vi.fn(
      (_onSuccess: PositionCallback, onError?: PositionErrorCallback) => {
        onError?.({
          code: 1,
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
          message: 'denied',
        } as GeolocationPositionError);
      },
    );

    Object.defineProperty(navigator, 'geolocation', {
      configurable: true,
      value: {
        getCurrentPosition,
      },
    });

    const denied = await service.getCurrentPositionDetailed();
    expect(denied).toEqual({ success: false, reason: 'denied' });

    getCurrentPosition.mockImplementation(
      (_onSuccess: PositionCallback, onError?: PositionErrorCallback) => {
        onError?.({
          code: 3,
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
          message: 'timeout',
        } as GeolocationPositionError);
      },
    );

    const timeout = await service.getCurrentPositionDetailed();
    expect(timeout).toEqual({ success: false, reason: 'timeout' });

    Object.defineProperty(navigator, 'geolocation', {
      configurable: true,
      value: original,
    });
  });

  it('returns null from getCurrentPosition on failure', async () => {
    const service = new GeolocationService();
    const detailedSpy = vi
      .spyOn(service, 'getCurrentPositionDetailed')
      .mockResolvedValue({ success: false, reason: 'denied' });

    const result = await service.getCurrentPosition();

    expect(result).toBeNull();
    detailedSpy.mockRestore();
  });
});
