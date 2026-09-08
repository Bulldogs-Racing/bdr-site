import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from './components/Layout'
import { LEGACY_ROUTES } from './lib/legacy-routes'
import { carSlugs } from './lib/content'

/**
 * Route table.
 *
 * Every page is `lazy`-loaded and declares an `entry`, which is what lets
 * vite-react-ssg code-split each route AND prerender it to a real HTML file at
 * build time. That is why deep links like /cars/br13 survive a hard refresh on
 * GitHub Pages, which has no rewrite rules, and why crawlers see real content
 * instead of an empty <div id="root">.
 *
 * Page modules export `Component` and, where they need data, a react-router
 * `loader`. Loaders run at build time, so their data is baked into the HTML.
 */
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/components/Layout.tsx',
    children: [
      { index: true, lazy: () => import('./pages/Home'), entry: 'src/pages/Home.tsx' },
      { path: 'about', lazy: () => import('./pages/About'), entry: 'src/pages/About.tsx' },
      { path: 'team', lazy: () => import('./pages/Team'), entry: 'src/pages/Team.tsx' },
      { path: 'history', lazy: () => import('./pages/History'), entry: 'src/pages/History.tsx' },
      { path: 'cars', lazy: () => import('./pages/Cars'), entry: 'src/pages/Cars.tsx' },
      {
        path: 'cars/:slug',
        lazy: () => import('./pages/CarDetail'),
        entry: 'src/pages/CarDetail.tsx',
        // Enumerated here rather than inside the page module: the list is needed
        // before that lazy chunk has been imported.
        getStaticPaths: () => carSlugs().map((slug) => `cars/${slug}`),
      },
      {
        path: 'competition',
        lazy: () => import('./pages/Competition'),
        entry: 'src/pages/Competition.tsx',
      },
      { path: 'alumni', lazy: () => import('./pages/Alumni'), entry: 'src/pages/Alumni.tsx' },
      { path: 'sponsors', lazy: () => import('./pages/Sponsors'), entry: 'src/pages/Sponsors.tsx' },
      { path: 'news', lazy: () => import('./pages/News'), entry: 'src/pages/News.tsx' },
      { path: 'contact', lazy: () => import('./pages/Contact'), entry: 'src/pages/Contact.tsx' },

      // Legacy WordPress URLs, prerendered so old inbound links keep working.
      ...Object.keys(LEGACY_ROUTES).map((path) => ({
        path: path.slice(1),
        lazy: () => import('./pages/LegacyRedirect'),
        entry: 'src/pages/LegacyRedirect.tsx',
      })),

      // GitHub Pages serves /404.html for anything it cannot find, so this route
      // has to be prerendered under that exact name as well as catching unknown
      // paths during client-side navigation.
      { path: '404', lazy: () => import('./pages/NotFound'), entry: 'src/pages/NotFound.tsx' },
      { path: '*', lazy: () => import('./pages/NotFound'), entry: 'src/pages/NotFound.tsx' },
    ],
  },
]
