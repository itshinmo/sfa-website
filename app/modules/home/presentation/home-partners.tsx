import type { HomeContent } from "~/modules/home/home-content-schema";
import { SectionIntro } from "~/modules/home/presentation/section-intro";
import { Card } from "~/shared/ui/card";
import { Container } from "~/shared/ui/container";
import { Reveal } from "~/shared/ui/reveal";
import { Section } from "~/shared/ui/section";

const partnerDimensions: Record<string, { width: number; height: number }> = {
  srbiau: { width: 270, height: 180 },
  swri: { width: 144, height: 144 },
};

type HomePartnersProps = {
  partners: HomeContent["partners"];
};

export function HomePartners({ partners }: HomePartnersProps) {
  return (
    <Section id="partners" tone="muted">
      <Container className="space-y-12">
        <Reveal>
          <SectionIntro
            eyebrow={partners.eyebrow}
            title={partners.title}
            description={partners.description}
          />
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2">
          {partners.items.map((partner, index) => {
            const dimensions = partnerDimensions[partner.id] ?? {
              width: 144,
              height: 144,
            };

            return (
              <li key={partner.id} className="h-full">
                <Reveal delay={index * 70} className="h-full">
                  <Card
                    data-slot="partner-card"
                    className="flex h-full flex-col items-center justify-center gap-6 p-8 text-center transition-[box-shadow,transform] duration-[var(--motion-duration-base)] ease-[var(--motion-ease-out)] motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-card-hover"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.logoAlt}
                      width={dimensions.width}
                      height={dimensions.height}
                      loading="lazy"
                      decoding="async"
                      className="h-16 w-auto max-w-full object-contain"
                    />
                    <h3 className="max-w-sm text-lg font-bold text-foreground-strong">
                      {partner.name}
                    </h3>
                  </Card>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
