import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getHomeContent } from "~/modules/home/home-content.server";
import { DeviceShowcase } from "~/modules/home/presentation/device-showcase";

describe("DeviceShowcase", () => {
  const content = getHomeContent("en");

  it("renders the three app screens in stage order", () => {
    render(
      <DeviceShowcase
        title={content.showcase.title}
        screens={content.showcase.screens}
      />,
    );

    const images = screen.getAllByRole("img");

    expect(images).toHaveLength(3);
    expect(images.map((image) => image.getAttribute("src"))).toEqual([
      "/images/app/app-soil-lab.webp",
      "/images/app/app-irrigation.webp",
      "/images/app/app-assistant.webp",
    ]);
    expect(images.map((image) => image.getAttribute("alt"))).toEqual(
      content.showcase.screens.map((screen) => screen.alt),
    );
  });

  it("shows a localized caption for every screenshot", () => {
    render(
      <DeviceShowcase
        title={content.showcase.title}
        screens={content.showcase.screens}
      />,
    );

    for (const shot of content.showcase.screens) {
      expect(screen.getByText(shot.label)).toBeInTheDocument();
    }
  });

  it("keeps screenshots lazy with explicit dimensions", () => {
    render(
      <DeviceShowcase
        title={content.showcase.title}
        screens={content.showcase.screens}
      />,
    );

    for (const image of screen.getAllByRole("img")) {
      const source = content.showcase.screens.find(
        (candidate) => candidate.src === image.getAttribute("src"),
      );

      expect(image).toHaveAttribute("loading", "lazy");
      expect(image).toHaveAttribute("decoding", "async");
      expect(image).toHaveAttribute("width", String(source?.width));
      expect(image).toHaveAttribute("height", String(source?.height));
    }
  });

  it("marks each figure with its device type", () => {
    const { container } = render(
      <DeviceShowcase
        title={content.showcase.title}
        screens={content.showcase.screens}
      />,
    );

    const figures = [
      ...container.querySelectorAll<HTMLElement>('[data-slot="device-figure"]'),
    ];

    expect(figures.map((figure) => figure.dataset.device)).toEqual([
      "laptop",
      "tablet",
      "phone",
    ]);
  });
});
