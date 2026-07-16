import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { activitiesByDay } from "./activities.js";

describe("activity photo metadata", () => {
  it("gives every activity either an exact three-photo gallery or a photo-preview fallback", () => {
    const activities = Object.values(activitiesByDay).flat();

    for (const activity of activities) {
      const hasLocalGallery = activity.photos.length === 3;
      const hasExternalPhotoFallback = activity.photos.length === 0 && activity.photoFallback;

      expect(hasLocalGallery || hasExternalPhotoFallback, activity.id).toBeTruthy();

      if (hasLocalGallery) {
        expect(activity).not.toHaveProperty("photoFallback");
        for (const photo of activity.photos) {
          expect(photo.alt.length, activity.id).toBeGreaterThan(10);
          expect(existsSync(join(process.cwd(), "static", photo.src)), photo.src).toBe(true);
          expect(
            () => new URL(photo.credit.url),
            `${activity.id}: ${photo.credit.url}`,
          ).not.toThrow();
          expect(photo.credit.url.startsWith("https://"), activity.id).toBe(true);
        }
      } else {
        expect(() => new URL(activity.photoFallback.url), activity.id).not.toThrow();
        expect(activity.photoFallback.url.startsWith("https://"), activity.id).toBe(true);
      }
    }
  });
});
