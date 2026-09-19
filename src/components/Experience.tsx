import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { categories, pins, type CategoryId } from '../data/pins'
import { ledger } from '../data/content'
import { DetailCard } from './DetailCard'
// The map library is the heaviest thing on the page; load it after the first paint.
const ExperienceMap = lazy(() => import('./ExperienceMap').then((m) => ({ default: m.ExperienceMap })))
import '../styles/map.css'

const defaultVisible = () => new Set(categories.filter((c) => c.defaultOn).map((c) => c.id))

/** `#experience?filter=industry,projects&select=aws` scrolls to the map with that state applied. */
function parseHash() {
  const [path, query = ''] = window.location.hash.slice(1).split('?')
  if (path !== 'experience') return null
  const q = new URLSearchParams(query)
  const filter = (q.get('filter') ?? '')
    .split(',')
    .filter((f): f is CategoryId => categories.some((c) => c.id === f))
  return { filter, select: q.get('select') }
}

export function Experience() {
  const [visible, setVisible] = useState<Set<CategoryId>>(defaultVisible)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = useMemo(() => pins.find((p) => p.id === selectedId) ?? null, [selectedId])

  const applyHash = useCallback(() => {
    const h = parseHash()
    if (!h) return
    setVisible((prev) => {
      const next = h.filter.length ? new Set(h.filter) : new Set(prev)
      const target = pins.find((p) => p.id === h.select)
      if (target) next.add(target.category)
      return next
    })
    if (h.select && pins.some((p) => p.id === h.select)) setSelectedId(h.select)
    const target = h.select ? document.querySelector('.mapshell') : document.getElementById('experience')
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    if (window.location.hash.startsWith('#experience?')) applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [applyHash])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelectedId(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const toggle = (id: CategoryId) => {
    setVisible((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
    if (selected?.category === id && visible.has(id)) setSelectedId(null)
  }

  const listed = pins.filter((p) => visible.has(p.category))

  return (
    <section className="section" id="experience" aria-labelledby="experience-h">
      <div className="wrap">
        <div className="section__head">
          <span>
            <b>03</b>Experience
          </span>
          <span className="meta">Seattle, WA · {pins.filter((p) => !p.placeholder).length} landmarks</span>
        </div>

        <div className="exp__intro">
          <h2 className="h2" id="experience-h" style={{ maxWidth: '16ch' }}>
            Four places I&rsquo;ve built things, <em>mapped.</em>
          </h2>
          <p>
            Each landmark stands in for a role or project. Pick one to fly there, or use the filters to change what&rsquo;s on
            the map.
          </p>
        </div>

        <div className="filters" role="group" aria-label="Filter experience by type">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className="chip"
              aria-pressed={visible.has(c.id)}
              style={{ ['--dot' as string]: c.color }}
              onClick={() => toggle(c.id)}
            >
              <i />
              {c.label}
            </button>
          ))}
        </div>

        <div className="mapshell">
          <Suspense fallback={<div className="mapstage" />}>
            <ExperienceMap pins={pins} visible={visible} selectedId={selectedId} onSelect={setSelectedId} />
          </Suspense>

          <aside className={`mappanel ${selected ? '' : 'is-empty'}`} aria-live="polite" aria-label="Experience details">
            {selected ? (
              <>
                <button type="button" className="panel-close" onClick={() => setSelectedId(null)} aria-label="Close details">
                  esc ×
                </button>
                <DetailCard
                  key={selected.id}
                  org={selected.org}
                  title={selected.title}
                  description={selected.description}
                  highlights={selected.highlights}
                  tags={selected.tags}
                  media={selected.photo ?? 'placeholder'}
                  mediaCaption={selected.landmark}
                  heading="h3"
                />
              </>
            ) : (
              <div className="panel-empty">
                <span className="panel-empty__label">Nothing selected</span>
                <p>Choose a landmark on the map to see what I did there.</p>
                <ul>
                  {listed.map((p) => (
                    <li key={p.id}>
                      <button type="button" onClick={() => setSelectedId(p.id)}>
                        {p.short}
                        <span>{p.landmark}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
        <p className="hint-mobile">Tap a landmark to open it. Use two fingers to move the map.</p>

        <div className="ledger">
          <div className="ledger__title">
            <span>More from the ledger</span>
            <span>Roles that didn&rsquo;t get a landmark</span>
          </div>
          {ledger.map((r) => (
            <div className="ledger__row" key={r.org}>
              <span className="ledger__org">{r.org}</span>
              <span className="ledger__role">{r.role}</span>
              <span className="ledger__note">{r.note}</span>
              <span className="ledger__when">
                {r.when}
                <small>{r.place}</small>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
