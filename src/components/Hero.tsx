import { useEffect, useState } from 'react'
import hero from '../data/heroMap.json'
import { now, profile } from '../data/content'
import { categories, pins } from '../data/pins'

function useSeattleTime() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'America/Los_Angeles',
      timeZoneName: 'short',
    }).format(new Date())
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 20_000)
    return () => clearInterval(id)
  }, [])
  return t
}

const { minX, maxY, kx, S } = hero.projection
const project = (lng: number, lat: number) => [(lng - minX) * kx * S, (maxY - lat) * S] as const

export function Hero() {
  const time = useSeattleTime()
  const [w, h] = hero.viewBox
  // Medina sits across the lake, outside the outline; the hero only marks pins inside the city.
  const dots = pins.filter((p) => project(p.coords.lng, p.coords.lat)[0] < w)

  return (
    <header className="hero" id="top">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <div className="hero__status">
            <span>
              <i className="dot" />
              {profile.location}
            </span>
            <span>{time}</span>
            <span>{profile.coords}</span>
          </div>

          <div>
            <h1 className="hero__name">
              <span>Megan</span>
              <span>Pereira</span>
            </h1>

            <div className="hero__links">
              <a className="btn btn--primary" href="#experience">
                Explore the map <span aria-hidden="true">↓</span>
              </a>
              <a className="btn" href={`mailto:${profile.email}`}>
                Email
              </a>
              <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>

          <div>
            <p className="hero__now-label">Lately</p>
            <ul className="hero__now">
              {now.map((n) => (
                <li key={n.where}>
                  <span>{n.where}</span>
                  <span>{n.what}</span>
                  <span>{n.when}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hero__map">
          <svg viewBox={`-30 -30 ${w + 140} ${h + 60}`} role="img" aria-label="Outline of Seattle with landmarks marked">
            <path d={hero.outline} fill="#12161c" stroke="#a7acaf" strokeOpacity=".75" strokeWidth="1.2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
            <path d={hero.districts} fill="none" stroke="#3a424d" strokeWidth=".8" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
            {dots.map((p) => {
              const [x, y] = project(p.coords.lng, p.coords.lat)
              const left = x > w * 0.55
              return (
                <a className="hp" key={p.id} style={{ ['--dot' as string]: categories.find((c) => c.id === p.category)?.color }} href={`#experience?select=${p.id}`} aria-label={`${p.short}: open on the map`}>
                  <circle className="halo" cx={x} cy={y} r="15" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                  <circle className="core" cx={x} cy={y} r="6" />
                  <text x={x + (left ? -26 : 26)} y={y + 7} textAnchor={left ? 'end' : 'start'}>
                    {p.short}
                  </text>
                </a>
              )
            })}
          </svg>
          <p className="hero__caption">Hover a dot to see where.</p>
        </div>
      </div>
    </header>
  )
}
