"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** On/off switch with a label. Keeps its own state (connect it to your form later). */
export function Toggle({ label, defaultOn = false, className }: { label?: ReactNode; defaultOn?: boolean; className?: string }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn((v) => !v)}
      className={cn("flex items-center gap-2.5 text-left text-[13px] text-ink-2", className)}
    >
      <span className={cn("relative h-[21px] w-9 shrink-0 rounded-full transition-colors", on ? "bg-brand-600" : "bg-ink-4/60")}>
        <span
          className={cn(
            "absolute top-[3px] size-[15px] rounded-full bg-white shadow-[0_1px_2px_rgb(0_0_0/0.2)] transition-all",
            on ? "left-[18px]" : "left-[3px]",
          )}
        />
      </span>
      {label}
    </button>
  );
}
