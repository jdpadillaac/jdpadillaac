import type { Lang } from './ui';

export const segments = {
  about: { es: 'sobre-mi', en: 'about' },
  experience: { es: 'experiencia', en: 'experience' },
  profiles: { es: 'perfiles', en: 'profiles' },
  contact: { es: 'contacto', en: 'contact' },
  sent: { es: 'enviado', en: 'sent' },
  cases: { es: 'casos', en: 'cases' },
  notes: { es: 'notas', en: 'notes' },
  projects: { es: 'proyectos', en: 'projects' },
  cv: { es: 'cv', en: 'cv' },
} as const;

export type SegmentKey = keyof typeof segments;

type RouteDescriptor =
  | { type: 'home' }
  | { type: 'about' }
  | { type: 'experience-index' }
  | { type: 'experience'; slug: string }
  | { type: 'case'; experienceSlug: string; caseSlug: string }
  | { type: 'profiles-index' }
  | { type: 'profile'; slug: string }
  | { type: 'contact' }
  | { type: 'sent' }
  | { type: 'projects-index' }
  | { type: 'project'; id: string }
  | { type: 'cv' }
  | { type: 'notes-index' }
  | { type: 'note'; slug: string };

const segmentByLang: Record<Lang, Map<string, SegmentKey>> = {
  es: new Map(),
  en: new Map(),
};

for (const [key, value] of Object.entries(segments) as [SegmentKey, (typeof segments)[SegmentKey]][]) {
  segmentByLang.es.set(value.es, key);
  segmentByLang.en.set(value.en, key);
}

function segmentKeyFromAnyLang(part: string): SegmentKey | undefined {
  for (const [key, value] of Object.entries(segments) as [SegmentKey, (typeof segments)[SegmentKey]][]) {
    if (value.es === part || value.en === part) return key;
  }
  return undefined;
}

function seg(key: SegmentKey, lang: Lang): string {
  return segments[key][lang];
}

export function homePath(lang: Lang): string {
  return `/${lang}/`;
}

export function aboutPath(lang: Lang): string {
  return `/${lang}/${seg('about', lang)}/`;
}

export function experienceIndexPath(lang: Lang): string {
  return `/${lang}/${seg('experience', lang)}/`;
}

export function experiencePath(lang: Lang, slug: string): string {
  return `/${lang}/${seg('experience', lang)}/${slug}/`;
}

export function casePath(lang: Lang, experienceSlug: string, caseSlug: string): string {
  return `/${lang}/${seg('experience', lang)}/${experienceSlug}/${seg('cases', lang)}/${caseSlug}/`;
}

export function profilesIndexPath(lang: Lang): string {
  return `/${lang}/${seg('profiles', lang)}/`;
}

export function profilePath(lang: Lang, slug: string): string {
  return `/${lang}/${seg('profiles', lang)}/${slug}/`;
}

export function contactPath(lang: Lang): string {
  return `/${lang}/${seg('contact', lang)}/`;
}

export function sentPath(lang: Lang): string {
  return `/${lang}/${seg('contact', lang)}/${seg('sent', lang)}/`;
}

export function projectsIndexPath(lang: Lang): string {
  return `/${lang}/${seg('projects', lang)}/`;
}

export function projectPath(lang: Lang, id: string): string {
  return `/${lang}/${seg('projects', lang)}/${id}/`;
}

export function cvPath(lang: Lang): string {
  return `/${lang}/${seg('cv', lang)}/`;
}

export function notesIndexPath(lang: Lang): string {
  return `/${lang}/${seg('notes', lang)}/`;
}

export function notePath(lang: Lang, slug: string): string {
  return `/${lang}/${seg('notes', lang)}/${slug}/`;
}

