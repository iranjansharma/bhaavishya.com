import type { Metadata } from "next";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { school } from "@/lib/demo-data";
import { demoRoles } from "@/lib/site-content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Live demo" };

const STYLE = {
  parent: { band: "from-marigold-100 to-marigold-300", text: "text-marigold-700", num: "bg-marigold-50 text-marigold-700", button: "marigold" },
  teacher: { band: "from-mint-100 to-[#9fe3c8]", text: "text-mint-700", num: "bg-mint-50 text-mint-700", button: "mint" },
  principal: { band: "from-brand-100 to-[#c9bcff]", text: "text-brand-600", num: "bg-brand-50 text-brand-600", button: "primary" },
} as const;

/** PHONE · Live demo (/demo) — pick a role and enter the one app with sample data. */
export default function LiveDemoPage() {
  return (
    <div className="bg-night-glow px-4 pt-8 pb-12 text-white">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-marigold-300">
          <Icon name="CirclePlay" className="size-3.5" /> LIVE DEMO · NO SIGNUP
        </span>
        <h1 className="mt-3.5 font-serif text-[34px] leading-[1.1] font-semibold tracking-[-0.02em]">Step inside a real school day.</h1>
        <p className="mt-2.5 text-[15px] leading-relaxed text-[#c7c0f0]">
          Explore <b className="text-white">{school.name}</b> — a demo school full of sample data. Pick a role to begin.
        </p>
      </div>

      <div className="mt-7 flex flex-col gap-4">
        {demoRoles.map((r) => {
          const s = STYLE[r.role];
          return (
            <article key={r.role} className="relative overflow-hidden rounded-3xl bg-white/95 p-5 text-ink">
              <div className={cn("absolute inset-x-0 top-0 h-[100px] bg-linear-to-r", s.band)} />
              <div className="relative flex items-end gap-3">
                <Avatar src={r.avatar} size={64} ring={4} />
                <div className="pb-1">
                  <span className={cn("text-[10.5px] font-extrabold tracking-[0.1em] uppercase", s.text)}>{r.label}</span>
                  <h2 className="text-[17px] leading-tight font-bold">{r.person}</h2>
                  <p className="text-xs text-ink-3">{r.detail}</p>
                </div>
              </div>
              <ol className="mt-4 flex flex-col gap-2">
                {r.tryThis.map((t, i) => (
                  <li key={t} className="flex items-center gap-2.5 text-[13.5px] text-ink-2">
                    <span className={cn("grid size-6 shrink-0 place-items-center rounded-lg text-xs font-extrabold", s.num)}>{i + 1}</span>
                    {t}
                  </li>
                ))}
              </ol>
              <Button href={r.href} size="lg" variant={s.button} full iconRight="ArrowRight" className="mt-4">
                Enter as {r.label}
              </Button>
            </article>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col items-center gap-2 text-[13px] text-[#b9b1ea]">
        <span className="flex items-center gap-2">
          <Icon name="RefreshCw" className="size-4" /> Demo data resets every night
        </span>
        <span className="flex items-center gap-2">
          <Icon name="Repeat" className="size-4" /> Switch roles any time from the menu
        </span>
      </div>
    </div>
  );
}
