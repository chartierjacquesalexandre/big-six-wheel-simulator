import { Clock3, RotateCcw, Sparkles, Trash2 } from "lucide-react";
import type { WheelSlice } from "../data/defaultWheel";

export type BetMap = Record<string, number>;

type Props = {
  wheel: WheelSlice[];
  bets: BetMap;
  selectedChip: number;
  balance: number;
  totalBet: number;
  canSpin: boolean;
  canRestoreLastBets: boolean;
  roundPhase: "betting" | "spinning" | "result";
  countdown: number;
  winningBetId?: string;
  lastWinPayout: number;
  onChipChange: (amount: number) => void;
  onPlaceBet: (id: string) => void;
  onClearBets: () => void;
  onRestoreLastBets: () => void;
};

const chipValues = [1, 2, 5, 10, 20, 50, 100];

const getBetTone = (slice: WheelSlice) => {
  if (slice.id === "flag") return "bg-white text-slate-950";
  if (slice.id === "joker") return "bg-red-600 text-white";
  return "text-white";
};

export function BetSelector({
  wheel,
  bets,
  selectedChip,
  balance,
  totalBet,
  canSpin,
  canRestoreLastBets,
  roundPhase,
  countdown,
  winningBetId,
  lastWinPayout,
  onChipChange,
  onPlaceBet,
  onClearBets,
  onRestoreLastBets,
}: Props) {
  const canPlaceSelectedChip = canSpin && totalBet + selectedChip <= balance;

  const renderChipStack = (amount: number, label: string) => {
    const visibleChips = Math.min(4, Math.max(1, Math.ceil(amount / 25)));

    return (
      <span className="bet-chip-stack" aria-label={`${amount} credits on ${label}`}>
        {Array.from({ length: visibleChips }, (_, index) => (
          <span
            className="stacked-chip"
            key={index}
            style={{ "--stack-index": index } as React.CSSProperties}
          >
            {index === visibleChips - 1 ? amount : ""}
          </span>
        ))}
      </span>
    );
  };

  return (
    <section className="player-console">
      <div className="casino-topbar">
        <div>
          <span>Credit</span>
          <strong>{balance.toLocaleString()} cr</strong>
        </div>
        <div>
          <span>Bet</span>
          <strong>{totalBet.toLocaleString()} cr</strong>
        </div>
      </div>

      <div className="console-felt">
        {winningBetId && lastWinPayout > 0 && (
          <div className="win-banner">Winning bet +{lastWinPayout.toLocaleString()} cr</div>
        )}
        <p className="table-callout">Place your bets on one or multiple symbols</p>
        <div className="bet-layout">
          {wheel.map((slice) => {
            const amount = bets[slice.id] ?? 0;
            const isWord = slice.label === "Flag" || slice.label === "Joker";

            return (
              <button
                className={`bet-target bet-target-${slice.id} ${winningBetId === slice.id && lastWinPayout > 0 ? "bet-target-win" : ""} ${getBetTone(slice)}`}
                key={slice.id}
                onClick={() => onPlaceBet(slice.id)}
                disabled={!canPlaceSelectedChip}
                type="button"
                aria-label={`Bet ${selectedChip} credits on ${slice.label}. Pays ${slice.pays} to 1.${amount > 0 ? ` Current bet ${amount} credits.` : ""}`}
                style={{ "--target-color": slice.color } as React.CSSProperties}
              >
                <span className={`bet-target-symbol ${isWord ? "bet-target-word" : ""}`}>
                  {slice.label}
                </span>
                <span className="bet-target-pays">Pays {slice.pays} to 1</span>
                {amount > 0 && renderChipStack(amount, slice.label)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="chip-bank" aria-label="Chip selector">
        {chipValues.map((value) => (
          <button
            className={`casino-chip ${selectedChip === value ? "casino-chip-active" : ""}`}
            key={value}
            onClick={() => onChipChange(value)}
            disabled={!canSpin || totalBet + value > balance}
            type="button"
            aria-pressed={selectedChip === value}
            aria-label={`Select ${value} credit chip`}
          >
            <span>{value}</span>
          </button>
        ))}
      </div>

      <div className="console-actions">
        <button
          className="secondary-button"
          disabled={!canSpin || totalBet === 0}
          onClick={onClearBets}
          type="button"
        >
          <Trash2 className="h-4 w-4" />
          Clear bets
        </button>
        <button
          className="secondary-button"
          disabled={!canSpin || !canRestoreLastBets}
          onClick={onRestoreLastBets}
          type="button"
        >
          <RotateCcw className="h-4 w-4" />
          Repeat last
        </button>
        <div className="primary-button console-spin round-status" role="status" aria-live="polite">
          {roundPhase === "betting" && <Clock3 className="h-5 w-5" />}
          {roundPhase === "spinning" && <Sparkles className="h-5 w-5 animate-pulse" />}
          {roundPhase === "result" && <Clock3 className="h-5 w-5" />}
          {roundPhase === "betting" && `Bets close in ${countdown}s`}
          {roundPhase === "spinning" && "Wheel spinning"}
          {roundPhase === "result" && `Next bets in ${countdown}s`}
        </div>
      </div>
    </section>
  );
}
