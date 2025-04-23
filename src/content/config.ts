import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('Oscar'),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft : z.boolean().default(false)
  })
});

export const collections = {
  'blog': blogCollection
};
