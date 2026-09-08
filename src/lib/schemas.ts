import { z } from 'zod'

/**
 * These schemas are the single source of truth for the shape of BDR's content.
 *
 * Today they validate hand-written data in `src/content/*`. When a backend
 * arrives, they become the contract on BOTH sides: the Flask/Supabase table
 * definitions mirror them, and `src/lib/content.ts` keeps parsing responses
 * through the exact same schemas. Nothing in `src/components` or `src/pages`
 * ever learns where the data came from.
 *
 * Rule of thumb: if a field would need a migration in a database, it belongs
 * here. If it is purely presentational, it belongs in the component.
 */

/** URL-safe identifier used in routes, e.g. /cars/br20. */
export const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'must be lowercase kebab-case')

/** A path under /public, or an absolute URL while assets are still on the legacy host. */
export const imageSchema = z.object({
  src: z.string().min(1),
  /** Required. Screen readers and the sponsors we are asking for money both benefit. */
  alt: z.string().min(1),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  credit: z.string().optional(),
})

// ---------------------------------------------------------------- team

/**
 * Board members run the org, leads run a subteam, advisors are former leadership
 * still involved. The order here is the order they render in.
 */
export const teamGroupSchema = z.enum(['board', 'lead', 'advisor'])

export const teamMemberSchema = z.object({
  slug: slugSchema,
  name: z.string().min(1),
  role: z.string().min(1),
  group: teamGroupSchema,
  /** Subteam this person leads, if any. Drives the grouping on /team. */
  subteam: z.string().optional(),
  major: z.string().optional(),
  classYear: z.number().int().min(1900).max(2100).optional(),
  bio: z.string().optional(),
  photo: imageSchema.optional(),
  /** Season this board serves, e.g. '2026-27'. Lets old boards stay in the data. */
  season: z.string().min(1),
})

// ---------------------------------------------------------------- cars

export const carClassSchema = z.enum(['combustion', 'hybrid', 'electric'])
export const carStatusSchema = z.enum(['raced', 'in-build', 'did-not-compete'])

/** One row of a car's spec sheet. Kept as a list so cars can have different specs. */
export const specSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  /** Rendered smaller and dimmer next to the value, e.g. 'kWh'. */
  unit: z.string().optional(),
})

export const resultSchema = z.object({
  text: z.string().min(1),
  /** Highlights the line in HV orange. Reserve it for genuine wins. */
  highlight: z.boolean().default(false),
})

export const carSchema = z.object({
  slug: slugSchema,
  /** Display name: 'BR20', or 'Yale's first entry' for the unnamed early cars. */
  name: z.string().min(1),
  year: z.number().int().min(2006).max(2100),
  class: carClassSchema,
  status: carStatusSchema,
  /** One or two sentences. Shown in the timeline on the homepage and /cars. */
  summary: z.string().min(1),
  /** Long-form copy for /cars/:slug. Markdown-free plain paragraphs. */
  body: z.array(z.string()).default([]),
  specs: z.array(specSchema).default([]),
  results: z.array(resultSchema).default([]),
  competition: z.string().optional(),
  venue: z.string().optional(),
  images: z.array(imageSchema).default([]),
})

// ---------------------------------------------------------------- alumni

export const alumnusSchema = z.object({
  name: z.string().min(1),
  major: z.string().optional(),
  classYear: z.number().int().min(1900).max(2100).optional(),
  /** Role held on the team, e.g. 'President', 'Chief Engineer'. */
  teamRole: z.string().optional(),
  /** Current title, if known. */
  currentRole: z.string().optional(),
  /** Current employer or institution. Rendered in Yale blue. */
  currentOrg: z.string().optional(),
  /** Surface on the homepage's short list. Keep this to ~9 people. */
  featured: z.boolean().default(false),
})

// ---------------------------------------------------------------- sponsors

/**
 * Tiers are a forward-looking field: the current site lists sponsors flat.
 * Populate them when the sponsorship packet's tiers are finalised, and the
 * sponsors page will group automatically.
 */
export const sponsorTierSchema = z.enum(['title', 'platinum', 'gold', 'silver', 'supporter'])
export const sponsorKindSchema = z.enum(['corporate', 'individual', 'institutional'])

export const sponsorSchema = z.object({
  name: z.string().min(1),
  kind: sponsorKindSchema,
  tier: sponsorTierSchema.optional(),
  url: z.url().optional(),
  logo: imageSchema.optional(),
  /** Which season this sponsor supported. 'previous' for the historical roll. */
  season: z.string().min(1),
  current: z.boolean().default(false),
})

// ---------------------------------------------------------------- news

export const newsletterIssueSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  /** ISO date, YYYY-MM-DD. */
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  /** External Mailchimp archive URL. Issues are not hosted on this site. */
  url: z.url(),
  excerpt: z.string().optional(),
})

// ---------------------------------------------------------------- milestones

export const milestoneSchema = z.object({
  year: z.number().int().min(2006).max(2100),
  title: z.string().min(1),
  body: z.string().min(1),
  /** Links the milestone to a car page when one exists. */
  carSlug: slugSchema.optional(),
})

// ---------------------------------------------------------------- inferred types

export type Image = z.infer<typeof imageSchema>
export type TeamGroup = z.infer<typeof teamGroupSchema>
export type TeamMember = z.infer<typeof teamMemberSchema>
export type CarClass = z.infer<typeof carClassSchema>
export type CarStatus = z.infer<typeof carStatusSchema>
export type Spec = z.infer<typeof specSchema>
export type Result = z.infer<typeof resultSchema>
export type Car = z.infer<typeof carSchema>
export type Alumnus = z.infer<typeof alumnusSchema>
export type SponsorTier = z.infer<typeof sponsorTierSchema>
export type SponsorKind = z.infer<typeof sponsorKindSchema>
export type Sponsor = z.infer<typeof sponsorSchema>
export type NewsletterIssue = z.infer<typeof newsletterIssueSchema>
export type Milestone = z.infer<typeof milestoneSchema>
