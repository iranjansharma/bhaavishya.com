"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type SegmentedProps = {
  options: string[];
  /** Controlled value (use together with onChange inside client components). */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: "sm" | "md";
  className?: string;
};

/** Pill-shaped tabs, e.g. Unit Test 1 · Unit Test 2 · Half-yearly. */
export function Segmented({ options, value, defaultValue, onChange, size = "md", className }: SegmentedProps) {
  const [inner, setInner] = useState(defaultValue ?? options[0]);
  const current = value ?? inner;
  return (
    <div role="tablist" className={cn("inline-flex gap-0.5 rounded-xl bg-[#f0eef7] p-[3px]", className)}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          role="tab"
          aria-selected={current === option}
          onClick={() => {
            setInner(option);
            onChange?.(option);
          }}
          className={cn(
            "rounded-lg font-semibold whitespace-nowrap transition-colors",
            size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-[12.5px]",
            current === option ? "bg-white text-ink shadow-[0_1px_3px_rgb(25_23_44/0.12)]" : "text-ink-3 hover:text-ink-2",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
