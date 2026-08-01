import { Injectable } from '@angular/core';

export interface PickImageOptions {
  /** Prefer camera capture on mobile when supported. */
  capture?: boolean;
  accept?: string;
}

/**
 * Shared file-input picker for images (replaces duplicated createElement('input') flows).
 */
@Injectable({ providedIn: 'root' })
export class PhotoPickService {
  pickImage(options: PickImageOptions = {}): Promise<File | null> {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = options.accept ?? 'image/*';
      if (options.capture) {
        input.capture = 'environment';
      }
      input.onchange = () => {
        const file = input.files?.[0] ?? null;
        resolve(file);
      };
      input.oncancel = () => resolve(null);
      input.click();
    });
  }
}
