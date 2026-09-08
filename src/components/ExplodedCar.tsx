import { useCallback, useId, useState } from 'react'
import { cn } from '@/lib/cn'

/**
 * Interactive exploded side elevation of the car.
 *
 * Hand-authored SVG rather than a 3D model or a photo composite: it needs no
 * CAD export pipeline, weighs a few kB, scales to any viewport, and sits in the
 * same technical-drawing register as the rest of the site.
 *
 * HOW IT WORKS
 * Each removable assembly is one <g class="part"> carrying its own explode
 * vector in CSS custom properties (--dx / --dy). Hovering, focusing, or the
 * "explode all" toggle applies `transform: translate(var(--dx), var(--dy))`.
 * The callout label lives inside the same group, so its leader line stays
 * attached to the part as it moves.
 *
 * TO REPLACE THE ARTWORK with real geometry: keep the group structure and the
 * PARTS array, and swap the `d` attributes for paths traced from a CAD side
 * elevation. Nothing else in the component needs to change.
 *
 * TO ADD A PART: add an entry to PARTS and a matching <g> below.
 */

type PartId = 'front-wing' | 'nose' | 'front-corner' | 'sidepod' | 'accumulator' | 'rear-wing'

interface Part {
  id: PartId
  /** Bill-of-materials index. These are a real parts list, hence the numbering. */
  index: string
  label: string
  detail: string
  /** Explode vector in SVG user units. */
  dx: number
  dy: number
}

const PARTS: Part[] = [
  {
    id: 'front-wing',
    index: '01',
    label: 'Front wing',
    detail: '3-element · CFRP',
    dx: -165,
    dy: 60,
  },
  {
    id: 'nose',
    index: '02',
    label: 'Nose + attenuator',
    detail: 'Impact structure · FSAE T3.2',
    dx: -118,
    dy: -58,
  },
  {
    id: 'front-corner',
    index: '03',
    label: 'Front corner',
    detail: 'Upright · hub · 10 in wheel',
    dx: -34,
    dy: 132,
  },
  {
    id: 'sidepod',
    index: '04',
    label: 'Sidepod',
    detail: 'Radiator · fans · ducting',
    dx: 12,
    dy: 128,
  },
  {
    id: 'accumulator',
    index: '05',
    label: 'Accumulator',
    detail: '192 V · 3.6 kWh · segmented',
    dx: 34,
    dy: -152,
  },
  {
    id: 'rear-wing',
    index: '06',
    label: 'Rear wing',
    detail: '3-element · endplates',
    dx: 126,
    dy: -84,
  },
]

const partStyle = (part: Part) =>
  ({ '--dx': `${part.dx}px`, '--dy': `${part.dy}px` }) as React.CSSProperties

export interface ExplodedCarProps {
  /** Caption in the diagram's title bar, e.g. 'Fig. 1 — BR25 assembly'. */
  figure?: string
  className?: string
}

