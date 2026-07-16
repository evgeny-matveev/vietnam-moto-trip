import { page } from "vitest/browser";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import CreatorResources from "./CreatorResources.svelte";

const resource = {
  platform: "YouTube",
  language: "Русский",
  title: "Дорога в Đà Lạt (Далат)",
  creator: "Путешественник",
  url: "https://www.youtube.com/watch?v=example",
  thumbnail: "/images/video-thumbnails/missing-example.jpg",
  note: "Личное впечатление, которое не заменяет актуальную дорожную информацию.",
};

describe("CreatorResources", () => {
  it("renders a complete, accessible preview card with a resilient image", async () => {
    render(CreatorResources, { resources: [resource] });

    const link = page.getByRole("link", {
      name: "Дорога в Đà Lạt (Далат) — Путешественник, открыть на YouTube",
    });
    await expect.element(link).toHaveAttribute("href", resource.url);
    await expect.element(page.getByText(resource.note)).toBeVisible();

    const image = link.element().querySelector("img");
    expect(image?.getAttribute("loading")).toBe("lazy");
    expect(image?.getAttribute("decoding")).toBe("async");
    expect(image?.getAttribute("width")).toBe("1280");
    expect(image?.getAttribute("height")).toBe("720");
  });
});
