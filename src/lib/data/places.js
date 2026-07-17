import { addPhotoMetadata, placePhotoManifest } from "./photo-manifest.js";

const official = {
  daNang: "https://vietnam.travel/things-to-do/around-marble-mountains",
  hoiAn: "https://vietnam.travel/places-to-go/central-vietnam/hoi-an",
  tamThanh: "https://quangnamtourism.com.vn/lang-bich-hoa-tam-thanh/",
  phuNinh:
    "https://quangnamtourism.com.vn/en/detailnews/?id=news_2148&t=nine-musttry-experiences-in-quang-nam",
  konTum:
    "https://nongthon.vietnamtourism.gov.vn/kon-tum-attracts-tourists-with-its-indigenous-culture/?lang=en",
  pleiku: "https://vietnam.travel/node/1865",
  highlands: "https://images.vietnamtourism.gov.vn/vn/dmdocuments/2022/220925_BCTT_QHHTDL.pdf",
  daLat: "https://www.vietnam.travel/places-to-go/central-vietnam/dalat",
  daPhu: "https://dalat.vn/vi/detailnews/?id=news_290&t=dalat-city",
  khanhLe: "https://congan.khanhhoa.gov.vn/vi/ky-nang-can-thiet-khi-lai-xe-tren-duong-deo-khanh-le",
  nhaTrang: "https://vietnam.travel/places-to-go/central-vietnam/nha-trang",
  nhaTrangLocal: "https://vietnam.travel/things-to-do/experience-nha-trang-like-a-local",
  phuYen: "https://www.vietnam.travel/things-to-do/phu-yen-undiscovered-nature-and-remote-culture",
  binhDinh: "https://vietnam.travel/node/1453",
  saHuynh:
    "https://quangngai.gov.vn/tin-tuc/tin-tu-cac-so-nganh-dia-phuong/du-lich-quang-ngai-sac-xuan-tren-nhung-hanh-trinh-moi.html",
  goCo: "https://nongthon.vietnamtourism.gov.vn/explore-go-co-village-heritage-park-a-3-star-ocop-jewel-of-quang-ngai/?lang=en",
  quangNgai:
    "https://quangngai.gov.vn/tin-tuc/tin-tu-cac-so-nganh-dia-phuong/du-lich-quang-ngai-sac-xuan-tren-nhung-hanh-trinh-moi.html",
};

export const placeCategories = [
  { id: "waterfall", label: "Водопады", icon: "/images/place-categories/waterfall.png" },
  { id: "nature", label: "Природа и заповедники", icon: "/images/place-categories/nature.png" },
  { id: "viewpoint", label: "Виды и вершины", icon: "/images/place-categories/viewpoint.png" },
  { id: "culture", label: "Культура и святыни", icon: "/images/place-categories/culture.png" },
  { id: "history", label: "История и памятники", icon: "/images/place-categories/history.png" },
];

const source = (label, url) => [{ label, url }];

