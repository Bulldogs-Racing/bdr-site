import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { Container } from '@/components/primitives'
import { site } from '@/content/site'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="That page does not exist." />
      <Container className="py-24 md:py-36">
        <div className="grid-rules" />
        <p className="label relative">Error 404</p>
        <h1 className="relative mt-5 max-w-[16ch] text-[clamp(2rem,6vw,4rem)] leading-[0.96] font-extrabold tracking-[-0.03em] uppercase">
          Off the racing line
        </h1>
        <p className="prose-bdr relative mt-6">
          That page does not exist. It may have moved when we rebuilt the site off WordPress.
        </p>
        <div className="relative mt-8 flex flex-wrap gap-3">
          <Link to="/" className="btn">
            Back to the start
          </Link>
          <a href={`mailto:${site.email}`} className="btn btn-quiet">
            Tell us what broke
          </a>
        </div>
      </Container>
    </>
  )
}

export const Component = NotFound
