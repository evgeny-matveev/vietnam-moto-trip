import { describe, expect, it } from "vitest";
import {
  filterPlacesByCategory,
  placeCategories,
  places,
  placesForIds,
  placesForItinerary,
} from "./places.js";
import { itinerary } from "./itineraries.js";

describe("places", () => {
  it("has unique, categorized and source-backed records", () => {
    const categoryIds = new Set(placeCategories.map((category) => category.id));
    expect(new Set(places.map((place) => place.id)).size).toBe(places.length);
    expect(categoryIds).toEqual(
      new Set(["waterfall", "park", "nature", "viewpoint", "culture", "history"]),
    );
    for (const category of placeCategories) {
      expect(category.symbol.length, category.id).toBeGreaterThan(0);
      expect(category).not.toHaveProperty("color");
    }

    expect(placeCategories.find((category) => category.id === "nature")?.symbol).toBe("🍄︎");

    for (const place of places) {
      expect(place.id).toMatch(/^[a-z0-9-]+$/);
      expect(categoryIds.has(place.category), place.id).toBe(true);
      expect(place.coordinates).toHaveLength(2);
      expect(place.coordinates[0], place.id).toBeGreaterThan(106);
      expect(place.coordinates[0], place.id).toBeLessThan(111);
      expect(place.coordinates[1], place.id).toBeGreaterThan(10);
      expect(place.coordinates[1], place.id).toBeLessThan(18);
      expect(place.whyWorthIt.length, place.id).toBeGreaterThan(30);
      expect(place.visitMinutes).toHaveLength(2);
      expect(place.visitMinutes[0], place.id).toBeGreaterThan(0);
      expect(place.visitMinutes[1], place.id).toBeGreaterThanOrEqual(place.visitMinutes[0]);
      expect(place.detourKm, place.id).toBeGreaterThanOrEqual(0);
      expect(place.sources.length, place.id).toBeGreaterThan(0);
      for (const source of place.sources) {
        expect(source.label.length, place.id).toBeGreaterThan(2);
        expect(() => new URL(source.url), `${place.id}: ${source.url}`).not.toThrow();
      }
    }
  });

  it("groups coasts, beaches and hot-mineral places as natural landmarks", () => {
    const naturalLandmarkIds = [
      "an-bang",
      "cua-dai",
      "phu-ninh-lake",
      "hon-chong",
      "mud-baths",
      "nha-trang-beach",
      "dai-lanh",
      "mui-dien",
      "ganh-da-dia",
      "o-loan",
      "ghenh-rang",
      "eo-gio",
      "sa-huynh",
      "my-khe-quang-ngai",
      "ba-lang-an",
    ];

    for (const id of naturalLandmarkIds) {
      expect(places.find((place) => place.id === id)?.category, id).toBe("nature");
    }
  });

  it("associates every catalog place with at least one route day", () => {
    const routePlaces = placesForItinerary(itinerary);
    expect(new Set(routePlaces.map((place) => place.id))).toEqual(
      new Set(places.map((place) => place.id)),
    );
  });

  it("preserves requested order and ignores unknown place IDs", () => {
    expect(placesForIds(["hon-mun", "not-a-place", "po-nagar"]).map((place) => place.id)).toEqual([
      "hon-mun",
      "po-nagar",
    ]);
  });

  it("filters the visible place set without changing its source", () => {
    const nhaTrangPlaces = placesForIds(itinerary.days[7].placeIds);
    const historyOnly = filterPlacesByCategory(nhaTrangPlaces, ["history"]);

    expect(historyOnly.map((place) => place.id)).toEqual(["po-nagar", "oceanographic-museum"]);
    expect(nhaTrangPlaces).toHaveLength(7);
  });
});
