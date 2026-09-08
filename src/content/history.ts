import type { Milestone } from '@/lib/schemas'

/** Migrated from the legacy /team-history page, broken into a typed timeline. */
export const milestones: Milestone[] = [
  {
    year: 2006,
    title: 'A seminar project',
    body: 'Yale College seniors design and construct a car in a mechanical engineering design seminar to compete in the inaugural Formula SAE Hybrid competition.',
  },
  {
    year: 2007,
    title: 'Third at the first Formula SAE Hybrid',
    body: "Yale's first entry places 3rd overall and wins the electric-only acceleration event.",
    carSlug: 'br07',
  },
  {
    year: 2008,
    title: 'Bulldogs Racing is founded',
    body: 'The project becomes a Yale undergraduate organisation and takes the name Bulldogs Racing.',
    carSlug: 'br08',
  },
  {
    year: 2010,
    title: 'GM Best Engineered Hybrid Systems Award',
    body: 'BR10 takes 2nd place for the GM award and is a finalist in the design competition.',
    carSlug: 'br10',
  },
  {
    year: 2013,
    title: 'International champions',
    body: 'BR13 wins Formula SAE Hybrid outright with the fastest times in all dynamic events, sweeping the Ford Most Efficient Hybrid Award (1st), the Chrysler Innovation Award (1st) and the GM Best Engineered Hybrid System Award (2nd).',
    carSlug: 'br13',
  },
  {
    year: 2014,
    title: 'A turn toward electric',
    body: 'After a 4th place finish with BR14, the team decides to focus its attention and resources on electric drivetrains to explore the future of the automotive industry.',
    carSlug: 'br14',
  },
  {
    year: 2016,
    title: "Yale's first electric vehicle",
    body: 'BR16 is the first all-electric vehicle built at Yale University. A battery fire shortly before competition ends the season and reshapes the team’s approach to high voltage.',
    carSlug: 'br16',
  },
  {
    year: 2020,
    title: 'BR20 rebuilt through the pandemic',
    body: 'BR16 is completely overhauled with additional safety features, becoming BR20.',
    carSlug: 'br20',
  },
  {
    year: 2023,
    title: 'Back on track at NHMS',
    body: 'BR20 races Formula Hybrid + Electric at New Hampshire Motor Speedway and ties for 8th place in a field of 17.',
    carSlug: 'br20',
  },
  {
    year: 2025,
    title: 'BR25 begins',
    body: 'The team starts a clean-sheet all-electric car, its first ground-up design since BR16.',
    carSlug: 'br25',
  },
]
