import { Droplets, Sparkles, Sprout, Sun } from "lucide-react";
import type { HomeContent } from "~/modules/home/home-content-schema";
import { SectionIntro } from "~/modules/home/presentation/section-intro";
import { Card } from "~/shared/ui/card";
import { Container } from "~/shared/ui/container";
import { Reveal } from "~/shared/ui/reveal";
import { Section } from "~/shared/ui/section";

const featureIcons: Record<string, typeof Droplets> = {
  "water-optimization": Droplets,
  "ai-assistant": Sparkles,
  "multi-crop-support": Sprout,
  "arid-regions": Sun,
};

type HomeFeaturesProps = {
  features: HomeContent["features"];
};

export function HomeFeatures({ features }: HomeFeaturesProps) {
  return (
    <Section id="features">
      <Container className="space-y-12">
        <Reveal>
          <SectionIntro
            eyebrow={features.eyebrow}
            title={features.title}
            description={features.description}
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {features.items.map((feature, index) => {
            const Icon = featureIcons[feature.id] ?? Sprout;

            return (
              <Reveal key={feature.id} delay={index * 60} className="h-full">
                <Card
                  data-slot="feature-card"
                  className="group flex h-full flex-col p-6 transition-[box-shadow,transform] duration-[var(--motion-duration-base)] ease-[var(--motion-ease-out)] motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-card-hover"
                >
                  <span className="flex size-12 items-center justify-center rounded-card bg-brand-soft text-brand-strong">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-foreground-strong">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-base leading-normal text-muted">
                    {feature.description}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
