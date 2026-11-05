import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';

const dist = path.join(process.cwd(), 'dist');
const forbidden = /\b(ingeniero|graduado|fluido|bilingüe|payments architect)\b/i;
const siteOrigin = 'https://jdpadillac.com';

function cvAvailable(lang) {
  return fs.existsSync(path.join(process.cwd(), 'public', 'cv', lang === 'es' ? 'jonatan-padilla-es.pdf' : 'jonatan-padilla-en.pdf'));
}

function includeInSitemap(page) {
  const { pathname } = new URL(page);
  if (pathname === '/' || pathname === '/index.html') return false;
  if (pathname.includes('/enviado/') || pathname.includes('/contact/sent/')) return false;
  if (pathname.includes('/proyectos') || pathname.includes('/projects')) return false;
  if (pathname.includes('/og/')) return false;
  if (pathname === '/404/' || pathname === '/404.html') return false;
  if (pathname.endsWith('/cv/')) return cvAvailable('es') || cvAvailable('en');
  return true;
}

function walkHtml(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, files);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function pathnameFromFile(file) {
  const rel = path.relative(dist, file).replace(/index\.html$/, '');
  return `/${rel}`.replace(/\\/g, '/').replace(/\/{2,}/g, '/');
}

function errorsForHtml(file) {
  const html = fs.readFileSync(file, 'utf8');
  const root = parse(html);
  const issues = [];
  const pathname = pathnameFromFile(file);
  const robots = root.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '';
  const noindex = robots.includes('noindex');

  const ld = root.querySelector('script[type="application/ld+json"]');
  if (ld) {
    try {
      JSON.parse(ld.text);
    } catch {
      issues.push('JSON-LD inválido');
    }
  }

  const lang = root.querySelector('html')?.getAttribute('lang');
  if (lang !== 'es' && lang !== 'en' && pathname !== '/404/') {
    issues.push(`lang inesperado: ${lang}`);
  }

  const title = root.querySelector('title')?.text.trim() ?? '';
  if (!title.includes('Jonatan Padilla') && pathname !== '/404/') {
    issues.push('title sin Jonatan Padilla');
  }

  const description = root.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
  if (!noindex && (description.length < 120 || description.length > 170)) {
    issues.push(`description fuera de rango (${description.length})`);
  }

  const canonical = root.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '';
  if (!noindex) {
    if (!canonical.startsWith(siteOrigin)) issues.push('canonical no absoluto');
    if (canonical.includes('?')) issues.push('canonical con parámetros');
  }

  const hreflangs = root.querySelectorAll('link[rel="alternate"][hreflang]').map((node) => ({
    code: node.getAttribute('hreflang'),
    href: node.getAttribute('href'),
  }));
  if (!noindex && (pathname.startsWith('/es/') || pathname.startsWith('/en/'))) {
    const codes = new Set(hreflangs.map((item) => item.code));
    if (!codes.has('es') || !codes.has('en') || !codes.has('x-default')) {
      issues.push('hreflang incompleto');
    }
  }

  const h1Count = root.querySelectorAll('h1').length;
  if (h1Count !== 1) issues.push(`h1 count=${h1Count}`);

  const ogImage = root.querySelector('meta[property="og:image"]')?.getAttribute('content') ?? '';
  if (!noindex && !ogImage.endsWith('.png')) issues.push('og:image no es PNG');

  if (!noindex && (html.includes('TODO:') || html.includes('[Pendiente') || html.includes('[Titular'))) {
    issues.push('placeholder en página indexable');
  }

  if (!noindex && forbidden.test(html.replace(/<script[\s\S]*?<\/script>/gi, ''))) {
    issues.push('palabra prohibida en HTML visible');
  }

  if (html.includes('alumniOf')) issues.push('alumniOf presente');

  return { pathname, noindex, issues };
}

const htmlFiles = walkHtml(dist);
const sitemap = fs.readFileSync(path.join(dist, 'sitemap-0.xml'), 'utf8');
const failures = [];

for (const file of htmlFiles) {
  const { pathname, noindex, issues } = errorsForHtml(file);
  if (pathname === '/' || pathname === '/index.html') continue;
  if (issues.length) failures.push({ pathname, issues });
  const url = `${siteOrigin}${pathname}`;
  if (noindex && sitemap.includes(`<loc>${url}</loc>`)) {
    failures.push({ pathname, issues: ['noindex listada en sitemap'] });
  }
  if (!noindex && includeInSitemap(url) && !sitemap.includes(`<loc>${url}</loc>`)) {
    failures.push({ pathname, issues: ['indexable ausente del sitemap'] });
  }
}

if (failures.length) {
  console.error('SEO check failed:');
  for (const item of failures) {
    console.error(`- ${item.pathname}: ${item.issues.join('; ')}`);
  }
  process.exit(1);
}

console.log(`SEO check passed for ${htmlFiles.length} HTML files.`);
