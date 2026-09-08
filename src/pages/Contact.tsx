import { Seo } from '@/components/Seo'
import { Container, PageHeader, Section, SectionHead } from '@/components/primitives'
import { site } from '@/content/site'

/**
 * No contact form. The site has no backend, and a form that silently drops
 * messages is worse than an email address. If a Flask/Supabase backend ever
 * lands, this is the page that grows a real form.
 */
const AUDIENCES = [
  {
    who: 'Yale students',
    what: 'Want to join the team? We would love to have you at our next Garage Hours event. No experience necessary.',
    action: { label: 'Interest form', href: site.links.joinForm, external: true },
  },
  {
    who: 'Educational groups',
    what: 'Interested in a tour of our garage? We are happy to arrange a visit and show you a car up close.',
    action: {
      label: `Email ${site.email}`,
      href: `mailto:${site.email}?subject=Garage tour`,
      external: false,
    },
  },
  {
    who: 'Sponsors',
    what: 'Looking to partner with Bulldogs Racing? Get in touch to discuss opportunities and we will respond promptly.',
    action: { label: 'Sponsorship packet', href: site.links.sponsorshipPacket, external: false },
  },
]

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        path="/contact"
        description={`Get in touch with Bulldogs Racing at ${site.email} — for joining the team, garage tours, or sponsorship.`}
      />
      <PageHeader
        eyebrow="Get in touch"
        title="Come find us"
        intro="Are you interested in learning more about Bulldogs Racing? Whoever you are, the fastest way to reach the team is email."
      />

      <Container>
        <div className="grid-rules" />

        <Section className="relative pt-0">
          <SectionHead label="§ 01 — Who you are" />
          <ul className="grid border-t border-l border-rule lg:grid-cols-3">
            {AUDIENCES.map((a) => (
              <li key={a.who} className="flex flex-col border-r border-b border-rule p-6">
                <h2 className="text-[1.0625rem] font-bold tracking-tight uppercase">{a.who}</h2>
                <p className="mt-3 mb-6 flex-1 font-serif text-[0.9375rem] leading-[1.6] text-ink-2">
                  {a.what}
                </p>
                <a
                  href={a.action.href}
                  {...(a.action.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="btn btn-quiet self-start"
                >
                  {a.action.label}
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section className="relative pt-0">
          <SectionHead label="§ 02 — Everywhere else" />
          <ul className="border-t border-rule">
            <li className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule py-4">
              <span className="label">Email</span>
              <a
                href={`mailto:${site.email}`}
                className="text-[0.9375rem] font-semibold hover:text-hv"
              >
                {site.email}
              </a>
            </li>
            {site.socials.map((s) => (
              <li
                key={s.url}
                className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule py-4"
              >
                <span className="label">{s.label}</span>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[0.9375rem] font-semibold hover:text-hv"
                >
                  {s.handle} <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
            <li className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule py-4">
              <span className="label">Where</span>
              <span className="text-[0.9375rem] font-semibold">
                Yale University · {site.location}
              </span>
            </li>
          </ul>
        </Section>
      </Container>
    </>
  )
}

export const Component = Contact
