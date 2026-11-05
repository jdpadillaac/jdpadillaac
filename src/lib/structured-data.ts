import { site } from '../data/site';
import type { Lang } from '../i18n/ui';
import { localePath } from '../i18n/paths';
import { absolute } from './url';

export function identityGraph(lang: Lang) {
  const personId = `${site.url}/#person`;
  const websiteId = `${site.url}/#website`;
  const home = absolute(localePath(lang, '/'));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: site.name,
        url: home,
        email: `mailto:${site.email}`,
        sameAs: [site.links.linkedin, site.links.github, site.links.x],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: site.name,
        url: home,
        inLanguage: ['es', 'en'],
        publisher: { '@id': personId },
      },
    ],
  };
}

export function breadcrumbGraph(items: { label: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absolute(item.href),
    })),
  };
}
