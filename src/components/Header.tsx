import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { site } from '@/content/site'
import { cn } from '@/lib/cn'

/** Primary nav. The full nav list lives in site.ts; this only decides how it looks. */
export function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-ground/85 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-7 px-gutter">
        <Link
          to="/"
          className="flex items-center gap-3 text-[0.95rem] font-extrabold tracking-tight uppercase"
        >
          <span className="grid size-[22px] place-items-center border border-line bg-yale text-[0.7rem] font-extrabold text-white">
            Y
          </span>
          {site.name}
        </Link>

        <nav className="ml-auto hidden items-center gap-6 lg:flex">
          {site.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'text-[0.8125rem] font-semibold transition-colors',
                  isActive ? 'text-hv' : 'text-ink-2 hover:text-ink',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <a
          href={site.links.joinForm}
          target="_blank"
          rel="noreferrer"
          className="btn ml-auto lg:ml-0 max-sm:hidden"
        >
          Join the team
        </a>

        <button
          type="button"
          className="btn btn-quiet lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-rule bg-sheet lg:hidden">
          <ul className="mx-auto max-w-[1280px] px-gutter py-2">
            {site.nav.map((item) => (
              <li key={item.to} className="border-b border-rule-soft last:border-0">
                <NavLink
                  to={item.to}
                  onClick={close}
                  className={({ isActive }) =>
                    cn('block py-3 text-sm font-semibold', isActive ? 'text-hv' : 'text-ink-2')
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="py-4">
              <a
                href={site.links.joinForm}
                target="_blank"
                rel="noreferrer"
                className="btn"
                onClick={close}
              >
                Join the team
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
