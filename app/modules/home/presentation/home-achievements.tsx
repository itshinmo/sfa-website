import type { HomeContent } from "~/modules/home/home-content-schema";
import { SectionIntro } from "~/modules/home/presentation/section-intro";
import { Card } from "~/shared/ui/card";
import { Container } from "~/shared/ui/container";
import { Reveal } from "~/shared/ui/reveal";
import { Section } from "~/shared/ui/section";

const numerals = ["I", "II", "III", "IV", "V", "VI"];

type HomeAchievementsProps = {
  achievements: HomeContent["achievements"];
};

export function HomeAchievements({ achievements }: HomeAchievementsProps) {
  return (
    <Section id="achievements" tone="muted">
      <Container className="space-y-12">
        <Reveal>
          <SectionIntro
            eyebrow={achievements.eyebrow}
            title={achievements.title}
            description={achievements.description}
          />
        </Reveal>

        <ol className="grid gap-4 md:grid-cols-2">
          {achievements.items.map((item, index) => (
            <li key={item.id} className="h-full">
              <Reveal delay={index * 60} className="h-full">
                <Card
                  data-slot="achievement-card"
                  className="flex h-full items-start gap-4 p-6 transition-[box-shadow,transform] duration-(--motion-duration-base) ease-(--motion-ease-out) motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-card-hover"
                >
                  <span
                    aria-hidden="true"
                    className="w-7 shrink-0 font-mono text-sm leading-7 font-semibold tracking-widest text-water-700"
                  >
                    {numerals[index] ?? String(index + 1)}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xl leading-7 font-bold text-foreground-strong">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-normal text-muted">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
