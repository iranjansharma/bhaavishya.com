"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { LanguageSwitch, T, useLanguage } from "@/components/i18n/language";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { Logo, SchoolCrest } from "@/components/ui/brand";
import { school, users } from "@/lib/demo-data";
import { translate } from "@/lib/i18n";
import { isActive, roleInfo, sidebarNav } from "@/lib/navigation";
import { ROLES, type Role } from "@/lib/roles";
import { cn } from "@/lib/utils";
import { withoutViewPrefix } from "@/lib/view";

const ACCENT: Record<Role, { bar: string; icon: string }> = {
  parent: { bar: "bg-marigold-400", icon: "text-marigold-400" },
  teacher: { bar: "bg-mint-500", icon: "text-mint-500" },
  principal: { bar: "bg-brand-400", icon: "text-brand-400" },
};

/**
 * Desktop app frame: dark sidebar (menu for the current role) + top bar.
 * One app — the role decides which menu shows. Menus: lib/navigation.ts
 */
export function AppShell({ role, children }: { role: Role; children: ReactNode }) {
  const pathname = withoutViewPrefix(usePathname() ?? "/");
  const user = users[role];

  return (
    <div className="grid min-h-dvh grid-cols-[248px_minmax(0,1fr)] bg-canvas">
      <aside className="sticky top-0 flex h-dvh flex-col gap-1.5 overflow-y-auto bg-sidebar px-3.5 pt-5 pb-4 text-[#c9c3ee]">
        <div className="px-2 pb-3.5">
          <Logo light size={34} />
        </div>

        <div className="mb-2.5 flex items-center gap-2.5 rounded-[13px] border border-white/10 bg-white/5 px-2.5 py-2">
          <SchoolCrest size={26} />
          <div className="min-w-0 flex-1">
            <div className="truncate text-[12.8px] leading-tight font-semibold text-white">{school.name}</div>
            <div className="text-[11px] text-[#9c94d6]">
              {school.city} · {school.board} · {school.year}
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-0.5">
          {sidebarNav[role].map((section) => (
            <div key={section.title} className="flex flex-col gap-0.5">
              <div className="px-3 pt-2.5 pb-1 text-[10.5px] font-bold tracking-[0.1em] text-[#7a72b8] uppercase">{section.title}</div>
              {section.items.map((item) => {
                const active = isActive(pathname, item.href, role);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex items-center gap-3 rounded-[10px] px-3 py-2 text-[13.5px] transition-colors",
                      active ? "bg-white/10 font-semibold text-white" : "font-medium hover:bg-white/5 hover:text-white",
                    )}
                  >
                    {active ? <span className={cn("absolute top-2 bottom-2 -left-3.5 w-1 rounded-r", ACCENT[role].bar)} /> : null}
                    <Icon name={item.icon} className={cn("size-[17px]", active ? ACCENT[role].icon : "opacity-90")} />
                    <T k={item.label} />
                    {item.badge ? (
                      <span
                        className={cn(
                          "ml-auto rounded-full px-1.5 text-[11px] font-bold",
                          item.badgeTone === "ai" ? "bg-linear-to-r from-brand-400 to-marigold-400 text-night-950" : "bg-coral-500 text-white",
                        )}
                      >
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <Link
          href={`/dashboard/${role}/ask`}
          className="mt-auto block rounded-2xl border border-white/10 bg-[linear-gradient(150deg,rgb(142_115_255/0.35),rgb(255_176_32/0.18))] p-3.5"
        >
          <div className="flex items-center gap-1.5 text-[13.5px] font-semibold text-white">
            <Icon name="Sparkles" className="size-4" /> <T k="nav.ask" />
          </div>
          <p className="mt-1 mb-2.5 text-xs leading-snug text-[#cfc8f5]">Your school&apos;s AI assistant — in English, हिन्दी or मराठी.</p>
          <span className="flex h-[34px] items-center gap-2 rounded-[10px] bg-white/95 px-2.5 text-xs text-ink-3">
            <Icon name="MessageCircle" className="size-3.5" /> <T k="ui.askAnything" />
          </span>
        </Link>

        <div className="flex items-center gap-2.5 px-1.5 pt-3">
          <Avatar src={user.avatar} size={34} />
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13px] leading-tight font-semibold text-white">{user.name}</div>
            <div className="truncate text-[11.5px] text-[#9c94d6]">{user.subtitle}</div>
          </div>
          <Link href="/demo" aria-label="Log out" className="text-[#9c94d6] hover:text-white">
            <Icon name="LogOut" className="size-4" />
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <TopBar role={role} />
        <main className="flex flex-col gap-[18px] px-7 pt-[22px] pb-10">{children}</main>
      </div>
    </div>
  );
}

function TopBar({ role }: { role: Role }) {
  const { lang } = useLanguage();
  const user = users[role];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3.5 border-b border-line bg-white/80 px-7 backdrop-blur-md">
      <label className="flex h-10 w-[380px] items-center gap-2.5 rounded-xl border border-line-2 bg-white px-3 text-ink-3">
        <Icon name="Search" className="size-4" />
        <input placeholder={translate("ui.search", lang)} className="min-w-0 flex-1 bg-transparent text-[13.5px] text-ink outline-none placeholder:text-ink-3" />
        <kbd className="rounded-md border border-line-2 bg-[#faf9fd] px-1.5 py-0.5 text-[11px] font-semibold">Ctrl K</kbd>
      </label>
      <div className="flex-1" />
      <span className="inline-flex h-7 items-center gap-1.5 rounded-full border border-dashed border-[#f5c46a] bg-marigold-50 px-2.5 text-[11.5px] font-bold tracking-[0.02em] text-marigold-700">
        <Icon name="Play" className="size-3" /> <T k="ui.demo" />
      </span>
      <LanguageSwitch />
      <button type="button" aria-label="Notifications" className="relative grid size-10 place-items-center rounded-xl border border-line-2 bg-white text-ink-2">
        <Icon name="Bell" className="size-[18px]" />
        <span className="absolute -top-1 -right-1 grid h-[18px] min-w-[18px] place-items-center rounded-full border-2 border-white bg-coral-500 px-1 text-[10.5px] font-bold text-white">4</span>
      </button>

      <div className="relative">
        <button type="button" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} className="flex items-center gap-2.5 rounded-xl py-1 pr-1 pl-1.5 hover:bg-canvas">
          <Avatar src={user.avatar} size={38} />
          <div className="text-left">
            <div className="text-[13px] leading-tight font-semibold">{user.name}</div>
            <div className="text-[11.5px] text-ink-3">{user.subtitle}</div>
          </div>
          <Icon name="ChevronDown" className="size-4 text-ink-3" />
        </button>
        {menuOpen ? (
          <>
            <button type="button" aria-label="Close menu" className="fixed inset-0 z-10 cursor-default" onClick={() => setMenuOpen(false)} />
            <div className="absolute top-full right-0 z-20 mt-2 w-64 animate-rise rounded-2xl border border-line bg-white p-2 shadow-lift">
              <div className="px-2.5 pt-1.5 pb-1 text-[11px] font-bold tracking-[0.08em] text-ink-3 uppercase">
                <T k="nav.switchRole" />
              </div>
              {ROLES.map((r) => (
                <Link
                  key={r}
                  href={roleInfo[r].home}
                  onClick={() => setMenuOpen(false)}
                  className={cn("flex items-center gap-2.5 rounded-xl px-2.5 py-2 hover:bg-canvas", r === role && "bg-brand-50")}
                >
                  <Avatar src={users[r].avatar} size={30} />
                  <span className="flex-1 text-[13px]">
                    <b className="block leading-tight">{roleInfo[r].label}</b>
                    <span className="text-xs text-ink-3">{roleInfo[r].person}</span>
                  </span>
                  {r === role ? <Icon name="Check" className="size-4 text-brand-600" /> : null}
                </Link>
              ))}
              <div className="my-1.5 h-px bg-line" />
              <Link href="/" className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] hover:bg-canvas">
                <Icon name="Globe" className="size-4 text-ink-3" /> <T k="nav.website" />
              </Link>
              <a href="?view=mobile" className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] hover:bg-canvas">
                <Icon name="Smartphone" className="size-4 text-ink-3" /> Mobile version
              </a>
            </div>
          </>
        ) : null}
      </div>
    </header>
  );
}
