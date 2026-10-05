import { createElement } from "react";
import { cn } from "@/lib/utils";
import { ICONS, type IconName } from "./icon-data";

export type { IconName };

type IconProps = {
  name: IconName;
  /** Include a size class, e.g. "size-4". Defaults to size-5. */
  className?: string;
  strokeWidth?: number;
  /** Text for screen readers. Leave empty when the icon is decorative. */
  label?: string;
};

/** Line icons from Lucide (lucide.dev, ISC licence). Add more in icon-data.ts. */
export function Icon({ name, className, strokeWidth = 2, label }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className ?? "size-5")}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {ICONS[name].map(([tag, attrs], i) => createElement(tag, { key: i, ...attrs }))}
    </svg>
  );
}
