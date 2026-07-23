import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BiteEventService } from './bite-event.service';

describe('BiteEventService', () => {
  let service: BiteEventService;
  let repo: { put: ReturnType<typeof vi.fn>; getLatestByRod: ReturnType<typeof vi.fn>; delete: ReturnType<typeof vi.fn> };
  let sessionRepo: { getById: ReturnType<typeof vi.fn> };
  let rodService: { syncRodCounts: ReturnType<typeof vi.fn> };
  let sessionEvents: { record: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    repo = {
      put: vi.fn(),
      getLatestByRod: vi.fn(),
      delete: vi.fn(),
    };
    sessionRepo = {
      getById: vi.fn().mockResolvedValue({
        id: 's-1',
        rods: [{ id: 'r-1', name: 'Rod 1', biteCount: 1, sessionSpotId: 'sp-1' }],
      }),
    };
    rodService = { syncRodCounts: vi.fn().mockResolvedValue({ id: 's-1' }) };
    sessionEvents = { record: vi.fn() };
    service = new BiteEventService(
      repo as never,
      sessionRepo as never,
      rodService as never,
      sessionEvents as never,
    );
  });

  it('adds bite and records session event', async () => {
    await service.addBite('s-1', 'r-1');
    expect(repo.put).toHaveBeenCalled();
    expect(sessionEvents.record).toHaveBeenCalledWith(expect.objectContaining({ type: 'bite' }));
  });

  it('does not remove bite below zero', async () => {
    sessionRepo.getById.mockResolvedValue({
      id: 's-1',
      rods: [{ id: 'r-1', name: 'Rod 1', biteCount: 0 }],
    });
    await service.removeBite('s-1', 'r-1');
    expect(repo.delete).not.toHaveBeenCalled();
  });
});
