import { Link } from 'react-router-dom'
import type { Car } from '@/lib/schemas'
import { cn } from '@/lib/cn'

const CLASS_LABEL: Record<Car['class'], string> = {
  combustion: 'Combustion',
  hybrid: 'Hybrid',
  electric: 'Electric',
}

/**
 * One car in the timeline. A row, not a card -- the year column gives the list
 * a spine, and a grid of cards would lose the chronology that is the point.
 */
export function CarRow({ car }: { car: Car }) {
  const inBuild = car.status === 'in-build'

  return (
    <Link
      to={`/cars/${car.slug}`}
      className="grid grid-cols-[70px_1fr] items-baseline gap-4 border-b border-rule py-6 transition-colors hover:bg-line/5 md:grid-cols-[96px_1fr_250px] md:gap-10"
    >
      <span className="font-mono text-[1.375rem] font-medium tracking-[0.02em] text-line tabular-nums">
        {car.year}
      </span>

      <div>
        <div className="mb-2 flex flex-wrap items-baseline gap-3">
          <h3 className="m-0 text-[1.0625rem] font-bold tracking-tight">{car.name}</h3>
          <span className={cn('pill', (inBuild || car.class === 'electric') && 'pill-live')}>
            {inBuild ? '● In build' : CLASS_LABEL[car.class]}
          </span>
        </div>
        <p className="m-0 max-w-[56ch] font-serif text-[0.9375rem] leading-[1.55] text-ink-2">
          {car.summary}
        </p>
      </div>

      <div className="col-start-2 font-mono text-[0.6875rem] leading-[1.7] tracking-[0.12em] text-ink-3 uppercase md:col-start-3 md:text-right">
        {car.results.length > 0 ? (
          car.results.map((r) => (
            <div key={r.text} className={r.highlight ? 'text-hv' : undefined}>
              {r.text}
            </div>
          ))
        ) : (
          <div>{inBuild ? 'In build' : '—'}</div>
        )}
      </div>
    </Link>
  )
}
