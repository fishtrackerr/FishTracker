import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
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
import { PhotoPickService } from '../../core/services/photo-pick.service';
import { UserProfile } from '../../core/models';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { ImageThumbComponent } from '../../shared/components/image-thumb/image-thumb.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { I18nService } from '../../core/services/i18n.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    PageTitleComponent,
    ImageThumbComponent,
    TranslatePipe,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private readonly profileService = inject(ProfileService);
  private readonly lakeService = inject(LakeService);
  private readonly settings = inject(SettingsService);
  private readonly notifications = inject(NotificationService);
  private readonly i18n = inject(I18nService);
  private readonly photoPick = inject(PhotoPickService);

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
      this.notifications.error(this.i18n.t('profile.displayNameOrFirstNameRequired'));
      return;
    }
    this.saving.set(true);
    try {
      await this.profileService.save(d);
      this.notifications.success(this.i18n.t('profile.profileSaved'));
      this.editing.set(false);
      this.draft.set(null);
    } catch {
      this.notifications.error(this.i18n.t('profile.saveFailed'));
    } finally {
      this.saving.set(false);
    }
  }

  async onPictureUploaded(imageId: string): Promise<void> {
    await this.profileService.save({ profilePictureId: imageId });
    this.notifications.success(this.i18n.t('profile.pictureUpdated'));
  }

  async removePicture(): Promise<void> {
    await this.profileService.removeProfilePicture();
    this.notifications.success(this.i18n.t('profile.pictureRemoved'));
  }

  async pickProfilePicture(): Promise<void> {
    const file = await this.photoPick.pickImage();
    if (file) {
      await this.profileService.uploadProfilePicture(file);
      this.notifications.success(this.i18n.t('profile.pictureUpdated'));
    }
  }
}
