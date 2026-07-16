import { staysByDay } from "./stays.js";

export const budgetAssumptions = {
  lastReviewed: "16 July 2026",
  people: 6,
  scootersPerPerson: 1,
  routeDistanceKm: 1750,
  localDistanceAllowance: 0.1,
  fuelLitresPer100Km: 2.3,
  planningFuelPriceVndPerLitre: 25_000,
  mealRangeVndPerDay: { min: 350_000, max: 500_000 },
  tripDays: 12,
  routineExpenseRangeVnd: { min: 800_000, max: 1_200_000 },
  contingencyRate: 0.1,
  usdRateVnd: 26_500,
  baselineStayCategory: "regular",
  baselineStayDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
};

export const budgetExclusions = [
  "Scooter purchase or rental",
  "Pre-trip servicing, tyres and repairs",
  "Riding gear and luggage",
  "Insurance and travel to or from Đà Nẵng",
  "Alcohol, shopping and personal purchases",
  "Optional activities and the optional Day 12 hotel",
];

function addRanges(...ranges) {
  return ranges.reduce(
    (total, range) => ({ min: total.min + range.min, max: total.max + range.max }),
    { min: 0, max: 0 },
  );
}

function roundTo(value, interval) {
  return Math.round(value / interval) * interval;
}

function baselineStayForDay(day) {
  return staysByDay[day].stays.find(
    (stay) => stay.category === budgetAssumptions.baselineStayCategory,
  );
}

export function calculateRoadBudget() {
  const plannedDistanceKm =
    budgetAssumptions.routeDistanceKm * (1 + budgetAssumptions.localDistanceAllowance);
  const fuelLitres = (plannedDistanceKm * budgetAssumptions.fuelLitresPer100Km) / 100;
  const fuelVnd = roundTo(fuelLitres * budgetAssumptions.planningFuelPriceVndPerLitre, 50_000);
  const fuelRangeVnd = { min: fuelVnd, max: fuelVnd };
  const mealRangeVnd = {
    min: budgetAssumptions.mealRangeVndPerDay.min * budgetAssumptions.tripDays,
    max: budgetAssumptions.mealRangeVndPerDay.max * budgetAssumptions.tripDays,
  };
  const stayRangeVnd = addRanges(
    ...budgetAssumptions.baselineStayDays.map((day) => baselineStayForDay(day).priceRangeVnd),
  );
  const subtotalRangeVnd = addRanges(
    fuelRangeVnd,
    mealRangeVnd,
    stayRangeVnd,
    budgetAssumptions.routineExpenseRangeVnd,
  );
  const contingencyRangeVnd = {
    min: roundTo(subtotalRangeVnd.min * budgetAssumptions.contingencyRate, 50_000),
    max: roundTo(subtotalRangeVnd.max * budgetAssumptions.contingencyRate, 50_000),
  };
  const totalRangeVnd = addRanges(subtotalRangeVnd, contingencyRangeVnd);
  const workingTargetVnd = roundTo((totalRangeVnd.min + totalRangeVnd.max) / 2, 1_000_000);

  return {
    plannedDistanceKm,
    fuelLitres,
    fuelRangeVnd,
    mealRangeVnd,
    stayRangeVnd,
    routineExpenseRangeVnd: budgetAssumptions.routineExpenseRangeVnd,
    contingencyRangeVnd,
    totalRangeVnd,
    workingTargetVnd,
    workingTargetUsd: Math.round(workingTargetVnd / budgetAssumptions.usdRateVnd),
  };
}

export const roadBudget = calculateRoadBudget();

export function formatVnd(value) {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `${Number.isInteger(millions) ? millions : millions.toFixed(1)}m VND`;
  }
  return `${Math.round(value / 1_000)}k VND`;
}

export function formatVndRange(range) {
  return range.min === range.max
    ? formatVnd(range.min)
    : `${formatVnd(range.min).replace(" VND", "")}–${formatVnd(range.max)}`;
}

export function stayDifferenceFromRegular(day, stay) {
  const baseline = baselineStayForDay(day).priceRangeVnd;
  return {
    min: stay.priceRangeVnd.min - baseline.min,
    max: stay.priceRangeVnd.max - baseline.max,
  };
}
