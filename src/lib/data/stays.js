const categories = ["special", "luxury", "regular"];

export const stayCategoryLabels = {
  special: "Best view / niche experience",
  luxury: "Most comfortable",
  regular: "Regular",
};

const stayCoordinates = {
  "House of the Rising Sun at Tam Thanh Beach": [108.567, 15.565],
  "Tam Thanh Beach Resort & Spa": [108.5647, 15.597],
  "Tam Thanh Natural Beach Resort": [108.5555926, 15.5844632],
  "De Vivre Homestay Măng Đen": [108.2777047, 14.585812],
  "Diamond Luxury Hotel & Cafe Măng Đen": [108.2809, 14.5888],
  "Bình Sơn Măng Đen Villa": [108.2774, 14.5854],
  "An Nhiên Farmstay & Resort — Full House": [108.045793, 13.987731],
  "Mường Thanh Grand Gia Lai": [108.015734, 13.9706033],
  "Adalie Pleiku Hotel": [108.0216, 13.9662],
  "LAK Tented Camp — Lakeview Tents": [108.1816891, 12.4291049],
  "LAK Tented Camp — Lakefront Bungalows": [108.1816891, 12.4291049],
  "Lak View Hotel": [108.1688503, 12.4143163],
  "Crazy House": [108.4305116, 11.9345622],
  "Dalat Edensee Lake Resort & Spa — Sakura Villa": [108.4236024, 11.8856405],
  "Vy Anh Hotel Dalat — Family Room": [108.4359331, 11.9441776],
  "Memento Country Home — Thatched Cottages": [109.072, 12.292],
  "Vinpearl Resort & Spa Nha Trang Bay — Three-Bedroom Pool Villa": [109.2371427, 12.2256253],
  "DTX Hotel Nha Trang": [109.1963937, 12.2349072],
  "Lucky Spot Beach Bungalow": [109.2879595, 13.5067532],
  "Zannier Bãi San Hô — Three-Bedroom Grand Bay Pool Villa": [109.2745746, 13.5490065],
  "RUBEACH Hotel & Restaurant": [109.2254375, 13.6109375],
  "Homestay Giếng Cổ, Gò Cỏ Village": [109.0737385, 14.7055746],
  "Sa Huynh Beach Resort": [109.0651721, 14.6497159],
  "Tien Vuong Hotel": [109.0738112, 14.5410475],
  "Phú Ninh Lake official campsite": [108.4640379, 15.4968573],
  "Phu Ninh Lake Resort": [108.4640379, 15.4968573],
  "Mường Thanh Grand Quảng Nam": [108.4842484, 15.5621749],
  "KOI Resort & Residence — Three-Bedroom Pool Villa": [108.2666309, 16.0038003],
  "Naman Retreat — Three-Bedroom Garden Pool Villa": [108.2847535, 15.96915],
  "SALA Danang Beach Hotel": [108.2451665, 16.0621113],
};

