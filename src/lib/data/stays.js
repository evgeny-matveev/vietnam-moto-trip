const categories = ["special", "luxury", "regular"];

export const stayCategoryLabels = {
  special: "Best view / unusual",
  luxury: "Most comfortable",
  regular: "Regular",
};

function stay(category, details) {
  return { category, ...details };
}

function plan(location, note, stays) {
  return { location, note, stays };
}

const daLatStays = [
  stay("special", {
    name: "Crazy House",
    priceUsd: "$80–140",
    priceVnd: "2.1–3.7m VND",
    setup: "Two themed rooms for six; ask for one four-person room plus one double.",
    why: "The route’s most unusual night: sculptural rooms, tunnels and terraces in a Đà Lạt landmark.",
    caution:
      "Room shapes and bed layouts vary, so confirm the exact six-adult combination before paying.",
    url: "https://crazyhouse.vn/en/",
  }),
  stay("luxury", {
    name: "Dalat Edensee Lake Resort & Spa — Sakura Villa",
    priceUsd: "$300–470",
    priceVnd: "7.9–12.4m VND",
    setup: "A six-adult Sakura villa floor with several bedrooms and bathrooms.",
    why: "A quiet Tuyền Lâm Lake setting with resort service, breakfast, spa facilities and a pool.",
    caution:
      "Some listings describe a private floor within the Sakura villa, not exclusive use of the whole building.",
    url: "https://www.booking.com/hotel/vn/dalat-eden-lake-resort-spa.en-gb.html",
  }),
  stay("regular", {
    name: "Vy Anh Hotel Dalat — Family Room",
    priceUsd: "$45–65",
    priceVnd: "1.2–1.7m VND",
    setup: "One family room with three double beds for six adults.",
    why: "Simple, central and unusually efficient for the group: no need to split across several rooms.",
    url: "https://www.booking.com/hotel/vn/vy-anh-dalat.html",
  }),
];

const nhaTrangStays = [
  stay("special", {
    name: "The Costa Nha Trang — Three-Bedroom Grand Suite",
    priceUsd: "$220–390",
    priceVnd: "5.8–10.3m VND",
    setup: "A 230 m² three-bedroom apartment for six with kitchen, living room and balconies.",
    why: "The best group balance in Nha Trang: sea views, a real shared home base and a pool on Trần Phú.",
    url: "https://www.thecostanhatrang.com/en/accomodation",
  }),
  stay("luxury", {
    name: "Vinpearl Resort & Spa Nha Trang Bay — Three-Bedroom Pool Villa",
    priceUsd: "$500–700",
    priceVnd: "13.2–18.4m VND",
    setup: "A beachfront three-bedroom villa for six with a private pool.",
    why: "The full resort option: maximum space and privacy, with island facilities and direct beach access.",
    caution:
      "Allow extra time for the island transfer; it is less convenient for a quick city evening.",
    url: "https://www.booking.com/hotel/vn/vinpearl-premium-nha-trang-bay.html",
  }),
  stay("regular", {
    name: "DTX Hotel Nha Trang",
    priceUsd: "$100–140",
    priceVnd: "2.6–3.7m VND",
    setup: "Three double or twin rooms for six adults.",
    why: "A dependable central base near the beach, with a rooftop pool but without resort pricing.",
    url: "https://www.expedia.com/Nha-Trang-Hotels-DTX-Hotel-Nha-Trang.h32570014.Hotel-Information",
  }),
];

