import { useLoaderData } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { Container, PageHeader, Section, SectionHead } from '@/components/primitives'
import { getAlumni } from '@/lib/content'

export async function loader() {
  return { alumni: await getAlumni() }
}
type LoaderData = Awaited<ReturnType<typeof loader>>

export default function Alumni() {
  const { alumni } = useLoaderData() as LoaderData

  return (
    <>
      <Seo
        title="Alumni"
        path="/alumni"
        description="Bulldogs Racing alumni work at SpaceX, Apple, Tesla, Google, the European Space Agency, and on university faculties."
      />
      <PageHeader
        eyebrow="Where the team goes"
        title="Alumni"
        intro="Members gain real-world experience in engineering and business by replicating a professional racing team. After graduation, they go on to become leaders in their respective fields."
      />

      <Container>
        <div className="grid-rules" />
        <Section className="relative pt-0">
          <SectionHead label="§ 01 — Roll" meta={`${alumni.length} listed`} />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-y border-rule">
                  <th className="label py-3 pr-4 font-medium">Name</th>
                  <th className="label py-3 pr-4 font-medium">Major · Class</th>
                  <th className="label py-3 pr-4 font-medium">On the team</th>
                  <th className="label py-3 font-medium">Since</th>
                </tr>
              </thead>
              <tbody>
                {alumni.map((a) => (
                  <tr
                    key={a.name}
                    className="border-b border-rule-soft transition-colors hover:bg-line/5"
                  >
                    <td className="py-3.5 pr-4 text-[0.9375rem] font-bold whitespace-nowrap">
                      {a.name}
                    </td>
                    <td className="py-3.5 pr-4 text-[0.875rem] text-ink-2">
                      {a.major}
                      {a.classYear && <span className="text-ink-3"> · {a.classYear}</span>}
                    </td>
                    <td className="py-3.5 pr-4 font-mono text-[0.75rem] tracking-[0.1em] text-ink-3 uppercase">
                      {a.teamRole ?? '—'}
                    </td>
                    <td className="py-3.5 text-[0.875rem]">
                      {a.currentRole && <span className="text-ink-2">{a.currentRole}</span>}
                      {a.currentRole && a.currentOrg && <span className="text-ink-3"> · </span>}
                      {a.currentOrg && (
                        <span className="font-semibold text-line">{a.currentOrg}</span>
                      )}
                      {!a.currentRole && !a.currentOrg && <span className="text-ink-3">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="label mt-6">
            An alumnus and we have you wrong, or missing? Email us and we&rsquo;ll fix it.
          </p>
        </Section>
      </Container>
    </>
  )
}

export const Component = Alumni
