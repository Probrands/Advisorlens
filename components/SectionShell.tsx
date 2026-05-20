import type { ReactNode } from "react";

export function SectionShell({
  num,
  title,
  subtitle,
  right,
  children,
}: {
  num: string;
  title: string;
  subtitle?: string;
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-ink-dim">{num}</span>
          <div className="h-3 w-px bg-line" />
          <h2 className="text-[13px] font-semibold uppercase tracking-widerx text-ink">
            {title}
          </h2>
          {subtitle ? (
            <span className="hidden text-[12px] text-ink-muted sm:inline">
              · {subtitle}
            </span>
          ) : null}
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}
