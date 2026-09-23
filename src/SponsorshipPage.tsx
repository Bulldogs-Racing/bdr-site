import Navbar from './Navbar'
import sponsorPhoto from './assets/sponsors.jpg'
import {
  currentSponsors, individualSupporters, previousSponsors,
  sponsorSeason, sponsorshipPacket,
} from './sponsorData'
import './App.css'
import './SponsorshipPage.css'

export default function SponsorshipPage() {
  return (
    <main className="sponsorship-page">
      <header className="sponsorship-page__hero">
        <Navbar />
        <div className="sponsorship-page__hero-copy">
          <p className="sponsorship-page__eyebrow">Bulldogs Racing / Our partners</p>
          <h1>Help drive<br />us forward.</h1>
          <p>Support the next generation of engineering leaders by becoming a sponsor.</p>
          <div className="sponsorship-page__actions">
            <a className="sponsorship-page__button" href="mailto:bulldogsracing@yale.edu">
              Email us at bulldogsracing@yale.edu<span aria-hidden="true">↗</span>
            </a>
            <a className="sponsorship-page__packet" href={sponsorshipPacket.url}>
              {sponsorshipPacket.label} (PDF) <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <img className="sponsorship-page__hero-image" src={sponsorPhoto}
          alt="Bulldogs Racing team gathered behind their race car" fetchPriority="high" />
      </header>

      <section className="sponsorship-page__intro" aria-labelledby="partnership-title">
        <div>
          <p className="sponsorship-page__eyebrow">Every gift makes a difference</p>
          <h2 id="partnership-title">Built by students.<br />Powered by you.</h2>
        </div>
        <div className="sponsorship-page__intro-copy">
          <p>
            The work of Bulldogs Racing is made possible by generous contributions
            from private and corporate donors. From financial support to in-kind
            donations of parts and services, every gift is integral to the success
            of the team. All donations are tax-deductible.
          </p>
          <p>
            Your gifts help train the next generation of engineering leaders.
            Corporate sponsors receive logo placement on our website, newsletter,
            and flagship vehicle, along with direct recruitment access to Yale’s
            engineering and business minds.
          </p>
          <a href="mailto:bulldogsracing@yale.edu">Let’s talk about partnering <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="sponsorship-page__current" aria-labelledby="current-sponsors-title">
        <header className="sponsorship-page__section-header">
          <p className="sponsorship-page__eyebrow">The partners behind {sponsorSeason}</p>
          <h2 id="current-sponsors-title">Our sponsors.</h2>
          <p>Thank you for making every build, every test, and every race possible.</p>
        </header>
        <ul className="sponsor-grid">
          {currentSponsors.map((sponsor) => (
            <li key={sponsor.id}>
              <a className="sponsor-card" href={sponsor.url}>
                <img src={sponsor.logo} alt="" loading="lazy" decoding="async" width="500" height="500" />
                <span>{sponsor.name} <span aria-hidden="true">↗</span></span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="sponsorship-page__supporters" aria-labelledby="supporters-title">
        <header className="sponsorship-page__section-header">
          <p className="sponsorship-page__eyebrow">Our community</p>
          <h2 id="supporters-title">With special thanks.</h2>
          <p>To the individuals and families supporting {sponsorSeason}: thank you for believing in our team.</p>
        </header>
        <ul className="sponsorship-page__names">
          {individualSupporters.map((name) => <li key={name}>{name}</li>)}
        </ul>
      </section>

      <section className="sponsorship-page__previous" aria-labelledby="previous-sponsors-title">
        <header className="sponsorship-page__section-header">
          <p className="sponsorship-page__eyebrow">A lasting impact</p>
          <h2 id="previous-sponsors-title">Previous sponsors.</h2>
          <p>
            We thank all our previous sponsors for their support in seasons prior.
            We would not have been able to undertake our numerous projects without
            their generous donations.
          </p>
        </header>
        <ul className="sponsorship-page__names">
          {previousSponsors.map((name) => <li key={name}>{name}</li>)}
        </ul>
      </section>

      <footer className="sponsorship-page__footer">
        <h2>Be part of what’s next.</h2>
        <p>Interested in sponsoring the team? Get in touch for more information.</p>
        <a href="mailto:bulldogsracing@yale.edu">bulldogsracing@yale.edu <span aria-hidden="true">↗</span></a>
      </footer>
    </main>
  )
}
