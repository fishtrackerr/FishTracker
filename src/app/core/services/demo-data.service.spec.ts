import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DemoDataService } from './demo-data.service';

describe('DemoDataService', () => {
  let service: DemoDataService;
  let lakes: { put: ReturnType<typeof vi.fn> };
  let sessions: { put: ReturnType<typeof vi.fn> };
  let catches: { put: ReturnType<typeof vi.fn> };
  let bites: { put: ReturnType<typeof vi.fn> };
  let fishSpotted: { put: ReturnType<typeof vi.fn> };
  let sessionEvents: { put: ReturnType<typeof vi.fn> };
  let fishingMode: {
    requireMode: ReturnType<typeof vi.fn>;
    updateActivePreferences: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    lakes = { put: vi.fn().mockResolvedValue(undefined) };
    sessions = { put: vi.fn().mockResolvedValue(undefined) };
    catches = { put: vi.fn().mockResolvedValue(undefined) };
    bites = { put: vi.fn().mockResolvedValue(undefined) };
    fishSpotted = { put: vi.fn().mockResolvedValue(undefined) };
    sessionEvents = { put: vi.fn().mockResolvedValue(undefined) };
    fishingMode = {
      requireMode: vi.fn().mockReturnValue('carper'),
      updateActivePreferences: vi.fn(),
    };

    service = new DemoDataService(
      lakes as never,
      sessions as never,
      catches as never,
      bites as never,
      fishSpotted as never,
      sessionEvents as never,
      fishingMode as never,
    );
  });

  it('seeds lakes, sessions with rods, and catches for the active mode', async () => {
    const result = await service.generateForActiveMode();

    expect(result.lakes).toBe(3);
    expect(result.sessions).toBe(6);
    expect(result.catches).toBeGreaterThan(5);
    expect(lakes.put).toHaveBeenCalledTimes(3);
    expect(sessions.put).toHaveBeenCalledTimes(6);
    expect(catches.put).toHaveBeenCalledTimes(result.catches);

    const sampleSession = sessions.put.mock.calls.find(
      (call) => call[0].status === 'completed' && (call[0].rods?.length ?? 0) >= 3,
    )?.[0];
    expect(sampleSession?.rods?.length).toBeGreaterThanOrEqual(3);
    expect(sampleSession?.sessionSpots?.length).toBeGreaterThan(0);
    expect(fishingMode.updateActivePreferences).toHaveBeenCalled();
  });
});
