import { useTranslation } from "react-i18next";
import { data, Link } from "react-router";
import type { Route } from "./+types/blog-detail";
import { getInstance, getLocale } from "~/middleware/i18next";
import { blogRepository } from "~/modules/blog/blog-module";
import { collectContentHeadings } from "~/modules/blog/domain/content-headings";
import type { BlogPost, BlogPostSummary, Locale } from "~/modules/blog/domain/post";
import { resolveReadingTimeMinutes } from "~/modules/blog/domain/reading-time";
import { PostCard } from "~/modules/blog/presentation/post-card";
import { PostContent } from "~/modules/blog/presentation/post-content";
import { TableOfContents } from "~/modules/blog/presentation/table-of-contents";
import { formatDate } from "~/shared/lib/format-date";
import { formatNumber } from "~/shared/lib/format-number";
import { toLocale } from "~/shared/lib/locale";
import { SITE } from "~/shared/lib/site";
import { Badge } from "~/shared/ui/badge";
import { LinkButton } from "~/shared/ui/button";
import { Container } from "~/shared/ui/container";
import { Section } from "~/shared/ui/section";

const PUBLIC_CACHE = "public, max-age=0, s-maxage=300, stale-while-revalidate=3600";

type BlogBreadcrumbLabels = {
  label: string;
  home: string;
  blog: string;
};

export type BlogDetailLoaderData =
  | {
      ok: true;
      locale: Locale;
      post: BlogPost;
      related: BlogPostSummary[];
      title: string;
      description: string;
      siteUrl: string;
      readingTimeMinutes: number;
      readingTimeLabel: string;
      byline?: string;
      breadcrumb: BlogBreadcrumbLabels;
    }
  | {
      ok: false;
      locale: Locale;
      title: string;
      description: string;
      siteUrl: string;
      errorTitle: string;
      errorMessage: string;
      retryHref: string;
    };

