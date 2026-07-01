import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = path.resolve(process.cwd());
const brandDir = path.join(projectRoot, 'assets/brand');
const assetsDir = path.join(projectRoot, 'assets');
const outWebDir = path.join(projectRoot, 'assets/web-icons');
const outAndroidDir = path.join(projectRoot, 'assets/android');

await fs.promises.mkdir(outWebDir, { recursive: true });
await fs.promises.mkdir(outAndroidDir, { recursive: true });

// ── App icon (with gradient background, opaque) ──
console.log('Generating icon.png...');
await sharp(path.join(brandDir, 'icon.svg'), { density: 144 })
  .resize(1024, 1024)
  .flatten({ background: '#ffffff' })
  .png()
  .toFile(path.join(assetsDir, 'icon.png'));

// ── Android adaptive icon foreground (no background, transparent) ──
console.log('Generating adaptive-icon.png...');
await sharp(path.join(brandDir, 'icon-no-bg.svg'), { density: 144 })
  .resize(1024, 1024)
  .png()
  .toFile(path.join(assetsDir, 'adaptive-icon.png'));

// ── Splash icon (centered icon on white, opaque) ──
console.log('Generating splash-icon.png...');
await sharp(path.join(brandDir, 'icon-no-bg.svg'), { density: 144 })
  .resize(1024, 1024)
  .flatten({ background: '#ffffff' })
  .png()
  .toFile(path.join(assetsDir, 'splash-icon.png'));

// ── Web icons ──
const webSizes = [16, 32, 48, 64, 96, 120, 144, 152, 167, 180, 192, 256, 512];

console.log('Generating web icons...');
for (const size of webSizes) {
  const file = path.join(outWebDir, `icon-${size}.png`);
  await sharp(path.join(brandDir, 'icon.svg'), { density: 144 })
    .resize(size, size)
    .png()
    .toFile(file);
}

// Apple touch icons
console.log('Generating Apple touch icons...');
const appleSizes = [152, 167, 180];
for (const size of appleSizes) {
  const file = path.join(outWebDir, `apple-touch-icon-${size}x${size}.png`);
  await sharp(path.join(brandDir, 'icon.svg'), { density: 144 })
    .resize(size, size)
    .png()
    .toFile(file);
}

// ── Android Play Store assets ──
console.log('Generating Android Play Store assets...');
await sharp(path.join(brandDir, 'icon-no-bg.svg'), { density: 144 })
  .resize(512, 512)
  .flatten({ background: '#ffffff' })
  .png({ quality: 95 })
  .toFile(path.join(outAndroidDir, 'store-icon-512.png'));

const featureGraphicBg = {
  create: {
    width: 1024,
    height: 500,
    channels: 3,
    background: { r: 34, g: 197, b: 94 },
  },
};
const iconBuffer = await sharp(path.join(brandDir, 'icon-no-bg.svg'), { density: 144 })
  .resize(420, 420)
  .png()
  .toBuffer();
await sharp(featureGraphicBg)
  .composite([{ input: iconBuffer, top: 40, left: 50 }])
  .png({ quality: 95 })
  .toFile(path.join(outAndroidDir, 'feature-graphic-1024x500.png'));

console.log('Done.');
