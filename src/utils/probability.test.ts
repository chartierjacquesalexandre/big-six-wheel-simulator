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
