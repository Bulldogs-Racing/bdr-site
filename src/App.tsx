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
  const carRef = useRef<SVGGElement>(null)
  const trackFrameRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLElement>(null)
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

  useEffect(() => {
    let frameId = 0
    let progress = 0
    let previousTime = 0
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updateCarPosition = (now: number) => {
      frameId = 0
      const scene = sceneRef.current
      const frame = trackFrameRef.current
      if (!scene || !frame || !carRef.current) return

      const elapsed = previousTime ? Math.min(now - previousTime, 64) : 16
      previousTime = now
      const animationDistance = scene.offsetHeight - frame.offsetHeight
      const target = Math.min(Math.max(
        -scene.getBoundingClientRect().top / Math.max(animationDistance, 1),
        0,
      ), 1)

      progress = reducedMotion.matches ? target
        : progress + (target - progress) * (1 - Math.exp(-elapsed / 100))
      if (Math.abs(target - progress) < 0.0001) progress = target
      // Let the car settle before fading in a stationary caption above it.
      const carProgress = reducedMotion.matches ? 1 : Math.min(progress / 0.55, 1)
      const captionProgress = reducedMotion.matches ? 1 : Math.min(Math.max((progress - 0.62) / 0.16, 0), 1)
      frame.style.setProperty('--caption-opacity', `${captionProgress * captionProgress * (3 - 2 * captionProgress)}`)
      // Account for the SVG's centered crop when positioning above the parked car.
      const scale = Math.max(frame.clientWidth / 1536, frame.clientHeight / 1024)
      const parkedCarTop = (frame.clientHeight - 1024 * scale) / 2 + 460 * scale
      frame.style.setProperty('--parked-car-top', `${parkedCarTop}px`)
      const inverse = 1 - carProgress
      // Tire contact point follows a cubic spline in the background's 1536 × 1024 space.
      const x = inverse ** 3 * 1850 + 3 * inverse ** 2 * carProgress * 1450 +
        3 * inverse * carProgress ** 2 * 1050 + carProgress ** 3 * 768
      const y = inverse ** 3 * 880 + 3 * inverse ** 2 * carProgress * 850 +
        3 * inverse * carProgress ** 2 * 700 + carProgress ** 3 * 700
      carRef.current.setAttribute('transform', `translate(${x} ${y})`)

      if (!reducedMotion.matches && progress !== target) {
        frameId = window.requestAnimationFrame(updateCarPosition)
      }
    }

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateCarPosition)
    }

    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    reducedMotion.addEventListener('change', requestUpdate)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      reducedMotion.removeEventListener('change', requestUpdate)
    }
  }, [])

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
      <section
        ref={sceneRef}
        className="track-scene"
      >
        <div ref={trackFrameRef} className="track-scene__frame">
          <svg className="track-scene__artwork" viewBox="0 0 1536 1024"
            preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <image href={background} className="track-scene_car" width="1536" height="1024" />
          </svg>
          <div className="track-scene__caption">
            <h2 className="track-scene__model">BR25</h2>
            <p className="track-scene__description">Our latest all-electric Formula SAE car.</p>
            <p className="track-scene__result"><strong>6th overall</strong> · out of 21</p>
            <p className="track-scene__result">One of just 4 cars to complete every event.</p>
          </div>
          <svg className="track-scene__artwork track-scene__car-layer" viewBox="0 0 1536 1024"
            preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <g ref={carRef} transform="translate(1850 880)">
              <image href={car} x="-220" y="-240" width="440" height="250" />
            </g>
          </svg>
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
