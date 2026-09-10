import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const parishUpdates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/parish-updates' }),
  schema: z.object({
    publicationDate: z.coerce.date(),
    categoryAmharic: z.string(),
    categoryEnglish: z.string(),
    titleAmharic: z.string(),
    titleEnglish: z.string(),
    eventDateAmharic: z.string().optional(),
    eventDateEnglish: z.string().optional(),
    summaryAmharic: z.string().optional(),
    summaryEnglish: z.string().optional(),
    photos: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
      position: z.string().optional(),
    })).min(1),
    scriptureReference: z.string().optional(),
    scriptureAmharic: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { parishUpdates };
