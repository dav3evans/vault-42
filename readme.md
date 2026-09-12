# Vault 42

Monorepo for the Vault 42 site: a component library first, a Next.js app second.

## Structure

```
apps/
  web/            Next.js 16 app (App Router). Currently just a placeholder page
                  that imports @vault42/ui to prove the wiring — the real site
                  is a later phase.
packages/
  ui/             The component library (@vault42/ui). Built and documented in
                  Storybook. Styled with Tailwind CSS v4, using design tokens
                  ported from the original mockup.
design/
  reference/      A snapshot of the original one-page HTML design (from the
                  "Site basis Vault" folder) that the design tokens and
                  components were derived from. Not built or imported anywhere
                  — kept for reference only.
```

## Getting started

```bash
npm install
```

Run the component library in Storybook (the style guide):

```bash
npm run storybook
```

Run the Next.js app:

```bash
npm run dev
```

## How the pieces fit together

- **Design tokens** (`packages/ui/src/styles/tokens.css`) are the single source of
  truth for colour, type and shape, ported from the reference mockup's CSS
  custom properties into a Tailwind v4 `@theme` block. Both Storybook and the
  Next app import this file.
- **Components** live in `packages/ui/src/components`, organised atomic-design
  style:
  - `atoms/` — Button, Eyebrow, Tag, Heading, Accent
  - `molecules/` — Panel, StatBlock, BulletList
  - `organisms/` — CtaCard, PriceCard (composed from the atoms/molecules above)
- The Next app consumes `@vault42/ui` directly from the workspace (no build
  step yet) and overrides the token package's generic font stacks with
  `next/font/google`-optimized variables in `apps/web/app/globals.css`.

## Notes

- The reference `design/reference/index.html` links to `assets/logo.png` and
  `assets/grime-overlay.png`, but only `.webp` versions of those exist in the
  folder — a pre-existing gap in the original mockup, not something fixed here.
- No real site pages have been built yet — that's the next phase, once the
  component library covers what's needed.
