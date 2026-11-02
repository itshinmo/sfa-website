import type { Route } from "./+types/rss";
import { getInstance } from "~/middleware/i18next";
import { blogRepository } from "~/modules/blog/blog-module";
import type { BlogPostSummary } from "~/modules/blog/domain/post";
import { absoluteUrl, buildRssXml } from "~/modules/blog/presentation/feed";
import { SITE } from "~/shared/lib/site";

const CACHE = "public, max-age=0, s-maxage=300, stale-while-revalidate=3600";
const FEED_SIZE = 50;

export async function loader({ params, context }: Route.LoaderArgs) {
  const locale = params.locale;

  if (locale !== "fa" && locale !== "en") {
    throw new Response("Not Found", { status: 404 });
  }

  const i18n = getInstance(context);
  const t = i18n.getFixedT(locale, "blog");
  const feedUrl = absoluteUrl(SITE.url, `/${locale}/rss.xml`);
  let posts: BlogPostSummary[] = [];

  try {
    const result = await blogRepository.listPosts({
      locale,
      page: 1,
      pageSize: FEED_SIZE,
    });
    posts = result.items;
  } catch (error) {
    console.error(`[rss] Failed to load ${locale} posts`, error);

    return new Response("The RSS feed is temporarily unavailable.", {
      status: 503,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }

  const xml = buildRssXml({
    title: t("meta.title"),
    description: t("meta.description"),
    siteUrl: SITE.url,
    feedUrl,
    locale,
    posts,
  });

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": CACHE,
    },
  });
}
