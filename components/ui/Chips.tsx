"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

const chipBase = "inline-flex items-center gap-1.5 rounded-full border font-medium whitespace-nowrap transition-colors";
const chipSizes = { sm: "h-8 px-3 text-[12.5px]", md: "h-[34px] px-3.5 text-[13px]" } as const;

/** A single static chip (no state). Use ChipGroup when people can pick. */
export function Chip({
  children,
  active,
  warn,
  icon,
  size = "md",
}: {
  children: string;
  active?: boolean;
  warn?: boolean;
  icon?: IconName;
  size?: keyof typeof chipSizes;
}) {
  return (
    <span
      className={cn(
        chipBase,
        chipSizes[size],
        warn ? "border-coral-100 bg-coral-50 text-coral-700" : active ? "border-brand-200 bg-brand-50 text-brand-600" : "border-line-2 bg-white text-ink-2",
      )}
    >
      {icon ? <Icon name={icon} className="size-3.5" /> : null}
      {children}
    </span>
  );
}

/** Pick one (or several, with `multiple`) of a set of options. */
export function ChipGroup({
  options,
  defaultValue,
  multiple = false,
  size = "md",
  label,
  wrap = true,
  className,
}: {
  options: string[];
  defaultValue?: string | string[];
  multiple?: boolean;
  size?: keyof typeof chipSizes;
  label?: string;
  /** false keeps the chips on one line (put the group in a scrolling row on phones). */
  wrap?: boolean;
  className?: string;
}) {
  const initial = Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : [];
  const [selected, setSelected] = useState<string[]>(initial);

  const toggle = (option: string) => {
    setSelected((current) => {
      if (!multiple) return [option];
      return current.includes(option) ? current.filter((o) => o !== option) : [...current, option];
    });
  };

  return (
    <div role="group" aria-label={label} className={cn("flex gap-2", wrap ? "flex-wrap" : "w-max", className)}>
      {options.map((option) => {
        const on = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            aria-pressed={on}
            onClick={() => toggle(option)}
            className={cn(chipBase, chipSizes[size], on ? "border-brand-200 bg-brand-50 text-brand-600" : "border-line-2 bg-white text-ink-2 hover:border-ink-4")}
          >
            {on ? <Icon name="Check" className="size-3.5" /> : null}
            {option}
          </button>
        );
      })}
    </div>
  );
}
