import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LakeService } from './lake.service';

describe('LakeService', () => {
  let service: LakeService;
  let repo: {
    getById: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
  };
  let sync: {
    onLakeRenamed: ReturnType<typeof vi.fn>;
    onLakeSpotUpdated: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    repo = {
      getById: vi.fn(),
      put: vi.fn(),
    };
    sync = {
      onLakeRenamed: vi.fn().mockResolvedValue(undefined),
      onLakeSpotUpdated: vi.fn().mockResolvedValue(undefined),
    };
    const settings = {
      get: vi.fn().mockReturnValue({ defaultCountry: 'Netherlands' }),
    };
    service = new LakeService(repo as never, sync as never, settings as never);
  });

  it('applies default country from settings when creating a lake', async () => {
    await service.create({ name: 'New Lake' });

    expect(repo.put).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'New Lake', country: 'Netherlands' }),
    );
  });

  it('keeps an explicit country over the settings default', async () => {
    await service.create({ name: 'French Lake', country: 'France' });

    expect(repo.put).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'French Lake', country: 'France' }),
    );
  });

  it('cascades lake rename to related data', async () => {
    repo.getById.mockResolvedValue({
      id: 'lake-1',
      name: 'Old',
      spots: [],
      photoIds: [],
      isFavorite: false,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    });

    await service.update('lake-1', { name: 'New' });

    expect(repo.put).toHaveBeenCalledWith(expect.objectContaining({ name: 'New' }));
    expect(sync.onLakeRenamed).toHaveBeenCalledWith('lake-1', 'Old', 'New');
  });

  it('does not cascade when name is unchanged', async () => {
    repo.getById.mockResolvedValue({
      id: 'lake-1',
      name: 'Same',
      spots: [],
      photoIds: [],
      isFavorite: false,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    });

    await service.update('lake-1', { notes: 'hello' });

    expect(sync.onLakeRenamed).not.toHaveBeenCalled();
  });

  it('cascades spot updates to session spot snapshots', async () => {
    repo.getById.mockResolvedValue({
      id: 'lake-1',
      name: 'Lake',
      spots: [
        {
          id: 'spot-1',
          name: 'Old Spot',
          waterDepthM: 1,
          isFavorite: false,
        },
      ],
      photoIds: [],
      isFavorite: false,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    });

    await service.updateSpot('lake-1', 'spot-1', { name: 'New Spot', waterDepthM: 2 });

    expect(sync.onLakeSpotUpdated).toHaveBeenCalledWith(
      'lake-1',
      'spot-1',
      expect.objectContaining({ name: 'New Spot', depth: 2 }),
    );
  });

  it('soft-deletes spots instead of removing them', async () => {
    repo.getById.mockResolvedValue({
      id: 'lake-1',
      name: 'Lake',
      spots: [
        { id: 'spot-1', name: 'Keep', isFavorite: false },
        { id: 'spot-2', name: 'Hide', isFavorite: false },
      ],
      photoIds: [],
      isFavorite: false,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    });

    await service.deleteSpot('lake-1', 'spot-2');

    expect(repo.put).toHaveBeenCalledWith(
      expect.objectContaining({
        spots: [
          { id: 'spot-1', name: 'Keep', isFavorite: false },
          { id: 'spot-2', name: 'Hide', isFavorite: false, visible: false },
        ],
      }),
    );
  });

  it('hides soft-deleted spots on getById', async () => {
    repo.getById.mockResolvedValue({
      id: 'lake-1',
      name: 'Lake',
      spots: [
        { id: 'spot-1', name: 'Keep', isFavorite: false },
        { id: 'spot-2', name: 'Hide', isFavorite: false, visible: false },
      ],
      photoIds: [],
      isFavorite: false,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    });

    const lake = await service.getById('lake-1');
    expect(lake?.spots).toEqual([{ id: 'spot-1', name: 'Keep', isFavorite: false }]);
  });
});
