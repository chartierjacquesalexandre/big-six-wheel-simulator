import type { WheelSlice } from "../data/defaultWheel";
import { calculateWheelMath, findWorstHouseEdgeId, getTotalStops } from "../utils/probability";

type Props = {
  wheel: WheelSlice[];
};

export function ProbabilityTable({ wheel }: Props) {
  const rows = calculateWheelMath(wheel);
  const worstId = findWorstHouseEdgeId(wheel);

  return (
    <section className="panel">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Calculated odds</p>
          <h2 className="section-title">Probability table</h2>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-200">
          Total stops: {getTotalStops(wheel)}
        </span>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="odds-table">
          <thead>
            <tr>
              <th>Bet</th>
              <th>Pays</th>
              <th>Number on wheel</th>
              <th>Probability</th>
              <th>House edge</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr className={row.id === worstId ? "worst-row" : ""} key={row.id}>
                <td>
                  <span className="inline-flex items-center gap-2 font-black">
                    <span className="h-3 w-3 rounded-full" style={{ background: row.color }} />
                    {row.label}
                  </span>
                </td>
                <td>{row.pays}:1</td>
                <td>{row.stops}</td>
                <td>{row.probabilityPercent}</td>
                <td>{row.houseEdgePercent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">
        Lower house edge means better odds for the player. The highlighted row
        has the least favorable default edge.
      </p>
    </section>
  );
}
