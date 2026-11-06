import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { data, Link } from "react-router";
import type { Route } from "./+types/blog-index";
import { getInstance, getLocale } from "~/middleware/i18next";
import { blogRepository } from "~/modules/blog/blog-module";
import type { BlogListResult, BlogTag, Locale } from "~/modules/blog/domain/post";
import { PostCard } from "~/modules/blog/presentation/post-card";
import { cn } from "~/shared/lib/cn";
import { formatNumber } from "~/shared/lib/format-number";
import { toLocale } from "~/shared/lib/locale";
import { SITE } from "~/shared/lib/site";
import { Button, buttonVariants, LinkButton } from "~/shared/ui/button";
import { Container } from "~/shared/ui/container";
import { Section } from "~/shared/ui/section";

const PUBLIC_CACHE = "public, max-age=0, s-maxage=300, stale-while-revalidate=3600";

export type BlogIndexLoaderData =
  | {
      ok: true;
      locale: Locale;
      result: BlogListResult;
      tags: BlogTag[];
      page: number;
      q: string;
      selectedTags: string[];
      title: string;
      description: string;
      siteUrl: string;
    }
  | {
      ok: false;
      locale: Locale;
      page: number;
      q: string;
      selectedTags: string[];
      title: string;
      description: string;
      siteUrl: string;
      errorTitle: string;
      errorMessage: string;
      retryHref: string;
    };

function positivePage(value: string | null) {
  const parsed = Number(value ?? "1");
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1;
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const locale = toLocale(getLocale(context));
  const url = new URL(request.url);
  const page = positivePage(url.searchParams.get("page"));
  const selectedTags = [
    ...new Set(
      url.searchParams
        .getAll("tag")
        .flatMap((value) => value.split(","))
        .map((value) => value.trim())
        .filter(Boolean),
    ),
  ];
  const q = url.searchParams.get("q")?.trim() || undefined;

  const i18n = getInstance(context);
  const t = i18n.getFixedT(locale, "blog");
  const title = t("meta.title");
  const description = t("meta.description");

  try {
    const [result, tags] = await Promise.all([
      blogRepository.listPosts({ locale, page, tags: selectedTags, q }),
      blogRepository.getTags(locale).catch((error: unknown) => {
        console.error("[blog-index] Failed to load tags", error);
        return [] as BlogTag[];
      }),
    ]);

    return data<BlogIndexLoaderData>(
      {
        ok: true,
        locale,
        result,
        tags,
        page: result.page,
        q: q ?? "",
        selectedTags,
        title,
        description,
        siteUrl: SITE.url,
      },
      {
        headers: {
          "Cache-Control": q || selectedTags.length ? "no-store" : PUBLIC_CACHE,
        },
      },
    );
  } catch (error) {
    console.error("[blog-index] Failed to load posts", error);

    return data<BlogIndexLoaderData>(
      {
        ok: false,
        locale,
        page,
        q: q ?? "",
        selectedTags,
        title,
        description,
        siteUrl: SITE.url,
        errorTitle: t("errorTitle"),
        errorMessage: t("error"),
        retryHref: `${url.pathname}${url.search}`,
      },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  if (!loaderData) return [];

  const { locale, title, description, q, selectedTags, page, siteUrl } = loaderData;
  const base = new URL(`/${locale}/blog`, siteUrl).toString();
  const canonical = page > 1 ? `${base}?page=${page}` : base;
  const filtered = Boolean(q || selectedTags.length || !loaderData.ok);
  const image = new URL("/og-default.png", siteUrl).toString();

  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: canonical },
    ...(filtered
      ? []
      : [
          {
            tagName: "link" as const,
            rel: "alternate",
            hrefLang: "fa",
            href: new URL("/fa/blog", siteUrl).toString(),
          },
          {
            tagName: "link" as const,
            rel: "alternate",
            hrefLang: "en",
            href: new URL("/en/blog", siteUrl).toString(),
          },
          {
            tagName: "link" as const,
            rel: "alternate",
            hrefLang: "x-default",
            href: new URL("/fa/blog", siteUrl).toString(),
          },
        ]),
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE.fullName },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: canonical },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    ...(filtered ? [{ name: "robots", content: "noindex, follow" }] : []),
  ];
};

