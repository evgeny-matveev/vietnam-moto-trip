export const activitiesByDay = {
  5: [
    {
      id: "lak-lake-paddle",
      kind: "paddling",
      symbol: "🛶︎",
      name: "Lắk Lake paddle",
      time: "1–2 hr",
      detour: "at the overnight stop",
      summary:
        "Take a locally arranged dugout-canoe or kayak outing before the road turns toward Đà Lạt.",
      condition:
        "Go only in calm conditions, confirm the service locally and let it replace a later coffee or waterfall stop; avoid elephant-riding packages.",
      pricing: {
        status: "quote-required",
        note: "Arrange and price the paddle locally; it is not included in the baseline budget.",
      },
      sources: [
        {
          label: "Vietnam Tourism — Lắk Lake",
          url: "https://vietnam.travel/node/1788",
        },
      ],
    },
  ],
  6: [
    {
      id: "dalat-canyoning-or-rafting",
      kind: "rafting",
      symbol: "🛶︎",
      name: "Canyoning or white-water rafting",
      time: "Full day",
      detour: "operator transfer from Đà Lạt",
      summary:
        "A guide-led day of waterfall descents or rafting is the high-energy alternative to hiking.",
      condition:
        "Choose one and replace the mountain hike. Pre-book a licensed operator and accept cancellation after heavy rain, unsafe river flow or thunderstorms.",
      pricing: {
        status: "published",
        rangeVnd: { min: 2_400_000, max: 2_400_000 },
        note: "Published canyoning-and-countryside price; the operator currently marks rafting unavailable.",
        source: {
          label: "Dalat Adventure Tours — canyoning price",
          url: "https://adventuredalat.com/Tours/72/oneday-canyoning-and-countryside-tour",
        },
      },
      sources: [
        {
          label: "Dalat Adventure Tours",
          url: "https://adventuredalat.com/",
        },
      ],
    },
    {
      id: "datanla-adventure",
      kind: "adventure",
      symbol: "🎢︎",
      name: "Datanla coaster or high ropes",
      time: "2–4 hr",
      detour: "about 5 km from central Đà Lạt",
      summary:
        "Use the alpine coaster for an easy thrill or the forest high-rope course for a more physical half-day.",
      condition:
        "Pick this instead of a longer hike, check same-day opening and height limits, and avoid exposed activities during rain or thunder.",
      pricing: {
        status: "quote-required",
        note: "Confirm the chosen coaster or high-rope ticket directly; it is not included in the baseline budget.",
      },
      sources: [
        {
          label: "Lâm Đồng — Datanla Waterfall",
          url: "https://lamdong.gov.vn/sites/en/tourist/famous-landscape/SitePages/dalanta-waterfall.aspx",
        },
        {
          label: "Dalattourist — Datanla",
          url: "https://dalattourist.com.vn/diem-den/khu-du-lich-datanla",
        },
      ],
    },
  ],
  8: [
    {
      id: "vinwonders-nha-trang",
      kind: "water-park",
      symbol: "💦︎",
      name: "VinWonders Nha Trang",
      time: "Full day",
      detour: "cable car to Hòn Tre",
      summary:
        "Tropical Paradise water park and the wider amusement park make a complete land-based day.",
      condition:
        "Use this instead of the island or city plan, not alongside it. Check ride maintenance and weather closures before buying tickets.",
      pricing: {
        status: "published",
        rangeVnd: { min: 1_050_000, max: 1_050_000 },
        note: "Published 2026 adult standard price with the round-trip cable car.",
        source: {
          label: "VinWonders — 2026 prices",
          url: "https://vinwonders.com/en/vinwonders-nha-trang-price-and-regulations/",
        },
      },
      sources: [
        {
          label: "Official park details",
          url: "https://vinwonders.com/en/vinwonders-nha-trang/",
        },
      ],
    },
    {
      id: "i-resort-hot-mineral-bath",
      kind: "hot-spring",
      symbol: "♨︎",
      name: "I-Resort hot mineral mud bath",
      time: "2–4 hr",
      detour: "about 6 km from the beach",
      summary:
        "Hot mineral pools, mud baths and spa facilities work well as a recovery or poor-sea option.",
      condition:
        "Pair it with only one nearby city sight; do not squeeze it around VinWonders or a boat day. Check the current last-entry time.",
      pricing: {
        status: "quote-required",
        note: "Choose the treatment first and confirm the current 2026 tariff; it is not included in the baseline budget.",
      },
      sources: [
        {
          label: "Official I-Resort site",
          url: "https://www.i-resort.vn/",
        },
      ],
    },
  ],
  11: [
    {
      id: "phu-ninh-lake-paddle",
      kind: "paddling",
      symbol: "🛶︎",
      name: "Phú Ninh lake paddle or boat",
      time: "1–2 hr",
      detour: "at the overnight stop",
      summary:
        "See the reservoir from the water by kayak or a locally operated sightseeing boat after arrival.",
      condition:
        "Protect the late-afternoon arrival, confirm that the service is operating and stay ashore in strong wind, thunder or poor visibility.",
      pricing: {
        status: "quote-required",
        note: "Confirm the boat or kayak price after arrival; it is not included in the baseline budget.",
      },
      sources: [
        {
          label: "Quảng Nam Tourism — Phú Ninh",
          url: "https://quangnamtourism.com.vn/ho-phu-ninh/",
        },
      ],
    },
    {
      id: "phu-ninh-mineral-and-lake-play",
      kind: "hot-spring",
      symbol: "♨︎",
      name: "Mineral bath or lake-play session",
      time: "1–3 hr",
      detour: "at the lake visitor area",
      summary:
        "Depending on current operations, choose mineral bathing, zipline, windsurfing, jet ski or banana boat.",
      condition:
        "Treat the official list as possibilities, not guaranteed daily services. Confirm locally and skip water or zipline activity in thunder and high wind.",
      pricing: {
        status: "quote-required",
        note: "Services and prices vary by operation; confirm locally and keep them outside the baseline budget.",
      },
      sources: [
        {
          label: "Quảng Nam Tourism — activity list",
          url: "https://quangnamtourism.com.vn/ho-phu-ninh/",
        },
      ],
    },
  ],
};
