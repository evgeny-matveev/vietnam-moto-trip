const categories = ["special", "luxury", "regular"];

function parseVndAmount(value, defaultUnit) {
  const normalized = value.trim().toLowerCase();
  const unit =
    normalized.endsWith("m") || normalized.endsWith("k") ? normalized.at(-1) : defaultUnit;
  const multiplier = unit === "m" ? 1_000_000 : 1_000;
  return Math.round(Number.parseFloat(normalized) * multiplier);
}

function priceRangeVnd(label) {
  const normalized = label.replace(/vnd/gi, "").trim().toLowerCase();
  const defaultUnit = normalized.endsWith("m") ? "m" : "k";
  const values = normalized.split(/[–-]/).map((value) => parseVndAmount(value, defaultUnit));

  return { min: values[0], max: values[1] ?? values[0] };
}

export const stayCategoryLabels = {
  special: "Особое место",
  luxury: "Максимум комфорта",
  regular: "Практичный выбор",
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
    priceRangeVnd: priceRangeVnd(details.pricePerPersonVnd),
    ...details,
  };
}

function plan(location, note, stays) {
  return { location, note, stays };
}

export function stayLinkLabel(url = "") {
  if (url.includes("booking.com")) return "Открыть на Booking.com";
  if (url.includes("agoda.com")) return "Открыть на Agoda";
  if (url.includes("airbnb.com")) return "Открыть на Airbnb";
  return "Открыть страницу отеля";
}

const daLatStays = [
  stay("special", {
    name: "Crazy House",
    experience: "Ночь в архитектурной достопримечательности",
    pricePerPersonUsd: "$13–23",
    pricePerPersonVnd: "350–620k VND",
    setup: "Два тематических номера на шестерых: один на четверых и один двухместный.",
    why: "Самая необычная ночь маршрута: комнаты-скульптуры, тоннели и террасы в одной из достопримечательностей Đà Lạt (Далата).",
    caution:
      "Планировка и количество кроватей различаются — до оплаты подтвердите размещение именно шести взрослых.",
    url: "https://www.booking.com/hotel/vn/crazy-house.en-gb.html",
  }),
  stay("luxury", {
    name: "Dalat Edensee Lake Resort & Spa — Sakura Villa",
    pricePerPersonUsd: "$50–78",
    pricePerPersonVnd: "1.32–2.07m VND",
    setup: "Этаж виллы Sakura для шести взрослых, с несколькими спальнями и ванными.",
    why: "Тихий берег озера Tuyền Lâm (Туенлам), курортный сервис, завтрак, спа и бассейн.",
    caution:
      "В некоторых предложениях речь идёт об отдельном этаже Sakura Villa, а не о вилле целиком.",
    url: "https://www.booking.com/hotel/vn/dalat-eden-lake-resort-spa.en-gb.html",
  }),
  stay("regular", {
    name: "Vy Anh Hotel Dalat — Family Room",
    pricePerPersonUsd: "$8–11",
    pricePerPersonVnd: "200–280k VND",
    setup: "Один семейный номер с тремя двуспальными кроватями для шести взрослых.",
    why: "Простой центральный вариант, особенно удобный для группы: не придётся делиться на несколько номеров.",
    url: "https://www.booking.com/hotel/vn/vy-anh-dalat.html",
  }),
];

