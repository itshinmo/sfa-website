import { describe, expect, it } from "vitest";
import {
  collectContentHeadings,
  narrativeHeadingIds,
} from "~/modules/blog/domain/content-headings";
import type { BlogContent } from "~/modules/blog/domain/post";
import {
  estimateReadingTimeMinutes,
  resolveReadingTimeMinutes,
} from "~/modules/blog/domain/reading-time";
import { blogContentSchema } from "~/modules/blog/infrastructure/blog-api-schemas";
import { mockPosts } from "~/modules/blog/infrastructure/mock-data";

function contentFor(locale: "fa" | "en", template: BlogContent["type"]) {
  const post = mockPosts.find(
    (item) => item.locale === locale && item.template === template,
  );

  if (!post) throw new Error(`Missing ${locale} fixture for ${template}`);
  return post;
}

describe("blog content headings", () => {
  it("builds reference section and subsection targets", () => {
    const headings = collectContentHeadings(contentFor("en", "reference").content);

    expect(headings[0]).toEqual({
      id: "reference-section-1",
      text: "Sandy soil group",
      level: 2,
    });
    expect(headings[1]).toEqual({
      id: "reference-subsection-1-1",
      text: "Sand",
      level: 3,
    });
  });

  it("builds narrative heading targets from structured heading blocks", () => {
    const headings = collectContentHeadings(contentFor("en", "narrative").content);

    expect(headings.map((heading) => heading.level)).toEqual([2, 2]);
    expect(headings[0]?.text).toBe("From surface irrigation to moisture engineering");
    expect(headings[0]?.id).toBe("heading-2");
  });

  it("builds simple section targets and omits case-study chrome", () => {
    const simple = collectContentHeadings(contentFor("en", "simple").content);
    const caseStudy = collectContentHeadings(contentFor("en", "case-study").content);

    expect(simple).toEqual([
      { id: "simple-section-1", text: "What you will find here", level: 2 },
    ]);
    expect(caseStudy).toEqual([]);
  });

  it("uses API ids and de-duplicates duplicates", () => {
    const ids = narrativeHeadingIds([
      { type: "heading", level: 2, text: "One", id: "shared" },
      { type: "paragraph", content: [] },
      { type: "heading", level: 3, text: "Two", id: "shared" },
      { type: "heading", level: 2, text: "Three" },
    ]);

    expect(ids.get(0)).toBe("shared");
    expect(ids.get(2)).toBe("shared-2");
    expect(ids.get(3)).toBe("heading-4");
  });
});

describe("reading time", () => {
  it("estimates at least one minute for every template", () => {
    for (const template of ["reference", "narrative", "simple", "case-study"] as const) {
      const content = contentFor("fa", template).content;
      expect(estimateReadingTimeMinutes(content)).toBeGreaterThanOrEqual(1);
    }
  });

  it("falls back to an estimate when the API sends zero", () => {
    const content = contentFor("en", "reference").content;

    expect(resolveReadingTimeMinutes({ readingTimeMinutes: 0, content })).toBe(
      estimateReadingTimeMinutes(content),
    );
    expect(resolveReadingTimeMinutes({ readingTimeMinutes: 7, content })).toBe(7);
  });
});

describe("blog API schemas", () => {
  it("accepts all four template fixtures", () => {
    for (const template of ["reference", "narrative", "simple", "case-study"] as const) {
      const post = contentFor("fa", template);
      expect(blogContentSchema.safeParse(post.content).success).toBe(true);
    }
  });

  it("rejects an unknown template payload", () => {
    expect(blogContentSchema.safeParse({ type: "newsletter" }).success).toBe(false);
  });
});
