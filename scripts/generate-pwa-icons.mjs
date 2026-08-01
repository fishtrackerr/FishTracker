import sharp from 'sharp';
import toIco from 'to-ico';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const svgPath = 'public/icons/fishtracker-logo.svg';
const iconsDir = 'public/icons';
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const svg = readFileSync(svgPath);

for (const size of sizes) {
  const out = join(iconsDir, `icon-${size}x${size}.png`);
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(out);
  console.log('wrote', out);
}

const fav16 = await sharp(svg, { density: 384 }).resize(16, 16).png().toBuffer();
const fav32 = await sharp(svg, { density: 384 }).resize(32, 32).png().toBuffer();
const fav48 = await sharp(svg, { density: 384 }).resize(48, 48).png().toBuffer();
writeFileSync('public/favicon.ico', await toIco([fav16, fav32, fav48]));
console.log('wrote public/favicon.ico');
