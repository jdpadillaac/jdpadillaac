import type { Localized } from '../i18n/ui';

export const profiles = [
  {
    slug: 'mobile-flutter',
    name: { es: 'Mobile / Flutter', en: 'Mobile / Flutter' },
    summary: { es: '[Descripción pendiente]', en: '[Description pending]' },
    stack: ['Flutter', 'Swift', 'iOS'],
    match: ['flutter', 'swift', 'swiftui', 'ios', 'dart'],
  },
  {
    slug: 'backend-java',
    name: { es: 'Backend Java', en: 'Java backend' },
    summary: { es: '[Descripción pendiente]', en: '[Description pending]' },
    stack: ['Java', 'Spring Boot'],
    match: ['java', 'spring boot'],
  },
  {
    slug: 'full-stack',
    name: { es: 'Full Stack', en: 'Full stack' },
    summary: { es: '[Descripción pendiente]', en: '[Description pending]' },
    stack: ['TypeScript', 'Node.js', 'NestJS', 'Angular', 'Go', 'Docker', 'MySQL', 'MongoDB'],
    match: ['react', 'typescript', 'go', 'mysql', 'node.js', 'nestjs', 'angular'],
  },
] as const satisfies readonly {
  slug: string;
  name: Localized;
  summary: Localized;
  stack: readonly string[];
  match: readonly string[];
}[];

export function profileBySlug(slug: string | undefined) {
  return profiles.find((profile) => profile.slug === slug);
}
