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
  });
});
