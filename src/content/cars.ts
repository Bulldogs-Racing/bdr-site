import type { Car } from '@/lib/schemas'

/**
 * Every car the team has built, newest first.
 *
 * Migrated from the legacy WordPress /the-team/previous-cars page. Specs and
 * times are the team's own published figures -- do not invent numbers here.
 * Leave a spec out rather than guessing at it.
 */
export const cars: Car[] = [
  {
    slug: 'br25',
    name: 'BR25',
    year: 2025,
    class: 'electric',
    status: 'in-build',
    summary: "A clean-sheet all-electric car -- the team's first ground-up design since BR16.",
    body: [
      'BR25 is in build now. The team is investigating cutting-edge electric drivetrain technology — the same problems the automotive industry is solving at scale, on a car small enough that one student can own a subsystem end to end.',
      'Unlike BR20, which was a rebuild of the BR16 chassis, BR25 is designed from a blank sheet.',
    ],
    specs: [{ label: 'Drivetrain', value: 'All-electric' }],
    results: [],
    images: [],
  },
  {
    slug: 'br20',
    name: 'BR20',
    year: 2020,
    class: 'electric',
    status: 'raced',
    summary:
      "BR16's chassis rebuilt through the pandemic with a redesigned accumulator and new safety systems.",
    body: [
      'Following the BR16 battery fire, the car was completely overhauled and additional safety features were designed in, leading to BR20 over the course of the COVID-19 pandemic.',
      'In the spring of 2023 BR20 raced in the Formula Hybrid + Electric competition at New Hampshire Motor Speedway, where the team tied for 8th place in a field of 17.',
    ],
    specs: [
      { label: 'Drivetrain', value: 'All-electric' },
      { label: 'Motors', value: '2 × Emrax 207' },
      { label: 'Pack voltage', value: '192', unit: 'V' },
      { label: 'Pack energy', value: '3.6', unit: 'kWh' },
      { label: 'Chassis', value: 'Steel spaceframe' },
    ],
    results: [{ text: 'Tied 8th of 17', highlight: false }],
    competition: 'Formula Hybrid + Electric',
    venue: 'New Hampshire Motor Speedway',
    images: [],
  },
  {
    slug: 'br16',
    name: 'BR16',
    year: 2016,
    class: 'electric',
    status: 'did-not-compete',
    summary:
      'The first all-electric vehicle ever built at Yale. A battery fire days before competition ended the season.',
    body: [
      'BR16 was designed to emulate vintage racing style and was the first all-electric vehicle built at Yale University.',
      'An unfortunate battery fire shortly before the car was scheduled to compete ended the season and rewrote how the team approaches high voltage. The chassis was later rebuilt as BR20.',
    ],
    specs: [
      { label: 'Drivetrain', value: 'All-electric' },
      { label: 'Motors', value: '2 × Emrax 207' },
      { label: 'Pack voltage', value: '180', unit: 'V' },
    ],
    results: [{ text: 'Did not compete', highlight: false }],
    images: [],
  },
  {
    slug: 'br14',
    name: 'BR14',
    year: 2014,
    class: 'hybrid',
    status: 'raced',
    summary: 'Ran as defending champion. Clutch trouble kept the engine from its full potential.',
    body: [
      'Bulldogs Racing fielded BR14 as the defending champion. Due to difficulties with the clutch system the car could not use the full potential of its internal combustion engine, and finished 4th at the 2014 Formula SAE Hybrid competition.',
      'The team decided to focus on electric drivetrains for the next competition cycle in order to learn more about where the automotive industry was heading.',
    ],
    specs: [{ label: 'Drivetrain', value: 'Hybrid' }],
    results: [{ text: '4th overall', highlight: false }],
    competition: 'Formula SAE Hybrid',
    images: [],
  },
  {
    slug: 'br13',
    name: 'BR13',
    year: 2013,
    class: 'hybrid',
    status: 'raced',
    summary:
      'The year it all came together. Fastest times in every dynamic event at the 2013 championship.',
    body: [
      'BR13 won the Formula SAE Hybrid 2013 competition outright, posting the fastest times in all dynamic events.',
      'The car ran the 75 m acceleration event in 5.283 seconds and posted an autocross time of 49.417 seconds.',
    ],
    specs: [
      { label: 'Drivetrain', value: 'Hybrid' },
      { label: '75 m acceleration', value: '5.283', unit: 's' },
      { label: 'Autocross', value: '49.417', unit: 's' },
    ],
    results: [
      { text: 'International champions', highlight: true },
      { text: 'Ford Most Efficient Hybrid — 1st', highlight: true },
      { text: 'Chrysler Innovation Award — 1st', highlight: true },
      { text: 'GM Best Engineered Hybrid System — 2nd', highlight: false },
    ],
    competition: 'Formula SAE Hybrid',
    images: [],
  },
  {
    slug: 'br10',
    name: 'BR10',
    year: 2010,
    class: 'hybrid',
    status: 'raced',
    summary:
      'Built on two seasons of hybrid drivetrain experience, and a finalist in the design competition.',
    body: [
      'BR10 was built upon the experience the team gathered over the previous two races and an expanded knowledge of hybrid drivetrains.',
    ],
    specs: [{ label: 'Drivetrain', value: 'Hybrid' }],
    results: [
      { text: 'GM Best Hybrid System Engineering — 2nd', highlight: true },
      { text: 'Design competition finalist', highlight: false },
    ],
    competition: 'Formula SAE Hybrid',
    images: [],
  },
  {
    slug: 'br08',
    name: 'The first BDR car',
    year: 2008,
    class: 'hybrid',
    status: 'raced',
    summary: 'The first car after Bulldogs Racing became a Yale undergraduate organisation.',
    body: [
      'A mixed success against its design criteria, but it gave the team invaluable competition experience.',
      'Fun fact: this car was packaged to accommodate every member of the team, including a 6′7″, 300 lb powerlifter.',
    ],
    specs: [{ label: 'Drivetrain', value: 'Hybrid' }],
    results: [],
    competition: 'Formula SAE Hybrid',
    images: [],
  },
  {
    slug: 'br07',
    name: "Yale's first entry",
    year: 2007,
    class: 'hybrid',
    status: 'raced',
    summary:
      'Conceived under Prof. John Morrell in a senior mechanical design seminar, before Bulldogs Racing existed.',
    body: [
      "Yale's first entry into a Formula SAE competition. The project was conceived under the supervision of Professor John Morrell within a senior mechanical design seminar.",
      'As a first-year entry the car came 3rd overall and won the electric-only acceleration event at the inaugural Formula SAE Hybrid competition.',
    ],
    specs: [{ label: 'Drivetrain', value: 'Hybrid' }],
    results: [
      { text: '3rd overall', highlight: true },
      { text: 'Won electric-only acceleration', highlight: true },
    ],
    competition: 'Formula SAE Hybrid (inaugural)',
    images: [],
  },
]