function buildPath(lang: Lang, route: RouteDescriptor): string {
  switch (route.type) {
    case 'home':
      return homePath(lang);
    case 'about':
      return aboutPath(lang);
    case 'experience-index':
      return experienceIndexPath(lang);
    case 'experience':
      return experiencePath(lang, route.slug);
    case 'case':
      return casePath(lang, route.experienceSlug, route.caseSlug);
    case 'profiles-index':
      return profilesIndexPath(lang);
    case 'profile':
      return profilePath(lang, route.slug);
    case 'contact':
      return contactPath(lang);
    case 'sent':
      return sentPath(lang);
    case 'projects-index':
      return projectsIndexPath(lang);
    case 'project':
      return projectPath(lang, route.id);
    case 'cv':
      return cvPath(lang);
    case 'notes-index':
      return notesIndexPath(lang);
    case 'note':
      return notePath(lang, route.slug);
  }
}

function parseParts(lang: Lang, parts: string[], offset: number): RouteDescriptor {
  if (offset >= parts.length) return { type: 'home' };

  const firstKey = segmentByLang[lang].get(parts[offset]) ?? segmentKeyFromAnyLang(parts[offset]);
  if (!firstKey) {
    if (parts[offset] === 'cv') return { type: 'cv' };
    return { type: 'home' };
  }

  switch (firstKey) {
    case 'about':
      return { type: 'about' };
    case 'experience': {
      if (offset + 1 >= parts.length) return { type: 'experience-index' };
      const slug = parts[offset + 1];
      const casesKey = segmentKeyFromAnyLang(parts[offset + 2] ?? '');
      if (casesKey === 'cases' && parts[offset + 3]) {
        return { type: 'case', experienceSlug: slug, caseSlug: parts[offset + 3] };
      }
      return { type: 'experience', slug };
    }
    case 'profiles':
      if (offset + 1 >= parts.length) return { type: 'profiles-index' };
      return { type: 'profile', slug: parts[offset + 1] };
    case 'contact':
      if (offset + 1 < parts.length) {
        const sentKey = segmentKeyFromAnyLang(parts[offset + 1]);
        if (sentKey === 'sent') return { type: 'sent' };
      }
      return { type: 'contact' };
    case 'projects':
      if (offset + 1 >= parts.length) return { type: 'projects-index' };
      return { type: 'project', id: parts[offset + 1] };
    case 'cv':
      return { type: 'cv' };
    case 'notes':
      if (offset + 1 >= parts.length) return { type: 'notes-index' };
      return { type: 'note', slug: parts[offset + 1] };
    default:
      return { type: 'home' };
  }
}

export function parsePathname(pathname: string): { lang: Lang; route: RouteDescriptor; hash: string } {
  const hashIndex = pathname.indexOf('#');
  const hash = hashIndex >= 0 ? pathname.slice(hashIndex) : '';
  const raw = hashIndex >= 0 ? pathname.slice(0, hashIndex) : pathname;
  const parts = raw.split('/').filter(Boolean);

  let lang: Lang = 'es';
  let offset = 0;
  if (parts[0] === 'es' || parts[0] === 'en') {
    lang = parts[0];
    offset = 1;
  }

  const route = parseParts(lang, parts, offset);
  return { lang, route, hash };
}

export function swapLangPath(pathname: string, target: Lang): string {
  const { route, hash } = parsePathname(pathname);
  return `${buildPath(target, route)}${hash}`;
}

/** Legacy helper: build a localized path from Spanish-centric or English segment strings. */
export function pathFromLegacy(lang: Lang, path = '/'): string {
  const hashIndex = path.indexOf('#');
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : '';
  const pathname = (hashIndex >= 0 ? path.slice(0, hashIndex) : path).replace(/^\/+|\/+$/g, '');
  if (!pathname) return `${homePath(lang)}${hash}`;

  const parts = pathname.split('/').filter(Boolean);
  const route = parseParts('es', parts, 0);
  return `${buildPath(lang, route)}${hash}`;
}

export function alternatesFor(pathname: string): { es: string; en: string } {
  return {
    es: swapLangPath(pathname, 'es'),
    en: swapLangPath(pathname, 'en'),
  };
}
