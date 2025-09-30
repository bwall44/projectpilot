import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Resize original images located in `src/content/catPhotos`
// Writes smaller versions to `src/content/catPhotos/small`.
// Usage: `npm run resize-images`
// Note: this script uses `sharp` and is intended to be run locally
// during development. The resulting files are checked in and used
// by the Carousel to reduce bundle size.

const srcDir = path.resolve('src/content/squirrels');
const outDir = path.resolve('src/content/squirrels/small');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Only process common raster formats (png/jpeg/webp)
const files = fs.readdirSync(srcDir).filter(f => /\.(png|jpe?g|webp)$/i.test(f));

Promise.all(files.map(async (file) => {
  const inPath = path.join(srcDir, file);
  const outPath = path.join(outDir, file);
  try {
    // resize to a maximum width and compress to keep file sizes reasonable
    await sharp(inPath).resize({ width: 1200 }).png({ quality: 80 }).toFile(outPath);
    console.log('wrote', outPath);
  } catch (err) {
    console.error('failed', file, err);
  }
})).then(() => console.log('done'));
