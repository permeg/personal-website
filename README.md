# Megan Pereira — personal site

One-page portfolio. The Experience section is a real, street-accurate dark map of Seattle (MapLibre GL + OpenFreeMap tiles) where each landmark stands in for a role or project.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
```

## Where things live

| To change | Edit |
|---|---|
| Map pins (roles shown on the map) | `src/data/pins.ts` |
| Project cards | `src/data/projects.ts` |
| Bio, skills, education, "more from the ledger" list | `src/data/content.ts`, `src/components/Sections.tsx` |
| Colors and type | `src/styles/global.css` (`:root` tokens), `src/map/style.ts` (`mapColors`, `tones`) |
| Landmark icons, highway shields, water labels | `src/map/features.ts` |

Add a photo to a pin by dropping an image in `public/photos/` and setting `photo: '/photos/aws.jpg'` on that pin.

## Deep links

`/#experience?filter=industry,projects` scrolls to the map with those filters on.
`/#experience?select=aws` scrolls to the map and flies to that pin. The hero's dots use this.

## Map data

`npm run data` rebuilds `public/data/*` and `src/data/heroMap.json` from `scripts/data/seattle-neighborhoods-raw.geojson`
(groups ~90 small neighborhoods into ~28 painted districts and colors touching districts differently).

Credits: map data © OpenStreetMap contributors via OpenFreeMap; neighborhood boundaries from Zillow (CC BY-SA 3.0),
via github.com/blackmad/neighborhoods.
