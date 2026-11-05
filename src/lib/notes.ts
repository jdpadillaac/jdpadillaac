import { getCollection } from 'astro:content';

export async function publishedNotes() {
  const entries = await getCollection('notes', ({ data }) => data.published === true);
  return entries.sort((a, b) => b.data.datePublished.localeCompare(a.data.datePublished));
}