const placeRecords = [
  {
    id: "marble-mountains",
    name: "Мраморные горы Нгуханьшон (Ngũ Hành Sơn)",
    category: "culture",
    coordinates: [108.2628, 16.004],
    whyWorthIt:
      "Пять известняковых вершин скрывают пещеры и пагоды, а сверху открывается побережье у Дананга (Đà Nẵng).",
    visitMinutes: [90, 150],
    detourKm: 1,
    accessNote: "Приезжайте рано: в дождь каменные ступени становятся скользкими.",
    sources: source("Vietnam Tourism", official.daNang),
  },
  {
    id: "hoi-an",
    name: "Старый город Хойан (Hội An)",
    category: "history",
    coordinates: [108.327, 15.8805],
    whyWorthIt:
      "Старинный торговый порт, включённый в список Всемирного наследия ЮНЕСКО: деревянные дома и планировка улиц хранят следы многовекового вьетнамского, китайского, японского и европейского влияния.",
    visitMinutes: [90, 180],
    detourKm: 5,
    accessNote: "Пешеходный центр отделён от байков и проходит пешком.",
    sources: source("Vietnam Tourism", official.hoiAn),
  },
  {
    id: "an-bang",
    name: "Пляж Анбанг (An Bàng)",
    category: "nature",
    coordinates: [108.341, 15.914],
    whyWorthIt:
      "Неспешная первая остановка у моря: кафе и широкий пляж к северу от Кыадай (Cửa Đại).",
    visitMinutes: [30, 90],
    detourKm: 2,
    sources: source("Vietnam Tourism — Хойан (Hội An)", official.hoiAn),
  },
  {
    id: "cua-dai",
    name: "Берег Кыадай (Cửa Đại)",
    category: "nature",
    coordinates: [108.3572, 15.9032],
    whyWorthIt:
      "Устье реки — место, где сельские окрестности Хойана (Hội An) выходят к прибрежной дороге.",
    visitMinutes: [15, 45],
    detourKm: 0,
    sources: source("Vietnam Tourism — Хойан (Hội An)", official.hoiAn),
  },
  {
    id: "tam-thanh",
    name: "Деревня муралов Тамтхань (Tam Thanh)",
    category: "culture",
    coordinates: [108.5668, 15.565],
    whyWorthIt:
      "Рыбацкая деревня, чьи переулки превратились в галерею муралов под открытым небом; сразу за домами начинается пляж.",
    visitMinutes: [45, 90],
    detourKm: 0,
    sources: source("Туристический центр провинции Куангнам (Quảng Nam)", official.tamThanh),
  },
  {
    id: "phu-ninh-lake",
    name: "Озеро Фунин (Phú Ninh) и горячие минеральные источники",
    category: "nature",
    coordinates: [108.464, 15.4969],
    whyWorthIt:
      "Окружённое лесом водохранилище с 32 островами, тихими берегами и горячими минеральными ваннами поблизости.",
    visitMinutes: [120, 240],
    detourKm: 0,
    accessNote:
      "Бунгало и разрешённый кемпинг находятся у воды; ближайший городской вариант — Тамки (Tam Kỳ).",
    seasonNote: "Лодки, купание и кемпинг зависят от работы зоны отдыха, ветра и дождя.",
    sources: source("Туристический центр провинции Куангнам (Quảng Nam)", official.phuNinh),
  },
  {
    id: "ba-to",
    name: "Бато (Ba Tơ)",
    category: "history",
    coordinates: [108.733, 14.766],
    whyWorthIt:
      "Удобное место для рынка и короткой исторической остановки, прежде чем QL24 покинет жаркую равнину и уйдёт в горы.",
    visitMinutes: [30, 60],
    detourKm: 0,
    sources: source(
      "Туристическая база Вьетнама",
      "https://csdl.vietnamtourism.gov.vn/dest/?item=75",
    ),
  },
  {
    id: "vi-o-lac",
    name: "Перевал Виолак (Vi Ô Lắc)",
    category: "viewpoint",
    coordinates: [108.5261, 14.759],
    whyWorthIt:
      "Главный подъём второго дня: плавные лесные повороты и разрывы в облаках на старой дороге от моря в нагорье.",
    visitMinutes: [15, 30],
    detourKm: 0,
    seasonNote: "Ливень и плотная облачность скрывают виды с открытых площадок.",
    sources: source(
      "Туристическая база Вьетнама",
      "https://csdl.vietnamtourism.gov.vn/dest/?item=75",
    ),
  },
  {
    id: "pa-sy",
    name: "Водопад Паси (Pa Sỹ)",
    category: "waterfall",
    coordinates: [108.2567, 14.5971],
    whyWorthIt:
      "До лесного водопада недалеко от Мангдена (Măng Đen), поэтому к нему можно успеть в день приезда.",
    visitMinutes: [60, 90],
    detourKm: 8,
    sources: source("Путеводитель по Контуму (Kon Tum)", official.konTum),
  },
  {
    id: "dak-ke",
    name: "Озеро Дакке (Đăk Ke)",
    category: "nature",
    coordinates: [108.2757, 14.5809],
    whyWorthIt:
      "Спокойное озеро в обрамлении сосен — хороший выбор для лёгкого вечера в Мангдене (Măng Đen).",
    visitMinutes: [30, 60],
    detourKm: 3,
    sources: source("Путеводитель по Контуму (Kon Tum)", official.konTum),
  },
  {
    id: "kon-pring",
    name: "Деревня Конпринг (Kon Pring)",
    category: "culture",
    coordinates: [108.3031, 14.6003],
    whyWorthIt:
      "Поселение народа ба-на на окраине Мангдена (Măng Đen), выросшее вокруг высокого общинного дома.",
    visitMinutes: [45, 90],
    detourKm: 2,
    accessNote:
      "Ведите себя как гости и спрашивайте разрешения, прежде чем снимать людей или дома.",
    sources: source("Путеводитель по Контуму (Kon Tum)", official.konTum),
  },
  {
    id: "kon-tum-cathedral",
    name: "Деревянная церковь в Контуме (Kon Tum)",
    category: "culture",
    coordinates: [108.0132, 14.3451],
    whyWorthIt:
      "Собор возрастом более ста лет сочетает формы римской церкви, архитектуру свайных домов ба-на и местные материалы.",
    visitMinutes: [30, 60],
    detourKm: 1,
    sources: source("Национальное управление туризма Вьетнама", official.konTum),
  },
  {
    id: "kon-klor",
    name: "Общинный дом и мост Конклор (Kon Klor)",
    category: "culture",
    coordinates: [108.0355, 14.347],
    whyWorthIt:
      "Монументальная крыша общинного дома ба-на возвышается рядом с длинным подвесным мостом через реку Дакбла (Đăk Bla).",
    visitMinutes: [30, 60],
    detourKm: 3,
    sources: source("Национальное управление туризма Вьетнама", official.konTum),
  },
  {
    id: "kon-ko-tu",
    name: "Деревня Конкоту (Kon Kơ Tu)",
    category: "culture",
    coordinates: [108.0638, 14.3296],
    whyWorthIt:
      "Деревня ба-на за рекой, где общинная архитектура остаётся частью повседневной жизни нагорья.",
    visitMinutes: [45, 90],
    detourKm: 7,
    accessNote: "Жилая деревня с общинным домом и деревянными домами.",
    sources: source("Путеводитель по Контуму (Kon Tum)", official.konTum),
  },
  {
    id: "bien-ho",
    name: "Озеро Бьенхо (Biển Hồ)",
    category: "nature",
    coordinates: [107.996, 14.0469],
    whyWorthIt:
      "«Глаза Плейку (Pleiku)» — озеро в древнем вулканическом кратере среди соснового леса.",
    visitMinutes: [30, 60],
    detourKm: 7,
    sources: source("Vietnam Tourism — Зялай (Gia Lai)", official.pleiku),
  },
  {
    id: "chu-dang-ya",
    name: "Вулкан Чы Данг Я (Chư Đăng Ya)",
    category: "viewpoint",
    coordinates: [108.0544, 14.1295],
    whyWorthIt:
      "Потухший кратер, чья геометрия особенно ясно читается по возделанным склонам с гребня.",
    visitMinutes: [60, 90],
    detourKm: 15,
    seasonNote: "После дождя открытые склоны становятся менее выразительной частью маршрута.",
    sources: source("Vietnam Tourism — Зялай (Gia Lai)", official.pleiku),
  },
  {
    id: "lak-lake",
    name: "Озеро Лак (Lắk)",
    category: "nature",
    coordinates: [108.1776, 12.4232],
    whyWorthIt:
      "Большое озеро нагорья среди холмов и деревень мнонгов, особенно красивое в первые и последние часы света.",
    visitMinutes: [60, 120],
    detourKm: 0,
    sources: source("Обзор развития туризма Вьетнама", official.highlands),
  },
  {
    id: "dray-sap",
    name: "Водопад Драйсап (Dray Sáp)",
    category: "waterfall",
    coordinates: [107.9789, 12.5739],
    whyWorthIt:
      "Более тихое базальтовое ущелье в системе водопадов реки Срепок (Sêrêpốk), западнее прямого маршрута.",
    visitMinutes: [60, 90],
    detourKm: 25,
    accessNote: "Заметный крюк в четвёртый день, заменяющий городские остановки.",
    sources: source("Национальный отчёт по планированию туризма", official.highlands),
  },
  {
    id: "dray-nur",
    name: "Водопад Драйнур (Dray Nur)",
    category: "waterfall",
    coordinates: [107.8904, 12.5405],
    whyWorthIt:
      "Широкая мощная завеса воды обрушивается с базальтового края реки Срепок (Sêrêpốk).",
    visitMinutes: [60, 90],
    detourKm: 35,
    accessNote: "В длинный ходовой день его нельзя бездумно объединять с Драйсапом (Dray Sáp).",
    sources: source("Годовой отчёт Vietnam Tourism", official.highlands),
  },
  {
    id: "elephant-waterfall",
    name: "Слоновий водопад Тхаквой (Thác Voi)",
    category: "waterfall",
    coordinates: [108.3349, 11.8235],
    whyWorthIt:
      "Мощный водопад у Намбана (Nam Ban), почти на самой линии подъезда к Далату (Đà Lạt) по ĐT725.",
    visitMinutes: [45, 75],
    detourKm: 2,
    accessNote: "Доступ к нижней тропе меняется.",
    sources: source("Vietnam Tourism — Далат (Đà Lạt)", official.daLat),
  },
  {
    id: "ta-nung",
    name: "Кофейные земли Танунга (Tà Nung)",
    category: "culture",
    coordinates: [108.3513, 11.9061],
    whyWorthIt:
      "Кофейные фермы и небольшие обжарки — хороший повод не спешить на западном подъезде к Далату (Đà Lạt).",
    visitMinutes: [45, 90],
    detourKm: 0,
    sources: source("Vietnam Tourism — Далат (Đà Lạt)", official.daLat),
  },
  {
    id: "lang-biang",
    name: "Гора Лангбианг (Lang Biang)",
    category: "viewpoint",
    coordinates: [108.4406, 12.0473],
    whyWorthIt: "Серьёзная пешая цель: полноценное восхождение над плато Лангбианг (Lang Biang).",
    visitMinutes: [240, 270],
    detourKm: 12,
    accessNote:
      "Обычный маршрут туда и обратно — около 9,7 км с набором 685 м. Вход платный; впереди каменистая тропа и крутой финальный подъём.",
    seasonNote: "В дождь крутая верхняя часть тропы становится скользкой.",
    sources: [
      {
        label: "Маршрут AllTrails",
        url: "https://www.alltrails.com/trail/vietnam/lam-d-ng/lang-biang-mountain",
      },
      { label: "Запись Komoot", url: "https://www.komoot.com/tour/984411688" },
    ],
  },
  {
    id: "da-phu",
    name: "Холмы Дафу (Đa Phú)",
    category: "viewpoint",
    coordinates: [108.37, 12.0],
    whyWorthIt:
      "Короткая прогулка по сосновым холмам с открытыми видами — на случай, если вершина кажется слишком серьёзной целью.",
    visitMinutes: [90, 120],
    detourKm: 10,
    accessNote:
      "Около 4 км и 195 м набора; начало крутое и местами каменистое, на гребне почти нет тени.",
    seasonNote: "Ясная погода и сухой грунтовый подъезд лучше раскрывают этот маршрут.",
    sources: [
      {
        label: "Маршрут AllTrails",
        url: "https://www.alltrails.com/trail/vietnam/lam-d-ng/da-phu-hills-trail",
      },
      { label: "Туристический портал Далата (Đà Lạt)", url: official.daPhu },
    ],
  },
  {
    id: "tuyen-lam",
    name: "Озеро Туенлам (Tuyền Lâm)",
    category: "nature",
    coordinates: [108.4251, 11.8908],
    whyWorthIt: "Вода среди сосен и короткие размеченные тропы — лёгкая замена восхождению.",
    visitMinutes: [90, 180],
    detourKm: 8,
    accessNote:
      "Короткие маршруты подтверждаются на месте; полный западный круг и GPX UTMB пересекают частные земли.",
    sources: [
      { label: "Vietnam Tourism — Далат (Đà Lạt)", url: official.daLat },
      {
        label: "UTMB — предупреждение о доступе на маршрут",
        url: "https://vietnamhighlands.utmb.world/races/10Ktuyenlam",
      },
    ],
  },
  {
    id: "bidoup",
    name: "Национальный парк Бидуп–Нуйба (Bidoup–Núi Bà)",
    category: "nature",
    coordinates: [108.4727, 12.1516],
    whyWorthIt:
      "Верхний участок дороги между Далатом (Đà Lạt) и Нячангом (Nha Trang) проходит через горный лес с богатым биоразнообразием.",
    visitMinutes: [30, 60],
    detourKm: 4,
    accessNote: "Метка показывает территорию парка, а официальные маршруты проходят отдельно.",
    sources: source(
      "Официальный маршрут парка",
      "https://bidoupnuiba.gov.vn/tuyen-langbiang-1-ngay-2/",
    ),
  },
  {
    id: "khanh-le",
    name: "Перевал Кханьле (Khánh Lê)",
    category: "viewpoint",
    coordinates: [108.715, 12.1863],
    whyWorthIt: "Эффектный лесной спуск из прохлады плато в тропическую низменность.",
    visitMinutes: [15, 30],
    detourKm: 0,
    seasonNote:
      "Ливень и густой туман меняют характер перевала; ограничения из-за оползней зависят от текущего состояния дороги.",
    sources: source("Рекомендации полиции Кханьхоа (Khánh Hòa)", official.khanhLe),
  },
  {
    id: "nha-trang-beach",
    name: "Пляж Нячанг (Nha Trang)",
    category: "nature",
    coordinates: [109.198, 12.238],
    whyWorthIt:
      "Шесть километров городского пляжа и набережной превращают вторую ночь в настоящую паузу.",
    visitMinutes: [60, 180],
    detourKm: 0,
    sources: source("Vietnam Tourism — Нячанг (Nha Trang)", official.nhaTrang),
  },
  {
    id: "po-nagar",
    name: "Тямские башни Понагар (Po Nagar)",
    category: "history",
    coordinates: [109.1952, 12.2654],
    whyWorthIt: "Действующий храмовый комплекс, построенный тямами между VII и XII веками.",
    visitMinutes: [45, 75],
    detourKm: 3,
    sources: source("Vietnam Tourism — Нячанг (Nha Trang)", official.nhaTrangLocal),
  },
  {
    id: "long-son",
    name: "Пагода Лонгшон (Long Sơn)",
    category: "culture",
    coordinates: [109.1806, 12.2513],
    whyWorthIt:
      "Историческая пагода у подножия холма Чайтхюи (Trại Thủy), над которой возвышается большой белый Будда Нячанга (Nha Trang).",
    visitMinutes: [45, 75],
    detourKm: 2,
    sources: source("Vietnam Tourism — Нячанг (Nha Trang)", official.nhaTrang),
  },
  {
    id: "hon-chong",
    name: "Мыс Хончонг (Hòn Chồng)",
    category: "nature",
    coordinates: [109.203, 12.273],
    whyWorthIt:
      "Небольшой гранитный мыс на северной окраине города с открытым видом на бухту и острова.",
    visitMinutes: [30, 60],
    detourKm: 4,
    sources: source("Vietnam Tourism — Нячанг (Nha Trang)", official.nhaTrang),
  },
  {
    id: "oceanographic-museum",
    name: "Национальный океанографический музей",
    category: "history",
    coordinates: [109.2154, 12.2077],
    whyWorthIt:
      "Один из старейших морских научных музеев Вьетнама: аквариумы, исследовательские коллекции и большой скелет кита.",
    visitMinutes: [90, 150],
    detourKm: 5,
    sources: source("Vietnam Tourism — Океанографический музей", official.nhaTrangLocal),
  },
  {
    id: "mud-baths",
    name: "Горячие минеральные и грязевые ванны Нячанга (Nha Trang)",
    category: "nature",
    coordinates: [109.177, 12.279],
    whyWorthIt:
      "Тёплые минеральные бассейны и грязевые ванны особенно хороши в плохую погоду или для восстановления.",
    visitMinutes: [120, 240],
    detourKm: 6,
    sources: source("Vietnam Tourism — Нячанг (Nha Trang)", official.nhaTrang),
  },
  {
    id: "hon-mun",
    name: "Морская зона Хонмун (Hòn Mun)",
    category: "nature",
    coordinates: [109.3049, 12.1667],
    whyWorthIt: "Охраняемый риф — одно из лучших мест в бухте для снорклинга в спокойную погоду.",
    visitMinutes: [300, 480],
    detourKm: 0,
    accessNote: "Добраться можно только на лодке; поездки проводят действующие операторы.",
    seasonNote: "Морские предупреждения, сильная зыбь и гроза отменяют выход в море.",
    sources: source(
      "Vietnam Tourism — острова Нячанга (Nha Trang)",
      "https://vietnam.travel/things-to-do/where-to-go-when-island-hopping-around-nha-trang",
    ),
  },
  {
    id: "dai-lanh",
    name: "Пляж Дайлань (Đại Lãnh)",
    category: "nature",
    coordinates: [109.369, 12.832],
    whyWorthIt:
      "Широкая бухта под перевалом — хорошее место для первой паузы после выезда из Нячанга (Nha Trang).",
    visitMinutes: [30, 75],
    detourKm: 1,
    sources: source("Vietnam Tourism — Фуйен (Phú Yên)", official.phuYen),
  },
  {
    id: "vung-ro",
    name: "Бухта Вунгро (Vũng Rô)",
    category: "history",
    coordinates: [109.4143, 12.8712],
    whyWorthIt:
      "Защищённая горами бухта, где рыбацкая жизнь соседствует с историей морского пути снабжения.",
    visitMinutes: [45, 90],
    detourKm: 12,
    sources: source("Vietnam Tourism — Фуйен (Phú Yên)", official.phuYen),
  },
  {
    id: "mui-dien",
    name: "Мыс Муйдьен (Mũi Điện) и пляж Баймон (Bãi Môn)",
    category: "nature",
    coordinates: [109.4491, 12.8939],
    whyWorthIt:
      "Лестница к маяку поднимается над уединённым пляжем у восточной оконечности Вьетнама.",
    visitMinutes: [90, 150],
    detourKm: 15,
    sources: source("Vietnam Tourism — Фуйен (Phú Yên)", official.phuYen),
  },
  {
    id: "ganh-da-dia",
    name: "Базальтовые скалы Ганьдадиа (Gành Đá Đĩa)",
    category: "nature",
    coordinates: [109.2938, 13.3542],
    whyWorthIt: "Сцепленные базальтовые колонны спускаются в море, словно тёмные каменные соты.",
    visitMinutes: [60, 90],
    detourKm: 12,
    sources: source("Vietnam Tourism — Фуйен (Phú Yên)", official.phuYen),
  },
  {
    id: "o-loan",
    name: "Лагуна Олоан (Ô Loan)",
    category: "nature",
    coordinates: [109.2514, 13.2686],
    whyWorthIt:
      "Мелководная прибрежная лагуна с широкими водными панорамами и свежими местными моллюсками.",
    visitMinutes: [45, 90],
    detourKm: 8,
    sources: source("Vietnam Tourism — Фуйен (Phú Yên)", official.phuYen),
  },
  {
    id: "ql1d-viewpoint",
    name: "Смотровые площадки на прибрежной QL1D",
    category: "viewpoint",
    coordinates: [109.245, 13.69],
    whyWorthIt:
      "Череда поворотов над обрывами и площадок с видом на море между Шонгкау (Sông Cầu) и Куинёном (Quy Nhơn).",
    visitMinutes: [15, 30],
    detourKm: 0,
    sources: source("Vietnam Tourism — Биньдинь (Bình Định)", official.binhDinh),
  },
  {
    id: "ghenh-rang",
    name: "Парк Геньранг (Ghềnh Ráng)",
    category: "nature",
    coordinates: [109.215, 13.744],
    whyWorthIt:
      "Парк на мысе над Куинёном (Quy Nhơn): каменистые бухты и широкий вид вдоль городского пляжа.",
    visitMinutes: [45, 75],
    detourKm: 4,
    sources: source("Vietnam Tourism — Биньдинь (Bình Định)", official.binhDinh),
  },
  {
    id: "twin-towers",
    name: "Башни Тхапдой (Tháp Đôi)",
    category: "history",
    coordinates: [109.2111, 13.7863],
    whyWorthIt:
      "Две богато украшенные тямские башни XI–XII веков сохранились среди современного Куинёна (Quy Nhơn).",
    visitMinutes: [30, 60],
    detourKm: 2,
    sources: source("Vietnam Tourism — Биньдинь (Bình Định)", official.binhDinh),
  },
  {
    id: "banh-it",
    name: "Тямские башни Баньит (Bánh Ít)",
    category: "history",
    coordinates: [109.1352, 13.8684],
    whyWorthIt: "Четыре разные тямские башни на вершине холма с широким видом в глубь страны.",
    visitMinutes: [60, 90],
    detourKm: 20,
    accessNote: "Заметный крюк в десятый день, лежащий в стороне от полуострова.",
    sources: source("Vietnam Tourism — Биньдинь (Bình Định)", official.binhDinh),
  },
  {
    id: "eo-gio",
    name: "Бухта Эозё (Eo Gió)",
    category: "nature",
    coordinates: [109.295, 13.89],
    whyWorthIt:
      "Продуваемая ветром бухта и тропа над обрывом рядом с рыбацкой деревней Нёнли (Nhơn Lý).",
    visitMinutes: [60, 90],
    detourKm: 16,
    sources: source("Vietnam Tourism — Биньдинь (Bình Định)", official.binhDinh),
  },
  {
    id: "ong-nui",
    name: "Пагода Онгнуй (Ông Núi)",
    category: "culture",
    coordinates: [109.216, 14.061],
    whyWorthIt:
      "Буддийский комплекс на склоне и гигантская сидящая статуя над прибрежной равниной.",
    visitMinutes: [60, 90],
    detourKm: 4,
    sources: source("Vietnam Tourism — Биньдинь (Bình Định)", official.binhDinh),
  },
  {
    id: "sa-huynh",
    name: "Пляж Сахюинь (Sa Huỳnh)",
    category: "nature",
    coordinates: [109.058, 14.681],
    whyWorthIt:
      "Золотой песок, соляные промыслы и рыбацкая жизнь делают это место хорошей тихой ночёвкой у моря.",
    visitMinutes: [60, 120],
    detourKm: 0,
    sources: source("Национальное управление туризма Вьетнама", official.saHuynh),
  },
  {
    id: "go-co",
    name: "Деревня Гоко (Gò Cỏ)",
    category: "culture",
    coordinates: [109.0737, 14.7056],
    whyWorthIt:
      "Старое рыбацкое поселение, где каменные стены, добыча соли и общинный туризм связывают несколько пластов истории побережья.",
    visitMinutes: [60, 120],
    detourKm: 5,
    sources: source("Национальное управление туризма Вьетнама", official.goCo),
  },
  {
    id: "my-khe-quang-ngai",
    name: "Пляж Микхе (Mỹ Khê), Куангнгай (Quảng Ngãi)",
    category: "nature",
    coordinates: [108.8953, 15.1906],
    whyWorthIt:
      "Длинная дуга пляжа среди рыбацких поселений к северо-востоку от Куангнгая (Quảng Ngãi).",
    visitMinutes: [30, 75],
    detourKm: 0,
    sources: source("Туристический портал Куангнгая (Quảng Ngãi)", official.quangNgai),
  },
  {
    id: "son-my",
    name: "Мемориал Шонми (Sơn Mỹ)",
    category: "history",
    coordinates: [108.8727, 15.178],
    whyWorthIt: "Мемориал и музей, сохраняющие память о трагедии в Милай (Mỹ Lai) 1968 года.",
    visitMinutes: [60, 90],
    detourKm: 4,
    accessNote: "На мемориал обычно уходит 60–90 минут.",
    sources: source("Туристический портал Куангнгая (Quảng Ngãi)", official.quangNgai),
  },
  {
    id: "ba-lang-an",
    name: "Мыс Баланган (Bà Làng An)",
    category: "nature",
    coordinates: [108.9439, 15.2353],
    whyWorthIt:
      "Мыс из вулканической породы с рыбацкими деревнями и открытым видом в сторону Лишона (Lý Sơn).",
    visitMinutes: [45, 90],
    detourKm: 8,
    sources: source("Туристический портал Куангнгая (Quảng Ngãi)", official.quangNgai),
  },
  {
    id: "thien-an",
    name: "Пагода Тхиенан (Thiên Ấn)",
    category: "culture",
    coordinates: [108.8219, 15.1501],
    whyWorthIt:
      "Историческая пагода на невысокой горе над рекой Чакхук (Trà Khúc) и равниной Куангнгая (Quảng Ngãi).",
    visitMinutes: [45, 75],
    detourKm: 7,
    sources: source("Туристический портал Куангнгая (Quảng Ngãi)", official.quangNgai),
  },
];

export const places = addPhotoMetadata(placeRecords, placePhotoManifest);

const placeById = new Map(places.map((place) => [place.id, place]));

export function getPlace(id) {
  return placeById.get(id) ?? null;
}

export function placesForIds(ids = []) {
  return ids.map((id) => getPlace(id)).filter(Boolean);
}

export function placesForItinerary(itinerary) {
  const ids = [...new Set(itinerary.days.flatMap((day) => day.placeIds ?? []))];
  return placesForIds(ids);
}

export function filterPlacesByCategory(sourcePlaces, categoryIds) {
  const allowed = new Set(categoryIds);
  return sourcePlaces.filter((place) => allowed.has(place.category));
}
