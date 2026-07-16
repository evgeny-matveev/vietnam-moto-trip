export function featureCollection(features = []) {
  return { type: "FeatureCollection", features };
}

export function coordinatesFromGeometry(geometry) {
  if (!geometry) return [];
  if (geometry.type === "Point") return [geometry.coordinates];
  if (geometry.type === "LineString" || geometry.type === "MultiPoint") {
    return geometry.coordinates;
  }
  if (geometry.type === "MultiLineString" || geometry.type === "Polygon") {
    return geometry.coordinates.flat();
  }
  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates.flat(2);
  }
  return [];
}

export function boundsForFeatures(features) {
  const coordinates = features.flatMap((feature) => coordinatesFromGeometry(feature.geometry));
  if (coordinates.length === 0) return null;

  return coordinates.reduce(
    (bounds, [longitude, latitude]) => ({
      west: Math.min(bounds.west, longitude),
      south: Math.min(bounds.south, latitude),
      east: Math.max(bounds.east, longitude),
      north: Math.max(bounds.north, latitude),
    }),
    {
      west: coordinates[0][0],
      south: coordinates[0][1],
      east: coordinates[0][0],
      north: coordinates[0][1],
    },
  );
}
