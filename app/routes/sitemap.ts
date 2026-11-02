import type { Route } from "./+types/sitemap";
import { supportedLanguages } from "~/locales";
import { blogRepository } from "~/modules/blog/blog-module";
import {
  absoluteUrl,
  buildSitemapXml,
  postPath,
  type SitemapAlternate,
  type SitemapUrl,
} from "~/modules/blog/presentation/feed";
import { SITE } from "~/shared/lib/site";

const CACHE = "public, max-age=0, s-maxage=300, stale-while-revalidate=3600";

function localeAlternates(path: string): SitemapAlternate[] {
  return [
    ...supportedLanguages.map((locale) => ({
      locale,
      href: absoluteUrl(SITE.url, `/${locale}${path}`),
    })),
    { locale: "x-default", href: absoluteUrl(SITE.url, `/fa${path}`) },
  ];
}

export async function loader(_args: Route.LoaderArgs) {
  const entriesByLocale = await Promise.all(
    supportedLanguages.map(async (locale) => {
      try {
        return await blogRepository.getSitemap(locale);
      } catch (error) {
        // A sitemap should stay available even when one API call fails.
        console.error(`[sitemap] Failed to load ${locale} entries`, error);
        return [];
      }
    }),
  );

  const urls = new Map<string, SitemapUrl>();
  const add = (url: SitemapUrl) => urls.set(url.loc, url);

  for (const locale of supportedLanguages) {
    add({
      loc: absoluteUrl(SITE.url, `/${locale}`),
      alternates: localeAlternates(""),
    });
    add({
      loc: absoluteUrl(SITE.url, `/${locale}/blog`),
      alternates: localeAlternates("/blog"),
    });
  }

  for (const entries of entriesByLocale) {
    for (const entry of entries) {
      const alternates: SitemapAlternate[] = entry.alternates.map((alternate) => ({
        locale: alternate.locale,
        href: absoluteUrl(SITE.url, postPath(alternate)),
      }));

      if (!alternates.some((alternate) => alternate.locale === "x-default")) {
        const defaultAlternate = entry.alternates.find(
          (alternate) => alternate.locale === "fa",
        );

        if (defaultAlternate) {
          alternates.push({
            locale: "x-default",
            href: absoluteUrl(SITE.url, postPath(defaultAlternate)),
          });
        }
      }

      add({
        loc: absoluteUrl(SITE.url, postPath(entry)),
        lastmod: entry.updatedAt,
        alternates: alternates.length > 0 ? alternates : undefined,
      });
    }
  }

  return new Response(buildSitemapXml([...urls.values()]), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": CACHE,
    },
  });
}
