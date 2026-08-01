import sharp from 'sharp';
import { mkdirSync, readFileSync, copyFileSync, existsSync } from 'fs';
import { join } from 'path';

const svgPath = 'public/icons/fishtracker-logo.svg';
const screenshotsSrc = 'public/screenshots';
const storeDir = 'store';
const graphicsDir = join(storeDir, 'graphics');
const phoneDir = join(storeDir, 'screenshots', 'phone');

const SPLASH_BG = '#0b0f14';
const ACCENT = '#ff6b00';
const ACCENT_SOFT = '#ff9f43';
const TEXT = '#fff6e8';
const MUTED = '#9aa7b5';

mkdirSync(graphicsDir, { recursive: true });
mkdirSync(phoneDir, { recursive: true });

const svg = readFileSync(svgPath);

// Feature graphic 1024×500 (Play Console required)
const featureWidth = 1024;
const featureHeight = 500;
const logoSize = 220;
const logo = await sharp(svg, { density: 384 }).resize(logoSize, logoSize).png().toBuffer();

const featureSvg = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${featureWidth}" height="${featureHeight}" viewBox="0 0 ${featureWidth} ${featureHeight}">
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
  <rect width="${featureWidth}" height="${featureHeight}" fill="url(#bg)"/>
  <rect x="56" y="400" width="160" height="8" rx="4" fill="url(#accent)"/>
  <text x="56" y="280" fill="${TEXT}" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="64" font-weight="700">Fish Tracker</text>
  <text x="56" y="340" fill="${MUTED}" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="28">Offline fishing logbook</text>
</svg>`);

const featureOut = join(graphicsDir, 'feature-graphic-1024x500.png');
await sharp(featureSvg)
  .composite([{ input: logo, left: featureWidth - logoSize - 72, top: Math.round((featureHeight - logoSize) / 2) }])
  .png()
  .toFile(featureOut);
console.log('wrote', featureOut);

// High-res icon for Play (512)
const iconOut = join(graphicsDir, 'icon-512x512.png');
await sharp(svg, { density: 384 }).resize(512, 512).png().toFile(iconOut);
console.log('wrote', iconOut);

const phoneShots = [
  'narrow-sessions.png',
  'narrow-catches.png',
  'narrow-lakes.png',
];

for (const name of phoneShots) {
  const src = join(screenshotsSrc, name);
  if (!existsSync(src)) {
    console.warn('missing screenshot source:', src);
    continue;
  }
  const dest = join(phoneDir, name);
  copyFileSync(src, dest);
  console.log('copied', dest);
}
