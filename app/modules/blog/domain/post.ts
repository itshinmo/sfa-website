export const BLOG_TEMPLATES = ["reference", "narrative", "simple", "case-study"] as const;

export type BlogTemplate = (typeof BLOG_TEMPLATES)[number];

export type Locale = "fa" | "en";

export type BlogImage = {
  url: string;
  alt: string;
  width: number;
  height: number;
  srcSet?: string;
};

export type InlineText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  href?: string;
};

export type ParagraphBlock = {
  type: "paragraph";
  content: InlineText[];
};

export type HeadingBlock = {
  type: "heading";
  level: 2 | 3;
  text: string;
  id?: string;
};

export type ImageBlock = {
  type: "image";
  image: BlogImage;
  caption?: string;
};

export type QuoteBlock = {
  type: "quote";
  content: InlineText[];
  cite?: string;
};

export type ListBlock = {
  type: "list";
  ordered: boolean;
  items: InlineText[][];
};

export type NarrativeBlock =
  ParagraphBlock | HeadingBlock | ImageBlock | QuoteBlock | ListBlock;

export type ReferenceSection = {
  title: string;
  subsections: {
    title: string;
    paragraphs: ParagraphBlock[];
    management?: ParagraphBlock;
  }[];
};

export type ReferenceContent = {
  type: "reference";
  intro: ParagraphBlock[];
  sections: ReferenceSection[];
};

export type NarrativeContent = {
  type: "narrative";
  intro: ParagraphBlock[];
  blocks: NarrativeBlock[];
};

export type SimpleContent = {
  type: "simple";
  intro: ParagraphBlock[];
  sections: {
    title: string;
    paragraphs: ParagraphBlock[];
  }[];
};

export type CaseStudyContent = {
  type: "case-study";
  challenge: ParagraphBlock[];
  solution: ParagraphBlock[];
  results: {
    label: string;
    value: string;
    description?: string;
  }[];
  gallery: BlogImage[];
  cta?: {
    label: string;
    href: string;
  };
};

export type BlogContent =
  ReferenceContent | NarrativeContent | SimpleContent | CaseStudyContent;

export type BlogAlternate = {
  locale: Locale;
  slug: string;
};

export type BlogSeo = {
  title?: string;
  description?: string;
  ogImage?: string;
  noindex?: boolean;
};

export type BlogAuthor = {
  name: string;
  avatarUrl?: string;
};

export type BlogPostSummary = {
  id: string;
  slug: string;
  locale: Locale;
  translationKey: string;
  title: string;
  excerpt: string;
  cover: BlogImage;
  template: BlogTemplate;
  tags: { slug: string; label: string }[];
  author?: BlogAuthor;
  publishedAt: string;
  updatedAt: string;
  readingTimeMinutes: number;
  seo?: BlogSeo;
  alternates: BlogAlternate[];
  /** Locale actually returned when the requested translation was unavailable. */
  contentLocale?: Locale;
  isFallback?: boolean;
};

export type BlogPost = BlogPostSummary & {
  content: BlogContent;
};

export type BlogListQuery = {
  locale: Locale;
  page?: number;
  pageSize?: number;
  tag?: string;
  q?: string;
};

export type BlogListResult = {
  items: BlogPostSummary[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type BlogTag = {
  slug: string;
  label: string;
  count: number;
};

export type BlogSitemapEntry = {
  slug: string;
  locale: Locale;
  updatedAt: string;
  alternates: BlogAlternate[];
};
