import { useLoaderData } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { CarRow } from '@/components/CarRow'
import { Container, PageHeader, Section, SectionHead } from '@/components/primitives'
import { getCars } from '@/lib/content'

export async function loader() {
  return { cars: await getCars() }
}
type LoaderData = Awaited<ReturnType<typeof loader>>

export default function Cars() {
  const { cars } = useLoaderData() as LoaderData
  const electric = cars.filter((c) => c.class === 'electric')

  return (
    <>
      <Seo
        title="Cars"
        path="/cars"
        description="Every car Bulldogs Racing has built since 2006, from the first Formula SAE Hybrid entry to the all-electric BR25."
      />
      <PageHeader
        eyebrow="2007 → present"
        title="Every car we've built"
        intro="Eight cars, two drivetrain eras, one championship. Hybrid from 2007 to 2014, all-electric ever since."
      />

      <Container>
        <div className="grid-rules" />
        <Section className="relative pt-0">
          <SectionHead
            label="§ 01 — Chronology"
            meta={`${cars.length} cars · ${electric.length} electric`}
          />
          <div className="border-t border-rule">
            {cars.map((car) => (
              <CarRow key={car.slug} car={car} />
            ))}
          </div>
        </Section>
      </Container>
    </>
  )
}

export const Component = Cars
