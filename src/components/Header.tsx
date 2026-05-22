import { BadgeDollarSign, ShieldCheck, Volume2, VolumeX } from "lucide-react";

type Props = {
  soundEnabled: boolean;
  onToggleSound: () => void;
};

export function Header({ soundEnabled, onToggleSound }: Props) {
  return (
    <header className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 pt-6 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-amber-300/20 bg-black/35 p-5 shadow-casino backdrop-blur md:flex-row md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
            Educational simulator
          </p>
          <h1 className="mt-2 text-3xl font-black text-white sm:text-5xl">
            Big Six Wheel Simulator
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
            Spin a 54-stop casino-style wheel, compare probabilities, and watch
            house edge math play out with virtual credits only.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-[1fr_1fr_auto]">
          <div className="rounded-xl border border-emerald-300/20 bg-emerald-400/10 p-3 text-emerald-100">
            <ShieldCheck className="mb-2 h-5 w-5" />
            No real money
          </div>
          <div className="rounded-xl border border-amber-300/25 bg-amber-400/10 p-3 text-amber-100">
            <BadgeDollarSign className="mb-2 h-5 w-5" />
            1,000 credits
          </div>
          <button
            className="sound-toggle"
            onClick={onToggleSound}
            type="button"
            aria-pressed={soundEnabled}
            aria-label={soundEnabled ? "Turn sound off" : "Turn sound on"}
          >
            {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            {soundEnabled ? "Sound on" : "Sound off"}
          </button>
        </div>
      </div>
      <div className="ad-slot">Reserved banner ad placement</div>
    </header>
  );
}
