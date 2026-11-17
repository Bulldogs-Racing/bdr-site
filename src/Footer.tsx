import whiteLogo from './assets/white logo no background.png'
import './Footer.css'

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/yalebdr/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/bulldogsracing' },
  { label: 'Linktree', href: 'https://linktr.ee/yalebdr' },
]

const pageContent = {
  history: {
    title: 'The next chapter is built together.',
    description: '',
    links: [
      { label: 'Meet the team', href: '/team' },
      { label: 'Get in touch', href: '/about' },
    ],
  },
  team: {
    title: 'Built together. Bulldogs Racing.',
    description: '',
    links: [
      { label: 'bulldogsracing@yale.edu', href: 'mailto:bulldogsracing@yale.edu' },
      { label: 'Back to home', href: '/' },
    ],
  },
  sponsorship: {
    title: 'Be part of what’s next.',
    description: 'Interested in sponsoring the team? Get in touch for more information.',
    links: [
      { label: 'bulldogsracing@yale.edu', href: 'mailto:bulldogsracing@yale.edu' },
    ],
  },
  newsletter: {
    title: 'Be part of what’s next.',
    description: '',
    links: [
      { label: 'Meet the team', href: '/team' },
      { label: 'Support Bulldogs Racing', href: '/sponsors' },
      { label: 'Get in touch', href: 'mailto:bulldogsracing@yale.edu' },
    ],
  },
}

function Footer({ page }: { page?: keyof typeof pageContent }) {
  const content = page ? pageContent[page] : undefined

  return (
    <footer className="site-footer">
      {content && (
        <div className="site-footer__callout">
          <h2>{content.title}</h2>
          {content.description && <p>{content.description}</p>}
          <nav aria-label="More from Bulldogs Racing">
            <ul>
              {content.links.map(({ label, href }) => (
                <li key={href}>
                  <a href={href}>{label} <span aria-hidden="true">↗</span></a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
      <div className="site-footer__identity">
        <a className="site-footer__brand" href="/" aria-label="Bulldogs Racing home">
          <img src={whiteLogo} alt="" loading="lazy" />
          <span>Bulldogs Racing</span>
        </a>
        <p>Formula SAE @ Yale University</p>
      </div>
      <nav className="site-footer__social" aria-label="Follow Bulldogs Racing">
        <p>Follow the team</p>
        <ul>
          {socialLinks.map(({ label, href }) => (
            <li key={label}>
              <a href={href}>
                {label} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  )
}

export default Footer
