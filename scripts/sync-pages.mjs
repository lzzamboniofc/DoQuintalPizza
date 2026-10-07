import { cp, readdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const buildDirectory = resolve(projectRoot, 'dist');
const publishedAssetDirectory = resolve(projectRoot, 'assets');
const publishedFiles = [
  'index.html',
  'sobre.html',
  'cardapio.html',
  'contato.html',
  'pizza-artesanal-em-itu.html',
  '404.html',
  'robots.txt',
  'sitemap.xml'
];

await rm(publishedAssetDirectory, { recursive: true, force: true });

for (const file of publishedFiles) {
  await rm(resolve(projectRoot, file), { force: true });
}

const buildEntries = await readdir(buildDirectory, { withFileTypes: true });

for (const entry of buildEntries) {
  await cp(
    resolve(buildDirectory, entry.name),
    resolve(projectRoot, entry.name),
    { recursive: true, force: true }
  );
}

console.log('Build sincronizada na raiz para GitHub Pages (main /root).');