function stayId(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll("đ", "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function stay(category, details) {
  return {
    id: stayId(details.name),
    coordinates: stayCoordinates[details.name],
    category,
    ...details,
  };
}

function plan(location, note, stays) {
  return { location, note, stays };
}

export function stayLinkLabel(url = "") {
  if (url.includes("booking.com")) return "View on Booking.com";
  if (url.includes("agoda.com")) return "View on Agoda";
  if (url.includes("airbnb.com")) return "View on Airbnb";
  return "View property";
}

const daLatStays = [
  stay("special", {
    name: "Crazy House",
    experience: "Architectural stay",
    pricePerPersonUsd: "$13–23",
    pricePerPersonVnd: "350–620k VND",
    setup: "Two themed rooms for six; ask for one four-person room plus one double.",
    why: "The route’s most unusual night: sculptural rooms, tunnels and terraces in a Đà Lạt landmark.",
    caution:
      "Room shapes and bed layouts vary, so confirm the exact six-adult combination before paying.",
    url: "https://www.booking.com/hotel/vn/crazy-house.en-gb.html",
  }),
  stay("luxury", {
    name: "Dalat Edensee Lake Resort & Spa — Sakura Villa",
    pricePerPersonUsd: "$50–78",
    pricePerPersonVnd: "1.32–2.07m VND",
    setup: "A six-adult Sakura villa floor with several bedrooms and bathrooms.",
    why: "A quiet Tuyền Lâm Lake setting with resort service, breakfast, spa facilities and a pool.",
    caution:
      "Some listings describe a private floor within the Sakura villa, not exclusive use of the whole building.",
    url: "https://www.booking.com/hotel/vn/dalat-eden-lake-resort-spa.en-gb.html",
  }),
  stay("regular", {
    name: "Vy Anh Hotel Dalat — Family Room",
    pricePerPersonUsd: "$8–11",
    pricePerPersonVnd: "200–280k VND",
    setup: "One family room with three double beds for six adults.",
    why: "Simple, central and unusually efficient for the group: no need to split across several rooms.",
    url: "https://www.booking.com/hotel/vn/vy-anh-dalat.html",
  }),
];

const nhaTrangStays = [
  stay("special", {
    name: "Memento Country Home — Thatched Cottages",
    experience: "Countryside heritage stay",
    pricePerPersonUsd: "$13–22",
    pricePerPersonVnd: "350–570k VND",
    setup:
      "Three Oldie House or thatched-cottage rooms for six, with two or three adults per room.",
    why: "A small rural retreat built around a family home more than 70 years old, with bamboo gardens, countryside food and a pool.",
    caution:
      "It is about 18 km from central Nha Trang; confirm three suitable rooms and the two-night availability before choosing it over the beach.",
    mapNote:
      "The marker shows the Diên Hòa countryside; confirm the exact entrance in the booking details.",
    url: "https://www.agoda.com/memento-country-home/hotel/nha-trang-vn.html",
  }),
  stay("luxury", {
    name: "Vinpearl Resort & Spa Nha Trang Bay — Three-Bedroom Pool Villa",
    pricePerPersonUsd: "$83–117",
    pricePerPersonVnd: "2.2–3.07m VND",
    setup: "A beachfront three-bedroom villa for six with a private pool.",
    why: "The full resort option: maximum space and privacy, with island facilities and direct beach access.",
    caution:
      "Allow extra time for the island transfer; it is less convenient for a quick city evening.",
    url: "https://www.booking.com/hotel/vn/vinpearl-premium-nha-trang-bay.html",
  }),
  stay("regular", {
    name: "DTX Hotel Nha Trang",
    pricePerPersonUsd: "$17–23",
    pricePerPersonVnd: "430–620k VND",
    setup: "Three double or twin rooms for six adults.",
    why: "A dependable central base near the beach, with a rooftop pool but without resort pricing.",
    url: "https://www.booking.com/hotel/vn/dtx-nha-trang.en-gb.html",
  }),
];

export const staysByDay = {
  1: plan("Tam Thanh", "One night at the end of Day 1.", [
    stay("special", {
      name: "House of the Rising Sun at Tam Thanh Beach",
      experience: "Independent beach house",
      pricePerPersonUsd: "$15–22",
      pricePerPersonVnd: "400–570k VND",
      setup: "An entire three-bedroom beachfront house for exactly six guests.",
      why: "The best match for the brief: everyone together, a kitchen, ocean views and sunrise outside the door.",
      caution:
        "It has very few reviews and the host’s recent response rate is low; message before relying on it.",
      mapNote: "Airbnb shows only an approximate position until the booking is confirmed.",
      url: "https://www.airbnb.com/rooms/33101620",
    }),
    stay("luxury", {
      name: "Tam Thanh Beach Resort & Spa",
      pricePerPersonUsd: "$16–25",
      pricePerPersonVnd: "420–650k VND",
      setup: "Three resort rooms for six adults.",
      why: "The most comfortable local option, with a beach setting, swimming pool, restaurant and spa service.",
      url: "https://www.booking.com/hotel/vn/tam-thanh-beach-resort-amp-spa.en-gb.html",
    }),
    stay("regular", {
      name: "Tam Thanh Natural Beach Resort",
      pricePerPersonUsd: "$8–13",
      pricePerPersonVnd: "200–330k VND",
      setup: "Three simple beach rooms or bungalows for six.",
      why: "Low-cost, directly by the sea and close to the mural village; comfort is basic but the location is right.",
      url: "https://www.agoda.com/tam-thanh-natural-beach-resort_2/hotel/tam-ky-quang-nam-vn.html",
    }),
  ]),
  2: plan("Măng Đen", "One night after the long Vi Ô Lắc ride.", [
    stay("special", {
      name: "De Vivre Homestay Măng Đen",
      experience: "Homestay / tent option",
      pricePerPersonUsd: "$12–17",
      pricePerPersonVnd: "300–430k VND",
      setup:
        "A family room for six with three large double beds; tents can be requested separately.",
      why: "Pine, mountain and garden views with the choice of a proper six-person room or a one-night tent experience.",
      caution:
        "Confirm whether tents have suitable rain cover and private bathroom access for the trip dates.",
      url: "https://www.booking.com/hotel/vn/khach-san-de-vivre.html",
    }),
    stay("luxury", {
      name: "Diamond Luxury Hotel & Cafe Măng Đen",
      pricePerPersonUsd: "$14–20",
      pricePerPersonVnd: "370–530k VND",
      setup: "One deluxe family room with three double beds for six.",
      why: "The simplest high-comfort group arrangement in town, with newer rooms and no nightly room split.",
      url: "https://www.booking.com/hotel/vn/diamond-luxury-amp-cafe-mang-den.html",
    }),
    stay("regular", {
      name: "Bình Sơn Măng Đen Villa",
      pricePerPersonUsd: "$8–14",
      pricePerPersonVnd: "220–370k VND",
      setup: "A six-person villa layout advertised with three large double beds.",
      why: "A quieter, home-like alternative to three separate hotel rooms at a moderate group price.",
      caution:
        "Several villa types share the same listing; confirm that the selected unit really has all three beds.",
      url: "https://www.booking.com/hotel/vn/binh-son-mang-den-villa-mang-den.en-gb.html",
    }),
  ]),
  3: plan("Pleiku", "One night; the farmstay is the unusually strong value choice here.", [
    stay("special", {
      name: "An Nhiên Farmstay & Resort — Full House",
      experience: "Working farmstay",
      pricePerPersonUsd: "$5–8",
      pricePerPersonVnd: "130–200k VND",
      setup: "A full house with one double and four single beds for six.",
      why: "A genuine group home among vegetable, rice and coffee fields, with a garden and outdoor barbecue area.",
      url: "https://www.booking.com/hotel/vn/xom-organic-farm-stay.en-gb.html",
    }),
    stay("luxury", {
      name: "Mường Thanh Grand Gia Lai",
      pricePerPersonUsd: "$20–30",
      pricePerPersonVnd: "530–780k VND",
      setup: "Three double or twin rooms for six adults.",
      why: "Pleiku’s reliable full-service choice, with a swimming pool, spa, restaurant and proper hotel support.",
      url: "https://www.booking.com/hotel/vn/muong-thanh-grand-gia-lai.en-gb.html",
    }),
    stay("regular", {
      name: "Adalie Pleiku Hotel",
      pricePerPersonUsd: "$9–14",
      pricePerPersonVnd: "230–370k VND",
      setup: "One family room plus one double or twin room for six.",
      why: "Clean, practical rooms and a straightforward city location at a sensible total price.",
      url: "https://www.booking.com/hotel/vn/adalie-pleiku.html",
    }),
  ]),
  4: plan(
    "Lắk Lake",
    "One night. This is the strongest place on the route to choose experience over price.",
    [
      stay("special", {
        name: "LAK Tented Camp — Lakeview Tents",
        experience: "Lake tented camp",
        pricePerPersonUsd: "$23–45",
        pricePerPersonVnd: "600k–1.18m VND",
        setup: "Two ensuite lakeview tents for six, each sleeping up to three people.",
        why: "Boat arrival, canvas rooms and lake-and-mountain views make this the trip’s best special-experience night.",
        caution:
          "The lower estimate is accommodation only; meal, boat and cultural packages raise the total.",
        url: "https://www.booking.com/hotel/vn/lak-tented-camp.en-gb.html",
      }),
      stay("luxury", {
        name: "LAK Tented Camp — Lakefront Bungalows",
        pricePerPersonUsd: "$43–63",
        pricePerPersonVnd: "1.12–1.67m VND",
        setup: "Two air-conditioned lakefront bungalows for six, each sleeping up to three.",
        why: "The most comfortable stay directly on Lắk Lake, keeping the camp’s boat access and quiet setting.",
        caution: "This is polished eco-lodge comfort, not a conventional pool-and-spa resort.",
        url: "https://www.booking.com/hotel/vn/lak-tented-camp.en-gb.html",
      }),
      stay("regular", {
        name: "Lak View Hotel",
        pricePerPersonUsd: "$6–9",
        pricePerPersonVnd: "150–230k VND",
        setup: "Three double rooms for six adults.",
        why: "A basic but well-located stop near the lake when the camp is too expensive or unavailable.",
        url: "https://www.booking.com/hotel/vn/lak-view.en-gb.html",
      }),
    ],
  ),
  5: plan(
    "Đà Lạt",
    "Book once for Nights 5 and 6; keep the same base for the hiking day.",
    daLatStays,
  ),
  6: plan("Đà Lạt", "Second night of the same two-night Đà Lạt booking.", daLatStays),
  7: plan(
    "Nha Trang",
    "Book once for Nights 7 and 8; leave the scooters parked on the rest day.",
    nhaTrangStays,
  ),
  8: plan("Nha Trang", "Second night of the same two-night Nha Trang booking.", nhaTrangStays),
  9: plan(
    "Sông Cầu",
    "One night; staying on the coast is more rewarding than continuing into Quy Nhơn.",
    [
      stay("special", {
        name: "Lucky Spot Beach Bungalow",
        experience: "Independent beach bungalow",
        pricePerPersonUsd: "$15–25",
        pricePerPersonVnd: "400–650k VND",
        setup: "Three simple beachfront bungalows or rooms for six.",
        why: "A quiet, small-scale beach stay where the group can finish the riding day with sand directly outside.",
        url: "https://www.booking.com/hotel/vn/lucky-spot-beach-bungalow.en-gb.html",
      }),
      stay("luxury", {
        name: "Zannier Bãi San Hô — Three-Bedroom Grand Bay Pool Villa",
        pricePerPersonUsd: "$267–400",
        pricePerPersonVnd: "7–10.5m VND",
        setup: "A 241 m² three-bedroom villa for six with a private infinity pool.",
        why: "The route’s true splurge: sea views, complete privacy and exceptional resort design on a secluded bay.",
        caution:
          "This is an indicative range; the resort normally prices this villa by direct quote.",
        url: "https://www.zannierhotels.com/hotels/bai-san-ho/accommodation/three-bedroom-grand-bay-pool-villa/",
      }),
      stay("regular", {
        name: "RUBEACH Hotel & Restaurant",
        pricePerPersonUsd: "$9–16",
        pricePerPersonVnd: "230–420k VND",
        setup: "Three double or twin rooms for six adults.",
        why: "A practical beach stop with a pool and restaurant, without the high price of the secluded resorts.",
        url: "https://www.booking.com/hotel/vn/rubeach-amp-rerost-song-cau1.en-gb.html",
      }),
    ],
  ),
  10: plan(
    "Sa Huỳnh",
    "One night. Local inventory is small; reserve early and expect simpler service.",
    [
      stay("special", {
        name: "Homestay Giếng Cổ, Gò Cỏ Village",
        experience: "Community village homestay",
        pricePerPersonUsd: "$6–9",
        pricePerPersonVnd: "150–230k VND",
        setup:
          "Simple earth-and-thatch huts for six with extra beds and shared bathroom facilities.",
        why: "The most distinctive local experience: a community stay in the old coastal village rather than a hotel.",
        caution:
          "Capacity for six and late arrival must be confirmed directly; this is deliberately rustic.",
        mapNote: "The marker shows Gò Cỏ village; confirm the host’s exact house before arrival.",
        url: "https://ohdidi.vn/homestay/homestay-gieng-co",
      }),
      stay("luxury", {
        name: "Sa Huynh Beach Resort",
        pricePerPersonUsd: "$13–20",
        pricePerPersonVnd: "330–530k VND",
        setup: "Three beach-facing rooms or villas for six adults.",
        why: "The most comfortable local choice, with a pool, restaurant and direct beach access.",
        caution: "This is the area’s best full-service stay, but it is not city-level luxury.",
        url: "https://www.agoda.com/en-sg/sa-huynh-resort-quang-ngai/hotel/quang-ngai-vn.html",
      }),
      stay("regular", {
        name: "Tien Vuong Hotel",
        pricePerPersonUsd: "$4–8",
        pricePerPersonVnd: "120–200k VND",
        setup: "Two sea- or garden-view twin rooms for six, with two double beds in each.",
        why: "A straightforward beachfront backup with parking, balconies and enough bed space for the group.",
        url: "https://www.booking.com/hotel/vn/tien-vuong.en-gb.html",
      }),
    ],
  ),
  11: plan(
    "Phú Ninh Lake",
    "One night. Confirm all lake stays directly because inventory is limited.",
    [
      stay("special", {
        name: "Phú Ninh Lake official campsite",
        experience: "Lakeside campsite",
        pricePerPersonUsd: "$8–11",
        pricePerPersonVnd: "200–280k VND",
        setup: "One four-person tent plus one two-person tent for all six.",
        why: "The purest lake experience and the cheapest way to keep everyone together under the same night sky.",
        caution:
          "Confirm overnight operation, rain cover, bedding and bathroom access before depending on the campsite.",
        mapNote:
          "The marker shows the lake visitor area; the operator assigns the exact tent location.",
        url: "https://vinpearl.com/en/phu-ninh-lake",
      }),
      stay("luxury", {
        name: "Phu Ninh Lake Resort",
        pricePerPersonUsd: "$21–28",
        pricePerPersonVnd: "550–750k VND",
        setup: "One lake-view family room plus one chalet or twin room for six.",
        why: "The comfortable lake option, with views, an outdoor pool, restaurant and no ride back from Tam Kỳ at night.",
        caution:
          "Only a few rooms are listed online, so ask the resort to hold the full six-person combination.",
        url: "https://www.booking.com/hotel/vn/phu-ninh-lake-resort-amp-spa-ecotourism.en-gb.html",
      }),
      stay("regular", {
        name: "Mường Thanh Grand Quảng Nam",
        pricePerPersonUsd: "$18–24",
        pricePerPersonVnd: "470–630k VND",
        setup: "Three double or twin rooms for six in Tam Kỳ, about 7 km from the lake.",
        why: "The dependable weather backup: a large hotel with pool, restaurant, parking and predictable reception.",
        url: "https://www.booking.com/hotel/vn/muong-thanh-grand-quang-nam.html",
      }),
    ],
  ),
  12: plan(
    "Đà Nẵng",
    "Optional post-trip night after scooter return; skip this booking if everyone departs.",
    [
      stay("special", {
        name: "KOI Resort & Residence — Three-Bedroom Pool Villa",
        experience: "Private pool villa",
        pricePerPersonUsd: "$67–108",
        pricePerPersonVnd: "1.75–2.85m VND",
        setup: "A whole three-bedroom villa for six with a private pool.",
        why: "The best final-night group house: private shared space, resort facilities and beach access south of the city.",
        caution:
          "Rates vary sharply between garden, river and beachfront versions; confirm the exact villa shown.",
        url: "https://www.booking.com/hotel/vn/koi-resort-and-residence-da-nang.en-gb.html",
      }),
      stay("luxury", {
        name: "Naman Retreat — Three-Bedroom Garden Pool Villa",
        pricePerPersonUsd: "$125–167",
        pricePerPersonVnd: "3.28–4.38m VND",
        setup:
          "A 670–850 m² three-bedroom villa with living room, dining area and a large private pool.",
        why: "The most polished six-person villa finish, with space to stay together and full resort service.",
        caution:
          "The promoted villa package requires two nights; request a separate one-night rate if needed.",
        url: "https://www.booking.com/hotel/vn/naman-retreat.en-gb.html",
      }),
      stay("regular", {
        name: "SALA Danang Beach Hotel",
        pricePerPersonUsd: "$38–50",
        pricePerPersonVnd: "1.0–1.32m VND",
        setup: "Three double or twin rooms for six adults.",
        why: "A comfortable My Khe finish with rooftop pool, beach access and easy airport or city connections.",
        url: "https://www.booking.com/hotel/vn/sala-danang-beach.en-gb.html",
      }),
    ],
  ),
};

export function validateStayPlan(stayPlan) {
  return (
    stayPlan?.stays?.length === categories.length &&
    stayPlan.stays.every((item, index) => item.category === categories[index])
  );
}

export function staysForDay(day) {
  return day?.stayPlan?.stays ?? [];
}
