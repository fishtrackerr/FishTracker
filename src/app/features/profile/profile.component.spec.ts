import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ConfirmService } from '../../core/services/confirm.service';
import { I18nService } from '../../core/services/i18n.service';
import { LakeService } from '../../core/services/lake.service';
import { NotificationService } from '../../core/services/notification.service';
import { PhotoPickService } from '../../core/services/photo-pick.service';
import { ProfileService } from '../../core/services/profile.service';
import { SettingsService } from '../../core/services/settings.service';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  const removeProfilePicture = vi.fn().mockResolvedValue({});
  const confirm = vi.fn<ConfirmService['confirm']>();
  const success = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ProfileService,
          useValue: {
            watch: () => of(undefined),
            save: vi.fn(),
            removeProfilePicture,
            uploadProfilePicture: vi.fn(),
          },
        },
        { provide: LakeService, useValue: { watchAll: () => of([]) } },
        { provide: SettingsService, useValue: { get: () => ({}) } },
        { provide: NotificationService, useValue: { success, error: vi.fn() } },
        { provide: I18nService, useValue: { t: (key: string) => key } },
        { provide: PhotoPickService, useValue: { pickImage: vi.fn() } },
        { provide: ConfirmService, useValue: { confirm } },
      ],
    });
  });

  function create(): ProfileComponent {
    return TestBed.runInInjectionContext(() => new ProfileComponent());
  }

  it('asks for confirmation before removing the profile picture', async () => {
    confirm.mockResolvedValue(true);
    const component = create();

    await component.removePicture();

    expect(confirm).toHaveBeenCalledWith({
      title: 'profile.removePhotoTitle',
      message: 'profile.removePhotoMessage',
      confirmLabel: 'profile.removePhoto',
    });
    expect(removeProfilePicture).toHaveBeenCalledTimes(1);
    expect(success).toHaveBeenCalledWith('profile.pictureRemoved');
  });

  it('keeps the profile picture when removal is cancelled', async () => {
    confirm.mockResolvedValue(false);
    const component = create();

    await component.removePicture();

    expect(removeProfilePicture).not.toHaveBeenCalled();
    expect(success).not.toHaveBeenCalled();
  });
});