export function ExplodedCar({
  figure = 'Fig. 1 — Assembly, side elevation',
  className,
}: ExplodedCarProps) {
  const [exploded, setExploded] = useState(false)
  // Parts popped individually. Hover covers pointer users; this covers touch and
  // keyboard, where there is no hover to rely on.
  const [active, setActive] = useState<ReadonlySet<PartId>>(() => new Set())
  const titleId = useId()

  const toggleAll = useCallback(() => setExploded((v) => !v), [])
  const togglePart = useCallback((id: PartId) => {
    setActive((prev) => {
      const next = new Set(prev)
      if (!next.delete(id)) next.add(id)
      return next
    })
  }, [])

  return (
    <div
      className={cn(
        'border-y border-rule bg-sheet',
        'bg-[radial-gradient(120%_90%_at_50%_30%,rgb(10_74_150/0.20),transparent_68%)]',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-4 border-b border-rule-soft px-gutter py-3">
        <span className="label">{figure}</span>
        <span className="flex-1" />
        <span className="label text-ink-2 max-sm:hidden">Hover a component</span>
        <button type="button" className="btn" onClick={toggleAll} aria-pressed={exploded}>
          {exploded ? 'Reassemble' : 'Explode all'}
        </button>
      </div>

      <div className="overflow-x-auto px-gutter pt-2 pb-5">
        <svg
          viewBox="-90 -50 1500 660"
          role="img"
          aria-labelledby={titleId}
          className={cn('block h-auto w-full min-w-[680px]', exploded && 'is-exploded')}
        >
          <title id={titleId}>
            Exploded side elevation of the car, showing six removable assemblies: front wing, nose
            and impact attenuator, front corner, sidepod, high-voltage accumulator, and rear wing.
          </title>

          {/* ---------- chassis: the part that never moves ---------- */}
          <g className="chassis">
            <polyline points="430,300 555,302 752,300 868,297" />
            <polyline className="thin" points="432,266 555,268 752,266 866,264" />
            <line x1="430" y1="232" x2="430" y2="300" />
            <line x1="430" y1="232" x2="545" y2="152" />
            <path d="M545,152 C548,210 552,258 555,302" />
            <line x1="545" y1="152" x2="745" y2="112" />
            <path d="M745,112 C748,180 750,246 752,300" />
            <line x1="747" y1="136" x2="884" y2="290" />
            <polyline points="750,214 868,204 868,297" />
            <line className="thin" x1="750" y1="252" x2="868" y2="246" />
            <line className="thin" x1="430" y1="300" x2="545" y2="152" />
            <line className="thin" x1="555" y1="268" x2="745" y2="112" />
            <line className="thin" x1="555" y1="302" x2="640" y2="266" />
            {/* rear corner stays with the chassis so the car still reads as a car */}
            <circle cx="910" cy="268" r="82" />
            <circle className="hub" cx="910" cy="268" r="44" />
            <circle className="thin" cx="910" cy="268" r="13" />
            <polyline className="thin" points="868,246 890,262 868,290" />
            {/* driver, for scale */}
            <circle className="thin" cx="644" cy="182" r="33" />
            <path className="thin" d="M614,196 C598,232 596,262 606,290" />
            <path className="thin" d="M672,196 C700,214 712,236 716,258" />
            {/* rear wing mounts */}
            <polyline className="thin" points="866,222 972,196 1046,178" />
            <line className="thin" x1="884" y1="290" x2="1000" y2="212" />
          </g>

          <PartGroup
            part={PARTS[0]!}
            active={active}
            onToggle={togglePart}
            calloutAnchor={[150, 344]}
            calloutTo={[150, 382]}
            textAt={[104, 404]}
          >
            <path className="pl" d="M104,318 C150,308 214,310 262,320 C214,334 150,336 104,330 Z" />
            <path className="pl nofill" d="M112,304 C158,296 208,298 246,306" />
            <path className="pl nofill" d="M126,290 C166,283 204,285 234,292" />
            <path className="pl nofill" d="M262,286 L266,338" />
          </PartGroup>

          <PartGroup
            part={PARTS[1]!}
            active={active}
            onToggle={togglePart}
            calloutAnchor={[286, 252]}
            calloutTo={[286, 206]}
            textAt={[180, 192]}
            above
          >
            <path
              className="pl"
              d="M428,230 C368,240 300,250 246,266 C216,275 196,284 190,292 C198,300 224,306 262,309 C330,314 388,312 428,302 Z"
            />
            <path className="pl nofill" d="M246,266 C268,282 268,296 262,309" />
            <path className="pl nofill" d="M334,254 L332,311" />
          </PartGroup>

          <PartGroup
            part={PARTS[2]!}
            active={active}
            onToggle={togglePart}
            calloutAnchor={[290, 354]}
            calloutTo={[290, 396]}
            textAt={[222, 418]}
          >
            <circle className="pl nofill" cx="290" cy="268" r="82" />
            <circle className="pl" cx="290" cy="268" r="44" />
            <circle className="pl nofill" cx="290" cy="268" r="13" />
            <polyline className="pl nofill" points="332,246 396,240 400,262" />
            <polyline className="pl nofill" points="332,292 398,300 402,282" />
          </PartGroup>

          <PartGroup
            part={PARTS[3]!}
            active={active}
            onToggle={togglePart}
            calloutAnchor={[700, 330]}
            calloutTo={[700, 374]}
            textAt={[620, 396]}
          >
            <path
              className="pl"
              d="M566,252 C606,240 686,236 758,240 C812,243 842,252 846,272 C850,296 834,314 806,317 L604,317 C574,315 562,300 562,282 Z"
            />
            <path className="pl nofill" d="M596,254 L596,314" />
            <path className="pl nofill" d="M614,258 L614,312" />
            <path className="pl nofill" d="M632,260 L632,311" />
            <path className="pl nofill" d="M758,240 C766,268 764,296 756,317" />
          </PartGroup>

          <PartGroup
            part={PARTS[4]!}
            active={active}
            onToggle={togglePart}
            calloutAnchor={[880, 250]}
            calloutTo={[932, 250]}
            textAt={[944, 244]}
            side
          >
            <path className="pl" d="M758,216 L866,208 L866,290 L758,296 Z" />
            <path className="pl nofill" d="M785,213 L785,294" />
            <path className="pl nofill" d="M812,211 L812,292" />
            <path className="pl nofill" d="M839,209 L839,291" />
            {/* The one place orange appears before any interaction: it is the
                high-voltage marking, which on a real car is always visible. */}
            <text className="hv-tag" x="762" y="196">
              HV
            </text>
          </PartGroup>

          <PartGroup
            part={PARTS[5]!}
            active={active}
            onToggle={togglePart}
            calloutAnchor={[1130, 122]}
            calloutTo={[1130, 84]}
            textAt={[1046, 66]}
            above
          >
            <path
              className="pl"
              d="M1040,180 C1090,170 1160,168 1206,174 C1160,190 1090,196 1040,194 Z"
            />
            <path className="pl nofill" d="M1052,160 C1100,150 1158,148 1198,152" />
            <path className="pl nofill" d="M1068,140 C1110,132 1156,130 1190,133" />
            <path className="pl nofill" d="M1206,120 L1214,200" />
            <path className="pl nofill" d="M1040,132 L1044,198" />
          </PartGroup>
        </svg>
      </div>

      <ol className="sr-only">
        {PARTS.map((p) => (
          <li key={p.id}>
            {p.index} {p.label} — {p.detail}
          </li>
        ))}
      </ol>
    </div>
  )
}

interface PartGroupProps {
  part: Part
  active: ReadonlySet<PartId>
  onToggle: (id: PartId) => void
  /** Where the leader line starts, in original (unexploded) coordinates. */
  calloutAnchor: [number, number]
  calloutTo: [number, number]
  textAt: [number, number]
  /** Stack the detail line above the label instead of below. */
  above?: boolean
  /** Callout sits to the side, so the detail line goes below without crowding. */
  side?: boolean
  children: React.ReactNode
}

function PartGroup({
  part,
  active,
  onToggle,
  calloutAnchor,
  calloutTo,
  textAt,
  above,
  side,
  children,
}: PartGroupProps) {
  const [tx, ty] = textAt
  const detailY = above && !side ? ty - 20 : ty + 20
  const isActive = active.has(part.id)

  // SVG elements are not buttons, so the keyboard contract has to be written out.
  const onKeyDown = (event: React.KeyboardEvent<SVGGElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onToggle(part.id)
    }
  }

  return (
    <g
      className={cn('part', isActive && 'is-active')}
      style={partStyle(part)}
      tabIndex={0}
      role="button"
      aria-pressed={isActive}
      aria-label={`${part.label}: ${part.detail}`}
      onClick={() => onToggle(part.id)}
      onKeyDown={onKeyDown}
    >
      {children}
      <g className="callout">
        <line x1={calloutAnchor[0]} y1={calloutAnchor[1]} x2={calloutTo[0]} y2={calloutTo[1]} />
        <text x={tx} y={ty}>
          {part.index} · {part.label}
        </text>
        <text className="sub" x={tx} y={detailY}>
          {part.detail}
        </text>
      </g>
    </g>
  )
}
