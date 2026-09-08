import { Link, useLoaderData, useParams } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { SpecSheet } from '@/components/SpecSheet'
import { Container, Section, SectionHead } from '@/components/primitives'
import { getCar, getCars } from '@/lib/content'
import type { Car } from '@/lib/schemas'

// Which /cars/:slug pages get written out at build time is declared on the
// route object in src/routes.tsx -- vite-react-ssg needs that list before this
// lazily-loaded module has been imported.

export async function loader({ params }: { params: { slug?: string } }) {
  const [car, cars] = await Promise.all([getCar(params.slug ?? ''), getCars()])
  return { car, cars }
}
type LoaderData = Awaited<ReturnType<typeof loader>>

const STATUS_LABEL: Record<Car['status'], string> = {
  raced: 'Raced',
  'in-build': '● In build',
  'did-not-compete': 'Did not compete',
}

export default function CarDetail() {
  const { slug } = useParams()
  const { car, cars } = useLoaderData() as LoaderData

  if (!car) {
    return (
      <Container className="py-24">
        <h1 className="text-3xl font-extrabold uppercase">No car called &ldquo;{slug}&rdquo;</h1>
        <Link to="/cars" className="btn mt-6">
          All cars
        </Link>
      </Container>
    )
  }

  const index = cars.findIndex((c) => c.slug === car.slug)
  const newer = index > 0 ? cars[index - 1] : undefined
  const older = index < cars.length - 1 ? cars[index + 1] : undefined

  return (
    <>
      <Seo title={car.name} path={`/cars/${car.slug}`} description={car.summary} />

      <Container className="pt-12 pb-10 md:pt-16">
        <div className="grid-rules" />
        <Link to="/cars" className="label relative transition-colors hover:text-hv">
          ← All cars
        </Link>
        <div className="relative mt-5 flex flex-wrap items-baseline gap-5">
          <h1 className="m-0 text-[clamp(2.4rem,7vw,4.5rem)] leading-none font-extrabold tracking-[-0.035em] uppercase">
            {car.name}
          </h1>
          <span className="font-mono text-[1.5rem] font-medium text-line tabular-nums">
            {car.year}
          </span>
          <span className={`pill ${car.status === 'in-build' ? 'pill-live' : ''}`}>
            {STATUS_LABEL[car.status]}
          </span>
        </div>
        <p className="prose-bdr relative mt-6">{car.summary}</p>
      </Container>

      <Container>
        <div className="grid-rules" />

        <Section className="relative pt-0">
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[clamp(32px,5vw,72px)]">
            <div>
              <SectionHead label="§ 01 — The car" />
              {car.body.map((para) => (
                <p key={para} className="prose-bdr">
                  {para}
                </p>
              ))}
              {car.results.length > 0 && (
                <>
                  <h2 className="label mt-10 mb-4">Results</h2>
                  <ul className="border-t border-rule">
                    {car.results.map((r) => (
                      <li
                        key={r.text}
                        className={`border-b border-rule py-3 font-mono text-[0.8125rem] tracking-[0.1em] uppercase ${r.highlight ? 'text-hv' : 'text-ink-2'}`}
                      >
                        {r.text}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="flex flex-col gap-6">
              <SpecSheet
                title="Specification"
                meta={car.competition ?? String(car.year)}
                specs={[
                  ...car.specs,
                  ...(car.competition ? [{ label: 'Competition', value: car.competition }] : []),
                  ...(car.venue ? [{ label: 'Venue', value: car.venue }] : []),
                ]}
              />
              <nav className="flex justify-between gap-3">
                {older ? (
                  <Link to={`/cars/${older.slug}`} className="btn btn-quiet">
                    ← {older.name}
                  </Link>
                ) : (
                  <span />
                )}
                {newer && (
                  <Link to={`/cars/${newer.slug}`} className="btn btn-quiet">
                    {newer.name} →
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </Section>
      </Container>
    </>
  )
}

export const Component = CarDetail
