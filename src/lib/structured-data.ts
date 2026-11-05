import { getImage } from 'astro:assets';
import profilePhoto from '../assets/images/profile.jpg';
import { copy } from '../data/copy';
import { site } from '../data/site';
import type { Lang } from '../i18n/ui';
import { homePath } from '../i18n/paths';
import { tx } from '../i18n/ui';
import { absolute } from './url';

const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;

export const stableIds = { personId, websiteId };

export async function personImageUrl(): Promise<string> {
  const optimized = await getImage({ src: profilePhoto, width: 800, height: 1013, format: 'jpg' });
  return absolute(optimized.src);
}

function personNode(lang: Lang, image: string, description: string, knowsAbout: string[]) {
  return {
    '@type': 'Person',
    '@id': personId,
    name: site.name,
    alternateName: 'jdpadillac',
    jobTitle: 'Senior Software Engineer',
    description,
    url: absolute(homePath(lang)),
    image,
    email: `mailto:${site.email}`,
    sameAs: [site.links.linkedin],
    knowsAbout,
    knowsLanguage: ['es', 'en'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Medellín',
      addressRegion: 'Antioquia',
      addressCountry: 'CO',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'SEEK',
    },
  };
}

function websiteNode(lang: Lang) {
  return {
    '@type': 'WebSite',
    '@id': websiteId,
    name: site.name,
    alternateName: 'jdpadillac',
    url: absolute(homePath(lang)),
    inLanguage: ['es', 'en'],
    publisher: { '@id': personId },
  };
}

export async function identityGraph(lang: Lang) {
  const image = await personImageUrl();
  const description = tx(lang, copy.about);
  const knowsAbout = [
    'Flutter',
    'Dart',
    'Java',
    'Spring Boot',
    'Go',
    'Angular',
    'Clean Architecture',
    'Design Systems',
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': [personNode(lang, image, description, knowsAbout), websiteNode(lang)],
  };
}

export type PageGraphInput = {
  lang: Lang;
  pathname: string;
  pageType: 'ProfilePage' | 'WebPage';
  title: string;
  description: string;
  dateModified: string;
  breadcrumbs?: { label: string; href: string }[];
  article?: {
    datePublished: string;
    dateModified: string;
    keywords: string[];
    about: string[];
  };
};

export async function pageGraph(input: PageGraphInput) {
  const image = await personImageUrl();
  const description = tx(input.lang, copy.about);
  const pageUrl = absolute(input.pathname);
  const webpageId = `${pageUrl}#webpage`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;

  const webpage: Record<string, unknown> = {
    '@type': input.pageType,
    '@id': webpageId,
    url: pageUrl,
    name: input.title,
    description: input.description,
    inLanguage: input.lang,
    isPartOf: { '@id': websiteId },
    about: { '@id': personId },
    dateModified: input.dateModified,
  };
  if (input.pageType === 'ProfilePage') {
    webpage.mainEntity = { '@id': personId };
  }

  const graph: Record<string, unknown>[] = [personNode(input.lang, image, description, input.article?.about ?? []), websiteNode(input.lang), webpage];

  if (input.breadcrumbs?.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: input.breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: absolute(item.href),
      })),
    });
  }

  if (input.article) {
    graph.push({
      '@type': 'Article',
      '@id': `${pageUrl}#article`,
      headline: input.title,
      description: input.description,
      author: { '@id': personId },
      datePublished: input.article.datePublished,
      dateModified: input.article.dateModified,
      inLanguage: input.lang,
      keywords: input.article.keywords.join(', '),
      about: input.article.about,
      mainEntityOfPage: { '@id': webpageId },
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

/** @deprecated Use pageGraph breadcrumbs instead */
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
