import { Injectable } from '@angular/core';
import { UserProfile } from '../models';
import { nowIso } from '../utils';
import { ImageService } from './image.service';
import { ProfileRepository } from './profile.repository';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(
    private readonly profileRepo: ProfileRepository,
    private readonly imageService: ImageService,
  ) {}

  watch() {
    return this.profileRepo.watch();
  }

  async get(): Promise<UserProfile> {
    return this.profileRepo.get();
  }

  async save(data: Partial<UserProfile>): Promise<UserProfile> {
    const existing = await this.profileRepo.get();
    const updated: UserProfile = {
      ...existing,
      ...data,
      id: 'default',
      updatedAt: nowIso(),
    };
    await this.profileRepo.put(updated);
    return updated;
  }

  async uploadProfilePicture(file: File): Promise<UserProfile> {
    const previousId = (await this.profileRepo.get()).profilePictureId;
    const pictureId = await this.imageService.processFile(file, 'profile', 'default');
    const saved = await this.save({ profilePictureId: pictureId });
    if (previousId && previousId !== pictureId) {
      await this.imageService.delete(previousId);
    }
    return saved;
  }

  async removeProfilePicture(): Promise<UserProfile> {
    const profile = await this.profileRepo.get();
    if (profile.profilePictureId) {
      await this.imageService.delete(profile.profilePictureId);
    }
    return this.save({ profilePictureId: undefined });
  }
}
