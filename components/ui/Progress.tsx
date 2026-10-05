import { solidTone, type Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";

/** Horizontal progress bar. Optional `marker` draws a thin tick (e.g. the class average). */
export function Progress({
  value,
  tone = "brand",
  size = "md",
  marker,
  className,
}: {
  value: number;
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  marker?: number;
  className?: string;
}) {
  const clamp = (n: number) => Math.min(100, Math.max(0, n));
  return (
    <div className={cn("relative rounded-full bg-track", size === "sm" ? "h-1.5" : size === "lg" ? "h-2.5" : "h-2", className)}>
      <div className={cn("h-full rounded-full", solidTone[tone])} style={{ width: `${clamp(value)}%` }} />
      {marker !== undefined ? (
        <span className="absolute -top-1 h-4 w-0.5 rounded-full bg-ink/55" style={{ left: `${clamp(marker)}%` }} aria-hidden />
      ) : null}
    </div>
  );
}
