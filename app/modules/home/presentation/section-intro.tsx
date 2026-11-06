import { cn } from "~/shared/lib/cn";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
  titleId?: string;
};

export function SectionIntro({
  eyebrow,
  title,
  description,
  className,
  titleId,
}: SectionIntroProps) {
  return (
    <div
      data-slot="section-intro"
      className={cn("max-w-2xl min-w-0 space-y-3", className)}
    >
      <p className="text-sm font-semibold tracking-[0.2em] text-brand uppercase">
        {eyebrow}
      </p>
      <h2
        id={titleId}
        className="text-3xl font-bold wrap-break-word text-foreground-strong sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      <p className="text-lg leading-normal wrap-break-word text-muted">{description}</p>
    </div>
  );
}

export type { SectionIntroProps };
