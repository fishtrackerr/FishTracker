/** True inside a Capacitor Android/iOS WebView (not browser / PWA). */
export function isNativeApp(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    // Prefer the bridge Capacitor injects on window — avoids import-order issues at boot.
    const cap = (
      window as unknown as {
        Capacitor?: { isNativePlatform?: () => boolean };
      }
    ).Capacitor;
    if (typeof cap?.isNativePlatform === 'function') {
      return cap.isNativePlatform();
    }
  } catch {
    // fall through
  }
  return false;
}
