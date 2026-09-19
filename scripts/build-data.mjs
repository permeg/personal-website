// Builds the map + hero geometry from raw Seattle neighborhood boundaries.
// Source: Zillow neighborhood boundaries (CC BY-SA 3.0) via github.com/blackmad/neighborhoods
//   node scripts/build-data.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as turf from '@turf/turf'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(here, '..')
const raw = JSON.parse(fs.readFileSync(path.join(here, 'data', 'seattle-neighborhoods-raw.geojson'), 'utf8'))

// Fine-grained neighborhoods -> the larger districts a person would name on a map.
const GROUPS = {
  Ballard: ['Adams', 'Loyal Heights', 'Whittier Heights', 'Sunset Hill'],
  Greenwood: ['Greenwood', 'Crown Hill', 'North Beach/Blue Ridge', 'Broadview', 'Bitter Lake', 'Phinney Ridge', 'West Woodland'],
  'Green Lake': ['Green Lake', 'Roosevelt', 'Ravenna', 'Bryant'],
  Northgate: ['Haller Lake', 'Pinehurst', 'North College Park', 'Maple Leaf'],
  'Lake City': ['Olympic Hills', 'Cedar Park', 'Victory Heights', 'Meadowbrook', 'Matthews Beach'],
  'Northeast Seattle': ['Wedgwood', 'View Ridge', 'Sand Point', 'Windermere', 'Laurelhurst'],
  'University District': ['University District'],
  Wallingford: ['Wallingford'],
  Fremont: ['Fremont'],
  Magnolia: ['Lawton Park', 'Briarcliff', 'Southeast Magnolia'],
  'Queen Anne': ['East Queen Anne', 'West Queen Anne', 'Lower Queen Anne', 'North Queen Anne'],
  Interbay: ['Interbay'],
  'South Lake Union': ['South Lake Union', 'Westlake'],
  Eastlake: ['Eastlake', 'Portage Bay'],
  Montlake: ['Montlake', 'Madison Park'],
  'Capitol Hill': ['Broadway', 'Stevens', 'Harrison/Denny-Blaine'],
  'Central District': ['Minor', 'Mann', 'Madrona', 'Leschi'],
  'First Hill': ['First Hill', 'Yesler Terrace'],
  'International District': ['International District', 'Atlantic'],
  Downtown: ['Central Business District', 'Belltown', 'Pike-Market', 'Pioneer Square'],
  SODO: ['Industrial District', 'Harbor Island'],
  Georgetown: ['Georgetown'],
  'South Park': ['South Park'],
  'Beacon Hill': ['North Beacon Hill', 'Mid-Beacon Hill', 'South Beacon Hill'],
  'Rainier Valley': ['Mount Baker', 'Columbia City', 'Brighton', 'Dunlap', 'Holly Park', 'Rainier Beach', 'Rainier View', 'Genesee'],
  'Seward Park': ['Seward Park'],
  'West Seattle': ['Alki', 'North Admiral', 'Fairmount Park', 'Seaview', 'Gatewood', 'Arbor Heights', 'Fauntleroy'],
  Delridge: ['North Delridge', 'South Delridge', 'Riverview', 'Roxhill', 'High Point', 'Highland Park'],
}

const byName = new Map()
for (const g of Object.keys(GROUPS)) for (const n of GROUPS[g]) byName.set(n, g)

const round = (n) => Math.round(n * 1e5) / 1e5
const roundCoords = (c) => (typeof c[0] === 'number' ? [round(c[0]), round(c[1])] : c.map(roundCoords))
const tidy = (f) => ({ ...f, geometry: { ...f.geometry, coordinates: roundCoords(f.geometry.coordinates) } })

const unassigned = raw.features.filter((f) => !byName.has(f.properties.name)).map((f) => f.properties.name)
if (unassigned.length) console.warn('Unassigned neighborhoods:', unassigned)

// --- dissolve each district ---------------------------------------------------
const PAD = 12 // meters; closes slivers between neighbouring polygons before union
const districts = []
for (const [name, members] of Object.entries(GROUPS)) {
  const feats = raw.features
    .filter((f) => members.includes(f.properties.name))
    .map((f) => turf.buffer(f, PAD, { units: 'meters' }))
  if (!feats.length) throw new Error(`no features for ${name}`)
  let merged = feats.length === 1 ? feats[0] : turf.union(turf.featureCollection(feats))
  merged = turf.buffer(merged, -PAD, { units: 'meters' }) ?? merged
  merged = turf.simplify(merged, { tolerance: 0.00007, highQuality: true })
  merged.properties = { name }
  districts.push({ feature: merged, padded: turf.buffer(merged, 25, { units: 'meters' }) })
}

