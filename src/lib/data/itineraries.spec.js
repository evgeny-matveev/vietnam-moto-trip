import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { itineraries, itineraryOptions } from "./itineraries.js";

describe("itineraries", () => {
  it("provides four complete 12-day route choices", () => {
    expect(itineraryOptions).toHaveLength(4);
    for (const itinerary of itineraryOptions) {
      expect(itinerary.days).toHaveLength(12);
      expect(itinerary.days.map((day) => day.day)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    }
  });

  it("keeps every road day connected to committed geometry", () => {
    for (const itinerary of itineraryOptions) {
      for (const day of itinerary.days.filter((item) => item.routeFile)) {
        expect(existsSync(`static/routes/${day.routeFile}`), day.routeFile).toBe(true);
      }
    }
  });

  it("includes hiking and spontaneous stop choices without checklist content", () => {
    const content = JSON.stringify(itineraries);
    expect(content).toContain("Lang Biang");
    expect(content).toContain("Choose");
    expect(content).not.toMatch(/packing|licen[cs]e|rental checklist/i);
  });
});
