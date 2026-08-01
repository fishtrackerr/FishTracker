import { Injectable } from '@angular/core';
import { fetchWithTimeout } from '../utils';

export interface LakeGeocodeSuccess {
  status: 'success';
  latitude: number;
  longitude: number;
  displayName?: string;
}

export interface LakeGeocodeFailure {
  status: 'offline' | 'not-found' | 'error';
}

export type LakeGeocodeResult = LakeGeocodeSuccess | LakeGeocodeFailure;

interface NominatimItem {
  lat?: string;
  lon?: string;
  display_name?: string;
}

@Injectable({ providedIn: 'root' })
export class LakeGeocodingService {
  async lookupCoordinates(query: string): Promise<LakeGeocodeResult> {
    const normalized = query.trim();
    if (!normalized) {
      return { status: 'not-found' };
    }

    if (typeof navigator !== 'undefined' && 'onLine' in navigator && !navigator.onLine) {
      return { status: 'offline' };
    }

    try {
      const url = new URL('https://nominatim.openstreetmap.org/search');
      url.searchParams.set('q', normalized);
      url.searchParams.set('format', 'jsonv2');
      url.searchParams.set('limit', '1');

      const response = await fetchWithTimeout(url.toString(), {
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        return { status: 'error' };
      }

      const payload = (await response.json()) as NominatimItem[];
      const item = payload[0];
      if (!item?.lat || !item?.lon) {
        return { status: 'not-found' };
      }

      const latitude = Number(item.lat);
      const longitude = Number(item.lon);
      const valid =
        Number.isFinite(latitude) &&
        Number.isFinite(longitude) &&
        latitude >= -90 &&
        latitude <= 90 &&
        longitude >= -180 &&
        longitude <= 180;

      if (!valid) {
        return { status: 'error' };
      }

      return {
        status: 'success',
        latitude,
        longitude,
        displayName: item.display_name,
      };
    } catch {
      return { status: 'error' };
    }
  }
}
