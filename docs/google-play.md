# Google Play (Android)

FishTracker ships to Google Play as a **Capacitor Android** app that bundles the Angular web build. The GitHub Pages PWA deploy (`npm run deploy`) is unchanged.

## Identity

| Field | Value |
|-------|--------|
| App name | Fish Tracker |
| Application ID | `com.fishtrackerr.fishtracker` |
| Privacy policy URL | https://fishtrackerr.github.io/FishTracker/privacy |
| Category | Sports (secondary: Tools/Utilities) |
| Price | Free |
| Platforms | Android only |

`versionName` is read from root `package.json`. `versionCode` is derived as `major * 10000 + minor * 100 + patch` (e.g. `0.0.27` → `27`). Bump `package.json` before each Play upload so `versionCode` increases.

## Local build (unsigned sync)

```bash
npm run build-android
```

This runs `ng build --configuration android` (`baseHref: /`) and `npx cap sync android`.

Open in Android Studio:

```bash
npm run cap:open
```

## Release signing

1. Create an upload keystore once (keep a backup offline):

```bash
cd android
keytool -genkey -v -keystore upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```

2. Copy [`android/keystore.properties.example`](../android/keystore.properties.example) to `android/keystore.properties` and fill in passwords. Both `keystore.properties` and `*.jks` are gitignored.

3. Build the Play App Bundle:

```bash
cd android
./gradlew bundleRelease
```

On Windows: `.\gradlew.bat bundleRelease`.

Output: `android/app/build/outputs/bundle/release/app-release.aab`.

Without `keystore.properties`, release builds are unsigned (fine for CI sync checks; not for Play upload).

## Target SDK

`compileSdk` / `targetSdk` are **36** (Android 16) in [`android/variables.gradle`](../android/variables.gradle), matching Play’s requirement for new apps and updates from 31 August 2026.

## Permissions (manifest)

Declared in [`android/app/src/main/AndroidManifest.xml`](../android/app/src/main/AndroidManifest.xml):

| Permission | Why |
|------------|-----|
| `INTERNET` | Weather (Open-Meteo), geocoding (Nominatim), optional AI, maps links |
| `ACCESS_COARSE_LOCATION` / `ACCESS_FINE_LOCATION` | Session/catch GPS and weather |
| `CAMERA` | Catch/gallery photo capture via file input |
| `READ_MEDIA_IMAGES` (+ legacy storage ≤ API 32) | Pick photos from the device |

GPS and camera hardware are `required="false"` so the app installs on devices without them.

## Play Console — Data safety (suggested answers)

Use these when filling **App content → Data safety**. Adjust if behavior changes.

**Overview**

- App collects data: **Yes** (on device; some may leave the device when the user opts into online features)
- Data is encrypted in transit: **Yes** (HTTPS for network calls)
- Users can request deletion: **Yes** (delete local data / uninstall; no cloud account)

**Data types**

| Type | Collected | Shared | Purpose | Notes |
|------|-----------|--------|---------|-------|
| Location | Yes | No* | App functionality | Stored locally for sessions/catches; *coordinates may be sent to Open-Meteo / Nominatim when those features run |
| Photos | Yes | No | App functionality | Stored locally in IndexedDB; user may export a backup |
| App activity / other | Optional AI prompts | Yes (to chosen AI provider) | App functionality | Only if user configures an AI key; key stored PIN-wrapped on device |

**Not collected by the app itself:** name, email, account credentials, payment info, contacts, SMS, files beyond user-picked images, device IDs for advertising.

**No ads, no analytics SDK, no accounts / cloud database.**

## Play Console — other declarations

- **Privacy policy:** https://fishtrackerr.github.io/FishTracker/privacy
- **Photos and videos permissions:** Declare camera/photos for catch and gallery logging; not sold; not used for ads.
- **Location permissions:** Approximate and precise location for fishing sessions, catch spots, and weather; not sold; not used for ads.
- **Target audience:** Not designed for children (general audience / 18+ as appropriate for your questionnaire).
- **Content rating:** Complete the IARC questionnaire (typical fishing utility; no violence/gambling expected).

## Store listing assets

See [`store/README.md`](../store/README.md) and [`store/listing-en.md`](../store/listing-en.md). Generate the feature graphic with:

```bash
npm run store-assets
```

## After creating a Play Developer account

1. Pay the one-time registration fee and complete identity verification.
2. Create app **Fish Tracker** (free, Android).
3. Complete App content (privacy, Data safety, photos, location, rating).
4. Upload the signed AAB to an **internal testing** track first.
5. Add store listing graphics and text from `store/`.
6. Promote to closed/open testing, then production.

## Out of scope

- iOS / App Store
- Automated Play upload (Fastlane) — add later if desired
- Changing the GitHub Pages URL
