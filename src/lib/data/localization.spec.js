import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { itinerary } from "./itineraries.js";

const appHtml = readFileSync("src/app.html", "utf8");
const layoutPage = readFileSync("src/routes/+layout.svelte", "utf8");
const homePage = readFileSync("src/routes/+page.svelte", "utf8");
const guidePage = readFileSync("src/routes/guide/+page.svelte", "utf8");
const siteHeader = readFileSync("src/lib/components/SiteHeader.svelte", "utf8");
const socialPreview = readFileSync("static/images/social/route-preview.jpg");

const socialPreviewUrl = "https://vietnam-moto-trip.vercel.app/images/social/route-preview.jpg";

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

  it("publishes a complete social preview for the home page and guide", () => {
    expect(socialPreview.subarray(0, 2)).toEqual(Buffer.from([0xff, 0xd8]));
    expect(layoutPage).toContain(socialPreviewUrl);
    expect(layoutPage).toMatch(/property="og:image:width" content="1200"/);
    expect(layoutPage).toMatch(/property="og:image:height" content="630"/);
    expect(layoutPage).toMatch(/property="og:image:alt" content=\{socialPreviewAlt\}/);
    expect(layoutPage).toMatch(/name="twitter:card" content="summary_large_image"/);
    expect(layoutPage).toMatch(/name="twitter:image" content=\{socialPreviewUrl\}/);
    expect(homePage).toContain(
      '<link rel="canonical" href="https://vietnam-moto-trip.vercel.app/" />',
    );
    expect(homePage).toContain(
      '<meta property="og:url" content="https://vietnam-moto-trip.vercel.app/" />',
    );
    expect(guidePage).toContain(
      '<link rel="canonical" href="https://vietnam-moto-trip.vercel.app/guide" />',
    );
    expect(guidePage).toContain(
      '<meta property="og:url" content="https://vietnam-moto-trip.vercel.app/guide" />',
    );
  });
});
