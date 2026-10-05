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

/** DESKTOP · Live demo (/demo) — pick a role and enter the one app with sample data. */
export default function LiveDemoPage() {
  return (
    <div className="bg-night-glow -mb-px text-white">
      <div className="mx-auto max-w-[1280px] px-8 pt-14 pb-20">
        <div className="text-center">
          <span className="inline-flex h-[30px] items-center gap-1.5 rounded-full bg-white/10 px-3.5 text-xs font-semibold tracking-[0.08em] text-marigold-300">
            <Icon name="CirclePlay" className="size-3.5" /> LIVE DEMO · NO SIGNUP
          </span>
          <h1 className="mt-4 font-serif text-[58px] leading-tight font-semibold tracking-[-0.025em]">Step inside a real school day.</h1>
          <p className="mx-auto mt-3 max-w-[720px] text-[18px] leading-relaxed text-[#c7c0f0]">
            Explore <b className="text-white">{school.name}, {school.city}</b> — a demo school with {school.students.toLocaleString("en-IN")} students, {school.teachers} teachers and a
            full term of attendance, marks and notices. Pick a role to begin.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-6">
          {demoRoles.map((r) => {
            const s = STYLE[r.role];
            return (
              <article key={r.role} className="relative overflow-hidden rounded-[26px] bg-white/95 p-6 text-ink shadow-[0_40px_80px_-40px_rgb(0_0_0/0.7)]">
                <div className={cn("absolute inset-x-0 top-0 h-24 bg-linear-to-r", s.band)} />
                <span className={cn("relative inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11.5px] font-extrabold tracking-[0.1em] uppercase", s.text)}>
                  <Icon name={r.icon} className="size-3.5" />
                  {r.label}
                </span>
                <div className="relative mt-5 flex items-end gap-3.5">
                  <Avatar src={r.avatar} size={80} ring={4} />
                  <div className="pb-1.5">
                    <h2 className="text-[19px] font-bold">{r.person}</h2>
                    <p className="text-[13px] text-ink-3">{r.detail}</p>
                  </div>
                </div>
                <div className="mt-5 text-[11.5px] font-bold tracking-[0.08em] text-ink-3 uppercase">Try this</div>
                <ol className="mt-2.5 flex flex-col gap-2.5">
                  {r.tryThis.map((t, i) => (
                    <li key={t} className="flex items-center gap-2.5 text-sm text-ink-2">
                      <span className={cn("grid size-6 shrink-0 place-items-center rounded-lg text-xs font-extrabold", s.num)}>{i + 1}</span>
                      {t}
                    </li>
                  ))}
                </ol>
                <Button href={r.href} size="lg" variant={s.button} full iconRight="ArrowRight" className="mt-5">
                  Enter as {r.label}
                </Button>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center gap-7 text-[13.5px] text-[#b9b1ea]">
          <span className="flex items-center gap-2">
            <Icon name="RefreshCw" className="size-4" /> Demo data resets every night
          </span>
          <span className="flex items-center gap-2">
            <Icon name="Repeat" className="size-4" /> Switch roles any time from the top bar
          </span>
          <span className="flex items-center gap-2">
            <Icon name="Sparkles" className="size-4" /> Bhavi AI works in every role
          </span>
        </div>
      </div>
    </div>
  );
}
