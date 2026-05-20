# Advisor Lens

Internal, single-page advisor briefing tool for rapid portfolio review before a client meeting. Built with Next.js 14 (App Router) + Tailwind, deployed to Railway.

> Not a retail investing app and not client-facing. The product is the **briefing**, not the data.

## Sample portfolio

GOOGL · AMD · ABBV · TSM

## Sections

1. **Advisor Snapshot** — theme, strength, concern, suggested discussion
2. **Holdings Breakdown** — table with live price + day change + market cap and advisor commentary
3. **Exposure Map** — qualitative exposure bars across 6 dimensions
4. **Overlap Detector** — thematic concentration / co-movement
5. **Scenario Stress Test** — three thematic shock scenarios with per-position moves + aggregate impact

Quotes come from Yahoo Finance via the unofficial `yahoo-finance2` npm package — no API key required. The advisor commentary lives in `lib/portfolio.ts` and is the actual product surface.

## Local dev

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Deploy to Railway

1. Push this folder to a Git repo (GitHub / GitLab).
2. In Railway, **New Project → Deploy from GitHub repo**, pick the repo.
3. Railway auto-detects Next.js via Nixpacks. The included `railway.json` sets the start command to `npm start`.
4. No environment variables required.
5. Once deployed, Railway gives you a public URL; open it.

If you'd rather deploy via CLI:

```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

## File layout

```text
advisor-lens/
├── app/
│   ├── api/quotes/route.ts   live quote proxy (Yahoo Finance)
│   ├── globals.css           dark theme + tokens
│   ├── layout.tsx            root layout, fonts
│   └── page.tsx              single dashboard page
├── components/
│   ├── Header.tsx            sticky ticker strip + refresh
│   ├── SectionShell.tsx      numbered section wrapper
│   ├── AdvisorSnapshot.tsx   §1 — 4 summary cards
│   ├── HoldingsTable.tsx     §2 — live-enriched holdings table
│   ├── ExposureMap.tsx       §3 — progress bars
│   ├── OverlapDetector.tsx   §4 — overlap cards
│   └── StressTest.tsx        §5 — scenario cards w/ centered bars
├── lib/
│   ├── portfolio.ts          static advisor commentary
│   └── quotes.ts             formatters + types
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── next.config.js
├── railway.json
└── package.json
```

## Notes for senior-advisor review

- All commentary is hand-authored, not LLM-generated at render time.
- Stress scenarios assume equal weight; the aggregate impact line is a simple unweighted mean — intentionally legible.
- The exposure map is a qualitative read, not a factor-model output. Labeled as such.
- Live price/change is informational only; the briefing logic is independent of intraday moves.
