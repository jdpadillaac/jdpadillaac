import type { Lang } from '../i18n/ui';

type SeoEntry = Record<Lang, { title: string; description: string }>;

export const pageSeo = {
  about: {
    es: {
      title: 'Sobre mí | Jonatan Padilla',
      description:
        'Senior Software Engineer en Medellín con más de 8 años de experiencia: Flutter, Java y Go, Clean Architecture, design systems y liderazgo técnico.',
    },
    en: {
      title: 'About | Jonatan Padilla',
      description:
        'Senior Software Engineer in Medellín with 8+ years of experience: Flutter, Java and Go, Clean Architecture, design systems and technical leadership.',
    },
  },
  contact: {
    es: {
      title: 'Contacto | Jonatan Padilla',
      description:
        'Escríbeme para roles de tiempo completo (remoto o híbrido en Medellín) o proyectos freelance. Respondo por correo y LinkedIn.',
    },
    en: {
      title: 'Contact | Jonatan Padilla',
      description:
        'Reach out for full-time roles (remote or hybrid in Medellín) or freelance work. I reply by email and LinkedIn. Available immediately.',
    },
  },
  profilesIndex: {
    es: {
      title: 'Perfiles | Jonatan Padilla',
      description:
        'Tres perfiles con el mismo estándar: Mobile / Flutter, Backend Java y Full Stack. Enlaces a experiencia en fintech, retail y productos digitales.',
    },
    en: {
      title: 'Profiles | Jonatan Padilla',
      description:
        'Three profiles with the same standard: Mobile / Flutter, Java backend and full stack. Links to fintech, retail and digital product experience.',
    },
  },
  experienceIndex: {
    es: {
      title: 'Experiencia | Jonatan Padilla',
      description:
        'Experiencia en SEEK, Siigo, WACO, TUL y Personalsoft: arquitectura Flutter, design systems, Thales D1, Java y Go. Casos con stack real.',
    },
    en: {
      title: 'Experience | Jonatan Padilla',
      description:
        'Experience at SEEK, Siigo, WACO, TUL and Personalsoft: Flutter architecture, design systems, Thales D1, Java and Go. Real stack cases.',
    },
  },
  notesIndex: {
    es: {
      title: 'Notas técnicas | Jonatan Padilla',
      description:
        'Artículos cortos sobre Flutter, Java y full stack: arquitectura, herramientas y decisiones técnicas en productos reales. Por Jonatan Padilla, Medellín.',
    },
    en: {
      title: 'Technical notes | Jonatan Padilla',
      description:
        'Short posts on Flutter, Java and full stack: architecture, tooling and technical decisions on real products. By Jonatan Padilla, Medellín.',
    },
  },
  cv: {
    es: {
      title: 'CV | Jonatan Padilla',
      description:
        'Descarga el currículum de Jonatan Padilla en español o inglés. Senior Software Engineer, Flutter, Java y full stack, basado en Medellín, Colombia.',
    },
    en: {
      title: 'CV | Jonatan Padilla',
      description:
        'Download Jonatan Padilla’s résumé in Spanish or English. Senior Software Engineer, Flutter, Java and full stack, based in Medellín, Colombia.',
    },
  },
} as const satisfies Record<string, SeoEntry>;

export const profileSeo: Record<string, SeoEntry> = {
  'mobile-flutter': {
    es: {
      title: 'Desarrollador Flutter senior Medellín | Jonatan Padilla',
      description:
        'Apps móviles con Flutter: Clean Architecture, micropaquetes, Pigeon y Thales D1, y design systems con Atomic Design. Remoto o híbrido en Medellín.',
    },
    en: {
      title: 'Senior Flutter Developer Colombia | Jonatan Padilla',
      description:
        'Mobile apps with Flutter: Clean Architecture, micropackages, Pigeon and Thales D1, plus Atomic Design systems. Remote or hybrid in Medellín.',
    },
  },
  'backend-java': {
    es: {
      title: 'Desarrollador Java Spring Boot Medellín | Jonatan Padilla',
      description:
        'APIs REST y microservicios con Java, Spring Boot y Go, con bases de datos relacionales. Tiempo completo, remoto o híbrido en Medellín.',
    },
    en: {
      title: 'Java Spring Boot Developer Remote | Jonatan Padilla',
      description:
        'REST APIs and microservices with Java, Spring Boot and Go, on relational databases. Full-time, remote or hybrid in Medellín.',
    },
  },
  'full-stack': {
    es: {
      title: 'Desarrollador full stack Java Angular | Jonatan Padilla',
      description:
        'Producto de punta a punta con Flutter, Angular y backend Java o Go. Liderazgo de equipos pequeños. Tiempo completo y proyectos freelance.',
    },
    en: {
      title: 'Full Stack Java Angular Developer | Jonatan Padilla',
      description:
        'End-to-end delivery with Flutter, Angular and Java or Go backends. Small-team leadership. Available for full-time roles and freelance projects.',
    },
  },
};
