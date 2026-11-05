import { getCollection, type CollectionEntry } from 'astro:content';

export async function publishedExperiences() {
  const entries = await getCollection('experiences', ({ data }) => data.published === true);
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export async function publishedCases() {
  const experiences = await publishedExperiences();
  const allowed = new Set(experiences.map((entry) => entry.data.slug));
  const entries = await getCollection(
    'cases',
    ({ data }) => data.published === true && allowed.has(data.experienceSlug),
  );
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export async function publishedProjects() {
  const entries = await getCollection('projects', ({ data }) => data.published !== false);
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export function projectsForProfile(
  match: readonly string[],
  projects: CollectionEntry<'projects'>[],
) {
  const keys = new Set(match);
  return projects.filter((project) => project.data.stack.some((item) => keys.has(item.toLowerCase())));
}
