import { useEffect } from 'react'
import Navbar from './Navbar'
import historyPhoto from './assets/history/team-history.jpg'
import { historyChapters, previousCars } from './historyData'
import './App.css'
import './HistoryPage.css'

export default function HistoryPage() {
  useEffect(() => {
    if (window.location.pathname.replace(/\/$/, '') === '/the-team/previous-cars') {
      document.getElementById('previous-cars')?.scrollIntoView()
    }
  }, [])

  return (
    <div className="history-page">
      <header className="history-page__nav"><Navbar /></header>
      <main>
        <div className="history-page__story">
          <header className="history-page__title-card">
            <img src={historyPhoto} alt="Bulldogs Racing members working on electronics at a workshop bench" fetchPriority="high" />
            <div className="history-page__title-copy">
              <p className="history-page__eyebrow">Bulldogs Racing / Since 2006</p>
              <h1>Team<br />History.</h1>
              <p>From a senior design seminar to an all-electric future.</p>
              <a href="#previous-cars">Explore our cars <span aria-hidden="true">↘</span></a>
            </div>
          </header>
          <div className="history-page__chapters">
            {historyChapters.map((chapter) => (
              <section className="history-chapter" key={chapter.years}>
                <p className="history-page__eyebrow">{chapter.years}</p>
                <h2>{chapter.title}</h2>
                <p>{chapter.text}</p>
              </section>
            ))}
            <a className="history-page__archive-link" href="#previous-cars">See our previous cars <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <section className="car-archive" id="previous-cars" aria-labelledby="car-archive-title">
          <header className="car-archive__header">
            <div>
              <p className="history-page__eyebrow">The Bulldogs Racing archive</p>
              <h2 id="car-archive-title">Previous cars.</h2>
            </div>
            <p>Scroll to explore <span aria-hidden="true">→</span></p>
          </header>
          <div className="car-archive__window" role="region" aria-label="Previous cars, scroll horizontally" tabIndex={0}>
            <div className="car-archive__track">
              {previousCars.map((car) => (
                <article className="car-archive__card" key={car.year} tabIndex={0} aria-labelledby={`car-${car.year}`}>
                  <img src={car.image} alt={car.alt} loading="lazy" />
                  <div className="car-archive__copy">
                    <h3 id={`car-${car.year}`}><time dateTime={car.year}>{car.year}</time></h3>
                    {car.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="history-page__footer">
        <p>The next chapter is built together.</p>
        <a href="/team">Meet the team ↗</a>
        <a href="/about">Get in touch ↗</a>
      </footer>
    </div>
  )
}
