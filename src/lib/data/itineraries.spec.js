import { existsSync, readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { itinerary } from "./itineraries.js";
import { getPlace } from "./places.js";
import { staysForDay, validateStayPlan } from "./stays.js";

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
      "≈ 1 750 км",
      "в среднем 175 км / 5 ч",
      "поход в горах Đà Lạt (Далата)",
      "день отдыха в Nha Trang (Нячанге)",
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
    expect(hikingDay.roads).toBe("Междугородних переездов нет");
    expect(hikingDay.stops.join(" ")).toMatch(/Lang Biang.*9,7 км.*685 м/i);
    expect(hikingDay.stops.join(" ")).toMatch(/Đa Phú.*4 км.*195 м/i);
    expect(hikingDay.stops.join(" ")).toMatch(/Xuân Hương.*7 км.*50 м/i);
    expect(hikingDay.stops.join(" ")).toMatch(/официальный маршрут Bidoup–Núi Bà/i);
    expect(hikingDay.stops.join(" ")).toMatch(/частные земли/i);
    expect(hikingDay.sources.map((source) => source.label).join(" ")).toMatch(/AllTrails/i);
    expect(hikingDay.sources.map((source) => source.label).join(" ")).toMatch(/Komoot/i);
    expect(hikingDay.sources.map((source) => source.label).join(" ")).toMatch(/Wikiloc/i);
    expect(restDay.routeFile).toBeUndefined();
    expect(restDay.title).toContain("Nha Trang");
    expect(restDay.roads).toContain("База в Nha Trang");
    expect(restDay.stops.join(" ")).toMatch(/Спокойное море/i);
    expect(restDay.stops.join(" ")).toMatch(/Плохое море/i);
    expect(restDay.note).toMatch(/Не пытайтесь уместить морскую и городскую программы/i);
  });

  it("makes Phú Ninh Lake the Day 11 destination and Day 12 starting point", () => {
    const lakeDay = itinerary.days[10];
    const finalDay = itinerary.days[11];

    expect(lakeDay.title).toBe("Sa Huỳnh (Сахюинь) → озеро Phú Ninh (Фунин)");
    expect(lakeDay.placeIds).toContain("phu-ninh-lake");
    expect(lakeDay.note).toMatch(/ночуйте рядом/i);
    expect(finalDay.title).toBe("озеро Phú Ninh (Фунин) → Đà Nẵng (Дананг)");
    expect(finalDay.roads).toMatch(/^озеро Phú Ninh/);
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
        expect(["Русский", "Английский", "Вьетнамский"]).toContain(resource.language);
        expect(resource.title.length).toBeGreaterThan(8);
        expect(resource.creator.length).toBeGreaterThan(2);
        expect(resource.note.length).toBeGreaterThan(20);
        expect(resource.url).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=/);
        expect(resource.thumbnail).toMatch(/^\/images\/video-thumbnails\/[\w-]+\.jpg$/);
      }
    }
  });

  it("adds source-backed optional activities only where the schedule can absorb them", () => {
    const activeDays = itinerary.days.filter((day) => day.activities.length);
    const allActivities = activeDays.flatMap((day) => day.activities);

    expect(activeDays.map((day) => day.day)).toEqual([5, 6, 8, 11]);
    expect(new Set(allActivities.map((activity) => activity.kind))).toEqual(
      new Set(["water-park", "paddling", "rafting", "adventure", "hot-spring"]),
    );
    expect(new Set(allActivities.map((activity) => activity.id)).size).toBe(allActivities.length);

    for (const activity of allActivities) {
      expect(activity.name.length).toBeGreaterThan(8);
      expect(activity.symbol.length).toBeGreaterThan(0);
      expect(activity.time.length).toBeGreaterThan(3);
      expect(activity.detour.length).toBeGreaterThan(8);
      expect(activity.summary.length).toBeGreaterThan(40);
      expect(activity.condition.length).toBeGreaterThan(60);
      expect(activity.sources.length).toBeGreaterThan(0);
      for (const source of activity.sources) expect(source.url).toMatch(/^https:\/\//);
    }
  });

  it("keeps major activities as substitutions and weather-sensitive ones conditional", () => {
    const activitiesFor = (day) => itinerary.days[day - 1].activities;
    const day6 = JSON.stringify(activitiesFor(6));
    const day8 = JSON.stringify(activitiesFor(8));
    const day11 = JSON.stringify(activitiesFor(11));

    expect(activitiesFor(1)).toEqual([]);
    expect(day6).toMatch(/вместо горного похода/i);
    expect(day6).toMatch(/лицензированного оператора/i);
    expect(day6).toMatch(/ливня|опасном течении|гроз/i);
    expect(day8).toMatch(/вместо островной или городской программы/i);
    expect(day11).toMatch(/подтвердите работу|уточните на месте/i);
    expect(activitiesFor(12)).toEqual([]);
  });

  it("gives every day three six-person stay choices in the requested order", () => {
    for (const day of itinerary.days) {
      expect(validateStayPlan(day.stayPlan), `Day ${day.day} stay plan`).toBe(true);
      expect(day.stayPlan.location.length).toBeGreaterThan(2);
      expect(day.stayPlan.note.length).toBeGreaterThan(10);

      for (const stay of day.stayPlan.stays) {
        expect(stay.id).toMatch(/^[a-z0-9-]+$/);
        expect(stay.coordinates).toHaveLength(2);
        expect(stay.coordinates[0], stay.id).toBeGreaterThan(106);
        expect(stay.coordinates[0], stay.id).toBeLessThan(111);
        expect(stay.coordinates[1], stay.id).toBeGreaterThan(10);
        expect(stay.coordinates[1], stay.id).toBeLessThan(18);
        expect(stay.name.length).toBeGreaterThan(5);
        expect(stay.pricePerPersonUsd).toMatch(/^\$/);
        expect(stay.pricePerPersonVnd).toMatch(/VND$/);
        expect(stay.priceRangeVnd.min).toBeGreaterThan(100_000);
        expect(stay.priceRangeVnd.max).toBeGreaterThanOrEqual(stay.priceRangeVnd.min);
        expect(stay.setup.length).toBeGreaterThan(20);
        expect(stay.why.length).toBeGreaterThan(20);
        expect(stay.url).toMatch(/^https:\/\//);
        if (stay.category === "special") expect(stay.experience.length).toBeGreaterThan(5);
      }
    }
  });

  it("gives every optional activity a published price or an explicit quote state", () => {
    const activities = itinerary.days.flatMap((day) => day.activities);

    for (const activity of activities) {
      expect(["published", "quote-required"]).toContain(activity.pricing.status);
      expect(activity.pricing.note).toMatch(/базов|цен|тариф|опубликован/i);

      if (activity.pricing.status === "published") {
        expect(activity.pricing.rangeVnd.min).toBeGreaterThan(0);
        expect(activity.pricing.rangeVnd.max).toBeGreaterThanOrEqual(activity.pricing.rangeVnd.min);
        expect(activity.pricing.source.url).toMatch(/^https:\/\//);
      } else {
        expect(activity.pricing.rangeVnd).toBeUndefined();
      }
    }
  });

  it("returns only the three stays attached to the selected day", () => {
    expect(staysForDay(itinerary.days[0]).map((stay) => stay.category)).toEqual([
      "special",
      "luxury",
      "regular",
    ]);
    expect(staysForDay(null)).toEqual([]);
  });

  it("keeps the two-night city stays as single bookings", () => {
    expect(itinerary.days[4].stayPlan.note).toMatch(/пятую и шестую ночи/i);
    expect(itinerary.days[5].stayPlan.note).toMatch(/Вторая ночь/i);
    expect(itinerary.days[6].stayPlan.note).toMatch(/седьмую и восьмую ночи/i);
    expect(itinerary.days[7].stayPlan.note).toMatch(/Вторая ночь/i);
    expect(itinerary.days[11].stayPlan.note).toMatch(/Необязательная ночь/i);
  });

  it("contains no removed route or variant content", () => {
    const content = JSON.stringify(itinerary);
    expect(content).not.toMatch(/K[’']?Bang|Lò Xo|Bờ Y|Khâm Đức|Yok Đôn|Núi Chúa|Ninh Thuận/i);
  });
});
