import type { WheelSlice } from "../data/defaultWheel";

export type WheelMath = WheelSlice & {
  probability: number;
  probabilityPercent: string;
  expectedValue: number;
  houseEdge: number;
  houseEdgePercent: string;
};

export const normalizeStopCount = (stops: number) =>
  Number.isFinite(stops) ? Math.max(0, Math.floor(stops)) : 0;

export const getTotalStops = (wheel: WheelSlice[]) =>
  wheel.reduce((total, slice) => total + normalizeStopCount(slice.stops), 0);

export const toPercent = (value: number) => `${(value * 100).toFixed(2)}%`;

export const calculateWheelMath = (wheel: WheelSlice[]): WheelMath[] => {
  const totalStops = getTotalStops(wheel);

  return wheel.map((slice) => {
    const stops = normalizeStopCount(slice.stops);
    const probability = totalStops > 0 ? stops / totalStops : 0;
    // EV uses net profit payout: EV = probability * pays - (1 - probability).
    const expectedValue = probability * slice.pays - (1 - probability);
    // House edge is the negative EV, equivalent to 1 - probability * (pays + 1).
    const houseEdge = -expectedValue;

    return {
      ...slice,
      stops,
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
