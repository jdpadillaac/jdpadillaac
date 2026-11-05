import { describe, expect, it } from 'vitest';
import Breadcrumbs from '../../src/components/Breadcrumbs.astro';
import SiteFooter from '../../src/components/SiteFooter.astro';
import Frame from '../../src/components/Frame.astro';
import SiteHeader from '../../src/components/SiteHeader.astro';
import JsonLd from '../../src/components/JsonLd.astro';
import SectionHeader from '../../src/components/SectionHeader.astro';
import Seo from '../../src/components/Seo.astro';
import Study from '../../src/components/Study.astro';
import { site } from '../../src/data/site';
import { render } from '../helpers/render';

const seo = {
  title: 'Title',
  description: 'Description',
  pathname: '/es/experiencia/',
  lang: 'es' as const,
};

describe('seo', () => {
  it('emits indexable alternate links for a relative image', async () => {
    const html = await render(Seo, { props: seo });
    expect(html).toContain('<title>Title</title>');
    expect(html).toContain('content="index, follow, max-image-preview:large"');
    expect(html).toContain('rel="canonical" href="https://jdpadillac.com/es/experiencia/"');
    expect(html).toContain('hreflang="es"');
    expect(html).toContain('hreflang="en"');
    expect(html).toContain('hreflang="x-default" href="https://jdpadillac.com/es/experiencia/"');
    expect(html).toContain('property="og:locale" content="es_CO"');
    expect(html).toContain('property="og:locale:alternate" content="en_US"');
    expect(html).toContain(`property="og:image" content="https://jdpadillac.com/og/experience-es.png"`);
    expect(html).toContain(`property="og:image:alt" content="${site.name}"`);
    expect(html).toContain('property="og:type" content="website"');
  });

  it('supports english, absolute images, articles and noindex pages', async () => {
    const html = await render(Seo, {
      props: {
        ...seo,
        lang: 'en',
        pathname: '/en/',
        localized: false,
        noindex: true,
        ogImage: 'https://cdn.example/og.png',
        ogAlt: 'Custom alt',
        ogType: 'article',
      },
    });
    expect(html).toContain('content="noindex, follow"');
    expect(html).not.toContain('hreflang=');
    expect(html).toContain('property="og:image" content="https://cdn.example/og.png"');
    expect(html).toContain('property="og:image:alt" content="Custom alt"');
    expect(html).toContain('property="og:type" content="article"');
    expect(html).toContain('property="og:locale" content="en_US"');
    expect(html).toContain('property="og:locale:alternate" content="es_CO"');
  });

  it('rejects an unsupported language', async () => {
    await expect(render(Seo, { props: { ...seo, lang: 'fr' } })).rejects.toThrow('Unsupported language: fr');
  });
});

describe('chrome', () => {
  it('marks the current page and falls back to the swapped locale', async () => {
    const home = await render(SiteHeader, { props: { lang: 'es', pathname: '/es/' } });
    expect(home).toContain('href="/es/" aria-current="page"');
    expect(home).toContain('aria-current="true" lang="es"');
    expect(home).toContain('lang="en"');
    expect(home).not.toContain('aria-current="true" lang="en"');

    const nested = await render(SiteHeader, { props: { lang: 'en', pathname: '/en/experience/seek/' } });
    expect(nested).toContain('href="/en/experience/" aria-current="page"');
    expect(nested).not.toContain('href="/en/" aria-current="page"');

    const exact = await render(SiteHeader, { props: { lang: 'es', pathname: '/es/contacto/' } });
    expect(exact).toContain('href="/es/contacto/" aria-current="page"');

    const swapped = await render(SiteHeader, { props: { lang: 'en', pathname: '/contacto/' } });
    expect(swapped).toContain('href="/es/contacto/"');
    expect(swapped).toContain('href="/en/contact/"');
  });

  it('uses explicit alternates when the route is not localized', async () => {
    const html = await render(SiteHeader, {
      props: { lang: 'es', pathname: '/404/', alternates: { es: '/es/', en: '/en/' } },
    });
    expect(html).toContain('href="/es/"');
    expect(html).toContain('href="/en/"');
    expect(html).not.toContain('aria-current="page"');
  });

  it('renders the footer and a section header', async () => {
    const footer = await render(SiteFooter, { props: { lang: 'en' } });
    expect(footer).toContain(String(new Date().getFullYear()));
    expect(footer).toContain(`mailto:${site.email}`);
    expect(footer).toContain(site.links.linkedin);
    expect(footer).toContain('h-footer');

    const withSub = await render(SectionHeader, {
      props: { id: 'experiencia', kicker: 'Experiencia', title: 'Experiencia', sub: 'Detalle' },
    });
    expect(withSub).toContain('id="experiencia"');
    expect(withSub).toContain('Detalle');
    const bare = await render(SectionHeader, { props: { id: 'perfiles', kicker: 'Perfiles', title: 'Perfiles' } });
    expect(bare).not.toContain('section-header__sub');
  });

  it('escapes json-ld and renders frames and breadcrumbs', async () => {
    const json = await render(JsonLd, { props: { data: { name: '</script>' } } });
    expect(json).toContain('\\u003c/script>');
    expect(json).toContain('application/ld+json');

    const frame = await render(Frame, { props: { alt: 'Captura' } });
    expect(frame).toContain('aspect-ratio: 1200 / 750');
    expect(frame).toContain('Captura');
    const custom = await render(Frame, { props: { alt: 'Wide', width: 16, height: 9 } });
    expect(custom).toContain('aspect-ratio: 16 / 9');

    const trail = await render(Breadcrumbs, {
      props: {
        label: 'Ruta',
        items: [
          { label: 'Inicio', href: '/es/' },
          { label: 'CV', href: '/es/cv/' },
        ],
      },
    });
    expect(trail).toContain('href="/es/"');
    expect(trail).toContain('aria-current="page"');
    expect(trail).toContain('crumbs__sep');
    const single = await render(Breadcrumbs, { props: { label: 'Ruta', items: [{ label: 'Inicio', href: '/es/' }] } });
    expect(single).not.toContain('crumbs__sep');
  });
});

