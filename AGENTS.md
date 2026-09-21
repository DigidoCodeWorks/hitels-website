# Hitels marketing site

A static marketing site for Hitels (hotel websites/booking engines). Astro
renders every page at build time — there is no server, no SSR route, and no
per-request Sanity traffic. Content changes go live by rebuilding, not by a
runtime fetch.

## Stack

- **Astro** (`output: "static"`) — pages in `src/pages/`, components in
  `src/components/`, one `BaseLayout.astro` wrapping every page.
- **React** only for the few interactive islands (e.g. `ContactForm.tsx`) via
  `@astrojs/react`.
- **Tailwind v4** via `@tailwindcss/vite` — no separate Tailwind config file,
  configured directly in `astro.config.mjs`.
- **Sanity** — the CMS. Studio is embedded at `/studio` in this same Astro
  app (not a separate deploy), via `@sanity/astro`.
- **Cloudflare R2** — hosts every content image (logos, photos, icons).
  Content schemas store a plain `url` field pointing at R2, **not** Sanity's
  native `image` asset type — every schema field that does this says so in
  its own comment ("Hosted on R2, not a Sanity asset").
- **Cloudflare Pages** — hosting. GitHub Actions builds and deploys via
  `wrangler pages deploy` (Cloudflare Pages isn't Git-connected to this repo;
  see `.github/workflows/deploy-cloudflare.yml`).

## Content → live site flow

1. An editor publishes a document in Sanity Studio (`/studio`).
2. A Sanity webhook fires a `repository_dispatch` (`sanity-publish` type)
   directly at GitHub's API — no intermediate serverless function.
3. `.github/workflows/deploy-cloudflare.yml` runs: `npm ci` → `npm run build`
   (which fetches fresh content straight from Sanity's API, `useCdn: false`
   — deliberately, to avoid CDN propagation lag racing this near-instant
   webhook and baking in stale pre-publish content) → `wrangler pages deploy`.
4. The workflow also runs on every push to `main` and via manual
   `workflow_dispatch`.

There is no live-preview/draft-mode route in this project — publishing and
seeing it live both take the same ~1 minute round-trip through this
pipeline. Adding real live preview would require switching at least one
route to SSR, a deliberate architecture change not currently justified.

## Staging branch and previews

