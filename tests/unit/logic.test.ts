import { describe, expect, it } from 'vitest';
import config from '../../astro.config.mjs';
import { collections } from '../../src/content.config';
import { copy } from '../../src/data/copy';
import { profileBySlug, profiles } from '../../src/data/profiles';
import { site } from '../../src/data/site';
import { isLang, localePath, staticLangs, swapLang } from '../../src/i18n/paths';
import { tx, ui } from '../../src/i18n/ui';
import { includeInSitemap, serializeSitemapItem } from '../../src/lib/sitemap';
import { breadcrumbGraph, identityGraph } from '../../src/lib/structured-data';
import { absolute } from '../../src/lib/url';

describe('locale paths', () => {
  it('recognizes only es and en', () => {
    expect(isLang('es')).toBe(true);
    expect(isLang('en')).toBe(true);
    expect(isLang('ES')).toBe(false);
    expect(isLang('')).toBe(false);
    expect(isLang(undefined)).toBe(false);
    expect(isLang('fr')).toBe(false);
  });

  it('builds static params and locale urls', () => {
    expect(staticLangs()).toEqual([{ params: { lang: 'es' } }, { params: { lang: 'en' } }]);
    expect(localePath('es')).toBe('/es/');
    expect(localePath('en', '/experiencia/')).toBe('/en/experiencia/');
    expect(localePath('es', 'contacto')).toBe('/es/contacto/');
    expect(localePath('en', '/cv/#cv-en')).toBe('/en/cv/#cv-en');
    expect(localePath('es', '#top')).toBe('/es/#top');
  });

  it('swaps the locale prefix and keeps the hash', () => {
    expect(swapLang('/es/experiencia/seek/', 'en')).toBe('/en/experiencia/seek/');
    expect(swapLang('/contacto/', 'es')).toBe('/es/contacto/');
    expect(swapLang('/en/sobre-mi/#bio', 'es')).toBe('/es/sobre-mi/#bio');
    expect(swapLang('/', 'en')).toBe('/en/');
  });
});

describe('urls and structured data', () => {
  it('resolves pathnames against the site origin', () => {
    expect(absolute('/es/')).toBe('https://jdpadillac.com/es/');
    expect(absolute('/og/default.svg')).toBe('https://jdpadillac.com/og/default.svg');
  });

  it('builds the person and website graph in both languages', () => {
    for (const lang of ['es', 'en'] as const) {
      const graph = identityGraph(lang);
      expect(graph['@context']).toBe('https://schema.org');
      const person = graph['@graph'][0];
      const website = graph['@graph'][1];
      expect(person).toMatchObject({
        '@type': 'Person',
        name: site.name,
        url: absolute(`/${lang}/`),
        email: `mailto:${site.email}`,
        sameAs: [site.links.linkedin, site.links.github, site.links.x],
      });
      expect(website).toMatchObject({
        '@type': 'WebSite',
        url: absolute(`/${lang}/`),
        publisher: { '@id': `${site.url}/#person` },
      });
    }
  });

  it('numbers breadcrumb items and allows an empty trail', () => {
    expect(breadcrumbGraph([]).itemListElement).toEqual([]);
    const graph = breadcrumbGraph([
      { label: 'Inicio', href: '/es/' },
      { label: 'CV', href: '/es/cv/' },
    ]);
    expect(graph.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://jdpadillac.com/es/' },
      { '@type': 'ListItem', position: 2, name: 'CV', item: 'https://jdpadillac.com/es/cv/' },
    ]);
  });
});

describe('copy, profiles and ui', () => {
  it('keeps spanish and english keys aligned', () => {
    expect(Object.keys(ui.es)).toEqual(Object.keys(ui.en));
    for (const value of Object.values(copy)) {
      expect(tx('es', value).length).toBeGreaterThan(0);
      expect(tx('en', value).length).toBeGreaterThan(0);
    }
  });

  it('finds a profile by slug', () => {
    expect(profileBySlug('mobile-flutter')?.slug).toBe('mobile-flutter');
    expect(profileBySlug('backend-java')?.name.en).toBe('Java backend');
    expect(profileBySlug(undefined)).toBeUndefined();
    expect(profileBySlug('missing')).toBeUndefined();
    expect(profiles).toHaveLength(3);
  });

  it('publishes the site identity used by pages', () => {
    expect(site.url).toBe('https://jdpadillac.com');
    expect(site.skills).toContain('Flutter');
    expect(config.site).toBe(site.url);
    expect(config.trailingSlash).toBe('always');
    expect(config.output).toBe('static');
    expect(Object.keys(collections).sort()).toEqual(['cases', 'experiences', 'projects']);
  });
});

describe('sitemap', () => {
  const origin = 'https://jdpadillac.com';

  it('drops the root, drafts, projects and the 404', () => {
    expect(includeInSitemap(`${origin}/`)).toBe(false);
    expect(includeInSitemap(`${origin}/index.html`)).toBe(false);
    expect(includeInSitemap(`${origin}/es/contacto/enviado/`)).toBe(false);
    expect(includeInSitemap(`${origin}/en/proyectos/jtaskboard/`)).toBe(false);
    expect(includeInSitemap(`${origin}/404/`)).toBe(false);
    expect(includeInSitemap(`${origin}/404.html`)).toBe(false);
    expect(includeInSitemap(`${origin}/es/contacto/`)).toBe(true);
    expect(includeInSitemap(`${origin}/en/experiencia/seek/`)).toBe(true);
  });

  it('adds an english x-default alternate once', () => {
    const bare = { url: `${origin}/es/` };
    expect(serializeSitemapItem(bare)).toBe(bare);
    expect(serializeSitemapItem({ ...bare, links: [] })).toEqual({ ...bare, links: [] });

    const spanish = { lang: 'es', url: `${origin}/es/` };
    const withoutEnglish = serializeSitemapItem({ url: `${origin}/es/`, links: [spanish] });
    expect(withoutEnglish.links).toEqual([spanish]);

    const english = { lang: 'en', url: `${origin}/en/` };
    const withDefault = serializeSitemapItem({ url: `${origin}/es/`, links: [spanish, english] });
    expect(withDefault.links).toEqual([spanish, english, { lang: 'x-default', url: english.url }]);

    const existing = { lang: 'x-default', url: english.url };
    const unchanged = serializeSitemapItem({ url: `${origin}/es/`, links: [english, existing] });
    expect(unchanged.links).toEqual([english, existing]);
  });
});
