import type { ReactNode } from "react";
import { cn } from "~/shared/lib/cn";

type DeviceFrameProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Generic, trademark-free device chrome. Every element except the screen well is
 * decorative: the screenshot keeps its own accessible name and the figure
 * caption labels it.
 */
export function LaptopFrame({ children, className }: DeviceFrameProps) {
  return (
    <div data-slot="device-laptop" className={cn("relative", className)}>
      <div
        data-slot="device-laptop-lid"
        className="relative rounded-panel border border-brand-900 bg-brand-950 p-2 shadow-panel"
      >
        <span
          aria-hidden="true"
          data-slot="device-laptop-camera"
          className="absolute inset-x-0 top-1 mx-auto size-1 rounded-full bg-brand-700/70"
        />
        <div
          data-slot="device-laptop-screen"
          className="overflow-hidden rounded-card bg-surface"
        >
          {children}
        </div>
      </div>
      <div
        aria-hidden="true"
        data-slot="device-laptop-base"
        className="relative mx-auto -mt-px h-2.5 w-[106%] rounded-b-card border border-t-0 border-brand-900 bg-brand-900 sm:h-3"
      >
        <span
          data-slot="device-laptop-notch"
          className="absolute inset-x-0 top-0 mx-auto h-1 w-1/5 rounded-b-pill bg-brand-700/60"
        />
      </div>
    </div>
  );
}

export function TabletFrame({ children, className }: DeviceFrameProps) {
  return (
    <div data-slot="device-tablet" className={cn("relative", className)}>
      <span
        aria-hidden="true"
        data-slot="device-tablet-button"
        className="absolute end-0 top-1/3 z-10 h-5 w-0.5 rounded-pill bg-brand-700 sm:h-7"
      />
      <div
        data-slot="device-tablet-body"
        className="relative rounded-panel border border-brand-900 bg-brand-950 p-2 shadow-panel"
      >
        <span
          aria-hidden="true"
          data-slot="device-tablet-camera"
          className="absolute inset-x-0 top-0.5 mx-auto size-1 rounded-full bg-brand-700/70"
        />
        <div
          data-slot="device-tablet-screen"
          className="overflow-hidden rounded-card bg-surface"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function PhoneFrame({ children, className }: DeviceFrameProps) {
  return (
    <div data-slot="device-phone" className={cn("relative", className)}>
      <span
        aria-hidden="true"
        data-slot="device-phone-volume-up"
        className="absolute start-0 top-12 z-10 h-4 w-0.5 rounded-pill bg-brand-700 sm:top-16 sm:h-5"
      />
      <span
        aria-hidden="true"
        data-slot="device-phone-volume-down"
        className="absolute start-0 top-18 z-10 h-4 w-0.5 rounded-pill bg-brand-700 sm:top-24 sm:h-5"
      />
      <span
        aria-hidden="true"
        data-slot="device-phone-power"
        className="absolute end-0 top-14 z-10 h-6 w-0.5 rounded-pill bg-brand-700 sm:top-20 sm:h-8"
      />
      <div
        data-slot="device-phone-body"
        className="relative rounded-panel border border-brand-900 bg-brand-950 p-1 pt-2.5 shadow-panel sm:p-1.5 sm:pt-3"
      >
        <span
          aria-hidden="true"
          data-slot="device-phone-camera"
          className="absolute inset-x-0 top-1 mx-auto size-1 rounded-full bg-brand-700"
        />
        <div
          data-slot="device-phone-screen"
          className="relative overflow-hidden rounded-card bg-surface"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export type { DeviceFrameProps };