export const staysByDay = {
  1: plan("Tam Thanh", "One night at the end of Day 1.", [
    stay("special", {
      name: "House of the Rising Sun at Tam Thanh Beach",
      priceUsd: "$90–130",
      priceVnd: "2.4–3.4m VND",
      setup: "An entire three-bedroom beachfront house for exactly six guests.",
      why: "The best match for the brief: everyone together, a kitchen, ocean views and sunrise outside the door.",
      caution:
        "It has very few reviews and the host’s recent response rate is low; message before relying on it.",
      url: "https://www.airbnb.com/rooms/33101620",
    }),
    stay("luxury", {
      name: "Tam Thanh Beach Resort & Spa",
      priceUsd: "$95–150",
      priceVnd: "2.5–3.9m VND",
      setup: "Three resort rooms for six adults.",
      why: "The most comfortable local option, with a beach setting, swimming pool, restaurant and spa service.",
      url: "https://www.tamthanhbeachresort.com/vi/",
    }),
    stay("regular", {
      name: "Tam Thanh Natural Beach Resort",
      priceUsd: "$45–75",
      priceVnd: "1.2–2.0m VND",
      setup: "Three simple beach rooms or bungalows for six.",
      why: "Low-cost, directly by the sea and close to the mural village; comfort is basic but the location is right.",
      url: "https://www.hotelscombined.com/Hotel/Tam_Thanh_Natural_Beach_Resort.htm",
    }),
  ]),
  2: plan("Măng Đen", "One night after the long Vi Ô Lắc ride.", [
    stay("special", {
      name: "De Vivre Homestay Măng Đen",
      priceUsd: "$70–100",
      priceVnd: "1.8–2.6m VND",
      setup:
        "A family room for six with three large double beds; tents can be requested separately.",
      why: "Pine, mountain and garden views with the choice of a proper six-person room or a one-night tent experience.",
      caution:
        "Confirm whether tents have suitable rain cover and private bathroom access for the trip dates.",
      url: "https://www.booking.com/hotel/vn/khach-san-de-vivre.html",
    }),
    stay("luxury", {
      name: "Diamond Luxury Hotel & Cafe Măng Đen",
      priceUsd: "$85–120",
      priceVnd: "2.2–3.2m VND",
      setup: "One deluxe family room with three double beds for six.",
      why: "The simplest high-comfort group arrangement in town, with newer rooms and no nightly room split.",
      url: "https://www.booking.com/hotel/vn/diamond-luxury-amp-cafe-mang-den.html",
    }),
    stay("regular", {
      name: "Bình Sơn Măng Đen Villa",
      priceUsd: "$50–85",
      priceVnd: "1.3–2.2m VND",
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
      priceUsd: "$30–45",
      priceVnd: "0.8–1.2m VND",
      setup: "A full house with one double and four single beds for six.",
      why: "A genuine group home among vegetable, rice and coffee fields, with a garden and outdoor barbecue area.",
      url: "https://annhienday.com/",
    }),
    stay("luxury", {
      name: "Mường Thanh Grand Gia Lai",
      priceUsd: "$120–180",
      priceVnd: "3.2–4.7m VND",
      setup: "Three double or twin rooms for six adults.",
      why: "Pleiku’s reliable full-service choice, with a swimming pool, spa, restaurant and proper hotel support.",
      url: "https://booking.muongthanh.com/hotel-muong-thanh-grand-gia-lai",
    }),
    stay("regular", {
      name: "Adalie Pleiku Hotel",
      priceUsd: "$55–85",
      priceVnd: "1.4–2.2m VND",
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
        priceUsd: "$140–270",
        priceVnd: "3.6–7.1m VND",
        setup: "Two ensuite lakeview tents for six, each sleeping up to three people.",
        why: "Boat arrival, canvas rooms and lake-and-mountain views make this the trip’s best special-experience night.",
        caution:
          "The lower estimate is accommodation only; meal, boat and cultural packages raise the total.",
        url: "https://www.laktentedcamp.com/accommodation/packages-for-solo-travellers/",
      }),
      stay("luxury", {
        name: "LAK Tented Camp — Lakefront Bungalows",
        priceUsd: "$255–380",
        priceVnd: "6.7–10.0m VND",
        setup: "Two air-conditioned lakefront bungalows for six, each sleeping up to three.",
        why: "The most comfortable stay directly on Lắk Lake, keeping the camp’s boat access and quiet setting.",
        caution: "This is polished eco-lodge comfort, not a conventional pool-and-spa resort.",
        url: "https://www.laktentedcamp.com/accommodation/packages-for-solo-travellers/",
      }),
      stay("regular", {
        name: "Lak View Hotel",
        priceUsd: "$35–55",
        priceVnd: "0.9–1.4m VND",
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
        priceUsd: "$90–150",
        priceVnd: "2.4–3.9m VND",
        setup: "Three simple beachfront bungalows or rooms for six.",
        why: "A quiet, small-scale beach stay where the group can finish the riding day with sand directly outside.",
        url: "https://www.luckyspot.de/bungalow-buchen",
      }),
      stay("luxury", {
        name: "Zannier Bãi San Hô — Three-Bedroom Grand Bay Pool Villa",
        priceUsd: "$1,600–2,400",
        priceVnd: "42–63m VND",
        setup: "A 241 m² three-bedroom villa for six with a private infinity pool.",
        why: "The route’s true splurge: sea views, complete privacy and exceptional resort design on a secluded bay.",
        caution:
          "This is an indicative range; the resort normally prices this villa by direct quote.",
        url: "https://www.zannierhotels.com/hotels/bai-san-ho/accommodation/three-bedroom-grand-bay-pool-villa/",
      }),
      stay("regular", {
        name: "RUBEACH Hotel & Restaurant",
        priceUsd: "$55–95",
        priceVnd: "1.4–2.5m VND",
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
        priceUsd: "$35–55",
        priceVnd: "0.9–1.4m VND",
        setup:
          "Simple earth-and-thatch huts for six with extra beds and shared bathroom facilities.",
        why: "The most distinctive local experience: a community stay in the old coastal village rather than a hotel.",
        caution:
          "Capacity for six and late arrival must be confirmed directly; this is deliberately rustic.",
        url: "https://www.agoda.com/en-sg/homestay-nha-tranh/hotel/sa-huynh-vn.html",
      }),
      stay("luxury", {
        name: "Sa Huynh Beach Resort",
        priceUsd: "$75–120",
        priceVnd: "2.0–3.2m VND",
        setup: "Three beach-facing rooms or villas for six adults.",
        why: "The most comfortable local choice, with a pool, restaurant and direct beach access.",
        caution: "This is the area’s best full-service stay, but it is not city-level luxury.",
        url: "https://sahuynhbeachresort.com/en/booking/",
      }),
      stay("regular", {
        name: "Tien Vuong Hotel",
        priceUsd: "$25–45",
        priceVnd: "0.7–1.2m VND",
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
        priceUsd: "$45–65",
        priceVnd: "1.2–1.7m VND",
        setup: "One four-person tent plus one two-person tent for all six.",
        why: "The purest lake experience and the cheapest way to keep everyone together under the same night sky.",
        caution:
          "Confirm overnight operation, rain cover, bedding and bathroom access before depending on the campsite.",
        url: "https://vinpearl.com/en/phu-ninh-lake",
      }),
      stay("luxury", {
        name: "Phu Ninh Lake Resort",
        priceUsd: "$125–170",
        priceVnd: "3.3–4.5m VND",
        setup: "One lake-view family room plus one chalet or twin room for six.",
        why: "The comfortable lake option, with views, an outdoor pool, restaurant and no ride back from Tam Kỳ at night.",
        caution:
          "Only a few rooms are listed online, so ask the resort to hold the full six-person combination.",
        url: "https://www.booking.com/hotel/vn/phu-ninh-lake-resort-amp-spa-ecotourism.en-gb.html",
      }),
      stay("regular", {
        name: "Mường Thanh Grand Quảng Nam",
        priceUsd: "$105–145",
        priceVnd: "2.8–3.8m VND",
        setup: "Three double or twin rooms for six in Tam Kỳ, about 7 km from the lake.",
        why: "The dependable weather backup: a large hotel with pool, restaurant, parking and predictable reception.",
        url: "https://booking.muongthanh.com/hotel-muong-thanh-grand-quang-nam",
      }),
    ],
  ),
  12: plan(
    "Đà Nẵng",
    "Optional post-trip night after scooter return; skip this booking if everyone departs.",
    [
      stay("special", {
        name: "KOI Resort & Residence — Three-Bedroom Pool Villa",
        priceUsd: "$400–650",
        priceVnd: "10.5–17.1m VND",
        setup: "A whole three-bedroom villa for six with a private pool.",
        why: "The best final-night group house: private shared space, resort facilities and beach access south of the city.",
        caution:
          "Rates vary sharply between garden, river and beachfront versions; confirm the exact villa shown.",
        url: "https://www.booking.com/hotel/vn/koi-resort-and-residence-da-nang.en-gb.html",
      }),
      stay("luxury", {
        name: "Naman Retreat — Three-Bedroom Garden Pool Villa",
        priceUsd: "$750–1,000",
        priceVnd: "19.7–26.3m VND",
        setup:
          "A 670–850 m² three-bedroom villa with living room, dining area and a large private pool.",
        why: "The most polished six-person villa finish, with space to stay together and full resort service.",
        caution:
          "The promoted villa package requires two nights; request a separate one-night rate if needed.",
        url: "https://namanretreat.com/en/accommodation/garden-pool-villa",
      }),
      stay("regular", {
        name: "SALA Danang Beach Hotel",
        priceUsd: "$230–300",
        priceVnd: "6.0–7.9m VND",
        setup: "Three double or twin rooms for six adults.",
        why: "A comfortable My Khe finish with rooftop pool, beach access and easy airport or city connections.",
        url: "https://www.expedia.com/Da-Nang-Hotels-Sala-Danang-Beach-Hotel.h35708398.Hotel-Information",
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
