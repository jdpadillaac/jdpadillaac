import { describe, expect, it } from 'vitest';
import config from '../../astro.config.mjs';
import { collections } from '../../src/content.config';
import { copy } from '../../src/data/copy';
import { profileBySlug, profiles, profilesForExperience } from '../../src/data/profiles';
import { site } from '../../src/data/site';
import { isLang, localePath, swapLang } from '../../src/i18n/paths';
import {
  aboutPath,
  contactPath,
  experiencePath,
  homePath,
  profilePath,
} from '../../src/i18n/routes';
import { tx, ui } from '../../src/i18n/ui';
import { includeInSitemap, serializeSitemapItem } from '../../src/lib/sitemap';
import { breadcrumbGraph, identityGraph } from '../../src/lib/structured-data';
import { absolute } from '../../src/lib/url';

describe('locale paths', () => {
  it('recognizes only es and en', () => {
    expect(isLang('es')).toBe(true);
    expect(isLang('en')).toBe(true);
    expect(isLang('ES')).toBe(false);
  });

  it('builds translated locale urls', () => {
    expect(localePath('es')).toBe('/es/');
    expect(localePath('en', '/experiencia/')).toBe('/en/experience/');
    expect(localePath('es', 'contacto')).toBe('/es/contacto/');
    expect(homePath('en')).toBe('/en/');
    expect(aboutPath('en')).toBe('/en/about/');
    expect(experiencePath('en', 'seek')).toBe('/en/experience/seek/');
    expect(profilePath('es', 'mobile-flutter')).toBe('/es/perfiles/mobile-flutter/');
  });

  it('swaps locale and translated segments', () => {
    expect(swapLang('/es/experiencia/seek/', 'en')).toBe('/en/experience/seek/');
    expect(swapLang('/en/about/', 'es')).toBe('/es/sobre-mi/');
    expect(swapLang('/es/contacto/#form', 'en')).toBe('/en/contact/#form');
  });
});

describe('urls and structured data', () => {
  it('resolves pathnames against the site origin', () => {
    expect(absolute('/es/')).toBe('https://jdpadillac.com/es/');
  });

  it('builds the person graph with linkedin only in sameAs', async () => {
    const graph = await identityGraph('es');
    const person = graph['@graph'][0];
    expect(person.sameAs).toEqual([site.links.linkedin]);
    expect(person).toMatchObject({
      alternateName: 'jdpadillac',
      jobTitle: 'Senior Software Engineer',
    });
  });

  it('numbers breadcrumb items', () => {
    const graph = breadcrumbGraph([
      { label: 'Inicio', href: '/es/' },
      { label: 'CV', href: '/es/cv/' },
    ]);
    expect(graph.itemListElement).toHaveLength(2);
  });
});

describe('profiles', () => {
  it('links experiences to profiles', () => {
    expect(profilesForExperience('seek')).toHaveLength(1);
    expect(profileBySlug('backend-java')?.experienceSlugs).toEqual(['waco']);
    expect(profiles).toHaveLength(3);
  });
});

describe('sitemap', () => {
  const origin = 'https://jdpadillac.com';

  it('drops drafts, projects and confirmation pages', () => {
    expect(includeInSitemap(`${origin}/`)).toBe(false);
    expect(includeInSitemap(`${origin}/es/contacto/enviado/`)).toBe(false);
    expect(includeInSitemap(`${origin}/en/projects/jtaskboard/`)).toBe(false);
    expect(includeInSitemap(`${origin}/es/contacto/`)).toBe(true);
    expect(includeInSitemap(`${origin}/en/experience/seek/`)).toBe(true);
  });

  it('adds a spanish x-default alternate once', () => {
    const spanish = { lang: 'es', url: `${origin}/es/` };
    const english = { lang: 'en', url: `${origin}/en/` };
    const withDefault = serializeSitemapItem({ url: `${origin}/es/`, links: [spanish, english] });
    expect(withDefault.links?.find((link) => link.lang === 'x-default')?.url).toBe(spanish.url);
  });
});

describe('copy and ui', () => {
  it('keeps spanish and english keys aligned', () => {
    expect(Object.keys(ui.es)).toEqual(Object.keys(ui.en));
    for (const value of Object.values(copy)) {
      expect(tx('es', value).length).toBeGreaterThan(0);
    }
  });

  it('uses astro static output', () => {
    expect(config.output).toBe('static');
    expect(Object.keys(collections).sort()).toEqual(['cases', 'experiences', 'notes', 'projects']);
  });
});
