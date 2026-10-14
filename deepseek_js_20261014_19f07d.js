/**
 * Zero-dependency static build.
 * src/  -> dist/   (+ public/ overlaid, + .nojekyll)
 */
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'src');
const publicDir = path.join(root, 'public');
const outDir = path.join(root, 'dist');

if (!existsSync(path.join(srcDir, 'index.html'))) {
  console.error('✗ src/index.html not found — build aborted.');
  process.exit(1);
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

await cp(srcDir, outDir, { recursive: true });

if (existsSync(publicDir)) {
  await cp(publicDir, outDir, { recursive: true });
}

// Prevent Jekyll from eating files/folders that start with "_"
await writeFile(path.join(outDir, '.nojekyll'), '');

console.log('✓ Build complete → dist/');