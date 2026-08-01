/** Default timeout for network requests that should fail fast on poor connections. */
export const DEFAULT_FETCH_TIMEOUT_MS = 8_000;

/**
 * `fetch` with an AbortSignal timeout.
 * Uses `AbortSignal.timeout` when available; otherwise an AbortController + timer.
 */
export function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit = {},
  timeoutMs: number = DEFAULT_FETCH_TIMEOUT_MS,
): Promise<Response> {
  const timeoutSignal = createTimeoutSignal(timeoutMs);
  const signal = combineSignals(init.signal, timeoutSignal);
  return fetch(input, { ...init, signal });
}

function combineSignals(
  external: AbortSignal | null | undefined,
  timeoutSignal: AbortSignal,
): AbortSignal {
  if (!external) {
    return timeoutSignal;
  }
  if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.any === 'function') {
    return AbortSignal.any([external, timeoutSignal]);
  }

  const controller = new AbortController();
  const onAbort = (): void => {
    if (!controller.signal.aborted) {
      controller.abort();
    }
  };
  if (external.aborted || timeoutSignal.aborted) {
    onAbort();
    return controller.signal;
  }
  external.addEventListener('abort', onAbort, { once: true });
  timeoutSignal.addEventListener('abort', onAbort, { once: true });
  return controller.signal;
}

function createTimeoutSignal(timeoutMs: number): AbortSignal {
  if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function') {
    return AbortSignal.timeout(timeoutMs);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  controller.signal.addEventListener(
    'abort',
    () => clearTimeout(timer),
    { once: true },
  );
  return controller.signal;
}
