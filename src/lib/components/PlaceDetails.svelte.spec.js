import { page } from "vitest/browser";
import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-svelte";
import PlaceDetails from "./PlaceDetails.svelte";

const place = {
  id: "hon-mun",
  name: "Hòn Mun",
  category: "park",
  coordinates: [109.297, 12.168],
  whyWorthIt: "A protected marine area used for a conditions-dependent snorkelling day.",
  visitMinutes: [240, 360],
  detourKm: 0,
  accessNote: "Use an established operator.",
  seasonNote: "Cancel when marine warnings make the bay unsuitable.",
  sources: [{ label: "Official Nha Trang guide", url: "https://vietnam.travel/example" }],
};

describe("PlaceDetails", () => {
  it("renders practical place details, season guidance and its source", async () => {
    const onBack = vi.fn();
    render(PlaceDetails, { place, onBack });

    await expect.element(page.getByRole("heading", { name: "Hòn Mun" })).toBeVisible();
    await expect.element(page.getByText("4–6 ч").first()).toBeVisible();
    await expect.element(page.getByText(/Cancel when marine warnings/)).toBeVisible();
    await expect
      .element(page.getByRole("link", { name: /Official Nha Trang guide/ }))
      .toHaveAttribute("href", "https://vietnam.travel/example");

    await page.getByRole("button", { name: /К маршруту дня/ }).click();
    expect(onBack).toHaveBeenCalledOnce();
  });
});
