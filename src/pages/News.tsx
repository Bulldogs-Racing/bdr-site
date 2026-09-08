import { useLoaderData } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { Container, PageHeader, Section, SectionHead } from '@/components/primitives'
import { site } from '@/content/site'
import { getNewsletters } from '@/lib/content'

export async function loader() {
  return { newsletters: await getNewsletters() }
}
type LoaderData = Awaited<ReturnType<typeof loader>>

const fmt = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })

export default function News() {
  const { newsletters } = useLoaderData() as LoaderData

  return (
    <>
      <Seo
        title="News"
        path="/news"
        description="Newsletters and updates from Bulldogs Racing, Yale's Formula SAE team."
      />
      <PageHeader
        eyebrow="Newsletter"
        title="Updates from the garage"
        intro="We write a newsletter a few times a season — build progress, competition reports, and what the team is learning. Issues are published through Mailchimp; each one opens in the archive."
      />

      <Container>
        <div className="grid-rules" />

        <Section className="relative pt-0">
          <div className="mb-10 flex flex-wrap gap-3 border border-rule bg-sheet p-6">
            <div className="flex-1">
              <h2 className="text-[1.0625rem] font-bold tracking-tight uppercase">Subscribe</h2>
              <p className="prose-bdr mt-2 text-[0.9375rem]">
                Get the newsletter in your inbox. No spam, a handful of emails a year.
              </p>
            </div>
            <a
              href={site.links.newsletterSignup}
              target="_blank"
              rel="noreferrer"
              className="btn self-center"
            >
              Sign up
            </a>
          </div>

          <SectionHead label="§ 01 — Archive" meta={`${newsletters.length} issues`} />
          <ul className="border-t border-rule">
            {newsletters.map((n) => (
              <li key={n.slug}>
                <a
                  href={n.url}
                  target="_blank"
                  rel="noreferrer"
                  className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-rule py-5 transition-colors hover:bg-line/5"
                >
                  <div>
                    <h3 className="text-[1.0625rem] font-bold tracking-tight">{n.title}</h3>
                    {n.excerpt && (
                      <p className="mt-1.5 max-w-[62ch] font-serif text-[0.9375rem] text-ink-2">
                        {n.excerpt}
                      </p>
                    )}
                  </div>
                  <span className="label whitespace-nowrap">
                    {fmt.format(new Date(`${n.date}T00:00:00Z`))} <span aria-hidden>↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Section>
      </Container>
    </>
  )
}

export const Component = News
