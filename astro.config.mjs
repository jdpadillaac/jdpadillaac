// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { includeInSitemap, serializeSitemapItem } from './src/lib/sitemap.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://jdpadillac.com',
  trailingSlash: 'always',
  output: 'static',
  integrations: [
    mdx(),
    sitemap({
      filter: includeInSitemap,
      i18n: {
        defaultLocale: 'en',
        locales: {
          es: 'es',
          en: 'en',
        },
      },
      serialize: serializeSitemapItem,
    }),
  ],
});
