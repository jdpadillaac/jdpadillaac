import type { Localized } from '../i18n/ui';

export const profiles = [
  {
    slug: 'mobile-flutter',
    name: { es: 'Mobile / Flutter', en: 'Mobile / Flutter' },
    summary: {
      es: 'Apps móviles con Flutter y Dart, Clean Architecture, arquitectura de micropaquetes y design systems con Atomic Design. Integración nativa con Pigeon y SDKs como Thales D1 para provisión en billeteras digitales.',
      en: 'Mobile apps with Flutter and Dart, Clean Architecture, micropackage architecture and design systems with Atomic Design. Native integration with Pigeon and SDKs such as Thales D1 for digital wallet provisioning.',
    },
    intro: {
      es: 'Construyo apps móviles listas para producción en banca y fintech: arquitectura clara, UI consistente y bridges nativos cuando el SDK lo exige.',
      en: 'I build production-ready mobile apps for banking and fintech: clear architecture, consistent UI and native bridges when the SDK requires it.',
    },
    focus: {
      es: [
        'Clean Architecture y modularización con micropaquetes (Melos).',
        'Design systems con Atomic Design y librerías compartidas entre productos.',
        'Wallet provisioning con Thales D1 SDK y puentes nativos con Pigeon.',
        'Estado con Riverpod o Bloc, testing automatizado y CI/CD (GitHub Actions, Codemagic, Fastlane).',
      ],
      en: [
        'Clean Architecture and modularization with micropackages (Melos).',
        'Design systems with Atomic Design and shared libraries across products.',
        'Wallet provisioning with the Thales D1 SDK and native bridges with Pigeon.',
        'State with Riverpod or Bloc, automated testing and CI/CD (GitHub Actions, Codemagic, Fastlane).',
      ],
    },
    ai: {
      es: 'Uso Cursor, Claude Code y desarrollo guiado por especificaciones para acelerar diseño técnico, pruebas y documentación sin sacrificar revisión humana.',
      en: 'I use Cursor, Claude Code and spec-driven development to speed up technical design, tests and docs without skipping human review.',
    },
    stack: {
      es: ['Flutter', 'Dart', 'Pigeon', 'Thales D1', 'Riverpod', 'Bloc', 'Melos'],
      en: ['Flutter', 'Dart', 'Pigeon', 'Thales D1', 'Riverpod', 'Bloc', 'Melos'],
    },
    experienceSlugs: ['seek', 'siigo', 'waco'],
    match: ['flutter', 'dart', 'pigeon'],
  },
  {
    slug: 'backend-java',
    name: { es: 'Backend Java', en: 'Java backend' },
    summary: {
      es: 'Servicios y APIs REST con Java y Spring Boot, además de microservicios con Go. Experiencia con monolitos, microservicios y bases de datos relacionales, con certificación de la ruta Backend con Java de Platzi.',
      en: 'Services and REST APIs with Java and Spring Boot, plus microservices with Go. Experience with monoliths, microservices and relational databases, with the Platzi Backend with Java certification.',
    },
    intro: {
      es: 'Desarrollo features de backend con Java y Spring Boot (y Go cuando el equipo lo usa): APIs REST, seguridad con JWT y persistencia relacional. Trabajo con guía de arquitectura, no como arquitecto backend.',
      en: 'I develop backend features with Java and Spring Boot (and Go when the team uses it): REST APIs, JWT security and relational persistence. I work with architectural guidance — not as a backend architect.',
    },
    focus: {
      es: [
        'APIs REST con Spring Boot, Spring Data JPA y Spring Security.',
        'Microservicios y monolitos modulares con buenas prácticas de testing.',
        'Servicios complementarios con Go cuando el contexto lo pide.',
        'Integración con bases MySQL y despliegues containerizados.',
      ],
      en: [
        'REST APIs with Spring Boot, Spring Data JPA and Spring Security.',
        'Microservices and modular monoliths with solid testing practices.',
        'Complementary services with Go when the context calls for it.',
        'Integration with MySQL and containerized deployments.',
      ],
    },
    ai: {
      es: 'Aplico agentes y reglas de contexto para scaffolding, pruebas y revisiones de API, siempre validando contra los requisitos del equipo.',
      en: 'I apply agents and context rules for scaffolding, tests and API reviews, always validating against team requirements.',
    },
    stack: {
      es: ['Java', 'Spring Boot', 'Spring Data JPA', 'Spring Security', 'JWT', 'Go', 'MySQL'],
      en: ['Java', 'Spring Boot', 'Spring Data JPA', 'Spring Security', 'JWT', 'Go', 'MySQL'],
    },
    experienceSlugs: ['waco'],
    match: ['java', 'spring boot', 'go'],
  },
  {
    slug: 'full-stack',
    name: { es: 'Full Stack', en: 'Full stack' },
    summary: {
      es: 'Producto de punta a punta: apps Flutter, frontend con Angular y backend con Java o Go. Lideré un equipo de 5 personas entre móvil, frontend y backend.',
      en: 'End-to-end product work: Flutter apps, Angular frontend and Java or Go backend. I led a team of 5 across mobile, frontend and backend.',
    },
    intro: {
      es: 'Entrego producto completo: móvil Flutter, frontend Angular y backend Java o Go, alineando equipos pequeños y releases predecibles.',
      en: 'I deliver full product scope: Flutter mobile, Angular frontend and Java or Go backend, aligning small teams and predictable releases.',
    },
    focus: {
      es: [
        'Flujos de punta a punta entre app Flutter, Angular y servicios Java/Go.',
        'Coordinación entre mobile, frontend y backend en squads compactos.',
        'Design systems compartidos y contratos de API claros.',
        'Observabilidad y calidad en producción (por ejemplo Grafana Faro en POS).',
      ],
      en: [
        'End-to-end flows across Flutter apps, Angular and Java/Go services.',
        'Coordination across mobile, frontend and backend in compact squads.',
        'Shared design systems and clear API contracts.',
        'Observability and production quality (for example Grafana Faro on POS).',
      ],
    },
    ai: {
      es: 'Combino IA asistida con especificaciones compartidas para reducir fricción entre capas y mantener trazabilidad entre UI, API y pruebas.',
      en: 'I combine AI assistance with shared specs to reduce friction across layers and keep traceability between UI, API and tests.',
    },
    stack: {
      es: ['Flutter', 'Angular', 'Java', 'Go', 'Spring Boot'],
      en: ['Flutter', 'Angular', 'Java', 'Go', 'Spring Boot'],
    },
    experienceSlugs: ['siigo', 'waco'],
    match: ['flutter', 'angular', 'java'],
  },
] as const satisfies readonly {
  slug: string;
  name: Localized;
  summary: Localized;
  intro: Localized;
  focus: { es: readonly string[]; en: readonly string[] };
  ai: Localized;
  stack: { es: readonly string[]; en: readonly string[] };
  experienceSlugs: readonly string[];
  match: readonly string[];
}[];

export function profileBySlug(slug: string | undefined) {
  return profiles.find((profile) => profile.slug === slug);
}

export function profilesForExperience(slug: string) {
  return profiles.filter((profile) => profile.experienceSlugs.includes(slug));
}
