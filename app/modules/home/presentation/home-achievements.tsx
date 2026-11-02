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
                  className="flex h-full gap-5 p-6 transition-[box-shadow,transform] duration-[var(--motion-duration-base)] ease-[var(--motion-ease-out)] motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-card-hover"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-sm font-semibold tracking-widest text-water-700"
                  >
                    {numerals[index] ?? String(index + 1)}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-foreground-strong">
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
