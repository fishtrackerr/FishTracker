import { Pipe, PipeTransform, inject } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { celsiusToFahrenheit, kgToLbs, cmToInch } from '../utils';

@Pipe({ name: 'formatWeight', standalone: true, pure: false })
export class FormatWeightPipe implements PipeTransform {
  private readonly settings = inject(SettingsService);

  transform(kg: number | undefined | null): string {
    if (kg == null) return '—';
    const unit = this.settings.get().weightUnit;
    if (unit === 'lbs') {
      return `${kgToLbs(kg).toFixed(1)} lbs`;
    }
    return `${kg.toFixed(1)} kg`;
  }
}

@Pipe({ name: 'formatLength', standalone: true, pure: false })
export class FormatLengthPipe implements PipeTransform {
  private readonly settings = inject(SettingsService);

  transform(cm: number | undefined | null): string {
    if (cm == null) return '—';
    const unit = this.settings.get().lengthUnit;
    if (unit === 'inch') {
      return `${cmToInch(cm).toFixed(1)} in`;
    }
    return `${cm.toFixed(0)} cm`;
  }
}

@Pipe({ name: 'formatTemp', standalone: true, pure: false })
export class FormatTempPipe implements PipeTransform {
  private readonly settings = inject(SettingsService);

  transform(celsius: number | undefined | null): string {
    if (celsius == null) return '—';
    const unit = this.settings.get().temperatureUnit;
    if (unit === 'fahrenheit') {
      return `${celsiusToFahrenheit(celsius).toFixed(0)}°F`;
    }
    return `${celsius.toFixed(0)}°C`;
  }
}
