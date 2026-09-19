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
| Map pins: every role, its category, and its coordinates | `src/data/pins.ts` |
| Projects section (name, description, skills, links) | `src/data/projects.ts` |
| Skills, education, hero "Lately" list | `src/data/content.ts` |
| About copy, section headings | `src/components/Sections.tsx` |
| Colors and type | `src/styles/global.css` (`:root` tokens), `src/map/style.ts` (`mapColors`, `tones`) |
| Landmark icons, highway shields, water labels | `src/map/features.ts` |

Pin photos live in `public/photos/` and are set with the `photo` field in `src/data/pins.ts`. They're from Wikimedia Commons under CC BY-SA licenses, and each card shows its credit; keep the credit if you swap a photo, or use your own and drop the credit fields.
To add a category, add it to `categories` and the `CategoryId` type in `src/data/pins.ts`.

## Deep links

`/#experience?filter=industry,projects` scrolls to the map with those filters on.
`/#experience?select=aws` scrolls to the map and flies to that pin. The hero's dots use this.

## Map data

`npm run data` rebuilds `public/data/*` and `src/data/heroMap.json` from `scripts/data/seattle-neighborhoods-raw.geojson`
(groups ~90 small neighborhoods into ~28 painted districts and colors touching districts differently).

Credits: map data © OpenStreetMap contributors via OpenFreeMap; neighborhood boundaries from Zillow (CC BY-SA 3.0),
via github.com/blackmad/neighborhoods.
