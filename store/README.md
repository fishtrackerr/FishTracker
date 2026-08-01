# Play Store assets

Assets and copy for the Google Play listing. Generate graphics with:

```bash
npm run store-assets
```

(Requires PWA screenshots first: `npm run icons`.)

## Required for listing

| Asset | Spec | Location |
|-------|------|----------|
| App icon | 512×512 PNG | [`graphics/icon-512x512.png`](./graphics/icon-512x512.png) |
| Feature graphic | 1024×500 PNG | [`graphics/feature-graphic-1024x500.png`](./graphics/feature-graphic-1024x500.png) |
| Phone screenshots | ≥2, 16:9 or 9:16 (min 320px, max 3840px) | [`screenshots/phone/`](./screenshots/phone/) |

Optional later: 7" and 10" tablet screenshots.

## Listing text

- English draft: [`listing-en.md`](./listing-en.md)
- Full Play Console guidance: [`docs/google-play.md`](../docs/google-play.md)

## Notes

- Phone screenshots currently reuse branded PWA install panels from `public/screenshots/`. Replace with real device captures before production if you want authentic UI shots.
- Do not commit keystores; only listing graphics belong here.
