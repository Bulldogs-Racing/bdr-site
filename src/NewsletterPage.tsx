import Navbar from './Navbar'
import newsletterIssues from './newsletterIssues.json'
import './App.css'
import './NewsletterPage.css'

const signupUrl = 'https://bulldogsracing.us13.list-manage.com/subscribe/post?u=f8635335d40768a5eea1d3406&id=a1ffae1b07&f_id=00f82aeaf0'
const archiveUrl = 'https://us13.campaign-archive.com/home/?u=f8635335d40768a5eea1d3406&id=a1ffae1b07'
const issueDate = new Intl.DateTimeFormat('en-US', {
  month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
})

export default function NewsletterPage() {
  return (
    <main className="newsletter-page">
      <header className="newsletter-page__hero">
        <Navbar />
        <div className="newsletter-page__hero-copy">
          <p className="newsletter-page__eyebrow">Bulldogs Racing / Newsletter</p>
          <h1>Follow the build.<br />Share the drive.</h1>
          <p>From the workshop to the track, stay connected with Bulldogs Racing.</p>
          <a href="#newsletter-archive">Read past issues <span aria-hidden="true">↓</span></a>
        </div>
      </header>

      <section className="newsletter-page__signup" aria-labelledby="newsletter-signup-title">
        <div>
          <p className="newsletter-page__eyebrow">From our team to your inbox</p>
          <h2 id="newsletter-signup-title">Stay in the loop.</h2>
          <p className="newsletter-page__description">
            Get the latest on our car, our team, and the season ahead.
            Join our community of students, alumni, sponsors, and friends.
          </p>
        </div>
        <form className="newsletter-page__form" action={signupUrl} method="post"
          target="_blank" rel="noopener noreferrer" aria-labelledby="newsletter-signup-title">
          <label htmlFor="newsletter-email">Email address <span>(required)</span></label>
          <div className="newsletter-page__form-row">
            <input type="email" name="EMAIL" id="newsletter-email" autoComplete="email"
              placeholder="you@example.com" required aria-describedby="newsletter-signup-note" />
            <button type="submit" name="subscribe" value="Subscribe">
              Subscribe <span aria-hidden="true">↗</span>
            </button>
          </div>
          {/* Preserve the generated Mailchimp honeypot field to discourage automated signups. */}
          <div className="newsletter-page__honeypot" aria-hidden="true">
            <input type="text" name="b_f8635335d40768a5eea1d3406_a1ffae1b07"
              tabIndex={-1} defaultValue="" autoComplete="off" />
          </div>
          <p id="newsletter-signup-note" className="newsletter-page__note">
            Subscribe to receive Bulldogs Racing emails. Unsubscribe at any time.
            Mailchimp will open in a new tab to complete your signup.
          </p>
        </form>
      </section>

      <section id="newsletter-archive" className="newsletter-page__archive"
        aria-labelledby="newsletter-archive-title">
        <header className="newsletter-page__archive-header">
          <div>
            <p className="newsletter-page__eyebrow">The story so far</p>
            <h2 id="newsletter-archive-title">Past issues.</h2>
            <p className="newsletter-page__description">Catch up on recent updates from the team.</p>
          </div>
          <a href={archiveUrl} target="_blank" rel="noopener noreferrer">
            Open archive in a new tab <span aria-hidden="true">↗</span>
          </a>
        </header>
        <ul className="newsletter-page__issues">
          {newsletterIssues.map((issue) => (
            <li key={issue.url}>
              <a href={issue.url} target="_blank" rel="noopener noreferrer">
                <time dateTime={issue.date}>{issueDate.format(new Date(issue.date))}</time>
                <span className="newsletter-page__issue-title">{issue.title}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="newsletter-page__note">
          Issues open in a new tab. <a href={archiveUrl} target="_blank" rel="noopener noreferrer">
            View the latest archive on Mailchimp <span aria-hidden="true">↗</span>
          </a>
        </p>
      </section>

      <footer className="newsletter-page__footer">
        <p>Be part of what’s next.</p>
        <a href="/team">Meet the team <span aria-hidden="true">↗</span></a>
        <a href="/sponsors">Support Bulldogs Racing <span aria-hidden="true">↗</span></a>
        <a href="mailto:bulldogsracing@yale.edu">Get in touch <span aria-hidden="true">↗</span></a>
      </footer>
    </main>
  )
}
