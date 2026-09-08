/**
 * WordPress URL -> new URL.
 *
 * Kept apart from the page component so `src/routes.tsx` can read the table
 * without statically importing the lazily-loaded page and defeating its chunk.
 */
export const LEGACY_ROUTES: Record<string, string> = {
  '/the-team': '/about',
  '/leadership-team': '/team',
  '/team-history': '/history',
  '/the-team/previous-cars': '/cars',
  '/previous-cars': '/cars',
  '/126-2': '/alumni',
  '/sponsorship': '/sponsors',
  '/contact-us': '/contact',
}
