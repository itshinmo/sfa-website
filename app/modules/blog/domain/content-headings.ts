import type { BlogContent, NarrativeBlock } from "./post";

export type BlogContentHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

const hiddenIdCharacters = /["'<>#?&%]/g;

function sanitizeHeadingId(value: string | undefined, fallback: string) {
  const cleaned = value?.trim().replace(/\s+/g, "-").replace(hiddenIdCharacters, "");
  return cleaned || fallback;
}

function uniqueHeadingId(base: string, used: Set<string>) {
  let id = base;
  let suffix = 2;

  while (used.has(id)) {
    id = `${base}-${suffix}`;
    suffix += 1;
  }

  used.add(id);
  return id;
}

export function referenceSectionId(index: number) {
  return `reference-section-${index + 1}`;
}

export function referenceSubsectionId(sectionIndex: number, subsectionIndex: number) {
  return `reference-subsection-${sectionIndex + 1}-${subsectionIndex + 1}`;
}

export function simpleSectionId(index: number) {
  return `simple-section-${index + 1}`;
}

/**
 * Stable ids for narrative headings. Uses the API-provided id when present and
 * de-duplicates collisions without depending on the renderer.
 */
export function narrativeHeadingIds(blocks: NarrativeBlock[]) {
  const used = new Set<string>();
  const ids = new Map<number, string>();

  blocks.forEach((block, index) => {
    if (block.type !== "heading") return;
    ids.set(
      index,
      uniqueHeadingId(sanitizeHeadingId(block.id, `heading-${index + 1}`), used),
    );
  });

  return ids;
}

/**
 * Headings that belong in the table of contents. Case-study sections are fixed
 * page chrome rather than authored headings, so they are intentionally absent.
 */
export function collectContentHeadings(content: BlogContent): BlogContentHeading[] {
  switch (content.type) {
    case "reference":
      return content.sections.flatMap((section, sectionIndex) => [
        {
          id: referenceSectionId(sectionIndex),
          text: section.title,
          level: 2 as const,
        },
        ...section.subsections.map((subsection, subsectionIndex) => ({
          id: referenceSubsectionId(sectionIndex, subsectionIndex),
          text: subsection.title,
          level: 3 as const,
        })),
      ]);

    case "narrative": {
      const ids = narrativeHeadingIds(content.blocks);

      return content.blocks.flatMap((block, index) =>
        block.type === "heading"
          ? [
              {
                id: ids.get(index) ?? `heading-${index + 1}`,
                text: block.text,
                level: block.level,
              },
            ]
          : [],
      );
    }

    case "simple":
      return content.sections.map((section, index) => ({
        id: simpleSectionId(index),
        text: section.title,
        level: 2 as const,
      }));

    default:
      return [];
  }
}
