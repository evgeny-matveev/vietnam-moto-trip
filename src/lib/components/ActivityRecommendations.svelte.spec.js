import { page } from "vitest/browser";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import ActivityRecommendations from "./ActivityRecommendations.svelte";

const photos = [
  {
    src: "/images/activities/vinwonders-nha-trang/1.webp",
    alt: "Activity photo 1",
    credit: { label: "Official gallery", url: "https://example.com/photo-1" },
  },
  {
    src: "/images/activities/vinwonders-nha-trang/2.webp",
    alt: "Activity photo 2",
    credit: { label: "Official gallery", url: "https://example.com/photo-2" },
  },
  {
    src: "/images/activities/vinwonders-nha-trang/3.webp",
    alt: "Activity photo 3",
    credit: { label: "Official gallery", url: "https://example.com/photo-3" },
  },
];

describe("ActivityRecommendations", () => {
  it("shows a lead image and opens an accessible photo gallery", async () => {
    render(ActivityRecommendations, {
      activities: [
        {
          id: "test-activity",
          symbol: "🛶︎",
          name: "Test river activity",
          time: "2 ч",
          detour: "у реки",
          summary: "A guided river experience.",
          condition: "Check the weather.",
          sources: [{ label: "Operator", url: "https://example.com/activity" }],
          photos,
        },
      ],
    });

    const trigger = page.getByRole("button", { name: "Показать фото: Test river activity" });
    await expect.element(page.getByRole("img", { name: "Activity photo 1" })).toHaveAttribute("loading", "lazy");
    await trigger.click();

    const dialog = page.getByRole("dialog");
    await expect.element(dialog).toBeVisible();
    await expect.element(dialog.getByRole("img", { name: "Activity photo 1" })).toBeVisible();
    await expect
      .element(dialog.getByRole("link", { name: /Источник фото: Official gallery/ }))
      .toHaveAttribute("href", "https://example.com/photo-1");

		await dialog.getByRole("button", { name: "Следующее фото" }).click();
		await expect.element(dialog.getByRole("img", { name: "Activity photo 2" })).toBeVisible();
		await dialog.press("ArrowRight");
		await expect.element(dialog.getByRole("img", { name: "Activity photo 3" })).toBeVisible();
		await dialog.press("Escape");
    await expect.element(dialog).not.toBeVisible();
    await expect.element(trigger).toHaveFocus();
  });

  it("makes the external preview fallback explicit when an exact local gallery is unavailable", async () => {
    render(ActivityRecommendations, {
      activities: [
        {
          id: "fallback-activity",
          symbol: "♨︎",
          name: "Fallback activity",
          time: "1 ч",
          detour: "рядом",
          summary: "A contingent activity.",
          condition: "Confirm on arrival.",
          sources: [{ label: "Operator", url: "https://example.com/activity" }],
          photos: [],
          photoFallback: {
            label: "Посмотреть фото в Google Images",
            url: "https://example.com/photos",
          },
        },
      ],
    });

    await expect
      .element(page.getByRole("link", { name: "Посмотреть фото в Google Images" }))
      .toHaveAttribute("href", "https://example.com/photos");
  });
});
