import { Link, useLoaderData } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { Container, PageHeader, Section, SectionHead } from '@/components/primitives'
import { getMilestones } from '@/lib/content'

export async function loader() {
  return { milestones: await getMilestones() }
}
type LoaderData = Awaited<ReturnType<typeof loader>>

export default function History() {
  const { milestones } = useLoaderData() as LoaderData

  return (
    <>
      <Seo
        title="History"
        path="/history"
        description="From a 2006 senior design seminar to an international championship and Yale's first electric vehicle."
      />
      <PageHeader
        eyebrow="2006 → present"
        title="Twenty years of building race cars"
        intro="Bulldogs Racing began in 2006, when Yale College seniors designed and constructed a car in a mechanical engineering design seminar to compete in the inaugural Formula SAE Hybrid competition."
      />

      <Container>
        <div className="grid-rules" />
        <Section className="relative pt-0">
          <SectionHead label="§ 01 — Timeline" meta={`${milestones.length} milestones`} />
          <ol className="border-t border-rule">
            {milestones.map((m) => (
              <li
                key={`${m.year}-${m.title}`}
                className="grid grid-cols-[70px_1fr] items-baseline gap-4 border-b border-rule py-6 md:grid-cols-[96px_1fr] md:gap-10"
              >
                <span className="font-mono text-[1.375rem] font-medium tracking-[0.02em] text-line tabular-nums">
                  {m.year}
                </span>
                <div>
                  <h3 className="mb-2 text-[1.0625rem] font-bold tracking-tight">{m.title}</h3>
                  <p className="m-0 max-w-[62ch] font-serif text-[0.9375rem] leading-[1.6] text-ink-2">
                    {m.body}
                  </p>
                  {m.carSlug && (
                    <Link
                      to={`/cars/${m.carSlug}`}
                      className="label mt-3 inline-block transition-colors hover:text-hv"
                    >
                      View the car →
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </Section>
      </Container>
    </>
  )
}

export const Component = History
