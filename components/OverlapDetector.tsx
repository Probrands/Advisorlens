import { GitMerge } from "lucide-react";
import { OVERLAPS } from "@/lib/portfolio";

export function OverlapDetector() {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {OVERLAPS.map((o) => (
        <div key={o.title} className="card">
          <div className="card-pad flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="label-eyebrow">Detected overlap</span>
              <GitMerge className="h-3.5 w-3.5 text-accent-gold" />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {o.tickers.map((t, i) => (
                <span key={t} className="inline-flex items-center gap-2">
                  <span className="rounded-md border border-line-strong bg-bg-elev px-2.5 py-1 font-mono text-[12px] font-semibold tracking-wider text-ink">
                    {t}
                  </span>
                  {i < o.tickers.length - 1 ? (
                    <span aria-hidden className="font-mono text-ink-dim">
                      ──
                    </span>
                  ) : null}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[13px] font-medium text-ink">
                {o.title}
              </span>
              <p className="text-[13px] leading-relaxed text-ink-muted">
                {o.body}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
