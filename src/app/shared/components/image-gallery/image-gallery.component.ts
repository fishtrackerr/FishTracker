import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  output,
  signal,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ImageService } from '../../../core/services/image.service';
import { ConfirmService } from '../../../core/services/confirm.service';
import { NotificationService } from '../../../core/services/notification.service';
import { StoredImage } from '../../../core/models';
import { I18nService } from '../../../core/services/i18n.service';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { TranslatePipe } from '../../pipes/translate.pipe';

export interface GalleryImageItem extends StoredImage {
  url?: string;
  species?: string;
  lakeName?: string;
}

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [MatButtonModule, IconButtonComponent, TranslatePipe],
  template: `
    <div class="gallery-grid">
      @for (item of items(); track item.id) {
        <button
          type="button"
          class="gallery-item"
          [attr.data-id]="item.id"
          [attr.aria-label]="item.fileName"
          (click)="openViewer(item)"
        >
          @if (item.url) {
            <img [src]="item.url" [alt]="item.fileName" class="thumb" (error)="setFallbackForItem(item)" loading="lazy" />
          } @else {
            <span class="thumb-pending" aria-hidden="true"></span>
          }
          @if (item.isFavorite) {
            <span class="badge favorite" [attr.aria-label]="'gallery.toggleFavorite' | tr">★</span>
          }
          @if (item.isHomepageImage) {
            <span class="badge homepage" [attr.aria-label]="'gallery.setHomepage' | tr">🏠</span>
          }
          <div class="actions" (click)="$event.stopPropagation()">
            <app-icon-button
              icon="star"
              [ariaLabel]="'gallery.toggleFavorite' | tr"
              [tooltip]="'gallery.toggleFavorite' | tr"
              (pressed)="toggleFavorite(item)"
            />
            <app-icon-button
              icon="home"
              [ariaLabel]="'gallery.setHomepage' | tr"
              [tooltip]="'gallery.setHomepage' | tr"
              (pressed)="setHomepage(item)"
            />
            @if (allowDelete) {
              <app-icon-button
                icon="delete"
                [ariaLabel]="'gallery.deleteImage' | tr"
                [tooltip]="'gallery.deleteImage' | tr"
                (pressed)="deleteImage(item)"
              />
            }
          </div>
        </button>
      }
    </div>

    @if (viewerUrl()) {
      <div
        class="viewer"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="'gallery.imagePreview' | tr"
        (click)="closeViewer()"
        (keydown.escape)="closeViewer()"
      >
        <img [src]="viewerUrl()!" [alt]="'gallery.fullPreview' | tr" (error)="onViewerError()" (click)="$event.stopPropagation()" />
        <div class="viewer-nav" (click)="$event.stopPropagation()">
          <button mat-stroked-button type="button" (click)="prev()">{{ 'common.previous' | tr }}</button>
          <button mat-stroked-button type="button" (click)="closeViewer()">{{ 'common.close' | tr }}</button>
          <button mat-stroked-button type="button" (click)="next()">{{ 'common.next' | tr }}</button>
        </div>
      </div>
    }
  `,
  styles: `
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: var(--spacing-md);
    }
    .gallery-item {
      position: relative;
      aspect-ratio: 1;
      border-radius: var(--radius-sm);
      overflow: hidden;
      border: 1px solid var(--border-primary);
      cursor: pointer;
      padding: 0;
      background: var(--background-secondary);
      display: block;
      width: 100%;
    }
    .thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .thumb-pending {
      display: block;
      width: 100%;
      height: 100%;
      background: var(--background-secondary);
    }
    .badge {
      position: absolute;
      top: 4px;
      padding: 2px 6px;
      border-radius: var(--radius-xs);
      font-size: 0.75rem;
      background: rgba(0,0,0,0.6);
    }
    .badge.favorite { left: 4px; color: var(--warning); }
    .badge.homepage { right: 4px; }
    .actions {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      background: rgba(0,0,0,0.55);
      opacity: 1;
      transition: opacity 0.2s;
    }
    @media (hover: hover) and (pointer: fine) {
      .actions { opacity: 0; }
      .gallery-item:hover .actions,
      .gallery-item:focus-within .actions { opacity: 1; }
    }
    .viewer {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.9);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .viewer img {
      max-width: 95vw;
      max-height: 80vh;
      object-fit: contain;
    }
    .viewer-nav {
      display: flex;
      gap: var(--spacing-md);
      margin-top: var(--spacing-md);
    }
  `,
})
export class ImageGalleryComponent implements AfterViewInit, OnDestroy {
  private readonly imageService = inject(ImageService);
  private readonly confirm = inject(ConfirmService);
  private readonly notifications = inject(NotificationService);
  private readonly i18n = inject(I18nService);
  private readonly host = inject(ElementRef<HTMLElement>);

