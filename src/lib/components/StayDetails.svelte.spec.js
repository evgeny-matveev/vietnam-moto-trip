import { page } from "vitest/browser";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-svelte";
import { resetExchangeRateCacheForTests } from "$lib/exchange-rates.js";
import StayDetails from "./StayDetails.svelte";

const stay = {
  id: "forest-house",
  name: "Forest House",
  category: "special",
  coordinates: [108.4, 12.1],
  pricePerPersonUsd: "$17–22",
  pricePerPersonVnd: "430–570k VND",
  setup: "A whole house for six.",
  why: "Everyone stays together with a mountain view.",
  caution: "Confirm all three bedrooms.",
  mapNote: "The host confirms the exact gate after booking.",
  url: "https://example.com/stay",
};

describe("StayDetails", () => {
  beforeEach(() => {
    sessionStorage.clear();
    resetExchangeRateCacheForTests();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: false, status: 503 })),
    );
  });

  afterEach(() => vi.unstubAllGlobals());

  it("renders the selected map stay and returns to the day", async () => {
    const onBack = vi.fn();
    render(StayDetails, { stay, onBack });

    await expect.element(page.getByRole("heading", { name: "Forest House" })).toBeVisible();
    await expect.element(page.getByText("A whole house for six.")).toBeVisible();
    await expect
      .element(page.getByText("$17–22 · 430–570k VND · ≈ 1 300–1 700 ₽ за человека / сутки"))
      .toBeVisible();
    await expect.element(page.getByText(/Confirm all three bedrooms/)).toBeVisible();
    await expect.element(page.getByText(/host confirms the exact gate/)).toBeVisible();
    await expect
      .element(page.getByText("сохранённому курсу ЦБ РФ", { exact: false }))
      .toBeVisible();
    await expect
      .element(page.getByRole("link", { name: "Открыть страницу отеля" }))
      .toHaveAttribute("href", "https://example.com/stay");

    await page.getByRole("button", { name: "К маршруту дня" }).click();
    expect(onBack).toHaveBeenCalledOnce();
  });

  it("labels a successfully loaded rate as current", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => ({ Date: "2026-07-17T11:30:00+03:00", Valute: { USD: { Value: 80 } } }),
      })),
    );

    render(StayDetails, { stay, onBack: vi.fn() });

    await expect.element(page.getByText("текущему курсу ЦБ РФ", { exact: false })).toBeVisible();
    await expect
      .element(page.getByText("$17–22 · 430–570k VND · ≈ 1 400–1 800 ₽ за человека / сутки"))
      .toBeVisible();
  });
});
