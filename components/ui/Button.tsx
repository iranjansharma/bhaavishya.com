import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

const variants = {
  primary: "bg-linear-to-b from-brand-500 to-brand-600 text-white shadow-glow hover:to-brand-700",
  secondary: "border border-line-2 bg-white text-ink hover:border-ink-4",
  dark: "bg-night-900 text-white hover:bg-night-800",
  marigold: "bg-marigold-400 text-night-950 hover:bg-marigold-300",
  mint: "bg-mint-500 text-white hover:bg-mint-700",
  soft: "bg-brand-50 text-brand-600 hover:bg-brand-100",
  glass: "border border-white/25 bg-white/10 text-white hover:bg-white/15",
  ghost: "text-ink-2 hover:bg-canvas",
} as const;

const sizes = {
  xs: "h-7 gap-1.5 rounded-lg px-2.5 text-xs",
  sm: "h-8 gap-1.5 rounded-[9px] px-3 text-[13px]",
  md: "h-10 gap-2 rounded-xl px-4 text-sm",
  lg: "h-12 gap-2 rounded-2xl px-6 text-[15px]",
} as const;

export type ButtonProps = {
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Give an href to make the button a link. */
  href?: string;
  icon?: IconName;
  iconRight?: IconName;
  full?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  /** Only usable inside client components ("use client"). */
  onClick?: () => void;
  className?: string;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  icon,
  iconRight,
  full,
  type = "button",
  disabled,
  onClick,
  className,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-semibold whitespace-nowrap transition-colors disabled:opacity-50",
    variants[variant],
    sizes[size],
    full && "w-full",
    className,
  );
  const iconClass = size === "lg" ? "size-[18px]" : size === "xs" ? "size-3.5" : "size-4";
  const content = (
    <>
      {icon ? <Icon name={icon} className={iconClass} /> : null}
      {children}
      {iconRight ? <Icon name={iconRight} className={iconClass} /> : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  );
}
