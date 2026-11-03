import { Select } from "@base-ui/react/select";
import { Check, ChevronDown, Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation, useMatches, useNavigate, useParams } from "react-router";
import { cn } from "~/shared/lib/cn";
import { supportedLanguages } from "~/locales";

type BlogAlternate = { locale: string; slug: string };

function findBlogAlternates(matches: ReturnType<typeof useMatches>) {
  for (const match of matches) {
    const data = match.loaderData as
      { post?: { alternates?: BlogAlternate[] } } | undefined;
    if (data?.post?.alternates?.length) return data.post.alternates;
  }
  return undefined;
}

type LanguageSwitcherProps = {
  inverse?: boolean;
  className?: string;
};

/**
 * Locale selection is data-driven so adding a locale only requires a new
 * resource bundle and a supportedLanguages entry. Base UI owns the popup,
 * keyboard navigation, typeahead, and focus restoration.
 */
export function LanguageSwitcher({ inverse = false, className }: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const matches = useMatches();
  const navigate = useNavigate();
  const params = useParams();
  const locale = params.locale ?? i18n.resolvedLanguage ?? "fa";

  const items = supportedLanguages.map((code) => ({
    value: code,
    label: t(`language.${code}`),
  }));

  const alternates = findBlogAlternates(matches);

  function targetFor(nextLocale: string) {
    if (nextLocale === locale) return `${location.pathname}${location.search}`;

    const alternate = alternates?.find((item) => item.locale === nextLocale);
    if (alternate) {
      return `/${nextLocale}/blog/${encodeURIComponent(alternate.slug)}`;
    }

    const segments = location.pathname.split("/").filter(Boolean);
    const rest = segments.slice(1).join("/");
    return `/${nextLocale}${rest ? `/${rest}` : ""}${location.search}`;
  }

  return (
    <Select.Root
      items={items}
      value={locale}
      onValueChange={(value) => {
        if (!value) return;
        navigate(targetFor(String(value)));
      }}
    >
      <Select.Trigger
        data-slot="language-switcher"
        aria-label={t("language.label")}
        className={cn(
          "inline-flex min-h-11 items-center gap-2 rounded-pill border px-3 text-xs font-semibold transition-[background-color,border-color,color,transform] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 data-[popup-open]:-translate-y-0.5",
          inverse
            ? "border-white/50 text-white hover:border-white hover:bg-white/10 focus-visible:outline-focus-inverse"
            : "border-border text-muted hover:border-brand hover:text-brand focus-visible:outline-focus",
          className,
        )}
      >
        <Languages aria-hidden="true" className="size-4" />
        <Select.Value />
        <Select.Icon className="transition-transform duration-[var(--motion-duration-fast)] data-[popup-open]:rotate-180">
          <ChevronDown aria-hidden="true" className="size-3.5" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner
          sideOffset={8}
          align="end"
          className="z-[var(--z-toast)] outline-hidden select-none"
        >
          <Select.Popup
            data-slot="language-popup"
            className="min-w-[var(--anchor-width)] origin-[var(--transform-origin)] rounded-panel border border-border bg-surface p-1.5 text-foreground shadow-panel transition-[opacity,scale] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-out)] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0"
          >
            <Select.List>
              {items.map((item) => (
                <Select.Item
                  key={item.value}
                  value={item.value}
                  className="grid cursor-pointer grid-cols-[1rem_1fr] items-center gap-2 rounded-md px-3 py-2.5 text-sm outline-hidden transition-colors select-none data-highlighted:bg-brand-soft data-highlighted:text-brand-strong data-selected:font-semibold"
                >
                  <Select.ItemIndicator className="col-start-1">
                    <Check aria-hidden="true" className="size-4" />
                  </Select.ItemIndicator>
                  <Select.ItemText className="col-start-2">{item.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
