import { describe, expect, it } from "vitest";
import { boundsForFeatures, coordinatesFromGeometry } from "./route-utils.js";

describe("route map helpers", () => {
  it("extracts coordinates and computes geographic bounds", () => {
    const features = [
      {
        geometry: {
          type: "LineString",
          coordinates: [
            [108, 14],
            [109, 12],
          ],
        },
      },
      { geometry: { type: "Point", coordinates: [107.5, 15] } },
    ];

    expect(boundsForFeatures(features)).toEqual({
      west: 107.5,
      south: 12,
      east: 109,
      north: 15,
    });
  });

  it("returns no bounds for empty geometry", () => {
    expect(coordinatesFromGeometry(null)).toEqual([]);
    expect(boundsForFeatures([])).toBeNull();
  });
});
