import { page } from "vitest/browser";
import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-svelte";
import PlacePreviewList from "./PlacePreviewList.svelte";

const place = {
  id: "preview-place",
  name: "Preview place",
  category: "nature",
  visitMinutes: [30, 60],
  detourKm: 4,
  photos: [
    {
      src: "/images/places/nha-trang-beach/1.webp",
      alt: "Preview place photo 1",
      credit: { label: "Photo source", url: "https://example.com/photo-1" },
    },
    {
      src: "/images/places/nha-trang-beach/2.webp",
      alt: "Preview place photo 2",
      credit: { label: "Photo source", url: "https://example.com/photo-2" },
    },
    {
      src: "/images/places/nha-trang-beach/3.webp",
      alt: "Preview place photo 3",
      credit: { label: "Photo source", url: "https://example.com/photo-3" },
    },
  ],
};

describe("PlacePreviewList", () => {
  it("keeps photo and place-detail actions separate", async () => {
    const onSelectPlace = vi.fn();
    render(PlacePreviewList, { places: [place], onSelectPlace });

    await expect.element(page.getByText("30–60 мин · крюк 4 км")).toBeVisible();
    await page.getByRole("button", { name: "Показать фото: Preview place" }).click();
    await expect
      .element(page.getByRole("dialog").getByRole("img", { name: "Preview place photo 1" }))
      .toBeVisible();
    await page.getByRole("dialog").getByRole("button", { name: "Закрыть галерею" }).click();
    expect(onSelectPlace).not.toHaveBeenCalled();

    await page.getByRole("button", { name: "Открыть место" }).click();
    expect(onSelectPlace).toHaveBeenCalledWith("preview-place");
  });
});
