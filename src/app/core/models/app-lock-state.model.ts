export interface AppLockState {
  isLocked: boolean;
  unlockedAt?: string;
  lockExpiresAt?: string;
  lastActivityAt?: string;
}

export const DEFAULT_LOCK_STATE: AppLockState = {
  isLocked: true,
};
