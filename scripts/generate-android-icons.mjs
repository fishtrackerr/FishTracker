import sharp from 'sharp';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * Writes FishTracker launcher icons into the Capacitor Android project.
 * PWA icons alone do not update the home-screen icon on installed APKs.
 */
const svgPath = 'public/icons/fishtracker-logo.svg';
const androidRes = 'android/app/src/main/res';
const SPLASH_BG = '#0b0f14';

/** Legacy launcher sizes (px). */
const LAUNCHER = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192,
};

/** Adaptive foreground sizes (108dp @ density). */
const FOREGROUND = {
  'mipmap-mdpi': 108,
  'mipmap-hdpi': 162,
  'mipmap-xhdpi': 216,
  'mipmap-xxhdpi': 324,
  'mipmap-xxxhdpi': 432,
};

/** Logo occupies ~66% of adaptive canvas (safe zone). */
const FOREGROUND_CONTENT_RATIO = 0.66;

if (!existsSync(androidRes)) {
  console.warn('skip android icons: missing', androidRes);
  process.exit(0);
}

const svg = readFileSync(svgPath);

async function circularIcon(size) {
  const logo = await sharp(svg, { density: 384 }).resize(size, size).png().toBuffer();
  const radius = size / 2;
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <circle cx="${radius}" cy="${radius}" r="${radius}" fill="#fff"/>
    </svg>`,
  );
  return sharp(logo)
    .composite([{ input: await sharp(mask).png().toBuffer(), blend: 'dest-in' }])
    .png()
    .toBuffer();
}

async function adaptiveForeground(size) {
  const contentSize = Math.round(size * FOREGROUND_CONTENT_RATIO);
  const logo = await sharp(svg, { density: 384 }).resize(contentSize, contentSize).png().toBuffer();
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: logo, gravity: 'centre' }])
    .png()
    .toBuffer();
}

for (const [folder, size] of Object.entries(LAUNCHER)) {
  const dir = join(androidRes, folder);
  mkdirSync(dir, { recursive: true });

  const square = join(dir, 'ic_launcher.png');
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(square);
  console.log('wrote', square);

  const round = join(dir, 'ic_launcher_round.png');
  writeFileSync(round, await circularIcon(size));
  console.log('wrote', round);
}

for (const [folder, size] of Object.entries(FOREGROUND)) {
  const dir = join(androidRes, folder);
  mkdirSync(dir, { recursive: true });
  const foreground = join(dir, 'ic_launcher_foreground.png');
  writeFileSync(foreground, await adaptiveForeground(size));
  console.log('wrote', foreground);
}

const bgValues = join(androidRes, 'values', 'ic_launcher_background.xml');
writeFileSync(
  bgValues,
  `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">${SPLASH_BG}</color>
</resources>
`,
);
console.log('wrote', bgValues);
