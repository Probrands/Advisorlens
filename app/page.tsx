import { Header } from "@/components/Header";
import { SectionShell } from "@/components/SectionShell";
import { AdvisorSnapshot } from "@/components/AdvisorSnapshot";
import { HoldingsTable } from "@/components/HoldingsTable";
import { ExposureMap } from "@/components/ExposureMap";
import { OverlapDetector } from "@/components/OverlapDetector";
import { StressTest } from "@/components/StressTest";
import { TICKERS } from "@/lib/portfolio";

export default function Page() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 py-8">
        <BriefingBanner />

        <SectionShell
          num="01"
          title="Advisor Snapshot"
          subtitle="Pre-meeting summary"
        >
          <AdvisorSnapshot />
        </SectionShell>

        <SectionShell
          num="02"
          title="Holdings Breakdown"
          subtitle="Position-level rationale & risk"
        >
          <HoldingsTable />
        </SectionShell>

        <SectionShell
          num="03"
          title="Exposure Map"
          subtitle="Where the portfolio actually sits"
        >
          <ExposureMap />
        </SectionShell>

        <SectionShell
          num="04"
          title="Overlap Detector"
          subtitle="Co-movement and thematic concentration"
        >
          <OverlapDetector />
        </SectionShell>

        <SectionShell
          num="05"
          title="Scenario Stress Test"
          subtitle="Directional moves under thematic shocks"
        >
          <StressTest />
        </SectionShell>

        <Footer />
      </main>
    </div>
  );
}

function BriefingBanner() {
  return (
    <div className="card relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
      <div className="pointer-events-none absolute -right-20 top-0 h-full w-72 bg-gradient-to-l from-accent-gold/10 to-transparent" />
      <div className="card-pad relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <span className="label-eyebrow">Client briefing</span>
          <h1 className="text-[22px] font-semibold tracking-tight text-ink">
            Concentrated growth book —{" "}
            <span className="text-accent-gold">technology &amp; semiconductors</span>{" "}
            tilt
          </h1>
          <p className="max-w-2xl text-[13px] leading-relaxed text-ink-muted">
            Four-position equal-weight sleeve. The objective of this briefing is
            to surface concentration, overlap, and scenario fragility before the
            client conversation — not to replace formal risk reporting.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {TICKERS.map((t) => (
            <span key={t} className="pill">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-gold" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-4 flex flex-col items-start justify-between gap-2 border-t border-line pt-6 text-[11px] text-ink-dim sm:flex-row sm:items-center">
      <span className="font-mono uppercase tracking-wider">
        Advisor Lens · internal use only · not investment advice
      </span>
      <span className="font-mono uppercase tracking-wider">
        Quotes: Yahoo Finance · Commentary: advisor-authored
      </span>
    </footer>
  );
}
