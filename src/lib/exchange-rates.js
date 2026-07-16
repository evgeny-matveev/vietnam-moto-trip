export const exchangeRateUrl = "https://www.cbr-xml-daily.ru/daily_json.js";
export const exchangeRateAttributionUrl = "https://www.cbr-xml-daily.ru/";
export const fallbackRateSourceUrl = "https://www.cbr.ru/scripts/XML_daily.asp?date_req=16/07/2026";
export const fallbackUsdRubRate = 77.9568;
export const fallbackRateDate = "2026-07-16";

export const fallbackRateInfo = Object.freeze({
  rate: fallbackUsdRubRate,
  date: fallbackRateDate,
  source: "saved",
});

let rateRequest;
const sessionKey = "vietnam-moto-trip-usd-rub-rate";

export function parseUsdRange(label) {
  const match = /^\$([\d.,]+)\s*[–-]\s*\$?([\d.,]+)$/.exec(label?.trim() ?? "");
  if (!match) return null;

  const minimum = Number(match[1].replaceAll(",", ""));
  const maximum = Number(match[2].replaceAll(",", ""));
  if (!Number.isFinite(minimum) || !Number.isFinite(maximum)) return null;

  return { min: minimum, max: maximum };
}

export function roundRubles(value) {
  return Math.round(value / 100) * 100;
}

const rubleFormatter = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });

export function formatRubRange(usdLabel, rate) {
  const range = parseUsdRange(usdLabel);
  if (!range || !Number.isFinite(rate) || rate <= 0) return "—";

  const minimum = rubleFormatter.format(roundRubles(range.min * rate));
  const maximum = rubleFormatter.format(roundRubles(range.max * rate));
  return minimum === maximum ? `≈ ${minimum} ₽` : `≈ ${minimum}–${maximum} ₽`;
}

export function formatRateDate(date) {
  const parsed = new Date(`${date.slice(0, 10)}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

function validRateResponse(data) {
  const rate = data?.Valute?.USD?.Value;
  const date = data?.Date?.slice?.(0, 10);
  if (!Number.isFinite(rate) || rate <= 0 || !/^\d{4}-\d{2}-\d{2}$/.test(date ?? "")) return null;
  return { rate, date, source: "current" };
}

function savedSessionRate() {
  if (typeof sessionStorage === "undefined") return null;
  try {
    const value = JSON.parse(sessionStorage.getItem(sessionKey));
    if (
      Number.isFinite(value?.rate) &&
      value.rate > 0 &&
      /^\d{4}-\d{2}-\d{2}$/.test(value?.date ?? "") &&
      ["current", "saved"].includes(value?.source)
    ) {
      return value;
    }
  } catch {
    return null;
  }
  return null;
}

function saveSessionRate(value) {
  if (typeof sessionStorage === "undefined") return;
  try {
    sessionStorage.setItem(sessionKey, JSON.stringify(value));
  } catch {
    // The in-memory promise still prevents duplicate requests when storage is unavailable.
  }
}

export function loadUsdRubRate(fetcher = fetch) {
  if (!rateRequest) {
    const storedRate = savedSessionRate();
    rateRequest = storedRate
      ? Promise.resolve(storedRate)
      : Promise.resolve()
          .then(() => fetcher(exchangeRateUrl))
          .then((response) => {
            if (!response.ok) throw new Error(`Exchange-rate request failed: ${response.status}`);
            return response.json();
          })
          .then((data) => validRateResponse(data) ?? fallbackRateInfo)
          .catch(() => fallbackRateInfo)
          .then((value) => {
            saveSessionRate(value);
            return value;
          });
  }

  return rateRequest;
}

export function resetExchangeRateCacheForTests() {
  rateRequest = undefined;
}
