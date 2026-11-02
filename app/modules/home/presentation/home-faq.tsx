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
        </Reveal>
      </Container>
    </Section>
  );
}
