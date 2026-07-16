import { page } from "vitest/browser";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import DayDetails from "./DayDetails.svelte";

const hikingDay = {
  day: 6,
  title: "Đà Lạt hiking day",
  summary: "A day on foot.",
  roads: "No intercity riding",
  distance: "4–10 km walking",
  rideTime: "3–6 hr on foot",
  kind: "hike",
  stops: ["Primary: Lang Biang trail", "Shorter: Đa Phú hills"],
  note: "Choose after seeing the cloud.",
  sources: [{ label: "Lang Biang on AllTrails", url: "https://example.com/trail" }],
};

describe("DayDetails", () => {
  it("renders the selected day and its open-ended choices", async () => {
    render(DayDetails, { day: hikingDay });

    await expect.element(page.getByRole("heading", { name: "Đà Lạt hiking day" })).toBeVisible();
    await expect.element(page.getByText("Primary: Lang Biang trail")).toBeVisible();
    await expect
      .element(page.getByRole("link", { name: /Lang Biang on AllTrails/ }))
      .toHaveAttribute("href", "https://example.com/trail");
  });
});
