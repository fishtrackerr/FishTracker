import { Injectable } from '@angular/core';
import { GEOCODE_CACHE_KEY } from '../constants/storage-keys';
import { fetchWithTimeout } from '../utils';
import { ConnectivityService, readNavigatorOnline } from './connectivity.service';

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

export interface ReverseGeocodeSuccess {
  status: 'success';
  locationName: string;
}

export type ReverseGeocodeResult = ReverseGeocodeSuccess | LakeGeocodeFailure;

interface NominatimItem {
  lat?: string;
  lon?: string;
  display_name?: string;
}

interface NominatimAddress {
  city?: string;
  town?: string;
  village?: string;
  municipality?: string;
  hamlet?: string;
  suburb?: string;
  county?: string;
  state?: string;
  country?: string;
}

interface NominatimReverseItem {
  display_name?: string;
  address?: NominatimAddress;
}

interface ForwardCacheEntry {
  latitude: number;
  longitude: number;
  displayName?: string;
  cachedAt: string;
}

interface ReverseCacheEntry {
  locationName: string;
  cachedAt: string;
}

interface GeocodeCacheStore {
  forward: Record<string, ForwardCacheEntry>;
  reverse: Record<string, ReverseCacheEntry>;
}

const NOMINATIM_HEADERS = {
  Accept: 'application/json',
};

const MAX_CACHE_ENTRIES = 50;

@Injectable({ providedIn: 'root' })
export class LakeGeocodingService {
  constructor(private readonly connectivity?: ConnectivityService) {}

  async lookupCoordinates(query: string): Promise<LakeGeocodeResult> {
    const normalized = query.trim();
    if (!normalized) {
      return { status: 'not-found' };
    }

    const cacheKey = normalized.toLowerCase();
    if (!this.isDeviceOnline()) {
      const cached = this.getForwardCache(cacheKey);
      if (cached) {
        return {
          status: 'success',
          latitude: cached.latitude,
          longitude: cached.longitude,
          displayName: cached.displayName,
        };
      }
      return { status: 'offline' };
    }

    try {
      const url = new URL('https://nominatim.openstreetmap.org/search');
      url.searchParams.set('q', normalized);
      url.searchParams.set('format', 'jsonv2');
      url.searchParams.set('limit', '1');

      const response = await fetchWithTimeout(url.toString(), {
        headers: NOMINATIM_HEADERS,
      });

      if (!response.ok) {
        return this.forwardCacheOr({ status: 'error' }, cacheKey);
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
        return this.forwardCacheOr({ status: 'error' }, cacheKey);
      }

      const result: LakeGeocodeSuccess = {
        status: 'success',
        latitude,
        longitude,
        displayName: item.display_name,
      };
      this.putForwardCache(cacheKey, {
        latitude,
        longitude,
        displayName: item.display_name,
        cachedAt: new Date().toISOString(),
      });
      return result;
    } catch {
      return this.forwardCacheOr({ status: 'error' }, cacheKey);
    }
  }

  async reverseLookup(latitude: number, longitude: number): Promise<ReverseGeocodeResult> {
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

    const cacheKey = this.reverseCacheKey(latitude, longitude);
    if (!this.isDeviceOnline()) {
      const cached = this.getReverseCache(cacheKey);
      if (cached) {
        return { status: 'success', locationName: cached.locationName };
      }
      return { status: 'offline' };
    }

    try {
      const url = new URL('https://nominatim.openstreetmap.org/reverse');
      url.searchParams.set('lat', latitude.toFixed(5));
      url.searchParams.set('lon', longitude.toFixed(5));
      url.searchParams.set('format', 'jsonv2');
      url.searchParams.set('addressdetails', '1');

      const response = await fetchWithTimeout(url.toString(), {
        headers: NOMINATIM_HEADERS,
      });

      if (!response.ok) {
        return this.reverseCacheOr({ status: 'error' }, cacheKey);
      }

      const payload = (await response.json()) as NominatimReverseItem;
      const locationName = this.formatPlaceLabel(payload);
      if (!locationName) {
        return { status: 'not-found' };
      }

      this.putReverseCache(cacheKey, {
        locationName,
        cachedAt: new Date().toISOString(),
      });
      return { status: 'success', locationName };
    } catch {
      return this.reverseCacheOr({ status: 'error' }, cacheKey);
    }
  }

