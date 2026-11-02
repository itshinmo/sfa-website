import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import type { HomeContent } from "~/modules/home/home-content-schema";
import { SectionIntro } from "~/modules/home/presentation/section-intro";
import { AnchorButton } from "~/shared/ui/button";
import { Card } from "~/shared/ui/card";
import { Container } from "~/shared/ui/container";
import { Reveal } from "~/shared/ui/reveal";
import { Section } from "~/shared/ui/section";

type HomeContactProps = {
  contact: HomeContent["contact"];
};

export function HomeContact({ contact }: HomeContactProps) {
  const { t } = useTranslation("home");

  return (
    <Section id="contact" tone="muted">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
        <Reveal>
          <SectionIntro
            eyebrow={contact.eyebrow}
            title={contact.title}
            description={contact.description}
          />
          <AnchorButton
            href={`mailto:${contact.email}`}
            intent="primary"
            size="lg"
            className="mt-6"
          >
            <Mail aria-hidden="true" className="size-4" />
            {t("contact.emailCta")}
          </AnchorButton>
        </Reveal>

        <Reveal delay={80}>
          <Card data-slot="contact-card" className="p-6 sm:p-8">
            <ul className="divide-y divide-border">
              <ContactDetail
                icon={<Mail aria-hidden="true" className="size-5" />}
                label={t("contact.emailLabel")}
              >
                <a
                  href={`mailto:${contact.email}`}
                  className="break-words underline decoration-border-strong underline-offset-4 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  {contact.email}
                </a>
              </ContactDetail>

              {contact.phone ? (
                <ContactDetail
                  icon={<Phone aria-hidden="true" className="size-5" />}
                  label={t("contact.phoneLabel")}
                >
                  <a
                    href={`tel:${contact.phone}`}
                    className="underline decoration-border-strong underline-offset-4 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                  >
                    <bdi>{contact.phone}</bdi>
                  </a>
                </ContactDetail>
              ) : null}

              <ContactDetail
                icon={<MapPin aria-hidden="true" className="size-5" />}
                label={t("contact.locationLabel")}
              >
                {contact.location}
              </ContactDetail>

              <ContactDetail
                icon={<Clock aria-hidden="true" className="size-5" />}
                label={t("contact.hoursLabel")}
              >
                {contact.hours}
              </ContactDetail>
            </ul>
          </Card>
        </Reveal>
      </Container>
    </Section>
  );
}

type ContactDetailProps = {
  icon: ReactNode;
  label: string;
  children: ReactNode;
};

function ContactDetail({ icon, label, children }: ContactDetailProps) {
  return (
    <li className="flex gap-4 py-4 first:pt-0 last:pb-0">
      <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
          {label}
        </p>
        <p className="mt-1 text-base text-foreground">{children}</p>
      </div>
    </li>
  );
}
