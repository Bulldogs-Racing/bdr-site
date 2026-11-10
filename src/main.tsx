import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import HistoryPage from './HistoryPage'
import TeamPage from './TeamPage'
import SponsorshipPage from './SponsorshipPage'
import NewsletterPage from './NewsletterPage'
import AboutPage from './AboutPage'

const historyPaths = ['/history', '/team-history', '/the-team/previous-cars']
const isHistoryPage = historyPaths.includes(window.location.pathname.replace(/\/$/, ''))
const isTeamPage = ['/team', '/leadership-team'].includes(window.location.pathname.replace(/\/$/, ''))
const isSponsorshipPage = ['/sponsors', '/sponsorship', '/sponsorships'].includes(window.location.pathname.replace(/\/$/, ''))
const isNewsletterPage = ['/newsletter'].includes(window.location.pathname.replace(/\/$/, ''))
const isAboutPage = ['/about', '/contact-us'].includes(window.location.pathname.replace(/\/$/, ''))
if (isHistoryPage) document.title = 'Our History | Bulldogs Racing'
if (isTeamPage) document.title = 'Our Team | Bulldogs Racing'
if (isSponsorshipPage) document.title = 'Sponsorships | Bulldogs Racing'
if (isNewsletterPage) document.title = 'Newsletter | Bulldogs Racing'
if (isAboutPage) document.title = 'About & Contact | Bulldogs Racing'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAboutPage ? <AboutPage /> : isNewsletterPage ? <NewsletterPage /> : isSponsorshipPage ? <SponsorshipPage /> : isTeamPage ? <TeamPage /> : isHistoryPage ? <HistoryPage /> : <App />}
  </StrictMode>,
)
