# bdr-site

The Bulldogs Racing website — Yale University's Formula SAE team.

Static, prerendered React. No backend, no database, no server to keep alive.
Pushing to `main` deploys it.

```bash
npm install
npm run dev      # http://localhost:5173
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Typecheck, then prerender every route to `dist/` |
| `npm run preview` | Serve `dist/` exactly as GitHub Pages will |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run scrape` | One-off: pull content off the old WordPress site |
| `npm run images` | Convert a folder of photos to web-ready AVIF/WebP |

Always run `npm run preview` rather than trusting `npm run dev` before a
release. Dev renders differently enough that prerendering bugs hide there.

## The stack, and why

| Choice | Why |
| --- | --- |
| **Vite + React + TypeScript** | Plain React. Nothing to learn beyond React itself, which matters on a team that hands over every year. |
| **Tailwind v4** | Utility classes for layout and spacing. Design tokens live in `@theme` in `src/index.css`; the handful of repeated patterns (`.label`, `.btn`, `.pill`, `.prose-bdr`) are real classes in `@layer components`. |
| **vite-react-ssg** | Prerenders each route to a real `.html` file at build time. This is the load-bearing choice — see below. |
| **React Router 6** | Client-side routing. Pinned to 6 because that is what `vite-react-ssg` supports; moving to 7 means dropping or replacing the prerenderer. |
| **Zod** | Validates every piece of content at build time, and doubles as the schema for a future backend. |

### Why prerendering, specifically

A plain single-page React app on GitHub Pages has two problems that are easy to
miss in development and embarrassing in production:

1. **Deep links 404 on refresh.** GitHub Pages has no rewrite rules, so a
   request for `/cars/br13` looks for a file at that path. In an SPA there
   isn't one.
2. **Crawlers see nothing.** Google, LinkedIn and any sponsor's link preview
   read the HTML that comes off the server, not the DOM after React hydrates.
   An SPA serves them an empty `<div id="root">`.

Prerendering fixes both: `npm run build` writes `dist/cars/br13/index.html`
with the real content already in it. React still hydrates on top, so navigation
between pages stays instant.

## Layout

```
src/
  content/        the actual words and numbers — team, cars, alumni, sponsors
  lib/
    schemas.ts    zod schemas: the shape of all content
    content.ts    the ONLY place the site reads data (see below)
    legacy-routes.ts
  components/     shared UI
  pages/          one module per route, each exporting Component (+ loader)
  routes.tsx      the route table
  index.css       design tokens, base styles, component classes
scripts/          one-off migration tooling, not part of the build
public/           copied verbatim into dist (CNAME, favicon, media)
```

### Editing content

Almost every change you will want to make is a change to a file in
`src/content/`, and nothing else:

- **New leadership board in September** → `src/content/team.ts`
- **New car** → `src/content/cars.ts` (a `/cars/<slug>` page appears automatically)
- **New sponsor** → `src/content/sponsors.ts`
- **New newsletter** → `src/content/news.ts`
- **Email, socials, nav, external forms** → `src/content/site.ts`

The zod schemas mean a typo fails the build with the offending field named,
rather than shipping a blank section.

### Adding a page

1. Create `src/pages/Thing.tsx` exporting `Component` (and a `loader` if it
   needs data).
2. Add a route to `src/routes.tsx` with both `lazy` and `entry` — `entry` is
   what tells the prerenderer the file exists.
3. Add it to `site.nav` in `src/content/site.ts` if it belongs in the nav.

## The backend that isn't here yet

The site ships with no backend on purpose. Two things make one cheap to add
later:

**Everything goes through `src/lib/content.ts`.** Pages never import from
`src/content/` directly — they call `getCars()`, `getTeam()` and friends, which
are async and return schema-validated data. Today those functions read a local
array. To move to Supabase or Flask, you change the body of each function to a
`fetch` and parse the response through the same schema. No page changes.

**The zod schemas are the API contract.** They describe the shape both sides
have to agree on, so the table definitions and the client stay in sync by
construction.

What actually needs a backend today: nothing. The join form is a Google Form,
the newsletter is Mailchimp, and contact is an email address — all of which work
on a static host. Before standing up a database, consider whether a git-based
CMS (Decap, Tina) solves the real problem, which is usually "let the business
manager update sponsors without opening a pull request."

## Images

Do not commit camera originals. Run them through the optimizer first:

```bash
node scripts/optimize-images.mjs ~/photos/br25 --out public/media/cars
```

That writes AVIF and WebP at three widths. Reference them with `<picture>` and
always set `width` and `height` so the page doesn't jump while they load.

## Deploying

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.
Enable it once, under **Settings → Pages → Source → GitHub Actions**.

The custom domain comes from `public/CNAME`. If you ever drop the domain and
serve from `<org>.github.io/bdr-site/`, change `base` in `vite.config.ts` to
`/bdr-site/`; every internal link goes through React Router, so nothing else
needs to move.

## Migrating off WordPress

`npm run scrape` pulls the old site's pages, the 15 team bios (which are not
exposed over the WordPress REST API and have to be scraped as HTML) and a
catalogue of all 316 media items into `scripts/.scratch/`, which is gitignored.
Add `--media` to download the files themselves.

It deliberately does not write to `src/`. Read what it produces and hand-write
the good parts into the typed content files. Once bulldogsracing.com is off
WordPress, delete the script.

The old URLs (`/leadership-team`, `/sponsorship`, `/126-2`, ...) are prerendered
as redirect pages so existing inbound links keep working. They live in
`src/lib/legacy-routes.ts`.
