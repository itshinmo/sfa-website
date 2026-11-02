import type { ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import type { HomeContent } from "~/modules/home/home-content-schema";
import { SectionIntro } from "~/modules/home/presentation/section-intro";
import { PostCard } from "~/modules/blog/presentation/post-card";
import { LinkButton } from "~/shared/ui/button";
import { Card } from "~/shared/ui/card";
import { Container } from "~/shared/ui/container";
import { Reveal } from "~/shared/ui/reveal";
import { Section } from "~/shared/ui/section";

type BlogPostSummary = ComponentProps<typeof PostCard>["post"];

type HomeBlogTeaserProps = {
  posts: BlogPostSummary[];
  locale: HomeContent["locale"];
};

export function HomeBlogTeaser({ posts, locale }: HomeBlogTeaserProps) {
  const { t } = useTranslation(["home", "common"]);

  return (
    <Section id="blog">
      <Container className="space-y-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionIntro
              eyebrow={t("common:nav.blog")}
              title={t("home:sections.blog")}
              description={t("home:blogTeaser.description")}
            />
            <LinkButton intent="outline" to={`/${locale}/blog`}>
              {t("common:actions.viewAll")}
            </LinkButton>
          </div>
        </Reveal>

        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Reveal key={post.id} delay={index * 70} className="h-full">
                <PostCard post={post} locale={locale} headingLevel={3} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <Card data-slot="blog-empty" className="p-8">
              <p className="text-muted">{t("home:blogTeaser.empty")}</p>
            </Card>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
