// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://jdpadillac.com',
  trailingSlash: 'always',
  output: 'static',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);
        if (pathname === '/' || pathname === '/index.html') return false;
        if (pathname.includes('/contacto/enviado')) return false;
        if (pathname.includes('/proyectos')) return false;
        if (pathname === '/404/' || pathname === '/404.html') return false;
        return true;
      },
      i18n: {
        defaultLocale: 'en',
        locales: {
          es: 'es',
          en: 'en',
        },
      },
      serialize(item) {
        if (!item.links?.length) return item;
        const links = item.links.map((link) => ({ ...link }));
        const english = links.find((link) => link.lang === 'en');
        if (english && !links.some((link) => link.lang === 'x-default')) {
          links.push({ lang: 'x-default', url: english.url });
        }
        return { ...item, links };
      },
    }),
  ],
});
