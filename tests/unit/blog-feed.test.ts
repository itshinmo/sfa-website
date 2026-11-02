import { describe, expect, it } from "vitest";
import type { BlogPostSummary } from "~/modules/blog/domain/post";
import { mockPosts } from "~/modules/blog/infrastructure/mock-data";
import {
  absoluteUrl,
  buildRssXml,
  buildSitemapXml,
  escapeXml,
  postPath,
} from "~/modules/blog/presentation/feed";

const siteUrl = "https://sfa.example";

function summary(post: (typeof mockPosts)[number]): BlogPostSummary {
  const { content: _content, ...rest } = post;
  return rest;
}

describe("feed helpers", () => {
  it("escapes XML entities", () => {
    expect(escapeXml(`Soil & water < "roots" > 'yield'`)).toBe(
      "Soil &amp; water &lt; &quot;roots&quot; &gt; &apos;yield&apos;",
    );
  });

  it("builds absolute post urls", () => {
    expect(postPath({ locale: "fa", slug: "مثلث-بافت-خاک" })).toBe(
      "/fa/blog/%D9%85%D8%AB%D9%84%D8%AB-%D8%A8%D8%A7%D9%81%D8%AA-%D8%AE%D8%A7%DA%A9",
    );
    expect(absoluteUrl(siteUrl, "/en/blog")).toBe("https://sfa.example/en/blog");
    expect(absoluteUrl(`${siteUrl}/`, "/en/blog")).toBe("https://sfa.example/en/blog");
  });

  it("builds a sitemap with alternates and lastmod", () => {
    const xml = buildSitemapXml([
      {
        loc: "https://sfa.example/en/blog/soil",
        lastmod: "2026-07-02T08:00:00.000Z",
        alternates: [
          { locale: "en", href: "https://sfa.example/en/blog/soil" },
          { locale: "fa", href: "https://sfa.example/fa/blog/soil" },
        ],
      },
    ]);

    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
    expect(xml).toContain("<loc>https://sfa.example/en/blog/soil</loc>");
    expect(xml).toContain("<lastmod>2026-07-02T08:00:00.000Z</lastmod>");
    expect(xml).toContain('hreflang="fa"');
  });

  it("builds a localized RSS feed with escaped items", () => {
    const post = mockPosts.find((item) => item.locale === "en");
    if (!post) throw new Error("Missing English fixture");

    const xml = buildRssXml({
      title: "SFA Blog",
      description: "Research & notes",
      siteUrl,
      feedUrl: "https://sfa.example/en/rss.xml",
      locale: "en",
      posts: [summary(post)],
    });

    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain("<language>en-US</language>");
    expect(xml).toContain("<title>SFA Blog</title>");
    expect(xml).toContain("Research &amp; notes");
    expect(xml).toContain("<item>");
    expect(xml).toContain(`<link>https://sfa.example/en/blog/${post.slug}</link>`);
    expect(xml).toContain("<category>");
  });
});
