import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const routes = {
  "main-day-01-tam-thanh.geojson": [
    [108.2022, 16.0544],
    [108.268, 15.994],
    [108.329, 15.906],
    [108.394, 15.877],
    [108.516, 15.726],
    [108.567, 15.565],
  ],
  "main-day-02-mang-den.geojson": [
    [108.567, 15.565],
    [108.916, 15.198],
    [108.733, 14.766],
    [108.59, 14.75],
    [108.296, 14.6],
  ],
  "main-day-03-kbang.geojson": [
    [108.296, 14.6],
    [108.273, 14.495],
    [108.2, 14.2],
    [108.6, 14.14],
  ],
  "main-day-04-song-cau.geojson": [
    [108.6, 14.14],
    [108.687, 13.953],
    [109.219, 13.782],
    [109.245, 13.69],
    [109.216, 13.455],
  ],
  "main-day-05-nha-trang.geojson": [
    [109.216, 13.455],
    [109.3, 13.36],
    [109.29, 13.29],
    [109.3, 13.09],
    [109.42, 12.84],
    [109.39, 12.83],
    [109.196, 12.238],
  ],
  "main-day-01.geojson": [
    [108.2022, 16.0544],
    [108.268, 15.994],
    [108.329, 15.906],
    [108.394, 15.877],
    [108.516, 15.726],
    [108.567, 15.565],
    [108.624, 15.422],
    [108.742, 15.318],
    [108.916, 15.198],
  ],
  "main-day-02.geojson": [
    [108.916, 15.198],
    [108.82, 15.08],
    [108.733, 14.766],
    [108.59, 14.75],
    [108.296, 14.6],
  ],
  "main-day-03.geojson": [
    [108.296, 14.6],
    [108.273, 14.495],
    [108.2, 14.2],
    [108.6, 14.14],
    [108.687, 13.953],
    [109.219, 13.782],
  ],
  "main-day-04.geojson": [
    [109.219, 13.782],
    [109.245, 13.69],
    [109.216, 13.455],
    [109.3, 13.36],
    [109.29, 13.29],
    [109.3, 13.09],
    [109.42, 12.84],
    [109.39, 12.83],
    [109.196, 12.238],
  ],
  "main-day-05.geojson": [
    [109.196, 12.238],
    [108.905, 12.27],
    [108.735, 12.2],
    [108.458, 11.94],
  ],
  "main-day-07.geojson": [
    [108.458, 11.94],
    [108.34, 11.86],
    [108.37, 11.82],
    [108.24, 11.79],
    [108.22, 12.05],
    [108.12, 12.34],
    [108.18, 12.42],
  ],
  "main-day-08.geojson": [
    [108.18, 12.42],
    [107.89, 12.54],
    [107.89, 12.57],
    [108.037, 12.67],
  ],
  "main-day-09.geojson": [
    [108.037, 12.67],
    [108.26, 12.92],
    [108.08, 13.69],
    [108.0, 13.98],
  ],
  "main-day-10.geojson": [
    [108.0, 13.98],
    [108.016, 14.045],
    [108.13, 14.1],
    [108.0, 14.35],
  ],
  "main-day-11.geojson": [
    [108.0, 14.35],
    [107.83, 14.66],
    [107.68, 14.72],
    [107.74, 15.11],
    [107.74, 15.2],
    [107.79, 15.44],
  ],
  "main-day-12.geojson": [
    [107.79, 15.44],
    [107.84, 15.75],
    [108.12, 15.88],
    [108.1, 15.95],
    [108.2, 16.05],
  ],
  "ninh-thuan-day-05.geojson": [
    [109.196, 12.238],
    [109.15, 11.92],
    [109.19, 11.83],
    [109.19, 11.71],
    [109.11, 11.72],
    [108.99, 11.58],
  ],
  "ninh-thuan-day-06.geojson": [
    [108.99, 11.58],
    [108.93, 11.6],
    [108.71, 11.82],
    [108.49, 11.82],
    [108.458, 11.94],
  ],
  "ninh-thuan-day-09.geojson": [
    [108.18, 12.42],
    [108.037, 12.67],
    [108.26, 12.92],
    [108.08, 13.69],
    [108.0, 13.98],
  ],
  "yok-don-day-08.geojson": [
    [108.18, 12.42],
    [108.037, 12.67],
    [107.65, 12.87],
    [108.037, 12.67],
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
          generatedBy: "OSRM",
          generatedAt: new Date().toISOString(),
        },
        geometry: route.geometry,
      },
    ],
  };

  await writeFile(path.join(outputDirectory, filename), `${JSON.stringify(geojson)}\n`);
  process.stdout.write(`${filename}: ${geojson.features[0].properties.distanceKm} km\n`);
}
