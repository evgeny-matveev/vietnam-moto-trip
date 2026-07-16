import { page } from "vitest/browser";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-svelte";
import ThemeToggle from "./ThemeToggle.svelte";

describe("ThemeToggle", () => {
  let systemIsDark;
  let onSystemThemeChange;

  beforeEach(() => {
    systemIsDark = false;
    onSystemThemeChange = undefined;
    vi.stubGlobal("matchMedia", () => ({
      get matches() {
        return systemIsDark;
      },
      addEventListener: (_event, callback) => {
        onSystemThemeChange = callback;
      },
      removeEventListener: vi.fn(),
    }));
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "";
  });

  it("switches the document theme and remembers the choice", async () => {
    render(ThemeToggle);

    const toggle = page.getByRole("button", { name: "Включить ночную тему" });
    await toggle.click();

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
    await expect.element(page.getByRole("button", { name: "Включить дневную тему" })).toBeVisible();
  });

  it("restores a saved night theme", async () => {
    localStorage.setItem("theme", "dark");
    render(ThemeToggle);

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    await expect.element(page.getByRole("button", { name: "Включить дневную тему" })).toBeVisible();
  });

  it("uses and follows the system theme until a manual choice is saved", async () => {
    systemIsDark = true;
    render(ThemeToggle);

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBeNull();

    systemIsDark = false;
    onSystemThemeChange({ matches: false });
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
