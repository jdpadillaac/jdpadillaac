import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../src/data/cv', () => ({
  cvHref: (lang: 'es' | 'en') => `/cv/jonatan-padilla-${lang}.pdf`,
  cvAvailable: vi.fn(() => true),
}));

import ContactBand from '../../src/components/ContactBand.astro';
import CvPage from '../../src/pages/[lang]/cv.astro';
import HomePage from '../../src/pages/[lang]/index.astro';
import { page, render } from '../helpers/render';

describe('pages when the cv pdfs exist', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('links the home page and the cv page to the files', async () => {
    const home = await page(HomePage, { lang: 'es' });
    expect(home).toContain('href="/cv/jonatan-padilla-es.pdf"');
    expect(home).toContain('href="/cv/jonatan-padilla-en.pdf"');
    expect(home).not.toContain('/cv/#cv-es');

    const cv = await page(CvPage, { lang: 'en' });
    expect(cv).toContain('id="cv-es"');
    expect(cv).toContain('id="cv-en"');
    expect(cv).toContain('href="/cv/jonatan-padilla-en.pdf"');
  });

  it('offers the spanish file from the contact action', async () => {
    const html = await render(ContactBand, {
      props: { lang: 'es', actions: 'contact', title: '¿Buscas un perfil como este?' },
    });
    expect(html).toContain('¿Buscas un perfil como este?');
    expect(html).toContain('href="/es/contacto/"');
    expect(html).toContain('href="/cv/jonatan-padilla-es.pdf"');
  });
});
