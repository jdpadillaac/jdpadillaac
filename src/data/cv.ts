import { existsSync } from 'node:fs';
import { join } from 'node:path';

const files = {
  es: 'jonatan-padilla-es.pdf',
  en: 'jonatan-padilla-en.pdf',
} as const;

export function cvHref(lang: keyof typeof files): string {
  return `/cv/${files[lang]}`;
}

export function cvAvailable(lang: keyof typeof files): boolean {
  return existsSync(join(process.cwd(), 'public', 'cv', files[lang]));
}
