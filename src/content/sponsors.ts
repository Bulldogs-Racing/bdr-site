import type { Sponsor } from '@/lib/schemas'

/**
 * Migrated from the legacy /sponsorship page.
 *
 * Individual donors carry `kind: 'individual'` and render as plain names; the
 * legacy page listed them with inconsistent capitalisation, normalised here.
 * Corporate sponsors get a `logo` once we have SVGs -- until then they render
 * as a wordmark, which is honest and looks intentional.
 */

const CURRENT = '2026-27'
const PREVIOUS = 'previous'

const individual = (name: string): Sponsor => ({
  name,
  kind: 'individual',
  season: CURRENT,
  current: true,
})

const previousCorporate = (name: string): Sponsor => ({
  name,
  kind: 'corporate',
  season: PREVIOUS,
  current: false,
})

export const sponsors: Sponsor[] = [
  // ---- BR25 season supporters ----
  individual('The Fernandes Family'),
  individual('Dante & Diana Archangeli'),
  individual('Lori Zbar'),
  individual('The McClammy Family'),
  individual('Julian Ricci'),
  individual('Alan McGeever'),
  individual('Carol and Tony Tumminello'),
  individual('John DeFelice'),
  individual('Gail and Elihu Rose'),
  individual('John Jordan'),
  individual('Claudia Hernandez'),
  individual('Christopher Laudadio'),
  individual('Oliver Ye'),
  individual('Zubin Kremer Guha'),
  individual('Zach Wright'),

  // ---- previous sponsors ----
  previousCorporate('Boeing'),
  previousCorporate('Novotechnik'),
  previousCorporate('National Instruments'),
  previousCorporate('Measurement Specialties'),
  previousCorporate('Burns & McDonnell'),
  previousCorporate('Ask Power'),
  previousCorporate('Hoosier Racing Tire'),
  previousCorporate('IPG Automotive'),
  previousCorporate('Alcoa'),
  previousCorporate('High Purity'),
  previousCorporate('Profox'),
  previousCorporate('Aurora'),
  previousCorporate("Andy's Autosport"),
  previousCorporate('SolidWorks'),
  previousCorporate('Graybar'),
  previousCorporate('Gigavac'),
  previousCorporate('Stratasys'),
  previousCorporate('VectorNav'),
  {
    name: 'Yale Science and Engineering Association',
    kind: 'institutional',
    season: PREVIOUS,
    current: false,
  },
  {
    name: 'Center for Engineering Innovation and Design',
    kind: 'institutional',
    season: PREVIOUS,
    current: false,
  },
]

/** What a sponsor gets. Kept next to the data because it is content, not layout. */
export const sponsorBenefits = [
  'Your corporate logo on the website, in the newsletter, and on the flank of our flagship vehicle.',
  'Direct recruiting access to Yale’s engineering and business students.',
  'Gifts of any kind — cash, parts, machine time, services — are put straight into the car.',
  'All donations are tax-deductible.',
] as const
