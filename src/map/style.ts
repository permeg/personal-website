import type { ExpressionSpecification, StyleSpecification } from 'maplibre-gl'

// Mirrors the CSS tokens in styles/tokens.css.
export const mapColors = {
  land: '#15191F',
  water: '#0D1824',
  shore: '#21364A',
  line: '#2B313A',
  road: '#333B46',
  roadMajor: '#4B5562',
  highway: '#6A7482',
  park: '#1D3226',
  label: '#808993',
  labelMuted: '#4E5863',
  halo: '#0A0D12',
}

// Painted-district fills: the dark cousins of the warm washes on a watercolor map.
export const tones = {
  ochre: '#3A331C',
  amber: '#40301B',
  rust: '#3D2720',
  moss: '#23352B',
  olive: '#2E3520',
  plum: '#30263A',
} as const

const toneMatch: ExpressionSpecification = [
  'match',
  ['get', 'tone'],
  ...Object.entries(tones).flat(),
  tones.ochre,
] as unknown as ExpressionSpecification

const w = (stops: [number, number][]): ExpressionSpecification =>
  ['interpolate', ['exponential', 1.4], ['zoom'], ...stops.flat()] as unknown as ExpressionSpecification

const mono = ['Noto Sans Regular']

export function buildStyle(base: string): StyleSpecification {
  return {
    version: 8,
    name: 'seattle-dark-wash',
    glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
    sources: {
      omt: { type: 'vector', url: 'https://tiles.openfreemap.org/planet', attribution: '© OpenStreetMap contributors · OpenFreeMap' },
      districts: { type: 'geojson', data: `${base}data/districts.geojson` },
      neighborhoods: { type: 'geojson', data: `${base}data/neighborhoods.geojson` },
    },
    layers: [
      { id: 'land', type: 'background', paint: { 'background-color': mapColors.land } },

      // Painted districts, clipped to the real shoreline by the water layer above.
      { id: 'district-fill', type: 'fill', source: 'districts', paint: {
          'fill-color': toneMatch,
          'fill-antialias': false,
          // painted wash at city scale, softer once you're at street level
          'fill-opacity': w([[10, 1], [12.5, 0.85], [14.5, 0.5]]) as unknown as number,
        } },
      {
        id: 'district-border',
        type: 'line',
        source: 'districts',
        paint: {
          'line-color': '#0A0D12',
          'line-opacity': 0.55,
          'line-width': w([[9, 0.5], [13, 1.4], [16, 2.4]]),
        },
      },
      {
        id: 'park',
        type: 'fill',
        source: 'omt',
        'source-layer': 'park',
        paint: { 'fill-color': mapColors.park, 'fill-opacity': 0.85 },
      },
      {
        id: 'landuse-airport',
        type: 'fill',
        source: 'omt',
        'source-layer': 'aeroway',
        filter: ['==', ['geometry-type'], 'Polygon'],
        paint: { 'fill-color': '#12161B', 'fill-opacity': 0.7 },
      },

      // Water sits on top of the district fills, so painted zones stop exactly at the shore.
      {
        id: 'water',
        type: 'fill',
        source: 'omt',
        'source-layer': 'water',
        paint: { 'fill-color': mapColors.water },
      },
      {
        id: 'waterway',
        type: 'line',
        source: 'omt',
        'source-layer': 'waterway',
        paint: { 'line-color': mapColors.water, 'line-width': w([[10, 0.6], [15, 3]]) },
      },
      {
        id: 'shore',
        type: 'line',
        source: 'omt',
        'source-layer': 'water',
        paint: {
          'line-color': mapColors.shore,
          'line-opacity': 0.9,
          'line-width': w([[9, 0.6], [13, 1.2], [16, 2]]),
        },
      },

      {
        id: 'building',
        type: 'fill',
        source: 'omt',
        'source-layer': 'building',
        minzoom: 14.5,
        paint: { 'fill-color': '#0A0D12', 'fill-opacity': 0.28 },
      },

      // Streets
      {
        id: 'road-minor',
        type: 'line',
        source: 'omt',
        'source-layer': 'transportation',
        minzoom: 12.5,
        filter: ['all', ['in', ['get', 'class'], ['literal', ['minor', 'service', 'tertiary']]], ['!=', ['get', 'brunnel'], 'tunnel']],
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': mapColors.road,
          'line-opacity': 0.9,
          'line-width': w([[12.5, 0.3], [14, 0.7], [16, 2.2], [18, 6]]),
        },
      },
      {
        id: 'road-secondary',
        type: 'line',
        source: 'omt',
        'source-layer': 'transportation',
        minzoom: 10.5,
        filter: ['all', ['in', ['get', 'class'], ['literal', ['secondary', 'primary']]], ['!=', ['get', 'brunnel'], 'tunnel']],
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': mapColors.roadMajor,
          'line-width': w([[10.5, 0.4], [13, 1], [16, 3.4], [18, 9]]),
        },
      },
      {
        id: 'road-highway-casing',
        type: 'line',
        source: 'omt',
        'source-layer': 'transportation',
        filter: ['in', ['get', 'class'], ['literal', ['motorway', 'trunk']]],
        layout: { 'line-cap': 'butt', 'line-join': 'round' },
        paint: { 'line-color': '#0A0D12', 'line-opacity': 0.8, 'line-width': w([[9, 2], [13, 4.6], [16, 8.4]]) },
      },
      {
        id: 'road-highway',
        type: 'line',
        source: 'omt',
        'source-layer': 'transportation',
        filter: ['in', ['get', 'class'], ['literal', ['motorway', 'trunk']]],
        layout: { 'line-cap': 'butt', 'line-join': 'round' },
        paint: { 'line-color': mapColors.highway, 'line-width': w([[9, 1], [13, 2.4], [16, 5]]) },
      },
      {
        id: 'ferry',
        type: 'line',
        source: 'omt',
        'source-layer': 'transportation',
        filter: ['==', ['get', 'class'], 'ferry'],
        layout: { 'line-cap': 'round' },
        paint: {
          'line-color': '#5F8199',
          'line-dasharray': [0.1, 2.4],
          'line-width': w([[9, 1.2], [13, 2.2]]),
        },
      },

      // Labels
      {
        id: 'place-outside',
        type: 'symbol',
        source: 'omt',
        'source-layer': 'place',
        minzoom: 8,
        filter: [
          'all',
          ['in', ['get', 'class'], ['literal', ['city', 'town', 'village', 'island']]],
          ['!=', ['get', 'name'], 'Seattle'],
        ],
        layout: {
          'text-field': ['get', 'name:latin'],
          'text-font': mono,
          'text-size': w([[9, 10], [13, 12]]),
          'text-letter-spacing': 0.18,
          'text-transform': 'uppercase',
          'text-max-width': 8,
        },
        paint: { 'text-color': mapColors.labelMuted, 'text-halo-color': mapColors.halo, 'text-halo-width': 1.2 },
      },
      {
        id: 'nhood-major',
        type: 'symbol',
        source: 'neighborhoods',
        minzoom: 12.9,
        filter: ['>=', ['get', 'area'], 1.6],
        layout: {
          'text-field': ['get', 'name'],
          'text-font': mono,
          'text-size': w([[12.9, 10.5], [15, 13]]),
          'text-letter-spacing': 0.06,
          'text-max-width': 7,
          'symbol-sort-key': ['-', 0, ['get', 'area']],
          'text-padding': 6,
        },
        paint: { 'text-color': mapColors.label, 'text-halo-color': mapColors.halo, 'text-halo-width': 1.4 },
      },
      {
        id: 'nhood-minor',
        type: 'symbol',
        source: 'neighborhoods',
        minzoom: 13.7,
        filter: ['<', ['get', 'area'], 1.6],
        layout: {
          'text-field': ['get', 'name'],
          'text-font': mono,
          'text-size': w([[13.7, 10], [15, 12]]),
          'text-letter-spacing': 0.06,
          'text-max-width': 7,
          'symbol-sort-key': ['-', 0, ['get', 'area']],
          'text-padding': 6,
        },
        paint: { 'text-color': mapColors.labelMuted, 'text-halo-color': mapColors.halo, 'text-halo-width': 1.4 },
      },
    ],
  }
}
