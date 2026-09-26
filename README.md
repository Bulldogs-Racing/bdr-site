# React + TypeScript + Vite

Website built for Yale's FSAE team, Bulldogs Racing. Currently has around 5 pages with image content from the old site. Heavily subject to change as branding is developed.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Newsletter archive

The newsletter page renders `src/newsletterIssues.json` locally so visitors do not have to wait for the Mailchimp archive embed. Individual issues still open on Mailchimp.

After publishing a newsletter, run `npm run newsletter:sync`, commit the updated JSON, and rebuild/deploy the site. The command reads the public Mailchimp archive and requires no API key. It preserves the existing snapshot if the request fails or the archive cannot be parsed. For an offline refresh, pass a saved archive HTML file: `npm run newsletter:sync -- /path/to/archive.html`.

Regular builds use the committed snapshot without a network request. The page also links to the live Mailchimp archive for the newest issues between refreshes.