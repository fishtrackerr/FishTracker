import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserOptionService } from './user-option.service';

describe('UserOptionService', () => {
  let service: UserOptionService;
  let repo: {
    getByCategory: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    getAll: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  let sync: { onOptionRenamed: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    repo = {
      getByCategory: vi.fn().mockResolvedValue([
        { id: '1', category: 'bait', value: 'Corn', isFavorite: false, isDefault: true },
      ]),
      put: vi.fn(),
      getAll: vi.fn().mockResolvedValue([]),
      delete: vi.fn(),
    };
    sync = { onOptionRenamed: vi.fn().mockResolvedValue(undefined) };
    service = new UserOptionService(repo as never, sync as never, {
      requireMode: vi.fn().mockReturnValue('carper'),
      getActivePreferences: vi.fn().mockReturnValue({
        favoriteSpecies: ['Carp'],
        favoriteBaits: ['Corn'],
        favoriteRigs: ['Hair Rig'],
      }),
    } as never);
  });

  it('prevents duplicate options case-insensitively', async () => {
    const result = await service.saveOption('bait', 'corn');
    expect(result.value).toBe('Corn');
    expect(repo.put).not.toHaveBeenCalled();
  });

  it('saves new custom option trimmed', async () => {
    await service.saveOption('bait', '  Tiger Nut  ');
    expect(repo.put).toHaveBeenCalledWith(expect.objectContaining({ value: 'Tiger Nut' }));
  });

  it('renames an option and cascades string rewrite', async () => {
    repo.getAll.mockResolvedValue([
      { id: '1', category: 'bait', value: 'Corn', isFavorite: false, isDefault: true },
    ]);
    repo.getByCategory.mockResolvedValue([
      { id: '1', category: 'bait', value: 'Corn', isFavorite: false, isDefault: true },
    ]);

    const result = await service.rename('1', 'Maize');

    expect(result?.value).toBe('Maize');
    expect(repo.put).toHaveBeenCalledWith(expect.objectContaining({ id: '1', value: 'Maize' }));
    expect(sync.onOptionRenamed).toHaveBeenCalledWith('bait', 'Corn', 'Maize');
  });

  it('merges into an existing option when renaming to a duplicate', async () => {
    repo.getAll.mockResolvedValue([
      { id: '1', category: 'bait', value: 'Corn', isFavorite: true, isDefault: false },
      { id: '2', category: 'bait', value: 'Maize', isFavorite: false, isDefault: true },
    ]);
    repo.getByCategory.mockResolvedValue([
      { id: '1', category: 'bait', value: 'Corn', isFavorite: true, isDefault: false },
      { id: '2', category: 'bait', value: 'Maize', isFavorite: false, isDefault: true },
    ]);

    const result = await service.rename('1', 'maize');

    expect(result?.id).toBe('2');
    expect(repo.delete).toHaveBeenCalledWith('1');
    expect(repo.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: '2', isFavorite: true, value: 'Maize' }),
    );
    expect(sync.onOptionRenamed).toHaveBeenCalledWith('bait', 'Corn', 'Maize');
  });
});
