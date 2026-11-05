import { profiles } from '../data/profiles';
import type { Lang } from '../i18n/ui';
import { parsePathname } from '../i18n/routes';
import { publishedExperiences } from './content';

export function ogImagePath(key: string): string {
  return `/og/${key}.png`;
}

export async function allOgImageKeys(): Promise<string[]> {
  const keys = new Set<string>(['default-es', 'default-en']);
  keys.add('home-es');
  keys.add('home-en');
  keys.add('about-es');
  keys.add('about-en');
  keys.add('contact-es');
  keys.add('contact-en');
  keys.add('profiles-es');
  keys.add('profiles-en');
  keys.add('experience-es');
  keys.add('experience-en');

  for (const lang of ['es', 'en'] as const) {
    for (const profile of profiles) {
      keys.add(`profile-${profile.slug}-${lang}`);
    }
    const experiences = await publishedExperiences();
    for (const entry of experiences) {
      keys.add(`experience-${entry.data.slug}-${lang}`);
    }
  }

  return [...keys].sort();
}

export function ogKeyFromPathname(pathname: string): string {
  const { lang, route } = parsePathname(pathname);
  switch (route.type) {
    case 'home':
      return `home-${lang}`;
    case 'about':
      return `about-${lang}`;
    case 'contact':
      return `contact-${lang}`;
    case 'profiles-index':
      return `profiles-${lang}`;
    case 'profile':
      return `profile-${route.slug}-${lang}`;
    case 'experience-index':
      return `experience-${lang}`;
    case 'experience':
      return `experience-${route.slug}-${lang}`;
    default:
      return `default-${lang}`;
  }
}

export function ogLabelForKey(key: string, lang: Lang): { title: string; subtitle: string } {
  if (key.startsWith('profile-')) {
    const slug = key.replace(/^profile-/, '').replace(/-es$|-en$/, '');
    const profile = profiles.find((item) => item.slug === slug);
    return {
      title: 'Jonatan Padilla',
      subtitle: profile?.name[lang] ?? slug,
    };
  }
  if (key.startsWith('experience-') && key !== 'experience-es' && key !== 'experience-en') {
    const slug = key.replace(/^experience-/, '').replace(/-es$|-en$/, '');
    return { title: 'Jonatan Padilla', subtitle: slug.toUpperCase() };
  }
  const labels: Record<string, { es: string; en: string }> = {
    'home-es': { es: 'Senior Software Engineer', en: 'Senior Software Engineer' },
    'home-en': { es: 'Senior Software Engineer', en: 'Senior Software Engineer' },
    'about-es': { es: 'Sobre mí', en: 'About' },
    'about-en': { es: 'Sobre mí', en: 'About' },
    'contact-es': { es: 'Contacto', en: 'Contact' },
    'contact-en': { es: 'Contacto', en: 'Contact' },
    'profiles-es': { es: 'Perfiles', en: 'Profiles' },
    'profiles-en': { es: 'Perfiles', en: 'Profiles' },
    'experience-es': { es: 'Experiencia', en: 'Experience' },
    'experience-en': { es: 'Experiencia', en: 'Experience' },
    'default-es': { es: 'jdpadillac.com', en: 'jdpadillac.com' },
    'default-en': { es: 'jdpadillac.com', en: 'jdpadillac.com' },
  };
  const entry = labels[key] ?? labels[`default-${lang}`];
  return { title: 'Jonatan Padilla', subtitle: entry[lang] };
}
