import type { WheelSlice } from "../data/defaultWheel";
import { calculateWheelMath, toPercent } from "../utils/probability";
import type { WheelStop } from "../utils/spinWheel";

type Props = {
  wheel: WheelSlice[];
  results: WheelStop[];
};

export function OutcomeAnalysis({ wheel, results }: Props) {
  const sample = results.slice(0, 100);
  const mathRows = calculateWheelMath(wheel);

  return (
    <section className="analysis-panel">
      <div className="analysis-heading">
        <div>
          <p className="eyebrow">Last 100 spins</p>
          <h2 className="section-title">Outcome gap</h2>
        </div>
        <span>{sample.length}/100</span>
      </div>

      <div className="analysis-list">
        {mathRows.map((row) => {
          const count = sample.filter((result) => result.id === row.id).length;
          const actual = sample.length > 0 ? count / sample.length : 0;
          const gap = actual - row.probability;
          const gapLabel = `${gap >= 0 ? "+" : ""}${(gap * 100).toFixed(2)} pts`;

          return (
            <div className="analysis-row" key={row.id}>
              <div className="analysis-row-top">
                <span className="analysis-symbol" style={{ "--symbol-color": row.color } as React.CSSProperties}>
                  {row.label}
                </span>
                <strong>{count} hits</strong>
              </div>
              <div className="analysis-bar">
                <span style={{ width: `${Math.min(100, actual * 100)}%` }} />
              </div>
              <div className="analysis-meta">
                <span>Theory {row.probabilityPercent}</span>
                <span>Actual {toPercent(actual)}</span>
                <span className={gap >= 0 ? "text-emerald-300" : "text-red-300"}>{gapLabel}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
