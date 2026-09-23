import redBull from './assets/sponsors/red-bull.png'
import tesla from './assets/sponsors/tesla.png'
import yaleEngineering from './assets/sponsors/yale-engineering.png'
import ysea from './assets/sponsors/ysea.png'
import yceds from './assets/sponsors/yceds.png'
import newHavenPowersports from './assets/sponsors/new-haven-powersports.png'
import yaleCity from './assets/sponsors/yale-city.png'
import geneHaas from './assets/sponsors/gene-haas-foundation.png'
import solidworks from './assets/sponsors/solidworks.png'
import southernBloodServices from './assets/sponsors/southern-blood-services.png'
import hoosier from './assets/sponsors/hoosier.png'
import goTime from './assets/sponsors/go-time.png'
import onlineMetals from './assets/sponsors/online-metals.png'
import bild from './assets/sponsors/bild.png'
import rigol from './assets/sponsors/rigol.png'

export interface Sponsor {
  id: string
  name: string
  logo: string
  url: string
}

// Source: https://bulldogsracing.com/sponsorship (September 22, 2026).
// Add/remove/reorder objects here to maintain the current sponsor grid.
export const sponsorSeason = 'BR25'
export const sponsorshipPacket = {
  label: '2026–2027 Sponsorship Packet',
  url: 'https://bulldogsracing.com/wp-content/uploads/2026/09/Bulldogs-Racing-Sponsorship-Packet-2026-2027.pdf',
}

export const currentSponsors: Sponsor[] = [
  { id: 'red-bull', name: 'Red Bull', logo: redBull, url: 'https://www.redbull.com/us-en' },
  { id: 'tesla', name: 'Tesla', logo: tesla, url: 'https://www.tesla.com/' },
  { id: 'yale-engineering', name: 'Yale School of Engineering & Applied Science', logo: yaleEngineering, url: 'https://engineering.yale.edu/' },
  { id: 'ysea', name: 'Yale Science and Engineering Association', logo: ysea, url: 'https://ysea.org/' },
  { id: 'yceds', name: 'Yale Undergraduate Chemical Engineering Design Society', logo: yceds, url: 'https://yaleconnect.yale.edu/yceds/home/' },
  { id: 'new-haven-powersports', name: 'New Haven Powersports', logo: newHavenPowersports, url: 'https://www.nhpowersports.com/' },
  { id: 'yale-city', name: 'Tsai Center for Innovative Thinking at Yale', logo: yaleCity, url: 'https://city.yale.edu/' },
  { id: 'gene-haas', name: 'Gene Haas Foundation', logo: geneHaas, url: 'https://www.ghaasfoundation.org/' },
  { id: 'solidworks', name: 'SOLIDWORKS', logo: solidworks, url: 'https://www.solidworks.com/' },
  { id: 'southern-blood-services', name: 'Southern Blood Services', logo: southernBloodServices, url: 'https://southernbloodservices.com/' },
  { id: 'hoosier', name: 'Hoosier Racing Tire', logo: hoosier, url: 'https://www.hoosiertire.com/' },
  { id: 'go-time', name: 'GO TIME', logo: goTime, url: 'https://gotime.us/' },
  { id: 'online-metals', name: 'OnlineMetals', logo: onlineMetals, url: 'https://www.onlinemetals.com/' },
  { id: 'bild', name: 'Bild', logo: bild, url: 'https://www.getbild.com/' },
  { id: 'rigol', name: 'RIGOL', logo: rigol, url: 'https://www.rigolna.com/' },
]

export const individualSupporters = [
  'The Fernandes Family',
  'Dante & Diana Archangeli',
  'Lori Zbar',
  'The McClammy Family',
  'Julian Ricci',
  'Alan McGeever',
  'Carol and Tony Tumminello',
  'John DeFelice',
  'Gail and Elihu Rose',
  'John Jordan',
  'Claudia Hernandez',
  'Christopher Laudadio',
  'Oliver Ye',
  'Zubin Kremer Guha',
  'Zach Wright',
]

export const previousSponsors = [
  'Boeing', 'Novotechnik', 'National Instruments', 'Measurement Specialities',
  'Burns & McDonnell', 'Yale Science and Engineering Association', 'Ask Power',
  'Hoosier Racing Tire', 'IPG Automotive', 'Alcoa', 'High Purity', 'Profox',
  'Aurora', 'Andy’s Autosport', 'SolidWorks', 'Graybar',
  'Center for Engineering Innovation and Design', 'Gigavac', 'Stratasys', 'Vectornav',
]
