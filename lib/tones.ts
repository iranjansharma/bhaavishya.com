/**
 * Colour "tones" used across the template. Each tone maps to ready-made Tailwind classes,
 * so components can say tone="mint" instead of repeating colour classes everywhere.
 * The colours themselves are defined once in app/globals.css.
 */
export type Tone = "brand" | "mint" | "coral" | "marigold" | "ocean" | "rose" | "teal" | "grey" | "dark";

/** Small coloured labels (Pill). */
export const pillTone: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-600",
  mint: "bg-mint-50 text-mint-700",
  coral: "bg-coral-50 text-coral-700",
  marigold: "bg-marigold-50 text-marigold-700",
  ocean: "bg-ocean-50 text-ocean-700",
  rose: "bg-rose-50 text-rose-500",
  teal: "bg-teal-50 text-teal-500",
  grey: "bg-canvas text-ink-2",
  dark: "bg-night-900 text-white",
};

/** Icon inside a tinted square (IconTile). */
export const softTone: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-600",
  mint: "bg-mint-50 text-mint-500",
  coral: "bg-coral-50 text-coral-500",
  marigold: "bg-marigold-50 text-marigold-500",
  ocean: "bg-ocean-50 text-ocean-500",
  rose: "bg-rose-50 text-rose-500",
  teal: "bg-teal-50 text-teal-500",
  grey: "bg-canvas text-ink-2",
  dark: "bg-night-900 text-white",
};

/** Solid fills for bars and dots. */
export const solidTone: Record<Tone, string> = {
  brand: "bg-brand-600",
  mint: "bg-mint-500",
  coral: "bg-coral-500",
  marigold: "bg-marigold-400",
  ocean: "bg-ocean-500",
  rose: "bg-rose-500",
  teal: "bg-teal-500",
  grey: "bg-ink-4",
  dark: "bg-night-900",
};

/** Hex values for SVG charts. Keep in sync with app/globals.css. */
export const hexTone: Record<Tone, string> = {
  brand: "#5134E8",
  mint: "#12B886",
  coral: "#EF4E5A",
  marigold: "#FFB020",
  ocean: "#2F80ED",
  rose: "#C2417B",
  teal: "#0E9AA7",
  grey: "#B8B5CB",
  dark: "#17113D",
};
