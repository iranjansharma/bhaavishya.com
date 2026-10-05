import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Title row at the top of every desktop app page. */
export function PageHeader({
  title,
  subtitle,
  actions,
  greeting = false,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  /** Larger serif title for home pages ("Good morning, Priya"). */
  greeting?: boolean;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className={cn(greeting ? "font-serif text-[30px] leading-tight font-semibold tracking-[-0.02em]" : "text-2xl font-bold tracking-[-0.025em]")}>{title}</h1>
        {subtitle ? <p className="mt-1 text-[13.5px] text-ink-3">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2.5">{actions}</div> : null}
    </div>
  );
}
