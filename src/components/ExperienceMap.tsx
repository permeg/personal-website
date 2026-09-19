import { useEffect, useRef } from 'react'
import * as maplibregl from 'maplibre-gl'
// Vite bundles the worker (and the shared module it imports) into one file and hands back its URL.
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import 'maplibre-gl/dist/maplibre-gl.css'
import { buildStyle } from '../map/style'
import { districtLabelTweaks, icons, landmarks, shields, waterLabels } from '../map/features'
import { categories, type CategoryId, type Pin } from '../data/pins'

interface Props {
  pins: Pin[]
  visible: Set<CategoryId>
  selectedId: string | null
  onSelect: (id: string | null) => void
}

// The "Whole city" view; the map opens fitted to the pins instead.
const CITY_BOUNDS: [[number, number], [number, number]] = [
  [-122.445, 47.492],
  [-122.2, 47.738],
]
const PIN_ZOOM = 14
const fitPadding = () =>
  window.matchMedia('(max-width: 600px)').matches
    ? { top: 64, bottom: 56, left: 36, right: 36 }
    : { top: 90, bottom: 80, left: 80, right: 130 }

const pinBounds = (list: Pin[]) => {
  const b = new maplibregl.LngLatBounds()
  for (const p of list) b.extend([p.coords.lng, p.coords.lat])
  return b
}

const base = import.meta.env.BASE_URL
maplibregl.setWorkerUrl(workerUrl)
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)

