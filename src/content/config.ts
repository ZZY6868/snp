import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    /** Post title */
    title: z.string(),
    /** Short description for post card and SEO */
    description: z.string(),
    /** Publication date */
    pubDate: z.coerce.date(),
    /** Last updated date (optional) */
    updatedDate: z.coerce.date().optional(),
    /** Tags for categorization */
    tags: z.array(z.string()).default([]),
    /** Primary category */
    category: z.string().optional(),
    /** Hide from production when true */
    draft: z.boolean().default(false),
    /** Author override (optional) */
    author: z.string().optional(),
  }),
});

export const collections = { posts };
