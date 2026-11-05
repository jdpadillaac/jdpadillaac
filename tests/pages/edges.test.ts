import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../src/lib/content', () => ({
  publishedExperiences: vi.fn(),
  publishedCases: vi.fn(),
  publishedProjects: vi.fn(),
  projectsForProfile: vi.fn(),
}));

import CaseDetailPage from '../../src/views/CaseDetailPage.astro';
import ExperienceDetailPage from '../../src/views/ExperienceDetailPage.astro';
import ExperienceIndexPage from '../../src/views/ExperienceIndexPage.astro';
import HomePage from '../../src/views/HomePage.astro';
import { publishedCases, publishedExperiences } from '../../src/lib/content';
import { page } from '../helpers/render';

const home = HomePage;
const experiences = ExperienceIndexPage;

const text = (value: string) => ({ es: value, en: value });

function entry(overrides: Record<string, unknown> = {}) {
  const slug = String(overrides.slug ?? 'acme');
  return {
    id: slug,
    data: {
      slug,
      published: true,
      datePublished: '2020-01-01',
      dateModified: '2024-01-01',
      featured: false,
      order: 1,
      company: text('Acme'),
      role: text('Engineer'),
      start: text('2020'),
      end: text('2024'),
      title: text('Title'),
      summary: text('Summary'),
      description: text('Description'),
      highlights: { es: [], en: [] },
      stages: [],
      results: [],
      gallery: [],
      ...overrides,
    },
  };
}

describe('page branches the published content does not hit', () => {
  beforeEach(() => {
    vi.mocked(publishedExperiences).mockResolvedValue([]);
    vi.mocked(publishedCases).mockResolvedValue([]);
  });

  it('skips the experience block when nothing is published', async () => {
    const html = await page(home, { lang: 'es' });
    expect(html).toContain('Mobile / Flutter');
    expect(html).not.toContain('id="experiencia"');
  });

  it('uses the first experience when none is featured', async () => {
    vi.mocked(publishedExperiences).mockResolvedValue([entry({ slug: 'solo', company: text('Solo') })] as never);
    const html = await page(home, { lang: 'en' });
    expect(html).toContain('Solo');
    expect(html).toContain('h-feature');
    expect(html).toContain('h-checks');
    expect(html).not.toContain('h-others');
  });

  it('uses fixed home highlights and feature chips', async () => {
    vi.mocked(publishedExperiences).mockResolvedValue([
      entry({
        slug: 'main',
        featured: true,
        company: text('Main'),
        stack: { es: [], en: [] },
        highlights: { es: ['One', 'Two', 'Three', 'Four'], en: ['One', 'Two', 'Three', 'Four'] },
      }),
      entry({ slug: 'next', order: 2, company: text('Next') }),
    ] as never);

    const html = await page(home, { lang: 'es' });
    expect(html).toContain('Atomic Design');
    expect(html).not.toContain('Four');
    expect(html).toContain('h-others');
    expect(html).toContain('Next');
  });

  it('lists child cases only for the matching experience', async () => {
    const empty = await page(experiences, { lang: 'es' });
    expect(empty).not.toContain('other-list');

    vi.mocked(publishedExperiences).mockResolvedValue([
      entry({ slug: 'seek', company: text('SEEK') }),
      entry({ slug: 'waco', order: 2, company: text('WACO') }),
    ] as never);
    vi.mocked(publishedCases).mockResolvedValue([
      { data: { experienceSlug: 'seek', slug: 'push', title: text('Push') } },
      { data: { experienceSlug: 'other', slug: 'nope', title: text('Nope') } },
    ] as never);

    const html = await page(experiences, { lang: 'en' });
    expect(html).toContain('/en/experience/seek/cases/push/');
    expect(html).toContain('Push');
    expect(html).not.toContain('Nope');
    expect(html).toContain('WACO');
  });

  it('renders optional experience fields and a related case', async () => {
    const rich = entry({
      slug: 'rich',
      company: text('Rich Co'),
      stack: { es: ['Go'], en: ['Go'] },
      team: text('Squad'),
      context: text('Context body'),
      roleNarrative: text('Role body'),
      challenge: text('Challenge body'),
      solution: text('Solution body'),
      learnings: text('Learning body'),
      heroAlt: text('Hero alt'),
      highlights: { es: ['Highlight'], en: ['Highlight'] },
      stages: [{ role: text('Lead'), period: text('2021'), summary: text('Stage summary') }],
      results: [{ value: text('10'), label: text('deploys') }],
      gallery: [{ alt: text('Gallery shot') }],
    });
    const bare = entry({ slug: 'bare', order: 2, company: text('Bare Co') });
    vi.mocked(publishedExperiences).mockResolvedValue([rich, bare] as never);
    vi.mocked(publishedCases).mockResolvedValue([
      {
        data: {
          slug: 'caso',
          experienceSlug: 'rich',
          title: text('Case title'),
          summary: text('Case summary'),
          description: text('Case description'),
          context: text('Case context'),
          roleNarrative: text('Case role'),
          challenge: text('Case challenge'),
          solution: text('Case solution'),
          learnings: text('Case learnings'),
          heroAlt: text('Case hero'),
          results: [1, 2, 3].map((n) => ({ value: text(String(n)), label: text(`result ${n}`) })),
          gallery: [{ alt: text('Shot') }],
        },
      },
    ] as never);

    const richHtml = await page(ExperienceDetailPage, { lang: 'es', empresa: 'rich' });
    const bareHtml = await page(ExperienceDetailPage, { lang: 'en', empresa: 'bare' });

    expect(richHtml).toContain('id="contexto"');
    expect(richHtml).toContain('id="rol"');
    expect(richHtml).toContain('id="problema"');
    expect(richHtml).toContain('id="decisiones"');
    expect(richHtml).toContain('Squad');
    expect(richHtml).toContain('Hero alt');
    expect(richHtml).toContain('Learning body');
    expect(richHtml).toContain('Gallery shot');
    expect(richHtml).toContain('/es/experiencia/rich/casos/caso/');
    expect(bareHtml).not.toContain('id="contexto"');
    expect(bareHtml).not.toContain('>Equipo<');
    expect(bareHtml).toContain('Rich Co');

    const html = await page(CaseDetailPage, { lang: 'en', empresa: 'rich', proyecto: 'caso' });
    expect(html).toContain('Case title');
    expect(html).toContain('Case context');
    expect(html).toContain('Case hero');
    expect(html).toContain('Shot');
    expect(html).toContain('Rich Co');
  });
});
