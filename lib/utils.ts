/** Joins class names, skipping empty ones: cn("a", isOn && "b") → "a b" */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** 254150 → "₹2,54,150" (Indian digit grouping) */
export function formatINR(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

/** 1248 → "1,248" */
export function formatNumber(value: number): string {
  return value.toLocaleString("en-IN");
}
