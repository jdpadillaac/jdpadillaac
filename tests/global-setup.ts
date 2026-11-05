import { copyFile } from 'node:fs/promises';

const source = new URL('../node_modules/.astro/data-store.json', import.meta.url);
const target = new URL('../.astro/data-store.json', import.meta.url);

export async function setup() {
  await copyFile(source, target);
}
