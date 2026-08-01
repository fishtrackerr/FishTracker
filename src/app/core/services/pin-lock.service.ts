import { Injectable, inject, signal, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { AppLockState, DEFAULT_LOCK_STATE } from '../models/app-lock-state.model';
import { SettingsService } from './settings.service';
import { LOCK_STATE_KEY, UNLOCK_SESSION_KEY } from '../constants/storage-keys';
import { persistReturnUrl } from '../utils/return-url';

@Injectable({ providedIn: 'root' })
export class PinLockService {
  private readonly settings = inject(SettingsService);
  private readonly router = inject(Router);

  private readonly lockedSignal = signal(true);
  private lockState: AppLockState = { ...DEFAULT_LOCK_STATE };
  private activityListenerAttached = false;
  private lockChangeCallback?: (locked: boolean) => void;

  readonly isLocked = this.lockedSignal.asReadonly();

  constructor() {
    this.ensureActivityListener();
  }

  initializeFromStorage(): void {
    if (!this.hasPinConfigured()) {
      this.lockedSignal.set(false);
      return;
    }

    this.lockState = this.loadLockState();
    const hasUnlockSession = this.hasUnlockSession();
    const timeoutMs = this.settings.get().lockTimeoutMinutes * 60 * 1000;
    const lastActivity = this.lockState.lastActivityAt
      ? new Date(this.lockState.lastActivityAt).getTime()
      : 0;

    // Cold start or no verified unlock session → always lock (do not trust localStorage isLocked alone).
    if (!hasUnlockSession) {
      this.lockState.isLocked = true;
      this.persistLockState();
      this.lockedSignal.set(true);
      if (isDevMode()) {
        console.debug('[PinLock] locked on cold start (no unlock session)');
      }
      return;
    }

    if (lastActivity > 0) {
      const elapsed = Date.now() - lastActivity;
      if (elapsed > timeoutMs) {
        this.lockState.isLocked = true;
        this.clearUnlockSession();
        this.persistLockState();
        this.lockedSignal.set(true);
        if (isDevMode()) {
          console.debug('[PinLock] Session expired due to inactivity');
        }
        return;
      }
    }

    this.lockedSignal.set(this.lockState.isLocked);
    if (this.lockState.isLocked) {
      this.clearUnlockSession();
    }
    if (isDevMode()) {
      console.debug('[PinLock] initialized from storage', { isLocked: this.lockState.isLocked });
    }
  }

  subscribeToLockChanges(callback: (locked: boolean) => void): void {
    this.lockChangeCallback = callback;
  }

  hasPinConfigured(): boolean {
    const s = this.settings.get();
    return !!(s.pinHash && s.pinSalt);
  }

  isAppLocked(): boolean {
    if (!this.hasPinConfigured()) {
      return false;
    }
    return this.lockedSignal();
  }

  unlock(): void {
    this.lockedSignal.set(false);
    this.lockState = {
      isLocked: false,
      unlockedAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString(),
    };
    this.setUnlockSession();
    this.persistLockState();
    if (isDevMode()) {
      console.debug('[PinLock] unlocked');
    }
  }

  lock(): void {
    if (!this.hasPinConfigured()) {
      return;
    }
    this.lockedSignal.set(true);
    this.lockState = {
      ...this.lockState,
      isLocked: true,
    };
    this.clearUnlockSession();
    this.persistLockState();
    if (isDevMode()) {
      console.debug('[PinLock] locked');
    }

    const currentUrl = this.router.url;
    if (!currentUrl.startsWith('/pin/')) {
      persistReturnUrl(currentUrl);
      void this.router.navigate(['/pin/unlock']);
    }
    this.lockChangeCallback?.(true);
  }

  touchActivity(): void {
    if (!this.hasPinConfigured() || this.lockedSignal()) {
      return;
    }
    this.lockState.lastActivityAt = new Date().toISOString();
    this.persistLockState();
  }

  checkInactivity(): void {
    if (!this.hasPinConfigured() || this.lockedSignal()) {
      return;
    }
    const timeoutMs = this.settings.get().lockTimeoutMinutes * 60 * 1000;
    const lastActivity = this.lockState.lastActivityAt
      ? new Date(this.lockState.lastActivityAt).getTime()
      : Date.now();
    if (Date.now() - lastActivity > timeoutMs) {
      this.lock();
    }
  }

  async setupPin(pin: string): Promise<void> {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const hash = await this.hashPin(pin, salt);
    this.settings.update({
      pinHash: this.toBase64(hash),
      pinSalt: this.toBase64(salt),
      pinEnabled: true,
    });
    this.unlock();
  }

  async verifyPin(pin: string): Promise<boolean> {
    const s = this.settings.get();
    if (!s.pinHash || !s.pinSalt) {
      return false;
    }
    const salt = this.fromBase64(s.pinSalt);
    const hash = await this.hashPin(pin, salt);
    const stored = this.fromBase64(s.pinHash);
    if (hash.length !== stored.length) {
      return false;
    }
    let match = true;
    for (let i = 0; i < hash.length; i++) {
      if (hash[i] !== stored[i]) {
        match = false;
      }
    }
    if (match) {
      this.unlock();
    }
    return match;
  }

  async changePin(oldPin: string, newPin: string): Promise<boolean> {
    const valid = await this.verifyPin(oldPin);
    if (!valid) {
      return false;
    }
    await this.setupPin(newPin);
    return true;
  }

  private ensureActivityListener(): void {
    if (this.activityListenerAttached) {
      return;
    }
    this.activityListenerAttached = true;
    const handler = () => this.touchActivity();
    document.addEventListener('pointerdown', handler);
    document.addEventListener('keydown', handler);
    setInterval(() => this.checkInactivity(), 30000);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        // Check timeout before refreshing activity so backgrounded tabs still lock.
        this.checkInactivity();
        if (!this.lockedSignal()) {
          this.touchActivity();
        }
      }
    });
  }

  private hasUnlockSession(): boolean {
    try {
      return sessionStorage.getItem(UNLOCK_SESSION_KEY) === '1';
    } catch {
      return false;
    }
  }

  private setUnlockSession(): void {
    try {
      sessionStorage.setItem(UNLOCK_SESSION_KEY, '1');
    } catch {
      /* ignore quota / private mode */
    }
  }

  private clearUnlockSession(): void {
    try {
      sessionStorage.removeItem(UNLOCK_SESSION_KEY);
    } catch {
      /* ignore */
    }
  }

  private loadLockState(): AppLockState {
    try {
      const raw = localStorage.getItem(LOCK_STATE_KEY);
      if (!raw) {
        return { ...DEFAULT_LOCK_STATE };
      }
      return { ...DEFAULT_LOCK_STATE, ...JSON.parse(raw) };
    } catch {
      return { ...DEFAULT_LOCK_STATE };
    }
  }

  private persistLockState(): void {
    localStorage.setItem(LOCK_STATE_KEY, JSON.stringify(this.lockState));
  }

  private async hashPin(pin: string, salt: Uint8Array): Promise<Uint8Array> {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(pin),
      'PBKDF2',
      false,
      ['deriveBits'],
    );
    const derived = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', salt: salt as BufferSource, iterations: 100000, hash: 'SHA-256' },
      keyMaterial,
      256,
    );
    return new Uint8Array(derived);
  }

  private toBase64(bytes: Uint8Array): string {
    return btoa(String.fromCharCode(...bytes));
  }

  private fromBase64(base64: string): Uint8Array {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }
}