  @Input() allowDelete = true;
  @Input() set galleryItems(value: GalleryImageItem[]) {
    this.items.set(value);
    queueMicrotask(() => this.observeThumbs());
  }
  readonly changed = output<void>();

  readonly items = signal<GalleryImageItem[]>([]);
  readonly viewerUrl = signal<string | null>(null);
  readonly placeholderUrl = this.imageService.getPlaceholderUrl();
  private viewerIndex = 0;
  private viewerImageId: string | null = null;
  private observer?: IntersectionObserver;
  private readonly loadingIds = new Set<string>();

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = (entry.target as HTMLElement).dataset['id'];
          if (id) {
            void this.ensureThumb(id);
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { root: null, rootMargin: '120px', threshold: 0.01 },
    );
    this.observeThumbs();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.imageService.revokeAllFullUrls();
  }

  private observeThumbs(): void {
    if (!this.observer) return;
    const nodes = this.host.nativeElement.querySelectorAll('.gallery-item');
    nodes.forEach((node: Element) => this.observer!.observe(node));
  }

  private async ensureThumb(id: string): Promise<void> {
    const item = this.items().find((i) => i.id === id);
    if (!item || item.url || this.loadingIds.has(id)) return;
    this.loadingIds.add(id);
    try {
      const url = (await this.imageService.getObjectUrl(id)) ?? this.placeholderUrl;
      this.items.update((list) =>
        list.map((i) => (i.id === id ? { ...i, url: url ?? undefined } : i)),
      );
    } finally {
      this.loadingIds.delete(id);
    }
  }

  async openViewer(item: GalleryImageItem): Promise<void> {
    const idx = this.items().findIndex((i) => i.id === item.id);
    this.viewerIndex = idx >= 0 ? idx : 0;
    await this.showViewerAt(this.viewerIndex);
  }

  closeViewer(): void {
    if (this.viewerImageId) {
      this.imageService.revokeFullUrl(this.viewerImageId);
      this.viewerImageId = null;
    }
    this.viewerUrl.set(null);
  }

  setFallbackForItem(item: GalleryImageItem): void {
    item.url = this.placeholderUrl;
    this.items.update((list) => [...list]);
  }

  onViewerError(): void {
    this.viewerUrl.set(this.placeholderUrl);
  }

  async prev(): Promise<void> {
    const list = this.items();
    if (!list.length) return;
    this.viewerIndex = (this.viewerIndex - 1 + list.length) % list.length;
    await this.showViewerAt(this.viewerIndex);
  }

  async next(): Promise<void> {
    const list = this.items();
    if (!list.length) return;
    this.viewerIndex = (this.viewerIndex + 1) % list.length;
    await this.showViewerAt(this.viewerIndex);
  }

  private async showViewerAt(index: number): Promise<void> {
    const list = this.items();
    const item = list[index];
    if (!item) return;
    if (this.viewerImageId && this.viewerImageId !== item.id) {
      this.imageService.revokeFullUrl(this.viewerImageId);
    }
    const url = await this.imageService.getFullObjectUrl(item.id);
    this.viewerImageId = item.id;
    this.viewerUrl.set(url);
  }

  async toggleFavorite(item: GalleryImageItem): Promise<void> {
    await this.imageService.toggleFavorite(item.id);
    item.isFavorite = !item.isFavorite;
    this.changed.emit();
  }

  async setHomepage(item: GalleryImageItem): Promise<void> {
    await this.imageService.setHomepageImage(item.id);
    this.items.update((list) =>
      list.map((i) => ({ ...i, isHomepageImage: i.id === item.id })),
    );
    this.notifications.success(this.i18n.t('gallery.homepageUpdated'));
    this.changed.emit();
  }

  async deleteImage(item: GalleryImageItem): Promise<void> {
    const ok = await this.confirm.confirmDelete(this.i18n.t('gallery.deleteImage'), item.fileName);
    if (!ok) return;
    await this.imageService.delete(item.id);
    this.items.update((list) => list.filter((i) => i.id !== item.id));
    this.notifications.success(this.i18n.t('gallery.imageDeleted'));
    this.changed.emit();
  }
}
