import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const papers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/papers' }),
  schema: () =>
    z.object({
      title: z.string(),
      authors: z.array(z.string()),
      venue: z.string().optional(),
      logo: z.string().optional(),
      subLogo: z.string().optional(),
      subLogoAlt: z.string().optional(),
      subLogoUrl: z.string().optional(),
      date: z.coerce.date(),
      type: z.enum(['thesis', 'preprint', 'journal', 'conference', 'workshop']),
      url: z.url().optional(),
      pdf: z.string().optional(),
      doi: z.string().optional(),
      abstract: z.string().optional(),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string(),
      repo: z.url().optional(),
      demo: z.url().optional(),
      tech: z.array(z.string()).default([]),
      image: image().optional(),
      thumb: z.string().optional(),
      /** Logo(s) shown as the card image instead of a thumbnail (for event/hackathon projects). */
      logo: z.string().optional(),
      subLogo: z.string().optional(),
      subLogoAlt: z.string().optional(),
      award: z.string().optional(),
      status: z.enum(['active', 'archived', 'wip']).default('active'),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      order: z.number().optional(),
    }),
});

export const collections = { papers, projects };
