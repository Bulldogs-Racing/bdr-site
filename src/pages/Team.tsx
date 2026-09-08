import { useLoaderData } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { Container, PageHeader, Section, SectionHead } from '@/components/primitives'
import { site } from '@/content/site'
import { getTeamByGroup } from '@/lib/content'
import type { TeamMember } from '@/lib/schemas'

export async function loader() {
  return { groups: await getTeamByGroup() }
}
type LoaderData = Awaited<ReturnType<typeof loader>>

/** Initials stand in until photos land in public/media/team/. */
function initials(name: string) {
  return name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <li className="border-r border-b border-rule p-6">
      <div className="mb-4 flex aspect-[4/5] items-center justify-center overflow-hidden bg-raise">
        {member.photo ? (
          <img
            src={member.photo.src}
            alt={member.photo.alt}
            width={member.photo.width}
            height={member.photo.height}
            loading="lazy"
            className="size-full object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="font-mono text-[2.5rem] font-medium tracking-[0.05em] text-line/35 select-none"
          >
            {initials(member.name)}
          </span>
        )}
      </div>
      <h3 className="text-[1.0625rem] font-bold tracking-tight">{member.name}</h3>
      <p className="label mt-1.5">{member.role}</p>
      {member.bio && (
        <p className="mt-3 font-serif text-[0.9375rem] leading-[1.55] text-ink-2">{member.bio}</p>
      )}
    </li>
  )
}

export default function Team() {
  const { groups } = useLoaderData() as LoaderData

  const sections = [
    { key: 'board', label: '§ 01 — Leadership board', members: groups.board },
    { key: 'leads', label: '§ 02 — Subteam leads', members: groups.leads },
    { key: 'advisors', label: '§ 03 — Advisors', members: groups.advisors },
  ]

  return (
    <>
      <Seo
        title="Team"
        path="/team"
        description={`The ${site.currentSeason} Bulldogs Racing leadership board, subteam leads and advisors.`}
      />
      <PageHeader
        eyebrow={`${site.currentSeason} leadership`}
        title="The people who build it"
        intro="Bulldogs Racing recruits from across all of Yale's academic disciplines and programmes. Team members gain real-world experience in engineering and business by replicating a professional racing team."
      />

      <Container>
        <div className="grid-rules" />
        {sections.map(({ key, label, members }) => (
          <Section key={key} className="relative">
            <SectionHead
              label={label}
              meta={`${members.length} ${members.length === 1 ? 'person' : 'people'}`}
            />
            <ul className="grid border-t border-l border-rule sm:grid-cols-2 lg:grid-cols-4">
              {members.map((m) => (
                <MemberCard key={m.slug} member={m} />
              ))}
            </ul>
          </Section>
        ))}
      </Container>
    </>
  )
}

export const Component = Team
