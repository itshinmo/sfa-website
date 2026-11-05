import { useState, type CSSProperties } from "react";
import "~/styles/design-lab-previews.css";
import type { Route } from "./+types/design-lab";
import { Badge } from "~/shared/ui/badge";
import { Button } from "~/shared/ui/button";
import { Card } from "~/shared/ui/card";
import { Container } from "~/shared/ui/container";
import { Section } from "~/shared/ui/section";

export function loader() {
  if (process.env.NODE_ENV === "production" && process.env.DESIGN_LAB !== "1") {
    throw new Response("Not Found", { status: 404 });
  }
  return null;
}

export const meta: Route.MetaFunction = () => [
  { title: "SFA Design Lab" },
  { name: "robots", content: "noindex, nofollow" },
];

type PreviewVars = Record<`--${string}`, string>;

type Swatch = {
  name: string;
  hex: string;
  role: string;
};

type Direction = {
  id: "scientific" | "organic" | "bold";
  number: string;
  name: string;
  concept: string;
  tagline: string;
  character: string;
  rationale: string;
  bestFor: string;
  tradeOff: string;
  typeNote: string;
  swatches: Swatch[];
  vars: PreviewVars;
  hero: {
    eyebrow: string;
    headline: string;
    accent: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  specimen: {
    faDisplay: string;
    enDisplay: string;
    faBody: string;
    enBody: string;
  };
  card: {
    eyebrow: string;
    title: string;
    body: string;
    metric: string;
    metricLabel: string;
    note: string;
  };
  motion: {
    feel: string;
    duration: string;
    easing: string;
    distance: string;
    notes: string;
  };
};

const scientific = {
  forest950: "#0B2B21",
  forest900: "#0E382A",
  forest700: "#15503B",
  moss500: "#3C7A5B",
  water700: "#1D6380",
  water100: "#D8EAF1",
  cream50: "#F7F2E6",
  paper: "#FFFCF4",
  ink900: "#13231C",
  ink600: "#4E6157",
  line: "#D9DCCF",
  lineStrong: "#6F8076",
} as const;

const organic = {
  olive950: "#1D2A20",
  olive700: "#3F5A3C",
  olive500: "#6D7F4E",
  eucalyptus700: "#3E6257",
  eucalyptus100: "#DFE9E2",
  sand50: "#F3ECDD",
  sand100: "#E7DBC5",
  paper: "#FBF7EE",
  clay400: "#B97A5E",
  sage300: "#A9B79A",
  ink900: "#26352A",
  ink600: "#566150",
  line: "#D9CEB9",
  lineStrong: "#82745C",
} as const;

const bold = {
  ink950: "#080A09",
  graphite900: "#141816",
  graphite800: "#1D2320",
  bone50: "#F3F6EF",
  muted400: "#A7B0A6",
  lime400: "#C9F56A",
  lime300: "#DFFF9E",
  fresh500: "#58E08A",
  brand700: "#1F5C3C",
  brand900: "#0E2419",
  line: "#2A302C",
  lineStrong: "#6B7A70",
} as const;

const directions: Direction[] = [
  {
    id: "scientific",
    number: "01",
    name: "Scientific agritech",
    concept: "Field Notes",
    tagline: "Measurement as a promise.",
    character: "Precise · editorial · credible",
    rationale:
      "Precision is the promise. Hairlines, mono labels, water-blue data, and a deep forest field make SFA feel like an instrument, while the cream ground keeps it editorial rather than clinical.",
    bestFor:
      "Research pages, partner and grant audiences, technical blog posts, and the credibility layer of the homepage.",
    tradeOff:
      "Can read cold or academic. It needs documentary field photography, warm microcopy, and at least one human moment.",
    typeNote:
      "Display 800 / Latin −0.03em, Persian −0.015em · Text 400 / 1.7 · Data in mono. One family until the direction is locked; final weights must be loaded and subset.",
    swatches: [
      { name: "Forest 950", hex: scientific.forest950, role: "Hero / ink" },
      { name: "Forest 700", hex: scientific.forest700, role: "Brand / CTA" },
      { name: "Moss 500", hex: scientific.moss500, role: "Accent / data" },
      { name: "Water 700", hex: scientific.water700, role: "Water / links" },
      { name: "Water 100", hex: scientific.water100, role: "Water tint" },
      { name: "Cream 50", hex: scientific.cream50, role: "Page ground" },
      { name: "Paper", hex: scientific.paper, role: "Surface" },
      { name: "Ink 900", hex: scientific.ink900, role: "Body text" },
      { name: "Ink 600", hex: scientific.ink600, role: "Muted text" },
    ],
    vars: {
      "--color-bg": scientific.cream50,
      "--color-surface": scientific.paper,
      "--color-surface-raised": scientific.cream50,
      "--color-surface-muted": "#EFEADC",
      "--color-text": scientific.ink900,
      "--color-text-strong": "#0B1E16",
      "--color-text-muted": scientific.ink600,
      "--color-text-inverse": scientific.cream50,
      "--color-border": scientific.line,
      "--color-border-strong": scientific.lineStrong,
      "--color-brand": scientific.forest700,
      "--color-brand-strong": scientific.forest950,
      "--color-brand-soft": "#DCE9DE",
      "--color-brand-50": "#EFF5EF",
      "--color-brand-100": "#DCE9DE",
      "--color-brand-300": "#8DB7A0",
      "--color-brand-500": scientific.moss500,
      "--color-brand-700": scientific.forest700,
      "--color-brand-900": scientific.forest900,
      "--color-brand-950": "#061A13",
      "--color-accent": scientific.moss500,
      "--color-accent-soft": "#E7F0E8",
      "--color-water": scientific.water700,
      "--color-water-100": scientific.water100,
      "--color-water-700": scientific.water700,
      "--color-focus": scientific.forest700,
      "--radius-card": "0.5rem",
      "--radius-panel": "0.5rem",
      "--radius-pill": "0.375rem",
      "--shadow-card": "0 1px 2px rgb(11 43 33 / 0.06)",
      "--shadow-card-hover": "0 8px 24px rgb(11 43 33 / 0.08)",
      "--shadow-panel": "0 18px 48px rgb(11 43 33 / 0.12)",
      "--leading-tight": "1.08",
      "--leading-normal": "1.7",
      "--lab-display-weight": "800",
      "--lab-display-tracking": "-0.03em",
      "--lab-display-tracking-fa": "-0.015em",
      "--lab-eyebrow-tracking": "0.18em",
      "--lab-hero-bg": scientific.forest950,
      "--lab-hero-fg": scientific.cream50,
      "--lab-hero-muted": "#B9CBBF",
      "--lab-hero-accent": "#9BC9D6",
      "--lab-hero-border": "rgb(247 242 230 / 0.18)",
      "--lab-hero-grid": "rgb(247 242 230 / 0.06)",
      "--lab-hero-focus": "#9BC9D6",
      "--lab-panel-bg": scientific.paper,
      "--lab-panel-fg": scientific.ink900,
      "--lab-panel-muted": scientific.ink600,
      "--lab-panel-track": "#E4E1D4",
      "--lab-cta-bg": scientific.cream50,
      "--lab-cta-fg": scientific.forest950,
      "--lab-cta-hover": scientific.water100,
      "--lab-cta-ghost-hover": "rgb(247 242 230 / 0.08)",
      "--lab-lift": "0rem",
      "--lab-motion-duration": "250ms",
      "--lab-motion-duration-reveal": "450ms",
      "--lab-motion-ease": "cubic-bezier(0.22, 1, 0.36, 1)",
      "--lab-motion-distance": "0.5rem",
      "--lab-motion-accent": scientific.moss500,
      "--lab-section-label": scientific.forest700,
    },
    hero: {
      eyebrow: "SFA / FIELD SYSTEM · 01",
      headline: "هر قطره،",
      accent: "یک داده.",
      description: "سنسورها خاک و اقلیم را می‌خوانند؛ مدل آبیاری، تصمیم را دقیق می‌کند.",
      primaryCta: "دریافت اپلیکیشن",
      secondaryCta: "مشاهدهٔ روش کار",
    },
    specimen: {
      faDisplay: "آب را اندازه بگیریم.",
      enDisplay: "Water, measured.",
      faBody:
        "SFA داده‌های خاک، اقلیم و محصول را می‌خواند و برنامهٔ آبیاری را برای هر قطعه زمین تنظیم می‌کند. اعداد ۱۲۳۴۵۶۷۸۹۰؛ نشانه‌ها: ، ؛ ؟ «»",
      enBody:
        "SFA reads soil, climate, and crop signals to tune irrigation per plot. Numerals 0123456789 — punctuation: , ; ? “”.",
    },
    card: {
      eyebrow: "FIELD REPORT / 04-A",
      title: "گزارش زندهٔ مزرعه",
      body: "داده‌های خاک و اقلیم، در یک نمای خوانا.",
      metric: "۶۲٪",
      metricLabel: "رطوبت خاک",
      note: "SAMPLE DATA · NOT A CLAIM",
    },
    motion: {
      feel: "Precise, instrumented",
      duration: "150–250 ms",
      easing: "out-expo",
      distance: "8–12 px",
      notes:
        "One count-up on first view. No bounce, no ambient loops. Reduced motion shows final values immediately.",
    },
  },
  {
    id: "organic",
    number: "02",
    name: "Organic modern",
    concept: "Rooted",
    tagline: "Calm technology for living soil.",
    character: "Calm · tactile · human",
    rationale:
      "The brand feels grown, not built. Sand and olive, generous radii, and a photography-first hero lower the barrier for growers who are wary of “smart” tools. Data stays a quiet overlay, never the protagonist.",
    bestFor:
      "The human story: growers, fields, team, and a photography-led homepage that has to feel local and calm.",
    tradeOff:
      "Risks generic eco-branding. It depends on distinctive photography and strict restraint; softness can hide the product.",
    typeNote:
      "Display 600 / 0em · Text 400 / 1.8 · Mono only for small labels. The softness comes from shape and spacing, not a second typeface.",
    swatches: [
      { name: "Olive 950", hex: organic.olive950, role: "Text strong" },
      { name: "Olive 700", hex: organic.olive700, role: "Brand" },
      { name: "Olive 500", hex: organic.olive500, role: "Accent" },
      { name: "Eucalyptus 700", hex: organic.eucalyptus700, role: "Water / data" },
      { name: "Sage 300", hex: organic.sage300, role: "Soft shape" },
      { name: "Sand 50", hex: organic.sand50, role: "Page ground" },
      { name: "Sand 100", hex: organic.sand100, role: "Muted surface" },
      { name: "Paper", hex: organic.paper, role: "Surface" },
      { name: "Clay 400", hex: organic.clay400, role: "Earth support" },
    ],
    vars: {
      "--color-bg": organic.sand50,
      "--color-surface": organic.paper,
      "--color-surface-raised": organic.sand50,
      "--color-surface-muted": organic.sand100,
      "--color-text": organic.ink900,
      "--color-text-strong": organic.olive950,
      "--color-text-muted": organic.ink600,
      "--color-text-inverse": "#F8F2E6",
      "--color-border": organic.line,
      "--color-border-strong": organic.lineStrong,
      "--color-brand": organic.olive700,
      "--color-brand-strong": "#2E4632",
      "--color-brand-soft": "#E1E7D5",
      "--color-brand-50": "#EFF2E7",
      "--color-brand-100": "#E1E7D5",
      "--color-brand-300": organic.sage300,
      "--color-brand-500": organic.olive500,
      "--color-brand-700": organic.olive700,
      "--color-brand-900": "#2E4632",
      "--color-brand-950": organic.olive950,
      "--color-accent": organic.olive500,
      "--color-accent-soft": "#E8ECD9",
      "--color-water": organic.eucalyptus700,
      "--color-water-100": organic.eucalyptus100,
      "--color-water-700": organic.eucalyptus700,
      "--color-focus": "#2E4632",
      "--radius-card": "1.25rem",
      "--radius-panel": "2rem",
      "--radius-pill": "9999px",
      "--shadow-card": "0 18px 40px rgb(63 90 60 / 0.08), 0 2px 6px rgb(63 90 60 / 0.05)",
      "--shadow-card-hover":
        "0 24px 56px rgb(63 90 60 / 0.12), 0 4px 10px rgb(63 90 60 / 0.06)",
      "--shadow-panel": "0 30px 72px rgb(63 90 60 / 0.14)",
      "--leading-tight": "1.2",
      "--leading-normal": "1.8",
      "--lab-display-weight": "600",
      "--lab-display-tracking": "0em",
      "--lab-display-tracking-fa": "0em",
      "--lab-eyebrow-tracking": "0.14em",
      "--lab-hero-bg": "#EFE6D2",
      "--lab-hero-fg": organic.ink900,
      "--lab-hero-muted": organic.ink600,
      "--lab-hero-accent": organic.olive700,
      "--lab-hero-border": organic.line,
      "--lab-hero-grid": "rgb(63 90 60 / 0.06)",
      "--lab-hero-focus": "#2E4632",
      "--lab-panel-bg": organic.paper,
      "--lab-panel-fg": organic.ink900,
      "--lab-panel-muted": organic.ink600,
      "--lab-panel-track": organic.sand100,
      "--lab-cta-bg": "#2E4632",
      "--lab-cta-fg": "#F8F2E6",
      "--lab-cta-hover": organic.olive700,
      "--lab-cta-ghost-hover": "rgb(46 70 50 / 0.08)",
      "--lab-lift": "-0.125rem",
      "--lab-motion-duration": "450ms",
      "--lab-motion-duration-reveal": "700ms",
      "--lab-motion-ease": "cubic-bezier(0.22, 1, 0.36, 1)",
      "--lab-motion-distance": "1rem",
      "--lab-motion-accent": organic.olive500,
      "--lab-photo-a": organic.olive500,
      "--lab-photo-b": "#D8C8A8",
      "--lab-photo-highlight": organic.sage300,
      "--lab-photo-dot": "rgb(255 255 255 / 0.22)",
      "--lab-on-accent": organic.olive950,
      "--lab-section-label": organic.olive700,
    },
    hero: {
      eyebrow: "SFA / LIVING SOIL · 02",
      headline: "با ریتم زمین",
      accent: "پیش بروید.",
      description:
        "آبیاری هوشمند، آرام و به‌اندازه؛ برای خاکی که نسل بعد هم باید زنده بماند.",
      primaryCta: "شروع با SFA",
      secondaryCta: "داستان ما",
    },
    specimen: {
      faDisplay: "با ریتم زمین پیش بروید.",
      enDisplay: "Move with the land.",
      faBody:
        "SFA با خواندن داده‌های خاک، اقلیم و محصول، برنامهٔ آبیاری را برای هر قطعه زمین تنظیم می‌کند. اعداد ۱۲۳۴۵۶۷۸۹۰؛ نشانه‌ها: ، ؛ ؟ «»",
      enBody:
        "SFA reads soil, climate, and crop signals to tune irrigation per plot. Numerals 0123456789 — punctuation: , ; ? “”.",
    },
    card: {
      eyebrow: "FROM SOIL TO HARVEST",
      title: "از خاک تا محصول",
      body: "داستان هر قطعه زمین، با تصویر و دادهٔ آرام.",
      metric: "۸۲٪",
      metricLabel: "سلامت خاک",
      note: "PHOTOGRAPHY SLOT · SAMPLE",
    },
    motion: {
      feel: "Calm, breathing",
      duration: "450–700 ms",
      easing: "out-expo",
      distance: "16–24 px",
      notes:
        "Soft fade + rise, once. Hover lift ≤2px. No parallax in reading. Reduced motion keeps the final layout static.",
    },
  },
  {
    id: "bold",
    number: "03",
    name: "Bold product",
    concept: "Signal",
    tagline: "The farm, in your pocket.",
    character: "Loud · kinetic · product-first",
    rationale:
      "The product is the hero. Near-black surfaces, oversized type, and a lime signal create launch energy and make the app feel like a tool with momentum. This is the direction most likely to turn a scroll into a download.",
    bestFor:
      "Launch campaigns, app-download sections, social and video, and a homepage that leads with the product.",
    tradeOff:
      "Energy can overpower research credibility. It needs a calm long-form mode and extra contrast checks.",
    typeNote:
      "Display 900 / Latin −0.045em, Persian −0.02em · Labels mono 600 uppercase · Tabular numerals for stats.",
    swatches: [
      { name: "Ink 950", hex: bold.ink950, role: "Page ground" },
      { name: "Graphite 900", hex: bold.graphite900, role: "Surface" },
      { name: "Graphite 800", hex: bold.graphite800, role: "Raised surface" },
      { name: "Bone 50", hex: bold.bone50, role: "Text" },
      { name: "Muted 400", hex: bold.muted400, role: "Muted text" },
      { name: "Lime 400", hex: bold.lime400, role: "Accent / CTA" },
      { name: "Lime 300", hex: bold.lime300, role: "Hover / focus" },
      { name: "Fresh 500", hex: bold.fresh500, role: "Water / signal" },
      { name: "Brand 700", hex: bold.brand700, role: "Primary button" },
    ],
    vars: {
      "--color-bg": bold.ink950,
      "--color-surface": bold.graphite900,
      "--color-surface-raised": bold.graphite800,
      "--color-surface-muted": "#111513",
      "--color-text": bold.bone50,
      "--color-text-strong": "#FFFFFF",
      "--color-text-muted": bold.muted400,
      "--color-text-inverse": bold.ink950,
      "--color-border": bold.line,
      "--color-border-strong": bold.lineStrong,
      "--color-brand": bold.brand700,
      "--color-brand-strong": bold.brand900,
      "--color-brand-soft": "#E4F6C4",
      "--color-brand-50": "#EFF9F2",
      "--color-brand-100": "#D6F0DE",
      "--color-brand-300": "#9ADBB0",
      "--color-brand-500": "#3B8A5F",
      "--color-brand-700": bold.brand700,
      "--color-brand-900": bold.brand900,
      "--color-brand-950": bold.ink950,
      "--color-accent": bold.lime400,
      "--color-accent-soft": "#243018",
      "--color-water": bold.fresh500,
      "--color-water-100": "#13251C",
      "--color-water-700": "#9AE9B8",
      "--color-focus": bold.lime300,
      "--radius-card": "0.75rem",
      "--radius-panel": "1rem",
      "--radius-pill": "0.5rem",
      "--shadow-card": "0 10px 30px rgb(0 0 0 / 0.35)",
      "--shadow-card-hover": "0 18px 44px rgb(0 0 0 / 0.45)",
      "--shadow-panel": "0 30px 80px rgb(0 0 0 / 0.55)",
      "--leading-tight": "0.95",
      "--leading-normal": "1.6",
      "--lab-display-weight": "900",
      "--lab-display-tracking": "-0.045em",
      "--lab-display-tracking-fa": "-0.02em",
      "--lab-eyebrow-tracking": "0.2em",
      "--lab-hero-bg": bold.ink950,
      "--lab-hero-fg": bold.bone50,
      "--lab-hero-muted": bold.muted400,
      "--lab-hero-accent": bold.lime400,
      "--lab-hero-border": "rgb(243 246 239 / 0.14)",
      "--lab-hero-grid": "rgb(243 246 239 / 0.04)",
      "--lab-hero-focus": bold.lime300,
      "--lab-panel-bg": bold.graphite900,
      "--lab-panel-fg": bold.bone50,
      "--lab-panel-muted": bold.muted400,
      "--lab-panel-track": "#242B26",
      "--lab-cta-bg": bold.lime400,
      "--lab-cta-fg": bold.ink950,
      "--lab-cta-hover": bold.lime300,
      "--lab-cta-ghost-hover": "rgb(243 246 239 / 0.06)",
      "--lab-lift": "-0.25rem",
      "--lab-motion-duration": "150ms",
      "--lab-motion-duration-reveal": "300ms",
      "--lab-motion-ease": "cubic-bezier(0.22, 1, 0.36, 1)",
      "--lab-motion-distance": "0.75rem",
      "--lab-motion-accent": bold.lime400,
      "--lab-glow-a": "rgb(201 245 106 / 0.18)",
      "--lab-glow-b": "rgb(88 224 138 / 0.1)",
      "--lab-scanline": "rgb(243 246 239 / 0.03)",
      "--lab-on-accent": bold.ink950,
      "--lab-section-label": bold.lime400,
    },
    hero: {
      eyebrow: "SFA / SMART IRRIGATION · 03",
      headline: "بیشتر رشد.",
      accent: "کمتر آب.",
      description: "هوش مصنوعی مزرعه، در جیب شما. برنامه‌ریزی دقیق، تصمیم سریع، آب کمتر.",
      primaryCta: "همین حالا شروع کنید",
      secondaryCta: "ببینید چطور کار می‌کند",
    },
    specimen: {
      faDisplay: "بیشتر رشد. کمتر آب.",
      enDisplay: "Grow more. Use less.",
      faBody:
        "SFA داده‌های خاک، اقلیم و محصول را می‌خواند و برنامهٔ آبیاری را برای هر قطعه زمین تنظیم می‌کند. اعداد ۱۲۳۴۵۶۷۸۹۰؛ نشانه‌ها: ، ؛ ؟ «»",
      enBody:
        "SFA reads soil, climate, and crop signals to tune irrigation per plot. Numerals 0123456789 — punctuation: , ; ? “”.",
    },
    card: {
      eyebrow: "LIVE FIELD SIGNAL",
      title: "سیگنال زندهٔ مزرعه",
      body: "یک نگاه، یک تصمیم.",
      metric: "28%",
      metricLabel: "less water",
      note: "SAMPLE DATA · NOT A CLAIM",
    },
    motion: {
      feel: "Snappy, kinetic",
      duration: "150–300 ms",
      easing: "out-expo / in-out",
      distance: "8–16 px",
      notes:
        "Staggered hero entrance, count-up stats, hover lift 4px. No autoplay loops; a production marquee pauses on hover, focus, and reduced motion.",
    },
  },
];

function themeStyle(vars: PreviewVars) {
  return vars as unknown as CSSProperties;
}

function ComparisonSummary() {
  return (
    <section
      id="design-lab-comparison"
      data-slot="lab-comparison"
      aria-labelledby="comparison-title"
      className="scroll-mt-8 space-y-5"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="font-mono text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            At a glance
          </p>
          <h2 id="comparison-title" className="text-3xl font-bold sm:text-4xl">
            Compare the three directions
          </h2>
        </div>
        <p className="max-w-md text-sm text-muted">
          Same content, same primitives. Only the token set, layout language, and motion
          change.
        </p>
      </div>

      <ul className="grid gap-4 lg:grid-cols-3">
        {directions.map((direction) => (
          <li key={direction.id}>
            <article
              data-slot="lab-comparison-card"
              className="flex h-full flex-col rounded-panel border border-border bg-surface p-5"
            >
              <p className="font-mono text-xs font-semibold tracking-[0.16em] text-brand uppercase">
                Direction {direction.number}
              </p>
              <h3 className="mt-1 text-2xl font-bold">
                <a
                  href={`#direction-${direction.id}`}
                  className="underline-offset-4 hover:text-brand hover:underline"
                >
                  {direction.concept}
                </a>
              </h3>
              <p className="text-xs text-muted">{direction.name}</p>

              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">
                    Character
                  </dt>
                  <dd className="mt-1 text-foreground">{direction.character}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">
                    Best fit
                  </dt>
                  <dd className="mt-1 text-muted">{direction.bestFor}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">
                    Watch out
                  </dt>
                  <dd className="mt-1 text-muted">{direction.tradeOff}</dd>
                </div>
              </dl>

              <div className="mt-auto flex items-center gap-1 pt-5" aria-hidden="true">
                {(direction.id === "bold"
                  ? [direction.swatches[0], ...direction.swatches.slice(5, 9)]
                  : direction.swatches.slice(0, 5)
                ).map((swatch) => (
                  <span
                    key={`${direction.id}-${swatch.name}`}
                    className="h-2 flex-1 rounded-pill border border-border"
                    style={{ backgroundColor: swatch.hex }}
                  />
                ))}
              </div>
            </article>
          </li>
        ))}
      </ul>

      <p className="text-xs text-muted">
        Each card links to the full preview below. Every direction includes the same
        samples: palette, type, hero, surface, and motion.
      </p>

      <div className="rounded-panel border border-border bg-brand-soft p-5 sm:p-6">
        <p className="text-sm font-bold text-brand-strong">Designer read</p>
        <p className="mt-2 max-w-4xl text-sm leading-relaxed text-foreground">
          If credibility is the bottleneck, lead with{" "}
          <a
            href="#direction-scientific"
            className="font-semibold underline underline-offset-4"
          >
            01 Field Notes
          </a>
          . If the site must feel human and local, lead with{" "}
          <a
            href="#direction-organic"
            className="font-semibold underline underline-offset-4"
          >
            02 Rooted
          </a>
          . If the priority is launch energy and downloads, lead with{" "}
          <a
            href="#direction-bold"
            className="font-semibold underline underline-offset-4"
          >
            03 Signal
          </a>
          . A hybrid is possible, but it should be a deliberate choice, not a default
          blend.
        </p>
        <p className="mt-2 text-xs text-muted">
          Historical recommendation at proposal time: 01 as the base for a research-led
          site; borrow 03&apos;s hero energy only after the base was locked. The author
          instead chose the 01+02 hybrid; 03 is not used.
        </p>
      </div>
    </section>
  );
}

function PaletteSpecimen({ direction }: { direction: Direction }) {
  return (
    <section
      data-slot="lab-palette"
      aria-label={`${direction.concept} palette`}
      className="space-y-4"
    >
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h3 className="text-xl font-bold">Palette</h3>
        <p className="text-xs text-muted">Preview values · production tokens untouched</p>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {direction.swatches.map((swatch) => (
          <li key={`${swatch.name}-${swatch.hex}`} className="min-w-0">
            <span
              aria-hidden="true"
              className="block h-12 rounded-card border border-border"
              style={{ backgroundColor: swatch.hex }}
            />
            <span className="mt-2 block truncate text-xs font-semibold">
              {swatch.name}
            </span>
            <span className="block font-mono text-xs text-muted">{swatch.hex}</span>
            <span className="block text-xs leading-snug text-muted">{swatch.role}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function TypeSpecimen({ direction }: { direction: Direction }) {
  const displaySize =
    direction.id === "bold" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl";

  return (
    <section
      data-slot="lab-type"
      aria-label={`${direction.concept} type specimen`}
      className="space-y-4"
    >
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h3 className="text-xl font-bold">Type specimen</h3>
        <p className="text-xs text-muted">
          Same family · weight + tracking carry the tone
        </p>
      </div>
      <div className="rounded-card border border-border bg-surface p-5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="lab-eyebrow">
            Persian / <span lang="fa">فارسی</span>
          </p>
          <span className="font-mono text-xs text-muted">display</span>
        </div>
        <p lang="fa" dir="rtl" className={`lab-display mt-2 ${displaySize}`}>
          {direction.specimen.faDisplay}
        </p>
        <p lang="fa" dir="rtl" className="mt-3 text-sm leading-8 text-muted">
          {direction.specimen.faBody}
        </p>

        <div className="my-5 h-px bg-border" role="presentation" />

        <div className="flex items-baseline justify-between gap-3">
          <p className="lab-eyebrow">English</p>
          <span className="font-mono text-xs text-muted">display</span>
        </div>
        <p lang="en" dir="ltr" className={`lab-display mt-2 ${displaySize}`}>
          {direction.specimen.enDisplay}
        </p>
        <p lang="en" dir="ltr" className="mt-3 text-sm leading-7 text-muted">
          {direction.specimen.enBody}
        </p>

        <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-muted">
          {direction.typeNote}
        </p>
      </div>
    </section>
  );
}

function ScientificCard({ direction }: { direction: Direction }) {
  return (
    <Card
      data-slot="lab-card"
      dir="rtl"
      lang="fa"
      className="lab-lift overflow-hidden p-0"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
        <p className="lab-eyebrow" lang="en">
          {direction.card.eyebrow}
        </p>
        <span
          lang="en"
          className="inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.14em] text-water uppercase"
        >
          <span aria-hidden="true" className="size-1.5 rounded-pill bg-water" />
          verified
        </span>
      </div>
      <div className="p-5">
        <h4 className="text-xl font-bold">{direction.card.title}</h4>
        <p className="mt-1 text-sm text-muted">{direction.card.body}</p>
        <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4">
          <div>
            <dt className="text-xs text-muted">{direction.card.metricLabel}</dt>
            <dd className="mt-1 text-2xl font-bold text-water tabular-nums">
              {direction.card.metric}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">دما</dt>
            <dd className="mt-1 text-2xl font-bold tabular-nums">۲۴٫۵°</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">کاهش آب</dt>
            <dd className="mt-1 text-2xl font-bold tabular-nums">۲۸٪</dd>
          </div>
        </dl>
        <div className="mt-4 space-y-2" aria-hidden="true">
          <div className="h-1.5 overflow-hidden rounded-pill bg-surface-muted">
            <div className="h-full w-2/3 rounded-pill bg-water" />
          </div>
          <div className="h-1.5 overflow-hidden rounded-pill bg-surface-muted">
            <div className="h-full w-1/4 rounded-pill bg-brand" />
          </div>
        </div>
        <p
          lang="en"
          className="mt-4 border-t border-border pt-3 font-mono text-xs tracking-[0.14em] text-muted uppercase"
        >
          {direction.card.note}
        </p>
      </div>
    </Card>
  );
}

function OrganicCard({ direction }: { direction: Direction }) {
  return (
    <Card
      data-slot="lab-card"
      dir="rtl"
      lang="fa"
      className="lab-lift overflow-hidden p-0"
    >
      <div
        aria-hidden="true"
        className="lab-organic-photo lab-organic-photo--card aspect-[16/10] w-full"
      />
      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="lab-eyebrow" lang="en">
            {direction.card.eyebrow}
          </p>
          <Badge tone="brand">{direction.card.metric}</Badge>
        </div>
        <h4 className="mt-3 text-2xl font-semibold">{direction.card.title}</h4>
        <p className="mt-2 text-sm text-muted">{direction.card.body}</p>
        <a
          href="/fa#features"
          className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand underline-offset-4 hover:underline"
        >
          داستان SFA
          <span aria-hidden="true">←</span>
        </a>
        <p
          lang="en"
          className="mt-4 border-t border-border pt-3 font-mono text-xs tracking-[0.14em] text-muted uppercase"
        >
          {direction.card.note}
        </p>
      </div>
    </Card>
  );
}

function BoldCard({ direction }: { direction: Direction }) {
  return (
    <Card
      data-slot="lab-card"
      dir="rtl"
      lang="fa"
      className="lab-lift overflow-hidden p-0"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
        <p className="lab-eyebrow text-accent" lang="en">
          {direction.card.eyebrow}
        </p>
        <span
          lang="en"
          className="inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.14em] text-accent uppercase"
        >
          <span aria-hidden="true" className="size-1.5 rounded-pill bg-accent" />
          live
        </span>
      </div>
      <div className="p-5">
        <p className="text-5xl font-black tracking-tighter text-accent tabular-nums">
          {direction.card.metric}
        </p>
        <p className="mt-1 text-sm text-muted">{direction.card.metricLabel}</p>
        <h4 className="mt-5 text-xl font-bold">{direction.card.title}</h4>
        <p className="mt-1 text-sm text-muted">{direction.card.body}</p>
        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
          {[
            ["۲٫۴×", "بازده"],
            ["۶۲٪", "رطوبت"],
            ["۰۲", "فصل"],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="text-lg font-bold tabular-nums">{value}</p>
              <p className="font-mono text-xs tracking-[0.12em] text-muted uppercase">
                {label}
              </p>
            </div>
          ))}
        </div>
        <a className="lab-cta mt-5 w-full" href="/fa#download">
          همین حالا شروع کنید
          <span aria-hidden="true">←</span>
        </a>
        <p
          lang="en"
          className="mt-4 border-t border-border pt-3 font-mono text-xs tracking-[0.14em] text-muted uppercase"
        >
          {direction.card.note}
        </p>
      </div>
    </Card>
  );
}

function SurfaceSpecimen({ direction }: { direction: Direction }) {
  return (
    <section
      data-slot="lab-surface"
      aria-label={`${direction.concept} surface`}
      className="space-y-4"
    >
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h3 className="text-xl font-bold">Surface</h3>
        <p className="text-xs text-muted">Card + data + action</p>
      </div>
      {direction.id === "scientific" ? (
        <ScientificCard direction={direction} />
      ) : direction.id === "organic" ? (
        <OrganicCard direction={direction} />
      ) : (
        <BoldCard direction={direction} />
      )}
    </section>
  );
}

function MotionSpecimen({ direction }: { direction: Direction }) {
  const [run, setRun] = useState(0);

  return (
    <section
      data-slot="lab-motion"
      aria-label={`${direction.concept} motion`}
      className="flex h-full flex-col space-y-4"
    >
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h3 className="text-xl font-bold">Motion</h3>
        <p className="text-xs text-muted">Click to play · no autoplay</p>
      </div>
      <div className="flex flex-1 flex-col rounded-card border border-border bg-surface p-5">
        <p className="text-sm font-semibold">{direction.motion.feel}</p>

        <div className="lab-motion-stage mt-4" aria-hidden="true">
          <div
            key={run}
            className="lab-motion-sample"
            data-slot="lab-motion-sample"
            data-run={run > 0 ? "true" : undefined}
          >
            <span className="lab-motion-dot" />
            <span className="lab-motion-line">
              <span />
            </span>
            <span className="lab-motion-line">
              <span />
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button
            type="button"
            intent="outline"
            onClick={() => setRun((value) => value + 1)}
            className={
              direction.id === "bold"
                ? "hover:border-accent hover:text-accent"
                : undefined
            }
          >
            {run === 0 ? "Play motion sample" : "Replay motion sample"}
          </Button>
          <span className="text-xs text-muted">
            Reduced motion shows the final state.
          </span>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs sm:grid-cols-4">
          <div>
            <dt className="text-muted">Duration</dt>
            <dd className="mt-1 font-mono font-semibold">{direction.motion.duration}</dd>
          </div>
          <div>
            <dt className="text-muted">Easing</dt>
            <dd className="mt-1 font-mono font-semibold">{direction.motion.easing}</dd>
          </div>
          <div>
            <dt className="text-muted">Distance</dt>
            <dd className="mt-1 font-mono font-semibold">{direction.motion.distance}</dd>
          </div>
          <div>
            <dt className="text-muted">Reduced motion</dt>
            <dd className="mt-1 font-semibold">Final state</dd>
          </div>
        </dl>

        <p className="mt-auto pt-4 text-xs leading-relaxed text-muted">
          {direction.motion.notes}
        </p>
      </div>
    </section>
  );
}

function RationaleStrip({ direction }: { direction: Direction }) {
  return (
    <div
      data-slot="lab-rationale"
      className="grid gap-6 border-t border-border bg-surface p-6 sm:p-8 lg:grid-cols-3"
    >
      <div>
        <h3 className="lab-section-label text-sm font-bold tracking-[0.14em] uppercase">
          Why it works
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{direction.rationale}</p>
      </div>
      <div>
        <h3 className="lab-section-label text-sm font-bold tracking-[0.14em] uppercase">
          Best fit
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{direction.bestFor}</p>
      </div>
      <div>
        <h3 className="lab-section-label text-sm font-bold tracking-[0.14em] uppercase">
          Watch out
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{direction.tradeOff}</p>
      </div>
    </div>
  );
}

function ScientificHero({ direction }: { direction: Direction }) {
  return (
    <div data-slot="lab-hero" dir="rtl" className="lab-hero">
      <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-14">
        <div dir="rtl" lang="fa" className="space-y-6">
          <p className="lab-eyebrow lab-hero-copy" lang="en">
            {direction.hero.eyebrow}
          </p>
          <p lang="fa" className="lab-display text-4xl sm:text-5xl lg:text-6xl">
            {direction.hero.headline}{" "}
            <span className="lab-hero-accent">{direction.hero.accent}</span>
          </p>
          <p className="lab-hero-copy max-w-xl text-base leading-relaxed sm:text-lg">
            {direction.hero.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <a className="lab-cta" href="/fa#download">
              {direction.hero.primaryCta}
              <span aria-hidden="true">←</span>
            </a>
            <a className="lab-cta lab-cta--ghost" href="/fa#features">
              {direction.hero.secondaryCta}
            </a>
          </div>
          <dl className="lab-hero-border grid max-w-lg grid-cols-3 gap-3 border-t pt-5">
            {[
              ["کاهش مصرف آب", "۲۸٪"],
              ["رطوبت خاک", "۶۲٪"],
              ["پایش پیوسته", "۲۴/۷"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="lab-hero-copy text-xs">{label}</dt>
                <dd className="mt-1 text-2xl font-bold tabular-nums">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          data-slot="lab-data-panel"
          dir="rtl"
          lang="fa"
          className="lab-hero-panel self-center rounded-card border p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <p lang="en" className="font-mono text-xs tracking-[0.16em] uppercase">
              Plot 04-A / live
            </p>
            <span
              lang="en"
              className="inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.16em] text-water uppercase"
            >
              <span aria-hidden="true" className="size-1.5 rounded-pill bg-water" />
              optimal
            </span>
          </div>
          <p className="mt-7 text-6xl font-extrabold tracking-tight tabular-nums">۶۲٪</p>
          <p className="lab-hero-panel-muted mt-1 text-sm">
            رطوبت خاک · عمق ۳۰ سانتی‌متر
          </p>
          <div className="mt-6 space-y-3">
            {[
              ["دمای خاک", "۲۴٫۵°", "w-[64%]"],
              ["هدررفت آب", "۴٪", "w-[18%]"],
              ["نیاز آبی", "مناسب", "w-[52%]"],
            ].map(([label, value, width]) => (
              <div key={label}>
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="lab-hero-panel-muted">{label}</span>
                  <span className="font-mono font-semibold tabular-nums">{value}</span>
                </div>
                <div
                  className="lab-hero-panel-track mt-1.5 h-1 overflow-hidden rounded-pill"
                  aria-hidden="true"
                >
                  <span className={`block h-full rounded-pill bg-water ${width}`} />
                </div>
              </div>
            ))}
          </div>
          <p
            lang="en"
            className="lab-hero-panel-muted lab-hero-border mt-6 border-t pt-3 font-mono text-xs tracking-[0.16em] uppercase"
          >
            Sample data · not a claim
          </p>
        </div>
      </div>
    </div>
  );
}

function OrganicHero({ direction }: { direction: Direction }) {
  return (
    <div data-slot="lab-hero" dir="rtl" className="lab-hero">
      <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:p-14">
        <div dir="rtl" lang="fa" className="space-y-6">
          <p className="lab-eyebrow lab-hero-copy" lang="en">
            {direction.hero.eyebrow}
          </p>
          <p lang="fa" className="lab-display text-4xl sm:text-5xl lg:text-6xl">
            {direction.hero.headline}{" "}
            <span className="lab-hero-accent">{direction.hero.accent}</span>
          </p>
          <p className="lab-hero-copy max-w-xl text-base leading-relaxed sm:text-lg">
            {direction.hero.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <a className="lab-cta" href="/fa#download">
              {direction.hero.primaryCta}
              <span aria-hidden="true">←</span>
            </a>
            <a className="lab-cta lab-cta--ghost" href="/fa#features">
              {direction.hero.secondaryCta}
            </a>
          </div>
          <p className="lab-eyebrow lab-hero-copy" lang="en">
            Photography-led · calm data
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            data-slot="lab-photo"
            aria-hidden="true"
            className="lab-organic-photo aspect-[4/3] w-full sm:aspect-[4/5]"
          />
          <div
            lang="en"
            className="absolute end-5 top-5 rounded-pill bg-surface px-3 py-1.5 text-xs font-semibold text-foreground shadow-card"
          >
            Photography slot
          </div>
          <div
            data-slot="lab-photo-chip"
            dir="rtl"
            lang="fa"
            className="lab-hero-panel absolute start-4 bottom-4 rounded-panel border p-4 shadow-card"
          >
            <p className="lab-eyebrow lab-hero-panel-muted">سلامت خاک</p>
            <p className="mt-1 text-3xl font-bold tabular-nums">۸۲٪</p>
            <p className="lab-hero-panel-muted mt-1 text-xs">قطعهٔ شمالی · نمونه</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BoldHero({ direction }: { direction: Direction }) {
  return (
    <div data-slot="lab-hero" dir="rtl" className="lab-hero">
      <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:p-14">
        <div dir="rtl" lang="fa" className="space-y-6">
          <p className="lab-eyebrow lab-hero-copy" lang="en">
            {direction.hero.eyebrow}
          </p>
          <p lang="fa" className="lab-display text-5xl sm:text-6xl lg:text-7xl">
            {direction.hero.headline}{" "}
            <span className="lab-hero-accent">{direction.hero.accent}</span>
          </p>
          <p className="lab-hero-copy max-w-xl text-base leading-relaxed sm:text-lg">
            {direction.hero.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <a className="lab-cta" href="/fa#download">
              {direction.hero.primaryCta}
              <span aria-hidden="true">←</span>
            </a>
            <a className="lab-cta lab-cta--ghost" href="/fa#features">
              {direction.hero.secondaryCta}
            </a>
          </div>
          <div lang="en" className="flex flex-wrap gap-2">
            {["AI irrigation", "Soil signal", "Download"].map((item) => (
              <span
                key={item}
                className="lab-hero-border lab-hero-copy rounded-pill border px-3 py-1 font-mono text-xs tracking-[0.14em] uppercase"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div
          data-slot="lab-product-panel"
          dir="ltr"
          className="lab-hero-panel self-center rounded-panel border p-5 shadow-panel"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="lab-hero-panel-muted font-mono text-xs tracking-[0.16em] uppercase">
              Live field signal
            </p>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.16em] text-accent uppercase">
              <span aria-hidden="true" className="size-1.5 rounded-pill bg-accent" />
              live
            </span>
          </div>
          <p className="mt-7 text-6xl font-black tracking-tighter text-accent tabular-nums">
            28<span className="text-3xl">%</span>
          </p>
          <p className="lab-hero-panel-muted mt-1 text-sm">less water · season 04</p>
          <div className="lab-hero-border mt-6 grid grid-cols-3 gap-2 border-t pt-4 text-center">
            {[
              ["2.4×", "yield"],
              ["62%", "moisture"],
              ["24/7", "monitor"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="text-lg font-bold tabular-nums">{value}</p>
                <p className="lab-hero-panel-muted font-mono text-xs tracking-[0.12em] uppercase">
                  {label}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-end gap-1.5" aria-hidden="true">
            {[40, 62, 48, 76, 58, 84, 70, 92].map((height) => (
              <span
                key={height}
                className="flex-1 rounded-t-sm bg-accent"
                style={{ height: `${height * 0.4}px` }}
              />
            ))}
          </div>
          <p className="lab-hero-panel-muted mt-4 font-mono text-xs tracking-[0.14em] uppercase">
            Sample data · not a claim
          </p>
        </div>
      </div>

      <div className="lab-ticker py-3" aria-hidden="true">
        <div
          dir="ltr"
          className="flex justify-center gap-4 text-xs font-bold tracking-[0.2em] uppercase sm:gap-8"
        >
          <span>Soil</span>
          <span>•</span>
          <span>Water</span>
          <span>•</span>
          <span>AI</span>
          <span>•</span>
          <span>Yield</span>
          <span>•</span>
          <span>Soil</span>
          <span>•</span>
          <span>Water</span>
        </div>
      </div>
    </div>
  );
}

function HeroSample({ direction }: { direction: Direction }) {
  switch (direction.id) {
    case "scientific":
      return <ScientificHero direction={direction} />;
    case "organic":
      return <OrganicHero direction={direction} />;
    case "bold":
      return <BoldHero direction={direction} />;
    default:
      return null;
  }
}

function DirectionPreview({ direction }: { direction: Direction }) {
  return (
    <section
      id={`direction-${direction.id}`}
      data-slot="lab-direction"
      aria-labelledby={`direction-${direction.id}-title`}
      className="scroll-mt-8 space-y-5"
    >
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl space-y-2">
          <p className="font-mono text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            Direction {direction.number} · {direction.name}
          </p>
          <h2
            id={`direction-${direction.id}-title`}
            className="text-3xl font-bold sm:text-4xl"
          >
            {direction.concept}
          </h2>
          <p className="text-lg text-muted">{direction.tagline}</p>
        </div>
        <span className="inline-flex w-fit items-center rounded-pill border border-border bg-surface px-3 py-1 text-xs font-semibold text-muted">
          Scoped preview
        </span>
      </header>

      <div
        data-slot="lab-preview"
        className={`lab-preview lab-${direction.id} overflow-hidden rounded-panel border border-border`}
        style={themeStyle(direction.vars)}
      >
        <figure data-slot="lab-hero-figure" className="m-0">
          <HeroSample direction={direction} />
          <figcaption className="border-b border-border bg-surface px-4 py-2 text-xs text-muted">
            Sample hero · Persian RTL · Primary and secondary CTAs link to the public
            homepage.
          </figcaption>
        </figure>

        <div className="grid gap-6 border-b border-border p-5 sm:p-6 lg:grid-cols-2 lg:gap-8">
          <PaletteSpecimen direction={direction} />
          <TypeSpecimen direction={direction} />
        </div>

        <div className="grid gap-6 border-b border-border p-5 sm:p-6 lg:grid-cols-2 lg:gap-8">
          <SurfaceSpecimen direction={direction} />
          <MotionSpecimen direction={direction} />
        </div>

        <RationaleStrip direction={direction} />
      </div>
    </section>
  );
}

function DecisionPanel() {
  return (
    <section
      id="design-lab-decision"
      data-slot="lab-decision"
      aria-labelledby="decision-title"
      className="scroll-mt-8 rounded-panel border border-border bg-surface p-6 sm:p-8"
    >
      <p className="font-mono text-xs font-semibold tracking-[0.18em] text-brand uppercase">
        Identity locked
      </p>
      <h2 id="decision-title" className="mt-2 text-3xl font-bold">
        Field Notes × Rooted
      </h2>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <div>
          <p className="font-semibold">Direction</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            01&apos;s editorial credibility, forest/cream/water palette, and precise data
            treatment, with 02&apos;s warmth, softer surfaces, generous spacing, human
            moments, and organic shape language. 03 is not used.
          </p>
        </div>
        <div>
          <p className="font-semibold">Typography and hero</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            BYekan 400/700 via local @font-face, light mode only, and the migrated
            farmland photo as the single full-bleed hero. Full art direction is in the
            design system.
          </p>
        </div>
        <div>
          <p className="font-semibold">Next</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            The homepage implementer builds against the locked tokens. The lab previews
            remain a historical record of the 01/02/03 proposals.
          </p>
        </div>
      </div>
      <p className="mt-5 border-t border-border pt-4 text-xs text-muted">
        Production tokens now implement the hybrid; raw hex values in the previews above
        are historical lab data, not production values. See ADR-008 and
        docs/design-system.md.
      </p>
    </section>
  );
}

export default function DesignLab() {
  return (
    <main id="main-content" lang="en" dir="ltr" className="bg-background">
      <Section>
        <Container className="space-y-14">
          <header className="max-w-4xl space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="water">Internal · noindex</Badge>
              <Badge tone="neutral">M1-1 · Locked hybrid</Badge>
            </div>
            <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
              Three directions for the SFA identity
            </h1>
            <p className="text-lg text-muted">
              Three token-driven identity directions for the new marketing site. Each
              preview uses the same content and primitives, but its own palette, type
              treatment, surface language, and motion feel.
            </p>
            <p className="text-sm text-muted">
              The previews are scoped with local CSS variables. Raw hex values live only
              in the preview data; production components keep using semantic tokens.
            </p>
            <p className="text-sm text-muted">
              Review mode: this page is now a historical record of the 01/02/03 proposals.
              The production identity is the 01+02 hybrid described in the lock notice
              below. Use the comparisons to understand the choice, not to make a new one.
            </p>
          </header>

          <div
            data-slot="lab-lock-status"
            className="rounded-panel border border-brand/25 bg-brand-soft p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-surface text-brand-strong" tone="neutral">
                Locked · ADR-008
              </Badge>
              <p className="text-sm font-bold text-brand-strong">
                Chosen: 01 Field Notes × 02 Rooted
              </p>
            </div>
            <p className="mt-2 max-w-4xl text-sm leading-relaxed text-foreground">
              Production tokens now implement the hybrid: light mode only, BYekan
              typography, warm cream/sand ground, forest/cream/water palette, softer
              radii, generous spacing, and a full-bleed farmland-photo hero. The audience
              is farmers, not developers; keep the page warm and clear, and do not use 03
              Signal/dashboard aesthetics. The comparisons below are the historical
              proposal record.
            </p>
            <p className="mt-2 text-xs text-muted">
              See{" "}
              <code className="font-mono text-xs">
                decisions/ADR-008-brand-direction.md
              </code>{" "}
              and <code className="font-mono text-xs">docs/design-system.md</code> for the
              locked tokens and hero art direction.
            </p>
          </div>

          <nav aria-label="Design lab sections" className="flex flex-wrap gap-2 text-sm">
            {[
              ["#design-lab-comparison", "Comparison"],
              ["#direction-scientific", "01 Field Notes"],
              ["#direction-organic", "02 Rooted"],
              ["#direction-bold", "03 Signal"],
              ["#design-lab-decision", "Decision"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="inline-flex min-h-11 items-center rounded-pill border border-border bg-surface px-3 text-sm font-semibold text-muted transition-colors hover:border-brand hover:text-brand"
              >
                {label}
              </a>
            ))}
          </nav>

          <ComparisonSummary />

          {directions.map((direction) => (
            <DirectionPreview key={direction.id} direction={direction} />
          ))}

          <DecisionPanel />
        </Container>
      </Section>
    </main>
  );
}
