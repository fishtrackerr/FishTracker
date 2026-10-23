import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ConfirmService } from '../../../core/services/confirm.service';
import { I18nService } from '../../../core/services/i18n.service';
import { ImageService } from '../../../core/services/image.service';
import { NotificationService } from '../../../core/services/notification.service';
import { GalleryImageItem, ImageGalleryComponent } from './image-gallery.component';

describe('ImageGalleryComponent', () => {
  let fixture: ComponentFixture<ImageGalleryComponent>;
  let toggleFavorite: ReturnType<typeof vi.fn>;

  const item = {
    id: 'img-1',
    fileName: 'carp.jpg',
    url: 'blob:img-1',
  } as GalleryImageItem;

  beforeEach(async () => {
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe = vi.fn();
        unobserve = vi.fn();
        disconnect = vi.fn();
      },
    );
    toggleFavorite = vi.fn().mockResolvedValue(undefined);

    await TestBed.configureTestingModule({
      imports: [ImageGalleryComponent],
      providers: [
        {
          provide: ImageService,
          useValue: {
            getPlaceholderUrl: () => 'placeholder',
            getObjectUrl: vi.fn().mockResolvedValue('blob:thumb'),
            getFullObjectUrl: vi.fn().mockResolvedValue('blob:full'),
            revokeFullUrl: vi.fn(),
            revokeAllFullUrls: vi.fn(),
            toggleFavorite,
          },
        },
        { provide: ConfirmService, useValue: { confirmDelete: vi.fn() } },
        { provide: NotificationService, useValue: { success: vi.fn() } },
        {
          provide: I18nService,
          useValue: { t: (key: string) => key, language: signal('en'), dictionary: signal({}) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageGalleryComponent);
    fixture.componentInstance.galleryItems = [item];
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    fixture.destroy();
    vi.unstubAllGlobals();
  });

  const el = (): HTMLElement => fixture.nativeElement as HTMLElement;

  it('does not nest the action buttons inside the open button', () => {
    const tile = el().querySelector('.gallery-item')!;
    expect(tile.tagName).toBe('DIV');
    expect(el().querySelectorAll('button button').length).toBe(0);
    expect(tile.querySelector('.open-btn')?.getAttribute('aria-label')).toBe('carp.jpg');
  });

  it('runs a tile action without opening the viewer', async () => {
    const star = el().querySelector<HTMLButtonElement>('.actions button')!;
    star.click();
    await fixture.whenStable();

    expect(toggleFavorite).toHaveBeenCalledWith('img-1');
    expect(fixture.componentInstance.viewerUrl()).toBeNull();
  });

  it('focuses the viewer on open, closes on Escape and returns focus to the opener', async () => {
    const opener = el().querySelector<HTMLButtonElement>('.open-btn')!;
    opener.focus();
    opener.click();
    await fixture.whenStable();
    fixture.detectChanges();

    const viewer = el().querySelector<HTMLElement>('.viewer')!;
    expect(viewer).toBeTruthy();
    expect(viewer.getAttribute('tabindex')).toBe('-1');
    await vi.waitFor(() => expect(document.activeElement).toBe(viewer));

    viewer.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.viewerUrl()).toBeNull();
    expect(el().querySelector('.viewer')).toBeNull();
    expect(document.activeElement).toBe(opener);
  });
});