`staging` is a persistent branch with its own fixed Cloudflare Pages URL
(`https://staging.simple-website-16a.pages.dev` — note the "-16a" suffix
Cloudflare assigned this project's pages.dev subdomain, same one
`astro.config.mjs`'s `SITE_URL` fallback uses), separate from production:

1. New work happens on a feature branch, opened as a PR **into `staging`**
   (not `main`) — same branch-and-PR discipline as production work, just
   retargeted.
2. Merging into `staging` triggers `.github/workflows/deploy-staging-cloudflare.yml`,
   which builds and runs `wrangler pages deploy --branch staging`, updating
   the fixed staging URL in place.
3. Once staging looks good, open a PR from `staging` into `main`. Merging
   that triggers `deploy-cloudflare.yml` as usual, deploying to production.

Staging builds against the same live Sanity content as production — there's
no separate staging dataset — so staging only isolates *code* changes, not
content changes. Staging builds also omit `PUBLIC_SITE_URL`, so canonical/OG
tags fall back to the `pages.dev` placeholder instead of pointing at the
production domain.

## Environment variables

See `.env.example` for the full annotated list. Summary:

| Var | Used by | Notes |
|---|---|---|
| `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET` | site + Studio | `PUBLIC_` prefix required — bundled into Studio's client code |
| `SANITY_API_TOKEN` | `scripts/framer-import` only | write-access token, never shipped to the browser |
| `R2_PUBLIC_URL` | site (asset URLs) | must match `R2_BASE` hardcoded in `src/lib/cdn.ts` |
| `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME` | `scripts/*.mjs` only | never exposed to the browser |
| `PUBLIC_CONTACT_FORM_ENDPOINT` | `ContactForm.tsx` | Google Apps Script Web App URL; empty disables submission |
| `PUBLIC_SITE_URL` | `astro.config.mjs` | canonical URL / sitemap / OG base; falls back to the `.pages.dev` URL until a custom domain is attached |

The 4 `PUBLIC_*`/`R2_PUBLIC_URL`/`PUBLIC_CONTACT_FORM_ENDPOINT` vars are
schema-validated in `astro.config.mjs`'s `env.schema` — a build fails loudly
if one is missing, rather than silently shipping broken content. Every
`scripts/*.mjs` script validates its own required vars the same way
(check-and-`process.exit(1)` before doing anything) — match that pattern in
any new script.

## Sanity schema conventions

Schema lives entirely under `src/sanity/`. That directory only imports from
within itself or external packages — never from `src/components/` or other
Astro code — so it would stay liftable to a different frontend later.

**Document roles** (each is a deliberate, fixed contract — don't blur them):

- **Page** (`page.ts`) — owns a route via `slug`, composed from the page
  builder's closed `sections` array (see below). Home is the first page
  converted to this pattern; other pages still hardcode their content
  directly in `.astro` files pending their own conversion.
- **Singleton** — exactly one instance, create/delete locked via
  `__experimental_actions: ['update', 'publish']` (a real Studio feature,
  undertyped by Sanity's own `defineType` — needs a `@ts-expect-error`
  comment where used). Currently: `pricingPlans.ts`.
- **Collection** — an ordinary list of interchangeable documents, usually
  with a manual `order` number field + an `orderAsc` ordering:
  `post.ts`, `faq.ts`, `testimonial.ts`, `story.ts`.
- **Config/marker** — `storiesClosingCard.ts` (a fixed singleton-shaped
  document with no `__experimental_actions` lock yet — a gap, not a
  pattern to copy for new singletons).

**Field factories** (`src/sanity/fields.ts`) — reusable field shapes
(`imageUrlField`, `altTextField`, `linkField`, `stringListField`) instead of
copy-pasting a field definition across schemas. If a new field shape gets
copy-pasted into a second schema file, turn it into a factory here instead —
that's what keeps a later change (e.g. "make alt text required") a one-line
edit instead of a hunt across every schema.

**Page builder** (`page.ts` + `sections.ts`) — `page.sections` is a closed,
curated array of section object types (`heroSection`,
`productOfferingsSection`, `customerStoriesSection`, `addOnsSection`,
`testimonialsSection`, `faqSection`). Adding a new section type is a design
decision (does this belong in the system?), not a quick schema addition.
`testimonialsSection`/`faqSection` are markers with no fields of their own —
they just mark *where* on the page the Testimonial/FAQ Astro components
(which query the separate `testimonial`/`faq` collections directly) should
render, making section order editable without new schema.

**Validation lives in the schema, not the frontend.** If a component needs a
field to always be present, add `.required()` (and `.min(1)` for arrays) to
that field in its schema — don't paper over a possibly-missing value with a
fallback in the component. This is also what makes TypeGen (below) generate
non-nullable types for that field.

## Fetching content from Astro

Every GROQ query lives in `src/sanity/queries.ts` as a `defineQuery(...)`
export — **not** inlined as a template string in a page/component's
frontmatter. Two reasons: it keeps every query in one place, and Sanity's
typegen can only statically discover queries in `.ts`/`.tsx`/`.js`/`.jsx`
files — it never scans `.astro` frontmatter.

```ts
import { sanityClient } from 'sanity:client';
import { faqsQuery } from '../../sanity/queries';

const faqs = await sanityClient.fetch(faqsQuery);
```

Run `npm run typegen` after adding or changing a query or schema field. It
extracts the schema (`sanity schema extract --enforce-required-fields`,
config in `sanity.cli.ts`) and regenerates `sanity.types.ts`, which is
committed to the repo (no typegen step in CI — it runs entirely against
files already checked in). Import result types from there instead of
hand-writing an `interface` for what a query returns:

```ts
import type { FaqsQueryResult } from '../../sanity.types';
```

`--enforce-required-fields` only narrows a field to non-nullable when the
query uses an explicit `{ ... }` projection — a bare `[0]` fetch with no
projection falls back to the generic document shape and everything comes
back nullable.

Sanity content is nullable-by-default in generated types even where the
frontend treats a value as always present (e.g. an optional button label).
Convert `null` → `undefined`/a fallback at the exact call site that fetches
the data (the page or the component doing the `sanityClient.fetch`) — don't
loosen a shared component's prop types (e.g. `BaseLayout`,
`blog-detail/Hero`) to accept `null` just to satisfy one caller.

## Key scripts (`scripts/*.mjs`)

- `upload-to-r2.mjs` — uploads content images to R2; run after
  adding/replacing an image referenced by a `url` field in Sanity.
- `seed-home-page.mjs` — one-off/idempotent seed for the `page` (slug
  `"home"`) and `pricingPlans` singleton documents. Reference for the
  pattern any future seed script should follow.
- `list-r2.mjs`, `verify-new-bucket.mjs`, `set-r2-cors*.mjs`,
  `migrate-r2-to-new-account.mjs` — R2 bucket maintenance/migration
  utilities, not part of the normal dev loop.
- `framer-import/` — one-time import tooling from the site's previous
  Framer version; not part of ongoing workflows.

## Dev tooling

- `npm run lint` — ESLint (`eslint.config.mjs`, flat config,
  `eslint-plugin-astro` + `typescript-eslint`, recommended rulesets). A
  `simple-git-hooks` pre-commit hook runs `lint-staged` (`eslint --fix` on
  staged files) automatically after `npm install`.
- `npx astro check` — full TypeScript type-checking across `.astro` files.
  **`npm run build` does not do this** — its esbuild/Vite transform strips
  types without checking them, so a type error can pass `build` and still be
  a real bug. Run `astro check` to actually verify type correctness.

## Development

Start the dev server in background mode: `astro dev --background`. Manage
it with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Astro documentation

Full docs: https://docs.astro.build

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
