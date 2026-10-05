import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
 * Lightweight SVG charts — no chart library needed. They scale to the width of their container.
 * Want interactive charts (hover, tooltips)? Swap these for a library such as Recharts later.
 */

type Point = [number, number];

/** Smooth curve through points (Catmull-Rom → Bézier). */
function smoothPath(points: Point[]): string {
  if (points.length < 2) return "";
  let d = `M${points[0][0].toFixed(1)},${points[0][1].toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1: Point = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Point = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}

export type LineSeries = {
  values: number[];
  color: string;
  area?: boolean;
  dashed?: boolean;
  dots?: boolean;
  endDot?: boolean;
  width?: number;
};

/** Line chart with optional shaded area, dashed comparison line and dots. `id` must be unique on the page. */
export function LineChart({
  id,
  labels,
  series,
  min,
  max,
  ticks,
  tickSuffix = "",
  width = 640,
  height = 220,
  padding = [12, 16, 26, 40],
  className,
}: {
  id: string;
  labels: string[];
  series: LineSeries[];
  min: number;
  max: number;
  ticks: number[];
  tickSuffix?: string;
  width?: number;
  height?: number;
  padding?: [number, number, number, number];
  className?: string;
}) {
  const [top, right, bottom, left] = padding;
  const innerW = width - left - right;
  const innerH = height - top - bottom;
  const x = (i: number) => left + (labels.length > 1 ? (innerW * i) / (labels.length - 1) : innerW / 2);
  const y = (v: number) => top + innerH * (1 - (v - min) / (max - min));

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={cn("h-auto w-full overflow-visible", className)} role="img" aria-label="Line chart">
      <defs>
        {series.map((s, k) =>
          s.area ? (
            <linearGradient key={k} id={`${id}-area-${k}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={s.color} stopOpacity={0.22} />
              <stop offset="1" stopColor={s.color} stopOpacity={0} />
            </linearGradient>
          ) : null,
        )}
      </defs>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={left} x2={width - right} y1={y(t)} y2={y(t)} stroke="#EEEBF5" strokeDasharray="3 4" />
          <text x={left - 10} y={y(t) + 4} textAnchor="end" fontSize={11} fill="#9A97B4">
            {t}
            {tickSuffix}
          </text>
        </g>
      ))}
      {labels.map((label, i) =>
        label ? (
          <text key={`${label}-${i}`} x={x(i)} y={height - 6} textAnchor="middle" fontSize={11} fill="#9A97B4">
            {label}
          </text>
        ) : null,
      )}
      {series.map((s, k) => {
        const points: Point[] = s.values.map((v, i) => [x(i), y(v)]);
        const d = smoothPath(points);
        const last = points[points.length - 1];
        return (
          <g key={k}>
            {s.area ? <path d={`${d} L${last[0]},${top + innerH} L${points[0][0]},${top + innerH} Z`} fill={`url(#${id}-area-${k})`} /> : null}
            <path d={d} fill="none" stroke={s.color} strokeWidth={s.width ?? 2.6} strokeLinecap="round" strokeDasharray={s.dashed ? "5 5" : undefined} />
            {s.dots ? points.map(([px, py], i) => <circle key={i} cx={px} cy={py} r={4} fill="#fff" stroke={s.color} strokeWidth={2.4} />) : null}
            {s.endDot ? <circle cx={last[0]} cy={last[1]} r={5.5} fill={s.color} stroke="#fff" strokeWidth={2.5} /> : null}
          </g>
        );
      })}
    </svg>
  );
}

/** Tiny trend line without axes. */
export function Sparkline({ id, values, color, width = 90, height = 28 }: { id: string; values: number[]; color: string; width?: number; height?: number }) {
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const range = hi - lo || 1;
  const points: Point[] = values.map((v, i) => [2 + ((width - 4) * i) / (values.length - 1), 3 + (height - 6) * (1 - (v - lo) / range)]);
  const d = smoothPath(points);
  const last = points[points.length - 1];
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden className="block shrink-0">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity={0.25} />
          <stop offset="1" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={`${d} L${last[0]},${height} L${points[0][0]},${height} Z`} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <circle cx={last[0]} cy={last[1]} r={3} fill={color} />
    </svg>
  );
}

/** Circular progress ring with content in the middle. Pass several parts for a split ring. */
export function Ring({
  parts,
  size = 96,
  stroke = 10,
  track = "#EFEDF6",
  children,
}: {
  parts: Array<{ value: number; color: string }>;
  size?: number;
  stroke?: number;
  track?: string;
  children?: ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  const gap = parts.length > 1 ? 2 : 0;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        {parts.map((part, i) => {
          const length = (c * part.value) / 100;
          const el = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={part.color}
              strokeWidth={stroke}
              strokeLinecap={parts.length > 1 ? "butt" : "round"}
              strokeDasharray={`${Math.max(length - gap, 0.1).toFixed(1)} ${c.toFixed(1)}`}
              strokeDashoffset={(-offset).toFixed(1)}
            />
          );
          offset += length;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
    </div>
  );
}

/** Coral → amber → mint colour for a percentage (used by the attendance heatmap). */
export function heatColor(value: number, low = 84, high = 98): string {
  const stops: Array<[number, [number, number, number]]> = [
    [0, [239, 78, 90]],
    [0.45, [255, 176, 32]],
    [1, [18, 184, 134]],
  ];
  const t = Math.max(0, Math.min(1, (value - low) / (high - low)));
  for (let i = 0; i < stops.length - 1; i++) {
    const [a, ca] = stops[i];
    const [b, cb] = stops[i + 1];
    if (t >= a && t <= b) {
      const f = (t - a) / (b - a);
      const mix = ca.map((v, j) => Math.round(v + (cb[j] - v) * f));
      return `rgb(${mix[0]} ${mix[1]} ${mix[2]})`;
    }
  }
  return "rgb(18 184 134)";
}

/** Simple vertical bars with the value on top (e.g. grade distribution). */
export function Histogram({
  items,
  height = 110,
}: {
  items: Array<{ label: string; value: number; color: string }>;
  height?: number;
}) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {items.map((item) => (
        <div key={item.label} className="flex flex-1 flex-col items-center gap-1">
          <b className="text-[11px] text-ink tabular-nums">{item.value}</b>
          <div className="w-full rounded-t-[7px] rounded-b-[3px]" style={{ height: Math.max(4, ((height - 36) * item.value) / max), background: item.color }} />
          <span className="text-[11px] font-semibold text-ink-3">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
