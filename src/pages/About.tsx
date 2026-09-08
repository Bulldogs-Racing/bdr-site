import { Link, useLoaderData } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { Container, PageHeader, Section, SectionHead } from '@/components/primitives'
import { site } from '@/content/site'
import { subteams } from '@/content/team'
import { getCurrentCar } from '@/lib/content'

export async function loader() {
  return { currentCar: await getCurrentCar() }
}
type LoaderData = Awaited<ReturnType<typeof loader>>

export default function About() {
  const { currentCar } = useLoaderData() as LoaderData

  return (
    <>
      <Seo
        title="About"
        path="/about"
        description="Bulldogs Racing is Yale University's Formula SAE team, founded in 2006. We design, build and race fully electric formula cars."
      />
      <PageHeader
        eyebrow="About us"
        title="A racing team that exists to teach engineering"
        intro="Bulldogs Racing strives to be a venue for innovation and inspiration in engineering. Racing and competition drive our organisation, but education lies at our core."
      />

      <Container>
        <div className="grid-rules" />

        <Section className="relative">
          <SectionHead label="§ 01 — What we do" />
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="prose-bdr">
                Every year we design, manufacture and race a fully electric, open-wheel,
                formula-style race car. The team owns the whole vehicle: chassis and suspension, the
                high-voltage accumulator and tractive system, aerodynamics, firmware and telemetry,
                and the budget that pays for all of it.
              </p>
              <p className="prose-bdr">
                {currentCar
                  ? `${currentCar.name} is in build now — our first ground-up design since BR16, and a chance for a new generation of the team to own a subsystem end to end.`
                  : 'A new car is in build now.'}
              </p>
              <p className="prose-bdr">
                We recruit from across all of Yale&rsquo;s academic disciplines and programmes. Team
                members gain real-world experience in engineering and business by replicating a
                professional racing team, and after graduation go on to become leaders in their
                fields.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/cars" className="btn btn-quiet justify-between">
                <span>The cars</span>
                <span aria-hidden>→</span>
              </Link>
              <Link to="/history" className="btn btn-quiet justify-between">
                <span>Team history</span>
                <span aria-hidden>→</span>
              </Link>
              <Link to="/competition" className="btn btn-quiet justify-between">
                <span>The competition</span>
                <span aria-hidden>→</span>
              </Link>
              <Link to="/team" className="btn btn-quiet justify-between">
                <span>Who we are</span>
                <span aria-hidden>→</span>
              </Link>
              <a
                href={site.links.joinForm}
                target="_blank"
                rel="noreferrer"
                className="btn justify-between"
              >
                <span>Join the team</span>
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </Section>

        <Section className="relative">
          <SectionHead label="§ 02 — Subteams" meta="Six ways in" />
          <ul className="grid border-t border-l border-rule md:grid-cols-2 lg:grid-cols-3">
            {subteams.map((s) => (
              <li key={s.name} className="border-r border-b border-rule p-6">
                <h3 className="mb-2.5 text-[1.0625rem] font-bold tracking-tight uppercase">
                  {s.name}
                </h3>
                <p className="m-0 font-serif text-[0.9375rem] leading-[1.55] text-ink-2">
                  {s.blurb}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      </Container>
    </>
  )
}

export const Component = About
