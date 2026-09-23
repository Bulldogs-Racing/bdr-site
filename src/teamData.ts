import gusty from './assets/team/gusty-jothaprasert.jpg'
import karen from './assets/team/karen-mei.jpg'
import ezra from './assets/team/ezra-zbar.png'
import ella from './assets/team/ella-renton.jpg'
import michael from './assets/team/michael-mcclammy.jpg'
import thais from './assets/team/thais-burgess.jpg'
import jenny from './assets/team/jenny-trang.jpg'
import robert from './assets/team/robert-bobowski.jpg'
import swarna from './assets/team/swarna-navaratnam-tomayko.jpg'
import cara from './assets/team/cara-wang.jpg'
import himani from './assets/team/himani-kumar.jpg'
import eric from './assets/team/eric-zou.jpg'
import ivan from './assets/team/ivan-sun.jpg'
import nora from './assets/team/nora-ransibrahmanakul.jpg'
import pradyun from './assets/team/pradyun-solai.jpg'
import maggie from './assets/team/maggie-lo.jpg'

export interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  email?: string
}

interface TeamSection {
  id: string
  title: string
  members: TeamMember[]
}

// Source: https://bulldogsracing.com/leadership-team (September 22, 2026).
// Add/remove member objects below; display order follows array order.
export const leadershipYear = '2026–2027'
export const teamSections: TeamSection[] = [
  {
    id: 'board',
    title: 'Board',
    members: [
      { id: 'gusty-jothaprasert', name: 'Gusty Jothaprasert', role: 'Chief Engineer', image: gusty, email: 'gusty.jothaprasert@yale.edu' },
      { id: 'karen-mei', name: 'Karen Mei', role: 'Team Principal', image: karen, email: 'karen.mei@yale.edu' },
      { id: 'ezra-zbar', name: 'Ezra Zbar', role: 'Project Manager', image: ezra },
      { id: 'ella-renton', name: 'Ella Renton', role: 'Business Manager', image: ella },
    ],
  },
  {
    id: 'subteam-leads',
    title: 'Subteam Leads',
    members: [
      { id: 'michael-mcclammy', name: 'Michael McClammy', role: 'Vehicle Dynamics (Unsprung) Lead', image: michael, email: 'michael.mcclammy@yale.edu' },
      { id: 'thais-burgess', name: 'Thais Burgess', role: 'Aerodynamics Lead', image: thais, email: 'thais.burgess@yale.edu' },
      { id: 'jenny-trang', name: 'Jenny Trang', role: 'Aerodynamics Lead', image: jenny, email: 'jenny.trang@yale.edu' },
      { id: 'robert-bobowski', name: 'Robert Bobowski', role: 'Mechanical Accumulator Lead', image: robert, email: 'robert.bobowski@yale.edu' },
      { id: 'swarna-navaratnam-tomayko', name: 'Swarna Navaratnam-Tomayko', role: 'Powertrain Lead', image: swarna },
      { id: 'cara-wang', name: 'Cara Wang', role: 'Vehicle Dynamics (Sprung) Lead', image: cara },
      { id: 'himani-kumar', name: 'Himani Kumar', role: 'High Voltage Lead', image: himani },
      { id: 'eric-zou', name: 'Eric Zou', role: 'Software Lead', image: eric },
      { id: 'ivan-sun', name: 'Ivan Sun', role: 'Media Lead', image: ivan },
    ],
  },
  {
    id: 'advisors',
    title: 'Advisors',
    members: [
      { id: 'nora-ransibrahmanakul', name: 'Nora Ransibrahmanakul', role: 'Senior Advisor', image: nora, email: 'nora.ransibrahmanakul@yale.edu' },
      { id: 'pradyun-solai', name: 'Pradyun Solai', role: 'Senior Advisor', image: pradyun, email: 'pradyun.solai@yale.edu' },
      { id: 'maggie-lo', name: 'Maggie Lo', role: 'Senior Advisor', image: maggie, email: 'maggie.lo@yale.edu' },
    ],
  },
]
