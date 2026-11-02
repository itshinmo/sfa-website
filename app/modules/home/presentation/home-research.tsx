import type { HomeContent } from "~/modules/home/home-content-schema";
import { SectionIntro } from "~/modules/home/presentation/section-intro";
import { CountUp } from "~/shared/motion/count-up";
import { Container } from "~/shared/ui/container";
import { Reveal } from "~/shared/ui/reveal";
import { Section } from "~/shared/ui/section";

type HomeResearchProps = {
  research: HomeContent["research"];
  locale: HomeContent["locale"];
};

export function HomeResearch({ research, locale }: HomeResearchProps) {
  return (
    <Section id="research">
      <Container className="space-y-12">
        <Reveal>
          <SectionIntro
            eyebrow={research.eyebrow}
            title={research.title}
            description={research.description}
          />
        </Reveal>

        <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {research.stats.map((stat, index) => (
            <Reveal
              key={stat.id}
              delay={index * 70}
              className="flex h-full flex-col-reverse gap-2 border-t-2 border-water-100 pt-5"
            >
              <dt className="text-sm leading-normal text-muted">{stat.label}</dt>
              <dd className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <CountUp
                  value={stat.value}
                  display={stat.display}
                  locale={locale}
                  className="text-4xl font-bold text-brand-strong sm:text-5xl"
                />
                {stat.unit ? (
                  <span className="text-lg font-semibold text-water-700">
                    <bdi>{stat.unit}</bdi>
                  </span>
                ) : null}
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
