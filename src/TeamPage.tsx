import Navbar from './Navbar'
import groupPhoto from './assets/BDRTeam-2600x1733.jpg'
import { leadershipYear, teamSections } from './teamData'
import './App.css'
import './TeamPage.css'

export default function TeamPage() {
  return (
    <main className="team-page">
      <header className="team-page__hero">
        <Navbar />
        <img className="team-page__group" src={groupPhoto}
          alt="The Bulldogs Racing team gathered around their race car at Yale"
          fetchPriority="high" />
        <div className="team-page__hero-copy">
          <p className="team-page__eyebrow">Bulldogs Racing / Yale University</p>
          <h1>Our team.</h1>
        </div>
      </header>

      <div className="team-page__intro">
        <div>
          <p className="team-page__eyebrow">{leadershipYear} Leadership</p>
          <h2>The people behind the car.</h2>
        </div>
        <p>
          The Bulldogs Racing team recruits from across all of Yale’s academic
          disciplines and programs. Team members gain real-world experience in
          engineering and business by replicating a professional racing team.
          After graduation, they go on to become leaders in their respective fields.
        </p>
      </div>

      <nav className="team-page__sections" aria-label="Team sections">
        {teamSections.map((section) => (
          <a key={section.id} href={`#${section.id}`}>{section.title} <span aria-hidden="true">↘</span></a>
        ))}
      </nav>

      <div className="team-page__directory">
        {teamSections.map((section, index) => (
          <section className="team-section" id={section.id} key={section.id}
            aria-labelledby={`${section.id}-title`}>
            <header className="team-section__header">
              <span aria-hidden="true">0{index + 1}</span>
              <h2 id={`${section.id}-title`}>{section.title}</h2>
            </header>
            <ul className="team-section__grid">
              {section.members.map((member) => (
                <li className="team-member" key={member.id}>
                  <img src={member.image} alt={member.name} loading="lazy" decoding="async" />
                  <div className="team-member__copy">
                    <p className="team-member__role">{member.role}</p>
                    <h3>{member.name}</h3>
                    {member.email && (
                      <a href={`mailto:${member.email}`} aria-label={`Email ${member.name}`}>
                        Email <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <footer className="team-page__footer">
        <p>Built together. Bulldogs Racing.</p>
        <a href="mailto:bulldogsracing@yale.edu">bulldogsracing@yale.edu <span aria-hidden="true">↗</span></a>
        <a href="/">Back to home <span aria-hidden="true">↗</span></a>
      </footer>
    </main>
  )
}