export function ExperienceMap({ pins, visible, selectedId, onSelect }: Props) {
  const host = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const pinEls = useRef(new Map<string, HTMLButtonElement>())
  const onSelectRef = useRef(onSelect)
  onSelectRef.current = onSelect
  const pinsRef = useRef(pins)
  pinsRef.current = pins

  // Create the map once.
  useEffect(() => {
    if (!host.current) return
    const container = host.current
    const m = new maplibregl.Map({
      container,
      style: buildStyle(base),
      bounds: pinBounds(pinsRef.current),
      fitBoundsOptions: { padding: fitPadding() },
      maxBounds: [
        [-122.62, 47.42],
        [-122.1, 47.83],
      ],
      minZoom: 9.6,
      maxZoom: 16.5,
      attributionControl: { compact: true },
      cooperativeGestures: true,
      dragRotate: false,
      pitchWithRotate: false,
      touchPitch: false,
    })
    map.current = m
    if (import.meta.env.DEV) {
      ;(window as unknown as { __map: maplibregl.Map }).__map = m
      m.on('error', (e) => console.warn('[map]', e.error?.message ?? e))
    }
    m.touchZoomRotate.disableRotation()
    m.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')

    const markers: maplibregl.Marker[] = []
    const addMarker = (el: HTMLElement, lng: number, lat: number, opts: maplibregl.MarkerOptions = {}) => {
      const mk = new maplibregl.Marker({ element: el, anchor: 'center', ...opts }).setLngLat([lng, lat]).addTo(m)
      markers.push(mk)
      return mk
    }

    // Water labels, landmarks, shields
    const waterEls = waterLabels.map((w) => {
      const el = document.createElement('div')
      el.className = 'water-label'
      el.style.fontSize = `${w.size}px`
      el.innerHTML = `<span>${esc(w.text)}</span>`
      addMarker(el, w.lng, w.lat, { rotation: w.rotate, rotationAlignment: 'viewport' })
      return { el, minZoom: w.minZoom ?? 0 }
    })
    for (const l of landmarks) {
      const el = document.createElement('div')
      el.className = 'lm'
      el.innerHTML = `${icons[l.icon]}<span>${esc(l.name)}</span>`
      el.setAttribute('aria-hidden', 'true')
      addMarker(el, l.lng, l.lat)
    }
    for (const s of shields) {
      const el = document.createElement('div')
      el.className = `shield shield--${s.kind}`
      el.setAttribute('aria-hidden', 'true')
      const shape =
        s.kind === 'interstate'
          ? '<path d="M11 1.2c2 1.4 4.6 1.6 8 1.3.6 6.4-.6 13.2-8 18.3C3.6 15.7 2.4 8.9 3 2.5c3.4.3 6-.1 8-1.3z" fill="#1c2a44" stroke="#6b7d9e" stroke-width="1"/><path d="M3.2 2.6c3.4.3 6-.1 7.8-1.4 2 1.3 4.6 1.7 8 1.4.1 1.2.1 2.5.05 3.7H3.15C3.1 5 3.1 3.8 3.2 2.6z" fill="#5a2a2c"/>'
          : '<circle cx="12" cy="11" r="9.6" fill="#161b22" stroke="#7d8791" stroke-width="1"/>'
      el.innerHTML = `<svg viewBox="0 0 ${s.kind === 'interstate' ? 22 : 24} 22" preserveAspectRatio="none">${shape}</svg><b>${esc(s.ref)}</b>`
      addMarker(el, s.lng, s.lat)
    }

    // District labels come from the same data that paints the zones.
    fetch(`${base}data/districts.geojson`)
      .then((r) => r.json())
      .then((fc: { features: { properties?: Record<string, unknown> }[] }) => {
        if (map.current !== m) return
        for (const f of fc.features) {
          const name = f.properties?.name as string
          const [lng, lat] = f.properties?.label as [number, number]
          const t = districtLabelTweaks[name] ?? {}
          if (t.hide) continue
          const el = document.createElement('div')
          el.className = `district-label${t.minor ? ' is-minor' : ''}`
          el.style.fontSize = `${t.size ?? 11}px`
          el.innerHTML = `<span>${esc(name === 'International District' ? 'Int’l District' : name)}</span>`
          el.setAttribute('aria-hidden', 'true')
          addMarker(el, lng + (t.dx ?? 0), lat + (t.dy ?? 0), { rotation: t.rotate ?? 0, rotationAlignment: 'viewport' })
        }
      })
      .catch(() => {})

    // Experience pins
    for (const p of pinsRef.current) {
      const cat = categories.find((c) => c.id === p.category)!
      const el = document.createElement('button')
      el.type = 'button'
      el.className = p.labelSide === 'left' ? 'pin pin--left' : 'pin'
      el.dataset.pin = p.id
      el.style.setProperty('--pin', cat.color)
      el.setAttribute('aria-label', `${p.short} — ${p.title}`)
      el.innerHTML = `<span class="pin__dot"></span><span class="pin__label">${esc(p.short)}</span>`
      el.addEventListener('click', (e) => {
        e.stopPropagation()
        onSelectRef.current(p.id)
      })
      pinEls.current.set(p.id, el)
      addMarker(el, p.coords.lng, p.coords.lat)
    }

    const onZoom = () => {
      const z = m.getZoom()
      container.classList.toggle('is-close', z >= 13.1)
      container.classList.toggle('is-mid', z >= 11.5)
      container.classList.toggle('is-far', z < 11)
      for (const w of waterEls) w.el.classList.toggle('is-off', z < w.minZoom)
    }
    m.on('zoom', onZoom)
    m.on('load', onZoom)
    onZoom()

    // Expose view helpers to the control buttons via custom events.
    const fitCity = () => m.fitBounds(CITY_BOUNDS, { padding: 12, duration: reduceMotion() ? 0 : 1200 })
    const fitPins = () => {
      const shown = pinsRef.current.filter((p) => pinEls.current.get(p.id)?.classList.contains('is-hidden') === false)
      if (shown.length) m.fitBounds(pinBounds(shown), { padding: fitPadding(), maxZoom: 13.6, duration: reduceMotion() ? 0 : 1200 })
    }
    container.addEventListener('map:city', fitCity)
    container.addEventListener('map:pins', fitPins)

    return () => {
      container.removeEventListener('map:city', fitCity)
      container.removeEventListener('map:pins', fitPins)
      markers.forEach((k) => k.remove())
      pinEls.current.clear()
      m.remove()
      map.current = null
    }
  }, [])

  // Category filters show/hide pins.
  useEffect(() => {
    for (const p of pins) pinEls.current.get(p.id)?.classList.toggle('is-hidden', !visible.has(p.category))
  }, [pins, visible])

  // Selection: style the pin and fly the camera to it.
  useEffect(() => {
    pinEls.current.forEach((el, id) => {
      el.classList.toggle('is-selected', id === selectedId)
      el.setAttribute('aria-pressed', String(id === selectedId))
    })
    const pin = pins.find((p) => p.id === selectedId)
    const m = map.current
    if (!pin || !m) return
    // On phones the details sheet covers the lower ~60% of the map; keep the pin above it.
    const sheet = window.matchMedia('(max-width: 900px)').matches ? Math.round(m.getContainer().clientHeight * 0.6) : 0
    m.flyTo({
      center: [pin.coords.lng, pin.coords.lat],
      zoom: PIN_ZOOM,
      padding: { top: 0, left: 0, right: 0, bottom: sheet },
      duration: reduceMotion() ? 0 : 2000,
      curve: 1.5,
      essential: true,
    })
  }, [selectedId, pins])

  const fire = (name: string) => host.current?.dispatchEvent(new Event(name))

  return (
    <div className="mapstage">
      <div className="mapcanvas" ref={host} />
      <div className="mapctl" role="group" aria-label="Map view">
        <button type="button" onClick={() => fire('map:pins')}>All pins</button>
        <button type="button" onClick={() => fire('map:city')}>Whole city</button>
      </div>
      <div className="legend" aria-hidden="true">
        {categories.map((c) => (
          <div key={c.id} style={{ ['--dot' as string]: c.color }}>
            <i />
            {c.label}
          </div>
        ))}
      </div>
    </div>
  )
}
