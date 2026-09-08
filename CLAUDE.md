# Working in this repo

The Bulldogs Racing site: static, prerendered React on GitHub Pages. Read
`README.md` first — it covers the stack, the layout, and why prerendering is
load-bearing. This file is only the things that are easy to get wrong.

## Before you finish

```bash
npm run lint && npm run build
```

`npm run build` typechecks and prerenders all 27 routes. A green `npm run dev`
proves very little; prerendering bugs only show up in the real build.

## Rules that matter

**Never import from `src/content/` inside a component or page.** Go through
`src/lib/content.ts`. That indirection is the entire reason a future
Flask/Supabase backend is a swap instead of a rewrite. The one sanctioned
exception is `carSlugs()`, which must be synchronous for `getStaticPaths`.

**Content changes belong in `src/content/`, not in JSX.** If you find yourself
typing a person's name, a lap time or a sponsor into a component, it goes in a
content file with a zod schema instead.

**Adding a route means touching `src/routes.tsx`, with both `lazy` and
`entry`.** Omitting `entry` silently drops the page from the prerender: it will
work in dev and 404 in production.

**This site is dark-only, by design.** It is a motorsport identity, not a theme.
Do not add a light mode or `prefers-color-scheme` blocks. Take every colour from
a token in `@theme`; never hardcode a hex in a component.

**Spend the orange carefully.** `--color-hv` is the orange FSAE rules mandate on
high-voltage hardware. It marks interaction, live status, and wins. Yale Blue
(`--color-line`) does structure: rules, grid lines, chassis. If everything is
orange, nothing is.

**Do not invent specs.** Lap times, pack voltages and results are the team's
published figures. Leave a field out rather than guessing at it.

## Gotchas that have already bitten

- **`*/` inside a CSS comment ends the comment.** It silently ate an
  `@font-face` block and dropped a font from the build. Watch for it when
  writing paths in comments in `src/index.css`.
- **Fonts are declared by hand in `src/index.css`,** not imported from
  Fontsource. Importing the packages put a `<link rel="preload">` on every page
  for all 26 unicode subsets, because vite-react-ssg preloads everything in the
  module graph. The six faces in `src/assets/fonts/` are the ones we use.
- **React Router is pinned to 6.** `vite-react-ssg` peers against 6. Bumping to
  7 means replacing the prerenderer.
- **`setState` inside `useEffect` is a lint error,** not a warning. Handle state
  in the event that caused it.

## What is intentionally missing

No contact form (no backend — a form that drops messages is worse than an email
address). No CMS. No analytics. No light mode. If you are about to add one of
these, it is a product decision, so ask first.
