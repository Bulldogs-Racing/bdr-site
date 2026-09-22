import { useEffect, useRef, useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', dismiss)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', dismiss)
      document.removeEventListener('keydown', escape)
    }
  }, [open])

  return (
    <nav className="navbar" aria-label="Main navigation">
      <a href="/team">Team</a>
      <a href="/history">History</a>
      <a href="/#sponsorship">Sponsorship</a>
      <div className="navbar__about" ref={menuRef}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
        }}>
        <a href="/about">About</a>
        <button ref={toggleRef} className="navbar__toggle" type="button"
          aria-label="More about Bulldogs Racing" aria-expanded={open}
          aria-controls="navbar-more" onClick={() => setOpen(!open)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? <path d="m6 6 12 12M18 6 6 18" /> :
              <path d="M3 6h12M3 12h9M3 18h12m3-10 4 4-4 4" />}
          </svg>
        </button>
        <div id="navbar-more" className="navbar__dropdown" hidden={!open}>
          <a href="mailto:bulldogsracing@yale.edu" onClick={() => setOpen(false)}>Contact</a>
          <a href="/newsletter" onClick={() => setOpen(false)}>Newsletter</a>
        </div>
      </div>
    </nav>
  )
}