  /** Short city/area label for UI — not the full Nominatim display_name. */
  formatPlaceLabel(item: NominatimReverseItem): string | undefined {
    const address = item.address;
    if (!address) {
      const fallback = item.display_name?.trim();
      return fallback || undefined;
    }

    const locality =
      address.city ||
      address.town ||
      address.village ||
      address.municipality ||
      address.hamlet ||
      address.suburb ||
      address.county;

    const region = address.state || address.country;
    if (locality && region && locality !== region) {
      return `${locality}, ${region}`;
    }
    if (locality) {
      return locality;
    }
    if (region) {
      return region;
    }

    const fallback = item.display_name?.trim();
    return fallback || undefined;
  }

  private isDeviceOnline(): boolean {
    return this.connectivity?.isOnline() ?? readNavigatorOnline();
  }

  private forwardCacheOr(
    failure: LakeGeocodeFailure,
    cacheKey: string,
  ): LakeGeocodeResult {
    const cached = this.getForwardCache(cacheKey);
    if (cached) {
      return {
        status: 'success',
        latitude: cached.latitude,
        longitude: cached.longitude,
        displayName: cached.displayName,
      };
    }
    return failure;
  }

  private reverseCacheOr(
    failure: LakeGeocodeFailure,
    cacheKey: string,
  ): ReverseGeocodeResult {
    const cached = this.getReverseCache(cacheKey);
    if (cached) {
      return { status: 'success', locationName: cached.locationName };
    }
    return failure;
  }

  private reverseCacheKey(latitude: number, longitude: number): string {
    return `${latitude.toFixed(2)},${longitude.toFixed(2)}`;
  }

  private getForwardCache(key: string): ForwardCacheEntry | null {
    return this.readStore().forward[key] ?? null;
  }

  private getReverseCache(key: string): ReverseCacheEntry | null {
    return this.readStore().reverse[key] ?? null;
  }

  private putForwardCache(key: string, entry: ForwardCacheEntry): void {
    const store = this.readStore();
    store.forward[key] = entry;
    this.trimAndWrite(store);
  }

  private putReverseCache(key: string, entry: ReverseCacheEntry): void {
    const store = this.readStore();
    store.reverse[key] = entry;
    this.trimAndWrite(store);
  }

  private readStore(): GeocodeCacheStore {
    try {
      const raw = localStorage.getItem(GEOCODE_CACHE_KEY);
      if (!raw) {
        return { forward: {}, reverse: {} };
      }
      const parsed = JSON.parse(raw) as GeocodeCacheStore;
      return {
        forward: parsed.forward && typeof parsed.forward === 'object' ? parsed.forward : {},
        reverse: parsed.reverse && typeof parsed.reverse === 'object' ? parsed.reverse : {},
      };
    } catch {
      return { forward: {}, reverse: {} };
    }
  }

  private trimAndWrite(store: GeocodeCacheStore): void {
    const forwardEntries = Object.entries(store.forward).sort(
      (a, b) => Date.parse(b[1].cachedAt) - Date.parse(a[1].cachedAt),
    );
    const reverseEntries = Object.entries(store.reverse).sort(
      (a, b) => Date.parse(b[1].cachedAt) - Date.parse(a[1].cachedAt),
    );

    let total = forwardEntries.length + reverseEntries.length;
    while (total > MAX_CACHE_ENTRIES && reverseEntries.length > 0) {
      reverseEntries.pop();
      total--;
    }
    while (total > MAX_CACHE_ENTRIES && forwardEntries.length > 0) {
      forwardEntries.pop();
      total--;
    }

    const next: GeocodeCacheStore = {
      forward: Object.fromEntries(forwardEntries),
      reverse: Object.fromEntries(reverseEntries),
    };
    localStorage.setItem(GEOCODE_CACHE_KEY, JSON.stringify(next));
  }
}
