# RUMSA Student Discount Ledger

A browsable directory of RUMSA's student discount partner vendors — filterable
by area and category, with a map view.

## Stack

- Vite + React
- Leaflet / react-leaflet for the map (OpenStreetMap tiles, no API key needed)
- Vendor data lives in `src/vendors.json`, parsed from the source vendor list

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel, "Add New Project" → import the repo.
3. Framework preset: **Vite**. Build command `npm run build`, output directory `dist` (Vercel detects this automatically).
4. Deploy — no environment variables required.

Or via the Vercel CLI from this directory:

```bash
npm i -g vercel
vercel
```

## Data notes

- Categories: `F` Food (`N` sub-tag = non-halal), `H` Health & beauty, `S` Sport,
  `C` Clothes, `O` Other.
- Map pin coordinates are **approximate**, assigned per named area (TMIYC,
  Jalan Tanjung, Nusa Sentral, Senadi Hills, Sunway, Medini, Bukit Indah, Eco
  Botanic) with a small random offset so pins in the same cluster don't fully
  overlap. They are not geocoded from the exact street addresses. To get exact
  pins, replace the `lat`/`lng` fields in `src/vendors.json` with geocoded
  coordinates for each address (e.g. via the Google Geocoding API or
  Nominatim).
- To update vendor data, edit `src/vendors.json` directly (each entry has
  `name`, `categories`, `region`, `address`, `discount`, `lat`, `lng`).
