import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";
import { TICKERS } from "@/lib/portfolio";
import type { Quote } from "@/lib/quotes";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Source = "finnhub" | "yahoo" | "stooq" | "none";

type FinnhubQuote = {
  c?: number;
  d?: number;
  dp?: number;
  pc?: number;
  t?: number;
};

type FinnhubProfile = {
  marketCapitalization?: number;
  currency?: string;
  exchange?: string;
};

async function finnhubOne(
  ticker: string,
  key: string
): Promise<Quote | null> {
  try {
    const [qRes, pRes] = await Promise.all([
      fetch(
        `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${key}`,
        { cache: "no-store" }
      ),
      fetch(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${key}`,
        { cache: "no-store" }
      ),
    ]);
    if (!qRes.ok) return null;
    const q = (await qRes.json()) as FinnhubQuote;
    const p = pRes.ok ? ((await pRes.json()) as FinnhubProfile) : {};
    const price = typeof q.c === "number" && q.c > 0 ? q.c : null;
    if (price === null) return null;
    return {
      symbol: ticker,
      price,
      change: typeof q.d === "number" ? q.d : null,
      changePercent: typeof q.dp === "number" ? q.dp : null,
      marketCap:
        typeof p.marketCapitalization === "number"
          ? p.marketCapitalization * 1_000_000
          : null,
      currency: typeof p.currency === "string" ? p.currency : "USD",
      exchange: typeof p.exchange === "string" ? p.exchange : null,
      asOf: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

async function fromFinnhub(): Promise<Quote[] | null> {
  const key = process.env.FINNHUB_API_KEY;
  if (!key) return null;
  try {
    const results = await Promise.all(
      TICKERS.map((t) => finnhubOne(t, key))
    );
    if (!results.some((r) => r && r.price !== null)) return null;
    return results.map(
      (r, i) =>
        r ?? {
          symbol: TICKERS[i],
          price: null,
          change: null,
          changePercent: null,
          marketCap: null,
          currency: null,
          exchange: null,
          asOf: new Date().toISOString(),
        }
    );
  } catch {
    return null;
  }
}

async function fromYahoo(): Promise<Quote[] | null> {
  try {
    yahooFinance.suppressNotices(["yahooSurvey"]);
    const results = await yahooFinance.quote(TICKERS as unknown as string[]);
    const arr = Array.isArray(results) ? results : [results];
    if (!arr.length) return null;
    return arr.map((q) => ({
      symbol: q.symbol,
      price: (q.regularMarketPrice as number | undefined) ?? null,
      change: (q.regularMarketChange as number | undefined) ?? null,
      changePercent:
        (q.regularMarketChangePercent as number | undefined) ?? null,
      marketCap: (q.marketCap as number | undefined) ?? null,
      currency: (q.currency as string | undefined) ?? null,
      exchange: (q.fullExchangeName as string | undefined) ?? null,
      asOf: new Date().toISOString(),
    }));
  } catch {
    return null;
  }
}

async function stooqOne(ticker: string): Promise<Quote> {
  const empty: Quote = {
    symbol: ticker,
    price: null,
    change: null,
    changePercent: null,
    marketCap: null,
    currency: null,
    exchange: null,
    asOf: new Date().toISOString(),
  };
  try {
    const url = `https://stooq.com/q/l/?s=${ticker.toLowerCase()}.us&f=sd2t2ohlcv&h&e=csv`;
    const res = await fetch(url, {
      headers: { "User-Agent": "advisor-lens/1.0" },
      cache: "no-store",
    });
    if (!res.ok) return empty;
    const text = await res.text();
    const lines = text.trim().split(/\r?\n/);
    if (lines.length < 2) return empty;
    const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
    const cols = lines[1].split(",");
    const idx = (k: string) => header.indexOf(k);
    const open = parseFloat(cols[idx("open")]);
    const close = parseFloat(cols[idx("close")]);
    if (!Number.isFinite(close)) return empty;
    const change = Number.isFinite(open) ? close - open : null;
    const changePercent =
      change !== null && Number.isFinite(open) && open !== 0
        ? (change / open) * 100
        : null;
    return {
      symbol: ticker,
      price: close,
      change,
      changePercent,
      marketCap: null,
      currency: "USD",
      exchange: "US",
      asOf: new Date().toISOString(),
    };
  } catch {
    return empty;
  }
}

async function fromStooq(): Promise<Quote[] | null> {
  try {
    const quotes = await Promise.all(TICKERS.map((t) => stooqOne(t)));
    if (!quotes.some((q) => q.price !== null)) return null;
    return quotes;
  } catch {
    return null;
  }
}

export async function GET() {
  let quotes: Quote[] | null = null;
  let source: Source = "none";

  const finnhub = await fromFinnhub();
  if (finnhub && finnhub.some((q) => q.price !== null)) {
    quotes = finnhub;
    source = "finnhub";
  } else {
    const yahoo = await fromYahoo();
    if (yahoo && yahoo.some((q) => q.price !== null)) {
      quotes = yahoo;
      source = "yahoo";
    } else {
      const stooq = await fromStooq();
      if (stooq && stooq.some((q) => q.price !== null)) {
        quotes = stooq;
        source = "stooq";
      }
    }
  }

  return NextResponse.json(
    {
      quotes: quotes ?? [],
      source,
      fetchedAt: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    }
  );
}
