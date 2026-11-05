import type { Localized } from '../i18n/ui';

export const homeFeature = {
  client: {
    es: 'InFinancexp · Grupo Interbank',
    en: 'InFinancexp · Interbank Group',
  },
  products: {
    es: 'Productos Agora y SIP',
    en: 'Agora and SIP products',
  },
  chips: ['Flutter', 'Pigeon', 'Thales D1', 'Atomic Design'] as const,
  highlights: {
    es: [
      'Diseñé e implementé un design system con Atomic Design para todos los productos de InFinancexp (Agora y SIP).',
      'Construí un micropaquete Flutter de provisión en billeteras digitales con Thales D1 SDK y puentes nativos con Pigeon.',
      'Integré el módulo de pagos y la librería Token Digital.',
    ],
    en: [
      'Designed and implemented a design system with Atomic Design for all InFinancexp products (Agora and SIP).',
      'Built a Flutter micropackage for digital wallet provisioning with the Thales D1 SDK and native bridges with Pigeon.',
      'Integrated the payments module and the Token Digital library.',
    ],
  },
} as const satisfies {
  client: Localized;
  products: Localized;
  chips: readonly string[];
  highlights: Localized & { es: readonly string[]; en: readonly string[] };
};

export const homeH1 = {
  es: 'Jonatan Padilla, Senior Software Engineer: Flutter, Java y Full Stack',
  en: 'Jonatan Padilla, Senior Software Engineer: Flutter, Java and Full Stack',
} as const satisfies Localized;

export const homeLead = {
  es: 'Apps móviles con Flutter, backend con Java y full stack con arquitectura limpia.',
  en: 'Mobile apps with Flutter, backend with Java, and full stack with clean architecture.',
} as const satisfies Localized;
