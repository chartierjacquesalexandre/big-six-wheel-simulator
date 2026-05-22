export function EducationSection() {
  return (
    <section className="panel">
      <p className="eyebrow">Plain-language math</p>
      <h2 className="section-title">Why the wheel is not even odds</h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300 sm:text-base">
        <p>
          A Big Six wheel looks simple, but each symbol appears a different
          number of times on the wheel. This changes the probability of winning
          and the house edge.
        </p>
        <p>
          The default 6 bet has worse odds because it appears 7 times on a
          54-stop wheel but pays only 6 to 1. That mismatch creates a 9.26%
          house edge in the standard setup.
        </p>
        <p>
          This app is for probability education and simulation only. It uses
          virtual credits, no accounts, no deposits, no withdrawals, and no real
          gambling functionality.
        </p>
      </div>
    </section>
  );
}
