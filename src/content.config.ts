import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const text = z.object({
  es: z.string(),
  en: z.string(),
});

const result = z.object({
  value: text,
  label: text,
});

const experiences = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/experiences' }),
  schema: z.object({
    slug: z.string(),
    published: z.boolean().default(false),
    datePublished: z.string().default('2025-01-01'),
    dateModified: z.string().default('2025-11-05'),
    featured: z.boolean().default(false),
    order: z.number(),
    company: text,
    role: text,
    start: text,
    end: text,
    stack: z
      .object({
        es: z.array(z.string()),
        en: z.array(z.string()),
      })
      .optional(),
    team: text.optional(),
    title: text,
    summary: text,
    description: text,
    highlights: z
      .object({
        es: z.array(z.string()),
        en: z.array(z.string()),
      })
      .default({ es: [], en: [] }),
    stages: z
      .array(
        z.object({
          role: text,
          period: text,
          summary: text,
        }),
      )
      .default([]),
    results: z.array(result).default([]),
    context: text.optional(),
    roleNarrative: text.optional(),
    challenge: text.optional(),
    solution: text.optional(),
    learnings: text.optional(),
    heroAlt: text.optional(),
    gallery: z.array(z.object({ alt: text })).default([]),
    profiles: z.array(z.string()).default([]),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/notes' }),
  schema: z.object({
    slug: z.string(),
    translationKey: z.string(),
    lang: z.enum(['es', 'en']),
    published: z.boolean().default(false),
    datePublished: z.string(),
    dateModified: z.string(),
    title: z.string(),
    description: z.string(),
  }),
});

const cases = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/cases' }),
  schema: z.object({
    slug: z.string(),
    experienceSlug: z.string(),
    published: z.boolean().default(false),
    order: z.number(),
    title: text,
    summary: text,
    description: text,
    results: z.array(result).length(3),
    context: text,
    roleNarrative: text,
    challenge: text,
    solution: text,
    learnings: text,
    heroAlt: text,
    gallery: z.array(z.object({ alt: text })),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    summary: z.string(),
    descriptionEn: z.string().default('[Pendiente: traducción]'),
    summaryEn: z.string().default('[Pendiente: traducción]'),
    stack: z.array(z.string()),
    demoUrl: z.string().url().optional(),
    repoUrl: z.string().url(),
    secondaryRepoUrl: z.string().url().optional(),
    featured: z.boolean().default(true),
    published: z.boolean().default(true),
    order: z.number(),
    ogImage: z.string(),
    accent: z.string().default('#0F5C4D'),
  }),
});

export const collections = { experiences, cases, projects, notes };
