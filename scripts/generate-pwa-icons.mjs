import sharp from 'sharp';
import toIco from 'to-ico';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const svgPath = 'public/icons/fishtracker-logo.svg';
const iconsDir = 'public/icons';
const screenshotsDir = 'public/screenshots';
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const maskableSizes = [192, 512];
/** Safe zone: logo occupies ~60% of canvas (≈20% padding each side). */
const MASKABLE_CONTENT_RATIO = 0.6;
/** Matches logo gradient start and OS splash background_color. */
const SPLASH_BG = '#0b0f14';
const ACCENT = '#ff6b00';
const ACCENT_SOFT = '#ff9f43';
const TEXT = '#fff6e8';
const MUTED = '#9aa7b5';

const svg = readFileSync(svgPath);
mkdirSync(screenshotsDir, { recursive: true });

for (const size of sizes) {
  const out = join(iconsDir, `icon-${size}x${size}.png`);
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(out);
  console.log('wrote', out);
}

for (const size of maskableSizes) {
  const contentSize = Math.round(size * MASKABLE_CONTENT_RATIO);
  const logo = await sharp(svg, { density: 384 }).resize(contentSize, contentSize).png().toBuffer();
  const out = join(iconsDir, `icon-maskable-${size}x${size}.png`);
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: SPLASH_BG,
    },
  })
    .composite([{ input: logo, gravity: 'centre' }])
    .png()
    .toFile(out);
  console.log('wrote', out);
}

const appleTouch = join(iconsDir, 'apple-touch-icon.png');
await sharp(svg, { density: 384 }).resize(180, 180).png().toFile(appleTouch);
console.log('wrote', appleTouch);

const fav16 = await sharp(svg, { density: 384 }).resize(16, 16).png().toBuffer();
const fav32 = await sharp(svg, { density: 384 }).resize(32, 32).png().toBuffer();
const fav48 = await sharp(svg, { density: 384 }).resize(48, 48).png().toBuffer();
writeFileSync('public/favicon.ico', await toIco([fav16, fav32, fav48]));
console.log('wrote public/favicon.ico');

/**
 * Branded install-sheet screenshots (Chrome Android / desktop).
 * SVG panels are rasterized so we don't need external fonts beyond SVG defaults.
 */
async function writeScreenshot({ filename, width, height, title, subtitle, logoSize }) {
  const logo = await sharp(svg, { density: 384 }).resize(logoSize, logoSize).png().toBuffer();
  const panel = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${SPLASH_BG}"/>
      <stop offset="100%" stop-color="#142230"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${ACCENT_SOFT}"/>
      <stop offset="100%" stop-color="${ACCENT}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect x="${Math.round(width * 0.08)}" y="${Math.round(height * 0.72)}" width="${Math.round(width * 0.2)}" height="6" rx="3" fill="url(#accent)"/>
  <text x="${Math.round(width * 0.08)}" y="${Math.round(height * 0.82)}" fill="${TEXT}" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="${Math.round(width * 0.055)}" font-weight="700">${title}</text>
  <text x="${Math.round(width * 0.08)}" y="${Math.round(height * 0.88)}" fill="${MUTED}" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="${Math.round(width * 0.028)}">${subtitle}</text>
</svg>`);

  const out = join(screenshotsDir, filename);
  await sharp(panel)
    .composite([
      {
        input: logo,
        top: Math.round(height * 0.18),
        left: Math.round((width - logoSize) / 2),
      },
    ])
    .png()
    .toFile(out);
  console.log('wrote', out);
}

await writeScreenshot({
  filename: 'narrow-sessions.png',
  width: 1080,
  height: 1920,
  title: 'Track sessions',
  subtitle: 'Start a trip and log every cast offline.',
  logoSize: 420,
});

await writeScreenshot({
  filename: 'narrow-catches.png',
  width: 1080,
  height: 1920,
  title: 'Log catches',
  subtitle: 'Species, size, photos, and weather in one place.',
  logoSize: 420,
});

await writeScreenshot({
  filename: 'narrow-lakes.png',
  width: 1080,
  height: 1920,
  title: 'Know your waters',
  subtitle: 'Lakes, maps, and spots you return to.',
  logoSize: 420,
});

await writeScreenshot({
  filename: 'wide-overview.png',
  width: 1920,
  height: 1080,
  title: 'FishTracker',
  subtitle: 'Offline-first fishing register for sessions, catches, and lakes.',
  logoSize: 360,
});
