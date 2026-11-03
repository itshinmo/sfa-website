import { describe, expect, it } from "vitest";
import { MockBlogRepository } from "~/modules/blog/infrastructure/mock-repository";
import { normalizeSearchText } from "~/shared/lib/normalize";

const repository = new MockBlogRepository();

describe("MockBlogRepository", () => {
  it("lists posts by locale", async () => {
    const result = await repository.listPosts({ locale: "fa" });

    expect(result.total).toBeGreaterThan(0);
    expect(result.items.every((post) => post.locale === "fa")).toBe(true);
    expect("content" in (result.items[0] ?? {})).toBe(false);
  });

  it("paginates", async () => {
    const result = await repository.listPosts({ locale: "fa", page: 1, pageSize: 2 });

    expect(result.pageSize).toBe(2);
    expect(result.items).toHaveLength(2);
    expect(result.totalPages).toBeGreaterThan(1);
  });

  it("filters by tag", async () => {
    const result = await repository.listPosts({ locale: "fa", tag: "soil" });

    expect(result.items.length).toBeGreaterThan(0);
    expect(
      result.items.every((post) => post.tags.some((tag) => tag.slug === "soil")),
    ).toBe(true);
  });

  it("matches all selected tags", async () => {
    const result = await repository.listPosts({
      locale: "en",
      tags: ["water", "research"],
    });

    expect(result.items.length).toBeGreaterThan(0);
    expect(
      result.items.every((post) =>
        ["water", "research"].every((tag) => post.tags.some((item) => item.slug === tag)),
      ),
    ).toBe(true);
  });

  it("searches Persian text with Arabic character variants", async () => {
    const result = await repository.listPosts({ locale: "fa", q: "خاك" });

    expect(result.total).toBeGreaterThan(0);
  });

  it("returns a fallback post with a marker", async () => {
    const post = await repository.getPost({
      locale: "en",
      slug: "مثلث-بافت-خاک",
      fallbackLocale: "fa",
    });

    expect(post?.isFallback).toBe(true);
    expect(post?.contentLocale).toBe("fa");
  });

  it("returns null for an unknown post", async () => {
    await expect(
      repository.getPost({ locale: "fa", slug: "does-not-exist" }),
    ).resolves.toBeNull();
  });

  it("returns tags and related posts", async () => {
    const tags = await repository.getTags("fa");
    const related = await repository.getRelatedPosts({
      locale: "fa",
      slug: "مثلث-بافت-خاک",
      limit: 2,
    });

    expect(tags.length).toBeGreaterThan(0);
    expect(related.length).toBeLessThanOrEqual(2);
    expect(related.every((post) => post.locale === "fa")).toBe(true);
  });

  it("uses the contract page size and exposes later pages", async () => {
    const first = await repository.listPosts({ locale: "en" });
    const second = await repository.listPosts({ locale: "en", page: 2 });

    expect(first.pageSize).toBe(9);
    expect(first.totalPages).toBeGreaterThan(1);
    expect(second.items.length).toBeGreaterThan(0);
    expect(second.items[0]?.id).not.toBe(first.items[0]?.id);
  });

  it("returns sitemap entries per locale", async () => {
    const entries = await repository.getSitemap("fa");

    expect(entries.length).toBeGreaterThan(0);
    expect(entries.every((entry) => entry.locale === "fa")).toBe(true);
    expect(entries[0]?.alternates.some((alternate) => alternate.locale === "en")).toBe(
      true,
    );
  });
});

describe("normalizeSearchText", () => {
  it("normalizes Arabic/Persian variants, diacritics and ZWNJ", () => {
    expect(normalizeSearchText("خاكِ زراعی‌")).toBe("خاک زراعی");
  });
});
