import type { HomeContent } from "~/modules/home/home-content-schema";
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

        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          {showcase.screens.map((screen, index) => (
            <Reveal key={screen.id} delay={index * 70} className="h-full">
              <figure className="group flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface shadow-card transition-shadow duration-[var(--motion-duration-base)] ease-[var(--motion-ease-out)] motion-safe:hover:shadow-card-hover">
                <div
                  aria-hidden="true"
                  className="flex h-7 shrink-0 items-center gap-1 border-b border-border bg-surface-muted px-3 sm:h-9 sm:gap-1.5 sm:px-4"
                >
                  <span className="size-1.5 rounded-full bg-border-strong/60 sm:size-2" />
                  <span className="size-1.5 rounded-full bg-border-strong/40 sm:size-2" />
                  <span className="size-1.5 rounded-full bg-border-strong/25 sm:size-2" />
                </div>
                <div className="overflow-hidden bg-surface-muted">
                  <picture>
                    {screen.webp ? (
                      <source srcSet={screen.webp} type="image/webp" />
                    ) : null}
                    <img
                      src={screen.src}
                      alt={screen.alt}
                      width={1200}
                      height={750}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-[var(--motion-duration-slow)] ease-[var(--motion-ease-out)] motion-safe:group-hover:scale-[1.02]"
                    />
                  </picture>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
