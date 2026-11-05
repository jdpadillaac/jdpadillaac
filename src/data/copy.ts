import type { Localized } from '../i18n/ui';

export const copy = {
  availability: { es: '[Disponibilidad pendiente]', en: '[Availability pending]' },
  headline: { es: '[Titular pendiente]', en: '[Headline pending]' },
  contactPrompt: { es: '[Llamado a contactar pendiente]', en: '[Contact prompt pending]' },
  about: { es: '[Biografía pendiente]', en: '[Bio pending]' },
  intro: { es: '[Introducción pendiente]', en: '[Introduction pending]' },
  results: [
    {
      value: { es: '[Cifra pendiente]', en: '[Figure pending]' },
      label: { es: '[Resultado 1]', en: '[Result 1]' },
    },
    {
      value: { es: '[Cifra pendiente]', en: '[Figure pending]' },
      label: { es: '[Resultado 2]', en: '[Result 2]' },
    },
    {
      value: { es: '[Cifra pendiente]', en: '[Figure pending]' },
      label: { es: '[Resultado 3]', en: '[Result 3]' },
    },
  ],
} as const satisfies {
  availability: Localized;
  headline: Localized;
  contactPrompt: Localized;
  about: Localized;
  intro: Localized;
  results: { value: Localized; label: Localized }[];
};
