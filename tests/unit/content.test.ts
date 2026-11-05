import { beforeEach, describe, expect, it, vi } from 'vitest';

const { store } = vi.hoisted(() => {
  const store: Record<string, Array<{ data: Record<string, unknown> }>> = {
    experiences: [],
    cases: [],
    projects: [],
  };
  return { store };
});

vi.mock('astro:content', () => ({
  getCollection: vi.fn(async (name: string, filter?: (entry: { data: Record<string, unknown> }) => boolean) => {
    const items = store[name] ?? [];
    return typeof filter === 'function' ? items.filter(filter) : items;
  }),
}));

import { projectsForProfile, publishedCases, publishedExperiences, publishedProjects } from '../../src/lib/content';

describe('content queries', () => {
  beforeEach(() => {
    store.experiences = [];
    store.cases = [];
    store.projects = [];
  });

  it('returns published experiences and cases sorted by order', async () => {
    store.experiences = [
      { data: { published: true, order: 3, slug: 'waco' } },
      { data: { published: false, order: 1, slug: 'draft' } },
      { data: { published: true, order: 1, slug: 'seek' } },
    ];
    store.cases = [
      { data: { published: true, order: 2, experienceSlug: 'seek', slug: 'later' } },
      { data: { published: true, order: 1, experienceSlug: 'missing', slug: 'orphan' } },
      { data: { published: false, order: 0, experienceSlug: 'seek', slug: 'hidden' } },
      { data: { published: true, order: 1, experienceSlug: 'waco', slug: 'first' } },
    ];

    await expect(publishedExperiences()).resolves.toEqual([store.experiences[2], store.experiences[0]]);
    await expect(publishedCases()).resolves.toEqual([store.cases[3], store.cases[0]]);
  });

  it('keeps projects unless they are explicitly unpublished', async () => {
    store.projects = [
      { data: { published: false, order: 1, stack: ['Java'] } },
      { data: { order: 3, stack: ['Flutter'] } },
      { data: { published: true, order: 2, stack: ['Go'] } },
    ];

    await expect(publishedProjects()).resolves.toEqual([store.projects[2], store.projects[1]]);
  });

  it('matches profile keywords against the project stack', () => {
    const projects = [
      { data: { stack: ['Flutter', 'Dart'] } },
      { data: { stack: ['Java'] } },
      { data: { stack: [] } },
    ];

    expect(projectsForProfile(['flutter'], projects as never)).toEqual([projects[0]]);
    expect(projectsForProfile(['spring boot'], projects as never)).toEqual([]);
    expect(projectsForProfile([], projects as never)).toEqual([]);
  });
});
