import { z } from 'zod'
import {
  alumnusSchema,
  carSchema,
  milestoneSchema,
  newsletterIssueSchema,
  sponsorSchema,
  teamMemberSchema,
  type Alumnus,
  type Car,
  type Milestone,
  type NewsletterIssue,
  type Sponsor,
  type TeamMember,
} from './schemas'

import { alumni as alumniData } from '@/content/alumni'
import { cars as carsData } from '@/content/cars'
import { milestones as milestonesData } from '@/content/history'
import { newsletters as newslettersData } from '@/content/news'
import { sponsors as sponsorsData } from '@/content/sponsors'
import { team as teamData } from '@/content/team'

/**
 * The one place the site talks to its data.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHY THIS FILE EXISTS
 *
 * Every accessor is async and returns schema-validated data, even though the
 * data is currently a local array that could be imported directly. That is on
 * purpose. When a backend arrives, only the bodies of these functions change:
 *
 *     export async function getCars(): Promise<Car[]> {
 *       const res = await fetch(`${API}/cars`)
 *       return parseAll(carSchema, await res.json(), 'cars')
 *     }
 *
 * Components and pages never import from `@/content/*` directly -- they call
 * these functions -- so no page changes when the source moves. Keep it that way;
 * it is the entire reason the swap is cheap.
 *
 * A note on prerendering: `vite-react-ssg` calls these at build time in Node, so
 * anything added here must run without a DOM.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Validate a whole collection, failing loudly with the offending index.
 * A typo in `src/content` should break the build, not ship a blank section.
 */
function parseAll<T>(schema: z.ZodType<T>, rows: unknown, label: string): T[] {
  const result = z.array(schema).safeParse(rows)
  if (!result.success) {
    throw new Error(`Invalid content in "${label}":\n${z.prettifyError(result.error)}`)
  }
  return result.data
}

// ---------------------------------------------------------------- cars

export async function getCars(): Promise<Car[]> {
  return parseAll(carSchema, carsData, 'cars')
}

export async function getCar(slug: string): Promise<Car | undefined> {
  const cars = await getCars()
  return cars.find((car) => car.slug === slug)
}

/** The car currently in build, used by the homepage hero. */
export async function getCurrentCar(): Promise<Car | undefined> {
  const cars = await getCars()
  return cars.find((car) => car.status === 'in-build') ?? cars[0]
}

/** The most recent car that actually raced, used for the homepage spec sheet. */
export async function getLastRacedCar(): Promise<Car | undefined> {
  const cars = await getCars()
  return cars.find((car) => car.status === 'raced')
}

/**
 * Synchronous slug list for `getStaticPaths`. vite-react-ssg needs the route
 * list before React renders, so this one cannot be async. It is the only place
 * allowed to read `@/content` directly.
 */
export function carSlugs(): string[] {
  return carsData.map((car) => car.slug)
}

// ---------------------------------------------------------------- team

export async function getTeam(): Promise<TeamMember[]> {
  return parseAll(teamMemberSchema, teamData, 'team')
}

export async function getTeamByGroup(): Promise<{
  board: TeamMember[]
  leads: TeamMember[]
  advisors: TeamMember[]
}> {
  const members = await getTeam()
  return {
    board: members.filter((m) => m.group === 'board'),
    leads: members.filter((m) => m.group === 'lead'),
    advisors: members.filter((m) => m.group === 'advisor'),
  }
}

// ---------------------------------------------------------------- alumni

export async function getAlumni(): Promise<Alumnus[]> {
  const rows = parseAll(alumnusSchema, alumniData, 'alumni')
  return [...rows].sort((a, b) => (a.classYear ?? 0) - (b.classYear ?? 0))
}

export async function getFeaturedAlumni(): Promise<Alumnus[]> {
  return (await getAlumni()).filter((a) => a.featured)
}

// ---------------------------------------------------------------- sponsors

export async function getSponsors(): Promise<Sponsor[]> {
  return parseAll(sponsorSchema, sponsorsData, 'sponsors')
}

export async function getSponsorsBySeason(): Promise<{
  current: Sponsor[]
  previous: Sponsor[]
}> {
  const rows = await getSponsors()
  return {
    current: rows.filter((s) => s.current),
    previous: rows.filter((s) => !s.current),
  }
}

// ---------------------------------------------------------------- news

export async function getNewsletters(): Promise<NewsletterIssue[]> {
  const rows = parseAll(newsletterIssueSchema, newslettersData, 'newsletters')
  return [...rows].sort((a, b) => b.date.localeCompare(a.date))
}

// ---------------------------------------------------------------- history

export async function getMilestones(): Promise<Milestone[]> {
  const rows = parseAll(milestoneSchema, milestonesData, 'milestones')
  return [...rows].sort((a, b) => a.year - b.year)
}
