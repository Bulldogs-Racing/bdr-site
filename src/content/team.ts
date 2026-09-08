import type { TeamMember } from '@/lib/schemas'

/**
 * The 2026-27 leadership board, migrated from the legacy /leadership-team page.
 *
 * Photos: drop files in public/media/team/ and fill in `photo`. Until then the
 * roster renders with initial monograms, which is a deliberate fallback rather
 * than a broken image.
 *
 * Handover note for the next Software Lead: this is the file that changes every
 * September. Add the new board, bump `season`, and keep the outgoing board's
 * entries around with their old season string if you want a board archive.
 */
const SEASON = '2026-27'

export const team: TeamMember[] = [
  // ---- board ----
  { slug: 'ezra-zbar', name: 'Ezra Zbar', role: 'Project Manager', group: 'board', season: SEASON },
  {
    slug: 'ella-renton',
    name: 'Ella Renton',
    role: 'Business Manager',
    group: 'board',
    season: SEASON,
  },
  { slug: 'karen-mei', name: 'Karen Mei', role: 'Team Principal', group: 'board', season: SEASON },
  {
    slug: 'gusty-jothaprasert',
    name: 'Gusty Jothaprasert',
    role: 'Chief Engineer',
    group: 'board',
    season: SEASON,
  },

  // ---- subteam leads ----
  {
    slug: 'swarna-navaratnam-tomayko',
    name: 'Swarna Navaratnam-Tomayko',
    role: 'Powertrain Lead',
    group: 'lead',
    subteam: 'Powertrain',
    season: SEASON,
  },
  {
    slug: 'cara-wang',
    name: 'Cara Wang',
    role: 'Vehicle Dynamics (Sprung) Lead',
    group: 'lead',
    subteam: 'Vehicle Dynamics',
    season: SEASON,
  },
  {
    slug: 'michael-mcclammy',
    name: 'Michael McClammy',
    role: 'Vehicle Dynamics (Unsprung) Lead',
    group: 'lead',
    subteam: 'Vehicle Dynamics',
    season: SEASON,
  },
  {
    slug: 'himani-kumar',
    name: 'Himani Kumar',
    role: 'High Voltage Lead',
    group: 'lead',
    subteam: 'High Voltage',
    season: SEASON,
  },
  {
    slug: 'robert-bobowski',
    name: 'Robert Bobowski',
    role: 'Mechanical Accumulator Lead',
    group: 'lead',
    subteam: 'High Voltage',
    season: SEASON,
  },
  {
    slug: 'eric-zou',
    name: 'Eric Zou',
    role: 'Software Lead',
    group: 'lead',
    subteam: 'Software',
    season: SEASON,
  },
  {
    slug: 'thais-burgess',
    name: 'Thais Burgess',
    role: 'Aerodynamics Lead',
    group: 'lead',
    subteam: 'Aerodynamics',
    season: SEASON,
  },
  {
    slug: 'jenny-trang',
    name: 'Jenny Trang',
    role: 'Aerodynamics Lead',
    group: 'lead',
    subteam: 'Aerodynamics',
    season: SEASON,
  },

  // ---- advisors ----
  {
    slug: 'nora-ransibrahmanakul',
    name: 'Nora Ransibrahmanakul',
    role: 'Senior Advisor',
    group: 'advisor',
    season: SEASON,
  },
  {
    slug: 'pradyun-solai',
    name: 'Pradyun Solai',
    role: 'Senior Advisor',
    group: 'advisor',
    season: SEASON,
  },
  {
    slug: 'maggie-lo',
    name: 'Maggie Lo',
    role: 'Senior Advisor',
    group: 'advisor',
    season: SEASON,
  },
]

/** Subteams, in the order they should render. Used by /team and /about. */
export const subteams = [
  {
    name: 'Powertrain',
    blurb:
      'Motors, inverters, cooling and the tractive system that turns 192 volts into wheel torque.',
  },
  {
    name: 'High Voltage',
    blurb:
      'Accumulator design, cell selection, BMS, and every rule in the book that starts with EV.',
  },
  {
    name: 'Vehicle Dynamics',
    blurb:
      'Suspension, steering, uprights and tyres — sprung and unsprung, kinematics to lap time.',
  },
  {
    name: 'Aerodynamics',
    blurb: 'Wings, undertray and bodywork, from CFD through layup to the track.',
  },
  {
    name: 'Software',
    blurb: 'Firmware, telemetry, data acquisition and the tooling the rest of the team runs on.',
  },
  {
    name: 'Business',
    blurb:
      'Sponsorship, budget, logistics and the cost report that is worth as many points as autocross.',
  },
] as const
