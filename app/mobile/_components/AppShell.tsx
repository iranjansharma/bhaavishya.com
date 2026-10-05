"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { LanguageSwitch, T } from "@/components/i18n/language";
import { Avatar } from "@/components/ui/Avatar";
import { Icon, type IconName } from "@/components/ui/Icon";
import { LogoMark, SchoolCrest } from "@/components/ui/brand";
import { school, users } from "@/lib/demo-data";
import { currentNavItem, isActive, mobileTabs, roleInfo, sidebarNav } from "@/lib/navigation";
import { ROLES, type Role } from "@/lib/roles";
import { cn } from "@/lib/utils";
import { withoutViewPrefix } from "@/lib/view";

const ACCENT: Record<Role, string> = {
  parent: "text-marigold-500",
  teacher: "text-mint-500",
  principal: "text-brand-600",
};

/**
 * Phone app frame: top bar, bottom tab bar with the Bhavi button in the middle, and a Menu sheet.
 * One app — the role decides which tabs and menu items show. Menus: lib/navigation.ts
 */
export function AppShell({ role, children }: { role: Role; children: ReactNode }) {
  const pathname = withoutViewPrefix(usePathname() ?? "/");
  const [menuOpen, setMenuOpen] = useState(false);
  const home = roleInfo[role].home;
  const onHome = pathname === home;
  const current = currentNavItem(role, pathname);
  const user = users[role];
  const [tab1, tab2, tab3] = mobileTabs[role];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="min-h-dvh bg-canvas pb-[calc(84px+env(safe-area-inset-bottom))]">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-2.5 border-b border-line bg-white/90 px-4 backdrop-blur-md">
        {onHome ? (
          <div className="flex min-w-0 items-center gap-2">
            <SchoolCrest size={24} />
            <div className="min-w-0 leading-tight">
              <div className="truncate text-[13.5px] font-semibold">{school.name}</div>
              <div className="text-[11px] text-ink-3">
                {school.city} · {school.year}
              </div>
            </div>
          </div>
        ) : (
          <>
            <Link href={home} aria-label="Back to home" className="-ml-1.5 grid size-9 place-items-center rounded-xl text-ink">
              <Icon name="ChevronLeft" className="size-6" />
            </Link>
            <h1 className="min-w-0 truncate text-[16px] font-bold">{current ? <T k={current.label} /> : null}</h1>
          </>
        )}
        <div className="ml-auto flex items-center gap-1.5">
          <button type="button" aria-label="Notifications" className="relative grid size-9 place-items-center rounded-xl text-ink-2">
            <Icon name="Bell" className="size-5" />
            <span className="absolute top-1 right-1 size-2.5 rounded-full border-2 border-white bg-coral-500" />
          </button>
          <button type="button" aria-label="Open menu" onClick={() => setMenuOpen(true)} className="rounded-full">
            <Avatar src={user.avatar} size={32} />
          </button>
        </div>
      </header>

      <main className="flex flex-col gap-4 px-4 pt-4 pb-6">{children}</main>

      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-30 mx-auto grid max-w-[480px] grid-cols-5 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
      >
        {[tab1, tab2].map((item) => (
          <Tab key={item.href} href={item.href} icon={item.icon} label={<T k={item.label} />} active={isActive(pathname, item.href, role)} accent={ACCENT[role]} />
        ))}
        <Link href={`/dashboard/${role}/ask`} className="flex flex-col items-center gap-0.5 pt-0.5 text-[10.5px] font-semibold text-ink-3">
          <span className="-mt-5 grid size-[52px] place-items-center rounded-full bg-linear-to-br from-[#7b5cff] to-brand-700 text-white shadow-[0_10px_20px_-8px_rgb(81_52_232/0.7)] ring-4 ring-white">
            <Icon name="Sparkles" className="size-[22px]" />
          </span>
          <T k="nav.bhavi" />
        </Link>
        <Tab href={tab3.href} icon={tab3.icon} label={<T k={tab3.label} />} active={isActive(pathname, tab3.href, role)} accent={ACCENT[role]} />
        <button type="button" onClick={() => setMenuOpen(true)} className="flex h-16 flex-col items-center justify-center gap-1 text-[10.5px] font-semibold text-ink-3">
          <Icon name="Menu" className="size-[22px]" />
          <T k="nav.menu" />
        </button>
      </nav>

      {menuOpen ? <MenuSheet role={role} pathname={pathname} onClose={() => setMenuOpen(false)} /> : null}
    </div>
  );
}

