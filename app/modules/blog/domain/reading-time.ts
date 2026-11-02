import type { BlogContent, InlineText, ParagraphBlock } from "./post";

const WORDS_PER_MINUTE = 200;

function inlineText(nodes: InlineText[]) {
  return nodes.map((node) => node.text).join(" ");
}

function paragraphs(blocks: ParagraphBlock[]) {
  return blocks.map((block) => inlineText(block.content)).join(" ");
}

function contentText(content: BlogContent) {
  switch (content.type) {
    case "reference":
      return [
        paragraphs(content.intro),
        ...content.sections.flatMap((section) => [
          section.title,
          ...section.subsections.flatMap((subsection) => [
            subsection.title,
            paragraphs(subsection.paragraphs),
            subsection.management ? paragraphs([subsection.management]) : "",
          ]),
        ]),
      ].join(" ");

    case "narrative":
      return [
        paragraphs(content.intro),
        ...content.blocks.map((block) => {
          switch (block.type) {
            case "paragraph":
              return inlineText(block.content);
            case "heading":
              return block.text;
            case "image":
              return [block.image.alt, block.caption ?? ""].join(" ");
            case "quote":
              return [inlineText(block.content), block.cite ?? ""].join(" ");
            case "list":
              return block.items.map(inlineText).join(" ");
            default:
              return "";
          }
        }),
      ].join(" ");

    case "simple":
      return [
        paragraphs(content.intro),
        ...content.sections.flatMap((section) => [
          section.title,
          paragraphs(section.paragraphs),
        ]),
      ].join(" ");

    case "case-study":
      return [
        paragraphs(content.challenge),
        paragraphs(content.solution),
        ...content.results.flatMap((result) => [
          result.label,
          result.value,
          result.description ?? "",
        ]),
        ...content.gallery.map((image) => image.alt),
        content.cta?.label ?? "",
      ].join(" ");

    default:
      return "";
  }
}

export function estimateReadingTimeMinutes(content: BlogContent) {
  const words = contentText(content).split(/\s+/u).filter(Boolean).length;

  if (words === 0) return 1;

  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function resolveReadingTimeMinutes(post: {
  readingTimeMinutes: number;
  content: BlogContent;
}) {
  return post.readingTimeMinutes > 0
    ? post.readingTimeMinutes
    : estimateReadingTimeMinutes(post.content);
}
