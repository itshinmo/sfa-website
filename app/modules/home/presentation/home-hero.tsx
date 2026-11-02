import type { HomeContent } from "~/modules/home/home-content-schema";
import { AnchorButton } from "~/shared/ui/button";
import { Container } from "~/shared/ui/container";

type HomeHeroProps = {
  hero: HomeContent["hero"];
};

export function HomeHero({ hero }: HomeHeroProps) {
  return (
    <section
      data-slot="home-hero"
      className="hero-frame relative isolate -mt-[var(--header-height)] flex flex-col overflow-hidden bg-brand-strong text-white"
    >
      <picture data-slot="home-hero-picture">
        <source
          media="(min-width: 768px)"
          srcSet={hero.image.landscapeWebp}
          type="image/webp"
        />
        <source
          media="(min-width: 768px)"
          srcSet={hero.image.landscape}
          type="image/jpeg"
        />
        <source srcSet={hero.image.portraitWebp} type="image/webp" />
        <img
          src={hero.image.portrait}
          alt={hero.image.alt}
          width={1200}
          height={1800}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 size-full object-cover object-center md:object-[50%_58%]"
        />
      </picture>

      <div
        aria-hidden="true"
        data-slot="home-hero-scrim"
        className="hero-scrim absolute inset-0"
      />
      <div
        aria-hidden="true"
        data-slot="home-hero-top-scrim"
        className="hero-top-scrim absolute inset-x-0 top-0 h-40"
      />

      <Container className="relative flex flex-1 flex-col justify-end pt-[calc(var(--header-height)+2rem)] pb-14 sm:pb-18 lg:pb-24">
        <div className="max-w-2xl">
          <p className="hero-rise hero-rise-1 text-xs font-semibold tracking-[0.22em] text-white uppercase sm:text-sm">
            {hero.eyebrow}
          </p>
          <h1 className="hero-rise hero-rise-2 mt-5 text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
            {hero.title} <span className="text-water-100">{hero.titleAccent}</span>
          </h1>
          <p className="hero-rise hero-rise-3 mt-5 max-w-xl text-base leading-normal text-white sm:text-lg">
            {hero.description}
          </p>
          <div className="hero-rise hero-rise-4 mt-8 flex flex-wrap gap-3">
            <AnchorButton
              href="#download"
              intent="surface"
              size="lg"
              className="max-w-full text-center whitespace-normal"
            >
              {hero.primaryCta}
            </AnchorButton>
            <AnchorButton
              href="#showcase"
              intent="inverse"
              size="lg"
              className="max-w-full text-center whitespace-normal"
            >
              {hero.secondaryCta}
            </AnchorButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

type HeroTrustStripProps = {
  highlights: HomeContent["hero"]["highlights"];
};

export function HeroTrustStrip({ highlights }: HeroTrustStripProps) {
  if (highlights.length === 0) return null;

  return (
    <div data-slot="hero-trust-strip" className="border-b border-border bg-surface">
      <Container>
        <dl className="flex flex-wrap items-center gap-x-10 gap-y-3 py-4">
          {highlights.map((highlight) => (
            <div
              key={highlight.id}
              className="flex flex-col-reverse gap-0.5 sm:flex-row sm:items-baseline sm:gap-2"
            >
              <dt className="text-sm text-muted">{highlight.label}</dt>
              <dd className="text-xl font-bold text-brand-strong">{highlight.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  );
}
