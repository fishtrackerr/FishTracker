import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RodService } from './rod.service';
import { FishingSession } from '../models';

describe('RodService', () => {
  let service: RodService;
  let sessionRepo: { put: ReturnType<typeof vi.fn> };
  let biteRepo: { countByRod: ReturnType<typeof vi.fn> };
  let fishSpottedRepo: { countByRod: ReturnType<typeof vi.fn> };
  let catchRepo: { getBySession: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    sessionRepo = { put: vi.fn() };
    biteRepo = { countByRod: vi.fn().mockResolvedValue(0) };
    fishSpottedRepo = { countByRod: vi.fn().mockResolvedValue(0) };
    catchRepo = { getBySession: vi.fn().mockResolvedValue([]) };
    service = new RodService(
      sessionRepo as never,
      biteRepo as never,
      fishSpottedRepo as never,
      catchRepo as never,
      {} as never,
      { record: vi.fn() } as never,
    );
  });

  it('creates rods from count', () => {
    const rods = service.createRodRecords('s-1', 3);
    expect(rods).toHaveLength(3);
    expect(rods[0].name).toBe('Rod 1');
    expect(rods[2].name).toBe('Rod 3');
  });

  it('requires confirm when shrinking rods with activity', async () => {
    const session = {
      id: 's-1',
      rods: [
        { id: 'r-1', sessionId: 's-1', rodNumber: 1, name: 'Rod 1', biteCount: 2, fishSpottedCount: 0, isActive: true },
        { id: 'r-2', sessionId: 's-1', rodNumber: 2, name: 'Rod 2', biteCount: 0, fishSpottedCount: 0, isActive: true },
      ],
    } as FishingSession;
    biteRepo.countByRod.mockResolvedValueOnce(2);
    const result = await service.resizeRodCount(session, 1);
    expect(result.requiresConfirm).toBe(true);
  });
});
