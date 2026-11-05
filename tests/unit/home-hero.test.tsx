import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getHomeContent } from "~/modules/home/home-content.server";
import { HomeHero, HeroTrustStrip } from "~/modules/home/presentation/home-hero";

describe("HomeHero", () => {
  const content = getHomeContent("en");

  it("renders one meaningful h1 and both CTAs", () => {
    render(<HomeHero hero={content.hero} />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(content.hero.title);
    expect(heading).toHaveTextContent(content.hero.titleAccent);
    expect(screen.getByRole("link", { name: content.hero.primaryCta })).toHaveAttribute(
      "href",
      "#download",
    );
    expect(screen.getByRole("link", { name: content.hero.secondaryCta })).toHaveAttribute(
      "href",
      "#showcase",
    );
  });

  it("renders the responsive picture with eager high-priority loading", () => {
    const { container } = render(<HomeHero hero={content.hero} />);
    const image = screen.getByRole("img", { name: content.hero.image.alt });
    const sources = [...container.querySelectorAll("source")];

    expect(image).toHaveAttribute("src", content.hero.image.portrait);
    expect(image).toHaveAttribute("fetchpriority", "high");
    expect(image).toHaveAttribute("loading", "eager");
    expect(image).toHaveAttribute("decoding", "async");
    expect(image).toHaveAttribute("width", "1200");
    expect(image).toHaveAttribute("height", "1800");
    expect(sources).toHaveLength(3);
    expect(sources[0]).toHaveAttribute("srcset", content.hero.image.landscapeWebp);
    expect(sources[2]).toHaveAttribute("srcset", content.hero.image.portraitWebp);
  });

  it("uses the full-height top-start composition with a scroll cue", () => {
    const { container } = render(<HomeHero hero={content.hero} />);
    const section = container.querySelector('[data-slot="home-hero"]');

    expect(section).toHaveClass("hero-frame");
    expect(section).not.toHaveAttribute("data-variant");
    expect(container.querySelector('[data-slot="home-hero-copy"]')).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="home-hero-panel"]'),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: content.hero.scrollCue })).toHaveAttribute(
      "href",
      "#features",
    );
  });
});

describe("HeroTrustStrip", () => {
  it("renders the migrated hero highlights below the photo", () => {
    const content = getHomeContent("fa");
    render(<HeroTrustStrip highlights={content.hero.highlights} />);

    for (const highlight of content.hero.highlights) {
      expect(screen.getByText(highlight.value)).toBeInTheDocument();
      expect(screen.getByText(highlight.label)).toBeInTheDocument();
    }
  });
});
