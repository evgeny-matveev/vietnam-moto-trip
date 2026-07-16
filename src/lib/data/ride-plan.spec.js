import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { itinerary, sources } from "./itineraries.js";
import { getPlace } from "./places.js";

const guide = readFileSync("docs/ride-plan.md", "utf8");

function daySection(dayNumber) {
  const start = guide.indexOf(`## Day ${dayNumber} `);
  const nextHeading =
    dayNumber < 12 ? `## Day ${dayNumber + 1} ` : "## How to use the places on the map";
  const end = guide.indexOf(nextHeading, start);
  return guide.slice(start, end);
}

function narrativeWordCount(section) {
  return section
    .slice(0, section.indexOf("### Road reality"))
    .replace(/\[[^\]]+\]\([^)]+\)/g, " ")
    .replace(/[#*|–→·\d]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function expectedDuration(place) {
  const [minimum, maximum] = place.visitMinutes;
  const options = [`${minimum}–${maximum} min`];
  if (minimum % 60 === 0 && maximum % 60 === 0) {
    options.push(`${minimum / 60}–${maximum / 60} hr`);
  }
  return options;
}

describe("the complete ride plan", () => {
  it("uses the itinerary summary and corrected planning distance", () => {
    expect(guide).toContain(`**${itinerary.atAGlance.join(" · ")}**`);
    expect(itinerary.distance).toBe("approximately 1,750 km");
    expect(guide).not.toContain("Approximately 1,650–1,800 km");
  });

  it("contains twelve ordered, substantial day chapters", () => {
    const positions = itinerary.days.map((day) => guide.indexOf(`## Day ${day.day} `));

    expect(positions.every((position) => position >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    expect(guide.match(/^## Day \d+ /gm)).toHaveLength(12);

    for (const day of itinerary.days) {
      const section = daySection(day.day);
      expect(narrativeWordCount(section), `Day ${day.day} narrative`).toBeGreaterThanOrEqual(300);
      expect(section).toContain("### Road reality, fuel and food");
      expect(section).toContain("**Stop priority:**");
      expect(section).toContain("**Weather decision:**");
      expect(section).toContain("**Arrival plan:**");
      expect(section).toContain(day.distance);
    }
  });

  it("keeps every mapped place and authoritative source in the correct day", () => {
    for (const day of itinerary.days) {
      const section = daySection(day.day);
      for (const placeId of day.placeIds) {
        const place = getPlace(placeId);
        expect(section, `Day ${day.day}: ${place.name}`).toContain(place.name);
        expect(
          expectedDuration(place).some((duration) => section.includes(duration)),
          `Day ${day.day}: ${place.name} duration`,
        ).toBe(true);
        for (const source of place.sources) {
          expect(section, `Day ${day.day}: ${source.url}`).toContain(source.url);
        }
      }
    }
  });

  it("includes every creator resource and stay under its day", () => {
    for (const day of itinerary.days) {
      const section = daySection(day.day);
      expect(section).toContain("### Watch before riding");

      for (const resource of day.creatorResources) {
        expect(section).toContain(resource.title);
        expect(section).toContain(resource.url);
      }

      for (const stay of day.stayPlan.stays) {
        expect(section).toContain(stay.name);
        expect(section).toContain(stay.url);
        expect(section).toContain(stay.pricePerPersonUsd);
        expect(section).toContain(stay.pricePerPersonVnd);
      }
    }
  });

  it("includes activity costs without adding activities to Days 1 or 12", () => {
    expect(daySection(1)).not.toContain("### Optional activity");
    expect(daySection(12)).not.toContain("### Optional activity");

    for (const day of itinerary.days.filter((candidate) => candidate.activities.length)) {
      const section = daySection(day.day);
      for (const activity of day.activities) {
        expect(section).toContain(activity.name);
        if (activity.pricing.status === "published") {
          expect(section).toContain(activity.pricing.source.url);
        } else {
          expect(section).toMatch(/quote required/i);
        }
      }
    }
  });

  it("documents the calculated baseline and navigation workflow", () => {
    expect(guide).toContain("9.9–13.9m VND");
    expect(guide).toContain("≈12m VND / ≈$450");
    expect(guide).toContain("eleven route nights");
    expect(guide).toContain("optional Day 12 hotel");
    expect(guide).toContain("/#route-downloads");
    expect(guide).toMatch(/GPX.*OsmAnd/s);
    expect(guide).toMatch(/KML.*Google My Maps/s);
    expect(guide).toMatch(/GeoJSON.*Organic Maps/s);
    expect(guide).toMatch(/offline maps/i);
    expect(guide).toMatch(/Automatic recalculation/i);
  });

  it("uses the relevant May 2026 ĐT639 status source", () => {
    expect(daySection(10)).toContain(sources.dt639);
    expect(daySection(10)).toContain("baoxaydung.vn/gia-lai-gan-1ha-phi-lao");
    expect(daySection(10)).not.toContain("baodautu.vn/binh-dinh-du-an-tuyen-duong-ven-bien");
  });
});
