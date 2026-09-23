import Navbar from './Navbar'
import aboutPhoto from './assets/about.jpg'
import './App.css'
import './AboutPage.css'

const calendarUrl = 'https://embed.styledcalendar.com/#ie0ednTvTt0wkOtDf92d'
const newsletterUrl = 'https://bulldogsracing.us13.list-manage.com/subscribe?u=f8635335d40768a5eea1d3406&id=a1ffae1b07'

export default function AboutPage() {
  return (
    <main className="about-page">
      <img className="about-page__image" src={aboutPhoto}
        alt="Bulldogs Racing electric race car on display at Yale" fetchPriority="high" />
      <Navbar />
      <div className="about-page__content">
        <p className="about-page__eyebrow">Bulldogs Racing / Yale University</p>
        <h1>Built at Yale.<br />Driven together.</h1>
        <p className="about-page__intro">
          We’re Yale’s Formula SAE team. We design and build fully electric,
          open-wheel, formula-style race cars.
        </p>
        <ul className="about-page__invitations">
          <li><strong>Students:</strong> Interested in joining? We’d love to see you at our next Garage Hours.</li>
          <li><strong>Educational groups:</strong> Come see what we’re building. We’d be happy to arrange a visit.</li>
          <li><strong><a href="/sponsors">Sponsors:</a></strong> We’d love to get in touch and discuss opportunities for partnerships.</li>
        </ul>
        <a className="about-page__email" href="mailto:bulldogsracing@yale.edu">
          bulldogsracing@yale.edu <span aria-hidden="true">↗</span>
        </a>
        <div className="about-page__actions">
          <a className="about-page__signup" href={newsletterUrl}>
            Sign up for our newsletter <span aria-hidden="true">↗</span>
          </a>
          <details className="about-page__calendar">
            <summary>Garage Hours &amp; calendar</summary>
            <div className="about-page__calendar-content">
              <p>Upcoming events, live from our team calendar. <a href={calendarUrl} target="_blank" rel="noopener noreferrer">Open calendar in a new tab ↗</a></p>
              <iframe src={calendarUrl} title="Bulldogs Racing live events calendar"
                loading="lazy" />
            </div>
          </details>
        </div>
      </div>
    </main>
  )
}
