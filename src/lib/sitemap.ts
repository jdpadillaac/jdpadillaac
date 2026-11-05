import type { SitemapItem } from '@astrojs/sitemap';

export function includeInSitemap(page: string): boolean {
  const { pathname } = new URL(page);
  if (pathname === '/' || pathname === '/index.html') return false;
  if (pathname.includes('/contacto/enviado')) return false;
  if (pathname.includes('/proyectos')) return false;
  if (pathname === '/404/' || pathname === '/404.html') return false;
  return true;
}

export function serializeSitemapItem(item: SitemapItem): SitemapItem {
  if (!item.links?.length) return item;
  const links = item.links.map((link) => ({ ...link }));
  const english = links.find((link) => link.lang === 'en');
  if (english && !links.some((link) => link.lang === 'x-default')) {
    links.push({ lang: 'x-default', url: english.url });
  }
  return { ...item, links };
}
