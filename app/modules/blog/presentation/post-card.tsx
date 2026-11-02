import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import type { BlogPostSummary, Locale } from "../domain/post";
import { formatDate } from "~/shared/lib/format-date";
import { formatNumber } from "~/shared/lib/format-number";
import { Badge } from "~/shared/ui/badge";
import { Card } from "~/shared/ui/card";

type PostCardProps = {
  post: BlogPostSummary;
  locale: Locale;
  priority?: boolean;
  headingLevel?: 2 | 3;
};

export function PostCard({
  post,
  locale,
  priority = false,
  headingLevel = 3,
}: PostCardProps) {
  const { t } = useTranslation("blog");
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article className="h-full">
      <Card
        data-slot="post-card"
        className="group h-full overflow-hidden transition-[box-shadow,transform] duration-[var(--motion-duration-base)] ease-[var(--motion-ease-out)] motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-card-hover"
      >
        <Link
          to={`/${locale}/blog/${encodeURIComponent(post.slug)}`}
          className="flex h-full flex-col rounded-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          <div className="aspect-[16/9] overflow-hidden bg-surface-muted">
            <img
              src={post.cover.url}
              alt={post.cover.alt}
              width={post.cover.width}
              height={post.cover.height}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              decoding="async"
              className="size-full object-cover transition-transform duration-[var(--motion-duration-slow)] ease-[var(--motion-ease-out)] motion-safe:group-hover:scale-[1.03]"
            />
          </div>

          <div className="flex flex-1 flex-col gap-4 p-6">
            <div className="flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag.slug} tone="brand">
                  {tag.label}
                </Badge>
              ))}
            </div>

            <Heading className="text-2xl font-bold text-foreground-strong">
              {post.title}
            </Heading>
            <p className="line-clamp-3 text-muted">{post.excerpt}</p>

            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt, locale)}
              </time>
              <span aria-hidden="true">·</span>
              <span>
                {t("readingTime", {
                  minutes: formatNumber(Math.max(post.readingTimeMinutes, 1), locale),
                })}
              </span>
            </div>
          </div>
        </Link>
      </Card>
    </article>
  );
}
