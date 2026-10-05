import type { ReactNode } from "react";
import { LanguageProvider } from "@/components/i18n/language";

/** The one Bhavishya app (phone). The language choice is shared by all three roles. */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
