import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { ImageService } from '../../../core/services/image.service';

@Component({
  selector: 'app-image-thumb',
  standalone: true,
  template: `
    <div class="thumb-wrap">
      @if (url()) {
        <img [src]="url()" [alt]="alt" class="thumb" (error)="onImageError()" />
      } @else if (loading()) {
        <div class="placeholder loading" aria-hidden="true"></div>
      } @else {
        <img [src]="fallbackUrl" [alt]="alt" class="thumb" />
      }
      @if (showFavorite && isFavorite) {
        <span class="fav-badge" aria-label="Favorite">★</span>
      }
    </div>
  `,
  styles: `
    .thumb-wrap {
      position: relative;
      width: 100%;
      height: 100%;
      aspect-ratio: 16/10;
      border-radius: inherit;
      overflow: hidden;
    }
    .thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    .placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--background-secondary);
      border-radius: inherit;
      font-size: 2rem;
      color: var(--text-muted);
    }
    .placeholder.loading {
      animation: pulse 1s infinite;
    }
    .fav-badge {
      position: absolute;
      top: 4px;
      left: 4px;
      color: var(--warning);
    }
    @keyframes pulse {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }
  `,
})
export class ImageThumbComponent implements OnInit {
  private readonly imageService = inject(ImageService);

  @Input() imageId?: string;
  @Input() alt = 'Image';
  @Input() placeholder = '🎣';
  @Input() showFavorite = false;
  @Input() isFavorite = false;

  readonly url = signal<string | null>(null);
  readonly loading = signal(true);
  readonly fallbackUrl = this.imageService.getPlaceholderUrl();

  async ngOnInit(): Promise<void> {
    if (this.imageId) {
      try {
        const url = await this.imageService.getObjectUrl(this.imageId);
        this.url.set(url ?? this.imageService.getPlaceholderUrl());
      } catch {
        this.url.set(this.imageService.getPlaceholderUrl());
      }
    } else {
      this.url.set(this.imageService.getPlaceholderUrl());
    }
    this.loading.set(false);
  }

  onImageError(): void {
    this.url.set(this.fallbackUrl);
  }
}
