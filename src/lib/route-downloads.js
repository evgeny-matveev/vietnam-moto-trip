import { featureCollection } from "$lib/route-utils.js";

const GPX_NAMESPACE = "http://www.topografix.com/GPX/1/1";
const GPX_SCHEMA = "http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd";

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function routeTitle(feature) {
  return feature.properties?.title ?? `День ${feature.properties?.day ?? "маршрут"}`;
}

function routeCoordinates(feature) {
  return feature.geometry?.type === "LineString" ? feature.geometry.coordinates : [];
}

export async function loadRouteFeatures(itinerary, fetcher = fetch) {
  const routeDays = itinerary.days.filter((day) => day.routeFile);
  return Promise.all(
    routeDays.map(async (day) => {
      const response = await fetcher(`/routes/${day.routeFile}`);
      if (!response.ok) throw new Error(`Не удалось загрузить день ${day.day}`);

      const geojson = await response.json();
      const feature = geojson.features?.[0];
      if (!feature?.geometry) throw new Error(`У дня ${day.day} нет геометрии маршрута`);

      return {
        ...feature,
        properties: {
          ...feature.properties,
          day: day.day,
          kind: day.kind,
          title: day.title,
        },
      };
    }),
  );
}

export function geoJsonFromFeatures(features) {
  return `${JSON.stringify(featureCollection(features), null, 2)}\n`;
}

export function gpxFromFeatures(features, name = "Верхом на байках по югу Вьетнама") {
  const tracks = features
    .map((feature) => {
      const points = routeCoordinates(feature)
        .map(([longitude, latitude]) => `      <trkpt lat="${latitude}" lon="${longitude}" />`)
        .join("\n");
      return `    <trk>\n      <name>${escapeXml(routeTitle(feature))}</name>\n      <type>motorcycling</type>\n      <trkseg>\n${points}\n      </trkseg>\n    </trk>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Верхом на байках по югу Вьетнама" xmlns="${GPX_NAMESPACE}" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="${GPX_SCHEMA}">
  <metadata>
    <name>${escapeXml(name)}</name>
    <desc>Треки мотопутешествия «Верхом на байках по югу Вьетнама».</desc>
  </metadata>
${tracks}
</gpx>
`;
}

export function kmlFromFeatures(features, name = "Верхом на байках по югу Вьетнама") {
  const placemarks = features
    .map((feature) => {
      const coordinates = routeCoordinates(feature)
        .map(([longitude, latitude]) => `${longitude},${latitude},0`)
        .join(" ");
      return `    <Placemark>\n      <name>${escapeXml(routeTitle(feature))}</name>\n      <styleUrl>#route</styleUrl>\n      <LineString>\n        <tessellate>1</tessellate>\n        <coordinates>${coordinates}</coordinates>\n      </LineString>\n    </Placemark>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>${escapeXml(name)}</name>
    <Style id="route">
      <LineStyle>
        <color>ffb45309</color>
        <width>4</width>
      </LineStyle>
    </Style>
${placemarks}
  </Document>
</kml>
`;
}
