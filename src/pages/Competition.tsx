import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { Container, PageHeader, Section, SectionHead } from '@/components/primitives'

/**
 * Static copy migrated from the legacy /competition page, plus the event
 * breakdown that page was missing. Event point values are from the FSAE rules;
 * update them when the rulebook changes.
 */
const EVENTS = [
  {
    name: 'Design',
    kind: 'Static',
    points: 150,
    blurb: 'Defend every engineering decision on the car to industry judges.',
  },
  {
    name: 'Cost & Manufacturing',
    kind: 'Static',
    points: 100,
    blurb: 'A full bill of materials and manufacturing plan for the vehicle.',
  },
  {
    name: 'Business Presentation',
    kind: 'Static',
    points: 75,
    blurb: 'Pitch the car to a hypothetical manufacturing firm.',
  },
  { name: 'Acceleration', kind: 'Dynamic', points: 100, blurb: '75 metres from a standing start.' },
  {
    name: 'Skidpad',
    kind: 'Dynamic',
    points: 75,
    blurb: 'A figure-of-eight measuring steady-state cornering.',
  },
  {
    name: 'Autocross',
    kind: 'Dynamic',
    points: 125,
    blurb: 'A single flying lap of a tight, technical course.',
  },
  {
    name: 'Endurance & Efficiency',
    kind: 'Dynamic',
    points: 375,
    blurb: '22 km with a driver change. Where championships are won and cars break.',
  },
]

export default function Competition() {
  const total = EVENTS.reduce((sum, e) => sum + e.points, 0)

  return (
    <>
      <Seo
        title="Competition"
        path="/competition"
        description="Formula SAE is an annual intercollegiate racing series that challenges students to design and build a single-seat race car."
      />
      <PageHeader
        eyebrow="Formula SAE"
        title="Small-scale race car companies"
        intro="Formula SAE is an annual intercollegiate racing series that challenges students to design and build a single-seat race car. There are three categories: gas, hybrid and electric."
      />

      <Container>
        <div className="grid-rules" />

        <Section className="relative">
          <SectionHead label="§ 01 — What it is" />
          <p className="prose-bdr">
            The competition is designed for students to apply the theory they learn in engineering
            and management courses &mdash; going beyond the classroom to implement solutions
            directly applicable to real-world problems.
          </p>
          <p className="prose-bdr">
            Regardless of category, the teams operate like small-scale race car companies, taking
            ownership of all the engineering, fundraising and management aspects of building and
            operating a race car. Half the available points are never scored on track.
          </p>
        </Section>

        <Section className="relative">
          <SectionHead label="§ 02 — How it is scored" meta={`${total} points`} />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-y border-rule">
                  <th className="label py-3 pr-4 font-medium">Event</th>
                  <th className="label py-3 pr-4 font-medium">Type</th>
                  <th className="label py-3 pr-4 text-right font-medium">Points</th>
                  <th className="label py-3 font-medium">Detail</th>
                </tr>
              </thead>
              <tbody>
                {EVENTS.map((e) => (
                  <tr key={e.name} className="border-b border-rule-soft">
                    <td className="py-3.5 pr-4 text-[0.9375rem] font-bold whitespace-nowrap">
                      {e.name}
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className={`pill ${e.kind === 'Dynamic' ? 'pill-live' : ''}`}>
                        {e.kind}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 text-right text-[0.9375rem] font-semibold tabular-nums">
                      {e.points}
                    </td>
                    <td className="py-3.5 font-serif text-[0.9375rem] leading-[1.5] text-ink-2">
                      {e.blurb}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/cars" className="btn btn-quiet mt-8">
            How we&rsquo;ve done
          </Link>
        </Section>
      </Container>
    </>
  )
}

export const Component = Competition
