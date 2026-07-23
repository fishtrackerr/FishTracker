import { Component, Input, output, signal, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ImageService } from '../../../core/services/image.service';
import { ConfirmService } from '../../../core/services/confirm.service';
import { NotificationService } from '../../../core/services/notification.service';
import { StoredImage } from '../../../core/models';
import { IconButtonComponent } from '../icon-button/icon-button.component';

export interface GalleryImageItem extends StoredImage {
  url?: string;
  species?: string;
  lakeName?: string;
}

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [MatButtonModule, IconButtonComponent],
  template: `
    <div class="gallery-grid">
      @for (item of items(); track item.id) {
        <div class="gallery-item" (click)="openViewer(item)">
          @if (item.url) {
            <img [src]="item.url" [alt]="item.fileName" class="thumb" />
          } @else {
            <div class="placeholder">🎣</div>
          }
          @if (item.isFavorite) {
            <span class="badge favorite" aria-label="Favorite">★</span>
          }
          @if (item.isHomepageImage) {
            <span class="badge homepage" aria-label="Homepage">🏠</span>
          }
          <div class="actions" (click)="$event.stopPropagation()">
            <app-icon-button
              icon="star"
              ariaLabel="Toggle favorite"
              tooltip="Favorite"
              (pressed)="toggleFavorite(item)"
            />
            <app-icon-button
              icon="home"
              ariaLabel="Set as homepage"
              tooltip="Homepage"
              (pressed)="setHomepage(item)"
            />
            @if (allowDelete) {
              <app-icon-button
                icon="delete"
                ariaLabel="Delete image"
                tooltip="Delete"
                (pressed)="deleteImage(item)"
              />
            }
          </div>
        </div>
      }
    </div>

    @if (viewerUrl()) {
      <div class="viewer" role="dialog" aria-label="Image preview" (click)="closeViewer()">
        <img [src]="viewerUrl()!" alt="Full size preview" (click)="$event.stopPropagation()" />
        <div class="viewer-nav" (click)="$event.stopPropagation()">
          <button mat-stroked-button type="button" (click)="prev()">Previous</button>
          <button mat-stroked-button type="button" (click)="closeViewer()">Close</button>
          <button mat-stroked-button type="button" (click)="next()">Next</button>
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
    }
    .thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--background-secondary);
      font-size: 2rem;
    }
    .badge {
      position: absolute;
      top: 4px;
      padding: 2px 6px;
      border-radius: 4px;
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
      background: rgba(0,0,0,0.5);
      opacity: 0;
      transition: opacity 0.2s;
    }
    .gallery-item:hover .actions { opacity: 1; }
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
export class ImageGalleryComponent {
  private readonly imageService = inject(ImageService);
  private readonly confirm = inject(ConfirmService);
  private readonly notifications = inject(NotificationService);

  @Input() allowDelete = true;
  @Input() set galleryItems(value: GalleryImageItem[]) {
    this.items.set(value);
  }
  readonly changed = output<void>();

  readonly items = signal<GalleryImageItem[]>([]);
  readonly viewerUrl = signal<string | null>(null);
  private viewerIndex = 0;

  setItems(items: GalleryImageItem[]): void {
    this.items.set(items);
  }

  // kept for programmatic updates
  async openViewer(item: GalleryImageItem): Promise<void> {
    const idx = this.items().findIndex((i) => i.id === item.id);
    this.viewerIndex = idx >= 0 ? idx : 0;
    const url = await this.imageService.getFullObjectUrl(item.id);
    this.viewerUrl.set(url);
  }

  closeViewer(): void {
    this.viewerUrl.set(null);
  }

  async prev(): Promise<void> {
    const list = this.items();
    if (!list.length) return;
    this.viewerIndex = (this.viewerIndex - 1 + list.length) % list.length;
    const url = await this.imageService.getFullObjectUrl(list[this.viewerIndex].id);
    this.viewerUrl.set(url);
  }

  async next(): Promise<void> {
    const list = this.items();
    if (!list.length) return;
    this.viewerIndex = (this.viewerIndex + 1) % list.length;
    const url = await this.imageService.getFullObjectUrl(list[this.viewerIndex].id);
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
    this.notifications.success('Homepage image updated');
    this.changed.emit();
  }

  async deleteImage(item: GalleryImageItem): Promise<void> {
    const ok = await this.confirm.confirmDelete('Delete image?', item.fileName);
    if (!ok) return;
    await this.imageService.delete(item.id);
    this.items.update((list) => list.filter((i) => i.id !== item.id));
    this.notifications.success('Image deleted');
    this.changed.emit();
  }
}
