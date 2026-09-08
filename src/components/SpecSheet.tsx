import type { Spec } from '@/lib/schemas'

/**
 * A car's spec table. Deliberately a definition list, not a card grid: the
 * numbers are the content, and a table is how engineers expect to read them.
 */
export function SpecSheet({ title, meta, specs }: { title: string; meta?: string; specs: Spec[] }) {
  if (specs.length === 0) return null

  return (
    <div className="border border-rule bg-sheet">
      <div className="flex items-center justify-between gap-3 border-b border-rule bg-raise px-[18px] py-3.5">
        <b className="text-[1.05rem] font-extrabold tracking-tight">{title}</b>
        {meta && <span className="label">{meta}</span>}
      </div>
      <dl className="grid grid-cols-[auto_1fr]">
        {specs.map((spec, i) => {
          const last = i === specs.length - 1
          const edge = last ? '' : 'border-b border-rule-soft'
          return (
            <div key={spec.label} className="contents">
              <dt
                className={`label flex items-center px-[18px] py-[11px] whitespace-nowrap ${edge}`}
              >
                {spec.label}
              </dt>
              <dd
                className={`m-0 flex items-center justify-end px-[18px] py-[11px] text-right text-[0.9375rem] font-semibold tabular-nums ${edge}`}
              >
                {spec.value}
                {spec.unit && (
                  <span className="ml-[5px] text-[0.8125rem] font-normal text-ink-3">
                    {spec.unit}
                  </span>
                )}
              </dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
