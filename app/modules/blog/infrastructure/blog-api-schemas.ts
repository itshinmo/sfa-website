import { z } from "zod";

export const localeSchema = z.enum(["fa", "en"]);
export const templateSchema = z.enum(["reference", "narrative", "simple", "case-study"]);

/** ISO 8601 datetime with an optional timezone (Z, ±HH:MM, or local). */
export const isoDateTimeSchema = z.iso.datetime({ offset: true, local: true });

export const blogImageSchema = z.object({
  url: z.string().min(1),
  alt: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  srcSet: z.string().optional(),
});

export const inlineTextSchema = z.object({
  text: z.string(),
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
  code: z.boolean().optional(),
  href: z.string().optional(),
});

const paragraphSchema = z.object({
  type: z.literal("paragraph"),
  content: z.array(inlineTextSchema),
});

const headingSchema = z.object({
  type: z.literal("heading"),
  level: z.union([z.literal(2), z.literal(3)]),
  text: z.string(),
  id: z.string().optional(),
});

const imageBlockSchema = z.object({
  type: z.literal("image"),
  image: blogImageSchema,
  caption: z.string().optional(),
});

const quoteSchema = z.object({
  type: z.literal("quote"),
  content: z.array(inlineTextSchema),
  cite: z.string().optional(),
});

const listSchema = z.object({
  type: z.literal("list"),
  ordered: z.boolean(),
  items: z.array(z.array(inlineTextSchema)),
});

const narrativeBlockSchema = z.discriminatedUnion("type", [
  paragraphSchema,
  headingSchema,
  imageBlockSchema,
  quoteSchema,
  listSchema,
]);

const referenceContentSchema = z.object({
  type: z.literal("reference"),
  intro: z.array(paragraphSchema),
  sections: z.array(
    z.object({
      title: z.string(),
      subsections: z.array(
        z.object({
          title: z.string(),
          paragraphs: z.array(paragraphSchema),
          management: paragraphSchema.optional(),
        }),
      ),
    }),
  ),
});

const narrativeContentSchema = z.object({
  type: z.literal("narrative"),
  intro: z.array(paragraphSchema),
  blocks: z.array(narrativeBlockSchema),
});

const simpleContentSchema = z.object({
  type: z.literal("simple"),
  intro: z.array(paragraphSchema),
  sections: z.array(
    z.object({
      title: z.string(),
      paragraphs: z.array(paragraphSchema),
    }),
  ),
});

const caseStudyContentSchema = z.object({
  type: z.literal("case-study"),
  challenge: z.array(paragraphSchema),
  solution: z.array(paragraphSchema),
  results: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      description: z.string().optional(),
    }),
  ),
  gallery: z.array(blogImageSchema),
  cta: z
    .object({
      label: z.string(),
      href: z.string(),
    })
    .optional(),
});

export const blogContentSchema = z.discriminatedUnion("type", [
  referenceContentSchema,
  narrativeContentSchema,
  simpleContentSchema,
  caseStudyContentSchema,
]);

export const blogAlternateSchema = z.object({
  locale: localeSchema,
  slug: z.string(),
});

export const blogSummarySchema = z.object({
  id: z.string(),
  slug: z.string(),
  locale: localeSchema,
  translationKey: z.string(),
  title: z.string(),
  excerpt: z.string(),
  cover: blogImageSchema,
  template: templateSchema,
  tags: z.array(z.object({ slug: z.string(), label: z.string() })),
  author: z
    .object({
      name: z.string(),
      avatarUrl: z.string().optional(),
    })
    .optional(),
  publishedAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
  readingTimeMinutes: z.number().nonnegative(),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      ogImage: z.string().optional(),
      noindex: z.boolean().optional(),
    })
    .optional(),
  alternates: z.array(blogAlternateSchema),
  contentLocale: localeSchema.optional(),
  isFallback: z.boolean().optional(),
});

export const blogPostSchema = blogSummarySchema.extend({
  content: blogContentSchema,
});

export const blogListResponseSchema = z.object({
  items: z.array(blogSummarySchema),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
});

export const blogTagSchema = z.object({
  slug: z.string(),
  label: z.string(),
  count: z.number().int().nonnegative(),
});

export const blogTagsResponseSchema = z.array(blogTagSchema);

export const blogSitemapResponseSchema = z.array(
  z.object({
    slug: z.string(),
    locale: localeSchema,
    updatedAt: isoDateTimeSchema,
    alternates: z.array(blogAlternateSchema),
  }),
);

export const blogApiErrorSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
});
