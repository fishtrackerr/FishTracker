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

describe('ImageService homepage cover and session images', () => {
  let imageRepo: Record<string, ReturnType<typeof vi.fn>>;
  let prefs: { homepageImageId?: string };
  let service: ImageService;

  beforeEach(() => {
    prefs = { homepageImageId: 'old-cover' };
    imageRepo = {
      clearHomepageFlags: vi.fn().mockResolvedValue(undefined),
      getById: vi.fn(async (id: string) => ({ id, type: id === 'gallery-photo' ? 'catch' : 'cover' })),
      put: vi.fn().mockResolvedValue(undefined),
      purge: vi.fn().mockResolvedValue(undefined),
      getSessionImages: vi.fn(),
    };
    const fishingMode = {
      getActivePreferences: () => prefs,
      updateActivePreferences: (patch: object) => Object.assign(prefs, patch),
      requireMode: () => 'pike',
    };
    service = new ImageService(imageRepo as never, {} as never, fishingMode as never);
    vi.spyOn(service, 'processFile').mockResolvedValue('new-cover');
  });

  it('purges the previous cover upload when the homepage image changes', async () => {
    await service.replaceHomepageCover(new File(['x'], 'cover.jpg'));

    expect(prefs.homepageImageId).toBe('new-cover');
    expect(imageRepo['purge']).toHaveBeenCalledWith('old-cover');
  });

  it('keeps the previous homepage image when it is a gallery photo', async () => {
    prefs.homepageImageId = 'gallery-photo';

    await service.replaceHomepageCover(new File(['x'], 'cover.jpg'));

    expect(imageRepo['purge']).not.toHaveBeenCalled();
  });

  it('returns session images oldest first with thumbnail urls', async () => {
    imageRepo['getSessionImages'].mockResolvedValue([
      { id: 'b', createdAt: '2026-07-23T10:00:00.000Z' },
      { id: 'a', createdAt: '2026-07-23T09:00:00.000Z' },
    ]);
    vi.spyOn(service, 'getObjectUrl').mockImplementation(async (id) => `blob:${id}`);

    const items = await service.getSessionImages('s1', ['a']);

    expect(imageRepo['getSessionImages']).toHaveBeenCalledWith('s1', ['a']);
    expect(items.map((i) => [i.id, i.url])).toEqual([
      ['a', 'blob:a'],
      ['b', 'blob:b'],
    ]);
  });
});
