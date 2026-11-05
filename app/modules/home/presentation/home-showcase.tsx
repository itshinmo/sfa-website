import type { HomeContent } from "~/modules/home/home-content-schema";
import { DeviceShowcase } from "~/modules/home/presentation/device-showcase";
import { SectionIntro } from "~/modules/home/presentation/section-intro";
import { formatNumber } from "~/shared/lib/format-number";
import { Container } from "~/shared/ui/container";
import { Reveal } from "~/shared/ui/reveal";
import { Section } from "~/shared/ui/section";

type HomeShowcaseProps = {
  showcase: HomeContent["showcase"];
  locale: HomeContent["locale"];
};

export function HomeShowcase({ showcase, locale }: HomeShowcaseProps) {
  return (
    <Section id="showcase" tone="muted">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <Reveal>
          <SectionIntro
            eyebrow={showcase.eyebrow}
            title={showcase.title}
            description={showcase.description}
          />

          <ol className="mt-10 space-y-6">
            {showcase.steps.map((step) => (
              <li key={step.id} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-bold text-brand-strong"
                >
                  {formatNumber(step.step, locale)}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-foreground-strong">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-normal text-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={120} className="min-w-0">
          <DeviceShowcase title={showcase.title} screens={showcase.screens} />
        </Reveal>
      </Container>
    </Section>
  );
}
