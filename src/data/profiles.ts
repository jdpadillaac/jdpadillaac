import type { Localized } from '../i18n/ui';

export const profiles = [
  {
    slug: 'mobile-flutter',
    name: { es: 'Mobile / Flutter', en: 'Mobile / Flutter' },
    summary: {
      es: 'Apps móviles con Flutter y Dart, Clean Architecture, arquitectura de micropaquetes y design systems con Atomic Design. Integración nativa con Pigeon y SDKs como Thales D1 para provisión en billeteras digitales.',
      en: 'Mobile apps with Flutter and Dart, Clean Architecture, micropackage architecture and design systems with Atomic Design. Native integration with Pigeon and SDKs such as Thales D1 for digital wallet provisioning.',
    },
    stack: ['Flutter', 'Dart', 'Pigeon', 'Atomic Design'],
    match: ['flutter', 'dart', 'pigeon'],
  },
  {
    slug: 'backend-java',
    name: { es: 'Backend Java', en: 'Java backend' },
    summary: {
      es: 'Servicios y APIs REST con Java y Spring Boot, además de microservicios con Go. Experiencia con monolitos, microservicios y bases de datos relacionales, con certificación de la ruta Backend con Java de Platzi.',
      en: 'Services and REST APIs with Java and Spring Boot, plus microservices with Go. Experience with monoliths, microservices and relational databases, with the Platzi Backend with Java certification.',
    },
    stack: ['Java', 'Spring Boot', 'Go', 'APIs REST'],
    match: ['java', 'spring boot', 'go'],
  },
  {
    slug: 'full-stack',
    name: { es: 'Full Stack', en: 'Full stack' },
    summary: {
      es: 'Producto de punta a punta: apps Flutter, frontend con Angular y backend con Java o Go. Lideré un equipo de 5 personas entre móvil, frontend y backend.',
      en: 'End-to-end product work: Flutter apps, Angular frontend and Java or Go backend. I led a team of 5 across mobile, frontend and backend.',
    },
    stack: ['Flutter', 'Angular', 'Java', 'Go'],
    match: ['flutter', 'angular', 'java'],
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
