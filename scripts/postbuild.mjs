/**
 * Post-build: expose the prerendered 404 page as a root-level 404.html, which
 * Netlify, Vercel and GitHub Pages serve automatically for unknown paths.
 */
import { copyFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const browser = path.join(root, 'dist/decor-site/browser');
const source = path.join(browser, '404/index.html');

await stat(source);
await copyFile(source, path.join(browser, '404.html'));
console.log('[postbuild] wrote dist/decor-site/browser/404.html');
