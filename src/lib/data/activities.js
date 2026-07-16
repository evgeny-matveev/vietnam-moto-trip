import { activityPhotoManifest, addPhotoMetadata } from './photo-manifest.js';

const activityRecordsByDay = {
  5: [
    {
      id: "lak-lake-paddle",
      kind: "paddling",
      symbol: "🛶︎",
      name: "Прогулка по озеру Lắk (Лак)",
      time: "1–2 ч",
      detour: "у места ночёвки",
      summary:
        "До выезда в сторону Đà Lạt (Далата) договоритесь на месте о прогулке на долблёной лодке или каяке.",
      condition:
        "Выходите только в тихую погоду, подтвердив услугу на месте. Прогулка заменяет позднюю остановку у кофе или водопада; программы с катанием на слонах не выбирайте.",
      pricing: {
        status: "quote-required",
        note: "Прогулку и её цену согласуйте на месте; в базовый бюджет она не входит.",
      },
      sources: [
        {
          label: "Vietnam Tourism — озеро Lắk (Лак)",
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
      detour: "трансфер оператора из Đà Lạt (Далата)",
      summary: "Спуски по водопадам или рафтинг с гидом — энергичная альтернатива пешему дню.",
      condition:
        "Выберите одно занятие вместо горного похода. Заранее забронируйте лицензированного оператора и будьте готовы к отмене после ливня, при опасном течении или грозе.",
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
      name: "Рельсовые сани или верёвочный парк Datanla (Датанла)",
      time: "2–4 ч",
      detour: "около 5 км от центра Đà Lạt (Далата)",
      summary:
        "Рельсовые сани дадут лёгкий заряд адреналина, а лесная трасса потребует больше сил и займёт полдня.",
      condition:
        "Выбирайте парк вместо долгого похода, в тот же день проверьте часы работы и ограничения по росту. В дождь и грозу от открытых трасс откажитесь.",
      pricing: {
        status: "quote-required",
        note: "Цену выбранных саней или верёвочной трассы уточняйте напрямую; в базовый бюджет она не входит.",
      },
      sources: [
        {
          label: "Lâm Đồng (Ламдонг) — водопад Datanla (Датанла)",
          url: "https://lamdong.gov.vn/sites/en/tourist/famous-landscape/SitePages/dalanta-waterfall.aspx",
        },
        {
          label: "Dalattourist — Datanla (Датанла)",
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
      detour: "канатная дорога на Hòn Tre (Хонтре)",
      summary:
        "Аквапарк Tropical Paradise и большая зона аттракционов складываются в полноценный день на суше.",
      condition:
        "Выбирайте VinWonders вместо островной или городской программы, а не вместе с ней. До покупки билетов проверьте ремонты аттракционов и погодные закрытия.",
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
        "Добавьте только одно соседнее городское место. Не пытайтесь втиснуть ванны между VinWonders и лодочной прогулкой; проверьте время последнего входа.",
      pricing: {
        status: "quote-required",
        note: "Сначала выберите процедуру, затем уточните тариф 2026 года; в базовый бюджет он не входит.",
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
      name: "Каяк или лодка на озере Phú Ninh (Фунин)",
      time: "1–2 ч",
      detour: "у места ночёвки",
      summary:
        "После приезда посмотрите на водохранилище с воды — с каяка или местной прогулочной лодки.",
      condition:
        "Не жертвуйте ради этого своевременным приездом, подтвердите работу услуги и оставайтесь на берегу при сильном ветре, грозе или плохой видимости.",
      pricing: {
        status: "quote-required",
        note: "Цену лодки или каяка уточняйте после приезда; в базовый бюджет она не входит.",
      },
      sources: [
        {
          label: "Quảng Nam Tourism — Phú Ninh (Фунин)",
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
        "Официальный список — это возможные, а не гарантированные ежедневные услуги. Уточните всё на месте и откажитесь от воды и зиплайна в грозу или сильный ветер.",
      pricing: {
        status: "quote-required",
        note: "Набор услуг и цены меняются: уточняйте на месте и не включайте их в базовый бюджет.",
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
		addPhotoMetadata(activities, activityPhotoManifest)
	])
);
