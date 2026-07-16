import { existsSync, readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { itinerary } from "./itineraries.js";
import { getPlace } from "./places.js";

const routesDirectory = "static/routes";

function loadRoute(filename) {
  return JSON.parse(readFileSync(`${routesDirectory}/${filename}`, "utf8")).features[0];
}

function distanceKm([longitudeA, latitudeA], [longitudeB, latitudeB]) {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const latitudeDelta = toRadians(latitudeB - latitudeA);
  const longitudeDelta = toRadians(longitudeB - longitudeA);
  const startLatitude = toRadians(latitudeA);
  const endLatitude = toRadians(latitudeB);
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(startLatitude) * Math.cos(endLatitude) * Math.sin(longitudeDelta / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

describe("the relaxed itinerary", () => {
  it("contains exactly 12 sequential days and all four day kinds", () => {
    expect(itinerary.days).toHaveLength(12);
    expect(itinerary.days.map((day) => day.day)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    expect(new Set(itinerary.days.map((day) => day.kind))).toEqual(
      new Set(["outbound", "return", "hike", "rest"]),
    );
  });

  it("keeps Days 6 and 8 off the intercity route and Day 8 in Nha Trang", () => {
    const hikingDay = itinerary.days[5];
    const restDay = itinerary.days[7];

    expect(hikingDay.routeFile).toBeUndefined();
    expect(hikingDay.roads).toBe("No intercity riding");
    expect(restDay.routeFile).toBeUndefined();
    expect(restDay.title).toContain("Nha Trang");
    expect(restDay.roads).toContain("Nha Trang base");
    expect(restDay.stops.join(" ")).toMatch(/Good sea/i);
    expect(restDay.stops.join(" ")).toMatch(/Poor sea/i);
    expect(restDay.note).toMatch(/not try to complete the sea plan and city plan together/i);
  });

  it("has committed, consistently named geometry for every riding day and no obsolete files", () => {
    const routeDays = itinerary.days.filter((day) => day.routeFile);
    const expectedFiles = routeDays.map((day) => day.routeFile).sort();
    const committedFiles = readdirSync(routesDirectory)
      .filter((file) => file.endsWith(".geojson"))
      .sort();

    expect(routeDays).toHaveLength(10);
    expect(committedFiles).toEqual(expectedFiles);
    for (const day of routeDays) {
      expect(day.routeFile).toMatch(/^relaxed-day-\d{2}\.geojson$/);
      expect(existsSync(`${routesDirectory}/${day.routeFile}`), day.routeFile).toBe(true);
      const route = loadRoute(day.routeFile);
      expect(route.geometry.type).toBe("LineString");
      expect(route.geometry.coordinates.length).toBeGreaterThan(10);
      expect(route.properties.generatedBy).toContain("hand-picked quiet-road waypoints");
    }
  });

  it("connects each riding line to the next within endpoint tolerance", () => {
    const routeDays = itinerary.days.filter((day) => day.routeFile);
    for (const [index, day] of routeDays.slice(0, -1).entries()) {
      const currentCoordinates = loadRoute(day.routeFile).geometry.coordinates;
      const nextCoordinates = loadRoute(routeDays[index + 1].routeFile).geometry.coordinates;
      const gap = distanceKm(currentCoordinates.at(-1), nextCoordinates[0]);
      expect(gap, `${day.routeFile} to ${routeDays[index + 1].routeFile}`).toBeLessThan(2);
    }
  });

  it("gives every day its road character, weather fallback and valid place references", () => {
    for (const day of itinerary.days) {
      expect(day.roadCharacter.length).toBeGreaterThan(20);
      expect(day.weatherFallback.length).toBeGreaterThan(20);
      expect(day.placeIds.length).toBeGreaterThan(0);
      expect(new Set(day.placeIds).size).toBe(day.placeIds.length);
      for (const placeId of day.placeIds) expect(getPlace(placeId), placeId).not.toBeNull();
    }
  });

  it("contains no removed route or variant content", () => {
    const content = JSON.stringify(itinerary);
    expect(content).not.toMatch(/K[’']?Bang|Lò Xo|Bờ Y|Khâm Đức|Yok Đôn|Núi Chúa|Ninh Thuận/i);
  });
});
