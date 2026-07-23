import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProfileService } from '../../core/services/profile.service';
import { LakeService } from '../../core/services/lake.service';
import { SettingsService } from '../../core/services/settings.service';
import { NotificationService } from '../../core/services/notification.service';
import { UserProfile } from '../../core/models';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { ImageThumbComponent } from '../../shared/components/image-thumb/image-thumb.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    PageTitleComponent,
    ImageThumbComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private readonly profileService = inject(ProfileService);
  private readonly lakeService = inject(LakeService);
  private readonly settings = inject(SettingsService);
  private readonly notifications = inject(NotificationService);

  readonly profile = toSignal(this.profileService.watch(), { initialValue: undefined });
  readonly lakes = toSignal(this.lakeService.watchAll(), { initialValue: [] });
  readonly editing = signal(false);
  readonly draft = signal<UserProfile | null>(null);
  readonly saving = signal(false);

  startEdit(): void {
    const p = this.profile();
    if (p) {
      this.draft.set({ ...p });
      this.editing.set(true);
    }
  }

  cancelEdit(): void {
    this.editing.set(false);
    this.draft.set(null);
  }

  updateDraft(field: keyof UserProfile, value: unknown): void {
    const d = this.draft();
    if (d) {
      this.draft.set({ ...d, [field]: value });
    }
  }

  async save(): Promise<void> {
    const d = this.draft();
    if (!d) return;
    if (!d.displayName?.trim() && !d.firstName?.trim()) {
      this.notifications.error('Display name or first name is required');
      return;
    }
    this.saving.set(true);
    try {
      await this.profileService.save(d);
      this.notifications.success('Profile saved');
      this.editing.set(false);
      this.draft.set(null);
    } catch {
      this.notifications.error('Failed to save profile');
    } finally {
      this.saving.set(false);
    }
  }

  async onPictureUploaded(imageId: string): Promise<void> {
    await this.profileService.save({ profilePictureId: imageId });
    this.notifications.success('Profile picture updated');
  }

  async removePicture(): Promise<void> {
    await this.profileService.removeProfilePicture();
    this.notifications.success('Profile picture removed');
  }

  pickProfilePicture(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        void this.profileService.uploadProfilePicture(file).then(() => {
          this.notifications.success('Profile picture updated');
        });
      }
    };
    input.click();
  }
}