const nhaTrangStays = [
  stay("special", {
    name: "Memento Country Home — Thatched Cottages",
    experience: "Загородный дом с историей",
    pricePerPersonUsd: "$13–22",
    pricePerPersonVnd: "350–570k VND",
    setup: "Три номера в Oldie House или коттеджах под соломенной крышей, по два-три человека.",
    why: "Небольшое сельское поместье вокруг семейного дома старше 70 лет, с бамбуковым садом, домашней кухней и бассейном.",
    caution:
      "От центра Nha Trang (Нячанга) около 18 км. Прежде чем отказаться от пляжа, подтвердите три подходящих номера на обе ночи.",
    mapNote:
      "Метка указывает на сельскую местность Diên Hòa (Зиенхоа); точный въезд смотрите в подтверждении бронирования.",
    url: "https://www.agoda.com/memento-country-home/hotel/nha-trang-vn.html",
  }),
  stay("luxury", {
    name: "Vinpearl Resort & Spa Nha Trang Bay — Three-Bedroom Pool Villa",
    pricePerPersonUsd: "$83–117",
    pricePerPersonVnd: "2.2–3.07m VND",
    setup: "Вилла у пляжа с тремя спальнями и частным бассейном, рассчитанная на шестерых.",
    why: "Полноценный курортный отдых: простор, приватность, инфраструктура острова и прямой выход к пляжу.",
    caution:
      "Заложите время на трансфер до острова: для короткой вечерней прогулки по городу этот вариант неудобен.",
    url: "https://www.booking.com/hotel/vn/vinpearl-premium-nha-trang-bay.html",
  }),
  stay("regular", {
    name: "DTX Hotel Nha Trang",
    pricePerPersonUsd: "$17–23",
    pricePerPersonVnd: "430–620k VND",
    setup: "Три двухместных номера для шести взрослых.",
    why: "Надёжная база в центре рядом с пляжем и бассейном на крыше, но без курортной наценки.",
    url: "https://www.booking.com/hotel/vn/dtx-nha-trang.en-gb.html",
  }),
];

