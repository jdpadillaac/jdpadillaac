import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    summary: z.string(),
    stack: z.array(z.string()),
    demoUrl: z.string().url().optional(),
    repoUrl: z.string().url(),
    secondaryRepoUrl: z.string().url().optional(),
    featured: z.boolean().default(true),
    order: z.number(),
    ogImage: z.string(),
    accent: z.string().default('#c17f59'),
  }),
});

export const collections = { projects };