function Tab({ href, icon, label, active, accent }: { href: string; icon: IconName; label: ReactNode; active: boolean; accent: string }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn("flex h-16 flex-col items-center justify-center gap-1 text-[10.5px] font-semibold", active ? accent : "text-ink-3")}
    >
      <Icon name={icon} className="size-[22px]" strokeWidth={active ? 2.4 : 2} />
      <span className="max-w-full truncate px-1">{label}</span>
    </Link>
  );
}

function MenuSheet({ role, pathname, onClose }: { role: Role; pathname: string; onClose: () => void }) {
  const user = users[role];
  return (
    <div className="fixed inset-0 z-50 mx-auto max-w-[480px]" role="dialog" aria-modal="true" aria-label="Menu">
      <button type="button" aria-label="Close menu" className="absolute inset-0 bg-night-950/45" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 max-h-[88dvh] animate-rise overflow-y-auto rounded-t-[28px] bg-white px-4 pt-2 pb-[calc(20px+env(safe-area-inset-bottom))] shadow-float">
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-line-2" />
        <div className="flex items-center gap-3 rounded-2xl bg-canvas p-3">
          <Avatar src={user.avatar} size={44} />
          <div className="min-w-0 flex-1">
            <div className="truncate font-semibold">{user.name}</div>
            <div className="truncate text-xs text-ink-3">{user.subtitle}</div>
          </div>
          <button type="button" aria-label="Close menu" onClick={onClose} className="grid size-9 place-items-center rounded-xl text-ink-2">
            <Icon name="X" className="size-5" />
          </button>
        </div>

        {sidebarNav[role].map((section) => (
          <div key={section.title} className="mt-4">
            <div className="px-1 pb-1.5 text-[11px] font-bold tracking-[0.08em] text-ink-3 uppercase">{section.title}</div>
            <div className="overflow-hidden rounded-2xl border border-line">
              {section.items.map((item) => {
                const active = isActive(pathname, item.href, role);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn("flex items-center gap-3 border-b border-line px-3.5 py-3 text-[14.5px] last:border-0", active ? "bg-brand-50 font-semibold text-brand-600" : "text-ink")}
                  >
                    <Icon name={item.icon} className="size-5" />
                    <span className="flex-1">
                      <T k={item.label} />
                    </span>
                    {item.badge ? (
                      <span className={cn("rounded-full px-1.5 text-[11px] font-bold", item.badgeTone === "ai" ? "bg-brand-50 text-brand-600" : "bg-coral-500 text-white")}>
                        {item.badge}
                      </span>
                    ) : (
                      <Icon name="ChevronRight" className="size-4 text-ink-4" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        <div className="mt-4 flex items-center justify-between rounded-2xl border border-line px-3.5 py-2.5">
          <span className="flex items-center gap-2.5 text-[14.5px]">
            <Icon name="Languages" className="size-5" /> <T k="ui.language" />
          </span>
          <LanguageSwitch />
        </div>

        <div className="mt-4 px-1 pb-1.5 text-[11px] font-bold tracking-[0.08em] text-ink-3 uppercase">
          <T k="nav.switchRole" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {ROLES.map((r) => (
            <Link
              key={r}
              href={roleInfo[r].home}
              onClick={onClose}
              className={cn("flex flex-col items-center gap-1.5 rounded-2xl border px-2 py-3 text-xs font-semibold", r === role ? "border-brand-200 bg-brand-50 text-brand-600" : "border-line text-ink-2")}
            >
              <Avatar src={users[r].avatar} size={36} />
              {roleInfo[r].label}
            </Link>
          ))}
        </div>

        <div className="mt-4 flex flex-col overflow-hidden rounded-2xl border border-line text-[14.5px]">
          <Link href="/" onClick={onClose} className="flex items-center gap-3 border-b border-line px-3.5 py-3">
            <LogoMark size={20} /> <T k="nav.website" />
          </Link>
          {/* Plain <a> on purpose: proxy.ts sees ?view=desktop and remembers the choice. */}
          <a href="?view=desktop" className="flex items-center gap-3 border-b border-line px-3.5 py-3">
            <Icon name="Monitor" className="size-5" /> Desktop version
          </a>
          <Link href="/demo" onClick={onClose} className="flex items-center gap-3 px-3.5 py-3 text-coral-700">
            <Icon name="LogOut" className="size-5" /> <T k="nav.logout" />
          </Link>
        </div>
      </div>
    </div>
  );
}
