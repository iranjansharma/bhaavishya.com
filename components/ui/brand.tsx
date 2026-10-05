import Link from "next/link";
import { brand } from "@/lib/site-content";
import { cn } from "@/lib/utils";

/** The Bhavishya mark (sun rising over an open book). File: public/logo.svg */
export function LogoMark({ size = 36, className }: { size?: number; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/logo.svg" alt="" width={size} height={size} style={{ width: size, height: size }} className={cn("shrink-0", className)} />;
}

/** Mark + name + tagline. `light` for dark backgrounds. */
export function Logo({ size = 40, light = false, tagline = true, href = "/" }: { size?: number; light?: boolean; tagline?: boolean; href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5" aria-label={`${brand.name} home`}>
      <LogoMark size={size} />
      <span className="leading-none">
        <span className={cn("block font-serif font-bold tracking-[-0.015em]", size >= 38 ? "text-[23px]" : "text-[20px]", light ? "text-white" : "text-ink")}>
          {brand.name}
        </span>
        {tagline ? <span className={cn("mt-1 block text-[10.5px] tracking-[0.02em]", light ? "text-[#a9a0e0]" : "text-ink-3")}>{brand.tagline}</span> : null}
      </span>
    </Link>
  );
}

/** Demo school crest (green shield). Replace with the school's own logo. */
export function SchoolCrest({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={Math.round(size * 1.1)} viewBox="0 0 40 44" aria-hidden className="shrink-0">
      <path d="M20 2 L36 7 V20 C36 31 28.5 38.5 20 42 C11.5 38.5 4 31 4 20 V7 Z" fill="#0F6B4F" />
      <path d="M20 5.4 L33 9.5 V20 C33 29.4 26.8 35.6 20 38.6 C13.2 35.6 7 29.4 7 20 V9.5 Z" fill="none" stroke="#FFC94D" strokeWidth="1.2" />
      <path d="M20 11 C26.5 14.5 27.5 21.5 20 27.5 C12.5 21.5 13.5 14.5 20 11 Z" fill="#7EE0B5" />
      <path d="M20 13 V28" stroke="#0F6B4F" strokeWidth="1.2" />
      <path d="M11 29 C14 28 17 28.4 20 30 C23 28.4 26 28 29 29 V32.6 C26 31.8 23 32.2 20 33.8 C17 32.2 14 31.8 11 32.6 Z" fill="#fff" />
    </svg>
  );
}

/**
 * Placeholder QR code (a fixed pattern from `value`).
 * For real certificates, generate a scannable code with a library such as `qrcode`.
 */
export function QrCode({ value, size = 56 }: { value: string; size?: number }) {
  const n = 25;
  let seed = 0;
  for (const ch of value) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  const random = () => {
    seed = (seed + 0x6d2b79f5) >>> 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const inFinder = (x: number, y: number) => (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9);
  const cells: Array<[number, number]> = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (!inFinder(x, y) && random() < 0.48) cells.push([x, y]);
    }
  }
  const finder = (x: number, y: number) => (
    <g key={`f${x}-${y}`}>
      <rect x={x} y={y} width={7} height={7} fill="#19172C" />
      <rect x={x + 1} y={y + 1} width={5} height={5} fill="#fff" />
      <rect x={x + 2} y={y + 2} width={3} height={3} fill="#19172C" />
    </g>
  );
  return (
    <svg width={size} height={size} viewBox={`-1 -1 ${n + 2} ${n + 2}`} shapeRendering="crispEdges" role="img" aria-label="QR code" className="shrink-0">
      <rect x={-1} y={-1} width={n + 2} height={n + 2} fill="#fff" />
      <g fill="#19172C">
        {cells.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} />
        ))}
      </g>
      {finder(0, 0)}
      {finder(n - 7, 0)}
      {finder(0, n - 7)}
    </svg>
  );
}
