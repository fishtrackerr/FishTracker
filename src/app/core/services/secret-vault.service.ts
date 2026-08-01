import { Injectable, inject, signal } from '@angular/core';
import { SettingsService } from './settings.service';

const AI_SESSION_KEY = 'fish-tracker-ai-session';

/**
 * Holds the AI API key in memory while unlocked and persists only ciphertext
 * (AES-GCM wrapped with a PIN-derived key) in settings/localStorage.
 * A tab-scoped sessionStorage copy restores the key after in-tab refresh
 * while the unlock session is still valid; cleared on lock.
 */
@Injectable({ providedIn: 'root' })
export class SecretVaultService {
  private readonly settings = inject(SettingsService);

  private wrapKey: CryptoKey | undefined;
  private readonly memoryAiKey = signal<string | undefined>(undefined);

  readonly aiApiKey = this.memoryAiKey.asReadonly();

  getAiApiKey(): string | undefined {
    return this.memoryAiKey();
  }

  isUnlocked(): boolean {
    return !!this.wrapKey || !!this.memoryAiKey();
  }

  /**
   * Restore plaintext AI key from tab session after refresh (unlock session still valid).
   * Does not restore the PIN wrap key — setAiApiKey will re-encrypt only after PIN unlock.
   */
  restoreFromSession(): void {
    try {
      const raw = sessionStorage.getItem(AI_SESSION_KEY);
      this.memoryAiKey.set(raw?.trim() || undefined);
    } catch {
      this.memoryAiKey.set(undefined);
    }
  }

  /**
   * Derive wrapping key from the verified PIN and load/migrate the AI key into memory.
   * Call only after successful PIN verification or setup.
   */
  async unlockWithPin(pin: string): Promise<void> {
    const s = this.settings.get();
    let saltB64 = s.aiKeySalt;
    if (!saltB64) {
      const salt = crypto.getRandomValues(new Uint8Array(16));
      saltB64 = this.toBase64(salt);
      this.settings.update({ aiKeySalt: saltB64 });
    }
    const salt = this.fromBase64(saltB64);
    this.wrapKey = await this.deriveWrapKey(pin, salt);

    const legacyPlain = s.aiApiKey?.trim();
    if (legacyPlain) {
      await this.persistEncrypted(legacyPlain);
      this.setMemory(legacyPlain);
      return;
    }

    if (s.aiApiKeyEncrypted && s.aiApiKeyIv) {
      try {
        const plain = await this.decrypt(s.aiApiKeyEncrypted, s.aiApiKeyIv);
        this.setMemory(plain || undefined);
      } catch {
        this.setMemory(undefined);
      }
      return;
    }

    // Prefer session copy if ciphertext missing (e.g. mid-migration).
    this.restoreFromSession();
  }

  /** Clear in-memory secrets (call on lock). Does not wipe ciphertext. */
  lock(): void {
    this.wrapKey = undefined;
    this.setMemory(undefined);
  }

  async setAiApiKey(value: string | undefined): Promise<void> {
    const trimmed = value?.trim() || undefined;
    this.setMemory(trimmed);
    if (!trimmed) {
      this.settings.update({
        aiApiKey: undefined,
        aiApiKeyEncrypted: undefined,
        aiApiKeyIv: undefined,
      });
      return;
    }
    if (!this.wrapKey) {
      // Unlocked via session restore without PIN wrap key — keep ephemeral until next PIN unlock.
      return;
    }
    await this.persistEncrypted(trimmed);
  }

  async clearAiApiKey(): Promise<void> {
    await this.setAiApiKey(undefined);
  }

  /**
   * Re-wrap ciphertext after a PIN change using the new PIN.
   * Requires the vault to still hold the plaintext in memory (post-verify).
   */
  async rewrapWithPin(newPin: string): Promise<void> {
    const plain = this.memoryAiKey();
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const saltB64 = this.toBase64(salt);
    this.wrapKey = await this.deriveWrapKey(newPin, salt);
    this.settings.update({ aiKeySalt: saltB64 });
    if (plain) {
      await this.persistEncrypted(plain);
    } else {
      this.settings.update({
        aiApiKey: undefined,
        aiApiKeyEncrypted: undefined,
        aiApiKeyIv: undefined,
      });
    }
  }

  private setMemory(value: string | undefined): void {
    this.memoryAiKey.set(value);
    try {
      if (value) {
        sessionStorage.setItem(AI_SESSION_KEY, value);
      } else {
        sessionStorage.removeItem(AI_SESSION_KEY);
      }
    } catch {
      /* ignore quota / private mode */
    }
  }

  private async persistEncrypted(plaintext: string): Promise<void> {
    if (!this.wrapKey) {
      return;
    }
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(plaintext);
    const cipherBuf = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      this.wrapKey,
      encoded,
    );
    this.settings.update({
      aiApiKey: undefined,
      aiApiKeyEncrypted: this.toBase64(new Uint8Array(cipherBuf)),
      aiApiKeyIv: this.toBase64(iv),
    });
  }

  private async decrypt(cipherB64: string, ivB64: string): Promise<string> {
    if (!this.wrapKey) {
      throw new Error('Vault locked');
    }
    const cipher = this.fromBase64(cipherB64);
    const iv = this.fromBase64(ivB64);
    const plainBuf = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv as BufferSource },
      this.wrapKey,
      cipher as BufferSource,
    );
    return new TextDecoder().decode(plainBuf);
  }

  private async deriveWrapKey(pin: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(pin),
      'PBKDF2',
      false,
      ['deriveKey'],
    );
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt as BufferSource,
        iterations: 100_000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt'],
    );
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