describe('study', () => {
  const base = { lang: 'es' as const, kicker: 'SEEK · 2025', title: 'Architect', summary: 'Summary' };

  it('renders only the header when optional blocks are empty', async () => {
    const html = await render(Study, { props: base });
    expect(html).toContain('Architect');
    expect(html).not.toContain('facts');
    expect(html).not.toContain('id="que-hice"');
    expect(html).not.toContain('id="resultados"');
    expect(html).not.toContain('id="aprendizajes"');
  });

  it('renders facts, narrative pairs, media and related links', async () => {
    const html = await render(Study, {
      slots: { crumbs: '<nav>Inicio</nav>' },
      props: {
        ...base,
        lang: 'en',
        facts: { role: 'Architect', dates: '2025', team: '5 people', stack: ['Flutter'] },
        heroAlt: 'Hero',
        highlights: ['Shipped the design system'],
        sections: [
          { id: 'contexto', title: 'Context', body: 'Context body' },
          { id: 'rol', title: 'Role', body: 'Role body' },
          { id: 'problema', title: 'Challenge', body: 'Challenge body' },
          { id: 'decisiones', title: 'Solution', body: 'Solution body' },
          { id: 'notas', title: 'Notes', body: 'Notes body' },
        ],
        stages: [{ role: 'Lead', period: '2024', summary: 'Led the team' }],
        results: [{ value: '5', label: 'packages' }],
        shots: ['Checkout'],
        learnings: 'Keep the provider behind a port.',
        cases: [
          { href: '/en/caso/', title: 'Case', meta: 'One line' },
          { href: '/en/otro/', title: 'Other case' },
        ],
        others: [
          { href: '/en/experiencia/waco/', title: 'WACO', meta: 'Lead' },
          { href: '/en/experiencia/siigo/', title: 'Siigo' },
        ],
      },
    });

    expect(html).toContain('<nav>Inicio</nav>');
    expect(html).toContain('What I do');
    expect(html).toContain('Flutter');
    expect(html).toContain('5 people');
    expect(html).toContain('id="contexto"');
    expect(html).toContain('id="rol"');
    expect(html).toContain('id="problema"');
    expect(html).toContain('id="decisiones"');
    expect(html).toContain('id="notas"');
    expect(html).toContain('Stages');
    expect(html).toContain('Results');
    expect(html).toContain('Screenshots');
    expect(html).toContain('Learnings');
    expect(html).toContain('One line');
    expect(html).toContain('Other case');
    expect(html).toContain('View page');
    expect(html).toContain('Siigo');
  });

  it('omits blank teams, empty stacks and whitespace learnings', async () => {
    const blanks = await render(Study, {
      props: {
        ...base,
        facts: { role: 'Engineer', dates: '2020', team: '   ', stack: [] },
        sections: [
          { id: 'rol', title: 'Role', body: 'Only the role' },
          { id: 'notas', title: 'Notes', body: '   ' },
        ],
        learnings: '   ',
      },
    });
    expect(blanks).toContain('Engineer');
    expect(blanks).not.toContain('>Equipo<');
    expect(blanks).not.toContain('pills');
    expect(blanks).toContain('id="rol"');
    expect(blanks).not.toContain('id="contexto"');
    expect(blanks).not.toContain('id="notas"');
    expect(blanks).not.toContain('id="aprendizajes"');

    const sparse = await render(Study, {
      props: { ...base, facts: { role: 'Engineer', dates: '2020' } },
    });
    expect(sparse).toContain('Engineer');
    expect(sparse).not.toContain('>Equipo<');
    expect(sparse).not.toContain('pills');
  });
});