export async function loader({ params, request, context }: Route.LoaderArgs) {
  const locale = toLocale(getLocale(context));
  const slug = params.slug ?? "";
  const fallbackLocale = locale === "fa" ? "en" : "fa";
  const i18n = getInstance(context);
  const t = i18n.getFixedT(locale, "blog");
  const title = t("meta.title");
  const description = t("meta.description");

  let post: BlogPost | null;

  try {
    post = await blogRepository.getPost({ locale, slug, fallbackLocale });
  } catch (error) {
    console.error("[blog-detail] Failed to load post", error);

    return data<BlogDetailLoaderData>(
      {
        ok: false,
        locale,
        title,
        description,
        siteUrl: SITE.url,
        errorTitle: t("errorTitle"),
        errorMessage: t("error"),
        retryHref: `${new URL(request.url).pathname}${new URL(request.url).search}`,
      },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  let related: BlogPostSummary[] = [];

  try {
    related = await blogRepository.getRelatedPosts({
      locale: post.locale,
      slug: post.slug,
      limit: 3,
    });
  } catch (error) {
    // Related posts are supplementary: never fail the article because of them.
    console.error("[blog-detail] Failed to load related posts", error);
  }

  const readingTimeMinutes = resolveReadingTimeMinutes(post);
  const formattedReadingTime = formatNumber(readingTimeMinutes, locale);

  return data<BlogDetailLoaderData>(
    {
      ok: true,
      locale,
      post,
      related,
      title: post.seo?.title ?? post.title,
      description: post.seo?.description ?? post.excerpt,
      siteUrl: SITE.url,
      readingTimeMinutes,
      readingTimeLabel: t("readingTime", { minutes: formattedReadingTime }),
      byline: post.author ? t("by", { name: post.author.name }) : undefined,
      breadcrumb: {
        label: t("breadcrumb"),
        home: i18n.getFixedT(locale, "common")("nav.home"),
        blog: i18n.getFixedT(locale, "common")("nav.blog"),
      },
    },
    {
      headers: { "Cache-Control": PUBLIC_CACHE },
    },
  );
}

function canonicalUrl(post: { locale: string; slug: string }, siteUrl: string) {
  return new URL(
    `/${post.locale}/blog/${encodeURIComponent(post.slug)}`,
    siteUrl,
  ).toString();
}

function absoluteAssetUrl(value: string, siteUrl: string) {
  return /^https?:\/\//.test(value) ? value : new URL(value, siteUrl).toString();
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  if (!loaderData) return [];

  const { locale, title, description, siteUrl } = loaderData;

  if (!loaderData.ok) {
    return [
      { title },
      { name: "description", content: description },
      {
        tagName: "link",
        rel: "canonical",
        href: new URL(`/${locale}/blog`, siteUrl).toString(),
      },
      { name: "robots", content: "noindex, nofollow" },
    ];
  }

  const { post, breadcrumb } = loaderData;
  const canonical = canonicalUrl(post, siteUrl);
  const rawImage = post.seo?.ogImage ?? post.cover.url;
  const usesDefaultOg = rawImage.endsWith(".svg");
  const image = absoluteAssetUrl(usesDefaultOg ? "/og-default.png" : rawImage, siteUrl);
  const defaultAlternate = post.alternates.find((alternate) => alternate.locale === "fa");
  const localeTag = post.contentLocale ?? post.locale;

  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: canonical },
    ...post.alternates.map((alternate) => ({
      tagName: "link" as const,
      rel: "alternate",
      hrefLang: alternate.locale,
      href: canonicalUrl({ locale: alternate.locale, slug: alternate.slug }, siteUrl),
    })),
    ...(defaultAlternate
      ? [
          {
            tagName: "link" as const,
            rel: "alternate",
            hrefLang: "x-default",
            href: canonicalUrl(
              {
                locale: defaultAlternate.locale,
                slug: defaultAlternate.slug,
              },
              siteUrl,
            ),
          },
        ]
      : []),
    { property: "og:type", content: "article" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:image:alt", content: post.cover.alt },
    {
      property: "og:image:width",
      content: usesDefaultOg ? "1200" : String(post.cover.width),
    },
    {
      property: "og:image:height",
      content: usesDefaultOg ? "630" : String(post.cover.height),
    },
    { property: "og:url", content: canonical },
    { property: "og:locale", content: localeTag === "fa" ? "fa_IR" : "en_US" },
    ...post.alternates
      .filter((alternate) => alternate.locale !== localeTag)
      .map((alternate) => ({
        property: "og:locale:alternate",
        content: alternate.locale === "fa" ? "fa_IR" : "en_US",
      })),
    { property: "article:published_time", content: post.publishedAt },
    { property: "article:modified_time", content: post.updatedAt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        inLanguage: localeTag,
        author: post.author
          ? { "@type": "Person", name: post.author.name }
          : { "@type": "Organization", name: SITE.fullName },
        publisher: { "@type": "Organization", name: SITE.fullName, url: siteUrl },
        mainEntityOfPage: canonical,
        url: canonical,
        keywords: post.tags.map((tag) => tag.label),
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: breadcrumb.home,
            item: new URL(`/${locale}`, siteUrl).toString(),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: breadcrumb.blog,
            item: new URL(`/${locale}/blog`, siteUrl).toString(),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: canonical,
          },
        ],
      },
    },
    ...(post.seo?.noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
  ];
};

