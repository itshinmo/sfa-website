import type { HomeContent } from "~/modules/home/home-content-schema";
import { SectionIntro } from "~/modules/home/presentation/section-intro";
import { FaqAccordion } from "~/shared/ui/faq-accordion";
import { Container } from "~/shared/ui/container";
import { Reveal } from "~/shared/ui/reveal";
import { Section } from "~/shared/ui/section";

type HomeFaqProps = {
  faq: HomeContent["faq"];
};

export function HomeFaq({ faq }: HomeFaqProps) {
  return (
    <Section id="faq" tone="muted">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <Reveal>
          <SectionIntro
            eyebrow={faq.eyebrow}
            title={faq.title}
            description={faq.description}
          />
        </Reveal>

        <Reveal delay={80}>
          <FaqAccordion
            items={faq.items.map((item) => ({
              value: item.id,
              question: item.question,
              answer: item.answer,
            }))}
          />
          <noscript>
            <div
              data-slot="faq-noscript"
              className="divide-y divide-border overflow-hidden rounded-panel border border-border bg-surface"
            >
              {faq.items.map((item) => (
                <details key={item.id} className="group">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-start text-base font-semibold text-foreground-strong [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <span aria-hidden="true" className="text-muted">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-5 text-sm leading-normal text-muted sm:text-base">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </noscript>
        </Reveal>
      </Container>
    </Section>
  );
}
