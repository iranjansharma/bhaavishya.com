import type { ReactNode } from "react";
import type { Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";
import { IconTile, Pill } from "./Pill";

/* Small shared pieces used by both versions. */

/** Attached file, e.g. "Medical_Certificate.pdf · 248 KB". */
export function FileChip({
  name,
  meta,
  kind = "pdf",
  right,
  className,
}: {
  name: string;
  meta?: string;
  kind?: "pdf" | "img" | "xls";
  right?: ReactNode;
  className?: string;
}) {
  const badge = {
    pdf: { label: "PDF", cls: "from-[#f2616b] to-[#d23a45]" },
    img: { label: "IMG", cls: "from-[#4fb6f5] to-ocean-500" },
    xls: { label: "XLS", cls: "from-[#2cc08b] to-[#0e9b6b]" },
  }[kind];
  return (
    <div className={cn("flex min-w-0 items-center gap-2.5 rounded-xl border border-line-2 bg-white px-3 py-2", className)}>
      <span className={cn("grid h-[38px] w-[34px] shrink-0 place-items-center rounded-[7px] bg-linear-to-b text-[9.5px] font-extrabold tracking-wide text-white", badge.cls)}>
        {badge.label}
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-semibold text-ink">{name}</div>
        {meta ? <div className="text-xs text-ink-3">{meta}</div> : null}
      </div>
      {right}
    </div>
  );
}

/** Date in a small square: 20 / OCT. */
export function DateBadge({ day, month, tone = "marigold", className }: { day: string; month: string; tone?: "marigold" | "brand"; className?: string }) {
  return (
    <span
      className={cn(
        "flex size-10 shrink-0 flex-col items-center justify-center rounded-xl leading-none",
        tone === "marigold" ? "bg-marigold-50 text-marigold-700" : "bg-brand-50 text-brand-600",
        className,
      )}
    >
      <b className="text-[15px] font-bold">{day}</b>
      <span className="mt-0.5 text-[9.5px] font-bold tracking-[0.06em] uppercase">{month}</span>
    </span>
  );
}

/** Big number with a label — used for KPI cards. */
export function Stat({
  icon,
  tone = "brand",
  label,
  value,
  suffix,
  foot,
  change,
  changeTone = "mint",
}: {
  icon?: IconName;
  tone?: Tone;
  label: ReactNode;
  value: ReactNode;
  suffix?: string;
  foot?: ReactNode;
  change?: string;
  changeTone?: Tone;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-[12.5px] font-semibold text-ink-3">
        {icon ? <IconTile icon={icon} tone={tone} size="sm" /> : null}
        {label}
      </div>
      <div className="mt-2 text-[28px] leading-none font-bold tracking-[-0.03em] text-ink tabular-nums">
        {value}
        {suffix ? <span className="text-[15px] font-semibold tracking-normal text-ink-3">{suffix}</span> : null}
      </div>
      {foot || change ? (
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-ink-3">
          {change ? <Pill tone={changeTone}>{change}</Pill> : null}
          {foot}
        </div>
      ) : null}
    </div>
  );
}

/** Small box with a label and a number (used in summaries). */
export function MiniStat({ label, value, tone, note }: { label: string; value: ReactNode; tone?: "coral" | "mint" | "marigold"; note?: string }) {
  const color = tone === "coral" ? "text-coral-700" : tone === "mint" ? "text-mint-700" : tone === "marigold" ? "text-marigold-700" : "text-ink";
  return (
    <div className="rounded-xl border border-line bg-[#faf9fd] px-3 py-2.5">
      <div className="text-[11px] font-semibold text-ink-3">{label}</div>
      <div className={cn("mt-0.5 text-[22px] leading-tight font-bold tracking-[-0.02em] tabular-nums", color)}>{value}</div>
      {note ? <div className="text-[11px] text-ink-3">{note}</div> : null}
    </div>
  );
}

/** UPPERCASE small heading. */
export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("text-[11.5px] font-bold tracking-[0.08em] text-ink-3 uppercase", className)}>{children}</div>;
}

/** Labelled text input. Uses defaultValue, so it works in server components; add `name` and wire it to your form. */
export function TextField({
  label,
  name,
  defaultValue,
  placeholder,
  icon,
  prefix,
  type = "text",
  className,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  icon?: IconName;
  prefix?: string;
  type?: "text" | "email" | "tel" | "date";
  className?: string;
}) {
  return (
    <label className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <span className="text-[12.5px] font-semibold text-ink-2">{label}</span>
      <span className="flex h-[42px] items-center gap-2.5 rounded-xl border border-line-2 bg-white px-3.5 focus-within:border-brand-600 focus-within:ring-4 focus-within:ring-brand-600/12">
        {icon ? <Icon name={icon} className="size-4 text-ink-3" /> : null}
        {prefix ? <span className="border-r border-line-2 pr-2.5 text-[13px] font-semibold text-ink">{prefix}</span> : null}
        <input
          name={name}
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-[13.5px] text-ink outline-none placeholder:text-ink-4"
        />
      </span>
    </label>
  );
}

/** Labelled multi-line text box. */
export function TextArea({ label, name, defaultValue, rows = 3, className }: { label: string; name: string; defaultValue?: string; rows?: number; className?: string }) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-[12.5px] font-semibold text-ink-2">{label}</span>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        className="resize-none rounded-xl border border-line-2 bg-white px-3.5 py-2.5 text-[13.5px] leading-relaxed text-ink outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-600/12"
      />
    </label>
  );
}

/** Label above any control (chips, toggles…). */
export function FieldLabel({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <div className="mb-1.5 text-[12.5px] font-semibold text-ink-2">
      {children}
      {hint ? <span className="font-medium text-ink-3"> · {hint}</span> : null}
    </div>
  );
}

/** Thin divider line. */
export function Divider({ className }: { className?: string }) {
  return <div className={cn("h-px bg-line", className)} />;
}
