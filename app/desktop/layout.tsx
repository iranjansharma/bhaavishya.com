import type { ReactNode } from "react";

/**
 * DESKTOP VERSION — every page in this folder is what computers and tablets see.
 * proxy.ts sends them here; the address bar still shows the normal address (/pricing, not /desktop/pricing).
 */
export default function DesktopLayout({ children }: { children: ReactNode }) {
  return children;
}
