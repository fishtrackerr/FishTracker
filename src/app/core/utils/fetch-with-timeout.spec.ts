import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DEFAULT_FETCH_TIMEOUT_MS, fetchWithTimeout } from './fetch-with-timeout';

describe('fetchWithTimeout', () => {
  let fetchMock: ReturnType<typeof vi.fn>;
  let originalTimeout: typeof AbortSignal.timeout | undefined;

  beforeEach(() => {
    fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);
    // Force the setTimeout-based fallback so fake timers can drive aborts.
    originalTimeout = AbortSignal.timeout;
    // @ts-expect-error test override
    AbortSignal.timeout = undefined;
  });

  afterEach(() => {
    if (originalTimeout) {
      AbortSignal.timeout = originalTimeout;
    }
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('forwards url and init and attaches a timeout signal', async () => {
    await fetchWithTimeout('/api', { cache: 'no-store', method: 'GET' });

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock.mock.calls[0][0]).toBe('/api');
    const init = fetchMock.mock.calls[0][1] as RequestInit;
    expect(init.cache).toBe('no-store');
    expect(init.method).toBe('GET');
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it('uses the default timeout constant', () => {
    expect(DEFAULT_FETCH_TIMEOUT_MS).toBe(8_000);
  });

  it('aborts when the timeout elapses', async () => {
    vi.useFakeTimers();
    fetchMock.mockImplementation((_url: string, init?: RequestInit) => {
      return new Promise((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => {
          reject(new DOMException('Aborted', 'AbortError'));
        });
      });
    });

    const pending = fetchWithTimeout('/slow', {}, 100);
    const expectation = expect(pending).rejects.toMatchObject({ name: 'AbortError' });
    await vi.advanceTimersByTimeAsync(100);
    await expectation;
  });

  it('succeeds before the timeout', async () => {
    fetchMock.mockResolvedValue({ ok: true, status: 200 });
    const response = await fetchWithTimeout('/fast', {}, 5_000);
    expect(response.ok).toBe(true);
  });
});
