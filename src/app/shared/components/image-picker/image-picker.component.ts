import { Component, Input, output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ImageService } from '../../../core/services/image.service';
import { ImageType } from '../../../core/models';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-image-picker',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <div class="picker">
      <button mat-stroked-button type="button" (click)="pickFile(false)">
        Upload
      </button>
      <button mat-stroked-button type="button" (click)="pickFile(true)">
        Camera
      </button>
    </div>
  `,
  styles: `
    .picker {
      display: flex;
      gap: var(--spacing-sm);
      flex-wrap: wrap;
    }
  `,
})
export class ImagePickerComponent {
  private readonly imageService = inject(ImageService);
  private readonly notifications = inject(NotificationService);

  @Input({ required: true }) type!: ImageType;
  @Input() parentId?: string;
  readonly uploaded = output<string>();

  pickFile(useCamera: boolean): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    if (useCamera) {
      input.capture = 'environment';
    }
    input.onchange = () => {
      void this.handleFile(input.files?.[0]);
    };
    input.click();
  }

  private async handleFile(file?: File): Promise<void> {
    if (!file) return;
    try {
      const id = await this.imageService.processFile(file, this.type, this.parentId);
      this.uploaded.emit(id);
      this.notifications.success('Image uploaded');
    } catch {
      this.notifications.error('Failed to upload image');
    }
  }
}
