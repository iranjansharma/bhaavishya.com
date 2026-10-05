import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

const paddings = { none: "", sm: "p-4", md: "p-5", lg: "p-6" } as const;

/** White card with a soft border and shadow. Most dashboard content sits in one of these. */
export function Card({
  children,
  className,
  padding = "md",
}: {
  children: ReactNode;
  className?: string;
  padding?: keyof typeof paddings;
}) {
  return <section className={cn("rounded-2xl border border-line bg-white shadow-card", paddings[padding], className)}>{children}</section>;
}

/** Card title row: title on the left, a link / label / button on the right. */
export function CardHeader({ title, right, className }: { title: ReactNode; right?: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <h3 className="flex min-w-0 items-center gap-2 text-[15px] font-semibold tracking-[-0.01em] text-ink">{title}</h3>
      {typeof right === "string" ? <span className="shrink-0 text-xs font-medium text-ink-3">{right}</span> : right}
    </div>
  );
}

/** Small "View all →" style link. */
export function CardLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex shrink-0 items-center gap-1 text-[13px] font-semibold text-brand-600 hover:text-brand-700">
      {children}
      <Icon name="ArrowRight" className="size-3.5" />
    </Link>
  );
}
