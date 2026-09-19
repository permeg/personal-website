// Hand-placed map furniture: landmark line icons, highway shields, water labels, district label tweaks.

export interface Landmark {
  id: string
  name: string
  lat: number
  lng: number
  icon: keyof typeof icons
}

const stroke = 'fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"'
const svg = (d: string) => `<svg viewBox="0 0 24 24" width="24" height="24" ${stroke} aria-hidden="true">${d}</svg>`

export const icons = {
  needle: svg(
    '<path d="M12 2.5v3.2M8.2 8.6c0-1.6 1.7-2.9 3.8-2.9s3.8 1.3 3.8 2.9-1.7 2.1-3.8 2.1-3.8-.5-3.8-2.1zM11 10.8 9.6 21M13 10.8 14.4 21M10.4 15.4h3.2M7.5 21h9"/>',
  ),
  lighthouse: svg(
    '<path d="M10 21l1-12h2l1 12zM9.2 9h5.6M10.2 5.6h3.6V9h-3.6zM12 2.6v3M7.6 3.6l2.2 1.2M16.4 3.6l-2.2 1.2M8 21h8"/>',
  ),
  ferry: svg(
    '<path d="M3 14.5 5 20h14l2-5.5zM6.2 14.5V10.8h11.6v3.7M9.4 10.8V7.6h5.2v3.2M12 7.6V5M3 22.4c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0"/>',
  ),
  salmon: svg(
    '<path d="M2.8 12c3-4.2 8.4-5.2 13.2-2l4.4-3.2v10.4L16 14c-4.8 3.2-10.2 2.2-13.2-2zM7.4 11.4h.01M12 9.6c.8 1.6.8 3.2 0 4.8"/>',
  ),
  tower: svg(
    '<path d="M9.5 21V9.5L12 3l2.5 6.5V21M9.5 13.2h5M9.5 17h5M11 9.5h2M6.5 21h11"/>',
  ),
  stadium: svg(
    '<path d="M2.8 14.2c0-3 4-5.2 9.2-5.2s9.2 2.2 9.2 5.2-4 5.2-9.2 5.2-9.2-2.2-9.2-5.2zM6.4 14.2c0-1.7 2.4-3.1 5.6-3.1s5.6 1.4 5.6 3.1-2.4 3.1-5.6 3.1-5.6-1.4-5.6-3.1zM12 9V5.6M9.6 6.6h4.8"/>',
  ),
  gate: svg(
    '<path d="M5.2 21V11.5M18.8 21V11.5M2.8 11.5h18.4M4 8.2c3.4-1 5.6-2.4 8-4.4 2.4 2 4.6 3.4 8 4.4M2.8 11.5l1.2-3.3M21.2 11.5 20 8.2M12 11.5V15"/>',
  ),
  stacks: svg(
    '<path d="M4.8 21V10.4L7 8.2l2.2 2.2V21M10.8 21V7.6L13 5.4l2.2 2.2V21M16.6 21V11.4l2-1.6 2 1.6V21M3 21h18M9.2 14h1.6M15.2 12.6h1.4"/>',
  ),
  plane: svg(
    '<path d="m12 3 1.5 6.8 7.5 4.4v2L13.5 14l-.5 4 2.2 1.6V21L12 20l-3.2 1v-1.4L11 18l-.5-4L3 16.2v-2l7.5-4.4z"/>',
  ),
} as const

export const landmarks: Landmark[] = [
  { id: 'colman', name: 'Colman Dock ferries', lat: 47.6027, lng: -122.3392, icon: 'ferry' },
  { id: 'smith', name: 'Smith Tower', lat: 47.6019, lng: -122.3316, icon: 'tower' },
  { id: 'westpoint', name: 'West Point Lighthouse', lat: 47.6617, lng: -122.4358, icon: 'lighthouse' },
  { id: 'alki', name: 'Alki Point Lighthouse', lat: 47.5765, lng: -122.4207, icon: 'lighthouse' },
  { id: 'boeing', name: 'Boeing Field', lat: 47.5302, lng: -122.3018, icon: 'plane' },
]

