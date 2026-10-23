import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fishtrackerr.fishtracker',
  appName: 'Fish Tracker',
  webDir: 'dist/FishTracker/browser',
  android: {
    allowMixedContent: false,
  },
  server: {
    androidScheme: 'https',
  },
  plugins: {
    // Capacitor 8 edge-to-edge: index.html uses viewport-fit=cover and pads with
    // env(safe-area-inset-*); the hint avoids a layout jump while it is detected.
    SystemBars: {
      initialViewportFitValueHint: 'cover',
    },
  },
};

export default config;
