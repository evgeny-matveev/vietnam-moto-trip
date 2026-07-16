# Quiet Roads Vietnam

A mobile-first interactive map and complete written plan for one relaxed 12-day scooter loop: south through the Central Highlands, a full day in Nha Trang, and home along Vietnam’s coast.

Live site: [vietnam-moto-trip.vercel.app](https://vietnam-moto-trip.vercel.app)

The readable itinerary lives in [`docs/ride-plan.md`](docs/ride-plan.md). The app imports that file for the `/guide` page. `src/lib/data/itineraries.js` drives the route and day details, while `src/lib/data/places.js` provides the categorized places shown on the map.

## Run locally

```sh
pnpm install
pnpm dev
```

## Verify

```sh
pnpm verify
```

## Route geometry

The generated road-following GeoJSON files in `static/routes/` are deployed with the site. Refresh them only when route waypoints change:

```sh
pnpm routes:refresh
```

The refresh script uses the public OSRM demo service with deliberate intermediate waypoints. The deployed app does not call a routing, places or weather API.

## Download for a map app

The route map can download the riding route in three formats:

- GPX: the recommended format for OsmAnd and navigation apps. The whole-loop file contains ten separate riding tracks; Days 6 and 8 have no intercity route.
- KML: useful for Google My Maps and Google Earth.
- GeoJSON: useful for Organic Maps and GIS tools, and the same format used by the website.

The downloads contain road-following track geometry, not guaranteed turn-by-turn instructions. In OsmAnd, use its “Attach to roads” option after importing if you want more detailed voice guidance. Check local road, weather and construction conditions before riding.

## Deploy

The project uses SvelteKit’s static adapter and is connected to Vercel. Every push to `main` creates a production deployment automatically.