export default function BlogDetail({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation(["blog", "common"]);
  const { locale } = loaderData;

  if (!loaderData.ok) {
    return (
      <main id="main-content" tabIndex={-1}>
        <Section>
          <Container className="max-w-2xl space-y-6">
            <p className="text-sm font-semibold tracking-[0.2em] text-brand uppercase">
              {t("common:siteName")}
            </p>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              {loaderData.errorTitle}
            </h1>
            <p className="text-lg text-muted">{loaderData.errorMessage}</p>
            <div className="flex flex-wrap gap-3">
              <LinkButton to={loaderData.retryHref} reloadDocument>
                {t("retry")}
              </LinkButton>
              <LinkButton intent="outline" to={`/${locale}/blog`}>
                {t("common:nav.blog")}
              </LinkButton>
            </div>
          </Container>
        </Section>
      </main>
    );
  }

  const { post, related, readingTimeLabel, byline, breadcrumb } = loaderData;
  const toc = collectContentHeadings(post.content);
  const showUpdated = post.updatedAt !== post.publishedAt;
  const contentLocale = post.contentLocale ?? post.locale;
  const contentDirection = contentLocale === "fa" ? "rtl" : "ltr";

  return (
    <main id="main-content" tabIndex={-1}>
      <Section className="pb-8 sm:pb-10">
        <Container className="max-w-5xl space-y-8">
          <nav aria-label={breadcrumb.label}>
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
              <li>
                <Link
                  to={`/${locale}`}
                  className="underline-offset-4 hover:text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  {breadcrumb.home}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  to={`/${locale}/blog`}
                  className="underline-offset-4 hover:text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  {breadcrumb.blog}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <span aria-current="page">{post.title}</span>
              </li>
            </ol>
          </nav>

          <article
            aria-labelledby="post-title"
            className="grid min-w-0 gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,1fr)_16rem]"
          >
            <header className="space-y-5 lg:col-start-1 lg:row-start-1">
              <div
                lang={contentLocale}
                dir={contentDirection}
                className="flex flex-wrap gap-2"
              >
                {post.tags.map((tag) => (
                  <Link
                    key={tag.slug}
                    to={`/${post.locale}/blog?tag=${encodeURIComponent(tag.slug)}`}
                    className="rounded-pill focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                  >
                    <Badge tone="brand">{tag.label}</Badge>
                  </Link>
                ))}
              </div>

              <h1
                id="post-title"
                lang={contentLocale}
                dir={contentDirection}
                className="text-4xl leading-tight font-black tracking-tight sm:text-6xl"
              >
                {post.title}
              </h1>
              <p
                lang={contentLocale}
                dir={contentDirection}
                className="max-w-3xl text-xl text-muted"
              >
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
                <span>
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt, post.locale)}
                  </time>
                </span>
                {showUpdated && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>
                      {t("updated")}{" "}
                      <time dateTime={post.updatedAt}>
                        {formatDate(post.updatedAt, post.locale)}
                      </time>
                    </span>
                  </>
                )}
                <span aria-hidden="true">·</span>
                <span>{readingTimeLabel}</span>
                {byline && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{byline}</span>
                  </>
                )}
              </div>
            </header>

            <figure
              data-slot="post-cover"
              lang={contentLocale}
              dir={contentDirection}
              className="lg:col-start-1 lg:row-start-2"
            >
              <img
                src={post.cover.url}
                alt={post.cover.alt}
                width={post.cover.width}
                height={post.cover.height}
                srcSet={post.cover.srcSet}
                fetchPriority="high"
                decoding="async"
                className="aspect-video w-full rounded-panel object-cover"
              />
            </figure>

            <TableOfContents
              items={toc}
              label={t("toc")}
              className="lg:col-start-2 lg:row-span-3 lg:row-start-1"
            />

            <div
              data-slot="post-body"
              lang={contentLocale}
              dir={contentDirection}
              className="space-y-6 lg:col-start-1 lg:row-start-3"
            >
              {post.isFallback && (
                <p
                  role="note"
                  className="rounded-card border border-water/30 bg-water-100 p-4 text-sm text-water-700"
                >
                  {t("fallbackNotice")}
                </p>
              )}

              <PostContent content={post.content} />
            </div>
          </article>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="muted">
          <Container className="space-y-8">
            <h2 className="text-3xl font-bold">{t("related")}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <PostCard key={item.id} post={item} locale={post.locale} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </main>
  );
}
