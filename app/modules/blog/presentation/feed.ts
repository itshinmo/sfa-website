import type { BlogPostSummary } from "../domain/post";

const xmlEscapes: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
};

export function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (character) => xmlEscapes[character] ?? character);
}

export type SitemapAlternate = {
  locale: string;
  href: string;
};

export type SitemapUrl = {
  loc: string;
  lastmod?: string;
  alternates?: SitemapAlternate[];
};

export function buildSitemapXml(urls: SitemapUrl[]) {
  const entries = urls
    .map(
      (url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>${
      url.lastmod ? `\n    <lastmod>${escapeXml(url.lastmod)}</lastmod>` : ""
    }${(url.alternates ?? [])
      .map(
        (alternate) =>
          `\n    <xhtml:link rel="alternate" hreflang="${escapeXml(
            alternate.locale,
          )}" href="${escapeXml(alternate.href)}"/>`,
      )
      .join("")}
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`;
}

export function postPath(entry: { locale: string; slug: string }) {
  return `/${entry.locale}/blog/${encodeURIComponent(entry.slug)}`;
}

export function absoluteUrl(siteUrl: string, path: string) {
  return new URL(path, `${siteUrl.replace(/\/+$/, "")}/`).toString();
}

export type RssFeedInput = {
  title: string;
  description: string;
  siteUrl: string;
  feedUrl: string;
  locale: "fa" | "en";
  posts: BlogPostSummary[];
};

function rssDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toUTCString();
}

export function buildRssXml({
  title,
  description,
  siteUrl,
  feedUrl,
  locale,
  posts,
}: RssFeedInput) {
  const homeUrl = absoluteUrl(siteUrl, `/${locale}/blog`);
  const items = posts
    .map((post) => {
      const link = absoluteUrl(siteUrl, postPath(post));
      const published = rssDate(post.publishedAt);
      const updated = rssDate(post.updatedAt);

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>${published ? `\n      <pubDate>${escapeXml(published)}</pubDate>` : ""}${
        updated ? `\n      <atom:updated>${escapeXml(updated)}</atom:updated>` : ""
      }
      <description>${escapeXml(post.excerpt)}</description>${post.tags
        .map((tag) => `\n      <category>${escapeXml(tag.label)}</category>`)
        .join("")}
    </item>`;
    })
    .join("\n");

  const buildDate = rssDate(
    posts
      .map((post) => post.updatedAt)
      .sort((a, b) => b.localeCompare(a))
      .at(0) ?? "",
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(homeUrl)}</link>
    <description>${escapeXml(description)}</description>
    <language>${locale === "fa" ? "fa-IR" : "en-US"}</language>${buildDate ? `\n    <lastBuildDate>${escapeXml(buildDate)}</lastBuildDate>` : ""}
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}
