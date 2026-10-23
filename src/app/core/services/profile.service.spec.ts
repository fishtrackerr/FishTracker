import { describe, expect, it, vi } from 'vitest';
import { ProfileService } from './profile.service';

describe('ProfileService.uploadProfilePicture', () => {
  it('deletes the previous picture after saving the new one', async () => {
    let profile = { id: 'default', profilePictureId: 'old-pic' };
    const profileRepo = {
      get: vi.fn(async () => profile),
      put: vi.fn(async (p: typeof profile) => {
        profile = p;
      }),
    };
    const imageService = {
      processFile: vi.fn().mockResolvedValue('new-pic'),
      delete: vi.fn().mockResolvedValue(undefined),
    };
    const service = new ProfileService(profileRepo as never, imageService as never);

    const saved = await service.uploadProfilePicture(new File(['x'], 'me.jpg'));

    expect(saved.profilePictureId).toBe('new-pic');
    expect(imageService.delete).toHaveBeenCalledWith('old-pic');
  });
});
