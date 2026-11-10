# src

This folder has the app's source code. This site is a Vite + React + TypeScript single-page app. The site has no router library. `main.tsx` picks the page from `window.location.pathname`.

## Routing

`main.tsx` is the entry point. It reads `window.location.pathname`. It matches the path against four lists of paths, one list per page. It sets `document.title` for a match. It renders one page component. The home page (`App.tsx`) is the fallback when no path matches.

| Path(s) | Page component | Page title |
|---|---|---|
| `/team`, `/leadership-team` | `TeamPage.tsx` | Our Team \| Bulldogs Racing |
| `/history`, `/team-history`, `/the-team/previous-cars` | `HistoryPage.tsx` | Our History \| Bulldogs Racing |
| `/sponsors`, `/sponsorship`, `/sponsorships` | `SponsorshipPage.tsx` | Sponsorships \| Bulldogs Racing |
| `/about`, `/contact-us` | `AboutPage.tsx` | About & Contact \| Bulldogs Racing |
| any other path | `App.tsx` | (unchanged — set in `index.html`) |

Each path list keeps old URLs from the previous WordPress site as aliases. The root `README.md` explains how `vercel.json` serves `index.html` for every one of these paths in production, so a direct link or a page refresh works.

## Files

### main.tsx
The app's entry point. It picks a page by path and renders it, as described above.

### App.tsx
The home page. It has the hero section, an SVG animation of the car and track, a short history preview, and a sponsor callout. It imports most of its images directly from `src/assets/` — see `src/assets/README.md`.

### App.css
Shared styles. `App.tsx` and every other page (`AboutPage.tsx`, `HistoryPage.tsx`, `SponsorshipPage.tsx`, `TeamPage.tsx`) import this file. Each page then imports its own CSS file on top of this one.

### Navbar.tsx
The site navbar. Every page renders this component. It shows the white logo and links to `/team`, `/history`, `/sponsors`, and `/about`.

### index.css
Global base styles. `main.tsx` imports this file once, before any page.

### AboutPage.tsx / AboutPage.css
The About page. It shows a photo, a short intro, invitations to students, educational groups, and sponsors, a contact email, a newsletter sign-up link, and an embedded events calendar (an iframe from `embed.styledcalendar.com`).

### HistoryPage.tsx / HistoryPage.css
The Team History page. It shows a header photo, the narrative chapters from `historyData.ts`, and the full car-by-car archive, also from `historyData.ts`.

### TeamPage.tsx / TeamPage.css
The Team page. It shows the group photo and the leadership sections and members from `teamData.ts`.

### SponsorshipPage.tsx / SponsorshipPage.css
The Sponsorship page. It shows a header photo, a link to the sponsorship packet PDF, and the sponsor grid, individual supporters, and past sponsors from `sponsorData.ts`.

### historyData.ts
Data only, no page markup. Holds `historyChapters` (narrative text for each era) and `previousCars` (one entry per car, with photos from `src/assets/history/`). See `src/assets/history/README.md` — `App.tsx` also imports these same car photos for its own short preview list, kept separately in `App.tsx` itself.

### sponsorData.ts
Data only, no page markup. Holds `currentSponsors` (logo, name, and URL per sponsor), `individualSupporters`, `previousSponsors`, `sponsorSeason`, and `sponsorshipPacket`. See `src/assets/sponsors/README.md` for the logo files.

### teamData.ts
Data only, no page markup. Holds `teamSections` (Board, Subteam Leads, Advisors) and `leadershipYear`. See `src/assets/team/README.md` for the portrait files.

## Notes for future changes

- To add or edit a page, follow the pattern above: a `.tsx` file for markup, a matching `.css` file for page-specific styles, `App.css` for shared styles, and an entry in `main.tsx`'s path lists.
- To add or edit content on the History, Team, or Sponsorship pages, edit the matching `*Data.ts` file rather than the page's `.tsx` file. The page components read these arrays and render them; they hold no content of their own.
- `App.tsx` keeps its own copy of the history-photo list for the home page preview. A change to a car photo in `src/assets/history/` needs an update in both `historyData.ts` and `App.tsx`. `src/assets/history/README.md` has the full file-by-file list.
