import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('astro:content', () => ({
  render: vi.fn(async () => {
    const body = await import('../fixtures/Body.astro');
    return { Content: body.default };
  }),
}));

vi.mock('../../src/lib/content', () => ({
  publishedProjects: vi.fn(),
  publishedExperiences: vi.fn(async () => []),
  publishedCases: vi.fn(async () => []),
  projectsForProfile: vi.fn(() => []),
}));

import * as detailNs from '../../src/pages/[lang]/proyectos/[proyecto].astro';
import * as indexNs from '../../src/pages/[lang]/proyectos/index.astro';
import { publishedProjects } from '../../src/lib/content';
import { page } from '../helpers/render';

const index = indexNs as unknown as { default: Parameters<typeof page>[0] };
const detail = detailNs as unknown as {
  default: Parameters<typeof page>[0];
  getStaticPaths: () => Promise<Array<{ params: Record<string, string> }>>;
};

const project = {
  id: 'translated',
  data: {
    title: 'Translated',
    description: 'Descripción en español',
    summary: 'Resumen en español',
    descriptionEn: 'English description',
    summaryEn: 'English summary',
    stack: ['Go'],
    repoUrl: 'https://github.com/example/app',
    ogImage: '/og/translated.svg',
  },
};

describe('projects with an english translation', () => {
  beforeEach(() => {
    vi.mocked(publishedProjects).mockResolvedValue([project] as never);
  });

  it('shows the english summary on the index', async () => {
    const html = await page(index.default, { lang: 'en' });
    expect(html).toContain('English summary');
  });

  it('uses the english description on the project page', async () => {
    await expect(detail.getStaticPaths()).resolves.toEqual([
      { params: { lang: 'es', proyecto: 'translated' } },
      { params: { lang: 'en', proyecto: 'translated' } },
    ]);
    const html = await page(detail.default, { lang: 'en', proyecto: 'translated' });
    expect(html).toContain('English description (Translated)');
    expect(html).toContain('English summary');
    expect(html).not.toContain('class="prose"');
  });
});
