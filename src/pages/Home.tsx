import { Link, useLoaderData } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { ExplodedCar } from '@/components/ExplodedCar'
import { SpecSheet } from '@/components/SpecSheet'
import { CarRow } from '@/components/CarRow'
import { Container, Section, SectionHead } from '@/components/primitives'
import { site } from '@/content/site'
import {
  getCars,
  getCurrentCar,
  getFeaturedAlumni,
  getLastRacedCar,
  getSponsorsBySeason,
} from '@/lib/content'

export async function loader() {
  const [cars, currentCar, lastRaced, featuredAlumni, sponsors, team] = await Promise.all([
    getCars(),
    getCurrentCar(),
    getLastRacedCar(),
    getFeaturedAlumni(),
    getSponsorsBySeason(),
    getTeam(),
  ])
  return { cars, currentCar, lastRaced, featuredAlumni, sponsors, team }
}

type LoaderData = Awaited<ReturnType<typeof loader>>

export default function Home() {
  const { cars, currentCar, lastRaced, featuredAlumni, sponsors, team } =
    useLoaderData() as LoaderData

  return (
    <>
      <Seo path="/" />

      {/* ---------------------------------------------------------- hero */}
      <Container className="pt-10 md:pt-16">
        <div className="grid-rules" />
        <div className="relative mb-6 flex flex-wrap items-center gap-3.5">
          {['Yale University', 'Formula SAE', `Est. ${site.founded}`, site.location].map(
            (bit, i, all) => (
              <span key={bit} className="label relative pr-3.5">
                {bit}
                {i < all.length - 1 && (
                  <span className="absolute top-1/2 right-0 h-px w-1.5 bg-ink-3" />
                )}
              </span>
            ),
          )}
        </div>

        <h1 className="relative m-0 mb-6 max-w-[16ch] text-[clamp(2.4rem,7.2vw,5.25rem)] leading-[0.94] font-extrabold tracking-[-0.035em] uppercase">
          We build <em className="text-line not-italic">electric</em> race cars from a blank sheet.
        </h1>

        <div className="relative flex flex-wrap items-end justify-between gap-9 pb-2">
          <p className="prose-bdr">
            Bulldogs Racing is Yale&rsquo;s Formula SAE team. Every year we design, manufacture and
            race a fully electric, open-wheel formula car &mdash; the chassis, the accumulator, the
            firmware, the aero, all of it. Racing drives the organisation. Education is the point of
            it.
          </p>
          {currentCar && (
            <div className="text-right">
              <div className="label mb-2">Current build</div>
              <Link
                to={`/cars/${currentCar.slug}`}
                className="block text-[clamp(2rem,5vw,3rem)] leading-none font-extrabold tracking-[-0.03em] transition-colors hover:text-hv"
              >
                {currentCar.name}
              </Link>
            </div>
          )}
        </div>
      </Container>

      <ExplodedCar
        className="mt-11"
        figure={`Fig. 1 — ${currentCar?.name ?? 'Car'} assembly, side elevation`}
      />

      {/* --------------------------------------------------------- stats */}
      <Container>
        <div className="grid-rules" />
        <Section className="relative pt-10 md:pt-16">
          <dl className="grid grid-cols-2 border-y border-rule md:grid-cols-4">
            {[
              { n: '2013', k: 'FSAE Hybrid champions' },
              {
                n: String(cars.filter((c) => c.status !== 'in-build').length),
                k: 'Cars built since 2006',
              },
              { n: '2016', k: 'First Yale EV, all-electric since' },
              { n: String(team.length), k: `On the ${site.currentSeason} board` },
            ].map((s, i) => (
              <div
                key={s.k}
                className={`py-6 pr-6 md:border-r md:border-rule md:last:border-r-0 ${i % 2 === 0 ? 'border-r border-rule md:border-r' : ''} ${i < 2 ? 'border-b border-rule md:border-b-0' : ''}`}
              >
                <dd className="m-0 text-[clamp(1.8rem,3.6vw,2.75rem)] leading-none font-extrabold tracking-[-0.03em] tabular-nums">
                  {s.n}
                </dd>
                <dt className="label mt-2.5">{s.k}</dt>
              </div>
            ))}
          </dl>
        </Section>

        {/* ------------------------------------------------- current build */}
        <Section className="relative">
          <SectionHead label="§ 01 — Current build" meta={`Season ${site.currentSeason}`} />
          <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[clamp(32px,5vw,72px)]">
            <div>
              <h2 className="mb-4 text-[clamp(1.5rem,3.2vw,2.25rem)] font-extrabold tracking-[-0.02em] uppercase">
                {currentCar?.name} &mdash; the next all-electric car
              </h2>
              {currentCar?.body.map((para) => (
                <p key={para} className="prose-bdr">
                  {para}
                </p>
              ))}
              <div className="mt-6 flex flex-wrap gap-2.5">
                <span className="pill pill-live">● In build</span>
                <span className="pill">Chassis</span>
                <span className="pill">Accumulator</span>
                <span className="pill">Aero</span>
              </div>
              <Link to="/cars" className="btn btn-quiet mt-7">
                Every car we&rsquo;ve built
              </Link>
            </div>

            {lastRaced && (
              <SpecSheet
                title={lastRaced.name}
                meta={`Last raced · ${lastRaced.year}`}
                specs={lastRaced.specs}
              />
            )}
          </div>
        </Section>

        {/* --------------------------------------------------------- cars */}
        <Section className="relative">
          <SectionHead label="§ 02 — Every car we've built" meta="2007 → present" />
          <div className="border-t border-rule">
            {cars.map((car) => (
              <CarRow key={car.slug} car={car} />
            ))}
          </div>
        </Section>

        {/* ------------------------------------------------------- alumni */}
        <Section className="relative">
          <SectionHead label="§ 03 — Where the team goes" meta="Selected alumni" />
          <ul className="grid border-t border-l border-rule sm:grid-cols-2 lg:grid-cols-3">
            {featuredAlumni.map((a) => (
              <li key={a.name} className="border-r border-b border-rule px-5 py-4.5">
                <b className="block text-[0.9375rem] font-bold">{a.name}</b>
                <span className="label mt-1.5 block normal-case">
                  <span className="uppercase">
                    {a.major} &rsquo;{String(a.classYear).slice(2)}
                    {a.teamRole && ` · ${a.teamRole}`} →{' '}
                  </span>
                  <span className="text-line uppercase">{a.currentOrg}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link to="/alumni" className="btn btn-quiet mt-6">
            All alumni
          </Link>
        </Section>

        {/* ----------------------------------------------------- sponsors */}
        <Section className="relative">
          <SectionHead label="§ 04 — Sponsors" meta={`${site.currentSeason} season`} />
          <p className="prose-bdr mb-8">
            Every gift is integral &mdash; cash, parts, machine time, services. Donations are
            tax-deductible, and corporate logos run on the website, the newsletter and the flank of
            the car, with direct recruiting access to Yale engineering.
          </p>
          <ul className="flex flex-wrap border-t border-l border-rule">
            {sponsors.previous.slice(0, 12).map((s) => (
              <li
                key={s.name}
                className="flex-[1_1_200px] border-r border-b border-rule p-5 text-[0.9375rem] font-semibold text-ink-2"
              >
                {s.name}
              </li>
            ))}
            <li className="label flex flex-[1_1_200px] items-center border-r border-b border-rule p-5">
              + {sponsors.current.length} supporters this season
            </li>
          </ul>
          <Link to="/sponsors" className="btn mt-6">
            Support the team
          </Link>
        </Section>

        {/* ---------------------------------------------------------- cta */}
        <Section className="relative pb-0">
          <div className="grid items-center gap-8 border border-rule bg-gradient-to-b from-raise to-sheet p-[clamp(32px,5vw,56px)] md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="mb-3.5 text-[clamp(1.5rem,3.2vw,2.25rem)] font-extrabold tracking-[-0.02em] uppercase">
                Come build the car
              </h2>
              <p className="prose-bdr">
                We recruit from every discipline at Yale &mdash; mechanical, electrical, software,
                business. No experience required, only the willingness to show up at the garage.
                Educational groups and prospective sponsors: we&rsquo;d be glad to give you a tour.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={site.links.joinForm} target="_blank" rel="noreferrer" className="btn">
                Join the team
              </a>
              <a href={`mailto:${site.email}`} className="btn btn-quiet">
                {site.email}
              </a>
            </div>
          </div>
        </Section>
      </Container>
    </>
  )
}

export const Component = Home
