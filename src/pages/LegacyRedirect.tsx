import { Navigate, useLocation } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { LEGACY_ROUTES } from '@/lib/legacy-routes'
import { site } from '@/content/site'

/**
 * Permanent redirects for the WordPress URLs.
 *
 * GitHub Pages cannot issue a 301, so each legacy path is prerendered as a real
 * page whose only job is to forward: a <meta http-equiv="refresh"> for crawlers
 * and no-JS clients, a canonical link pointing at the new URL so search engines
 * transfer the ranking, and a client-side <Navigate> for everyone else.
 *
 * These matter more than they look: sponsors, press and the Yale directory all
 * link to the old slugs.
 */

export default function LegacyRedirect() {
  const { pathname } = useLocation()
  const target = LEGACY_ROUTES[pathname.replace(/\/+$/, '')] ?? '/'

  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={`${site.url}${target}`} />
        <title>Moved</title>
      </Head>
      <noscript>
        <p style={{ padding: '4rem 1.5rem' }}>
          This page has moved to <a href={target}>{target}</a>.
        </p>
      </noscript>
      <Navigate to={target} replace />
    </>
  )
}

export const Component = LegacyRedirect
