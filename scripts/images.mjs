/**
 * Image tooling (dev only, uses sharp).
 *
 *   node scripts/images.mjs placeholders   # brand-coloured placeholder WebPs for every image the data files reference
 *   node scripts/images.mjs favicons       # favicon.ico / .svg / apple-touch-icon / icon-512 from public/favicon.svg
 *   node scripts/images.mjs convert        # assets-src/<same path>.{jpg,jpeg,png} → public/images/<path>.webp, resized
 *
 * The manifest below is the single list of every image the site expects, with target sizes.
 * Gallery and service entries are read from the data files so they never drift.
 */
import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const srcDir = path.join(root, 'assets-src');

const { EVENTS } = await import(path.join(root, 'src/app/data/events.data.ts'));
const { GALLERY } = await import(path.join(root, 'src/app/data/gallery.data.ts'));
const { siteConfig } = await import(path.join(root, 'src/app/config/site.config.ts'));

// Brand colours — keep in sync with src/styles/tokens.css when rebranding.
const C = { primary: '#8b1a1a', accent: '#e9a825', secondary: '#106b6b', bg: '#f4e7d2', ink: '#2b1d14' };

/** @type {{ file: string; width: number; height: number; label: string; format?: 'webp' | 'jpeg' }[]} */
const manifest = [
  { file: 'images/hero/hero-decor.webp', width: 1200, height: 900, label: 'Hero — wedding décor' },
  { file: 'images/about/workshop.webp', width: 1000, height: 750, label: 'About — workshop' },
  { file: siteConfig.defaultOgImage, width: 1200, height: 630, label: siteConfig.name, format: 'jpeg' },
  ...EVENTS.map((s) => ({ file: s.image, width: 800, height: 600, label: s.title })),
  ...GALLERY.map((g) => ({ file: g.src, width: g.width, height: g.height, label: g.alt })),
];

const PALETTES = [
  [C.primary, '#651111'],
  [C.secondary, '#0b4d4d'],
  [C.accent, '#b8790a'],
  ['#5c4a3d', C.ink],
];

function escapeXml(s) {
  return s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]);
}

/** Gradient + kolam-ish rings + label. Deliberately looks like a placeholder. */
function placeholderSvg({ width, height, label }, i) {
  const [a, b] = PALETTES[i % PALETTES.length];
  const fs = Math.round(Math.min(width, height) / 16);
  const small = Math.round(fs * 0.55);
  const rings = [0.12, 0.2, 0.28].map((r) => `<circle cx="${width * 0.82}" cy="${height * 0.22}" r="${Math.min(width, height) * r}" fill="none" stroke="${C.bg}" stroke-opacity="0.18" stroke-width="2"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
  <rect width="${width}" height="${height}" fill="url(#g)"/>${rings}
  <rect x="${width * 0.06}" y="${height * 0.06}" width="${width * 0.88}" height="${height * 0.88}" fill="none" stroke="${C.accent}" stroke-opacity="0.5" stroke-width="2" rx="${fs}"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Helvetica, Arial, sans-serif" font-size="${fs}" font-weight="700" fill="${C.bg}">${escapeXml(label)}</text>
  <text x="50%" y="${height * 0.5 + fs * 1.4}" text-anchor="middle" dominant-baseline="middle" font-family="Helvetica, Arial, sans-serif" font-size="${small}" fill="${C.accent}">PLACEHOLDER · ${width}×${height} · replace via assets-src/</text>
</svg>`;
}

async function writeImage(buffer, entry) {
  const out = path.join(publicDir, entry.file);
  await mkdir(path.dirname(out), { recursive: true });
  const img = sharp(buffer).resize(entry.width, entry.height, { fit: 'cover' });
  const format = entry.format ?? (entry.file.endsWith('.jpg') ? 'jpeg' : 'webp');
  const data = format === 'jpeg' ? await img.jpeg({ quality: 78, mozjpeg: true }).toBuffer() : await img.webp({ quality: 78 }).toBuffer();
  await writeFile(out, data);
  return data.length;
}

async function placeholders() {
  let total = 0;
  for (const [i, entry] of manifest.entries()) {
    const bytes = await writeImage(Buffer.from(placeholderSvg(entry, i)), entry);
    total += bytes;
    console.log(`[images] ${entry.file}  ${entry.width}×${entry.height}  ${(bytes / 1024).toFixed(1)} kB`);
  }
  console.log(`[images] ${manifest.length} placeholders, ${(total / 1024).toFixed(0)} kB total`);
}

async function convert() {
  let converted = 0;
  for (const entry of manifest) {
    const base = entry.file.replace(/\.(webp|jpg)$/, '');
    const candidates = ['jpg', 'jpeg', 'png', 'webp'].map((ext) => path.join(srcDir, `${base}.${ext}`));
    let source = null;
    for (const c of candidates) {
      try {
        await stat(c);
        source = c;
        break;
      } catch {
        /* try next */
      }
    }
    if (!source) continue;
    const bytes = await writeImage(await readFile(source), entry);
    converted++;
    console.log(`[images] ${path.relative(root, source)} → ${entry.file}  ${(bytes / 1024).toFixed(1)} kB`);
  }
  if (!converted) {
    console.log(`[images] nothing to convert. Put source images under assets-src/ mirroring public/, e.g.\n  assets-src/${manifest[0].file.replace(/\.webp$/, '.jpg')}`);
  }
}

async function favicons() {
  const svg = await readFile(path.join(publicDir, 'favicon.svg'));
  const png = (size) => sharp(svg, { density: 384 }).resize(size, size).png().toBuffer();
  const [ico32, ico48, apple, big] = await Promise.all([png(32), png(48), png(180), png(512)]);
  await writeFile(path.join(publicDir, 'apple-touch-icon.png'), apple);
  await writeFile(path.join(publicDir, 'icon-512.png'), big);
  await writeFile(path.join(publicDir, 'favicon.ico'), icoFromPngs([ico32, ico48]));
  console.log('[favicons] wrote favicon.ico (32+48), apple-touch-icon.png (180), icon-512.png');
}

/** ICO container with PNG-compressed entries (supported by every modern browser). */
function icoFromPngs(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const dir = [];
  let offset = 6 + 16 * pngs.length;
  for (const p of pngs) {
    const size = p.readUInt32BE(16);
    const e = Buffer.alloc(16);
    e[0] = size >= 256 ? 0 : size;
    e[1] = size >= 256 ? 0 : size;
    e[2] = 0;
    e[3] = 0;
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(p.length, 8);
    e.writeUInt32LE(offset, 12);
    dir.push(e);
    offset += p.length;
  }
  return Buffer.concat([header, ...dir, ...pngs]);
}

const mode = process.argv[2];
if (mode === 'placeholders') await placeholders();
else if (mode === 'convert') await convert();
else if (mode === 'favicons') await favicons();
else {
  console.error('usage: node scripts/images.mjs <placeholders|favicons|convert>');
  process.exit(1);
}
void readdir; // (kept for future directory walking)
