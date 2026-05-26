export function EducationSection() {
  return (
    <section className="panel">
      <div className="max-w-4xl">
        <p className="eyebrow">Plain-language math</p>
        <h2 className="section-title">Big Six wheel odds explained</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
          This simulator shows how a Big Six wheel works using weighted stops,
          payout rules, and virtual credits. It is built for probability
          education, not real-money play.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a className="secondary-button" href="/big-six-wheel-odds">
            Read the odds guide
          </a>
          <a className="secondary-button" href="/big-six-wheel-house-edge">
            Read the house edge guide
          </a>
        </div>
      </div>

      <div className="mt-6 grid gap-5 text-sm leading-7 text-slate-300 lg:grid-cols-2">
        <article className="space-y-3">
          <h3 className="text-lg font-black text-white">What is a Big Six wheel?</h3>
          <p>
            A Big Six wheel is a vertical prize wheel divided into numbered and
            symbol-based stops. In this educational version, each spin lands on
            one stop, and virtual-credit bets are settled according to the
            displayed payout for that result.
          </p>
        </article>

        <article className="space-y-3">
          <h3 className="text-lg font-black text-white">How Big Six wheel odds work</h3>
          <p>
            The odds are weighted by how often each result appears on the wheel.
            A result with more stops is more likely to land, while a rare result
            appears less often and usually has a larger payout.
          </p>
        </article>

        <article className="space-y-3 lg:col-span-2">
          <h3 className="text-lg font-black text-white">Big Six payout table</h3>
          <div className="overflow-x-auto">
            <table className="odds-table">
              <thead>
                <tr>
                  <th>Result</th>
                  <th>Stops</th>
                  <th>Payout</th>
                  <th>Default probability</th>
                  <th>House edge</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>26</td>
                  <td>1:1</td>
                  <td>48.15%</td>
                  <td>3.70%</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>13</td>
                  <td>3:1</td>
                  <td>24.07%</td>
                  <td>3.70%</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>7</td>
                  <td>6:1</td>
                  <td>12.96%</td>
                  <td>9.26%</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>4</td>
                  <td>12:1</td>
                  <td>7.41%</td>
                  <td>3.70%</td>
                </tr>
                <tr>
                  <td>25</td>
                  <td>2</td>
                  <td>25:1</td>
                  <td>3.70%</td>
                  <td>3.70%</td>
                </tr>
                <tr>
                  <td>Flag</td>
                  <td>1</td>
                  <td>50:1</td>
                  <td>1.85%</td>
                  <td>5.56%</td>
                </tr>
                <tr>
                  <td>Joker</td>
                  <td>1</td>
                  <td>50:1</td>
                  <td>1.85%</td>
                  <td>5.56%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        <article className="space-y-3">
          <h3 className="text-lg font-black text-white">Best and worst bets</h3>
          <p>
            In the default wheel, the 1, 3, 12, and 25 results have the lowest
            house edge at 3.70%. The 6 result is the least favorable default bet
            because it appears 7 times on a 54-stop wheel but pays only 6 to 1.
          </p>
        </article>

        <article className="space-y-3">
          <h3 className="text-lg font-black text-white">Educational disclaimer</h3>
          <p>
            This app is a probability simulator that uses virtual credits only.
            It does not offer accounts, deposits, withdrawals, prizes, or
            real-money gambling features.
          </p>
        </article>
      </div>
    </section>
  );
}
