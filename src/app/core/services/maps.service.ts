import { Injectable } from '@angular/core';
import { GeolocationService } from './geolocation.service';
import { NotificationService } from './notification.service';

export interface MapCoordinate {
  latitude: number;
  longitude: number;
}

@Injectable({ providedIn: 'root' })
export class MapsService {
  constructor(
    private readonly geo: GeolocationService,
    private readonly notify: NotificationService,
  ) {}

  isValidCoordinate(latitude?: number | null, longitude?: number | null): boolean {
    if (latitude == null || longitude == null) {
      return false;
    }
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return false;
    }
    return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
  }

  buildLocationUrl(latitude: number, longitude: number): string {
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  }

  buildDirectionsUrl(origin: MapCoordinate, destination: MapCoordinate): string {
    return (
      `https://www.google.com/maps/dir/?api=1` +
      `&origin=${origin.latitude},${origin.longitude}` +
      `&destination=${destination.latitude},${destination.longitude}`
    );
  }

  openLocation(latitude: number, longitude: number): boolean {
    if (!this.isValidCoordinate(latitude, longitude)) {
      return false;
    }
    window.open(this.buildLocationUrl(latitude, longitude), '_blank', 'noopener,noreferrer');
    return true;
  }

  openDirections(origin: MapCoordinate, destination: MapCoordinate): boolean {
    if (
      !this.isValidCoordinate(origin.latitude, origin.longitude) ||
      !this.isValidCoordinate(destination.latitude, destination.longitude)
    ) {
      return false;
    }
    window.open(this.buildDirectionsUrl(origin, destination), '_blank', 'noopener,noreferrer');
    return true;
  }

  async openCurrentLocation(): Promise<boolean> {
    const result = await this.geo.getCurrentPositionDetailed();
    if (!result.success) {
      const message =
        result.reason === 'denied'
          ? 'Location permission denied. Enable location access in your browser settings.'
          : result.reason === 'timeout'
            ? 'Location request timed out. Try again when GPS signal is available.'
            : 'Current location is unavailable.';
      this.notify.error(message);
      return false;
    }
    return this.openLocation(result.latitude, result.longitude);
  }

  async openDirectionsFromCurrent(destination: MapCoordinate): Promise<boolean> {
    if (!this.isValidCoordinate(destination.latitude, destination.longitude)) {
      this.notify.error('Destination coordinates are missing or invalid.');
      return false;
    }
    const result = await this.geo.getCurrentPositionDetailed();
    if (!result.success) {
      const message =
        result.reason === 'denied'
          ? 'Location permission denied. Cannot show directions from your current position.'
          : 'Current location is unavailable. Open the destination on the map instead.';
      this.notify.error(message);
      return this.openLocation(destination.latitude, destination.longitude);
    }
    return this.openDirections(
      { latitude: result.latitude, longitude: result.longitude },
      destination,
    );
  }
}
