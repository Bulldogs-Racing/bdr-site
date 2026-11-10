# src/assets

This folder has the top-level asset files. The subfolders `history/`, `sponsors/`, and `team/` have their own `README.md` files.

## Files

### BDRTeam-2600x1733.jpg
This file is a 2600×1733 JPEG. This file shows the full team group photo.
- `src/TeamPage.tsx` uses this file as `groupPhoto`. The Team page shows this file as its header image.
- `src/assets/team/README.md` names this file as the source of the group photo on that page. That file does not import this photo.

### WebsiteVideo.mp4
This file is a background video for the home page.
- `src/App.tsx` uses this file as `websiteVideo`. The file is the `<source>` for a `<video>` element in the home page hero section.

### about.jpg
This file is a 7646×5097 JPEG. A FUJIFILM X100VI camera took this photo on 2026-04-22. A person edited this photo in Lightroom.
- `src/AboutPage.tsx` uses this file as `aboutPhoto`. The About page shows this file.

### background.png
This file is a 1536×1024 PNG. This file shows a drawn background scene of a track. The file's size matches the SVG viewBox that shows it.
- `src/App.tsx` uses this file as `background`. An `<image>` element inside an SVG shows this file. This SVG has the class name `track-scene_car`. This SVG is in the home page hero section.

### black logo no background.png
This file is a 1620×1620 PNG with a transparent background. This file shows the logo in black.
- **No code uses this file.** No file in `src/` imports or names this file. This file was in the first commit (`e5238dd init`). No earlier commit exists that names this file. This file is not a leftover from a removed feature. This file is an unused logo color. The team may plan to use this file later, for example on a light-colored navbar or footer.

### blue logo no background.png
This file is a 1620×1620 PNG with a transparent background. This file shows the logo in blue.
- **No code uses this file.** The same facts apply as for `black logo no background.png`. This file was in the first commit. No commit in the project's history names this file in code.

### car.png
This file is an 820×480 PNG with a transparent background. This file shows a drawn car. This file pairs with `background.png`.
- `src/App.tsx` uses this file as `car`. An `<image>` element inside the same hero SVG as `background.png` shows this file. This image sits on top, with the class name `track-scene__car-layer`.

### sponsors.jpg
This file is a 5345×3563 JPEG. A FUJIFILM X100VI camera took this photo on 2026-09-08. A person edited this photo in Lightroom.
- `src/App.tsx` uses this file as `sponsorsPromo`. The home page's sponsor section shows this file.
- `src/SponsorshipPage.tsx` uses this file as `sponsorPhoto`. The Sponsorship page shows this file as its header image.

### white logo no background.png
This file is a 1620×1620 PNG with a transparent background. This file shows the logo in white. This is the only logo color that the code uses now.
- `src/Navbar.tsx` uses this file as `whiteLogo`. The site navbar shows this file.
- `src/App.tsx` uses this file as `whiteLogo`. The home page hero section shows this file with the class name `intro-splash__logo`.

## Notes for future changes

- Some filenames have spaces, for example `black logo no background.png`. Vite's ES module imports work with these names. A shell command needs quotes around these names.
- `black logo no background.png` and `blue logo no background.png` have no use in the code now. If this stays true, the team can remove these files or add a use for them, for example a light-mode navbar. Ask the team before you delete these files. The team may plan to use these files in future branding work. The root `README.md` says the site is subject to change as the team develops its branding.
