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

import ProjectDetailPage from '../../src/views/ProjectDetailPage.astro';
import ProjectsIndexPage from '../../src/views/ProjectsIndexPage.astro';
import { publishedProjects } from '../../src/lib/content';
import { page } from '../helpers/render';

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
    const html = await page(ProjectsIndexPage, { lang: 'en' });
    expect(html).toContain('English summary');
  });

  it('uses the english description on the project page', async () => {
    const html = await page(ProjectDetailPage, { lang: 'en', proyecto: 'translated' });
    expect(html).toContain('English description (Translated)');
    expect(html).toContain('English summary');
    expect(html).not.toContain('class="prose"');
  });
});
