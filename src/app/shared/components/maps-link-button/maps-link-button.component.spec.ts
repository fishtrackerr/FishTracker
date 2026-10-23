import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { I18nService } from '../../../core/services/i18n.service';
import { MapsService } from '../../../core/services/maps.service';
import { MapsLinkButtonComponent } from './maps-link-button.component';

describe('MapsLinkButtonComponent', () => {
  const openLocation = vi.fn();
  const openDirectionsFromCurrent = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: MapsService,
          useValue: {
            isValidCoordinate: (lat?: number | null, lng?: number | null) => lat != null && lng != null,
            openLocation,
            openDirectionsFromCurrent,
          },
        },
        {
          provide: I18nService,
          useValue: {
            t: (key: string, params?: Record<string, string>) =>
              params ? `${key}:${params['label']}` : key,
          },
        },
      ],
    });
  });

  function create(): MapsLinkButtonComponent {
    return TestBed.runInInjectionContext(() => new MapsLinkButtonComponent());
  }

  it('builds translated title and aria label for opening a location', () => {
    const component = create();
    component.label = 'Lake One';

    expect(component.titleText).toBe('maps.openInMaps:Lake One');
    expect(component.ariaLabel).toBe('maps.openInMaps:Lake One');
  });

  it('builds translated title and aria label for directions', () => {
    const component = create();
    component.label = 'Lake One';
    component.showDirections = true;

    expect(component.titleText).toBe('maps.directionsTo:Lake One');
    expect(component.ariaLabel).toBe('maps.getDirectionsTo:Lake One');
  });

  it('falls back to the translated generic location label', () => {
    const component = create();

    expect(component.titleText).toBe('maps.openInMaps:maps.label.location');
  });

  it('opens the location or directions only with valid coordinates', () => {
    const component = create();
    component.onClick();
    expect(openLocation).not.toHaveBeenCalled();

    component.latitude = 52.1;
    component.longitude = 5.1;
    component.onClick();
    expect(openLocation).toHaveBeenCalledWith(52.1, 5.1);

    component.showDirections = true;
    component.onClick();
    expect(openDirectionsFromCurrent).toHaveBeenCalledWith({ latitude: 52.1, longitude: 5.1 });
  });
});
