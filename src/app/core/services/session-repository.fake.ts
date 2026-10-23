import { FishingSession } from '../models';

interface SessionRowSource {
  getById(id: string): Promise<FishingSession | undefined>;
  put(session: FishingSession): Promise<unknown>;
}

/**
 * Test double for `SessionRepository.modify`: applies the change to a copy of
 * the mocked `getById` row and saves it through the mocked `put`.
 */
export function fakeSessionModify(repo: object) {
  const source = repo as SessionRowSource;
  return async (
    id: string,
    change: (session: FishingSession) => void,
  ): Promise<FishingSession | undefined> => {
    const row = await source.getById(id);
    if (!row) {
      return undefined;
    }
    const latest = { ...row };
    change(latest);
    await source.put(latest);
    return latest;
  };
}
