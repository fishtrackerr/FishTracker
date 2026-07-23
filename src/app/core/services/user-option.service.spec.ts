import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserOptionService } from './user-option.service';

describe('UserOptionService', () => {
  let service: UserOptionService;
  let repo: {
    getByCategory: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    getAll: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    repo = {
      getByCategory: vi.fn().mockResolvedValue([
        { id: '1', category: 'bait', value: 'Corn', isFavorite: false, isDefault: true },
      ]),
      put: vi.fn(),
      getAll: vi.fn().mockResolvedValue([]),
    };
    service = new UserOptionService(repo as never);
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
});
