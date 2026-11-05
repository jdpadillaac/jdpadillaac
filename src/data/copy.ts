import type { Localized } from '../i18n/ui';

export const copy = {
  availability: { es: 'Disponible de inmediato', en: 'Available now' },
  label: {
    es: 'Senior Software Engineer · 8+ años de experiencia',
    en: 'Senior Software Engineer · 8+ years of experience',
  },
  headline: {
    es: 'Apps móviles con Flutter, backend con Java y full stack con arquitectura limpia.',
    en: 'Mobile apps with Flutter, backend with Java, and full stack with clean architecture.',
  },
  lede: {
    es: 'Diseño y construyo software con Clean Architecture, design systems y micropaquetes, e integro IA en mi flujo diario. Disponible para roles de tiempo completo, remotos o híbridos en Medellín, y para proyectos freelance.',
    en: 'I design and build software with Clean Architecture, design systems and micropackages, and I use AI in my daily work. Available for full-time roles, remote or hybrid in Medellín, and for freelance projects.',
  },
  contactPrompt: {
    es: 'Hablemos. Disponible de inmediato para roles de tiempo completo, remotos o híbridos en Medellín, y para proyectos freelance. Escríbeme por correo o LinkedIn.',
    en: "Let's talk. Available now for full-time roles, remote or hybrid in Medellín, and for freelance projects. Write to me by email or LinkedIn.",
  },
  about: {
    es: 'Soy Senior Software Engineer con más de 8 años de experiencia, basado en Medellín, Colombia. Trabajo con Flutter y Dart, Java y Spring Boot, y Go, con foco en Clean Architecture, design systems y liderazgo técnico. Integro IA en mi flujo de desarrollo con Cursor, GitHub Copilot y desarrollo guiado por especificaciones.',
    en: 'I am a Senior Software Engineer with 8+ years of experience, based in Medellín, Colombia. I work with Flutter and Dart, Java and Spring Boot, and Go, focusing on Clean Architecture, design systems and technical leadership. I use AI in my development workflow with Cursor, GitHub Copilot and spec-driven development.',
  },
  education: {
    es: 'Ingeniería, Universidad Nacional Abierta y a Distancia (UNAD), en curso.',
    en: 'Engineering, Universidad Nacional Abierta y a Distancia (UNAD), in progress.',
  },
  certifications: {
    es: 'Platzi, Desarrollo Backend con Java; Platzi, Arquitectura Frontend.',
    en: 'Platzi, Desarrollo Backend con Java; Platzi, Arquitectura Frontend.',
  },
  languages: {
    es: 'Español (nativo), Inglés (B1).',
    en: 'Spanish (native), English (B1).',
  },
} as const satisfies {
  availability: Localized;
  label: Localized;
  headline: Localized;
  lede: Localized;
  contactPrompt: Localized;
  about: Localized;
  education: Localized;
  certifications: Localized;
  languages: Localized;
};
