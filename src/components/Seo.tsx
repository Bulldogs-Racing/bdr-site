import { Head } from 'vite-react-ssg'
import { site } from '@/content/site'

export interface SeoProps {
  /** Page title. Rendered as "<title> — Bulldogs Racing" unless `bare`. */
  title?: string
  description?: string
  /** Path this page canonically lives at, e.g. '/cars/br20'. */
  path?: string
  /** Use the title verbatim, for the homepage. */
  bare?: boolean
}

/**
 * Per-page document head. Because the site is prerendered, these tags end up in
 * the static HTML -- which is the whole reason we prerender: sponsors, Google
 * and LinkedIn all read the markup, not the hydrated DOM.
 */
export function Seo({ title, description, path, bare }: SeoProps) {
  const fullTitle = !title
    ? `${site.name} — Yale Formula SAE`
    : bare
      ? title
      : `${title} — ${site.name}`
  const desc = description ?? site.description
  const url = path ? `${site.url}${path}` : site.url

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.longName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}
