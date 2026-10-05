import type { ReactNode } from "react";
import { AppShell } from "../../_components/AppShell";

/** Principal section of the app (desktop): sidebar + top bar around every principal page. */
export default function PrincipalLayout({ children }: { children: ReactNode }) {
  return <AppShell role="principal">{children}</AppShell>;
}
