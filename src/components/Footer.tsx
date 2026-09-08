import { Link } from 'react-router-dom'
import { site } from '@/content/site'

export function Footer() {
  return (
    <footer className="mt-20 border-t border-rule">
      <div className="mx-auto max-w-[1280px] px-gutter pt-9 pb-14">
        <ul className="mb-7 flex flex-wrap gap-x-7 gap-y-3">
          {site.nav.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="label transition-colors hover:text-hv">
                {item.label}
              </Link>
            </li>
          ))}
          {site.socials.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="label transition-colors hover:text-hv"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap justify-between gap-5 font-mono text-[0.625rem] leading-[1.9] tracking-[0.1em] text-ink-3 uppercase">
          <span>
            {site.name} · Yale University · {site.location} · Est. {site.founded}
          </span>
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-hv">
            {site.email}
          </a>
        </div>

        <p className="mt-4 max-w-[70ch] font-mono text-[0.625rem] leading-[1.9] tracking-[0.08em] text-ink-3">
          {site.disclaimer}
        </p>
      </div>
    </footer>
  )
}
