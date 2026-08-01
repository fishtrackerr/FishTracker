import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ImageService } from './image.service';

describe('ImageService.createCoverImage', () => {
  let service: ImageService;
  let imageRepo: { put: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    imageRepo = { put: vi.fn().mockResolvedValue(undefined) };
    const settings = { get: vi.fn().mockReturnValue({}), update: vi.fn() };
    const fishingMode = {
      getActivePreferences: vi.fn().mockReturnValue({}),
      updateActivePreferences: vi.fn(),
      requireMode: vi.fn().mockReturnValue('carper'),
    };
    service = new ImageService(imageRepo as never, settings as never, fishingMode as never);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns undefined when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));

    const id = await service.createCoverImage();

    expect(id).toBeUndefined();
    expect(imageRepo.put).not.toHaveBeenCalled();
  });
});
