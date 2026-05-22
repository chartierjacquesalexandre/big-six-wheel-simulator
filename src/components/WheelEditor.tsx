import { RotateCcw } from "lucide-react";
import type { WheelSlice } from "../data/defaultWheel";
import { getTotalStops } from "../utils/probability";

type Props = {
  wheel: WheelSlice[];
  onChange: (wheel: WheelSlice[]) => void;
  onRestore: () => void;
};

export function WheelEditor({ wheel, onChange, onRestore }: Props) {
  const updateSlice = (id: string, patch: Partial<WheelSlice>) => {
    onChange(wheel.map((slice) => (slice.id === id ? { ...slice, ...patch } : slice)));
  };

  return (
    <section className="panel">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Optional configuration</p>
          <h2 className="section-title">Edit wheel</h2>
        </div>
        <button className="secondary-button" onClick={onRestore}>
          <RotateCcw className="h-4 w-4" />
          Restore defaults
        </button>
      </div>
      <p className="mt-3 text-sm text-slate-300">
        Changes recalculate total stops, probability, house edge, and spin weighting automatically.
      </p>
      <div className="mt-5 space-y-3">
        {wheel.map((slice) => (
          <div className="editor-row" key={slice.id}>
            <input
              className="field"
              value={slice.label}
              aria-label={`${slice.label} label`}
              onChange={(event) => updateSlice(slice.id, { label: event.target.value })}
            />
            <input
              className="field"
              min={0}
              type="number"
              value={slice.pays}
              aria-label={`${slice.label} payout`}
              onChange={(event) => updateSlice(slice.id, { pays: Number(event.target.value) })}
            />
            <input
              className="field"
              min={0}
              type="number"
              value={slice.stops}
              aria-label={`${slice.label} stops`}
              onChange={(event) => updateSlice(slice.id, { stops: Number(event.target.value) })}
            />
            <input
              className="h-11 w-full rounded-xl border border-white/10 bg-white/10 p-1"
              type="color"
              value={slice.color}
              aria-label={`${slice.label} color`}
              onChange={(event) => updateSlice(slice.id, { color: event.target.value })}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
        Current total stops: <strong className="text-amber-300">{getTotalStops(wheel)}</strong>
      </div>
    </section>
  );
}
