# Moralis

Moralis is a cinematic, browser-only personality experience that combines the
nine D&D moral alignments with Western zodiac signs to reveal an original
celestial animal familiar.

## What it includes

- Ten scenario-based moral questions drawn from a balanced bank of thirty and
  scored across order/freedom and altruism/self-interest axes
- Month-and-day-only zodiac detection (the year is never requested)
- Twelve original anime-style familiar portraits
- Secure per-reading variation that shuffles questions and answers and changes
  the familiar name and temperament while keeping the active reading stable
- A custom WebGL nebula shader with motion-reduction support
- Progressive CSS including OKLCH color mixing, registered custom properties,
  view transitions, scroll timelines, container queries, and shaped corners
- Fully static export with no backend, account, analytics, or stored user data

## Local development

Use Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validate a production build

```bash
npm test
```

This creates and validates the static site in `out/`.

## GitHub Pages

The included workflow publishes `out/` whenever `main` is pushed. In the
repository settings, set **Pages → Build and deployment → Source** to
**GitHub Actions**. The workflow automatically handles both project sites
(`owner.github.io/repository`) and user sites (`owner.github.io`).

## Avatar art

The twelve final PNG portraits live in `public/avatars/`. They were generated
as one cohesive celestial-familiar collection for this project and are loaded
only when their corresponding result is shown (except for the single intro
preview). `public/og.png` is the matching social-sharing card.
