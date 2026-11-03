import { data } from "react-router";
import type { Route } from "./+types/home";
import { blogRepository } from "~/modules/blog/blog-module";
import { getHomeContent } from "~/modules/home/home-content.server";
import { HomeAchievements } from "~/modules/home/presentation/home-achievements";
import { HomeBlogTeaser } from "~/modules/home/presentation/home-blog-teaser";
import { HomeContact } from "~/modules/home/presentation/home-contact";
import { HomeDownloads } from "~/modules/home/presentation/home-downloads";
import { HomeFaq } from "~/modules/home/presentation/home-faq";
import { HomeFeatures } from "~/modules/home/presentation/home-features";
import { HomeHero, HeroTrustStrip } from "~/modules/home/presentation/home-hero";
import { HomeResearch } from "~/modules/home/presentation/home-research";
import { HomeShowcase } from "~/modules/home/presentation/home-showcase";
import { HomeTeam } from "~/modules/home/presentation/home-team";
import { toLocale } from "~/shared/lib/locale";
import { SITE } from "~/shared/lib/site";

const PUBLIC_CACHE = "public, max-age=0, s-maxage=300, stale-while-revalidate=3600";
const HERO_LANDSCAPE_WEBP = "/images/homepage/hero-landscape.webp";
const HERO_PORTRAIT_WEBP = "/images/homepage/hero-portrait.webp";
const TEASER_TIMEOUT_MS = 1500;

type HomeBlogPosts = Awaited<ReturnType<typeof blogRepository.listPosts>>["items"];

function absoluteUrl(base: string, path: string) {
  return new URL(path, base).toString();
}

export async function loader({ params }: Route.LoaderArgs) {
  // `params.locale` is reliable for both document and single-fetch data requests;
  // the raw `.data` pathname would otherwise confuse middleware locale detection.
  const locale = toLocale(params.locale);
  const content = getHomeContent(locale);

  // The blog teaser is supplementary: never fail or block the homepage on it.
  const posts = await new Promise<HomeBlogPosts>((resolve) => {
    const timer = setTimeout(() => resolve([]), TEASER_TIMEOUT_MS);

    blogRepository
      .listPosts({ locale, page: 1, pageSize: 3 })
      .then((result) => {
        clearTimeout(timer);
        resolve(result.items);
      })
      .catch(() => {
        clearTimeout(timer);
        resolve([]);
      });
  });

  return data(
    { locale, content, posts, siteUrl: SITE.url },
    {
      headers: {
        "Cache-Control": PUBLIC_CACHE,
      },
    },
  );
}

export const links: Route.LinksFunction = () => [
  {
    rel: "preload",
    as: "image",
    href: HERO_LANDSCAPE_WEBP,
    type: "image/webp",
    media: "(min-width: 768px)",
  },
  {
    rel: "preload",
    as: "image",
    href: HERO_PORTRAIT_WEBP,
    type: "image/webp",
    media: "(max-width: 767px)",
  },
];

export const meta: Route.MetaFunction = ({ loaderData }) => {
  if (!loaderData) {
    return [{ title: SITE.name }];
  }

  const { content, locale, siteUrl } = loaderData;
  const canonical = absoluteUrl(siteUrl, `/${locale}`);
  const image = absoluteUrl(siteUrl, "/images/homepage/og-home.jpg");
  const otherLocale = locale === "fa" ? "en" : "fa";
  const organizationId = `${siteUrl}/#organization`;

  return [
    { title: content.meta.title },
    { name: "description", content: content.meta.description },
    { tagName: "link", rel: "canonical", href: canonical },
    {
      tagName: "link",
      rel: "alternate",
      hrefLang: "fa",
      href: absoluteUrl(siteUrl, "/fa"),
    },
    {
      tagName: "link",
      rel: "alternate",
      hrefLang: "en",
      href: absoluteUrl(siteUrl, "/en"),
    },
    {
      tagName: "link",
      rel: "alternate",
      hrefLang: "x-default",
      href: absoluteUrl(siteUrl, "/fa"),
    },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE.fullName },
    { property: "og:title", content: content.meta.title },
    { property: "og:description", content: content.meta.description },
    { property: "og:url", content: canonical },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: content.hero.image.alt },
    { property: "og:locale", content: locale === "fa" ? "fa_IR" : "en_US" },
    {
      property: "og:locale:alternate",
      content: otherLocale === "fa" ? "fa_IR" : "en_US",
    },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: content.meta.title },
    { name: "twitter:description", content: content.meta.description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: content.hero.image.alt },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": organizationId,
        name: SITE.fullName,
        alternateName: SITE.name,
        url: siteUrl,
        logo: absoluteUrl(siteUrl, "/images/brand/sfa-512x512.png"),
        email: content.contact.email,
        description: content.meta.description,
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteUrl}/${locale}#website`,
        name: SITE.fullName,
        alternateName: SITE.name,
        url: canonical,
        inLanguage: locale,
        publisher: { "@id": organizationId },
      },
    },
  ];
};

export default function Home({ loaderData }: Route.ComponentProps) {
  const { content, locale, posts } = loaderData;

  return (
    <main id="main-content" tabIndex={-1}>
      <HomeHero hero={content.hero} />
      <HeroTrustStrip highlights={content.hero.highlights} />
      <HomeFeatures features={content.features} />
      <HomeShowcase showcase={content.showcase} locale={locale} />
      <HomeResearch research={content.research} locale={locale} />
      <HomeAchievements achievements={content.achievements} />
      <HomeTeam team={content.team} />
      <HomeBlogTeaser posts={posts} locale={locale} />
      <HomeFaq faq={content.faq} />
      <HomeDownloads downloads={content.downloads} />
      <HomeContact contact={content.contact} />
    </main>
  );
}
