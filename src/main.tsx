import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import HistoryPage from './HistoryPage'

const historyPaths = ['/history', '/team-history', '/the-team/previous-cars']
const isHistoryPage = historyPaths.includes(window.location.pathname.replace(/\/$/, ''))
if (isHistoryPage) document.title = 'Our History | Bulldogs Racing'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isHistoryPage ? <HistoryPage /> : <App />}
  </StrictMode>,
)
