import { Fragment, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  narrativeHeadingIds,
  referenceSectionId,
  referenceSubsectionId,
  simpleSectionId,
} from "../domain/content-headings";
import type {
  BlogContent,
  ImageBlock,
  InlineText,
  ListBlock,
  NarrativeBlock,
  ParagraphBlock,
  QuoteBlock,
} from "../domain/post";

type PostContentProps = {
  content: BlogContent;
};

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

function Inline({ nodes }: { nodes: InlineText[] }) {
  return (
    <>
      {nodes.map((node, index) => {
        let value: ReactNode = node.text;

        if (node.code) {
          value = (
            <code
              data-slot="post-inline-code"
              className="rounded-xs bg-surface-muted px-1.5 py-0.5 font-mono text-[0.9em]"
            >
              {value}
            </code>
          );
        }
        if (node.italic) value = <em>{value}</em>;
        if (node.bold) value = <strong className="font-semibold">{value}</strong>;
        if (node.href) {
          value = (
            <a
              href={node.href}
              rel={isExternalHref(node.href) ? "noopener noreferrer" : undefined}
              className="underline decoration-brand-300 underline-offset-4 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              {value}
            </a>
          );
        }

        return <Fragment key={`${node.text}-${index}`}>{value}</Fragment>;
      })}
    </>
  );
}

function Paragraph({ block }: { block: ParagraphBlock }) {
  return (
    <p data-slot="post-paragraph">
      <Inline nodes={block.content} />
    </p>
  );
}

function Image({ block }: { block: ImageBlock }) {
  return (
    <figure data-slot="post-figure" className="my-8">
      <img
        src={block.image.url}
        alt={block.image.alt}
        width={block.image.width}
        height={block.image.height}
        srcSet={block.image.srcSet}
        loading="lazy"
        decoding="async"
        className="w-full rounded-card"
      />
      {block.caption && (
        <figcaption className="mt-3 text-sm text-muted">{block.caption}</figcaption>
      )}
    </figure>
  );
}

function Quote({ block }: { block: QuoteBlock }) {
  return (
    <blockquote
      data-slot="post-quote"
      className="my-8 border-s-4 border-brand-300 ps-6 text-xl text-foreground-strong italic"
    >
      <p>
        <Inline nodes={block.content} />
      </p>
      {block.cite && (
        <footer className="mt-2 text-sm text-muted not-italic">— {block.cite}</footer>
      )}
    </blockquote>
  );
}

function List({ block }: { block: ListBlock }) {
  const Tag = block.ordered ? "ol" : "ul";

  return (
    <Tag
      data-slot="post-list"
      className={
        block.ordered
          ? "my-6 list-decimal space-y-2 ps-6"
          : "my-6 list-disc space-y-2 ps-6"
      }
    >
      {block.items.map((item, index) => (
        <li key={index}>
          <Inline nodes={item} />
        </li>
      ))}
    </Tag>
  );
}

function NarrativeBlockRenderer({
  block,
  headingId,
}: {
  block: NarrativeBlock;
  headingId?: string;
}) {
  switch (block.type) {
    case "paragraph":
      return <Paragraph block={block} />;
    case "heading":
      return block.level === 2 ? (
        <h2 id={headingId} className="mt-12 scroll-mt-28 text-3xl font-bold">
          {block.text}
        </h2>
      ) : (
        <h3 id={headingId} className="mt-8 scroll-mt-28 text-2xl font-bold">
          {block.text}
        </h3>
      );
    case "image":
      return <Image block={block} />;
    case "quote":
      return <Quote block={block} />;
    case "list":
      return <List block={block} />;
    default:
      return null;
  }
}

