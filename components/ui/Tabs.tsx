"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Simple tabs: pass labels and one panel per label. Panels can be server-rendered content. */
export function Tabs({ labels, panels, className }: { labels: string[]; panels: ReactNode[]; className?: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div role="tablist" className="grid rounded-xl bg-[#f0eef7] p-[3px]" style={{ gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))` }}>
        {labels.map((label, i) => (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-lg py-2 text-[13px] font-semibold transition-colors",
              active === i ? "bg-white text-ink shadow-[0_1px_3px_rgb(25_23_44/0.12)]" : "text-ink-3",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      {panels.map((panel, i) => (
        <div key={i} role="tabpanel" hidden={active !== i}>
          {panel}
        </div>
      ))}
    </div>
  );
}
