import { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import car from './assets/car no background.png'
import sponsorsPromo from './assets/sponsors.jpg'
import history2007 from './assets/history/2007.jpg'
import history2008 from './assets/history/2008-edited.jpg'
import history2010 from './assets/history/2010-edited.jpg'
import history2013 from './assets/history/2013.jpg'
import history2014 from './assets/history/2014-768x619.jpg'
import history2016 from './assets/history/2016.jpg'
import history2020 from './assets/history/2020.jpg'
import websiteVideo from './assets/WebsiteVideo.mp4'
import whiteLogo from './assets/white logo no background.png'
import './App.css'

const introSeenKey = 'bdr-intro-seen'
const historySlides = [
  {
    year: '2007',
    image: history2007,
    alt: 'Team members working on an early race car in the workshop',
    points: ['Early workshop build', 'Chassis development', 'Hands-on collaboration'],
  },
  {
    year: '2008',
    image: history2008,
    alt: 'An early BDR race car on track',
    points: ['On-track testing', 'Car 03 in motion', 'Learning at speed'],
  },
  {
    year: '2010',
    image: history2010,
    alt: 'A BDR race car parked beside orange cones',
    points: ['Competition-ready setup', 'Trackside checks', 'Precision through practice'],
  },
  {
    year: '2013',
    image: history2013,
    alt: 'Team members with a Yale race car at the track',
    points: ['A growing team', 'Yale on the track', 'Built together'],
  },
  {
    year: '2014',
    image: history2014,
    alt: 'Team members guiding a Yale race car through the paddock',
    points: ['Paddock preparation', 'Driver and team', 'Ready for the next run'],
  },
  {
    year: '2016',
    image: history2016,
    alt: 'A Yale race car displayed outdoors',
    points: ['Engineering on display', 'Evolving bodywork', 'A campus landmark'],
  },
  {
    year: '2020',
    image: history2020,
    alt: 'Team members preparing a Yale race car',
    points: ['Pre-run preparation', 'Team at work', 'Momentum continues'],
  },
]

function App() {
  const [introComplete, setIntroComplete] = useState(() => {
    try {
      return localStorage.getItem(introSeenKey) === 'true'
    } catch {
      return false
    }
  })
  const [introVisible, setIntroVisible] = useState(!introComplete)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!introVisible) return

    const timer = window.setTimeout(() => setIntroComplete(true), 1600)
    const exitTimer = window.setTimeout(() => {
      setIntroVisible(false)
      try {
        localStorage.setItem(introSeenKey, 'true')
      } catch {
        // The splash still completes when browser storage is unavailable.
      }
    }, 2000)

    return () => {
      window.clearTimeout(timer)
      window.clearTimeout(exitTimer)
    }
  }, [introVisible])

  useEffect(() => {
    document.documentElement.classList.toggle('intro-active', introVisible)

    return () => document.documentElement.classList.remove('intro-active')
  }, [introVisible])

  useEffect(() => {
    if (introComplete) {
      void videoRef.current?.play()
    }
  }, [introComplete])

  return (
    <main className="home">
      <section className="home__hero">
        <Navbar />
        <video
          ref={videoRef}
          className="home__video"
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={websiteVideo} type="video/mp4" />
        </video>
        <div className="home__hero-copy">
          <h1>Bulldogs Racing <span className="home__established">est. 2006</span></h1>
          <p>Formula SAE @ <span className="home__yale">Yale University</span></p>
        </div>
      </section>
      <section className="car-showcase" aria-labelledby="car-title">
        <header className="car-showcase__header">
          <div>
            <p className="car-showcase__eyebrow">Student built. Track proven.</p>
            <h2 id="car-title">BR25<span>.</span></h2>
          </div>
          <p className="car-showcase__description">
            Our latest all-electric Formula SAE car,<br className="car-showcase__break" /> designed and built by Yale students.
          </p>
        </header>
        <div className="car-showcase__stage">
          <span className="car-showcase__wordmark" aria-hidden="true">BULLDOGS</span>
          <img className="car-showcase__car" src={car}
            alt="BR25, Yale’s blue and white all-electric Formula SAE race car"
            loading="lazy" width="2000" height="1125" />
        </div>
        <div className="car-showcase__results">
          <div className="car-showcase__venue">
            <p className="car-showcase__eyebrow">Competition results</p>
            <p>New Hampshire</p>
          </div>
          <div className="car-showcase__stat">
            <p className="car-showcase__number">6<span>th</span></p>
            <p>Overall finish<span>Out of 21 teams</span></p>
          </div>
          <div className="car-showcase__stat">
            <p className="car-showcase__number">1<span>of 4</span></p>
            <p>Completed every event<span>One of just four cars</span></p>
          </div>
        </div>
      </section>
      <section id="history" className="history" aria-labelledby="history-title">
        <header className="history__header">
          <p className="history__eyebrow">The story so far</p>
          <h2 id="history-title">History</h2>
        </header>
        <div className="history-carousel">
          <div className="history-carousel__viewport" role="region"
            aria-label="Team history photos, scroll horizontally" tabIndex={0}>
            <div className="history-carousel__track">
              {historySlides.map((slide) => (
                <article className="history-carousel__slide" key={slide.year} tabIndex={0}>
                  <img src={slide.image} alt={slide.alt} loading="lazy" />
                  <div className="history-carousel__details">
                    <p>{slide.year}</p>
                    <ul>
                      {slide.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <p className="history-carousel__hint">Scroll to explore <span aria-hidden="true">→</span></p>
        </div>
      </section>
      <section id="sponsorship" className="sponsor-callout" aria-labelledby="sponsor-title">
        <img className="sponsor-callout__image" src={sponsorsPromo}
          alt="Bulldogs Racing vehicle on display with the team gathered behind it"
          loading="lazy" width="2000" height="1333" />
        <div className="sponsor-callout__content">
          <p className="sponsor-callout__eyebrow">Build the next generation</p>
          <h2 id="sponsor-title">Support Us!</h2>
          <p>
            We’re Bulldogs Racing, Yale’s student team designing, building, and
            racing cars. Your support turns hands-on engineering into the next
            generation of leaders.
          </p>
          <p>
            From funding to parts and services, every gift makes a difference.
            Partner with us to put your brand on our car, website, and newsletter,
            and connect with Yale’s engineering and business talent.
          </p>
          <div className="sponsor-callout__actions">
            <a className="sponsor-callout__button" href="/sponsors">Become a sponsor <span aria-hidden="true">↗</span></a>
            <a className="sponsor-callout__button sponsor-callout__button--secondary" href="/newsletter">Read our newsletter <span aria-hidden="true">↗</span></a>
          </div>
          <p className="sponsor-callout__contact">
            All donations are tax-deductible. Let’s talk:<br />
            <a href="mailto:bulldogsracing@yale.edu">bulldogsracing@yale.edu</a>
          </p>
        </div>
      </section>
      {introVisible && <div
        className={`intro-splash${introComplete ? ' intro-splash--leaving' : ''}`}
        aria-hidden="true"
      >
        <div className="intro-splash__water"></div>
        <div className="intro-splash__ripple intro-splash__ripple--one"></div>
        <div className="intro-splash__ripple intro-splash__ripple--two"></div>
        <img className="intro-splash__logo" src={whiteLogo} alt="" />
      </div>}
    </main>
  )
}

export default App
