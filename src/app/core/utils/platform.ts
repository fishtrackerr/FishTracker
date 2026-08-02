import { Capacitor } from '@capacitor/core';

/** True inside a Capacitor Android/iOS WebView (not browser PWA). */
export function isNativeApp(): boolean {
  try {
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
}
