import type { Lang } from './ui';
import {
  aboutPath,
  contactPath,
  cvPath,
  experienceIndexPath,
  experiencePath,
  casePath,
  homePath,
  pathFromLegacy,
  profilePath,
  profilesIndexPath,
  projectPath,
  projectsIndexPath,
  sentPath,
  swapLangPath,
} from './routes';

export const langs = ['es', 'en'] as const satisfies readonly Lang[];

export function isLang(value: string | undefined): value is Lang {
  return value === 'es' || value === 'en';
}

export function staticLangs() {
  return langs.map((lang) => ({ params: { lang } }));
}

/** @deprecated Prefer route helpers from ./routes.ts */
export function localePath(lang: Lang, path = '/'): string {
  return pathFromLegacy(lang, path);
}

export function swapLang(pathname: string, target: Lang): string {
  return swapLangPath(pathname, target);
}

export {
  aboutPath,
  casePath,
  contactPath,
  cvPath,
  experienceIndexPath,
  experiencePath,
  homePath,
  profilePath,
  profilesIndexPath,
  projectPath,
  projectsIndexPath,
  sentPath,
};
