import { normalizeSearchText } from "~/shared/lib/normalize";
import type { BlogRepository } from "../application/ports/blog-repository";
import type {
  BlogListQuery,
  BlogListResult,
  BlogPost,
  BlogPostSummary,
  BlogSitemapEntry,
  BlogTag,
  Locale,
} from "../domain/post";
import { mockPosts } from "./mock-data";

const DEFAULT_PAGE_SIZE = 9;

function toSummary(post: BlogPost): BlogPostSummary {
  const { content: _content, ...summary } = post;
  return summary;
}

function sortByPublishedAtDesc(a: BlogPost, b: BlogPost) {
  return b.publishedAt.localeCompare(a.publishedAt);
}

export class MockBlogRepository implements BlogRepository {
  constructor(private readonly posts: BlogPost[] = mockPosts) {}

  async listPosts(query: BlogListQuery): Promise<BlogListResult> {
    const pageSize = Math.min(Math.max(query.pageSize ?? DEFAULT_PAGE_SIZE, 1), 50);
    const page = Math.max(query.page ?? 1, 1);
    const search = query.q ? normalizeSearchText(query.q) : "";

    const filtered = this.posts
      .filter((post) => post.locale === query.locale)
      .filter((post) => !query.tag || post.tags.some((tag) => tag.slug === query.tag))
      .filter((post) => {
        if (!search) return true;
        const haystack = normalizeSearchText(
          [post.title, post.excerpt, post.tags.map((tag) => tag.label).join(" ")].join(
            " ",
          ),
        );
        return haystack.includes(search);
      })
      .sort(sortByPublishedAtDesc);

    const total = filtered.length;
    const totalPages = total === 0 ? 0 : Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;

    return {
      items: filtered.slice(start, start + pageSize).map(toSummary),
      page,
      pageSize,
      total,
      totalPages,
    };
  }

  async getPost({
    locale,
    slug,
    fallbackLocale,
  }: {
    locale: Locale;
    slug: string;
    fallbackLocale?: Locale;
  }): Promise<BlogPost | null> {
    const exact = this.posts.find((post) => post.locale === locale && post.slug === slug);
    if (exact) return exact;

    if (!fallbackLocale || fallbackLocale === locale) return null;

    const fallback = this.posts.find(
      (post) => post.locale === fallbackLocale && post.slug === slug,
    );

    return fallback
      ? { ...fallback, contentLocale: fallback.locale, isFallback: true }
      : null;
  }

  async getTags(locale: Locale): Promise<BlogTag[]> {
    const counts = new Map<string, BlogTag>();

    for (const post of this.posts.filter((item) => item.locale === locale)) {
      for (const tag of post.tags) {
        const current = counts.get(tag.slug);
        counts.set(tag.slug, {
          slug: tag.slug,
          label: tag.label,
          count: (current?.count ?? 0) + 1,
        });
      }
    }

    return [...counts.values()].sort(
      (a, b) => b.count - a.count || a.label.localeCompare(b.label, locale),
    );
  }

  async getRelatedPosts({
    locale,
    slug,
    limit = 3,
  }: {
    locale: Locale;
    slug: string;
    limit?: number;
  }): Promise<BlogPostSummary[]> {
    const current = this.posts.find(
      (post) => post.locale === locale && post.slug === slug,
    );
    if (!current) return [];

    const currentTags = new Set(current.tags.map((tag) => tag.slug));

    return this.posts
      .filter((post) => post.locale === locale && post.slug !== slug)
      .map((post) => ({
        post,
        overlap: post.tags.filter((tag) => currentTags.has(tag.slug)).length,
      }))
      .sort((a, b) => b.overlap - a.overlap || sortByPublishedAtDesc(a.post, b.post))
      .slice(0, limit)
      .map(({ post }) => toSummary(post));
  }

  async getSitemap(locale: Locale): Promise<BlogSitemapEntry[]> {
    return this.posts
      .filter((post) => post.locale === locale)
      .sort(sortByPublishedAtDesc)
      .map((post) => ({
        slug: post.slug,
        locale: post.locale,
        updatedAt: post.updatedAt,
        alternates: post.alternates,
      }));
  }
}
