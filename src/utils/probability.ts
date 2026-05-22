import type { WheelSlice } from "../data/defaultWheel";

export type WheelMath = WheelSlice & {
  probability: number;
  probabilityPercent: string;
  expectedValue: number;
  houseEdge: number;
  houseEdgePercent: string;
};

export const getTotalStops = (wheel: WheelSlice[]) =>
  wheel.reduce((total, slice) => total + Math.max(0, slice.stops), 0);

export const toPercent = (value: number) => `${(value * 100).toFixed(2)}%`;

export const calculateWheelMath = (wheel: WheelSlice[]): WheelMath[] => {
  const totalStops = getTotalStops(wheel);

  return wheel.map((slice) => {
    const probability = totalStops > 0 ? slice.stops / totalStops : 0;
    // EV uses net profit payout: EV = probability * pays - (1 - probability).
    const expectedValue = probability * slice.pays - (1 - probability);
    // House edge is the negative EV, equivalent to 1 - probability * (pays + 1).
    const houseEdge = -expectedValue;

    return {
      ...slice,
      probability,
      probabilityPercent: toPercent(probability),
      expectedValue,
      houseEdge,
      houseEdgePercent: toPercent(houseEdge),
    };
  });
};

export const findWorstHouseEdgeId = (wheel: WheelSlice[]) => {
  const rows = calculateWheelMath(wheel);
  return rows.reduce((worst, row) => (row.houseEdge > worst.houseEdge ? row : worst), rows[0])
    ?.id;
};
