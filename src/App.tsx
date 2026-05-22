import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BetSelector, type BetMap } from "./components/BetSelector";
import { BigSixWheel } from "./components/BigSixWheel";
import { EducationSection } from "./components/EducationSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { LastResultsRail } from "./components/LastResultsRail";
import { OutcomeAnalysis } from "./components/OutcomeAnalysis";
import { ProbabilityTable } from "./components/ProbabilityTable";
import { StatsPanel, type Stats } from "./components/StatsPanel";
import { WheelEditor } from "./components/WheelEditor";
import { defaultWheel, defaultWheelStopOrder, type WheelSlice } from "./data/defaultWheel";
import { CasinoAudio } from "./utils/casinoAudio";
import { getTotalStops } from "./utils/probability";
import { getStopAngle, selectWeightedResult, type WheelStop } from "./utils/spinWheel";

const initialStats: Stats = {
  totalSpins: 0,
  wins: 0,
  losses: 0,
  totalWagered: 0,
  net: 0,
  resultCounts: {},
};

const cloneDefaultWheel = () => defaultWheel.map((slice) => ({ ...slice }));
const BETTING_SECONDS = 15;
const RESULT_SECONDS = 2;
const SPIN_DURATION_MS = 7000;
const WHEEL_SOUND_DURATION_MS = 5000;

type RoundPhase = "betting" | "spinning" | "result";

