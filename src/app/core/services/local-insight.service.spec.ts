import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Catch, FishingSession, Lake } from '../models';
import { FishingDataContextService } from './fishing-data-context.service';
import { LocalInsightService } from './local-insight.service';
import { StatisticsService } from './statistics.service';

function makeSession(partial: Partial<FishingSession>): FishingSession {
  return {
    id: 'session-1',
    name: 'Session',
    status: 'completed',
    startDate: '2026-07-20T06:00:00.000Z',
    endDate: '2026-07-20T10:00:00.000Z',
    photoIds: [],
    catchCount: 0,
    totalCatchWeightKg: 0,
    createdAt: '2026-07-20T06:00:00.000Z',
    updatedAt: '2026-07-20T10:00:00.000Z',
    ...partial,
  };
}

function makeCatch(partial: Partial<Catch>): Catch {
  return {
    id: 'catch-1',
    sessionId: 'session-1',
    species: 'Carp',
    caughtAt: '2026-07-20T07:00:00.000Z',
    createdAt: '2026-07-20T07:00:00.000Z',
    updatedAt: '2026-07-20T07:00:00.000Z',
    ...partial,
  };
}

function makeLake(partial: Partial<Lake>): Lake {
  return {
    id: 'lake-1',
    name: 'Lake',
    isFavorite: false,
    spots: [],
    photoIds: [],
    createdAt: '2026-07-20T06:00:00.000Z',
    updatedAt: '2026-07-20T10:00:00.000Z',
    ...partial,
  };
}

describe('LocalInsightService', () => {
  const i18n = {
    t: (key: string, params?: Record<string, string | number>) => {
      if (params) {
        return `${key}:${JSON.stringify(params)}`;
      }
      return key;
    },
  };

  let contextService: FishingDataContextService;
  let service: LocalInsightService;

  beforeEach(() => {
    const stats = new StatisticsService({} as never, {} as never, {} as never);
    contextService = new FishingDataContextService(
      {} as never,
      {} as never,
      {} as never,
      stats,
    );
    service = new LocalInsightService(contextService, i18n as never);
  });

  it('answers best-time from catch hours', () => {
    const sessions = [
      makeSession({ id: 's1', lakeId: 'l1', catchCount: 2 }),
    ];
    const catches = [
      makeCatch({
        id: 'c1',
        sessionId: 's1',
        caughtAt: '2026-07-20T07:15:00.000Z',
        bait: 'Boilie',
      }),
      makeCatch({
        id: 'c2',
        sessionId: 's1',
        caughtAt: '2026-07-20T07:45:00.000Z',
        bait: 'Boilie',
      }),
      makeCatch({
        id: 'c3',
        sessionId: 's1',
        caughtAt: '2026-07-21T18:00:00.000Z',
        bait: 'Corn',
      }),
    ];
    const lakes = [makeLake({ id: 'l1', name: 'Mirror Lake' })];
    const context = contextService.buildFrom(sessions, catches, lakes);
    const answer = service.answerFromContext('best-time', context);
    expect(answer).toContain('assistant.insights.bestTimeIntro');
    expect(answer).toContain('assistant.insights.catches');
  });

  it('answers best-lake ranking', () => {
    const sessions = [
      makeSession({ id: 's1', lakeId: 'l1', catchCount: 1 }),
      makeSession({ id: 's2', lakeId: 'l2', catchCount: 3 }),
    ];
    const catches = [
      makeCatch({ id: 'c1', sessionId: 's1' }),
      makeCatch({ id: 'c2', sessionId: 's2' }),
      makeCatch({ id: 'c3', sessionId: 's2' }),
      makeCatch({ id: 'c4', sessionId: 's2' }),
    ];
    const lakes = [
      makeLake({ id: 'l1', name: 'Small Pond' }),
      makeLake({ id: 'l2', name: 'Big Lake' }),
    ];
    const context = contextService.buildFrom(sessions, catches, lakes);
    const answer = service.answerFromContext('best-lake', context);
    expect(answer).toContain('Big Lake');
    expect(answer).toContain('assistant.insights.bestLakeIntro');
  });

  it('returns no-catches message when empty', () => {
    const context = contextService.buildFrom([], [], []);
    expect(service.answerFromContext('best-bait-rig', context)).toBe(
      'assistant.insights.noCatches',
    );
  });
});

describe('FishingDataContextService', () => {
  it('builds compact summary without photos', () => {
    const stats = new StatisticsService({} as never, {} as never, {} as never);
    const service = new FishingDataContextService(
      {} as never,
      {} as never,
      {} as never,
      stats,
    );
    const sessions = [makeSession({ id: 's1', lakeId: 'l1', name: 'Dawn', catchCount: 1 })];
    const catches = [
      makeCatch({
        id: 'c1',
        sessionId: 's1',
        bait: 'Boilie',
        rig: 'Hair Rig',
        weightKg: 8.2,
      }),
    ];
    const lakes = [
      makeLake({
        id: 'l1',
        name: 'Mirror Lake',
        spots: [{ id: 'sp1', name: 'A', isFavorite: false }],
      }),
    ];
    const context = service.buildFrom(sessions, catches, lakes);
    expect(context.summary.totalCatches).toBe(1);
    expect(context.summary.bestBait).toBe('Boilie');
    expect(context.lakes[0]?.name).toBe('Mirror Lake');
    expect(service.toPromptText(context)).toContain('Mirror Lake');
    expect(service.toPromptText(context)).not.toContain('photo');
  });
});

describe('ChatService resolve paths', () => {
  it('uses local insight when AI is not configured', async () => {
    const chatRepo = {
      putThread: vi.fn(),
      putMessage: vi.fn(),
      getThread: vi.fn(),
      getMessages: vi.fn().mockResolvedValue([]),
      watchThreads: vi.fn(),
      watchMessages: vi.fn(),
      deleteThread: vi.fn(),
    };
    const localInsights = {
      answer: vi.fn().mockResolvedValue('local answer'),
      matchPromptId: vi.fn(),
    };
    const contextService = { build: vi.fn(), toPromptText: vi.fn() };
    const llm = { isConfigured: () => false, chat: vi.fn() };
    const i18n = {
      t: (key: string) => key,
    };
    const notifications = { error: vi.fn() };

    const { ChatService } = await import('./chat.service');
    const service = new ChatService(
      chatRepo as never,
      localInsights as never,
      contextService as never,
      llm as never,
      i18n as never,
      notifications as never,
    );

    await service.startPromptThread('best-time');
    expect(localInsights.answer).toHaveBeenCalledWith('best-time');
    expect(chatRepo.putThread).toHaveBeenCalled();
    expect(chatRepo.putMessage).toHaveBeenCalled();
    expect(llm.chat).not.toHaveBeenCalled();
  });
});