export const staysByDay = {
  1: plan("Tam Thanh (Тамтхань)", "Одна ночь после первого ходового дня.", [
    stay("special", {
      name: "House of the Rising Sun at Tam Thanh Beach",
      experience: "Отдельный дом у моря",
      pricePerPersonUsd: "$15–22",
      pricePerPersonVnd: "400–570k VND",
      setup: "Целый дом у пляжа с тремя спальнями — ровно на шестерых.",
      why: "Лучшее попадание в замысел поездки: вся компания вместе, своя кухня, вид на море и рассвет сразу за дверью.",
      caution:
        "Отзывов мало, а хозяин в последнее время отвечает нечасто — обязательно напишите ему заранее.",
      mapNote: "До подтверждения бронирования Airbnb показывает только примерное положение дома.",
      url: "https://www.airbnb.com/rooms/33101620",
    }),
    stay("luxury", {
      name: "Tam Thanh Beach Resort & Spa",
      pricePerPersonUsd: "$16–25",
      pricePerPersonVnd: "420–650k VND",
      setup: "Три курортных номера для шести взрослых.",
      why: "Самый комфортный вариант поблизости: пляж, бассейн, ресторан и спа.",
      url: "https://www.booking.com/hotel/vn/tam-thanh-beach-resort-amp-spa.en-gb.html",
    }),
    stay("regular", {
      name: "Tam Thanh Natural Beach Resort",
      pricePerPersonUsd: "$8–13",
      pricePerPersonVnd: "200–330k VND",
      setup: "Три простых номера или бунгало у пляжа для шестерых.",
      why: "Недорого, прямо у моря и рядом с деревней муралов. Условия скромные, зато место выбрано удачно.",
      url: "https://www.agoda.com/tam-thanh-natural-beach-resort_2/hotel/tam-ky-quang-nam-vn.html",
    }),
  ]),
  2: plan("Măng Đen (Мангден)", "Одна ночь после длинного переезда через Vi Ô Lắc (Виолак).", [
    stay("special", {
      name: "De Vivre Homestay Măng Đen",
      experience: "Гостевой дом или палатка",
      pricePerPersonUsd: "$12–17",
      pricePerPersonVnd: "300–430k VND",
      setup:
        "Семейный номер на шестерых с тремя большими двуспальными кроватями; палатки можно запросить отдельно.",
      why: "Сосны, горы и сад — и выбор между полноценным номером на шестерых и одной ночью в палатке.",
      caution:
        "Уточните, защищены ли палатки от дождя и будет ли доступ к отдельной ванной в даты поездки.",
      url: "https://www.booking.com/hotel/vn/khach-san-de-vivre.html",
    }),
    stay("luxury", {
      name: "Diamond Luxury Hotel & Cafe Măng Đen",
      pricePerPersonUsd: "$14–20",
      pricePerPersonVnd: "370–530k VND",
      setup: "Один семейный номер делюкс с тремя двуспальными кроватями.",
      why: "Самое простое размещение всей компании с повышенным комфортом: свежие номера и никаких ночных переселений.",
      url: "https://www.booking.com/hotel/vn/diamond-luxury-amp-cafe-mang-den.html",
    }),
    stay("regular", {
      name: "Bình Sơn Măng Đen Villa",
      pricePerPersonUsd: "$8–14",
      pricePerPersonVnd: "220–370k VND",
      setup: "Вилла на шестерых, заявленная с тремя большими двуспальными кроватями.",
      why: "Тихая домашняя альтернатива трём отдельным номерам по умеренной цене для группы.",
      caution:
        "В одном объявлении объединено несколько типов вилл — подтвердите, что в выбранном варианте действительно три кровати.",
      url: "https://www.booking.com/hotel/vn/binh-son-mang-den-villa-mang-den.en-gb.html",
    }),
  ]),
  3: plan(
    "Pleiku (Плейку)",
    "Одна ночь; ферма здесь особенно удачна по соотношению цены и впечатлений.",
    [
      stay("special", {
        name: "An Nhiên Farmstay & Resort — Full House",
        experience: "Жилая ферма",
        pricePerPersonUsd: "$5–8",
        pricePerPersonVnd: "130–200k VND",
        setup: "Целый дом с одной двуспальной и четырьмя односпальными кроватями.",
        why: "Настоящий дом для всей компании среди овощных грядок, рисовых и кофейных полей, с садом и зоной барбекю.",
        url: "https://www.booking.com/hotel/vn/xom-organic-farm-stay.en-gb.html",
      }),
      stay("luxury", {
        name: "Mường Thanh Grand Gia Lai",
        pricePerPersonUsd: "$20–30",
        pricePerPersonVnd: "530–780k VND",
        setup: "Три двухместных номера для шести взрослых.",
        why: "Надёжный полноформатный отель Pleiku (Плейку): бассейн, спа, ресторан и круглосуточный сервис.",
        url: "https://www.booking.com/hotel/vn/muong-thanh-grand-gia-lai.en-gb.html",
      }),
      stay("regular", {
        name: "Adalie Pleiku Hotel",
        pricePerPersonUsd: "$9–14",
        pricePerPersonVnd: "230–370k VND",
        setup: "Один семейный и один двухместный номер для шестерых.",
        why: "Чистые практичные номера, понятное расположение в городе и разумная общая цена.",
        url: "https://www.booking.com/hotel/vn/adalie-pleiku.html",
      }),
    ],
  ),
  4: plan(
    "озеро Lắk (Лак)",
    "Одна ночь. Здесь особенно стоит выбрать впечатления, а не минимальную цену.",
    [
      stay("special", {
        name: "LAK Tented Camp — Lakeview Tents",
        experience: "Палаточный лагерь у озера",
        pricePerPersonUsd: "$23–45",
        pricePerPersonVnd: "600k–1.18m VND",
        setup: "Две палатки с ванными и видом на озеро, до трёх человек в каждой.",
        why: "Прибытие на лодке, ночь под парусиной и вид на озеро и горы — самый яркий вариант ночёвки за всю поездку.",
        caution:
          "Нижняя граница включает только проживание; питание, лодка и культурная программа увеличат итоговую сумму.",
        url: "https://www.booking.com/hotel/vn/lak-tented-camp.en-gb.html",
      }),
      stay("luxury", {
        name: "LAK Tented Camp — Lakefront Bungalows",
        pricePerPersonUsd: "$43–63",
        pricePerPersonVnd: "1.12–1.67m VND",
        setup: "Два бунгало с кондиционером у самой воды, до трёх человек в каждом.",
        why: "Самый комфортный вариант прямо на озере Lắk (Лак), сохранивший лодочный трансфер и тишину лагеря.",
        caution: "Это хорошо устроенный эколодж, а не привычный курорт с бассейном и спа.",
        url: "https://www.booking.com/hotel/vn/lak-tented-camp.en-gb.html",
      }),
      stay("regular", {
        name: "Lak View Hotel",
        pricePerPersonUsd: "$6–9",
        pricePerPersonVnd: "150–230k VND",
        setup: "Три двухместных номера для шести взрослых.",
        why: "Простой, но удобно расположенный вариант у озера, если лагерь слишком дорог или занят.",
        url: "https://www.booking.com/hotel/vn/lak-view.en-gb.html",
      }),
    ],
  ),
  5: plan(
    "Đà Lạt (Далат)",
    "Одно бронирование на пятую и шестую ночи: в день прогулки базу не меняем.",
    daLatStays,
  ),
  6: plan(
    "Đà Lạt (Далат)",
    "Вторая ночь того же двухдневного бронирования в Đà Lạt (Далате).",
    daLatStays,
  ),
  7: plan(
    "Nha Trang (Нячанг)",
    "Одно бронирование на седьмую и восьмую ночи; в день отдыха байки остаются на парковке.",
    nhaTrangStays,
  ),
  8: plan(
    "Nha Trang (Нячанг)",
    "Вторая ночь того же двухдневного бронирования в Nha Trang (Нячанге).",
    nhaTrangStays,
  ),
  9: plan(
    "Sông Cầu (Шонгкау)",
    "Одна ночь; лучше остаться у моря, чем в тот же вечер продолжать до Quy Nhơn (Куинёна).",
    [
      stay("special", {
        name: "Lucky Spot Beach Bungalow",
        experience: "Отдельное бунгало у пляжа",
        pricePerPersonUsd: "$15–25",
        pricePerPersonVnd: "400–650k VND",
        setup: "Три простых бунгало или номера у пляжа для шестерых.",
        why: "Небольшое тихое место у моря, где после ходового дня песок начинается прямо за порогом.",
        url: "https://www.booking.com/hotel/vn/lucky-spot-beach-bungalow.en-gb.html",
      }),
      stay("luxury", {
        name: "Zannier Bãi San Hô — Three-Bedroom Grand Bay Pool Villa",
        pricePerPersonUsd: "$267–400",
        pricePerPersonVnd: "7–10.5m VND",
        setup: "Вилла площадью 241 м² с тремя спальнями и частным панорамным бассейном.",
        why: "Главная роскошь маршрута: вид на море, полное уединение и выдающаяся архитектура курорта в закрытой бухте.",
        caution: "Диапазон ориентировочный: обычно курорт сообщает цену этой виллы по запросу.",
        url: "https://www.zannierhotels.com/hotels/bai-san-ho/accommodation/three-bedroom-grand-bay-pool-villa/",
      }),
      stay("regular", {
        name: "RUBEACH Hotel & Restaurant",
        pricePerPersonUsd: "$9–16",
        pricePerPersonVnd: "230–420k VND",
        setup: "Три двухместных номера для шести взрослых.",
        why: "Практичная остановка у пляжа с бассейном и рестораном, без высокой цены уединённых курортов.",
        url: "https://www.booking.com/hotel/vn/rubeach-amp-rerost-song-cau1.en-gb.html",
      }),
    ],
  ),
  10: plan(
    "Sa Huỳnh (Сахюинь)",
    "Одна ночь. Выбор невелик: бронируйте заранее и рассчитывайте на простой сервис.",
    [
      stay("special", {
        name: "Homestay Giếng Cổ, Gò Cỏ Village",
        experience: "Гостевой дом в деревне",
        pricePerPersonUsd: "$6–9",
        pricePerPersonVnd: "150–230k VND",
        setup: "Простые глинобитные хижины под соломой с дополнительными кроватями и общей ванной.",
        why: "Самый самобытный вариант: ночь у жителей старой прибрежной деревни вместо обычного отеля.",
        caution:
          "Размещение шестерых и поздний приезд нужно согласовать напрямую; условия здесь намеренно деревенские.",
        mapNote: "Метка указывает на деревню Gò Cỏ (Гоко); точный дом хозяина уточните до приезда.",
        url: "https://ohdidi.vn/homestay/homestay-gieng-co",
      }),
      stay("luxury", {
        name: "Sa Huynh Beach Resort",
        pricePerPersonUsd: "$13–20",
        pricePerPersonVnd: "330–530k VND",
        setup: "Три номера или виллы с видом на пляж для шести взрослых.",
        why: "Самый комфортный местный вариант: бассейн, ресторан и прямой выход к пляжу.",
        caution: "Это лучший полноформатный отель в округе, но не городская гостиница класса люкс.",
        url: "https://www.agoda.com/en-sg/sa-huynh-resort-quang-ngai/hotel/quang-ngai-vn.html",
      }),
      stay("regular", {
        name: "Tien Vuong Hotel",
        pricePerPersonUsd: "$4–8",
        pricePerPersonVnd: "120–200k VND",
        setup:
          "Два номера с видом на море или сад; в каждом по две двуспальные кровати, всего на шестерых.",
        why: "Простой запасной вариант у пляжа: парковка, балконы и достаточно спальных мест для всей группы.",
        url: "https://www.booking.com/hotel/vn/tien-vuong.en-gb.html",
      }),
    ],
  ),
  11: plan(
    "озеро Phú Ninh (Фунин)",
    "Одна ночь. Все варианты у озера подтверждайте напрямую: мест немного.",
    [
      stay("special", {
        name: "Phú Ninh Lake official campsite",
        experience: "Кемпинг у озера",
        pricePerPersonUsd: "$8–11",
        pricePerPersonVnd: "200–280k VND",
        setup: "Одна четырёхместная и одна двухместная палатка для всей группы.",
        why: "Самая близкая к природе ночь у озера и самый доступный способ остаться всей компанией под одним небом.",
        caution:
          "Заранее подтвердите работу кемпинга с ночёвкой, защиту от дождя, постельные принадлежности и доступ к санузлу.",
        mapNote:
          "Метка указывает на гостевую зону озера; точное место для палаток назначает оператор.",
        url: "https://vinpearl.com/en/phu-ninh-lake",
      }),
      stay("luxury", {
        name: "Phu Ninh Lake Resort",
        pricePerPersonUsd: "$21–28",
        pricePerPersonVnd: "550–750k VND",
        setup: "Один семейный номер с видом на озеро и одно шале или двухместный номер.",
        why: "Комфорт у озера: красивый вид, открытый бассейн, ресторан и никакой ночной дороги обратно в Tam Kỳ (Тамки).",
        caution:
          "В интернете выставлена лишь часть номеров — попросите курорт удержать весь комплект на шестерых.",
        url: "https://www.booking.com/hotel/vn/phu-ninh-lake-resort-amp-spa-ecotourism.en-gb.html",
      }),
      stay("regular", {
        name: "Mường Thanh Grand Quảng Nam",
        pricePerPersonUsd: "$18–24",
        pricePerPersonVnd: "470–630k VND",
        setup: "Три двухместных номера в Tam Kỳ (Тамки), примерно в 7 км от озера.",
        why: "Надёжный вариант на плохую погоду: большой отель с бассейном, рестораном, парковкой и круглосуточной стойкой.",
        url: "https://www.booking.com/hotel/vn/muong-thanh-grand-quang-nam.html",
      }),
    ],
  ),
  12: plan(
    "Đà Nẵng (Дананг)",
    "Необязательная ночь после возврата байков; если все сразу уезжают, бронирование не нужно.",
    [
      stay("special", {
        name: "KOI Resort & Residence — Three-Bedroom Pool Villa",
        experience: "Вилла с частным бассейном",
        pricePerPersonUsd: "$67–108",
        pricePerPersonVnd: "1.75–2.85m VND",
        setup: "Целая вилла с тремя спальнями и частным бассейном для шестерых.",
        why: "Лучший общий дом на финальную ночь: своё пространство, курортная инфраструктура и пляж к югу от города.",
        caution:
          "Цены на виллы у сада, реки и пляжа сильно различаются — подтвердите именно тот вариант, что показан в бронировании.",
        url: "https://www.booking.com/hotel/vn/koi-resort-and-residence-da-nang.en-gb.html",
      }),
      stay("luxury", {
        name: "Naman Retreat — Three-Bedroom Garden Pool Villa",
        pricePerPersonUsd: "$125–167",
        pricePerPersonVnd: "3.28–4.38m VND",
        setup:
          "Вилла площадью 670–850 м² с тремя спальнями, гостиной, столовой и большим частным бассейном.",
        why: "Самый изысканный финал для шестерых: достаточно места, чтобы быть вместе, и полный курортный сервис.",
        caution:
          "Акционное предложение рассчитано на две ночи; при необходимости запросите отдельный тариф на одну.",
        url: "https://www.booking.com/hotel/vn/naman-retreat.en-gb.html",
      }),
      stay("regular", {
        name: "SALA Danang Beach Hotel",
        pricePerPersonUsd: "$38–50",
        pricePerPersonVnd: "1.0–1.32m VND",
        setup: "Три двухместных номера для шести взрослых.",
        why: "Комфортный финал у пляжа Mỹ Khê (Микхе): бассейн на крыше, море рядом, удобный выезд в аэропорт и центр.",
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
