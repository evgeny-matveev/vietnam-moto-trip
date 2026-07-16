import { page } from "vitest/browser";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-svelte";
import { resetExchangeRateCacheForTests } from "$lib/exchange-rates.js";
import DayDetails from "./DayDetails.svelte";

const hikingDay = {
  day: 6,
  title: "Đà Lạt hiking day",
  summary: "A day on foot.",
  roads: "No intercity riding",
  distance: "4–10 km walking",
  rideTime: "3–6 hr on foot",
  kind: "hike",
  activities: [
    {
      id: "test-rafting",
      kind: "rafting",
      symbol: "🛶︎",
      name: "Canyoning or white-water rafting",
      time: "Full day",
      detour: "operator transfer from Đà Lạt",
      summary: "A guide-led high-energy alternative to hiking.",
      condition: "Choose one and replace the mountain hike when conditions are safe.",
      sources: [{ label: "Operator details", url: "https://example.com/activity" }],
    },
  ],
  stops: ["Primary: Lang Biang trail", "Shorter: Đa Phú hills"],
  note: "Choose after seeing the cloud.",
  stayPlan: {
    location: "Đà Lạt",
    note: "Book once for two nights.",
    stays: [
      {
        id: "forest-house",
        category: "special",
        name: "Forest House",
        coordinates: [108.4, 12.1],
        pricePerPersonUsd: "$17–22",
        pricePerPersonVnd: "430–570k VND",
        setup: "A whole house for six.",
        why: "Everyone stays together with a mountain view.",
        caution: "Confirm all three bedrooms.",
        photos: [
          "/images/stays/an-nhien-farmstay-resort-full-house/1.webp",
          "/images/stays/an-nhien-farmstay-resort-full-house/2.webp",
          "/images/stays/an-nhien-farmstay-resort-full-house/3.webp",
          "/images/stays/an-nhien-farmstay-resort-full-house/4.webp",
        ],
        url: "https://example.com/stay",
      },
    ],
  },
  sources: [{ label: "Lang Biang on AllTrails", url: "https://example.com/trail" }],
};

describe("DayDetails", () => {
  beforeEach(() => {
    sessionStorage.clear();
    resetExchangeRateCacheForTests();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: false, status: 503 })),
    );
  });

  afterEach(() => vi.unstubAllGlobals());

  it("renders the selected day and its open-ended choices", async () => {
    render(DayDetails, { day: hikingDay });

    await expect.element(page.getByRole("heading", { name: "Đà Lạt hiking day" })).toBeVisible();
    await expect.element(page.getByText("Primary: Lang Biang trail")).toBeVisible();
    await expect
      .element(page.getByRole("link", { name: /Lang Biang on AllTrails/ }))
      .toHaveAttribute("href", "https://example.com/trail");
  });

  it("shows group stay pricing, room setup and booking cautions", async () => {
    const onSelectStay = vi.fn();
    render(DayDetails, { day: hikingDay, onSelectStay });

    await expect
      .element(page.getByRole("heading", { name: "Где остановиться в Đà Lạt" }))
      .toBeVisible();
    await expect
      .element(page.getByText("Ориентировочная стоимость за человека", { exact: false }))
      .toBeVisible();
    await expect.element(page.getByText("$17–22")).toBeVisible();
    await expect.element(page.getByText("≈ 1 300–1 700 ₽")).toBeVisible();
    await expect.element(page.getByText("A whole house for six.")).toBeVisible();
    await expect
      .element(page.getByRole("img", { name: "Forest House: фото 1" }))
      .toHaveAttribute("loading", "lazy");
    await expect.element(page.getByRole("img", { name: "Forest House: фото 4" })).toBeVisible();
    await expect
      .element(page.getByRole("link", { name: "Открыть страницу отеля" }))
      .toHaveAttribute("href", "https://example.com/stay");

    await page.getByRole("button", { name: "Открыть карточку Forest House" }).click();
    expect(onSelectStay).toHaveBeenCalledWith("forest-house");
  });

  it("shows optional activities as alternatives with practical limits", async () => {
    render(DayDetails, { day: hikingDay });

    await expect
      .element(page.getByRole("heading", { name: "Дополнительные занятия" }))
      .toBeVisible();
    await expect
      .element(page.getByRole("heading", { name: "Canyoning or white-water rafting" }))
      .toBeVisible();
    await expect.element(page.getByText("Full day · operator transfer from Đà Lạt")).toBeVisible();
    await expect.element(page.getByText(/replace the mountain hike/)).toBeVisible();
    await expect
      .element(page.getByRole("link", { name: /Operator details/ }))
      .toHaveAttribute("href", "https://example.com/activity");
  });
});
