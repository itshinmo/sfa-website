import { z } from "zod";

export type HomeLocale = "fa" | "en";

const linkSchema = z.object({
  label: z.string().min(1),
  href: z.string().url(),
});

const sectionIntroSchema = {
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
};

export const homeContentSchema = z.object({
  locale: z.enum(["fa", "en"]),
  meta: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
  hero: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    titleAccent: z.string().min(1),
    description: z.string().min(1),
    primaryCta: z.string().min(1),
    secondaryCta: z.string().min(1),
    image: z.object({
      landscape: z.string().min(1),
      landscapeWebp: z.string().min(1),
      portrait: z.string().min(1),
      portraitWebp: z.string().min(1),
      alt: z.string().min(1),
    }),
    highlights: z.array(
      z.object({
        id: z.string().min(1),
        value: z.string().min(1),
        label: z.string().min(1),
      }),
    ),
  }),
  features: z.object({
    ...sectionIntroSchema,
    items: z.array(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
      }),
    ),
  }),
  showcase: z.object({
    ...sectionIntroSchema,
    steps: z.array(
      z.object({
        id: z.string().min(1),
        step: z.number().int().positive(),
        title: z.string().min(1),
        description: z.string().min(1),
      }),
    ),
    screens: z.array(
      z.object({
        id: z.string().min(1),
        src: z.string().min(1),
        webp: z.string().min(1).optional(),
        alt: z.string().min(1),
      }),
    ),
  }),
  research: z.object({
    ...sectionIntroSchema,
    stats: z.array(
      z.object({
        id: z.string().min(1),
        value: z.number(),
        display: z.string().min(1),
        unit: z.string(),
        label: z.string().min(1),
      }),
    ),
  }),
  achievements: z.object({
    ...sectionIntroSchema,
    items: z.array(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
      }),
    ),
  }),
  team: z.object({
    ...sectionIntroSchema,
    members: z.array(
      z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        role: z.string().min(1),
        bio: z.string().min(1),
        image: z.string().min(1),
        imageAlt: z.string().min(1),
        links: z.array(linkSchema),
      }),
    ),
  }),
  partners: z.object({
    ...sectionIntroSchema,
    items: z.array(
      z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        logo: z.string().min(1),
        logoAlt: z.string().min(1),
      }),
    ),
  }),
  faq: z.object({
    ...sectionIntroSchema,
    items: z.array(
      z.object({
        id: z.string().min(1),
        question: z.string().min(1),
        answer: z.string().min(1),
      }),
    ),
  }),
  contact: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    email: z.string().email(),
    phone: z.string().nullable(),
    location: z.string().min(1),
    hours: z.string().min(1),
  }),
  downloads: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    note: z.string().min(1),
    items: z.array(
      z.object({
        id: z.enum([
          "web",
          "google-play",
          "bazaar",
          "myket",
          "apk",
          "windows",
          "macos",
          "linux",
        ]),
        label: z.string().min(1),
        status: z.enum(["available", "placeholder"]),
        href: z.string().url().nullable(),
      }),
    ),
  }),
});

export type HomeContent = z.infer<typeof homeContentSchema>;