export default function BlogIndex({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation(["blog", "common"]);
  const { locale, q, selectedTags } = loaderData;

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

  const { result, tags } = loaderData;
  const formattedTotal = formatNumber(result.total, locale);
  const formattedPage = formatNumber(result.page, locale);
  const formattedTotalPages = formatNumber(result.totalPages, locale);
  const activeTags = selectedTags.map(
    (slug) => tags.find((item) => item.slug === slug) ?? { slug, label: slug },
  );
  const activeTagLabels = activeTags
    .map((item) => item.label)
    .join(locale === "fa" ? "، " : ", ");

  const buildSearchParams = (nextPage?: number, nextTags = selectedTags) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    for (const tag of nextTags) params.append("tag", tag);
    if (nextPage && nextPage > 1) params.set("page", String(nextPage));
    return params;
  };

  const pageHref = (page: number) => {
    const params = buildSearchParams(page);
    return `/${locale}/blog${params.size ? `?${params.toString()}` : ""}`;
  };

  const tagsHref = (nextTags: string[]) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    for (const tag of nextTags) params.append("tag", tag);
    return `/${locale}/blog${params.size ? `?${params.toString()}` : ""}`;
  };

  const toggleTagHref = (slug: string) =>
    tagsHref(
      selectedTags.includes(slug)
        ? selectedTags.filter((item) => item !== slug)
        : [...selectedTags, slug],
    );

  const clearSearchHref = tagsHref(selectedTags);
  const hasFilters = Boolean(q || selectedTags.length);

  return (
    <main id="main-content" tabIndex={-1}>
      <Section className="pb-8 sm:pb-10">
        <Container className="space-y-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold tracking-[0.2em] text-brand uppercase">
              {t("common:siteName")}
            </p>
            <h1 className="text-5xl font-black tracking-tight sm:text-6xl">
              {t("title")}
            </h1>
            <p className="text-lg text-muted">{t("subtitle")}</p>
          </div>

          <div className="flex flex-col gap-5 border-y border-border py-5 lg:flex-row lg:items-end lg:justify-between">
            <form
              method="get"
              action={`/${locale}/blog`}
              className="flex w-full max-w-xl flex-col gap-2"
              role="search"
            >
              <label
                htmlFor="blog-search"
                className="text-sm font-semibold text-foreground-strong"
              >
                {t("searchLabel")}
              </label>
              <div className="flex gap-2">
                <input
                  id="blog-search"
                  name="q"
                  type="search"
                  defaultValue={q}
                  placeholder={t("searchPlaceholder")}
                  enterKeyHint="search"
                  className="h-11 min-w-0 flex-1 rounded-pill border border-border bg-surface px-4 text-sm text-foreground placeholder:text-muted focus:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                />
                {selectedTags.map((tag) => (
                  <input key={tag} type="hidden" name="tag" value={tag} />
                ))}
                <Button type="submit" intent="primary" size="md">
                  <Search aria-hidden="true" className="size-4" />
                  <span>{t("searchSubmit")}</span>
                </Button>
              </div>
            </form>

            <p
              role="status"
              aria-live="polite"
              className="flex flex-wrap items-center gap-x-2 text-sm text-muted"
            >
              <span>
                {q
                  ? t("resultsFor", {
                      count: result.total,
                      formattedCount: formattedTotal,
                      query: q,
                    })
                  : t("resultsCount", {
                      count: result.total,
                      formattedCount: formattedTotal,
                    })}
              </span>
              {selectedTags.length > 0 && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{t("tagFilters", { tags: activeTagLabels })}</span>
                </>
              )}
              {result.totalPages > 1 && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    {t("page", { page: formattedPage, total: formattedTotalPages })}
                  </span>
                </>
              )}
            </p>
          </div>

          {hasFilters && (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {q && (
                <Link
                  to={clearSearchHref}
                  className="inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-3 py-1.5 font-medium text-foreground hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  {t("searchChip", { query: q })}
                  <span aria-hidden="true">×</span>
                  <span className="sr-only">{t("clearSearch")}</span>
                </Link>
              )}
              {activeTags.map((tag) => (
                <Link
                  key={tag.slug}
                  to={tagsHref(selectedTags.filter((item) => item !== tag.slug))}
                  className="inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-3 py-1.5 font-medium text-foreground transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  {t("tagFilter", { tag: tag.label })}
                  <span aria-hidden="true">×</span>
                  <span className="sr-only">{t("removeTag", { tag: tag.label })}</span>
                </Link>
              ))}
              <Link
                to={`/${locale}/blog`}
                className="ms-1 font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                {t("clearFilters")}
              </Link>
            </div>
          )}

          <nav aria-label={t("tags")} className="flex flex-wrap items-center gap-2">
            <Link
              to={tagsHref([])}
              className={cn(
                "rounded-pill border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
                selectedTags.length === 0
                  ? "border-brand bg-brand-soft text-brand-strong"
                  : "border-border text-muted hover:border-brand hover:text-brand",
              )}
              aria-current={selectedTags.length === 0 ? "page" : undefined}
            >
              {t("allTags")}
            </Link>
            {tags.map((item) => {
              const selected = selectedTags.includes(item.slug);
              return (
                <Link
                  key={item.slug}
                  to={toggleTagHref(item.slug)}
                  className={cn(
                    "rounded-pill border px-4 py-2 text-sm font-medium transition-[background-color,border-color,color,transform] duration-(--motion-duration-fast) hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
                    selected
                      ? "border-brand bg-brand-soft text-brand-strong"
                      : "border-border text-muted hover:border-brand hover:text-brand",
                  )}
                  aria-current={selected ? "page" : undefined}
                >
                  {item.label}
                  <span className="ms-2 text-xs text-muted">
                    {formatNumber(item.count, locale)}
                  </span>
                </Link>
              );
            })}
          </nav>
        </Container>
      </Section>

      <Section className="pt-4">
        <Container className="space-y-10">
          {result.items.length === 0 ? (
            <div className="rounded-panel border border-dashed border-border bg-surface p-10 text-center">
              <p className="text-lg font-semibold">
                {hasFilters ? t("noResults") : t("empty")}
              </p>
              {hasFilters && (
                <Link
                  className="mt-4 inline-block text-sm font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                  to={`/${locale}/blog`}
                >
                  {t("clearFilters")}
                </Link>
              )}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {result.items.map((post, index) => (
                <PostCard
                  key={post.id}
                  post={post}
                  locale={locale}
                  priority={index < 3}
                  headingLevel={2}
                />
              ))}
            </div>
          )}

          {result.totalPages > 1 && (
            <nav
              aria-label={t("pagination")}
              className="flex items-center justify-between gap-4 border-t border-border pt-6"
            >
              {result.page > 1 ? (
                <LinkButton intent="outline" to={pageHref(result.page - 1)} rel="prev">
                  {t("previous")}
                </LinkButton>
              ) : (
                <span
                  className={cn(
                    buttonVariants({ intent: "outline" }),
                    "pointer-events-none opacity-50",
                  )}
                  aria-disabled="true"
                >
                  {t("previous")}
                </span>
              )}
              <p className="text-sm text-muted">
                {t("page", { page: formattedPage, total: formattedTotalPages })}
              </p>
              {result.page < result.totalPages ? (
                <LinkButton intent="outline" to={pageHref(result.page + 1)} rel="next">
                  {t("next")}
                </LinkButton>
              ) : (
                <span
                  className={cn(
                    buttonVariants({ intent: "outline" }),
                    "pointer-events-none opacity-50",
                  )}
                  aria-disabled="true"
                >
                  {t("next")}
                </span>
              )}
            </nav>
          )}
        </Container>
      </Section>
    </main>
  );
}
