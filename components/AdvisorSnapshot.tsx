import { Compass, Shield, AlertTriangle, MessageSquare } from "lucide-react";
import { SNAPSHOT } from "@/lib/portfolio";

const CARDS = [
  {
    label: "Portfolio Theme",
    body: SNAPSHOT.theme,
    icon: Compass,
    accent: "text-tone-tech",
    rail: "from-tone-tech/60",
  },
  {
    label: "Main Strength",
    body: SNAPSHOT.strength,
    icon: Shield,
    accent: "text-tone-good",
    rail: "from-tone-good/60",
  },
  {
    label: "Main Concern",
    body: SNAPSHOT.concern,
    icon: AlertTriangle,
    accent: "text-accent-gold",
    rail: "from-accent-gold/60",
  },
  {
    label: "Suggested Discussion",
    body: SNAPSHOT.discussion,
    icon: MessageSquare,
    accent: "text-tone-defense",
    rail: "from-tone-defense/60",
  },
] as const;

export function AdvisorSnapshot() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {CARDS.map(({ label, body, icon: Icon, accent, rail }) => (
        <div
          key={label}
          className="card relative overflow-hidden transition hover:border-line-strong"
        >
          <div
            className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r ${rail} via-transparent to-transparent`}
          />
          <div className="card-pad flex h-full flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="label-eyebrow">{label}</span>
              <Icon className={`h-3.5 w-3.5 ${accent}`} strokeWidth={2} />
            </div>
            <p className="text-[13.5px] leading-relaxed text-ink">{body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
