import whiteLogo from './assets/white logo no background.png'

export default function Navbar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <a className="navbar__brand" href="/" aria-label="Bulldogs Racing home">
        <img src={whiteLogo} alt="BDR" />
      </a>
      <a href="/team">Team</a>
      <a href="/history">History</a>
      <a href="/sponsors">Sponsorship</a>
      <a href="/about">About</a>
    </nav>
  )
}
