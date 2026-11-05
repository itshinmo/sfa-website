import type { HomeContent } from "~/modules/home/home-content-schema";
import {
  LaptopFrame,
  PhoneFrame,
  TabletFrame,
} from "~/modules/home/presentation/device-frame";
import { cn } from "~/shared/lib/cn";

type ShowcaseScreen = HomeContent["showcase"]["screens"][number];

const frameByDevice = {
  laptop: LaptopFrame,
  tablet: TabletFrame,
  phone: PhoneFrame,
} as const;

/**
 * Per-device placement in the desktop stage. Mobile widths live on the same
 * figures so only the layout mode changes at `lg`.
 */
const placementByDevice: Record<ShowcaseScreen["device"], string> = {
  laptop: "lg:absolute lg:inset-x-[8%] lg:top-[3%] lg:z-10 lg:w-auto lg:-rotate-2",
  tablet:
    "w-3/5 max-w-xs lg:absolute lg:end-0 lg:bottom-[6%] lg:z-20 lg:w-[30%] lg:max-w-none lg:rotate-2",
  phone:
    "w-1/3 max-w-36 lg:absolute lg:start-0 lg:bottom-[4%] lg:z-30 lg:w-1/5 lg:max-w-none lg:-rotate-2",
};

type DeviceFigureProps = {
  screen: ShowcaseScreen;
  className?: string;
};

function DeviceFigure({ screen, className }: DeviceFigureProps) {
  const Frame = frameByDevice[screen.device];

  return (
    <figure
      data-slot="device-figure"
      data-device={screen.device}
      className={cn("relative min-w-0", className)}
    >
      <Frame>
        <img
          data-slot="device-screen-image"
          src={screen.src}
          alt={screen.alt}
          width={screen.width}
          height={screen.height}
          loading="lazy"
          decoding="async"
          className="w-full bg-surface-muted"
        />
      </Frame>
      <figcaption
        data-slot="device-caption"
        className="mt-2.5 text-center text-xs font-semibold text-brand-strong sm:mt-3 sm:text-sm"
      >
        {screen.label}
      </figcaption>
    </figure>
  );
}

type DeviceShowcaseProps = {
  title: string;
  screens: ShowcaseScreen[];
};

export function DeviceShowcase({ title, screens }: DeviceShowcaseProps) {
  const laptop = screens.find((screen) => screen.device === "laptop");
  const tablet = screens.find((screen) => screen.device === "tablet");
  const phone = screens.find((screen) => screen.device === "phone");

  return (
    <div
      data-slot="device-showcase"
      role="group"
      aria-label={title}
      className="relative overflow-hidden rounded-panel border border-brand-100 bg-brand-50 p-4 shadow-panel sm:p-6 lg:p-8"
    >
      <span
        aria-hidden="true"
        data-slot="device-showcase-glow"
        className="pointer-events-none absolute end-0 -top-24 size-56 rounded-full bg-brand-100/70 blur-3xl"
      />

      <div
        data-slot="device-showcase-stage"
        className="relative flex flex-col gap-6 sm:gap-8 lg:block lg:aspect-[4/3] lg:[transform:perspective(1800px)_rotateX(3deg)]"
      >
        {laptop ? (
          <DeviceFigure screen={laptop} className={placementByDevice.laptop} />
        ) : null}

        {tablet || phone ? (
          <div
            data-slot="device-showcase-pair"
            className="flex items-end justify-center gap-3 sm:gap-6 lg:contents"
          >
            {tablet ? (
              <DeviceFigure screen={tablet} className={placementByDevice.tablet} />
            ) : null}
            {phone ? (
              <DeviceFigure screen={phone} className={placementByDevice.phone} />
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export type { DeviceShowcaseProps };
