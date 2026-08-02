import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DemoDataService } from './demo-data.service';

describe('DemoDataService', () => {
  let service: DemoDataService;
  let lakes: { put: ReturnType<typeof vi.fn>; getAll: ReturnType<typeof vi.fn> };
  let sessions: { put: ReturnType<typeof vi.fn>; getAll: ReturnType<typeof vi.fn> };
  let catches: { put: ReturnType<typeof vi.fn> };
  let bites: { put: ReturnType<typeof vi.fn> };
  let fishSpotted: { put: ReturnType<typeof vi.fn> };
  let sessionEvents: { put: ReturnType<typeof vi.fn> };
  let fishingMode: {
    requireMode: ReturnType<typeof vi.fn>;
    getActivePreferences: ReturnType<typeof vi.fn>;
    updateActivePreferences: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    lakes = {
      put: vi.fn().mockResolvedValue(undefined),
      getAll: vi.fn().mockResolvedValue([]),
    };
    sessions = {
      put: vi.fn().mockResolvedValue(undefined),
      getAll: vi.fn().mockResolvedValue([]),
    };
    catches = { put: vi.fn().mockResolvedValue(undefined) };
    bites = { put: vi.fn().mockResolvedValue(undefined) };
    fishSpotted = { put: vi.fn().mockResolvedValue(undefined) };
    sessionEvents = { put: vi.fn().mockResolvedValue(undefined) };
    fishingMode = {
      requireMode: vi.fn().mockReturnValue('carper'),
      getActivePreferences: vi.fn().mockReturnValue({}),
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
      {
        ensureDefaultsForCurrentMode: vi.fn().mockResolvedValue(undefined),
      } as never,
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

    for (const [catchRecord] of catches.put.mock.calls) {
      expect(catchRecord.rodId).toBeTruthy();
      expect(typeof catchRecord.rodId).toBe('string');
    }
  });

  it('adds more sessions on a second run without replacing existing demo lakes', async () => {
    const existingLakes = [
      {
        id: 'lake-n',
        name: 'Demo Lake North',
        latitude: 52.37,
        longitude: 4.89,
        spots: [{ id: 's1', name: 'Dam wall', waterDepthM: 3 }],
      },
      {
        id: 'lake-s',
        name: 'Demo Lake South',
        latitude: 51.05,
        longitude: 3.72,
        spots: [{ id: 's2', name: 'Point', waterDepthM: 4 }],
      },
      {
        id: 'lake-c',
        name: 'Demo Canal Stretch',
        latitude: 51.92,
        longitude: 5.57,
        spots: [{ id: 's3', name: 'Bridge peg', waterDepthM: 2.8 }],
      },
    ];
    lakes.getAll.mockResolvedValue(existingLakes);
    sessions.getAll.mockResolvedValue(
      Array.from({ length: 6 }, (_, i) => ({ id: `old-${i}`, tags: ['demo', 'carper'] })),
    );
    fishingMode.getActivePreferences.mockReturnValue({ lastLakeId: 'lake-n' });

    const result = await service.generateForActiveMode();

    expect(result.lakes).toBe(0);
    expect(result.sessions).toBe(6);
    expect(lakes.put).not.toHaveBeenCalled();
    expect(sessions.put).toHaveBeenCalledTimes(6);
    expect(fishingMode.updateActivePreferences).not.toHaveBeenCalled();

    for (const [session] of sessions.put.mock.calls) {
      expect(session.name).toMatch(/#2$/);
      expect(session.tags).toContain('demo');
      expect(['lake-n', 'lake-s', 'lake-c']).toContain(session.lakeId);
    }
  });
});
