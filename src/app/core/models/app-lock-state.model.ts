export interface AppLockState {
  isLocked: boolean;
  unlockedAt?: string;
  lockExpiresAt?: string;
  lastActivityAt?: string;
  /** Consecutive failed PIN attempts since last success or lockout. */
  failedAttempts?: number;
  /** Epoch ms when the current lockout ends. */
  lockoutUntil?: number;
  /** How many lockouts have been applied since last successful unlock (for backoff). */
  lockoutCount?: number;
}

export const DEFAULT_LOCK_STATE: AppLockState = {
  isLocked: true,
  failedAttempts: 0,
  lockoutCount: 0,
};

/** Failed attempts before a lockout is applied. */
export const PIN_MAX_ATTEMPTS = 5;
/** Initial lockout duration after hitting the attempt limit. */
export const PIN_INITIAL_LOCKOUT_MS = 30_000;
/** Cap for exponential lockout backoff. */
export const PIN_MAX_LOCKOUT_MS = 5 * 60_000;

export type PinVerifyResult =
  | { ok: true }
  | { ok: false; reason: 'incorrect' | 'lockout'; lockoutRemainingMs?: number };
