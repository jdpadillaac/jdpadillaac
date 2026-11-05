export const site = {
  name: 'Jonatan Padilla',
  domain: 'https://jdpadillac.com',
  locale: 'es_CO',
  language: 'es',
} as const;

export const profile = {
  givenName: 'Jonatan',
  familyName: 'Padilla',
  role: 'Ingeniero de software y arquitecto mobile',
  tagline:
    'Diseño y construyo productos con Flutter, iOS, Java, Spring Boot y arquitectura limpia.',
  location: 'Colombia',
  email: 'contact@jdpadillac.com',
  bio: [
    'Ingeniero de sistemas con experiencia en productos web y mobile para empresas en Latinoamérica.',
    'Me interesan la arquitectura hexagonal, la calidad del código y equipos que priorizan entregas sostenibles.',
  ],
  skills: [
    'Flutter',
    'Swift',
    'iOS',
    'Java',
    'Spring Boot',
    'Go',
    'TypeScript',
    'Node.js',
    'NestJS',
    'Angular',
    'Docker',
    'MySQL',
    'MongoDB',
  ],
  links: {
    github: 'https://github.com/jdpadillaac',
    linkedin: 'https://www.linkedin.com/in/jdpadillac/',
    x: 'https://x.com/jdpadillac_',
  },
} as const;

export const defaultSeo = {
  title: 'Jonatan Padilla — Ingeniero de software',
  description:
    'Portafolio de Jonatan Padilla: Flutter, iOS, Java, Spring Boot, Go y arquitectura limpia. Proyectos, experiencia y contacto.',
  ogImage: '/og/default.svg',
} as const;
