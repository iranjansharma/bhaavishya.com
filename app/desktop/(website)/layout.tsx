import type { ReactNode } from "react";
import { ChatWidget } from "../_components/ChatWidget";
import { SiteFooter } from "../_components/SiteFooter";
import { SiteHeader } from "../_components/SiteHeader";

/** Desktop website frame: header, page, footer and the floating Bhavi chat button. */
export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-cream text-ink">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <ChatWidget />
    </div>
  );
}
