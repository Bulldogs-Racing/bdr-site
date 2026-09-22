import { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import background from './assets/background.png'
import car from './assets/car.png'
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

const statTargets = [96, 88, 74]
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
  const [introComplete, setIntroComplete] = useState(false)
  const carRef = useRef<SVGGElement>(null)
  const trackFrameRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [numbersStarted, setNumbersStarted] = useState(false)
  const [statValues, setStatValues] = useState([0, 0, 0])
  const [activeHistorySlide, setActiveHistorySlide] = useState(0)
  const sceneRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroComplete(true), 1600)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('intro-active', !introComplete)

    return () => document.documentElement.classList.remove('intro-active')
  }, [introComplete])

  useEffect(() => {
    if (introComplete) {
      void videoRef.current?.play()
    }
  }, [introComplete])

  useEffect(() => {
    let frameId = 0
    let progress = 0
    let previousTime = 0
    let autoplayStart: number | null = null
    let entered = false
    const narrow = window.matchMedia('(max-width: 767px)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updateCarPosition = (now: number) => {
      frameId = 0
      const scene = sceneRef.current
      const frame = trackFrameRef.current
      if (!scene || !frame || !carRef.current) return

      const elapsed = previousTime ? Math.min(now - previousTime, 64) : 16
      previousTime = now
      let target = Math.min(Math.max(
        -scene.getBoundingClientRect().top / Math.max(scene.offsetHeight - frame.offsetHeight, 1),
        0,
      ), 1)

      if (narrow.matches) {
        if (entered && autoplayStart === null) autoplayStart = now
        const time = autoplayStart === null ? 0 : Math.min((now - autoplayStart) / 1700, 1)
        target = time * time * (3 - 2 * time)
      }

      progress = reducedMotion.matches ? 1 : narrow.matches
        ? target
        : progress + (target - progress) * (1 - Math.exp(-elapsed / 100))
      if (Math.abs(target - progress) < 0.0001) progress = target
      const inverse = 1 - progress
      // Tire contact point follows a cubic spline in the background's 1536 × 1024 space.
      const x = inverse ** 3 * 1850 + 3 * inverse ** 2 * progress * 1450 +
        3 * inverse * progress ** 2 * 1050 + progress ** 3 * 768
      const y = inverse ** 3 * 880 + 3 * inverse ** 2 * progress * 850 +
        3 * inverse * progress ** 2 * 700 + progress ** 3 * 700
      carRef.current.setAttribute('transform', `translate(${x} ${y})`)

      if (!reducedMotion.matches && (progress !== target ||
        (narrow.matches && entered && target < 1))) {
        frameId = window.requestAnimationFrame(updateCarPosition)
      }
    }

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateCarPosition)
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entered = true
        requestUpdate()
        observer.disconnect()
      }
    }, { threshold: 0.65 })
    if (trackFrameRef.current) observer.observe(trackFrameRef.current)
    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    reducedMotion.addEventListener('change', requestUpdate)

    return () => {
      window.cancelAnimationFrame(frameId)
      observer.disconnect()
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      reducedMotion.removeEventListener('change', requestUpdate)
    }
  }, [])

  useEffect(() => {
    const stats = statsRef.current
    if (!stats) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNumbersStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(stats)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!numbersStarted) return

    let frameId = 0
    const startedAt = performance.now()
    const duration = 550

    const countUp = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      const easedProgress = 1 - (1 - progress) ** 4

      setStatValues(statTargets.map((target) => Math.round(target * easedProgress)))

      if (progress < 1) frameId = window.requestAnimationFrame(countUp)
    }

    frameId = window.requestAnimationFrame(countUp)

    return () => window.cancelAnimationFrame(frameId)
  }, [numbersStarted])

  const moveHistorySlide = (direction: -1 | 1) => {
    setActiveHistorySlide((current) =>
      (current + direction + historySlides.length) % historySlides.length,
    )
  }

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
          <h1>Bulldogs Racing</h1>
          <p>Formula SAE @ Yale University, est. 2006</p>
        </div>
      </section>
      <section
        ref={sceneRef}
        className={`track-scene${numbersStarted ? ' track-scene--active' : ''}`}
      >
        <div ref={trackFrameRef} className="track-scene__frame">
          <svg className="track-scene__artwork" viewBox="0 0 1536 1024"
            preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <image href={background} className="track-scene_car" width="1536" height="1024" />
            <g ref={carRef} transform="translate(1850 880)">
              <image href={car} x="-220" y="-240" width="440" height="250" />
            </g>
          </svg>
          <div ref={statsRef} className="track-stats" aria-label="bdr by the numbers">
            <p className="track-stats__eyebrow">bdr by the numbers</p>
            <div className="track-stats__bar">
              {statValues.map((value, index) => (
                <span key={statTargets[index]}>{value}%</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="history" className="history" aria-labelledby="history-title">
        <header className="history__header">
          <p className="history__eyebrow">The story so far</p>
          <h2 id="history-title">History</h2>
        </header>
        <div className="history-carousel">
          <div className="history-carousel__viewport">
            <div
              className="history-carousel__track"
              style={{ transform: `translateX(-${activeHistorySlide * 100}%)` }}
            >
              {historySlides.map((slide) => (
                <article className="history-carousel__slide" key={slide.year} tabIndex={0}>
                  <img src={slide.image} alt={slide.alt} />
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
          <div className="history-carousel__controls">
            <button type="button" onClick={() => moveHistorySlide(-1)} aria-label="Previous history image">
              Previous
            </button>
            <p aria-live="polite">
              {activeHistorySlide + 1} / {historySlides.length}
            </p>
            <button type="button" onClick={() => moveHistorySlide(1)} aria-label="Next history image">
              Next
            </button>
          </div>
        </div>
      </section>
      <section id="sponsorship" className="sponsor-callout" aria-labelledby="sponsor-title">
        <img className="sponsor-callout__image" src={sponsorsPromo}
          alt="Bulldogs Racing vehicle on display with the team gathered behind it"
          loading="lazy" width="2000" height="1333" />
        <div className="sponsor-callout__content">
          <p className="sponsor-callout__eyebrow">Build the next generation</p>
          <h2 id="sponsor-title">Help drive us forward.</h2>
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
      <div
        className={`intro-splash${introComplete ? ' intro-splash--leaving' : ''}`}
        aria-hidden="true"
      >
        <div className="intro-splash__water"></div>
        <div className="intro-splash__ripple intro-splash__ripple--one"></div>
        <div className="intro-splash__ripple intro-splash__ripple--two"></div>
        <img className="intro-splash__logo" src={whiteLogo} alt="" />
      </div>
    </main>
  )
}

export default App
