import type { SitemapItem } from '@astrojs/sitemap';
import { cvAvailable } from '../data/cv';

const buildDate = process.env.SITE_LASTMOD ?? new Date().toISOString().slice(0, 10);

export function includeInSitemap(page: string): boolean {
  const { pathname } = new URL(page);
  if (pathname === '/' || pathname === '/index.html') return false;
  if (pathname.includes('/enviado/') || pathname.includes('/contact/sent/')) return false;
  if (pathname.includes('/proyectos') || pathname.includes('/projects')) return false;
  if (pathname.includes('/og/')) return false;
  if (pathname === '/404/' || pathname === '/404.html') return false;
  if (pathname.endsWith('/cv/')) {
    return cvAvailable('es') || cvAvailable('en');
  }
  return true;
}

export function serializeSitemapItem(item: SitemapItem): SitemapItem {
  const withLastmod = { ...item, lastmod: item.lastmod ?? buildDate };
  if (!withLastmod.links?.length) return withLastmod;
  const links = withLastmod.links.map((link) => ({ ...link }));
  const spanish = links.find((link) => link.lang === 'es');
  if (spanish && !links.some((link) => link.lang === 'x-default')) {
    links.push({ lang: 'x-default', url: spanish.url });
  }
  return { ...withLastmod, links };
}
