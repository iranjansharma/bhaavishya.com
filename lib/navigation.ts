import type { IconName } from "@/components/ui/icon-data";
import type { MessageKey } from "@/lib/i18n";
import type { Role } from "@/lib/roles";

/**
 * Menus for the one Bhavishya app. Both versions read from here:
 *   desktop → sidebar (sidebarNav)      mobile → bottom tabs (mobileTabs) + menu sheet (sidebarNav)
 * Adding a page? Create it in app/desktop/dashboard/... and app/mobile/dashboard/..., then add it here.
 */
export type NavItem = {
  label: MessageKey;
  href: string;
  icon: IconName;
  badge?: string;
  badgeTone?: "alert" | "ai";
};

export type NavSection = { title: string; items: NavItem[] };

export const roleInfo: Record<Role, { label: string; home: string; person: string }> = {
  parent: { label: "Parent", home: "/dashboard/parent", person: "Priya Sharma" },
  teacher: { label: "Teacher", home: "/dashboard/teacher", person: "Kavita Iyer" },
  principal: { label: "Principal", home: "/dashboard/principal", person: "Dr. Meenakshi Nair" },
};

const ask = (role: Role): NavItem => ({
  label: "nav.ask",
  href: `/dashboard/${role}/ask`,
  icon: "Sparkles",
  badge: "AI",
  badgeTone: "ai",
});

export const sidebarNav: Record<Role, NavSection[]> = {
  parent: [
    {
      title: "Aarav · Class 7-B",
      items: [
        { label: "nav.home", href: "/dashboard/parent", icon: "House" },
        { label: "nav.marks", href: "/dashboard/parent/marks", icon: "ChartColumn" },
        { label: "nav.attendanceHolidays", href: "/dashboard/parent/attendance", icon: "CalendarCheck" },
        { label: "nav.leave", href: "/dashboard/parent/leave", icon: "CalendarX" },
        { label: "nav.certificates", href: "/dashboard/parent/certificates", icon: "Award" },
      ],
    },
    { title: "Help", items: [ask("parent")] },
  ],
  teacher: [
    {
      title: "My day",
      items: [
        { label: "nav.today", href: "/dashboard/teacher", icon: "LayoutDashboard", badge: "3", badgeTone: "alert" },
        { label: "nav.attendance", href: "/dashboard/teacher/attendance", icon: "UserCheck" },
        { label: "nav.gradebook", href: "/dashboard/teacher/gradebook", icon: "BookOpen" },
        { label: "nav.homework", href: "/dashboard/teacher/homework", icon: "NotebookPen" },
      ],
    },
    { title: "Help", items: [ask("teacher")] },
  ],
  principal: [
    {
      title: "School",
      items: [
        { label: "nav.overview", href: "/dashboard/principal", icon: "LayoutDashboard", badge: "7", badgeTone: "alert" },
        { label: "nav.teachers", href: "/dashboard/principal/teachers", icon: "GraduationCap" },
        { label: "nav.announcements", href: "/dashboard/principal/announcements", icon: "Megaphone" },
      ],
    },
    { title: "Help", items: [ask("principal")] },
  ],
};

/** Phone tab bar: [tab, tab, (Bhavi button), tab, Menu]. */
export const mobileTabs: Record<Role, [NavItem, NavItem, NavItem]> = {
  parent: [
    { label: "nav.home", href: "/dashboard/parent", icon: "House" },
    { label: "nav.marksShort", href: "/dashboard/parent/marks", icon: "ChartColumn" },
    { label: "nav.attendance", href: "/dashboard/parent/attendance", icon: "CalendarCheck" },
  ],
  teacher: [
    { label: "nav.today", href: "/dashboard/teacher", icon: "LayoutDashboard" },
    { label: "nav.attendance", href: "/dashboard/teacher/attendance", icon: "UserCheck" },
    { label: "nav.gradebook", href: "/dashboard/teacher/gradebook", icon: "BookOpen" },
  ],
  principal: [
    { label: "nav.overview", href: "/dashboard/principal", icon: "LayoutDashboard" },
    { label: "nav.teachers", href: "/dashboard/principal/teachers", icon: "GraduationCap" },
    { label: "nav.notices", href: "/dashboard/principal/announcements", icon: "Megaphone" },
  ],
};

/** Is this menu item the current page? The role's home page only matches exactly. */
export function isActive(pathname: string, href: string, role: Role): boolean {
  if (href === roleInfo[role].home) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** The menu item for the current page (used for the phone header title). */
export function currentNavItem(role: Role, pathname: string): NavItem | undefined {
  return sidebarNav[role].flatMap((section) => section.items).find((item) => isActive(pathname, item.href, role));
}
