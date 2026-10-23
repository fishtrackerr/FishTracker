import { Component, Input, OnChanges, SimpleChanges, inject, signal } from '@angular/core';
import { ImageService } from '../../../core/services/image.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-image-thumb',
  standalone: true,
  imports: [TranslatePipe],
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
        <span class="fav-badge" [attr.aria-label]="'lakes.favorite' | tr">★</span>
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
export class ImageThumbComponent implements OnChanges {
  private readonly imageService = inject(ImageService);

  @Input() imageId?: string;
  @Input() alt = 'Image';
  @Input() placeholder = '🎣';
  @Input() showFavorite = false;
  @Input() isFavorite = false;

  readonly url = signal<string | null>(null);
  readonly loading = signal(true);
  readonly fallbackUrl = this.imageService.getPlaceholderUrl();

  /** Guards against an older, slower load overwriting a newer image. */
  private loadToken = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imageId']) {
      void this.loadUrl();
    }
  }

  private async loadUrl(): Promise<void> {
    const token = ++this.loadToken;
    const imageId = this.imageId;
    let url = this.imageService.getPlaceholderUrl();
    if (imageId) {
      this.loading.set(true);
      try {
        url = (await this.imageService.getObjectUrl(imageId)) ?? url;
      } catch {
        // keep placeholder
      }
    }
    if (token !== this.loadToken) {
      return;
    }
    this.url.set(url);
    this.loading.set(false);
  }

  onImageError(): void {
    this.url.set(this.fallbackUrl);
  }
}
