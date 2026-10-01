# React + TypeScript + Vite

Website built for Yale's FSAE team, Bulldogs Racing. Currently has around 5 pages with image content from the old site. Heavily subject to change as branding is developed.

## Deploying on Vercel

Import this repository with the Vercel project **Root Directory** set to the repository root (the directory containing `package.json` and `vercel.json`). The checked-in configuration selects Vite, runs `npm run build`, and publishes `dist`.

Pages are selected in the browser by `src/main.tsx`. The rewrite in `vercel.json` serves `index.html` for page URLs such as `/history`, `/team`, `/sponsors`, and `/about`, allowing direct links and page refreshes to work. Existing static files are served normally.

If a page URL returns Vercel's 404 page, verify that the deployment uses the branch and commit containing `vercel.json`, that the Root Directory is correct, and that the domain points to that deployment. Redeploy after changing these settings; uploading only `dist` without the root Vercel configuration does not include the page fallback. After deployment, open `/history` directly and refresh it to check routing.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).
