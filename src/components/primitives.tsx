import { cn } from '@/lib/cn'

/** Standard page width. Every page body sits inside one of these. */
export function Container({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('relative mx-auto max-w-[1280px] px-gutter', className)}>{children}</div>
  )
}

/**
 * Section heading: a mono label, a hairline that eats the remaining width, and
 * an optional right-hand annotation. The rule is what makes the page read as a
 * technical document rather than a stack of cards.
 */
export function SectionHead({ label, meta }: { label: string; meta?: string }) {
  return (
    <div className="mb-9 flex flex-wrap items-baseline gap-5">
      <span className="label whitespace-nowrap">{label}</span>
      <span className="h-px min-w-10 flex-1 bg-rule" />
      {meta && <span className="label whitespace-nowrap">{meta}</span>}
    </div>
  )
}

/** Standard page opener: eyebrow, title, optional standfirst. */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: string
  intro?: string
}) {
  return (
    <Container className="pt-12 pb-10 md:pt-16">
      <div className="grid-rules" />
      <p className="label relative mb-5">{eyebrow}</p>
      <h1 className="relative m-0 max-w-[18ch] text-[clamp(2rem,5.5vw,3.75rem)] leading-[0.96] font-extrabold tracking-[-0.03em] uppercase">
        {title}
      </h1>
      {intro && <p className="prose-bdr relative mt-6">{intro}</p>}
    </Container>
  )
}

export function Section({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <section className={cn('py-14 md:py-20', className)}>{children}</section>
}