function App() {
  const [wheel, setWheel] = useState<WheelSlice[]>(cloneDefaultWheel);
  const [bets, setBets] = useState<BetMap>({});
  const [lastBets, setLastBets] = useState<BetMap>({});
  const [selectedChip, setSelectedChip] = useState(1);
  const [balance, setBalance] = useState(1000);
  const [stats, setStats] = useState<Stats>(initialStats);
  const [lastResult, setLastResult] = useState<WheelStop>();
  const [winningBetId, setWinningBetId] = useState<string>();
  const [lastWinPayout, setLastWinPayout] = useState(0);
  const [resultHistory, setResultHistory] = useState<WheelStop[]>([]);
  const [lastDelta, setLastDelta] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [roundPhase, setRoundPhase] = useState<RoundPhase>("betting");
  const [countdown, setCountdown] = useState(BETTING_SECONDS);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const nextSpinDirection = useRef<1 | -1>(1);
  const audio = useRef(new CasinoAudio());

  const totalStops = getTotalStops(wheel);
  const useDefaultStopOrder =
    wheel.length === defaultWheel.length &&
    wheel.every(
      (slice, index) =>
        slice.id === defaultWheel[index].id &&
        slice.stops === defaultWheel[index].stops,
    );
  const visualStopOrder = useDefaultStopOrder ? defaultWheelStopOrder : undefined;
  const totalBet = Object.values(bets).reduce((total, amount) => total + amount, 0);
  const lastBetsTotal = Object.values(lastBets).reduce((total, amount) => total + amount, 0);
  const canRestoreLastBets = lastBetsTotal > 0 && lastBetsTotal <= balance;
  const latestRound = useRef({
    bets,
    totalBet,
    totalStops,
    visualStopOrder,
    wheel,
  });

  latestRound.current = {
    bets,
    totalBet,
    totalStops,
    visualStopOrder,
    wheel,
  };
  const mostFrequentResult = useMemo(() => {
    const entries = Object.entries(stats.resultCounts);
    if (entries.length === 0) return "-";
    return entries.reduce((best, entry) => (entry[1] > best[1] ? entry : best))[0];
  }, [stats.resultCounts]);

  const placeBet = (id: string) => {
    if (roundPhase !== "betting" || totalBet + selectedChip > balance) return;
    audio.current.play("chip");
    setBets((current) => ({
      ...current,
      [id]: (current[id] ?? 0) + selectedChip,
    }));
  };

  const clearBets = () => {
    if (roundPhase === "betting") setBets({});
  };

  const restoreLastBets = () => {
    const previousTotal = Object.values(lastBets).reduce((total, amount) => total + amount, 0);
    if (roundPhase === "betting" && previousTotal <= balance) setBets(lastBets);
  };

  const spin = useCallback(() => {
    const {
      bets: roundBets,
      totalBet: roundTotalBet,
      totalStops: roundTotalStops,
      visualStopOrder: roundVisualStopOrder,
      wheel: roundWheel,
    } = latestRound.current;

    if (roundTotalStops === 0 || roundPhase === "spinning") return;

    const result = selectWeightedResult(roundWheel, roundVisualStopOrder);
    const matchedWager = roundBets[result.id] ?? 0;
    const winPayout = matchedWager * result.pays;
    const delta = roundWheel.reduce((total, slice) => {
      const amount = roundBets[slice.id] ?? 0;
      if (amount === 0) return total;
      return total + (slice.id === result.id ? amount * slice.pays : -amount);
    }, 0);
    const hasBet = roundTotalBet > 0;
    const isWin = hasBet && delta > 0;
    const stopIndex = result.globalIndex;
    const targetAngle = 360 - getStopAngle(stopIndex + 0.5, roundTotalStops);
    const extraSpins = 360 * (2 + Math.floor(Math.random() * 2));
    const spinDirection = nextSpinDirection.current;
    nextSpinDirection.current = spinDirection === 1 ? -1 : 1;

    setRoundPhase("spinning");
    setIsSpinning(true);
    setWinningBetId(undefined);
    setLastWinPayout(0);
    if (hasBet) setLastBets(roundBets);
    setRotation((current) => {
      const currentAngle = ((current % 360) + 360) % 360;
      if (spinDirection === 1) {
        const turnToTarget = (targetAngle - currentAngle + 360) % 360;
        return current + extraSpins + turnToTarget;
      }

      const turnToTarget = (currentAngle - targetAngle + 360) % 360;
      return current - extraSpins - turnToTarget;
    });

    window.setTimeout(() => {
      audio.current.play("wheel");
    }, Math.max(0, SPIN_DURATION_MS - WHEEL_SOUND_DURATION_MS));

    window.setTimeout(() => {
      if (winPayout > 0) audio.current.play("win");
      setLastResult(result);
      setWinningBetId(roundBets[result.id] ? result.id : undefined);
      setLastWinPayout(winPayout);
      setResultHistory((current) => [result, ...current].slice(0, 100));
      setLastDelta(delta);
      setBalance((current) => Math.max(0, current + delta));
      setStats((current) => ({
        totalSpins: current.totalSpins + 1,
        wins: current.wins + (isWin ? 1 : 0),
        losses: current.losses + (hasBet && !isWin ? 1 : 0),
        totalWagered: current.totalWagered + roundTotalBet,
        net: current.net + delta,
        resultCounts: {
          ...current.resultCounts,
          [result.label]: (current.resultCounts[result.label] ?? 0) + 1,
        },
      }));
      setBets({});
      setIsSpinning(false);
      setRoundPhase("result");
      setCountdown(RESULT_SECONDS);
    }, SPIN_DURATION_MS);
  }, [roundPhase]);

  useEffect(() => {
    audio.current.setMuted(!soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    if (roundPhase === "betting") {
      setCountdown(BETTING_SECONDS);
      const idleRotation = window.setInterval(() => {
        setRotation((current) => current + 0.5);
      }, 60);
      const countdownTimer = window.setInterval(() => {
        setCountdown((current) => Math.max(0, current - 1));
      }, 1000);
      const spinTimer = window.setTimeout(() => {
        spin();
      }, BETTING_SECONDS * 1000);

      return () => {
        window.clearInterval(idleRotation);
        window.clearInterval(countdownTimer);
        window.clearTimeout(spinTimer);
      };
    }

    if (roundPhase === "result") {
      setCountdown(RESULT_SECONDS);
      const countdownTimer = window.setInterval(() => {
        setCountdown((current) => Math.max(0, current - 1));
      }, 1000);
      const nextRoundTimer = window.setTimeout(() => {
        setWinningBetId(undefined);
        setLastWinPayout(0);
        setRoundPhase("betting");
      }, RESULT_SECONDS * 1000);

      return () => {
        window.clearInterval(countdownTimer);
        window.clearTimeout(nextRoundTimer);
      };
    }
  }, [roundPhase, spin]);

  const resetSession = () => {
    setBalance(1000);
    setStats(initialStats);
    setLastResult(undefined);
    setWinningBetId(undefined);
    setLastWinPayout(0);
    setResultHistory([]);
    setLastDelta(0);
    setBets({});
    setLastBets({});
    setRoundPhase("betting");
    setCountdown(BETTING_SECONDS);
  };

  const restoreDefaults = () => {
    setWheel(cloneDefaultWheel());
    setBets({});
    setLastBets({});
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#273044_0,#121826_42%,#07090f_100%)] text-white">
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((current) => !current)}
      />
      <main className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_300px] lg:px-8">
        <div className="grid min-w-0 gap-5">
          <div className="grid min-w-0 gap-5">
            <BigSixWheel
              wheel={wheel}
              stopOrder={visualStopOrder}
              rotation={rotation}
              isSpinning={isSpinning}
              lastResult={lastResult}
            />
            <div className="grid min-w-0 gap-5">
              <BetSelector
                wheel={wheel}
                bets={bets}
                selectedChip={selectedChip}
                balance={balance}
                totalBet={totalBet}
                canSpin={roundPhase === "betting"}
                canRestoreLastBets={canRestoreLastBets}
                roundPhase={roundPhase}
                countdown={countdown}
                winningBetId={winningBetId}
                lastWinPayout={lastWinPayout}
                onChipChange={setSelectedChip}
                onPlaceBet={placeBet}
                onClearBets={clearBets}
                onRestoreLastBets={restoreLastBets}
              />
              <LastResultsRail results={resultHistory} />
              <StatsPanel
                stats={stats}
                lastDelta={lastDelta}
                mostFrequentResult={mostFrequentResult}
                onReset={resetSession}
              />
            </div>
          </div>
          <div className="lg:hidden">
            <OutcomeAnalysis wheel={wheel} results={resultHistory} />
          </div>
          <ProbabilityTable wheel={wheel} />
          <div className="ad-slot">Reserved content ad placement</div>
          <EducationSection />
          <WheelEditor wheel={wheel} onChange={setWheel} onRestore={restoreDefaults} />
        </div>
        <aside className="hidden lg:block">
          <div className="grid gap-5">
            <div className="ad-slot min-h-[360px]">Reserved sidebar ad placement</div>
            <OutcomeAnalysis wheel={wheel} results={resultHistory} />
            <div className="ad-slot min-h-[360px]">Reserved sidebar ad placement</div>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
}

export default App;
