const commons = (fileName) => ({
  label: "Wikimedia Commons",
  url: `https://commons.wikimedia.org/wiki/File:${fileName}`,
});

const localPhotos = (folder, descriptions, credits) =>
  descriptions.map((alt, index) => ({
    src: `/images/${folder}/${index + 1}.webp`,
    alt,
    credit: credits[index],
  }));

export const placePhotoManifest = {
  "nha-trang-beach": {
    photos: localPhotos(
      "places/nha-trang-beach",
      [
        "Песчаный пляж Nha Trang (Нячанга) и море",
        "Береговая линия пляжа Nha Trang (Нячанга)",
        "Люди играют в футбол на пляже Nha Trang (Нячанга)",
      ],
      [
        commons("Nha_Trang_Beach_10.jpg"),
        commons("Nha_Trang_Beach_7.jpg"),
        commons("Soccer_by_the_beach,_Nha_Trang,_Vietnam.jpg"),
      ],
    ),
  },
  "po-nagar": {
    photos: localPhotos(
      "places/po-nagar",
      [
        "Внутри тямских башен Po Nagar (Понагар)",
        "Тямские башни Po Nagar (Понагар)",
        "Фасад тямских башен Po Nagar (Понагар)",
      ],
      [
        commons("Inside_the_Po_Nagar_Cham_Towers_(14449703300).jpg"),
        commons("Po_Nagar_Cham_Towers.jpeg"),
        commons("Po_Nagar_Cham_Towers_façade_(14636082242).jpg"),
      ],
    ),
  },
  "long-son": {
    photos: localPhotos(
      "places/long-son",
      [
        "Пагода Long Sơn (Лонгшон)",
        "Ступа и двор пагоды Long Sơn (Лонгшон)",
        "Вид на пагоду Long Sơn (Лонгшон) в Nha Trang (Нячанге)",
      ],
      [
        commons("Long_Son_Pagoda_2.jpg"),
        commons("Long_Son_Pagoda_3.jpg"),
        commons("Nha_Trang,_Long_Son_pagoda.jpg"),
      ],
    ),
  },
  "hon-chong": {
    photos: localPhotos(
      "places/hon-chong",
      [
        "Камни мыса Hòn Chồng (Хончонг) у Nha Trang (Нячанга)",
        "Мыс Hòn Chồng (Хончонг), вид с пляжа Cô Tiên",
        "Мыс Hòn Chồng (Хончонг), вид с холма",
      ],
      [
        commons("2001-06-03_Hon-Chong_Nha-Trang.jpg"),
        commons("Hon_Chong_from_Co_Tien_beach.JPG"),
        commons("Hon_Chong_seen_from_the_hill.JPG"),
      ],
    ),
  },
};

export const activityPhotoManifest = {
  "vinwonders-nha-trang": {
    photos: localPhotos(
      "activities/vinwonders-nha-trang",
      [
        "VinWonders Nha Trang: вид на парк на острове Hòn Tre (Хонтре)",
        "VinWonders Nha Trang: тематическая зона Tata World",
        "VinWonders Nha Trang: аттракцион в парке",
      ],
      [
        { label: "VinWonders Nha Trang", url: "https://vinwonders.com/en/vinwonders-nha-trang/" },
        { label: "VinWonders Nha Trang", url: "https://vinwonders.com/en/vinwonders-nha-trang/" },
        { label: "VinWonders Nha Trang", url: "https://vinwonders.com/en/vinwonders-nha-trang/" },
      ],
    ),
  },
};

function externalPhotoFallback(record) {
  return {
    label: "Посмотреть фото в Google Images",
    url: `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(`${record.name} Vietnam`)}`,
  };
}

export function addPhotoMetadata(records, manifest) {
  return records.map((record) => {
    const entry = manifest[record.id];
    if (entry?.photos?.length === 3) return { ...record, photos: entry.photos };
    return { ...record, photos: [], photoFallback: externalPhotoFallback(record) };
  });
}
