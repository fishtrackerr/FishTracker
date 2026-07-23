import { Injectable } from '@angular/core';

export type GeolocationFailureReason = 'denied' | 'unavailable' | 'timeout';

export interface GeolocationResult {
  success: true;
  latitude: number;
  longitude: number;
}

export interface GeolocationFailure {
  success: false;
  reason: GeolocationFailureReason;
}

export type GeolocationResponse = GeolocationResult | GeolocationFailure;

@Injectable({ providedIn: 'root' })
export class GeolocationService {
  async getCurrentPosition(): Promise<GeoPosition | null> {
    const result = await this.getCurrentPositionDetailed();
    return result.success ? result : null;
  }

  async getCurrentPositionDetailed(): Promise<GeolocationResponse> {
    if (!navigator.geolocation) {
      return { success: false, reason: 'unavailable' };
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({
            success: true,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }),
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            resolve({ success: false, reason: 'denied' });
          } else if (err.code === err.TIMEOUT) {
            resolve({ success: false, reason: 'timeout' });
          } else {
            resolve({ success: false, reason: 'unavailable' });
          }
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 },
      );
    });
  }
}

export interface GeoPosition {
  latitude: number;
  longitude: number;
}
