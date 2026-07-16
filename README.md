# Quiet Roads Vietnam

A mobile-first interactive map and complete written plan for a 12-day scooter loop from Đà Nẵng to Đà Lạt and back through the Central Highlands.

Live site: [vietnam-moto-trip.vercel.app](https://vietnam-moto-trip.vercel.app)

The readable itinerary lives in [`docs/ride-plan.md`](docs/ride-plan.md). The app imports that file for the `/guide` page, while `src/lib/data/itineraries.js` drives the map controls and day details.

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

The refresh script uses the public OSRM demo service at build time. The deployed app does not call a routing API.

## Deploy

The project uses SvelteKit’s static adapter and is connected to Vercel. Every push to `main` creates a production deployment automatically.