export function PostContent({ content }: PostContentProps) {
  const { t } = useTranslation("blog");

  switch (content.type) {
    case "reference":
      return (
        <div data-slot="post-content" className="prose prose-lg max-w-none">
          {content.intro.map((block, index) => (
            <Paragraph key={index} block={block} />
          ))}
          {content.sections.map((section, sectionIndex) => (
            <section key={section.title} className="not-prose mt-12">
              <h2
                id={referenceSectionId(sectionIndex)}
                className="scroll-mt-28 text-3xl font-bold"
              >
                {section.title}
              </h2>
              <div className="mt-6 space-y-8">
                {section.subsections.map((subsection, subsectionIndex) => (
                  <section
                    key={subsection.title}
                    className="border-s-2 border-border ps-6"
                  >
                    <h3
                      id={referenceSubsectionId(sectionIndex, subsectionIndex)}
                      className="scroll-mt-28 text-2xl font-bold"
                    >
                      {subsection.title}
                    </h3>
                    <div className="mt-4 space-y-4">
                      {subsection.paragraphs.map((block, index) => (
                        <Paragraph key={index} block={block} />
                      ))}
                    </div>
                    {subsection.management && (
                      <div className="mt-4 rounded-card bg-brand-50 p-4">
                        <p className="text-sm font-semibold text-brand-strong">
                          {t("management")}
                        </p>
                        <Paragraph block={subsection.management} />
                      </div>
                    )}
                  </section>
                ))}
              </div>
            </section>
          ))}
        </div>
      );

    case "narrative": {
      const headingIds = narrativeHeadingIds(content.blocks);

      return (
        <div data-slot="post-content" className="prose prose-lg max-w-none">
          {content.intro.map((block, index) => (
            <Paragraph key={index} block={block} />
          ))}
          {content.blocks.map((block, index) => (
            <NarrativeBlockRenderer
              key={index}
              block={block}
              headingId={headingIds.get(index)}
            />
          ))}
        </div>
      );
    }

    case "simple":
      return (
        <div data-slot="post-content" className="prose prose-lg max-w-none">
          {content.intro.map((block, index) => (
            <Paragraph key={index} block={block} />
          ))}
          {content.sections.map((section, index) => (
            <section key={section.title} className="mt-10">
              <h2 id={simpleSectionId(index)} className="scroll-mt-28 text-3xl font-bold">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((block, paragraphIndex) => (
                  <Paragraph key={paragraphIndex} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>
      );

    case "case-study":
      return (
        <div data-slot="post-content" className="space-y-12">
          <section aria-labelledby="case-study-challenge">
            <h2 id="case-study-challenge" className="text-3xl font-bold">
              {t("challenge")}
            </h2>
            <div className="mt-4 space-y-4">
              {content.challenge.map((block, index) => (
                <Paragraph key={index} block={block} />
              ))}
            </div>
          </section>
          <section aria-labelledby="case-study-solution">
            <h2 id="case-study-solution" className="text-3xl font-bold">
              {t("solution")}
            </h2>
            <div className="mt-4 space-y-4">
              {content.solution.map((block, index) => (
                <Paragraph key={index} block={block} />
              ))}
            </div>
          </section>
          <section aria-labelledby="case-study-results">
            <h2 id="case-study-results" className="text-3xl font-bold">
              {t("results")}
            </h2>
            <dl className="mt-6 grid gap-4 sm:grid-cols-3">
              {content.results.map((result) => (
                <div key={result.label} className="rounded-card bg-brand-50 p-5">
                  <dt className="text-sm font-semibold text-brand-strong">
                    {result.label}
                  </dt>
                  <dd className="mt-2 text-3xl font-bold text-foreground-strong">
                    {result.value}
                  </dd>
                  {result.description && (
                    <dd className="mt-1 text-sm text-muted">{result.description}</dd>
                  )}
                </div>
              ))}
            </dl>
          </section>
          {content.gallery.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {content.gallery.map((image) => (
                <Image key={image.url} block={{ type: "image", image }} />
              ))}
            </div>
          )}
          {content.cta && (
            <a
              href={content.cta.href}
              rel={isExternalHref(content.cta.href) ? "noopener noreferrer" : undefined}
              className="inline-flex rounded-button bg-brand px-6 py-3 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus"
            >
              {content.cta.label}
            </a>
          )}
        </div>
      );

    default:
      return null;
  }
}