export interface Shield {
  id: string
  ref: string
  kind: 'interstate' | 'state'
  lat: number
  lng: number
}

export const shields: Shield[] = [
  { id: 'i5-n', ref: '5', kind: 'interstate', lat: 47.6905, lng: -122.3225 },
  { id: 'i5-s', ref: '5', kind: 'interstate', lat: 47.5735, lng: -122.3225 },
  { id: 'sr99-n', ref: '99', kind: 'state', lat: 47.6905, lng: -122.3468 },
  { id: 'sr99-s', ref: '99', kind: 'state', lat: 47.5520, lng: -122.3230 },
  { id: 'sr520', ref: '520', kind: 'state', lat: 47.6452, lng: -122.2680 },
  { id: 'i90', ref: '90', kind: 'interstate', lat: 47.5893, lng: -122.2790 },
  { id: 'sr509', ref: '509', kind: 'state', lat: 47.5400, lng: -122.3170 },
]

export interface WaterLabel {
  text: string
  lat: number
  lng: number
  rotate: number
  size: number
  minZoom?: number
}

export const waterLabels: WaterLabel[] = [
  { text: 'Puget Sound', lat: 47.585, lng: -122.4750, rotate: 62, size: 15 },
  { text: 'Elliott Bay', lat: 47.5905, lng: -122.3800, rotate: -22, size: 11, minZoom: 10.6 },
  { text: 'Lake Washington', lat: 47.6050, lng: -122.2500, rotate: 78, size: 14 },
  { text: 'Lake Union', lat: 47.6325, lng: -122.3345, rotate: 62, size: 8.5, minZoom: 12 },
  { text: 'Green Lake', lat: 47.6800, lng: -122.3410, rotate: 62, size: 8.5, minZoom: 12.4 },
  { text: 'Shilshole Bay', lat: 47.6830, lng: -122.4180, rotate: -68, size: 9, minZoom: 11.4 },
  { text: 'Union Bay', lat: 47.6440, lng: -122.2830, rotate: 0, size: 8.5, minZoom: 12.6 },
  { text: 'Portage Bay', lat: 47.6495, lng: -122.3210, rotate: -12, size: 7.5, minZoom: 13.2 },
]

// Per-district label nudges. Anything not listed sits at the polygon's computed label point.
export const districtLabelTweaks: Record<string, { rotate?: number; size?: number; dx?: number; dy?: number; hide?: boolean; minor?: boolean }> = {
  Downtown: { size: 12 },
  'Queen Anne': { size: 13 },
  Ballard: { size: 13 },
  Magnolia: { size: 13 },
  'Capitol Hill': { size: 13 },
  'West Seattle': { size: 14 },
  'Rainier Valley': { rotate: 74, size: 13 },
  'Beacon Hill': { rotate: 68, size: 12 },
  Georgetown: { minor: true, rotate: 74, size: 10 },
  Delridge: { size: 13 },
  'Northeast Seattle': { size: 12 },
  'Lake City': { size: 13 },
  Northgate: { size: 13 },
  Greenwood: { size: 13 },
  'University District': { minor: true, size: 10 },
  'International District': { minor: true, size: 8 },
  'Central District': { minor: true, size: 11 },
  'First Hill': { size: 8, hide: true },
  'South Lake Union': { minor: true, size: 8 },
  Interbay: { minor: true, size: 8, rotate: 62 },
  Eastlake: { minor: true, size: 8, rotate: 78 },
  Montlake: { minor: true, size: 8 },
  Wallingford: { minor: true, size: 9 },
  Fremont: { minor: true, size: 10 },
  'Green Lake': { minor: true, size: 9 },
  'Seward Park': { minor: true, size: 8 },
  SODO: { minor: true, size: 10 },
  'South Park': { minor: true, size: 8 },
}
