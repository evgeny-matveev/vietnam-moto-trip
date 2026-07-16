import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

// These intermediate points are intentional. They keep the generated geometry
// on the quiet-road plan instead of letting a fastest-car profile choose the
// whole day from its start and finish alone.
const routes = {
  "relaxed-day-01.geojson": [
    [108.2022, 16.0544],
    [108.268, 15.994],
    [108.329, 15.906],
    [108.394, 15.877],
    [108.516, 15.726],
    [108.567, 15.565],
  ],
  "relaxed-day-02.geojson": [
    [108.567, 15.565],
    [108.916, 15.198],
    [108.733, 14.766],
    [108.526, 14.759],
    [108.296, 14.6],
  ],
  "relaxed-day-03.geojson": [
    [108.296, 14.6],
    [108.15, 14.49],
    [108.0132, 14.3451],
    [108.0355, 14.347],
    [107.996, 14.0469],
    [108.0, 13.98],
  ],
  "relaxed-day-04.geojson": [
    [108.0, 13.98],
    [108.08, 13.69],
    [108.037, 12.67],
    [108.1776, 12.4232],
  ],
  "relaxed-day-05.geojson": [
    [108.1776, 12.4232],
    [108.2, 12.1],
    [108.3373, 11.8247],
    [108.34, 11.86],
    [108.458, 11.94],
  ],
  "relaxed-day-07.geojson": [
    [108.458, 11.94],
    [108.735, 12.2],
    [108.905, 12.27],
    [109.196, 12.238],
  ],
  "relaxed-day-09.geojson": [
    [109.196, 12.238],
    [109.39, 12.83],
    [109.42, 12.84],
    [109.3, 13.09],
    [109.29, 13.29],
    [109.3, 13.36],
    [109.216, 13.455],
  ],
  "relaxed-day-10.geojson": [
    [109.216, 13.455],
    [109.245, 13.69],
    [109.219, 13.782],
    [109.26, 13.86],
    [109.22, 14.08],
    [109.18, 14.3],
    [109.11, 14.47],
    [109.07, 14.57],
    [109.05, 14.68],
  ],
  "relaxed-day-11.geojson": [
    [109.05, 14.68],
    [109.0737, 14.7056],
    [108.97, 14.9],
    [108.8727, 15.178],
    [108.8953, 15.1906],
    [108.9439, 15.2353],
    [108.804, 15.36],
    [108.7, 15.5],
    [108.567, 15.565],
  ],
  "relaxed-day-12.geojson": [
    [108.567, 15.565],
    [108.45, 15.57],
    [108.36, 15.78],
    [108.31, 15.87],
    [108.28, 15.92],
    [108.22, 15.98],
    [108.2022, 16.0544],
  ],
};

const outputDirectory = path.resolve("static/routes");
await mkdir(outputDirectory, { recursive: true });

for (const [filename, coordinates] of Object.entries(routes)) {
  const coordinatePath = coordinates.map((coordinate) => coordinate.join(",")).join(";");
  const url = new URL(`https://router.project-osrm.org/route/v1/driving/${coordinatePath}`);
  url.searchParams.set("overview", "full");
  url.searchParams.set("geometries", "geojson");
  url.searchParams.set("steps", "false");

  const response = await fetch(url, {
    headers: { "User-Agent": "vietnam-quiet-roads-map/1.0" },
  });
  if (!response.ok) {
    throw new Error(`${filename}: routing request failed with ${response.status}`);
  }

  const result = await response.json();
  if (result.code !== "Ok" || !result.routes?.[0]?.geometry) {
    throw new Error(`${filename}: routing service returned ${result.code ?? "no route"}`);
  }

  const route = result.routes[0];
  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          file: filename,
          distanceKm: Math.round(route.distance / 1000),
          durationHours: Math.round((route.duration / 3600) * 10) / 10,
          generatedBy: "OSRM with hand-picked quiet-road waypoints",
          generatedAt: new Date().toISOString(),
        },
        geometry: route.geometry,
      },
    ],
  };

  await writeFile(path.join(outputDirectory, filename), `${JSON.stringify(geojson)}\n`);
  process.stdout.write(`${filename}: ${geojson.features[0].properties.distanceKm} km\n`);
}
