import type { WheelSlice } from "../data/defaultWheel";

export type WheelStop = WheelSlice & {
  stopIndex: number;
  globalIndex: number;
};

export const buildStopArray = (wheel: WheelSlice[], stopOrder?: string[]): WheelStop[] => {
  const byId = new Map(wheel.map((slice) => [slice.id, slice]));
  const validOrder = stopOrder?.filter((id) => byId.has(id));

  if (validOrder?.length) {
    const counts: Record<string, number> = {};
    return validOrder.map((id, globalIndex) => {
      counts[id] = (counts[id] ?? 0) + 1;
      return {
        ...byId.get(id)!,
        stopIndex: counts[id] - 1,
        globalIndex,
      };
    });
  }

  return wheel.flatMap((slice) =>
    Array.from({ length: Math.max(0, slice.stops) }, (_, index) => ({
      ...slice,
      stopIndex: index,
      globalIndex: 0,
    })),
  ).map((stop, globalIndex) => ({ ...stop, globalIndex }));
};

export const selectWeightedResult = (
  wheel: WheelSlice[],
  stopOrder?: string[],
  random: () => number = Math.random,
): WheelStop => {
  const stops = buildStopArray(wheel, stopOrder);

  if (stops.length === 0) {
    throw new Error("Cannot spin a wheel with zero stops.");
  }

  const index = Math.floor(random() * stops.length);
  return stops[Math.min(index, stops.length - 1)];
};

export const getStopAngle = (stopIndex: number, totalStops: number) =>
  totalStops > 0 ? (360 / totalStops) * stopIndex : 0;
