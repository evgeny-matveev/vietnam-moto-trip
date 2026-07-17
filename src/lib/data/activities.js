import { activityPhotoManifest, addPhotoMetadata } from "./photo-manifest.js";

const activityRecordsByDay = {
  5: [
    {
      id: "lak-lake-paddle",
      kind: "paddling",
      symbol: "🛶︎",
      name: "Прогулка по озеру Лак (Lắk)",
      time: "1–2 ч",
      detour: "у места ночёвки",
      summary:
        "У места ночёвки доступны прогулки на долблёной лодке или каяке перед дорогой в сторону Далата (Đà Lạt).",
      condition:
        "Тихая погода открывает прогулку по воде; она занимает время поздней остановки у кофе или водопада.",
      pricing: {
        status: "quote-required",
        note: "Прогулка и её цена определяются на месте; в базовый бюджет она не входит.",
      },
      sources: [
        {
          label: "Vietnam Tourism — озеро Лак (Lắk)",
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
      name: "Каньонинг или рафтинг",
      time: "Целый день",
      detour: "трансфер оператора из Далата (Đà Lạt)",
      summary: "Спуски по водопадам или рафтинг с гидом — энергичная альтернатива пешему дню.",
      condition:
        "Полноценное занятие вместо горного похода. Программа лицензированного оператора зависит от уровня воды и отменяется после ливня или грозы.",
      pricing: {
        status: "published",
        rangeVnd: { min: 2_400_000, max: 2_400_000 },
        note: "Опубликованная цена программы каньонинга; рафтинг сейчас отмечен оператором как недоступный.",
        source: {
          label: "Dalat Adventure Tours — цена каньонинга",
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
      name: "Рельсовые сани или верёвочный парк Датанла (Datanla)",
      time: "2–4 ч",
      detour: "около 5 км от центра Далата (Đà Lạt)",
      summary:
        "Рельсовые сани дадут лёгкий заряд адреналина, а лесная трасса потребует больше сил и займёт полдня.",
      condition:
        "Парк занимает от двух до четырёх часов вместо долгого похода; часы работы и ограничения по росту меняются. Открытые трассы закрываются в дождь и грозу.",
      pricing: {
        status: "quote-required",
        note: "Цена саней и верёвочной трассы определяется напрямую; в базовый бюджет она не входит.",
      },
      sources: [
        {
          label: "Ламдонг (Lâm Đồng) — водопад Датанла (Datanla)",
          url: "https://lamdong.gov.vn/sites/en/tourist/famous-landscape/SitePages/dalanta-waterfall.aspx",
        },
        {
          label: "Dalattourist — Датанла (Datanla)",
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
      time: "Целый день",
      detour: "канатная дорога на Хонтре (Hòn Tre)",
      summary:
        "Аквапарк Tropical Paradise и большая зона аттракционов складываются в полноценный день на суше.",
      condition:
        "VinWonders занимает целый день на Хонтре (Hòn Tre); работа аттракционов зависит от ремонтов и погоды.",
      pricing: {
        status: "published",
        rangeVnd: { min: 1_050_000, max: 1_050_000 },
        note: "Опубликованная стандартная цена для взрослого на 2026 год, включая канатную дорогу туда и обратно.",
        source: {
          label: "VinWonders — цены 2026 года",
          url: "https://vinwonders.com/en/vinwonders-nha-trang-price-and-regulations/",
        },
      },
      sources: [
        {
          label: "Официальная информация о парке",
          url: "https://vinwonders.com/en/vinwonders-nha-trang/",
        },
      ],
    },
    {
      id: "i-resort-hot-mineral-bath",
      kind: "hot-spring",
      symbol: "♨︎",
      name: "Горячие минеральные и грязевые ванны I-Resort",
      time: "2–4 ч",
      detour: "около 6 км от пляжа",
      summary:
        "Горячие минеральные бассейны, грязевые ванны и спа особенно хороши для восстановления или в день плохого моря.",
      condition:
        "Ванны занимают два–четыре часа и сочетаются с одной городской остановкой; время последнего входа меняется.",
      pricing: {
        status: "quote-required",
        note: "Тариф 2026 года зависит от процедуры; в базовый бюджет он не входит.",
      },
      sources: [
        {
          label: "Официальный сайт I-Resort",
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
      name: "Каяк или лодка на озере Фунин (Phú Ninh)",
      time: "1–2 ч",
      detour: "у места ночёвки",
      summary: "Водохранилище открывается с воды — с каяка или местной прогулочной лодки.",
      condition:
        "Лодки и каяки зависят от работы сервиса; сильный ветер, гроза и плохая видимость отменяют выход на воду.",
      pricing: {
        status: "quote-required",
        note: "Цена лодки или каяка определяется после приезда; в базовый бюджет она не входит.",
      },
      sources: [
        {
          label: "Quảng Nam Tourism — Фунин (Phú Ninh)",
          url: "https://quangnamtourism.com.vn/ho-phu-ninh/",
        },
      ],
    },
    {
      id: "phu-ninh-mineral-and-lake-play",
      kind: "hot-spring",
      symbol: "♨︎",
      name: "Минеральные ванны или развлечения на озере",
      time: "1–3 ч",
      detour: "в гостевой зоне озера",
      summary:
        "Если услуги работают, можно выбрать минеральные ванны, зиплайн, виндсёрфинг, гидроцикл или «банан».",
      condition:
        "Официальный список описывает возможные, а не ежедневные услуги. Вода и зиплайн не работают в грозу или сильный ветер.",
      pricing: {
        status: "quote-required",
        note: "Набор услуг и цены меняются; в базовый бюджет они не входят.",
      },
      sources: [
        {
          label: "Quảng Nam Tourism — список занятий",
          url: "https://quangnamtourism.com.vn/ho-phu-ninh/",
        },
      ],
    },
  ],
};

export const activitiesByDay = Object.fromEntries(
  Object.entries(activityRecordsByDay).map(([day, activities]) => [
    day,
    addPhotoMetadata(activities, activityPhotoManifest),
  ]),
);
