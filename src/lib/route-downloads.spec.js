import { describe, expect, it } from "vitest";
import {
  geoJsonFromFeatures,
  gpxFromFeatures,
  kmlFromFeatures,
  loadRouteFeatures,
} from "./route-downloads.js";

const feature = {
  type: "Feature",
  properties: { distanceKm: 12 },
  geometry: {
    type: "LineString",
    coordinates: [
      [108.2, 16.05],
      [108.3, 15.95],
    ],
  },
};

describe("route downloads", () => {
  it("loads only riding days and adds itinerary metadata", async () => {
    const itinerary = {
      days: [
        { day: 1, title: "Day one", kind: "outbound", routeFile: "day-01.geojson" },
        { day: 6, title: "Hiking day", kind: "hike" },
      ],
    };
    const fetcher = async (url) => ({
      ok: true,
      json: async () => ({ type: "FeatureCollection", features: [feature] }),
      url,
    });

    const loaded = await loadRouteFeatures(itinerary, fetcher);

    expect(loaded).toHaveLength(1);
    expect(loaded[0].properties).toMatchObject({
      day: 1,
      kind: "outbound",
      title: "Day one",
      distanceKm: 12,
    });
  });

  it("creates a multi-track GPX with escaped track names", () => {
    const namedFeatures = [
      { ...feature, properties: { day: 1, title: "Day 1: Coast & <country>" } },
      { ...feature, properties: { day: 2, title: "Day 2: Highlands" } },
    ];

    const gpx = gpxFromFeatures(namedFeatures, "Quiet Roads <loop>");

    expect(gpx).toContain("<name>Quiet Roads &lt;loop&gt;</name>");
    expect(gpx).toContain("<name>Day 1: Coast &amp; &lt;country&gt;</name>");
    expect(gpx.match(/<trk>/g)).toHaveLength(2);
    expect(gpx).toContain('<trkpt lat="16.05" lon="108.2" />');
  });

  it("creates KML and GeoJSON exports from the same features", () => {
    const namedFeatures = [{ ...feature, properties: { day: 1, title: "Day 1" } }];
    const kml = kmlFromFeatures(namedFeatures, "Whole loop");
    const geojson = JSON.parse(geoJsonFromFeatures(namedFeatures));

    expect(kml).toContain('<kml xmlns="http://www.opengis.net/kml/2.2">');
    expect(kml).toContain("<coordinates>108.2,16.05,0 108.3,15.95,0</coordinates>");
    expect(geojson).toMatchObject({
      type: "FeatureCollection",
      features: namedFeatures,
    });
  });

  it("uses Russian titles in the default GPX and KML metadata", () => {
    const namedFeatures = [
      {
        ...feature,
        properties: { day: 1, title: "День 1: Đà Nẵng (Дананг) → Tam Thanh (Тамтхань)" },
      },
    ];

    const gpx = gpxFromFeatures(namedFeatures);
    const kml = kmlFromFeatures(namedFeatures);

    expect(gpx).toContain("<name>Верхом на байках по югу Вьетнама</name>");
    expect(gpx).toContain("<name>День 1: Đà Nẵng (Дананг) → Tam Thanh (Тамтхань)</name>");
    expect(gpx).toContain('creator="Верхом на байках по югу Вьетнама"');
    expect(kml).toContain("<name>Верхом на байках по югу Вьетнама</name>");
  });
});
