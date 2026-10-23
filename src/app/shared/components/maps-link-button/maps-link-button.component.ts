import { Component, Input, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { I18nService } from '../../../core/services/i18n.service';
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
  changeDetection: ChangeDetectionStrategy.Eager,
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
  private readonly i18n = inject(I18nService);

  @Input() latitude?: number | null;
  @Input() longitude?: number | null;
  /** Already-translated name of the place; defaults to the translated word "location". */
  @Input() label?: string;
  @Input() showDirections = false;

  get visible(): boolean {
    return this.maps.isValidCoordinate(this.latitude, this.longitude);
  }

  get titleText(): string {
    const label = this.resolvedLabel();
    return this.showDirections
      ? this.i18n.t('maps.directionsTo', { label })
      : this.i18n.t('maps.openInMaps', { label });
  }

  get ariaLabel(): string {
    const label = this.resolvedLabel();
    return this.showDirections
      ? this.i18n.t('maps.getDirectionsTo', { label })
      : this.i18n.t('maps.openInMaps', { label });
  }

  private resolvedLabel(): string {
    return this.label?.trim() || this.i18n.t('maps.label.location');
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
