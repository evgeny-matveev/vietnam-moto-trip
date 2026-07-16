import { existsSync, readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { itinerary } from "./itineraries.js";
import { getPlace } from "./places.js";
import { validateStayPlan } from "./stays.js";

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
  it("keeps the compact route figures aligned with the day estimates", () => {
    const ridingDays = itinerary.days.filter((day) => day.routeFile);
    const range = (value) => value.match(/\d+/g).map(Number);
    const distanceRanges = ridingDays.map((day) => range(day.distance));
    const timeRanges = ridingDays.map((day) => range(day.rideTime));
    const midpoint = ([minimum, maximum]) => (minimum + maximum) / 2;
    const totalDistance = distanceRanges.reduce((sum, values) => sum + midpoint(values), 0);
    const totalTime = timeRanges.reduce((sum, values) => sum + midpoint(values), 0);

    expect(itinerary.atAGlance).toEqual([
      "≈1,750 km",
      "avg. 175 km / 5 hr",
      "Đà Lạt mountain hike",
      "Nha Trang rest day",
    ]);
    expect(Math.round(totalDistance / 50) * 50).toBe(1750);
    expect(Math.round(totalDistance / ridingDays.length)).toBe(175);
    expect(Math.round(totalTime / ridingDays.length)).toBe(5);
  });

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
    expect(hikingDay.stops.join(" ")).toMatch(/Lang Biang summit.*9\.7 km.*685 m/i);
    expect(hikingDay.stops.join(" ")).toMatch(/Đa Phú hills.*4 km.*195 m/i);
    expect(hikingDay.stops.join(" ")).toMatch(/Xuân Hương Lake loop.*7 km.*50 m/i);
    expect(hikingDay.stops.join(" ")).toMatch(/Bidoup–Núi Bà official day walk/i);
    expect(hikingDay.stops.join(" ")).toMatch(/private land/i);
    expect(hikingDay.sources.map((source) => source.label).join(" ")).toMatch(/AllTrails/i);
    expect(hikingDay.sources.map((source) => source.label).join(" ")).toMatch(/Komoot/i);
    expect(hikingDay.sources.map((source) => source.label).join(" ")).toMatch(/Wikiloc/i);
    expect(restDay.routeFile).toBeUndefined();
    expect(restDay.title).toContain("Nha Trang");
    expect(restDay.roads).toContain("Nha Trang base");
    expect(restDay.stops.join(" ")).toMatch(/Good sea/i);
    expect(restDay.stops.join(" ")).toMatch(/Poor sea/i);
    expect(restDay.note).toMatch(/not try to complete the sea plan and city plan together/i);
  });

  it("makes Phú Ninh Lake the Day 11 destination and Day 12 starting point", () => {
    const lakeDay = itinerary.days[10];
    const finalDay = itinerary.days[11];

    expect(lakeDay.title).toBe("Sa Huỳnh → Phú Ninh Lake");
    expect(lakeDay.placeIds).toContain("phu-ninh-lake");
    expect(lakeDay.note).toMatch(/stay nearby|stay at the lake|stay/i);
    expect(finalDay.title).toBe("Phú Ninh Lake → Đà Nẵng");
    expect(finalDay.roads).toMatch(/^Phú Ninh Lake/);
    expect(finalDay.placeIds).toContain("phu-ninh-lake");
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

  it("gives every day at least one curated creator resource", () => {
    for (const day of itinerary.days) {
      expect(day.creatorResources.length, `Day ${day.day} resources`).toBeGreaterThan(0);
      for (const resource of day.creatorResources) {
        expect(resource.platform).toBe("YouTube");
        expect(["English", "Vietnamese"]).toContain(resource.language);
        expect(resource.title.length).toBeGreaterThan(8);
        expect(resource.creator.length).toBeGreaterThan(2);
        expect(resource.note.length).toBeGreaterThan(20);
        expect(resource.url).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=/);
      }
    }
  });

  it("gives every day three six-person stay choices in the requested order", () => {
    for (const day of itinerary.days) {
      expect(validateStayPlan(day.stayPlan), `Day ${day.day} stay plan`).toBe(true);
      expect(day.stayPlan.location.length).toBeGreaterThan(2);
      expect(day.stayPlan.note.length).toBeGreaterThan(10);

      for (const stay of day.stayPlan.stays) {
        expect(stay.name.length).toBeGreaterThan(5);
        expect(stay.priceUsd).toMatch(/^\$/);
        expect(stay.priceVnd).toMatch(/VND$/);
        expect(stay.setup).toMatch(/six|6/i);
        expect(stay.why.length).toBeGreaterThan(20);
        expect(stay.url).toMatch(/^https:\/\//);
      }
    }
  });

  it("keeps the two-night city stays as single bookings", () => {
    expect(itinerary.days[4].stayPlan.note).toMatch(/Nights 5 and 6/i);
    expect(itinerary.days[5].stayPlan.note).toMatch(/Second night/i);
    expect(itinerary.days[6].stayPlan.note).toMatch(/Nights 7 and 8/i);
    expect(itinerary.days[7].stayPlan.note).toMatch(/Second night/i);
    expect(itinerary.days[11].stayPlan.note).toMatch(/Optional post-trip night/i);
  });

  it("contains no removed route or variant content", () => {
    const content = JSON.stringify(itinerary);
    expect(content).not.toMatch(/K[’']?Bang|Lò Xo|Bờ Y|Khâm Đức|Yok Đôn|Núi Chúa|Ninh Thuận/i);
  });
});
