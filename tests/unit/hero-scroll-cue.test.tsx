import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { HeroScrollCue } from "~/modules/home/presentation/hero-scroll-cue";

function setScrollY(value: number) {
  Object.defineProperty(window, "scrollY", {
    configurable: true,
    writable: true,
    value,
  });
}

function scrollTo(value: number) {
  setScrollY(value);
  fireEvent.scroll(window);
}

describe("HeroScrollCue", () => {
  afterEach(() => {
    setScrollY(0);
  });

  it("is a labelled anchor to the features section", () => {
    render(<HeroScrollCue label="Continue to the next section" />);

    const cue = screen.getByRole("link", { name: "Continue to the next section" });

    expect(cue).toHaveAttribute("href", "#features");
    expect(cue).toHaveAttribute("data-visible", "true");
    expect(cue).not.toHaveAttribute("aria-hidden");
    expect(cue).not.toHaveAttribute("tabindex");
  });

  it("leaves the accessibility tree and tab order after a short scroll", () => {
    render(<HeroScrollCue label="Continue to the next section" />);

    const cue = screen.getByRole("link", { name: "Continue to the next section" });

    scrollTo(120);

    expect(cue).toHaveAttribute("data-visible", "false");
    expect(cue).toHaveAttribute("aria-hidden", "true");
    expect(cue).toHaveAttribute("tabindex", "-1");
    expect(cue).toHaveClass("invisible", "opacity-0", "pointer-events-none");
  });

  it("returns when the page is scrolled back to the top", () => {
    render(<HeroScrollCue label="Continue to the next section" />);

    scrollTo(240);
    scrollTo(0);

    const cue = screen.getByRole("link", { name: "Continue to the next section" });

    expect(cue).toHaveAttribute("data-visible", "true");
    expect(cue).not.toHaveAttribute("aria-hidden");
    expect(cue).not.toHaveAttribute("tabindex");
    expect(cue).toHaveClass("visible", "opacity-50");
  });
});
