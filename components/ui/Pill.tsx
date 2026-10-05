import type { ReactNode } from "react";
import { pillTone, softTone, type Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

/** Small rounded label: "Present", "Grade A2", "New"… */
export function Pill({ tone = "grey", icon, children, className }: { tone?: Tone; icon?: IconName; children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs leading-5 font-semibold whitespace-nowrap", pillTone[tone], className)}>
      {icon ? <Icon name={icon} className="size-3.5" /> : null}
      {children}
    </span>
  );
}

const tileSizes = {
  sm: { box: "size-7 rounded-lg", icon: "size-3.5" },
  md: { box: "size-[34px] rounded-[10px]", icon: "size-4" },
  lg: { box: "size-11 rounded-xl", icon: "size-5" },
} as const;

/** An icon inside a tinted rounded square. */
export function IconTile({ icon, tone = "brand", size = "md", className }: { icon: IconName; tone?: Tone; size?: keyof typeof tileSizes; className?: string }) {
  return (
    <span className={cn("grid shrink-0 place-items-center", tileSizes[size].box, softTone[tone], className)}>
      <Icon name={icon} className={tileSizes[size].icon} />
    </span>
  );
}

/** Coloured dot, e.g. for chart legends. */
export function Dot({ className }: { className: string }) {
  return <span className={cn("inline-block size-2 shrink-0 rounded-full", className)} />;
}
