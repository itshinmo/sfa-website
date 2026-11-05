# Questions / blockers

Add questions here; the orchestrator answers or escalates to the author.

## Resolved

- **Design direction:** hybrid 01 Field Notes + 02 Rooted; light only; no 03
  Signal/dashboard.
- **Hero:** original farmland photo, desktop + mobile crops, optimized to
  JPEG/WebP.
- **Typography:** Vazirmatn (Persian/Arabic) + Inter (Latin) under ADR-009;
  BYekan is retired from the token/preload path.
- **Hero composition:** top-start editorial, chosen 2026-11-05; copy at the top,
  top-weighted scrim, no glass panel. Recorded in the ADR-009 addendum.
- **Audience:** farmers; alive and informative, not an info dump.
- **Blog source:** read-only public API; no drafts/editor/CMS.
- **Locale strategy:** Persian default, `/fa` + `/en`, localized slugs.
- **Draft preview:** not applicable; the website is read-only.

## Author input needed

1. **Facts** — research numbers (2,000 m³/ha, 28%, 4×) need study scope,
   baseline, region, crop set, and a source if one exists.
2. **Achievements** — years, organizers, official award titles, and what IRC
   stands for.
3. **Partners** — written permission to publish SRBIAU/SWRI logos and exact
   relationship wording.
4. **Team** — confirm roles/bios/public links; decide whether personal emails may
   be published.
5. **Contact** — resolve `info@sfa-agri.ir` vs `info@sfa.com`; provide phone,
   address, hours, social profiles.
6. **Downloads** — real Google Play, Bazaar, Myket, APK, Windows/macOS/Linux
   URLs; confirm whether the web app requires an account/pricing.
7. **Imagery** — approve the three current, non-identifying app captures for
   the device showcase; new field photography is optional. No
   account/sidebar/personal data in any capture.

## Agent questions

- Backend: confirm the API contract in `docs/blog-api.md`, especially fallback,
  `alternates`, the bearer token header, and search normalization.
- Backend: confirm image URL/CDN behavior and whether `srcSet` is provided.
- Backend: sitemap endpoint behavior on API failure.
- Orchestrator: Docker build/run is blocked on this machine (no daemon).
