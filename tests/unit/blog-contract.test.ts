import { describe, expect, it } from "vitest";
import {
  blogPostSchema,
  blogSitemapResponseSchema,
  blogSummarySchema,
  isoDateTimeSchema,
} from "~/modules/blog/infrastructure/blog-api-schemas";
import { mockPosts } from "~/modules/blog/infrastructure/mock-data";

function summaryOf(post: (typeof mockPosts)[number]) {
  const { content: _content, ...summary } = post;
  return summary;
}

describe("blog API contract", () => {
  it("validates every fixture as a post", () => {
    for (const post of mockPosts) {
      expect(() => blogPostSchema.parse(post)).not.toThrow();
    }
  });

  it("validates every fixture summary without content", () => {
    for (const post of mockPosts) {
      expect(() => blogSummarySchema.parse(summaryOf(post))).not.toThrow();
    }
  });

  it("accepts ISO datetimes with or without a timezone", () => {
    expect(isoDateTimeSchema.safeParse("2026-02-20T08:00:00.000Z").success).toBe(true);
    expect(isoDateTimeSchema.safeParse("2026-02-20T08:00:00+03:30").success).toBe(true);
    expect(isoDateTimeSchema.safeParse("2026-02-20T08:00:00").success).toBe(true);
  });

  it("rejects unparseable and non-ISO dates in summaries", () => {
    const summary = summaryOf(mockPosts[0]);

    expect(
      blogSummarySchema.safeParse({ ...summary, publishedAt: "not-a-date" }).success,
    ).toBe(false);
    expect(
      blogSummarySchema.safeParse({ ...summary, updatedAt: "2026-02-20" }).success,
    ).toBe(false);
  });

  it("rejects invalid sitemap updatedAt values", () => {
    const entry = {
      slug: "soil-texture-triangle",
      locale: "en" as const,
      updatedAt: "not-a-date",
      alternates: [{ locale: "en" as const, slug: "soil-texture-triangle" }],
    };

    expect(blogSitemapResponseSchema.safeParse([entry]).success).toBe(false);
    expect(
      blogSitemapResponseSchema.safeParse([
        { ...entry, updatedAt: "2026-02-20T08:00:00.000Z" },
      ]).success,
    ).toBe(true);
  });

  it("covers all four templates", () => {
    const templates = new Set(mockPosts.map((post) => post.template));

    expect(templates).toEqual(
      new Set(["reference", "narrative", "simple", "case-study"]),
    );
  });
});
