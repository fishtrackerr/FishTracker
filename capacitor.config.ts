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
};

export default config;
