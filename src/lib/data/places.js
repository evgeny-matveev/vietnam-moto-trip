import { addPhotoMetadata, placePhotoManifest } from './photo-manifest.js';

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
  { id: "waterfall", label: "Водопады", symbol: "💧︎" },
  { id: "park", label: "Парки и заповедники", symbol: "🌲︎" },
  { id: "nature", label: "Природные места", symbol: "🍄︎" },
  { id: "viewpoint", label: "Виды и вершины", symbol: "⛰︎" },
  { id: "culture", label: "Культура и святыни", symbol: "🛕︎" },
  { id: "history", label: "История и памятники", symbol: "🏛︎" },
];

const source = (label, url) => [{ label, url }];

const placeRecords = [
  {
    id: "marble-mountains",
    name: "Ngũ Hành Sơn (Нгуханьшон, Мраморные горы)",
    category: "culture",
    coordinates: [108.2628, 16.004],
    whyWorthIt:
      "Пять известняковых вершин скрывают пещеры и пагоды, а сверху открывается побережье у Đà Nẵng (Дананга).",
    visitMinutes: [90, 150],
    detourKm: 1,
    accessNote: "Приезжайте рано: в дождь каменные ступени становятся скользкими.",
    sources: source("Vietnam Tourism", official.daNang),
  },
  {
    id: "hoi-an",
    name: "Старый город Hội An (Хойан)",
    category: "history",
    coordinates: [108.327, 15.8805],
    whyWorthIt:
      "Старинный торговый порт из списка ЮНЕСКО: деревянные дома и планировка улиц хранят следы многовекового вьетнамского, китайского, японского и европейского влияния.",
    visitMinutes: [90, 180],
    detourKm: 5,
    accessNote:
      "Паркуйтесь за пределами пешеходного центра и не ведите группу сквозь толпу старого города.",
    sources: source("Vietnam Tourism", official.hoiAn),
  },
  {
    id: "an-bang",
    name: "Пляж An Bàng (Анбанг)",
    category: "nature",
    coordinates: [108.341, 15.914],
    whyWorthIt:
      "Неспешная первая остановка у моря: кафе и широкий пляж к северу от Cửa Đại (Кыадай).",
    visitMinutes: [30, 90],
    detourKm: 2,
    sources: source("Vietnam Tourism — Hội An (Хойан)", official.hoiAn),
  },
  {
    id: "cua-dai",
    name: "Берег Cửa Đại (Кыадай)",
    category: "nature",
    coordinates: [108.3572, 15.9032],
    whyWorthIt:
      "Устье реки отмечает место, где сельские окрестности Hội An (Хойана) выходят к прибрежной дороге.",
    visitMinutes: [15, 45],
    detourKm: 0,
    sources: source("Vietnam Tourism — Hội An (Хойан)", official.hoiAn),
  },
  {
    id: "tam-thanh",
    name: "Деревня муралов Tam Thanh (Тамтхань)",
    category: "culture",
    coordinates: [108.5668, 15.565],
    whyWorthIt:
      "Рыбацкая деревня, чьи переулки превратились в галерею муралов под открытым небом; сразу за домами начинается пляж.",
    visitMinutes: [45, 90],
    detourKm: 0,
    sources: source("Туристический центр Quảng Nam (Куангнама)", official.tamThanh),
  },
  {
    id: "phu-ninh-lake",
    name: "Озеро Phú Ninh (Фунин) и горячие минеральные источники",
    category: "nature",
    coordinates: [108.464, 15.4969],
    whyWorthIt:
      "Окружённое лесом водохранилище с 32 островами, тихими берегами и горячими минеральными ваннами поблизости.",
    visitMinutes: [120, 240],
    detourKm: 0,
    accessNote:
      "До поездки подтвердите бунгало или разрешённый кемпинг у воды; ближайший надёжный запасной вариант — Tam Kỳ (Тамки).",
    seasonNote:
      "Лодки, купание и кемпинг зависят от работы зоны отдыха, ветра и дождя; по умолчанию рассчитывайте на вечер на берегу.",
    sources: source("Туристический центр Quảng Nam (Куангнама)", official.phuNinh),
  },
  {
    id: "ba-to",
    name: "Ba Tơ (Бато)",
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
    name: "Перевал Vi Ô Lắc (Виолак)",
    category: "viewpoint",
    coordinates: [108.5261, 14.759],
    whyWorthIt:
      "Главный подъём второго дня: плавные лесные повороты и разрывы в облаках на старой дороге от моря в нагорье.",
    visitMinutes: [15, 30],
    detourKm: 0,
    seasonNote: "В ливень и плотной облачности не останавливайтесь на открытых площадках.",
    sources: source(
      "Туристическая база Вьетнама",
      "https://csdl.vietnamtourism.gov.vn/dest/?item=75",
    ),
  },
  {
    id: "pa-sy",
    name: "Водопад Pa Sỹ (Паси)",
    category: "waterfall",
    coordinates: [108.2567, 14.5971],
    whyWorthIt:
      "Лесной водопад достаточно близко к Măng Đen (Мангдену), чтобы успеть к нему в день приезда.",
    visitMinutes: [60, 90],
    detourKm: 8,
    sources: source("Путеводитель по Kon Tum (Контуму)", official.konTum),
  },
  {
    id: "dak-ke",
    name: "Озеро Đăk Ke (Дакке)",
    category: "nature",
    coordinates: [108.2757, 14.5809],
    whyWorthIt:
      "Спокойное озеро в обрамлении сосен — хороший выбор для лёгкого вечера в Măng Đen (Мангдене).",
    visitMinutes: [30, 60],
    detourKm: 3,
    sources: source("Путеводитель по Kon Tum (Контуму)", official.konTum),
  },
  {
    id: "kon-pring",
    name: "Деревня Kon Pring (Конпринг)",
    category: "culture",
    coordinates: [108.3031, 14.6003],
    whyWorthIt:
      "Поселение народа ба-на на окраине Măng Đen (Мангдена), выросшее вокруг высокого общинного дома.",
    visitMinutes: [45, 90],
    detourKm: 2,
    accessNote:
      "Ведите себя как гости и спрашивайте разрешения, прежде чем снимать людей или дома.",
    sources: source("Путеводитель по Kon Tum (Контуму)", official.konTum),
  },
  {
    id: "kon-tum-cathedral",
    name: "Деревянная церковь Kon Tum (Контум)",
    category: "culture",
    coordinates: [108.0132, 14.3451],
    whyWorthIt:
      "Собор возрастом более ста лет соединяет формы римской церкви, архитектуру свайных домов ба-на и местные материалы.",
    visitMinutes: [30, 60],
    detourKm: 1,
    sources: source("Национальное управление туризма Вьетнама", official.konTum),
  },
  {
    id: "kon-klor",
    name: "Общинный дом и мост Kon Klor (Конклор)",
    category: "culture",
    coordinates: [108.0355, 14.347],
    whyWorthIt:
      "Монументальная крыша общинного дома ба-на возвышается рядом с длинным подвесным мостом через реку Đăk Bla (Дакбла).",
    visitMinutes: [30, 60],
    detourKm: 3,
    sources: source("Национальное управление туризма Вьетнама", official.konTum),
  },
  {
    id: "kon-ko-tu",
    name: "Деревня Kon Kơ Tu (Конкоту)",
    category: "culture",
    coordinates: [108.0638, 14.3296],
    whyWorthIt:
      "Деревня ба-на за рекой, где общинная архитектура остаётся частью повседневной жизни нагорья.",
    visitMinutes: [45, 90],
    detourKm: 7,
    accessNote: "Это жилая деревня, а не декорация для туристов.",
    sources: source("Путеводитель по Kon Tum (Контуму)", official.konTum),
  },
  {
    id: "bien-ho",
    name: "Озеро Biển Hồ (Бьенхо)",
    category: "nature",
    coordinates: [107.996, 14.0469],
    whyWorthIt:
      "«Глаза Pleiku (Плейку)» — озеро в древнем вулканическом кратере среди соснового леса.",
    visitMinutes: [30, 60],
    detourKm: 7,
    sources: source("Vietnam Tourism — Gia Lai (Зялай)", official.pleiku),
  },
  {
    id: "chu-dang-ya",
    name: "Вулкан Chư Đăng Ya (Чы Данг Я)",
    category: "viewpoint",
    coordinates: [108.0544, 14.1295],
    whyWorthIt:
      "Потухший кратер, чья геометрия особенно ясно читается по возделанным склонам с гребня.",
    visitMinutes: [60, 90],
    detourKm: 15,
    seasonNote: "Поднимайтесь только в сухой день, когда не приходится спешить.",
    sources: source("Vietnam Tourism — Gia Lai (Зялай)", official.pleiku),
  },
  {
    id: "lak-lake",
    name: "Озеро Lắk (Лак)",
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
    name: "Водопад Dray Sáp (Драйсап)",
    category: "waterfall",
    coordinates: [107.9789, 12.5739],
    whyWorthIt:
      "Более тихое базальтовое ущелье в системе водопадов реки Sêrêpốk (Срепок), западнее прямого маршрута.",
    visitMinutes: [60, 90],
    detourKm: 25,
    accessNote: "Это заметный крюк в четвёртый день: выбирайте его вместо городских остановок.",
    sources: source("Национальный отчёт по планированию туризма", official.highlands),
  },
  {
    id: "dray-nur",
    name: "Водопад Dray Nur (Драйнур)",
    category: "waterfall",
    coordinates: [107.8904, 12.5405],
    whyWorthIt:
      "Широкая мощная завеса воды обрушивается с базальтового края реки Sêrêpốk (Срепок).",
    visitMinutes: [60, 90],
    detourKm: 35,
    accessNote: "В длинный ходовой день его нельзя бездумно объединять с Dray Sáp (Драйсапом).",
    sources: source("Годовой отчёт Vietnam Tourism", official.highlands),
  },
  {
    id: "elephant-waterfall",
    name: "Слоновий водопад Thác Voi (Тхаквой)",
    category: "waterfall",
    coordinates: [108.3349, 11.8235],
    whyWorthIt:
      "Мощный водопад у Nam Ban (Намбана), почти на самой линии подъезда к Đà Lạt (Далату) по ĐT725.",
    visitMinutes: [45, 75],
    detourKm: 2,
    accessNote:
      "Доступ меняется; прежде чем рассчитывать на нижнюю тропу, уточните обстановку на месте.",
    sources: source("Vietnam Tourism — Đà Lạt (Далат)", official.daLat),
  },
  {
    id: "ta-nung",
    name: "Кофейные земли Tà Nung (Танунга)",
    category: "culture",
    coordinates: [108.3513, 11.9061],
    whyWorthIt:
      "Кофейные фермы и небольшие обжарщики придают смысл медленному западному подъезду к Đà Lạt (Далату).",
    visitMinutes: [45, 90],
    detourKm: 0,
    sources: source("Vietnam Tourism — Đà Lạt (Далат)", official.daLat),
  },
  {
    id: "lang-biang",
    name: "Гора Lang Biang (Лангбианг)",
    category: "viewpoint",
    coordinates: [108.4406, 12.0473],
    whyWorthIt: "Серьёзная пешая цель: полноценное восхождение над плато Lang Biang (Лангбианг).",
    visitMinutes: [240, 270],
    detourKm: 12,
    accessNote:
      "Обычный маршрут туда и обратно — около 9,7 км с набором 685 м. Вход платный; впереди каменистая тропа и крутой финальный подъём.",
    seasonNote: "Не выходите в дождь: крутая верхняя часть тропы становится скользкой.",
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
    name: "Холмы Đa Phú (Дафу)",
    category: "viewpoint",
    coordinates: [108.37, 12.0],
    whyWorthIt:
      "Короткая прогулка по сосновым холмам с открытыми видами — на случай, если вершина кажется слишком серьёзной целью.",
    visitMinutes: [90, 120],
    detourKm: 10,
    accessNote:
      "Рассчитывайте примерно на 4 км и набор 195 м. Начало крутое и местами каменистое, на гребне почти нет тени.",
    seasonNote: "Лучше идти рано и в ясную погоду; если грунтовый подъезд размок, начинайте снизу.",
    sources: [
      {
        label: "Маршрут AllTrails",
        url: "https://www.alltrails.com/trail/vietnam/lam-d-ng/da-phu-hills-trail",
      },
      { label: "Туристический портал Đà Lạt (Далата)", url: official.daPhu },
    ],
  },
  {
    id: "tuyen-lam",
    name: "Озеро Tuyền Lâm (Туенлам)",
    category: "nature",
    coordinates: [108.4251, 11.8908],
    whyWorthIt:
      "Вода среди сосен и короткие размеченные тропы дают лёгкую альтернативу восхождению.",
    visitMinutes: [90, 180],
    detourKm: 8,
    accessNote:
      "Короткий маршрут уточняйте на месте. Не идите самостоятельно по полному западному кругу или GPX UTMB: отдельные участки проходят по частной земле и вне организованного старта могут быть небезопасны.",
    sources: [
      { label: "Vietnam Tourism — Đà Lạt (Далат)", url: official.daLat },
      {
        label: "UTMB — предупреждение о доступе на маршрут",
        url: "https://vietnamhighlands.utmb.world/races/10Ktuyenlam",
      },
    ],
  },
  {
    id: "bidoup",
    name: "Национальный парк Bidoup–Núi Bà (Бидуп–Нуйба)",
    category: "park",
    coordinates: [108.4727, 12.1516],
    whyWorthIt:
      "Горный лес с исключительным биоразнообразием окружает верхний участок дороги Đà Lạt (Далат) — Nha Trang (Нячанг).",
    visitMinutes: [30, 60],
    detourKm: 4,
    accessNote:
      "Метка показывает территорию парка, но не приглашает сворачивать на неразмеченные тропы.",
    sources: source(
      "Официальный маршрут парка",
      "https://bidoupnuiba.gov.vn/tuyen-langbiang-1-ngay-2/",
    ),
  },
  {
    id: "khanh-le",
    name: "Перевал Khánh Lê (Кханьле)",
    category: "viewpoint",
    coordinates: [108.715, 12.1863],
    whyWorthIt: "Эффектный лесной спуск из прохлады плато в тропическую низменность.",
    visitMinutes: [15, 30],
    detourKm: 0,
    seasonNote:
      "Не спускайтесь в ливень или густой туман. Ограничения из-за оползней меняются — в день выезда проверьте официальное состояние дороги.",
    sources: source("Рекомендации полиции Khánh Hòa (Кханьхоа)", official.khanhLe),
  },
  {
    id: "nha-trang-beach",
    name: "Пляж Nha Trang (Нячанг)",
    category: "nature",
    coordinates: [109.198, 12.238],
    whyWorthIt:
      "Шесть километров городского пляжа и набережной превращают вторую ночь в настоящую паузу.",
    visitMinutes: [60, 180],
    detourKm: 0,
    sources: source("Vietnam Tourism — Nha Trang (Нячанг)", official.nhaTrang),
  },
  {
    id: "po-nagar",
    name: "Тямские башни Po Nagar (Понагар)",
    category: "history",
    coordinates: [109.1952, 12.2654],
    whyWorthIt: "Действующий храмовый комплекс, построенный тямами между VII и XII веками.",
    visitMinutes: [45, 75],
    detourKm: 3,
    sources: source("Vietnam Tourism — Nha Trang (Нячанг)", official.nhaTrangLocal),
  },
  {
    id: "long-son",
    name: "Пагода Long Sơn (Лонгшон)",
    category: "culture",
    coordinates: [109.1806, 12.2513],
    whyWorthIt:
      "Историческая пагода у подножия холма Trại Thủy (Чайтхюи), над которой возвышается большой белый Будда Nha Trang (Нячанга).",
    visitMinutes: [45, 75],
    detourKm: 2,
    sources: source("Vietnam Tourism — Nha Trang (Нячанг)", official.nhaTrang),
  },
  {
    id: "hon-chong",
    name: "Мыс Hòn Chồng (Хончонг)",
    category: "nature",
    coordinates: [109.203, 12.273],
    whyWorthIt:
      "Небольшой гранитный мыс на северной окраине города с открытым видом на бухту и острова.",
    visitMinutes: [30, 60],
    detourKm: 4,
    sources: source("Vietnam Tourism — Nha Trang (Нячанг)", official.nhaTrang),
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
    name: "Горячие минеральные и грязевые ванны Nha Trang (Нячанга)",
    category: "nature",
    coordinates: [109.177, 12.279],
    whyWorthIt:
      "Тёплые минеральные бассейны и грязевые ванны особенно хороши в плохую погоду или для восстановления.",
    visitMinutes: [120, 240],
    detourKm: 6,
    sources: source("Vietnam Tourism — Nha Trang (Нячанг)", official.nhaTrang),
  },
  {
    id: "hon-mun",
    name: "Морская зона Hòn Mun (Хонмун)",
    category: "park",
    coordinates: [109.3049, 12.1667],
    whyWorthIt: "Охраняемый риф — лучший в бухте выбор для снорклинга в спокойную погоду.",
    visitMinutes: [300, 480],
    detourKm: 0,
    accessNote: "Добраться можно только на лодке; выбирайте действующего проверенного оператора.",
    seasonNote: "Отменяйте поездку при морских предупреждениях, сильной зыби или грозе.",
    sources: source(
      "Vietnam Tourism — острова Nha Trang (Нячанга)",
      "https://vietnam.travel/things-to-do/where-to-go-when-island-hopping-around-nha-trang",
    ),
  },
  {
    id: "dai-lanh",
    name: "Пляж Đại Lãnh (Дайлань)",
    category: "nature",
    coordinates: [109.369, 12.832],
    whyWorthIt:
      "Широкая бухта под перевалом — идеальная первая пауза после выезда из Nha Trang (Нячанга).",
    visitMinutes: [30, 75],
    detourKm: 1,
    sources: source("Vietnam Tourism — Phú Yên (Фуйен)", official.phuYen),
  },
  {
    id: "vung-ro",
    name: "Бухта Vũng Rô (Вунгро)",
    category: "history",
    coordinates: [109.4143, 12.8712],
    whyWorthIt:
      "Защищённая горами бухта, где рыбацкая жизнь соседствует с историей морского пути снабжения.",
    visitMinutes: [45, 90],
    detourKm: 12,
    sources: source("Vietnam Tourism — Phú Yên (Фуйен)", official.phuYen),
  },
  {
    id: "mui-dien",
    name: "Мыс Mũi Điện (Муйдьен) и пляж Bãi Môn (Баймон)",
    category: "nature",
    coordinates: [109.4491, 12.8939],
    whyWorthIt:
      "Лестница к маяку поднимается над уединённым пляжем у восточной оконечности Вьетнама.",
    visitMinutes: [90, 150],
    detourKm: 15,
    sources: source("Vietnam Tourism — Phú Yên (Фуйен)", official.phuYen),
  },
  {
    id: "ganh-da-dia",
    name: "Базальтовые скалы Gành Đá Đĩa (Ганьдадиа)",
    category: "nature",
    coordinates: [109.2938, 13.3542],
    whyWorthIt: "Сцепленные базальтовые колонны спускаются в море, словно тёмные каменные соты.",
    visitMinutes: [60, 90],
    detourKm: 12,
    sources: source("Vietnam Tourism — Phú Yên (Фуйен)", official.phuYen),
  },
  {
    id: "o-loan",
    name: "Лагуна Ô Loan (Олоан)",
    category: "nature",
    coordinates: [109.2514, 13.2686],
    whyWorthIt:
      "Мелководная прибрежная лагуна с широкими водными панорамами и свежими местными моллюсками.",
    visitMinutes: [45, 90],
    detourKm: 8,
    sources: source("Vietnam Tourism — Phú Yên (Фуйен)", official.phuYen),
  },
  {
    id: "ql1d-viewpoint",
    name: "Смотровые площадки на прибрежной QL1D",
    category: "viewpoint",
    coordinates: [109.245, 13.69],
    whyWorthIt:
      "Череда поворотов над обрывами и безопасных площадок с видом на море между Sông Cầu (Шонгкау) и Quy Nhơn (Куинёном).",
    visitMinutes: [15, 30],
    detourKm: 0,
    sources: source("Vietnam Tourism — Bình Định (Биньдинь)", official.binhDinh),
  },
  {
    id: "ghenh-rang",
    name: "Парк Ghềnh Ráng (Геньранг)",
    category: "nature",
    coordinates: [109.215, 13.744],
    whyWorthIt:
      "Парк на мысе над Quy Nhơn (Куинёном): каменистые бухты и широкий вид вдоль городского пляжа.",
    visitMinutes: [45, 75],
    detourKm: 4,
    sources: source("Vietnam Tourism — Bình Định (Биньдинь)", official.binhDinh),
  },
  {
    id: "twin-towers",
    name: "Башни Tháp Đôi (Тхапдой)",
    category: "history",
    coordinates: [109.2111, 13.7863],
    whyWorthIt:
      "Две богато украшенные тямские башни XI–XII веков сохранились среди современного Quy Nhơn (Куинёна).",
    visitMinutes: [30, 60],
    detourKm: 2,
    sources: source("Vietnam Tourism — Bình Định (Биньдинь)", official.binhDinh),
  },
  {
    id: "banh-it",
    name: "Тямские башни Bánh Ít (Баньит)",
    category: "history",
    coordinates: [109.1352, 13.8684],
    whyWorthIt: "Четыре разные тямские башни на вершине холма с широким видом в глубь страны.",
    visitMinutes: [60, 90],
    detourKm: 20,
    accessNote:
      "Это настоящий крюк: выбирайте башни вместо остановок на полуострове в десятый день.",
    sources: source("Vietnam Tourism — Bình Định (Биньдинь)", official.binhDinh),
  },
  {
    id: "eo-gio",
    name: "Бухта Eo Gió (Эозё)",
    category: "nature",
    coordinates: [109.295, 13.89],
    whyWorthIt:
      "Продуваемая ветром бухта и тропа над обрывом рядом с рыбацкой деревней Nhơn Lý (Нёнли).",
    visitMinutes: [60, 90],
    detourKm: 16,
    sources: source("Vietnam Tourism — Bình Định (Биньдинь)", official.binhDinh),
  },
  {
    id: "ong-nui",
    name: "Пагода Ông Núi (Онгнуй)",
    category: "culture",
    coordinates: [109.216, 14.061],
    whyWorthIt:
      "Буддийский комплекс на склоне и гигантская сидящая статуя над прибрежной равниной.",
    visitMinutes: [60, 90],
    detourKm: 4,
    sources: source("Vietnam Tourism — Bình Định (Биньдинь)", official.binhDinh),
  },
  {
    id: "sa-huynh",
    name: "Пляж Sa Huỳnh (Сахюинь)",
    category: "nature",
    coordinates: [109.058, 14.681],
    whyWorthIt:
      "Золотой песок, соляные промыслы и рыбацкая жизнь создают спокойное место для ночёвки у моря.",
    visitMinutes: [60, 120],
    detourKm: 0,
    sources: source("Национальное управление туризма Вьетнама", official.saHuynh),
  },
  {
    id: "go-co",
    name: "Деревня Gò Cỏ (Гоко)",
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
    name: "Пляж Mỹ Khê (Микхе), Quảng Ngãi (Куангнгай)",
    category: "nature",
    coordinates: [108.8953, 15.1906],
    whyWorthIt:
      "Длинная дуга пляжа среди рыбацких поселений к северо-востоку от Quảng Ngãi (Куангнгая).",
    visitMinutes: [30, 75],
    detourKm: 0,
    sources: source("Туристический портал Quảng Ngãi (Куангнгая)", official.quangNgai),
  },
  {
    id: "son-my",
    name: "Мемориал Sơn Mỹ (Шонми)",
    category: "history",
    coordinates: [108.8727, 15.178],
    whyWorthIt: "Мемориал и музей, сохраняющие память о трагедии в Mỹ Lai (Милай) 1968 года.",
    visitMinutes: [60, 90],
    detourKm: 4,
    accessNote: "Оставьте время для тишины: это не место для беглой фотопаузы.",
    sources: source("Туристический портал Quảng Ngãi (Куангнгая)", official.quangNgai),
  },
  {
    id: "ba-lang-an",
    name: "Мыс Bà Làng An (Баланган)",
    category: "nature",
    coordinates: [108.9439, 15.2353],
    whyWorthIt:
      "Мыс из вулканической породы с рыбацкими деревнями и открытым видом в сторону Lý Sơn (Лишона).",
    visitMinutes: [45, 90],
    detourKm: 8,
    sources: source("Туристический портал Quảng Ngãi (Куангнгая)", official.quangNgai),
  },
  {
    id: "thien-an",
    name: "Пагода Thiên Ấn (Тхиенан)",
    category: "culture",
    coordinates: [108.8219, 15.1501],
    whyWorthIt:
      "Историческая пагода на невысокой горе над рекой Trà Khúc (Чакхук) и равниной Quảng Ngãi (Куангнгая).",
    visitMinutes: [45, 75],
    detourKm: 7,
    sources: source("Туристический портал Quảng Ngãi (Куангнгая)", official.quangNgai),
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
