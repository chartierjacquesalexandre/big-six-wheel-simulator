import { RefreshCcw } from "lucide-react";

export type Stats = {
  totalSpins: number;
  wins: number;
  losses: number;
  totalWagered: number;
  net: number;
  resultCounts: Record<string, number>;
};

type Props = {
  stats: Stats;
  lastDelta: number;
  mostFrequentResult: string;
  onReset: () => void;
};

export function StatsPanel({ stats, lastDelta, mostFrequentResult, onReset }: Props) {
  const winRate = stats.totalSpins > 0 ? (stats.wins / stats.totalSpins) * 100 : 0;

  return (
    <section className="panel">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Session statistics</p>
          <h2 className="section-title">Tracker</h2>
        </div>
        <button className="icon-button" onClick={onReset} title="Reset session">
          <RefreshCcw className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="metric">
          <span>Total spins</span>
          <strong>{stats.totalSpins}</strong>
        </div>
        <div className="metric">
          <span>Win rate</span>
          <strong>{winRate.toFixed(1)}%</strong>
        </div>
        <div className="metric">
          <span>Wins</span>
          <strong>{stats.wins}</strong>
        </div>
        <div className="metric">
          <span>Losses</span>
          <strong>{stats.losses}</strong>
        </div>
        <div className="metric">
          <span>Total wagered</span>
          <strong>{stats.totalWagered.toLocaleString()} cr</strong>
        </div>
        <div className="metric">
          <span>Net</span>
          <strong className={stats.net >= 0 ? "text-emerald-300" : "text-red-300"}>
            {stats.net >= 0 ? "+" : ""}
            {stats.net.toLocaleString()} cr
          </strong>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="metric">
          <span>Last spin</span>
          <strong className={lastDelta >= 0 ? "text-emerald-300" : "text-red-300"}>
            {lastDelta >= 0 ? "+" : ""}
            {lastDelta} cr
          </strong>
        </div>
        <div className="metric">
          <span>Most frequent</span>
          <strong>{mostFrequentResult}</strong>
        </div>
      </div>
    </section>
  );
}
