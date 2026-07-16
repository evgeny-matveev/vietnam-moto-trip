import { afterEach, describe, expect, it, vi } from "vitest";
import {
  exchangeRateUrl,
  fallbackRateInfo,
  formatRateDate,
  formatRubRange,
  loadUsdRubRate,
  parseUsdRange,
  resetExchangeRateCacheForTests,
  roundRubles,
} from "./exchange-rates.js";

afterEach(() => resetExchangeRateCacheForTests());

describe("USD/RUB exchange rates", () => {
  it("parses the stored USD ranges and formats rounded Russian estimates", () => {
    expect(parseUsdRange("$13–23")).toEqual({ min: 13, max: 23 });
    expect(parseUsdRange("$267-400")).toEqual({ min: 267, max: 400 });
    expect(parseUsdRange("13–23 USD")).toBeNull();
    expect(roundRubles(1_049)).toBe(1_000);
    expect(roundRubles(1_050)).toBe(1_100);
    expect(formatRubRange("$13–23", 77.9568)).toBe("≈ 1 000–1 800 ₽");
    expect(formatRateDate("2026-07-16")).toBe("16 июля 2026 г.");
  });

  it("loads a valid current rate once and shares the request", async () => {
    const fetcher = vi.fn(async (url) => ({
      ok: true,
      json: async () => ({ Date: "2026-07-17T11:30:00+03:00", Valute: { USD: { Value: 78.4 } } }),
      url,
    }));

    const first = loadUsdRubRate(fetcher);
    const second = loadUsdRubRate(fetcher);

    expect(first).toBe(second);
    await expect(first).resolves.toEqual({ rate: 78.4, date: "2026-07-17", source: "current" });
    expect(fetcher).toHaveBeenCalledOnce();
    expect(fetcher).toHaveBeenCalledWith(exchangeRateUrl);
  });

  it.each([
    ["network failure", async () => Promise.reject(new Error("offline"))],
    ["invalid response", async () => ({ ok: true, json: async () => ({ Valute: {} }) })],
    ["HTTP failure", async () => ({ ok: false, status: 503 })],
  ])("uses the dated saved rate after %s", async (_label, fetcher) => {
    await expect(loadUsdRubRate(fetcher)).resolves.toBe(fallbackRateInfo);
    expect(fallbackRateInfo).toEqual({ rate: 77.9568, date: "2026-07-16", source: "saved" });
  });
});
