import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { dayResources } from "./day-resources.js";

const resources = Object.values(dayResources).flat();

describe("video resources", () => {
  it("keeps all existing videos and adds ten Russian-language perspectives", () => {
    expect(resources).toHaveLength(24);
    expect(resources.filter((resource) => resource.language === "Русский")).toHaveLength(10);

    for (const day of Object.values(dayResources)) {
      const firstNonRussian = day.findIndex((resource) => resource.language !== "Русский");
      const lastRussian = day.findLastIndex((resource) => resource.language === "Русский");
      if (lastRussian >= 0 && firstNonRussian >= 0)
        expect(lastRussian).toBeLessThan(firstNonRussian);
    }
  });

  it("gives every YouTube URL a matching local JPEG thumbnail", () => {
    for (const resource of resources) {
      const videoId = new URL(resource.url).searchParams.get("v");
      expect(resource.thumbnail).toBe(`/images/video-thumbnails/${videoId}.jpg`);
      const filename = `static${resource.thumbnail}`;
      expect(existsSync(filename), filename).toBe(true);
      expect(readFileSync(filename).subarray(0, 2)).toEqual(Buffer.from([0xff, 0xd8]));
    }
  });
});
