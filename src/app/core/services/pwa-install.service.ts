import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Chromium deferred install prompt (not in standard lib.dom typings). */
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

@Injectable({ providedIn: 'root' })
export class PwaInstallService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly deferredPrompt = signal<BeforeInstallPromptEvent | null>(null);
  private readonly installed = signal(false);
  private readonly iosDevice = signal(false);
  private readonly standalone = signal(false);

  /** True when Chromium can show the native install prompt. */
  readonly canInstall = computed(() => this.deferredPrompt() !== null && !this.installed());

  /** True on iOS Safari when the app is not already on the home screen. */
  readonly showIosHint = computed(() => this.iosDevice() && !this.standalone() && !this.installed());

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.standalone.set(this.detectStandalone());
    this.iosDevice.set(this.detectIos());

    window.addEventListener('beforeinstallprompt', (event: Event) => {
      event.preventDefault();
      this.deferredPrompt.set(event as BeforeInstallPromptEvent);
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt.set(null);
      this.installed.set(true);
      this.standalone.set(true);
    });
  }

  async promptInstall(): Promise<'accepted' | 'dismissed' | 'unavailable'> {
    const promptEvent = this.deferredPrompt();
    if (!promptEvent) {
      return 'unavailable';
    }

    this.deferredPrompt.set(null);
    await promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    if (outcome === 'accepted') {
      this.installed.set(true);
    }
    return outcome;
  }

  private detectStandalone(): boolean {
    const nav = window.navigator as Navigator & { standalone?: boolean };
    return window.matchMedia('(display-mode: standalone)').matches || nav.standalone === true;
  }

  private detectIos(): boolean {
    const ua = window.navigator.userAgent;
    const iOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    return iOS;
  }
}
