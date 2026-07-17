import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { itinerary } from "./itineraries.js";

const appHtml = readFileSync("src/app.html", "utf8");
const homePage = readFileSync("src/routes/+page.svelte", "utf8");
const guidePage = readFileSync("src/routes/guide/+page.svelte", "utf8");
const siteHeader = readFileSync("src/lib/components/SiteHeader.svelte", "utf8");

describe("Russian localization", () => {
  it("sets the document language and exact editorial identity", () => {
    expect(appHtml).toContain('<html lang="ru">');
    expect(itinerary.name).toBe("К югу от границы, на запад от солнца");
    expect(homePage).toContain(
      "<title>К югу от границы, на запад от солнца — мотопутешествие по Вьетнаму</title>",
    );
    expect(homePage).not.toContain(">К югу от границы, на запад от солнца</h1>");
    expect(siteHeader).toContain(">Верхом на байках по югу Вьетнама</a>");
  });

  it("keeps representative established Russian place forms and translated metadata", () => {
    const publicCopy = `${JSON.stringify(itinerary)}\n${homePage}\n${guidePage}`;
    expect(publicCopy).toContain("Дананг (Đà Nẵng)");
    expect(publicCopy).toContain("Хойан (Hội An)");
    expect(publicCopy).toContain("Нячанг (Nha Trang)");
    expect(publicCopy).not.toMatch(/Хо\s+ши\s+мин/i);
    expect(publicCopy).not.toContain("Quiet Roads Vietnam");
    expect(publicCopy).not.toContain("Highlands south, coast home");
  });
});
