import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { HomeContent } from "~/modules/home/home-content-schema";
import { SectionIntro } from "~/modules/home/presentation/section-intro";
import { cn } from "~/shared/lib/cn";
import { AnchorButton, Button } from "~/shared/ui/button";
import { Card } from "~/shared/ui/card";
import { Container } from "~/shared/ui/container";
import { Reveal } from "~/shared/ui/reveal";
import { Section } from "~/shared/ui/section";

type DownloadItem = HomeContent["downloads"]["items"][number];

const mobileIds = new Set(["google-play", "bazaar", "myket", "apk"]);
const desktopIds = new Set(["windows", "macos", "linux"]);

type HomeDownloadsProps = {
  downloads: HomeContent["downloads"];
};

export function HomeDownloads({ downloads }: HomeDownloadsProps) {
  const { t } = useTranslation(["home", "common"]);
  const webItems = downloads.items.filter((item) => item.id === "web");
  const mobileItems = downloads.items.filter((item) => mobileIds.has(item.id));
  const desktopItems = downloads.items.filter((item) => desktopIds.has(item.id));

  return (
    <Section id="download">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <Reveal className="min-w-0">
          <SectionIntro
            eyebrow={downloads.eyebrow}
            title={downloads.title}
            description={downloads.description}
          />
          <p id="download-note" className="mt-5 text-sm leading-normal text-muted">
            {downloads.note}
          </p>
        </Reveal>

        <Reveal delay={80} className="min-w-0">
          <div className="grid gap-4 md:grid-cols-2">
            {webItems.length > 0 ? (
              <DownloadGroup
                title={t("home:downloads.groups.web")}
                items={webItems}
                newTabLabel={t("home:newTab")}
                comingSoonLabel={t("common:actions.comingSoon")}
                className="md:col-span-2"
              />
            ) : null}
            {mobileItems.length > 0 ? (
              <DownloadGroup
                title={t("home:downloads.groups.mobile")}
                items={mobileItems}
                newTabLabel={t("home:newTab")}
                comingSoonLabel={t("common:actions.comingSoon")}
              />
            ) : null}
            {desktopItems.length > 0 ? (
              <DownloadGroup
                title={t("home:downloads.groups.desktop")}
                items={desktopItems}
                newTabLabel={t("home:newTab")}
                comingSoonLabel={t("common:actions.comingSoon")}
              />
            ) : null}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

type DownloadGroupProps = {
  title: string;
  items: DownloadItem[];
  newTabLabel: string;
  comingSoonLabel: string;
  className?: string;
};

function DownloadGroup({
  title,
  items,
  newTabLabel,
  comingSoonLabel,
  className,
}: DownloadGroupProps) {
  return (
    <Card
      data-slot="download-group"
      className={cn("flex h-full min-w-0 flex-col gap-4 p-6", className)}
    >
      <h3 className="text-lg font-bold text-foreground-strong">{title}</h3>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <DownloadAction
            key={item.id}
            item={item}
            newTabLabel={newTabLabel}
            comingSoonLabel={comingSoonLabel}
          />
        ))}
      </div>
    </Card>
  );
}

type DownloadActionProps = {
  item: DownloadItem;
  newTabLabel: string;
  comingSoonLabel: string;
};

function DownloadAction({ item, newTabLabel, comingSoonLabel }: DownloadActionProps) {
  if (item.status === "available" && item.href) {
    return (
      <AnchorButton
        href={item.href}
        target="_blank"
        rel="noreferrer"
        aria-describedby="download-note"
        className="min-h-11 w-full justify-between px-5 py-3 text-start"
      >
        <span>{item.label}</span>
        <ArrowUpRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
        <span className="sr-only"> ({newTabLabel})</span>
      </AnchorButton>
    );
  }

  return (
    <Button
      disabled
      intent="outline"
      aria-describedby="download-note"
      className="min-h-11 w-full justify-between px-5 py-3 text-start opacity-60"
    >
      <span>{item.label}</span>
      <span className="text-xs font-normal">{comingSoonLabel}</span>
    </Button>
  );
}
