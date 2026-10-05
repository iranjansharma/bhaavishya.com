import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** A phone outline used to show the app inside the website and previews. 300 × 620 px. */
export function PhoneFrame({
  children,
  time = "9:41",
  dark = false,
  className,
  screenClassName,
}: {
  children: ReactNode;
  time?: string;
  dark?: boolean;
  className?: string;
  screenClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-[300px] shrink-0 rounded-[46px] bg-[#0e0b22] p-[11px] shadow-[0_40px_80px_-30px_rgb(23_17_61/0.55),inset_0_0_0_1.5px_#3a3360]",
        className,
      )}
    >
      <div className="absolute top-5 left-1/2 z-10 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-[#0e0b22]" />
      <div className={cn("relative h-[598px] overflow-hidden rounded-[36px]", screenClassName ?? "bg-white")}>
        <div className={cn("flex h-11 items-end justify-between px-6 pb-1.5 text-[12.5px] font-bold", dark ? "text-white" : "text-ink")}>
          <span>{time}</span>
          <span className="tracking-tight">●●● 5G</span>
        </div>
        {children}
      </div>
    </div>
  );
}
