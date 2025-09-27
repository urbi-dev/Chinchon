import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = path.resolve(process.cwd());
const srcIcon = path.join(projectRoot, 'assets/brand/icon.svg');
const outWebDir = path.join(projectRoot, 'assets/web-icons');
const outAndroidDir = path.join(projectRoot, 'assets/android');

await fs.promises.mkdir(outWebDir, { recursive: true });
await fs.promises.mkdir(outAndroidDir, { recursive: true });

const webSizes = [16, 32, 48, 64, 96, 120, 144, 152, 167, 180, 192, 256, 512];

console.log('Generating web icons...');
for (const size of webSizes) {
  const file = path.join(outWebDir, `icon-${size}.png`);
  await sharp(srcIcon)
    .resize(size, size)
    .png({ quality: 90 })
    .toFile(file);
  console.log('  ✓', path.relative(projectRoot, file));
}

// Apple touch icons adicionales
console.log('Generating Apple touch icons...');
const appleSizes = [152, 167, 180];
for (const size of appleSizes) {
  const file = path.join(outWebDir, `apple-touch-icon-${size}x${size}.png`);
  await sharp(srcIcon)
    .resize(size, size)
    .png({ quality: 90 })
    .toFile(file);
  console.log('  ✓', path.relative(projectRoot, file));
}

console.log('Generating Android Play Store assets...');
await sharp(srcIcon).resize(512, 512).png({ quality: 95 }).toFile(path.join(outAndroidDir, 'store-icon-512.png'));

// Feature graphic: 1024x500 (use background gradient fill)
const featureGraphicBg = {
  create: {
    width: 1024,
    height: 500,
    channels: 3,
    background: { r: 34, g: 197, b: 94 },
  },
};
const iconBuffer = await sharp(srcIcon).resize(420, 420).png().toBuffer();
await sharp(featureGraphicBg)
  .composite([{ input: iconBuffer, top: 40, left: 50 }])
  .png({ quality: 95 })
  .toFile(path.join(outAndroidDir, 'feature-graphic-1024x500.png'));

console.log('Done.');


