import { describe, expect, it } from "vitest";
import { defaultWheel, defaultWheelStopOrder } from "../data/defaultWheel";
import { buildStopArray, selectWeightedResult } from "./spinWheel";
import { calculateWheelMath, getTotalStops } from "./probability";

describe("probability utilities", () => {
  it("calculates total stops", () => {
    expect(getTotalStops(defaultWheel)).toBe(54);
  });

  it("calculates the known 6 house edge", () => {
    const six = calculateWheelMath(defaultWheel).find((row) => row.label === "6");
    expect(six?.probabilityPercent).toBe("12.96%");
    expect(six?.houseEdgePercent).toBe("9.26%");
  });

  it("builds weighted stops from stop counts", () => {
    const stops = buildStopArray(defaultWheel);
    expect(stops).toHaveLength(54);
    expect(stops.filter((stop) => stop.label === "1")).toHaveLength(26);
  });

  it("normalizes edited stop counts before calculating odds and spin stops", () => {
    const editedWheel = [
      { id: "one", label: "1", pays: 1, stops: 2.8, color: "#58b947" },
      { id: "three", label: "3", pays: 3, stops: -4, color: "#12b8c9" },
      { id: "six", label: "6", pays: 6, stops: Number.NaN, color: "#f1cf2d" },
    ];

    expect(getTotalStops(editedWheel)).toBe(2);
    expect(calculateWheelMath(editedWheel).map((row) => row.stops)).toEqual([2, 0, 0]);
    expect(buildStopArray(editedWheel)).toHaveLength(2);
  });

  it("selects a deterministic weighted result", () => {
    expect(selectWeightedResult(defaultWheel, undefined, () => 0).label).toBe("1");
    expect(selectWeightedResult(defaultWheel, undefined, () => 0.99).label).toBe("Joker");
  });

  it("uses the photographed stop order for the default visual wheel", () => {
    const stops = buildStopArray(defaultWheel, defaultWheelStopOrder);
    expect(stops).toHaveLength(54);
    expect(stops.slice(0, 9).map((stop) => stop.label)).toEqual([
      "25",
      "1",
      "3",
      "1",
      "6",
      "1",
      "12",
      "1",
      "3",
    ]);
    expect(stops.filter((stop) => stop.label === "1")).toHaveLength(26);
    expect(stops[0].label).toBe("25");
    expect(stops[27].label).toBe("25");
    expect(stops[13].label).toBe("Flag");
    expect(stops[40].label).toBe("Joker");
  });
});
