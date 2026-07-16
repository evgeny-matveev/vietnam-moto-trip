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
    expect(budgetExclusions).toContain("Scooter purchase or rental");
    expect(budgetExclusions).toContain("Pre-trip servicing, tyres and repairs");
    expect(budgetExclusions).toContain("Insurance and travel to or from Đà Nẵng");
    expect(budgetExclusions).toContain("Optional activities and the optional Day 12 hotel");
  });
});
