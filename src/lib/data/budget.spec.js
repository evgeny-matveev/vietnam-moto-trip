import { describe, expect, it } from "vitest";
import {
  budgetAssumptions,
  budgetExclusions,
  calculateRoadBudget,
  formatVnd,
  formatVndRange,
  roadBudget,
  stayDifferenceFromRegular,
} from "./budget.js";
import { staysByDay } from "./stays.js";

describe("the on-road budget", () => {
  it("uses the agreed route and one-scooter-per-person assumptions", () => {
    expect(budgetAssumptions).toMatchObject({
      people: 6,
      scootersPerPerson: 1,
      routeDistanceKm: 1750,
      localDistanceAllowance: 0.1,
      fuelLitresPer100Km: 2.3,
      planningFuelPriceVndPerLitre: 25_000,
      tripDays: 12,
      contingencyRate: 0.1,
      usdRateVnd: 26_500,
      baselineStayCategory: "regular",
    });
    expect(budgetAssumptions.baselineStayDays).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    expect(budgetAssumptions.baselineStayDays).not.toContain(12);
  });

  it("parses every displayed stay price into a numeric VND range", () => {
    for (const stayPlan of Object.values(staysByDay)) {
      for (const stay of stayPlan.stays) {
        expect(stay.priceRangeVnd.min, stay.name).toBeGreaterThan(100_000);
        expect(stay.priceRangeVnd.max, stay.name).toBeGreaterThanOrEqual(stay.priceRangeVnd.min);
      }
    }

    expect(staysByDay[5].stays[1].priceRangeVnd).toEqual({
      min: 1_320_000,
      max: 2_070_000,
    });
    expect(staysByDay[9].stays[1].priceRangeVnd).toEqual({
      min: 7_000_000,
      max: 10_500_000,
    });
  });

  it("keeps every original USD and VND accommodation label unchanged", () => {
    const labels = Object.values(staysByDay).flatMap((plan) =>
      plan.stays.map((stay) => [stay.pricePerPersonUsd, stay.pricePerPersonVnd]),
    );

    expect(labels).toEqual([
      ["$15–22", "400–570k VND"],
      ["$16–25", "420–650k VND"],
      ["$8–13", "200–330k VND"],
      ["$12–17", "300–430k VND"],
      ["$14–20", "370–530k VND"],
      ["$8–14", "220–370k VND"],
      ["$5–8", "130–200k VND"],
      ["$20–30", "530–780k VND"],
      ["$9–14", "230–370k VND"],
      ["$23–45", "600k–1.18m VND"],
      ["$43–63", "1.12–1.67m VND"],
      ["$6–9", "150–230k VND"],
      ["$13–23", "350–620k VND"],
      ["$50–78", "1.32–2.07m VND"],
      ["$8–11", "200–280k VND"],
      ["$13–23", "350–620k VND"],
      ["$50–78", "1.32–2.07m VND"],
      ["$8–11", "200–280k VND"],
      ["$13–22", "350–570k VND"],
      ["$83–117", "2.2–3.07m VND"],
      ["$17–23", "430–620k VND"],
      ["$13–22", "350–570k VND"],
      ["$83–117", "2.2–3.07m VND"],
      ["$17–23", "430–620k VND"],
      ["$15–25", "400–650k VND"],
      ["$267–400", "7–10.5m VND"],
      ["$9–16", "230–420k VND"],
      ["$6–9", "150–230k VND"],
      ["$13–20", "330–530k VND"],
      ["$4–8", "120–200k VND"],
      ["$8–11", "200–280k VND"],
      ["$21–28", "550–750k VND"],
      ["$18–24", "470–630k VND"],
      ["$67–108", "1.75–2.85m VND"],
      ["$125–167", "3.28–4.38m VND"],
      ["$38–50", "1.0–1.32m VND"],
    ]);
  });

  it("calculates the baseline from eleven regular stays and the documented formulas", () => {
    expect(calculateRoadBudget()).toEqual(roadBudget);
    expect(roadBudget.plannedDistanceKm).toBeCloseTo(1925);
    expect(roadBudget.fuelLitres).toBeCloseTo(44.275);
    expect(roadBudget.fuelRangeVnd).toEqual({ min: 1_100_000, max: 1_100_000 });
    expect(roadBudget.mealRangeVnd).toEqual({ min: 4_200_000, max: 6_000_000 });
    expect(roadBudget.stayRangeVnd).toEqual({ min: 2_880_000, max: 4_350_000 });
    expect(roadBudget.contingencyRangeVnd).toEqual({ min: 900_000, max: 1_250_000 });
    expect(roadBudget.totalRangeVnd).toEqual({ min: 9_880_000, max: 13_900_000 });
    expect(roadBudget.workingTargetVnd).toBe(12_000_000);
    expect(roadBudget.workingTargetUsd).toBe(453);
  });

  it("formats guide figures and calculates stay-choice differences", () => {
    expect(formatVnd(roadBudget.workingTargetVnd)).toBe("12m VND");
    expect(formatVndRange(roadBudget.totalRangeVnd)).toBe("9.9m–13.9m VND");

    const day4Special = staysByDay[4].stays[0];
    expect(stayDifferenceFromRegular(4, day4Special)).toEqual({
      min: 450_000,
      max: 950_000,
    });
  });

  it("keeps prepaid equipment and transport outside the road baseline", () => {
    expect(budgetExclusions).toContain("Покупка или аренда байка");
    expect(budgetExclusions).toContain("Обслуживание перед поездкой, шины и ремонт");
    expect(budgetExclusions).toContain("Страховка и дорога в Дананг (Đà Nẵng) или обратно");
    expect(budgetExclusions).toContain(
      "Дополнительные занятия и необязательный отель после двенадцатого дня",
    );
  });
});
