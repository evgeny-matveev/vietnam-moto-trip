import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { itinerary, sources } from "./itineraries.js";

const guide = readFileSync("docs/ride-plan.md", "utf8");

function daySection(dayNumber) {
  const start = guide.indexOf(`## День ${dayNumber} `);
  const nextHeading = dayNumber < 12 ? `## День ${dayNumber + 1} ` : "## Как пользоваться";
  const end = guide.indexOf(nextHeading, start);
  return guide.slice(start, end);
}

function guideOverview(dayNumber) {
  const section = daySection(dayNumber);
  const contentStart = section.indexOf("\n\n") + 2;
  const contentEnd = section.indexOf("\n### ");
  return section.slice(contentStart, contentEnd).trim();
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

describe("русский путеводитель", () => {
  it("uses the exact editorial heading, brand and compact route figures", () => {
    expect(guide).toContain("# К югу от границы, на запад от солнца");
    expect(guide).toContain("## Верхом на байках по югу Вьетнама");
    expect(guide).toContain(`**${itinerary.atAGlance.join(" · ")}**`);
    expect(itinerary.distance).toBe("около 1 750 км");
  });

  it("contains twelve ordered and substantial Russian day chapters", () => {
    const positions = itinerary.days.map((day) => guide.indexOf(`## День ${day.day} `));
    expect(positions.every((position) => position >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    expect(guide.match(/^## День \d+ /gm)).toHaveLength(12);

    for (const day of itinerary.days) {
      const section = daySection(day.day);
      expect(section.length, `День ${day.day}`).toBeGreaterThan(1_500);
      expect(section).toContain(day.distance);
      expect(section).toMatch(/### (Дорога|Передвижение)/);
      expect(section).toContain("### Посмотреть перед выездом");
    }
  });

  it("copies each guide day overview into the map day data", () => {
    for (const day of itinerary.days) {
      expect(day.summary, `Day ${day.day} keeps no obsolete summary`).toBeUndefined();
      expect(day.overview, `Day ${day.day} overview`).toBeTruthy();
      expect(normalizeWhitespace(day.overview), `Day ${day.day} overview`).toBe(
        normalizeWhitespace(guideOverview(day.day)),
      );
    }
  });

  it("keeps every creator resource and every accommodation price in the guide", () => {
    for (const day of itinerary.days) {
      const section = daySection(day.day);
      for (const resource of day.creatorResources) {
        expect(section, resource.title).toContain(resource.url);
      }
      for (const stay of day.stayPlan.stays) {
        expect(section, stay.name).toContain(stay.name);
        expect(section, stay.pricePerPersonUsd).toContain(stay.pricePerPersonUsd);
        expect(section, stay.pricePerPersonVnd).toContain(stay.pricePerPersonVnd);
      }
    }
  });

  it("documents navigation, the budget and the provisional ĐT639 day", () => {
    expect(guide).toContain("9.9–13.9m VND");
    expect(guide).toContain("≈12m VND / ≈$450");
    expect(guide).toContain("/#route-downloads");
    expect(guide).toMatch(/GPX.*OsmAnd/s);
    expect(guide).toMatch(/KML.*Google My Maps/s);
    expect(guide).toMatch(/GeoJSON.*Organic Maps/s);
    expect(daySection(10)).toContain(sources.dt639);
  });

  it("contains authoritative Russian forms and no former English brand copy", () => {
    expect(guide).toContain("Đà Nẵng (Дананг)");
    expect(guide).toContain("Hội An (Хойан)");
    expect(guide).toContain("Nha Trang (Нячанг)");
    expect(guide).not.toContain("Quiet Roads Vietnam");
    expect(guide).not.toContain("Highlands south, coast home");
  });
});
