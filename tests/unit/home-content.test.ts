import { describe, expect, it } from "vitest";
import en from "../../content/home/en.json";
import fa from "../../content/home/fa.json";
import { homeContentSchema } from "~/modules/home/home-content-schema";

describe("homepage content contract", () => {
  it("validates both locales", () => {
    expect(() => homeContentSchema.parse(fa)).not.toThrow();
    expect(() => homeContentSchema.parse(en)).not.toThrow();
  });

  it("keeps stable ids aligned across locales", () => {
    const faContent = homeContentSchema.parse(fa);
    const enContent = homeContentSchema.parse(en);

    expect(enContent.features.items.map((item) => item.id)).toEqual(
      faContent.features.items.map((item) => item.id),
    );
    expect(enContent.team.members.map((item) => item.id)).toEqual(
      faContent.team.members.map((item) => item.id),
    );
    expect(enContent.downloads.items.map((item) => item.id)).toEqual(
      faContent.downloads.items.map((item) => item.id),
    );
    expect(enContent.showcase.screens.map((screen) => screen.id)).toEqual(
      faContent.showcase.screens.map((screen) => screen.id),
    );
  });

  it("provides a scroll cue and one screen per device", () => {
    for (const content of [homeContentSchema.parse(fa), homeContentSchema.parse(en)]) {
      expect(content.hero.scrollCue.trim()).not.toBe("");
      expect(content.showcase.screens.map((screen) => screen.device)).toEqual([
        "laptop",
        "tablet",
        "phone",
      ]);

      for (const screen of content.showcase.screens) {
        expect(screen.label.trim()).not.toBe("");
        expect(screen.width).toBeGreaterThan(0);
        expect(screen.height).toBeGreaterThan(0);
      }
    }
  });
});
