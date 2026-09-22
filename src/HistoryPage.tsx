import Navbar from './Navbar'
import './App.css'
import './HistoryPage.css'

const milestones = [
  { year: '2006', title: 'An idea takes shape.', text: 'Yale College seniors begin designing and building a race car in a mechanical engineering design seminar, preparing for the inaugural Formula SAE Hybrid competition.' },
  { year: '2007', title: 'Our first starting line.', text: 'Developed under Professor John Morrell, Yale’s first Formula SAE entry takes third overall and wins the electric-only acceleration event at the inaugural Formula SAE Hybrid competition.' },
  { year: '2008', title: 'Bulldogs Racing is born.', text: 'The project becomes a Yale Undergraduate Organization. The next car brings invaluable engineering experience—and a cockpit designed to accommodate every member of the team.' },
  { year: '2010', title: 'Engineering earns recognition.', text: 'BR10 builds on two competition cycles of hybrid development. The team earns second place in GM’s Best Engineered Hybrid Systems Award and reaches the design competition finals.' },
  { year: '2013', title: 'International champions.', text: 'After three years of development, BR13 wins Formula SAE Hybrid with the fastest times in every dynamic event. The team takes first in the Ford Most Efficient Hybrid and Chrysler Innovation awards, and second in GM’s engineering award.', detail: '75 m acceleration: 5.283 seconds. Autocross: 49.417 seconds.' },
  { year: '2014', title: 'A new direction.', text: 'BR14 finishes fourth at Formula SAE Hybrid despite clutch difficulties. The team turns its attention to electric drivetrains, setting a new course for the next generation of cars.' },
  { year: '2016', title: 'Yale’s first all-electric car.', text: 'Inspired by vintage race cars, BR16 pairs a 180-volt battery box with two Emrax 207 motors. A battery fire immediately before competition prevents it from racing and prompts a comprehensive redesign with additional safety features.' },
  { year: '2020', title: 'Rebuilt. Refined. Ready for more.', text: 'BR20 builds on BR16’s chassis with redesigned battery, steering, dashboard, electrical, and sensor systems. Development continues through the COVID-19 pandemic, prioritizing durability, safety, and performance.', detail: 'Two Emrax 207 motors. A 192 V, 3.6 kWh battery pack.' },
  { year: '2023', season: 'Spring', title: 'Back on track.', text: 'BR20 competes at Formula Hybrid + Electric at New Hampshire Motor Speedway. In the team’s first competition in years, Bulldogs Racing ties for eighth in a field of 17.' },
  { year: '2026', season: 'Looking ahead', title: 'The next chapter: BR25.', text: 'Building on the lessons of BR20, the team’s published plan calls for a new all-electric car, BR25, with the aim of returning to New Hampshire in spring 2026.' },
]

export default function HistoryPage() {
  return (
    <div className="history-page">
      <header className="history-page__nav">
        <a className="history-page__home" href="/" aria-label="Bulldogs Racing home">BR<span> / EST. 2006</span></a>
        <Navbar />
      </header>
      <main>
        <header className="history-page__intro">
          <p className="history-page__eyebrow">Bulldogs Racing / Our history</p>
          <h1>Years in the making.</h1>
          <p>From a senior design seminar to an all-electric future. Follow the people, cars, and breakthroughs that shaped Bulldogs Racing.</p>
        </header>
        <ol className="history-timeline" aria-label="Team milestones">
          {milestones.map((event) => (
            <li className="history-timeline__event" key={event.year}>
              <div className="history-timeline__date">
                <time dateTime={event.year}>{event.year}</time>
                {event.season && <span>{event.season}</span>}
              </div>
              <div className="history-timeline__line" aria-hidden="true">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M50 0 C50 22 78 24 78 50 S50 78 50 100" vectorEffect="non-scaling-stroke" />
                </svg>
                <span />
              </div>
              <article className="history-timeline__copy">
                <h2>{event.title}</h2>
                <p>{event.text}</p>
                {event.detail && <p className="history-timeline__detail">{event.detail}</p>}
              </article>
            </li>
          ))}
        </ol>
        <footer className="history-page__footer">
          <p>From the Bulldogs Racing archive</p>
          <a href="https://bulldogsracing.com/team-history">Team history ↗</a>
          <a href="https://bulldogsracing.com/the-team/previous-cars">Previous cars ↗</a>
          <a href="/">Back to home →</a>
        </footer>
      </main>
    </div>
  )
}