// --- greedy graph colouring so touching districts never share a hue -----------
const adj = districts.map(() => new Set())
for (let i = 0; i < districts.length; i++)
  for (let j = i + 1; j < districts.length; j++)
    if (turf.booleanIntersects(districts[i].padded, districts[j].padded)) {
      adj[i].add(j)
      adj[j].add(i)
    }
const PALETTE = ['ochre', 'moss', 'rust', 'olive', 'plum', 'amber']
const order = districts.map((_, i) => i).sort((a, b) => adj[b].size - adj[a].size)
const colorOf = new Map()
for (const i of order) {
  const used = new Set([...adj[i]].map((j) => colorOf.get(j)))
  colorOf.set(i, PALETTE.find((c) => !used.has(c)) ?? PALETTE[i % PALETTE.length])
}

const districtFC = turf.featureCollection(
  districts.map((d, i) => {
    const f = tidy(d.feature)
    const largest = f.geometry.type === 'MultiPolygon'
      ? turf.polygon(f.geometry.coordinates.map((p) => p).sort((a, b) => turf.area(turf.polygon(b)) - turf.area(turf.polygon(a)))[0])
      : f
    let c = turf.centroid(largest)
    if (!turf.booleanPointInPolygon(c, largest)) c = turf.pointOnFeature(largest)
    f.properties = {
      name: d.feature.properties.name,
      tone: colorOf.get(i),
      label: c.geometry.coordinates.map(round),
    }
    return f
  }),
)
fs.writeFileSync(path.join(root, 'public', 'data', 'districts.geojson'), JSON.stringify(districtFC))

// --- small neighbourhood label points -----------------------------------------
const seen = new Set()
const nhoodPts = []
for (const f of raw.features) {
  const name = f.properties.name
  if (seen.has(name)) continue
  seen.add(name)
  const p = turf.pointOnFeature(f)
  nhoodPts.push({
    type: 'Feature',
    properties: { name: name.replace('Harrison/Denny-Blaine', 'Denny-Blaine'), area: Math.round(turf.area(f) / 1e4) / 100 },
    geometry: { type: 'Point', coordinates: p.geometry.coordinates.map(round) },
  })
}
fs.writeFileSync(path.join(root, 'public', 'data', 'neighborhoods.geojson'), JSON.stringify(turf.featureCollection(nhoodPts)))

// --- city outline (dissolved) -------------------------------------------------
let city = turf.union(turf.featureCollection(districts.map((d) => turf.buffer(d.feature, 30, { units: 'meters' }))))
city = turf.simplify(turf.buffer(city, -30, { units: 'meters' }), { tolerance: 0.00015, highQuality: true })
fs.writeFileSync(path.join(root, 'public', 'data', 'outline.geojson'), JSON.stringify(tidy(city)))

// --- hero SVG: equirectangular projection, portrait ---------------------------
const [minX, minY, maxX, maxY] = turf.bbox(city)
const lat0 = (minY + maxY) / 2
const kx = Math.cos((lat0 * Math.PI) / 180)
const W = (maxX - minX) * kx
const H = maxY - minY
const S = 1000 / W
const proj = (lng, lat) => [round2((lng - minX) * kx * S), round2((maxY - lat) * S)]
const round2 = (n) => Math.round(n * 10) / 10
const ringPath = (ring) => 'M' + ring.map(([x, y]) => proj(x, y).join(' ')).join('L') + 'Z'
const polysOf = (g) => (g.type === 'Polygon' ? [g.coordinates] : g.coordinates)
const pathOf = (g) => polysOf(g).flatMap((poly) => poly.map(ringPath)).join('')

const hero = {
  viewBox: [1000, Math.round(H * S)],
  projection: { minX, maxY, kx, S },
  outline: pathOf(city.geometry),
  districts: districtFC.features.map((f) => pathOf(f.geometry)).join(''),
}
fs.writeFileSync(path.join(root, 'src', 'data', 'heroMap.json'), JSON.stringify(hero))

console.log('districts', districtFC.features.length, 'neighborhood points', nhoodPts.length)
console.log('tones', [...new Set(districtFC.features.map((f) => f.properties.tone))].join(','))
console.log('hero viewBox', hero.viewBox.join('x'))
