export const sources = {
  seasonalForecast:
    "https://nchmf.gov.vn/kttvsite/vi-VN/1/ban-tin-du-bao-canh-bao-khi-hau-thoi-han-mua-tren-pham-vi-toan-quoc-tu-thang-8-2026-01-2027-post53548.html",
  shortRangeForecast: "https://nchmf.gov.vn/kttvsite/",
  nhaTrang: "https://vietnam.travel/places-to-go/central-vietnam/nha-trang",
  dt639:
    "https://baodautu.vn/binh-dinh-du-an-tuyen-duong-ven-bien-tang-von-dau-tu-hon-230-ty-dong-d205710.html",
};

const days = [
  {
    day: 1,
    title: "Đà Nẵng → Tam Thanh",
    summary:
      "A deliberately light opening through Hội An countryside and the open Quảng Nam coast.",
    roads: "Đà Nẵng → Non Nước → Cửa Đại → Võ Chí Công coastal road → Tam Thanh",
    distance: "95–115 km",
    rideTime: "3–4 hr riding",
    kind: "outbound",
    routeFile: "relaxed-day-01.geojson",
    roadCharacter: "Quiet coast and village connectors; avoid entering Hội An’s old-town traffic.",
    placeIds: ["marble-mountains", "hoi-an", "an-bang", "cua-dai", "tam-thanh"],
    stops: [
      "Choose Marble Mountains or a longer Hội An pause, not both",
      "Cross the rice fields rather than riding through the old-town core",
      "Pick An Bàng, Cửa Đại or an unnamed beach lane for the first sea stop",
      "Walk Tam Thanh’s painted lanes before sunset",
    ],
    note: "The short start is a scooter, luggage and group-rhythm check before the highlands.",
    weatherFallback:
      "In persistent coastal rain, skip Marble Mountains’ slick steps and take the direct countryside line to Tam Thanh.",
  },
  {
    day: 2,
    title: "Tam Thanh → Măng Đen",
    summary: "Leave the coast through Ba Tơ and climb into cool pine country over Vi Ô Lắc.",
    roads: "Tam Thanh → Mỹ Khê → Ba Tơ → QL24 → Vi Ô Lắc Pass → Măng Đen",
    distance: "235–250 km",
    rideTime: "6–7 hr riding",
    kind: "outbound",
    routeFile: "relaxed-day-02.geojson",
    roadCharacter:
      "A long transition; traffic thins after Ba Tơ and the second half is mountain road.",
    placeIds: ["ba-to", "vi-o-lac", "pa-sy", "dak-ke", "kon-pring"],
    stops: [
      "Ba Tơ market and an early lunch before the climb",
      "Use only safe, fully off-road pull-offs on Vi Ô Lắc",
      "Choose Pa Sỹ, Đăk Ke or Kon Pring only if daylight remains",
    ],
    note: "Start early. Măng Đen attractions are optional; reaching town with daylight matters more.",
    weatherFallback:
      "If Vi Ô Lắc is under heavy rain or dense cloud, wait in Ba Tơ rather than committing to the pass late in the day.",
  },
  {
    day: 3,
    title: "Măng Đen → Kon Tum → Pleiku",
    summary:
      "A short highland day built around Ba Na architecture, tea country and volcanic landscapes.",
    roads: "Măng Đen → QL24 → Kon Tum → Biển Hồ lanes → Pleiku",
    distance: "100–125 km",
    rideTime: "3–4 hr riding",
    kind: "outbound",
    routeFile: "relaxed-day-03.geojson",
    roadCharacter:
      "Mostly straightforward highland roads with slow cultural and landscape detours.",
    placeIds: ["kon-tum-cathedral", "kon-klor", "kon-ko-tu", "bien-ho", "chu-dang-ya"],
    stops: [
      "Pair the Wooden Church with Kon Klor rather than racing through every city sight",
      "Treat Kon Kơ Tu as a living community and ask before photographing people",
      "Use the short distance for Biển Hồ, tea lanes or Chư Đăng Ya according to weather",
    ],
    note: "This is the breathing space between Day 2 and the necessary QL14 transfer.",
    weatherFallback:
      "Skip Chư Đăng Ya’s exposed slopes after heavy rain and take the direct Kon Tum–Pleiku road.",
  },
  {
    day: 4,
    title: "Pleiku → Buôn Ma Thuột → Lắk Lake",
    summary: "The purposeful main-road transfer, rewarded by a quiet lake finish.",
    roads: "Pleiku → Chư Sê → Buôn Hồ → Buôn Ma Thuột bypass → Lắk Lake",
    distance: "225–245 km",
    rideTime: "6–7 hr riding",
    kind: "outbound",
    routeFile: "relaxed-day-04.geojson",
    roadCharacter:
      "The trip’s unavoidable QL14 day: faster, busier and more exposed to trucks than the rest of the route.",
    placeIds: ["dray-sap", "dray-nur", "lak-lake"],
    stops: [
      "Leave early and keep a wide margin around buses and trucks",
      "Take one plantation or coffee stop, not repeated small detours",
      "Treat Dray Sáp or Dray Nur as a major substitution, never as quick additions",
      "Reach Lắk Lake for the last light",
    ],
    note: "The route is honest about this compromise: QL14 buys two calmer days around Đà Lạt and Nha Trang.",
    weatherFallback:
      "In thunderstorms, remove every waterfall and plantation detour and use the direct surfaced route to Lắk; stop in Buôn Ma Thuột if visibility collapses.",
  },
  {
    day: 5,
    title: "Lắk Lake → Đà Lạt",
    summary: "Climb through villages and coffee country on the slower western approach to Đà Lạt.",
    roads: "Lắk Lake → QL27 → Đinh Văn → Nam Ban → ĐT725 → Tà Nung → Đà Lạt",
    distance: "180–200 km",
    rideTime: "5–6 hr riding",
    kind: "outbound",
    routeFile: "relaxed-day-05.geojson",
    roadCharacter:
      "Slower provincial road with variable surface, village traffic and frequent bends.",
    placeIds: ["lak-lake", "elephant-waterfall", "ta-nung", "tuyen-lam"],
    stops: [
      "Take a final quiet lake morning before departure",
      "Pause at one coffee farm or roaster around Tà Nung",
      "Use Elephant Waterfall only if access and timing remain sensible",
      "Finish at a neighbourhood café rather than the night-market crush",
    ],
    note: "The surface and pace are part of the day; do not measure it by the number of attractions completed.",
    weatherFallback:
      "After sustained rain, skip waterfall access and stay on the main surfaced line through Nam Ban and Tà Nung.",
  },
  {
    day: 6,
    title: "Đà Lạt hiking day",
    summary:
      "A full day off the scooters with one substantial summit and two lighter alternatives.",
    roads: "No intercity riding",
    distance: "4–10 km walking",
    rideTime: "3–6 hr on foot",
    kind: "hike",
    mapAnchor: [108.4406, 12.0473],
    roadCharacter: "No luggage or mileage target; choose the walk after seeing the morning cloud.",
    placeIds: ["lang-biang", "da-phu", "tuyen-lam"],
    stops: [
      "Substantial: Lang Biang, roughly 9 km and 650–700 m ascent",
      "Shorter: Đa Phú hills, best early or late in the day",
      "Gentle: Tuyền Lâm pine lanes and lakeside paths",
      "Leave the second half of the day empty after the longer hike",
    ],
    note: "These are alternatives. The day succeeds when the group chooses the walk that fits the actual conditions.",
    weatherFallback:
      "Abandon exposed trails in thunder or persistent rain; use Tuyền Lâm, cafés and an unstructured recovery day instead.",
  },
  {
    day: 7,
    title: "Đà Lạt → Nha Trang",
    summary: "Descend from pine plateau through Bidoup forest to tropical Nha Trang.",
    roads: "Đà Lạt → Hòn Giao → Khánh Lê Pass → Khánh Vĩnh → Nha Trang",
    distance: "135–145 km",
    rideTime: "4–5 hr riding",
    kind: "return",
    routeFile: "relaxed-day-07.geojson",
    roadCharacter:
      "A long, winding scooter descent with few reasons to hurry and limited brake cooling.",
    placeIds: ["bidoup", "khanh-le", "nha-trang-beach"],
    stops: [
      "Let Hòn Giao’s forest and cloud changes be the attraction",
      "Use only fully separated pass pull-offs",
      "Pause regularly rather than riding the whole descent on the brakes",
      "Keep the first Nha Trang evening open for the beach and dinner",
    ],
    note: "The direction creates more braking work than the original climb; conservative speed is non-negotiable.",
    weatherFallback:
      "Do not start Khánh Lê in heavy rain or dense fog. Wait in Đà Lạt; if conditions remain poor, arrange vehicle transport instead of forcing the descent.",
    sources: [
      {
        label: "Khánh Hòa Police pass guidance",
        url: "https://congan.khanhhoa.gov.vn/vi/ky-nang-can-thiet-khi-lai-xe-tren-duong-deo-khanh-le",
      },
    ],
  },
  {
    day: 8,
    title: "Full Nha Trang day",
    summary: "A second night and a complete day chosen around the sea forecast.",
    roads: "Nha Trang base; no intercity riding",
    distance: "No distance target",
    rideTime: "Rest, city riding or an organised boat day",
    kind: "rest",
    mapAnchor: [109.198, 12.238],
    roadCharacter:
      "Leave the loaded scooters parked; city sights are close and the sea plan depends on conditions.",
    placeIds: [
      "nha-trang-beach",
      "po-nagar",
      "long-son",
      "hon-chong",
      "oceanographic-museum",
      "mud-baths",
      "hon-mun",
    ],
    stops: [
      "Good sea: choose one established Hòn Mun or island operator after checking warnings",
      "Poor sea: combine Po Nagar, the Oceanographic Museum and one slower recovery stop",
      "Long Sơn, Hòn Chồng and mud baths are alternatives, not extra obligations",
      "Keep the evening free for the promenade and seafood",
    ],
    note: "Do not try to complete the sea plan and city plan together. This day exists because the relaxed route saves the time.",
    weatherFallback:
      "Cancel all boat activity when marine warnings, swell or thunderstorms make the bay unsuitable; the city-and-mud-bath plan is equally complete.",
    sources: [{ label: "Official Nha Trang guide", url: sources.nhaTrang }],
  },
  {
    day: 9,
    title: "Nha Trang → Sông Cầu",
    summary: "A full Phú Yên day with one substantial coastal branch chosen over breakfast.",
    roads: "Nha Trang → Đại Lãnh → Vũng Rô / Phú Yên coast → Tuy Hòa → Sông Cầu",
    distance: "210–235 km",
    rideTime: "5–7 hr riding",
    kind: "return",
    routeFile: "relaxed-day-09.geojson",
    roadCharacter:
      "Coastal connectors and fishing roads, with short QL1A gaps where no parallel road exists.",
    placeIds: ["dai-lanh", "vung-ro", "mui-dien", "ganh-da-dia", "o-loan"],
    stops: [
      "South branch: Vũng Rô, Bãi Môn and Mũi Điện",
      "North branch: Ô Loan lagoon and Gành Đá Đĩa",
      "Choose one branch unless the group deliberately accepts a very long day",
      "Finish in quieter Sông Cầu rather than central Quy Nhơn",
    ],
    note: "The map shows the useful places; it does not turn them into a checklist.",
    weatherFallback:
      "In heavy coastal rain, drop both cape and reef detours and use the direct surfaced route through Tuy Hòa.",
  },
  {
    day: 10,
    title: "Sông Cầu → Quy Nhơn → Sa Huỳnh",
    summary: "Cliff road, Cham history and the quieter Bình Định coast in one purposeful day.",
    roads: "Sông Cầu → QL1D → Quy Nhơn → Cát Tiến → Đề Gi → Lộ Diêu → Sa Huỳnh",
    distance: "180–215 km",
    rideTime: "5–7 hr riding",
    kind: "return",
    routeFile: "relaxed-day-10.geojson",
    roadCharacter:
      "Preferred line uses open ĐT639 sections; construction may require local connectors and short QL1A gaps.",
    placeIds: [
      "ql1d-viewpoint",
      "ghenh-rang",
      "twin-towers",
      "banh-it",
      "eo-gio",
      "ong-nui",
      "sa-huynh",
    ],
    stops: [
      "Make one meaningful Quy Nhơn stop rather than circling every city landmark",
      "Choose the peninsula or Bánh Ít; they point in opposite directions",
      "Ask locally about open ĐT639 sections before leaving Quy Nhơn",
      "Reach Sa Huỳnh before dark",
    ],
    note: "This is the route’s provisional day: construction status matters more than the drawn line.",
    weatherFallback:
      "If ĐT639 is closed, flooded or actively under construction, use the shortest open connector to QL1A and return to the coast only when the line is confirmed open.",
    sources: [{ label: "ĐT639 project schedule", url: sources.dt639 }],
  },
  {
    day: 11,
    title: "Sa Huỳnh → Tam Thanh",
    summary: "Fishing villages, coastal history and volcanic headlands on the penultimate day.",
    roads: "Sa Huỳnh → Gò Cỏ → Mỹ Khê → Sơn Mỹ → Bà Làng An → Tam Thanh",
    distance: "175–200 km",
    rideTime: "5–6 hr riding",
    kind: "return",
    routeFile: "relaxed-day-11.geojson",
    roadCharacter:
      "Coastal and village roads with an inland bend to avoid Dung Quất’s port truck corridors.",
    placeIds: [
      "sa-huynh",
      "go-co",
      "my-khe-quang-ngai",
      "son-my",
      "ba-lang-an",
      "thien-an",
      "tam-thanh",
    ],
    stops: [
      "Start with Gò Cỏ or Sa Huỳnh salt country, not both at length",
      "Give Sơn Mỹ the quiet time appropriate to a memorial",
      "Choose Bà Làng An only when coastal visibility is good",
      "Use the inland bypass around industrial traffic",
    ],
    note: "The day is rich in choices, but Tam Thanh is the fixed overnight and daylight target.",
    weatherFallback:
      "Skip exposed capes and beaches, avoid low flooded coastal lanes, and use the inland Quảng Ngãi connector to Tam Thanh.",
  },
  {
    day: 12,
    title: "Tam Thanh → Đà Nẵng",
    summary: "A deliberately easy homeward ride through rice fields and parallel village roads.",
    roads: "Tam Thanh → Tam Kỳ countryside → Duy Xuyên → Hội An rice fields → Đà Nẵng",
    distance: "95–120 km",
    rideTime: "3–4 hr riding",
    kind: "return",
    routeFile: "relaxed-day-12.geojson",
    roadCharacter:
      "Low-pressure inland lanes that avoid repeating the Day 1 coast where practical.",
    placeIds: ["tam-thanh", "hoi-an", "marble-mountains"],
    stops: [
      "Take the slower rice-field line only while the lanes remain dry",
      "Use Hội An for lunch, not a final traffic obstacle",
      "Finish at the Đà Nẵng seafront with time to return the scooters",
    ],
    note: "The route ends easy on purpose; there is no final mountain test to prove.",
    weatherFallback:
      "If village lanes are flooded, use the most direct open surfaced route and prioritise a predictable arrival in Đà Nẵng.",
  },
];

export const itinerary = {
  id: "relaxed",
  name: "Highlands south, coast home",
  description:
    "One relaxed 12-day line: climb to Măng Đen, ride south through the highlands to Đà Lạt, spend full days hiking and in Nha Trang, then come home on the quieter coast.",
  distance: "approximately 1,650–1,800 km",
  days,
  season: {
    window: "Late September–early October 2026",
    reviewedAt: "16 July 2026",
    summary:
      "Highland rain remains possible early in the ride, while Nha Trang and the central coast are entering their wetter season. The July national outlook expects near-normal September rainfall across most of this corridor, above-normal heat and continued risk of heavy rain.",
    sources: [
      { label: "National seasonal forecast", url: sources.seasonalForecast },
      { label: "Official short-range forecasts and warnings", url: sources.shortRangeForecast },
    ],
  },
};
