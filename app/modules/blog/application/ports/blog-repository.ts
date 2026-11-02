import type {
  BlogListQuery,
  BlogListResult,
  BlogPost,
  BlogPostSummary,
  BlogSitemapEntry,
  BlogTag,
  Locale,
} from "../../domain/post";

export type GetBlogPostInput = {
  locale: Locale;
  slug: string;
  fallbackLocale?: Locale;
};

export type GetRelatedPostsInput = {
  locale: Locale;
  slug: string;
  limit?: number;
};

export interface BlogRepository {
  listPosts(query: BlogListQuery): Promise<BlogListResult>;
  getPost(input: GetBlogPostInput): Promise<BlogPost | null>;
  getTags(locale: Locale): Promise<BlogTag[]>;
  getRelatedPosts(input: GetRelatedPostsInput): Promise<BlogPostSummary[]>;
  getSitemap(locale: Locale): Promise<BlogSitemapEntry[]>;
}
