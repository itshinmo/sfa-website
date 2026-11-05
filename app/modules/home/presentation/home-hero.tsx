import type { HomeContent } from "~/modules/home/home-content-schema";
import { HeroScrollCue } from "~/modules/home/presentation/hero-scroll-cue";
import { AnchorButton } from "~/shared/ui/button";
import { Container } from "~/shared/ui/container";

type HomeHeroProps = {
  hero: HomeContent["hero"];
};

type HeroPictureProps = {
  image: HomeContent["hero"]["image"];
};

function HeroPicture({ image }: HeroPictureProps) {
  return (
    <picture data-slot="home-hero-picture">
      <source media="(min-width: 768px)" srcSet={image.landscapeWebp} type="image/webp" />
      <source media="(min-width: 768px)" srcSet={image.landscape} type="image/jpeg" />
      <source srcSet={image.portraitWebp} type="image/webp" />
      <img
        src={image.portrait}
        alt={image.alt}
        width={1200}
        height={1800}
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className="hero-image absolute inset-0 size-full object-cover object-center md:object-[50%_58%]"
      />
    </picture>
  );
}

/**
 * Full-height editorial hero.
 *
 * The copy sits at the logical start and near the top, over a top-weighted
 * green scrim. The scroll cue is the only ambient motion. See ADR-009 and its
 * addendum for the chosen composition.
 */
export function HomeHero({ hero }: HomeHeroProps) {
  return (
    <section
      data-slot="home-hero"
      className="hero-frame relative isolate -mt-[var(--header-height)] flex flex-col overflow-hidden bg-brand-950 text-white"
    >
      <HeroPicture image={hero.image} />

      <div
        aria-hidden="true"
        data-slot="home-hero-scrim"
        className="hero-scrim-top absolute inset-0"
      />

      <Container className="relative flex flex-1 flex-col pt-[calc(var(--header-height)+2.5rem)] pb-32">
        <div data-slot="home-hero-copy" className="max-w-[42rem]">
          <p
            data-slot="home-hero-eyebrow"
            className="hero-rise hero-rise-1 text-xs font-semibold tracking-[0.22em] text-white uppercase sm:text-sm"
          >
            {hero.eyebrow}
          </p>
          <h1
            data-slot="home-hero-title"
            className="hero-rise hero-rise-2 mt-5 text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl"
          >
            {hero.title} <span className="text-brand-300">{hero.titleAccent}</span>
          </h1>
          <p
            data-slot="home-hero-description"
            className="hero-rise hero-rise-3 mt-5 max-w-xl text-base leading-normal text-white/90 sm:text-lg"
          >
            {hero.description}
          </p>

          <div
            data-slot="home-hero-actions"
            className="hero-rise hero-rise-4 mt-8 flex flex-wrap gap-3"
          >
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

      <HeroScrollCue label={hero.scrollCue} />
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
