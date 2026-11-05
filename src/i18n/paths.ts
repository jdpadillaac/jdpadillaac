import type { Lang } from './ui';

export const langs = ['es', 'en'] as const satisfies readonly Lang[];

export function isLang(value: string | undefined): value is Lang {
  return value === 'es' || value === 'en';
}

export function staticLangs() {
  return langs.map((lang) => ({ params: { lang } }));
}

export function localePath(lang: Lang, path = '/'): string {
  const hashIndex = path.indexOf('#');
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : '';
  const pathname = (hashIndex >= 0 ? path.slice(0, hashIndex) : path).replace(/^\/+|\/+$/g, '');
  const base = pathname ? `/${lang}/${pathname}/` : `/${lang}/`;
  return `${base}${hash}`;
}

export function swapLang(pathname: string, target: Lang): string {
  const hashIndex = pathname.indexOf('#');
  const hash = hashIndex >= 0 ? pathname.slice(hashIndex) : '';
  const parts = (hashIndex >= 0 ? pathname.slice(0, hashIndex) : pathname).split('/').filter(Boolean);
  if (parts[0] === 'es' || parts[0] === 'en') parts[0] = target;
  else parts.unshift(target);
  return `/${parts.join('/')}/${hash}`;
}
