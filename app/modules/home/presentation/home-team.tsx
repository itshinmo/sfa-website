import { Pause, Play } from "lucide-react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { HomeContent } from "~/modules/home/home-content-schema";
import { SectionIntro } from "~/modules/home/presentation/section-intro";
import { cn } from "~/shared/lib/cn";
import { Button } from "~/shared/ui/button";
import { Card } from "~/shared/ui/card";
import { Container } from "~/shared/ui/container";
import { Reveal } from "~/shared/ui/reveal";
import { Section } from "~/shared/ui/section";

type TeamMember = HomeContent["team"]["members"][number];

type TeamCardProps = {
  member: TeamMember;
  clone?: boolean;
};

function TeamCard({ member, clone = false }: TeamCardProps) {
  const { t } = useTranslation("home");

  return (
    <Card
      data-slot={clone ? "team-card-clone" : "team-card"}
      className={cn(
        "group flex h-full w-[17rem] shrink-0 snap-start flex-col overflow-hidden p-0 transition-[box-shadow,transform] duration-[var(--motion-duration-base)] ease-[var(--motion-ease-out)] motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-card-hover sm:w-[18rem]",
      )}
    >
      <div className="flex flex-1 flex-col items-center gap-3 p-5 text-center">
        <div className="size-28 shrink-0 overflow-hidden rounded-full border-2 border-brand/30 bg-surface-muted shadow-sm">
          <img
            src={member.image}
            alt={member.imageAlt}
            width={512}
            height={512}
            loading="lazy"
            decoding="async"
            className="size-full object-cover object-top transition-transform duration-[var(--motion-duration-slow)] ease-[var(--motion-ease-out)] motion-safe:group-hover:scale-105"
          />
        </div>

        <div>
          <h3 className="text-xl font-bold text-foreground-strong">{member.name}</h3>
          <p className="mt-1 text-sm leading-snug font-semibold text-brand">
            {member.role}
          </p>
        </div>

        <p className="line-clamp-3 min-h-[4.5rem] text-sm leading-normal text-muted">
          {member.bio}
        </p>

        {member.links.length > 0 ? (
          <ul className="mt-auto flex flex-wrap justify-center gap-2">
            {member.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={clone ? -1 : undefined}
                  className="inline-flex min-h-11 items-center gap-1 rounded-pill border border-border px-3 text-xs font-semibold text-brand transition-[background-color,border-color,color,transform] duration-[var(--motion-duration-fast)] hover:-translate-y-0.5 hover:border-brand hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  {link.label}
                  <span className="sr-only"> ({t("newTab")})</span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Card>
  );
}

type HomeTeamProps = {
  team: HomeContent["team"];
};

/**
 * A continuous, pauseable team rail on desktop and a native snap-scroller on
 * small screens. The clone set is presentational only: its links are removed
 * from the tab order and the list is hidden from assistive technology.
 */
export function HomeTeam({ team }: HomeTeamProps) {
  const { t } = useTranslation("home");
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  useAnimationFrame((_time, delta) => {
    if (!desktop || paused || interacting || reduceMotion) return;

    const track = trackRef.current;
    if (!track) return;

    const half = track.scrollWidth / 2;
    if (half <= 0) return;

    const speed = 0.032;
    let next = x.get() - delta * speed;

    if (next <= -half) next += half;
    if (next > 0) next -= half;

    x.set(next);
  });

  return (
    <Section id="team">
      <Container className="space-y-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <SectionIntro
              eyebrow={team.eyebrow}
              title={team.title}
              description={team.description}
            />
            <Button
              type="button"
              intent="outline"
              size="sm"
              className="hidden md:inline-flex"
              aria-pressed={paused}
              aria-label={paused ? t("teamCarousel.play") : t("teamCarousel.pause")}
              onClick={() => setPaused((value) => !value)}
            >
              {paused ? (
                <Play aria-hidden="true" className="size-4" />
              ) : (
                <Pause aria-hidden="true" className="size-4" />
              )}
              <span>{paused ? t("teamCarousel.play") : t("teamCarousel.pause")}</span>
            </Button>
          </div>
        </Reveal>

        <div
          data-slot="team-carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label={t("teamCarousel.label")}
          className="relative -mx-4 [scrollbar-width:none] overflow-x-auto px-4 pb-4 md:mx-0 md:overflow-hidden md:px-0 [&::-webkit-scrollbar]:hidden"
          onMouseEnter={() => setInteracting(true)}
          onMouseLeave={() => setInteracting(false)}
          onFocusCapture={() => setInteracting(true)}
          onBlurCapture={() => setInteracting(false)}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-12 bg-linear-to-r from-background to-transparent md:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-12 bg-linear-to-l from-background to-transparent md:block" />

          <motion.div
            ref={trackRef}
            data-slot="team-track"
            className="flex w-max gap-4"
            style={{ x }}
          >
            <ul className="flex shrink-0 gap-4">
              {team.members.map((member) => (
                <li key={member.id}>
                  <TeamCard member={member} />
                </li>
              ))}
            </ul>
            <ul aria-hidden="true" className="hidden shrink-0 gap-4 md:flex">
              {team.members.map((member) => (
                <li key={`${member.id}-clone`}>
                  <TeamCard member={member} clone />
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
