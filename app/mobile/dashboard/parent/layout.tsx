import type { ReactNode } from "react";
import { AppShell } from "../../_components/AppShell";

/** Parent section of the app (phone): top bar + bottom tabs around every parent page. */
export default function ParentLayout({ children }: { children: ReactNode }) {
  return <AppShell role="parent">{children}</AppShell>;
}
