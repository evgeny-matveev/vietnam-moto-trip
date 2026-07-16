import { page } from "vitest/browser";
import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-svelte";
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
  it("renders the selected map stay and returns to the day", async () => {
    const onBack = vi.fn();
    render(StayDetails, { stay, onBack });

    await expect.element(page.getByRole("heading", { name: "Forest House" })).toBeVisible();
    await expect.element(page.getByText("A whole house for six.")).toBeVisible();
    await expect.element(page.getByText("$17–22 · 430–570k VND per person / night")).toBeVisible();
    await expect.element(page.getByText(/Confirm all three bedrooms/)).toBeVisible();
    await expect.element(page.getByText(/host confirms the exact gate/)).toBeVisible();
    await expect
      .element(page.getByRole("link", { name: "View property" }))
      .toHaveAttribute("href", "https://example.com/stay");

    await page.getByRole("button", { name: "Back to day details" }).click();
    expect(onBack).toHaveBeenCalledOnce();
  });
});
