"use client";

import { useEffect, useState } from "react";
import { Activity, RefreshCw } from "lucide-react";
import { TICKERS } from "@/lib/portfolio";
import { formatPct, formatPrice, type Quote } from "@/lib/quotes";

type QuoteResponse = {
  quotes: Quote[];
  fetchedAt: string;
  source?: "yahoo" | "stooq" | "none";
};

function formatClock(d: Date) {
  return d.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function Header() {
  const [data, setData] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [nowLabel, setNowLabel] = useState<string>("");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/quotes", { cache: "no-store" });
      const json = (await res.json()) as QuoteResponse;
      setData(json);
    } catch {
      setData({ quotes: [], fetchedAt: new Date().toISOString() });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    setNowLabel(formatClock(new Date()));
    const t = setInterval(() => setNowLabel(formatClock(new Date())), 30_000);
    return () => clearInterval(t);
  }, []);

  const byTicker: Record<string, Quote | undefined> = Object.fromEntries(
    (data?.quotes ?? []).map((q) => [q.symbol, q])
  );

  return (
    <header className="border-b border-line bg-bg-base/80 backdrop-blur supports-[backdrop-filter]:bg-bg-base/60">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-bg-elev">
            <Activity className="h-4 w-4 text-accent-gold" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-[15px] font-semibold tracking-tight text-ink">
                Advisor Lens
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widerx text-ink-dim">
                v1.0 · internal
              </span>
            </div>
            <span className="text-[12px] text-ink-muted">
              Pre-meeting portfolio briefing
            </span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4 overflow-x-auto">
          <div className="flex items-center gap-2">
            {TICKERS.map((t) => {
              const q = byTicker[t];
              const pct = q?.changePercent ?? null;
              const positive = (pct ?? 0) >= 0;
              return (
                <div
                  key={t}
                  className="flex min-w-[112px] items-center justify-between gap-2 rounded-md border border-line bg-bg-elev px-2.5 py-1.5"
                >
                  <span className="font-mono text-[11px] font-semibold tracking-wider text-ink">
                    {t}
                  </span>
                  <div className="flex flex-col items-end leading-tight">
                    <span className="num text-[11px] text-ink">
                      {q ? formatPrice(q.price) : "—"}
                    </span>
                    <span
                      className={
                        "num text-[10px] " +
                        (pct === null
                          ? "text-ink-dim"
                          : positive
                            ? "text-tone-good"
                            : "text-tone-danger")
                      }
                    >
                      {pct === null ? "—" : formatPct(pct)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden h-8 w-px bg-line md:block" />

          <div className="flex items-center gap-3">
            <div className="hidden flex-col items-end leading-tight md:flex">
              <span className="label-eyebrow">Updated</span>
              <span className="num text-[11px] text-ink-muted">{nowLabel}</span>
            </div>
            <button
              type="button"
              onClick={load}
              className="group flex h-8 items-center gap-1.5 rounded-md border border-line bg-bg-elev px-2.5 text-[11px] uppercase tracking-wider text-ink-muted transition hover:border-line-strong hover:bg-bg-hover hover:text-ink"
              aria-label="Refresh quotes"
            >
              <RefreshCw
                className={
                  "h-3.5 w-3.5 transition " +
                  (loading ? "animate-spin text-accent-gold" : "")
                }
              />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
