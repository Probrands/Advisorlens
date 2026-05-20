"use client";

import { useEffect, useState } from "react";
import { HOLDINGS } from "@/lib/portfolio";
import {
  formatMarketCap,
  formatPct,
  formatPrice,
  type Quote,
} from "@/lib/quotes";

type QuoteResponse = {
  quotes: Quote[];
  fetchedAt: string;
  source?: "finnhub" | "yahoo" | "stooq" | "none";
};

function ConcernDot({ level }: { level: "LOW" | "MED" | "HIGH" }) {
  const cls =
    level === "HIGH"
      ? "bg-tone-danger shadow-[0_0_0_3px_rgba(225,90,90,0.12)]"
      : level === "MED"
        ? "bg-accent-gold shadow-[0_0_0_3px_rgba(212,162,74,0.12)]"
        : "bg-tone-good shadow-[0_0_0_3px_rgba(92,184,138,0.12)]";
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-1.5 w-1.5 rounded-full ${cls}`} />
      <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
        {level}
      </span>
    </span>
  );
}

export function HoldingsTable() {
  const [data, setData] = useState<QuoteResponse | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/quotes", { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => {
        if (alive) setData(j as QuoteResponse);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const byTicker: Record<string, Quote | undefined> = Object.fromEntries(
    (data?.quotes ?? []).map((q) => [q.symbol, q])
  );

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-line bg-bg-elev/60">
              <Th>Ticker</Th>
              <Th>Company</Th>
              <Th>Sector</Th>
              <Th className="text-right">Last</Th>
              <Th className="text-right">Day</Th>
              <Th className="text-right">Mkt Cap</Th>
              <Th>Role in Portfolio</Th>
              <Th>Main Concern</Th>
              <Th>Level</Th>
            </tr>
          </thead>
          <tbody>
            {HOLDINGS.map((h, i) => {
              const q = byTicker[h.ticker];
              const pct = q?.changePercent ?? null;
              const positive = (pct ?? 0) >= 0;
              return (
                <tr
                  key={h.ticker}
                  className={
                    "transition hover:bg-bg-hover/60 " +
                    (i !== HOLDINGS.length - 1 ? "border-b border-line" : "")
                  }
                >
                  <Td>
                    <span className="font-mono text-[12.5px] font-semibold tracking-wider text-ink">
                      {h.ticker}
                    </span>
                  </Td>
                  <Td>
                    <span className="text-ink">{h.company}</span>
                  </Td>
                  <Td>
                    <span className="text-ink-muted">{h.sector}</span>
                  </Td>
                  <Td className="text-right">
                    <span className="num text-ink">
                      {q ? formatPrice(q.price) : "—"}
                    </span>
                  </Td>
                  <Td className="text-right">
                    <span
                      className={
                        "num " +
                        (pct === null
                          ? "text-ink-dim"
                          : positive
                            ? "text-tone-good"
                            : "text-tone-danger")
                      }
                    >
                      {pct === null ? "—" : formatPct(pct)}
                    </span>
                  </Td>
                  <Td className="text-right">
                    <span className="num text-ink-muted">
                      {formatMarketCap(q?.marketCap ?? null)}
                    </span>
                  </Td>
                  <Td>
                    <span className="text-ink">{h.role}</span>
                  </Td>
                  <Td>
                    <span className="text-ink-muted">{h.concern}</span>
                  </Td>
                  <Td>
                    <ConcernDot level={h.concernLevel} />
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-line bg-bg-elev/40 px-4 py-2 text-[11px] text-ink-dim">
        <span className="font-mono uppercase tracking-wider">
          {HOLDINGS.length} positions · equal weight assumption
        </span>
        <span className="font-mono uppercase tracking-wider">
          {data?.source === "finnhub"
            ? "live quotes · finnhub"
            : data?.source === "yahoo"
              ? "live quotes · yahoo finance"
              : data?.source === "stooq"
                ? "live quotes · stooq (fallback)"
                : "quotes unavailable"}
        </span>
      </div>
    </div>
  );
}

function Th({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      scope="col"
      className={
        "px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widerx text-ink-muted " +
        (className ?? "")
      }
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={"px-4 py-3 align-middle " + (className ?? "")}>{children}</td>;
}
