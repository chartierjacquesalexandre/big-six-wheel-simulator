import type { WheelStop } from "../utils/spinWheel";

type Props = {
  results: WheelStop[];
};

export function LastResultsRail({ results }: Props) {
  const visible = results.slice(0, 52);

  return (
    <section className="last-results">
      <div className="last-results-label">
        <span>Last 52 results</span>
        <strong>{visible.length}/52</strong>
      </div>
      <div className="result-bead-row">
        {visible.length === 0 && <span className="result-empty">No spins yet</span>}
        {visible.map((result, index) => (
          <span
            className="result-bead"
            key={`${result.id}-${result.stopIndex}-${index}`}
            style={{ "--bead-color": result.color } as React.CSSProperties}
            title={`Spin ${results.length - index}: ${result.label}`}
          >
            {result.label === "Flag" ? "F" : result.label === "Joker" ? "J" : result.label}
          </span>
        ))}
      </div>
    </section>
  );
}
