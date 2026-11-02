import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { HomeContent } from "~/modules/home/home-content-schema";
import { SectionIntro } from "~/modules/home/presentation/section-intro";
import { Card } from "~/shared/ui/card";
import { Container } from "~/shared/ui/container";
import { Reveal } from "~/shared/ui/reveal";
import { Section } from "~/shared/ui/section";

type HomeTeamProps = {
  team: HomeContent["team"];
};

export function HomeTeam({ team }: HomeTeamProps) {
  const { t } = useTranslation("home");

  return (
    <Section id="team">
      <Container className="space-y-12">
        <Reveal>
          <SectionIntro
            eyebrow={team.eyebrow}
            title={team.title}
            description={team.description}
          />
        </Reveal>

        <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {team.members.map((member, index) => (
            <li key={member.id} className="h-full">
              <Reveal delay={index * 60} className="h-full">
                <Card
                  data-slot="team-card"
                  className="group flex h-full flex-col overflow-hidden p-0 transition-shadow duration-[var(--motion-duration-base)] ease-[var(--motion-ease-out)] motion-safe:hover:shadow-card-hover"
                >
                  <div className="aspect-square overflow-hidden bg-surface-muted">
                    <img
                      src={member.image}
                      alt={member.imageAlt}
                      width={512}
                      height={512}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover object-top transition-transform duration-[var(--motion-duration-slow)] ease-[var(--motion-ease-out)] motion-safe:group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-6">
                    <div>
                      <h3 className="text-sm leading-snug font-bold text-foreground-strong sm:text-xl">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-[11px] leading-snug font-semibold text-brand sm:text-sm">
                        {member.role}
                      </p>
                    </div>
                    <p className="line-clamp-2 text-[11px] leading-snug text-muted sm:text-sm sm:leading-normal">
                      {member.bio}
                    </p>

                    {member.links.length > 0 ? (
                      <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                        {member.links.map((link) => (
                          <li key={link.href}>
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex min-h-11 items-center gap-1 rounded-pill border border-border px-2 text-[11px] font-semibold text-brand transition-colors hover:border-brand hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus sm:gap-1.5 sm:px-4 sm:text-sm"
                            >
                              {link.label}
                              <ArrowUpRight
                                aria-hidden="true"
                                className="size-3 sm:size-4 rtl:-scale-x-100"
                              />
                              <span className="sr-only"> ({t("newTab")})</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
