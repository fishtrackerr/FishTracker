import { Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MapsService } from '../../../core/services/maps.service';

@Component({
  selector: 'app-maps-link-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    @if (visible) {
      <button
        mat-icon-button
        type="button"
        class="maps-link-btn"
        [attr.title]="titleText"
        [attr.aria-label]="ariaLabel"
        (click)="onClick()"
      >
        <mat-icon>map</mat-icon>
      </button>
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      flex-shrink: 0;
      vertical-align: middle;
    }
    .maps-link-btn {
      color: var(--primary);
      width: 36px;
      height: 36px;
      padding: 0;
    }
    .maps-link-btn mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }
  `,
})
export class MapsLinkButtonComponent {
  private readonly maps = inject(MapsService);

  @Input() latitude?: number | null;
  @Input() longitude?: number | null;
  @Input() label = 'location';
  @Input() showDirections = false;

  get visible(): boolean {
    return this.maps.isValidCoordinate(this.latitude, this.longitude);
  }

  get titleText(): string {
    return this.showDirections
      ? `Directions to ${this.label}`
      : `Open ${this.label} in Maps`;
  }

  get ariaLabel(): string {
    return this.showDirections
      ? `Get directions to ${this.label}`
      : `Open ${this.label} in Maps`;
  }

  onClick(): void {
    if (!this.visible || this.latitude == null || this.longitude == null) {
      return;
    }
    if (this.showDirections) {
      void this.maps.openDirectionsFromCurrent({
        latitude: this.latitude,
        longitude: this.longitude,
      });
    } else {
      this.maps.openLocation(this.latitude, this.longitude);
    }
  }
}
