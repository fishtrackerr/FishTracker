# Google Play — remaining TODO (later)

You can keep shipping the **web/PWA the old way**. Android Studio / Play Console are not required for that.

## Still works now

```bash
npm run deploy
```

That bump/tag/`ng deploy` → GitHub Pages flow is unchanged. Capacitor files under `android/` do not affect Pages.

Also fine anytime:

- `npm start` / `npm test` / `npm run build-prod`
- `npm run build-android` (web build + `cap sync` only — no SDK needed)

## Done already (repo prep)

- [x] Capacitor + `android/` project (`com.fishtrackerr.fishtracker`)
- [x] Angular `android` build config (`baseHref: /`)
- [x] Scripts: `build-android`, `cap:sync`, `cap:open`, `store-assets`
- [x] Version mapping from `package.json` → Android `versionName` / `versionCode`
- [x] Release signing wiring + `android/keystore.properties.example` (gitignored secrets)
- [x] Manifest permissions (location, camera, images, internet)
- [x] Docs: [google-play.md](./google-play.md), store listing draft under [`store/`](../store/)
- [x] JDK 21 installed and `JAVA_HOME` set on this machine

## Left to do (when you resume Play)

### 1. Android SDK / Studio

- [ ] Install [Android Studio](https://developer.android.com/studio) (includes Android SDK)
- [ ] Open `FishTracker/android` once and let SDK / Platform **36** + Build-Tools download
- [ ] Ensure `android/local.properties` exists with `sdk.dir=...` (auto-created by Studio; gitignored)
- [ ] Optional: set user env `ANDROID_HOME` to `C:\Users\erwin\AppData\Local\Android\Sdk`

### 2. Upload signing key

- [ ] Create upload keystore once (keep a backup offline):

```powershell
cd C:\repos\prive\FishTracker\FishTracker\android
keytool -genkey -v -keystore upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```

- [ ] Copy `keystore.properties.example` → `keystore.properties` and fill passwords
- [ ] Never commit `*.jks` / `keystore.properties`

### 3. Build the Play bundle

```powershell
cd C:\repos\prive\FishTracker\FishTracker
npm run build-android
cd android
.\gradlew.bat bundleRelease
```

- [ ] Confirm AAB at `android/app/build/outputs/bundle/release/app-release.aab`

### 4. Google Play Console

- [ ] Create Play Developer account ($25 one-time) + identity verification
- [ ] Create app **Fish Tracker** (free, Android only)
- [ ] Privacy policy URL: https://fishtrackerr.github.io/FishTracker/privacy
- [ ] Fill Data safety / photos / location using [google-play.md](./google-play.md)
- [ ] Upload AAB to **internal testing** first
- [ ] Store listing: copy from [`store/listing-en.md`](../store/listing-en.md), graphics from [`store/graphics/`](../store/graphics/)
- [ ] Content rating, countries, then promote toward production

### 5. Nice-to-haves (optional)

- [ ] Replace branded placeholder phone screenshots with real device captures
- [ ] Add nl/de store listing text
- [ ] Install app icon into Android `mipmap` from `store/graphics/icon-512x512.png` (Studio Image Asset)
- [ ] Fastlane / CI upload automation

## Quick resume checklist

1. Android Studio + SDK  
2. Keystore + `keystore.properties`  
3. `npm run build-android` → `gradlew.bat bundleRelease`  
4. Play Console account + internal test upload  

Full reference: [google-play.md](./google-play.md).
