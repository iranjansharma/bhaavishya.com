import type { ReactNode } from "react";
import { AppShell } from "../../_components/AppShell";

/** Teacher section of the app (phone): top bar + bottom tabs around every teacher page. */
export default function TeacherLayout({ children }: { children: ReactNode }) {
  return <AppShell role="teacher">{children}</AppShell>;
}
