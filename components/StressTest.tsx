import { TrendingDown } from "lucide-react";
import { SCENARIOS, TICKERS, type Ticker } from "@/lib/portfolio";

const MAX_ABS = 20;

function portfolioImpact(moves: Record<Ticker, number>) {
  return (
    TICKERS.reduce((acc, t) => acc + moves[t], 0) / TICKERS.length
  );
}

function MoveBar({ ticker, value }: { ticker: Ticker; value: number }) {
  const pct = Math.min(Math.abs(value) / MAX_ABS, 1) * 50;
  const positive = value >= 0;
  return (
    <div className="grid grid-cols-[44px_1fr_56px] items-center gap-3">
      <span className="font-mono text-[11px] font-semibold tracking-wider text-ink">
        {ticker}
      </span>
      <div className="relative h-2 w-full rounded-full bg-bg-elev">
        <div className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-line-strong" />
        {positive ? (
          <div
            className="absolute inset-y-0 rounded-r-full bg-gradient-to-r from-tone-good/60 to-tone-good"
            style={{ left: "50%", width: `${pct}%` }}
          />
        ) : (
          <div
            className="absolute inset-y-0 rounded-l-full bg-gradient-to-l from-tone-danger/60 to-tone-danger"
            style={{ right: "50%", width: `${pct}%` }}
          />
        )}
      </div>
      <span
        className={
          "num text-right text-[12px] " +
          (value >= 0 ? "text-tone-good" : "text-tone-danger")
        }
      >
        {value > 0 ? "+" : ""}
        {value}%
      </span>
    </div>
  );
}

export function StressTest() {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
      {SCENARIOS.map((s, idx) => {
        const impact = portfolioImpact(s.moves);
        return (
          <div key={s.name} className="card flex flex-col">
            <div className="card-pad flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-widerx text-ink-dim">
                    Scenario {idx + 1}
                  </span>
                  <h3 className="mt-1 text-[14px] font-semibold text-ink">
                    {s.name}
                  </h3>
                  <span className="text-[11.5px] text-ink-muted">
                    {s.tagline}
                  </span>
                </div>
                <TrendingDown className="h-4 w-4 shrink-0 text-ink-dim" />
              </div>

              <div className="flex flex-col gap-2.5">
                {TICKERS.map((t) => (
                  <MoveBar key={t} ticker={t} value={s.moves[t]} />
                ))}
              </div>

              <div className="divider" />

              <div className="flex items-center justify-between">
                <span className="label-eyebrow">Portfolio impact</span>
                <span
                  className={
                    "num text-[13px] font-semibold " +
                    (impact >= 0 ? "text-tone-good" : "text-tone-danger")
                  }
                >
                  {impact > 0 ? "+" : ""}
                  {impact.toFixed(1)}%
                </span>
              </div>

              <p className="text-[12.5px] leading-relaxed text-ink-muted">
                {s.summary}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
