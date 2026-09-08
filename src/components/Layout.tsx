import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

/** Root route: chrome that never unmounts, plus scroll restoration between pages. */
export function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // react-router keeps scroll position across navigations, which feels broken
    // on a content site. Anchors within a page are left alone.
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100 focus:border focus:border-hv focus:bg-ground focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export const Component = Layout
