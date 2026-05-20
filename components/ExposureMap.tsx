import { EXPOSURES, type ExposureTone } from "@/lib/portfolio";

const TONE_STYLES: Record<
  ExposureTone,
  { bar: string; track: string; dot: string; label: string }
> = {
  tech: {
    bar: "from-tone-tech/90 to-tone-tech/40",
    track: "bg-tone-tech/10",
    dot: "bg-tone-tech",
    label: "text-tone-tech",
  },
  semi: {
    bar: "from-tone-semi/90 to-tone-semi/40",
    track: "bg-tone-semi/10",
    dot: "bg-tone-semi",
    label: "text-tone-semi",
  },
  health: {
    bar: "from-tone-health/90 to-tone-health/40",
    track: "bg-tone-health/10",
    dot: "bg-tone-health",
    label: "text-tone-health",
  },
  defense: {
    bar: "from-tone-defense/90 to-tone-defense/40",
    track: "bg-tone-defense/10",
    dot: "bg-tone-defense",
    label: "text-tone-defense",
  },
  risk: {
    bar: "from-accent-gold/90 to-accent-gold/40",
    track: "bg-accent-gold/10",
    dot: "bg-accent-gold",
    label: "text-accent-gold",
  },
  good: {
    bar: "from-tone-good/90 to-tone-good/40",
    track: "bg-tone-good/10",
    dot: "bg-tone-good",
    label: "text-tone-good",
  },
};

export function ExposureMap() {
  return (
    <div className="card">
      <div className="card-pad flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-[12px] text-ink-muted">
            Qualitative exposure read across the 4 positions. Not a factor model
            output — advisor judgement.
          </p>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-ink-dim">
            <Legend dot="bg-tone-tech" label="Growth" />
            <Legend dot="bg-tone-health" label="Defensive" />
            <Legend dot="bg-accent-gold" label="Risk" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
          {EXPOSURES.map((e) => {
            const t = TONE_STYLES[e.tone];
            return (
              <div key={e.label} className="flex flex-col gap-1.5 py-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
                    <span className="text-[12.5px] text-ink">{e.label}</span>
                  </div>
                  <span className={`num text-[12px] ${t.label}`}>
                    {e.value}%
                  </span>
                </div>
                <div className={`relative h-1.5 w-full rounded-full ${t.track}`}>
                  <div
                    className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${t.bar}`}
                    style={{ width: `${e.value}%` }}
                  />
                </div>
                <span className="text-[11px] text-ink-dim">{e.note}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      <span>{label}</span>
    </span>
  );
}
