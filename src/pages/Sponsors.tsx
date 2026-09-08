import { useLoaderData } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { Container, PageHeader, Section, SectionHead } from '@/components/primitives'
import { site } from '@/content/site'
import { sponsorBenefits } from '@/content/sponsors'
import { getSponsorsBySeason } from '@/lib/content'
import type { Sponsor } from '@/lib/schemas'

export async function loader() {
  return { sponsors: await getSponsorsBySeason() }
}
type LoaderData = Awaited<ReturnType<typeof loader>>

/** Wordmark tile. Swap for <img> the moment a sponsor gives us an SVG. */
function SponsorTile({ sponsor }: { sponsor: Sponsor }) {
  const inner = sponsor.logo ? (
    <img src={sponsor.logo.src} alt={sponsor.logo.alt} loading="lazy" className="max-h-10 w-auto" />
  ) : (
    <span className="text-[0.9375rem] font-semibold text-ink-2">{sponsor.name}</span>
  )

  return (
    <li className="flex flex-[1_1_220px] items-center border-r border-b border-rule p-5">
      {sponsor.url ? (
        <a
          href={sponsor.url}
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-hv"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </li>
  )
}

export default function Sponsors() {
  const { sponsors } = useLoaderData() as LoaderData

  return (
    <>
      <Seo
        title="Sponsorships"
        path="/sponsors"
        description="The work of Bulldogs Racing is made possible by generous contributions from private and corporate donors. All donations are tax-deductible."
      />
      <PageHeader
        eyebrow="Support the team"
        title="Every gift goes into the car"
        intro="The work of Bulldogs Racing is made possible by generous contributions from private and corporate donors. Donations come in all types and sizes — from cash to in-kind gifts of parts and services — and every one is integral to the success of the team."
      />

      <Container>
        <div className="grid-rules" />

        <Section className="relative">
          <SectionHead label="§ 01 — What sponsorship gets you" />
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <ul className="border-t border-rule">
              {sponsorBenefits.map((b) => (
                <li
                  key={b}
                  className="border-b border-rule py-4 font-serif text-[1rem] leading-[1.6] text-ink-2"
                >
                  {b}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3">
              <a href={site.links.sponsorshipPacket} className="btn justify-between">
                <span>Sponsorship packet {site.currentSeason}</span>
                <span aria-hidden>↓</span>
              </a>
              <a
                href={`mailto:${site.email}?subject=Sponsoring Bulldogs Racing`}
                className="btn btn-quiet justify-between"
              >
                <span>Talk to us</span>
                <span aria-hidden>→</span>
              </a>
              <p className="label mt-2 normal-case">
                Contact {site.email} and we will respond promptly.
              </p>
            </div>
          </div>
        </Section>

        <Section className="relative">
          <SectionHead
            label={`§ 02 — Thank you to the supporters of this season`}
            meta={`${sponsors.current.length} supporters`}
          />
          <ul className="flex flex-wrap border-t border-l border-rule">
            {sponsors.current.map((s) => (
              <SponsorTile key={s.name} sponsor={s} />
            ))}
          </ul>
        </Section>

        <Section className="relative">
          <SectionHead
            label="§ 03 — Previous sponsors"
            meta={`${sponsors.previous.length} organisations`}
          />
          <ul className="flex flex-wrap border-t border-l border-rule">
            {sponsors.previous.map((s) => (
              <SponsorTile key={s.name} sponsor={s} />
            ))}
          </ul>
          <p className="prose-bdr mt-8">
            We thank all our previous sponsors for their support in seasons prior. We would not have
            been able to undertake our numerous projects without their generous donations.
          </p>
        </Section>
      </Container>
    </>
  )
}

export const Component = Sponsors
