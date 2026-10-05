import type { ReactNode } from "react";

/**
 * MOBILE VERSION — every page in this folder is what phones see.
 * proxy.ts sends phones here; the address bar still shows the normal address (/pricing, not /mobile/pricing).
 * On a big screen (when you preview with ?view=mobile) the page shows as a phone-width column.
 */
export default function MobileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#e9e6f2]">
      <div className="relative mx-auto min-h-dvh max-w-[480px] bg-white shadow-[0_0_60px_-20px_rgb(23_17_61/0.25)]">{children}</div>
    </div>
  );
}
