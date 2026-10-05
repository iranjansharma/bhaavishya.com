import { BhaviShowcase, HeroDashboardCard, LockScreenNotifications, ParentMini, PrincipalMini, TeacherMini } from "@/components/blocks/previews";
import { Ring } from "@/components/charts";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { IconTile } from "@/components/ui/Pill";
import { PhoneFrame } from "@/components/ui/Phone";
import { bhaviPoints, features, goLiveSteps, hero, roleCards, stats, trustPoints } from "@/lib/site-content";
import { hexTone } from "@/lib/tones";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** DESKTOP · Home page (/) — all text comes from lib/site-content.ts */
export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-12 pb-20">
        <div className="bg-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_70%_at_72%_40%,#000_0%,transparent_75%)]" />
        <div className="relative mx-auto grid max-w-[1280px] grid-cols-[minmax(0,600px)_minmax(0,1fr)] gap-5 px-8">
          <div className="pt-7">
            <span className="inline-flex h-8 items-center gap-2 rounded-full border border-[#efe6d6] bg-white pr-2.5 pl-1.5 text-[13px] font-semibold text-ink-2 shadow-[0_4px_14px_-8px_rgb(120_80_0/0.25)]">
              <span className="rounded-full bg-night-900 px-2.5 py-0.5 text-[11px] tracking-[0.04em] text-white">{hero.badge}</span>
              {hero.eyebrow}
              <Icon name="ArrowRight" className="size-3.5" />
            </span>
            <h1 className="mt-6 font-serif text-[68px] leading-[1.04] font-semibold tracking-[-0.025em]">
              {hero.title} <em className="text-brand-600">{hero.titleAccent}</em>
            </h1>
            <p className="mt-5 max-w-[540px] text-[18.5px] leading-relaxed text-ink-2">{hero.lead}</p>
            <div className="mt-8 flex gap-3">
              <Button size="lg" href={hero.primary.href} iconRight="ArrowRight">
                {hero.primary.label}
              </Button>
              <Button size="lg" variant="secondary" href={hero.secondary.href} icon="CirclePlay">
                {hero.secondary.label}
              </Button>
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-[13px] text-ink-3">
              <Icon name="MousePointerClick" className="size-3.5" />
              {hero.note}
            </p>
            <div className="mt-9 flex gap-7 border-t border-[#efe4d2] pt-6 text-[13.5px] font-semibold whitespace-nowrap text-ink-2">
              {trustPoints.map((t) => (
                <span key={t.label} className="flex items-center gap-2">
                  <Icon name={t.icon} className="size-[18px] text-brand-600" />
                  {t.label}
                </span>
              ))}
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      {/* ─── One app, every role ─── */}
      <section id="roles" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-[1280px] px-8">
          <SectionIntro kicker="One app · every role" title="One app for everyone who runs a school." center>
            Parents, teachers and the principal each get their own section — inside the same app, built around their day.
          </SectionIntro>
          <div className="mt-11 grid grid-cols-3 gap-6">
            {roleCards.map((card) => (
              <article key={card.role} className="overflow-hidden rounded-3xl border border-[#f0e7d8] bg-white shadow-[0_24px_50px_-32px_rgb(60_40_0/0.35)]">
                <div
                  className={cn(
                    "h-[230px] p-6",
                    card.role === "principal" && "bg-linear-to-br from-[#ede8ff] to-[#d9d0ff]",
                    card.role === "teacher" && "bg-linear-to-br from-[#ddf6ec] to-[#bdebd8]",
                    card.role === "parent" && "bg-linear-to-br from-[#fff1d2] to-[#ffdf9e]",
                  )}
                >
                  {card.role === "principal" ? <PrincipalMini /> : card.role === "teacher" ? <TeacherMini /> : <ParentMini />}
                </div>
                <div className="px-6 pt-5 pb-6">
                  <span className={cn("inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.06em] uppercase", card.tone === "brand" ? "text-brand-600" : card.tone === "mint" ? "text-mint-700" : "text-marigold-700")}>
                    <Icon name={card.icon} className="size-4" />
                    {card.label}
                  </span>
                  <h3 className="mt-2 mb-3.5 font-serif text-2xl leading-tight font-semibold tracking-[-0.015em]">{card.title}</h3>
                  <ul className="flex flex-col gap-2">
                    {card.points.map((p) => (
                      <li key={p} className="flex gap-2.5 text-[14.5px] text-ink-2">
                        <Icon
                          name="CircleCheck"
                          className={cn("mt-0.5 size-[18px]", card.tone === "brand" ? "text-brand-600" : card.tone === "mint" ? "text-mint-500" : "text-marigold-500")}
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="product" className="scroll-mt-20 pt-6 pb-20">
        <div className="mx-auto max-w-[1280px] px-8">
          <div className="flex items-end justify-between">
            <SectionIntro kicker="Everything in one place" title="Replace five apps, three registers and a WhatsApp group." />
            <Button variant="secondary" href="/demo" iconRight="ArrowRight">
              See it in the live demo
            </Button>
          </div>
          <div className="mt-9 grid grid-cols-4 gap-4">
            {features.map((f) => (
              <div key={f.title} className="rounded-[20px] border border-[#f0e7d8] bg-white p-5">
                <IconTile icon={f.icon} tone={f.tone} size="lg" />
                <b className="mt-3.5 mb-1.5 block text-base tracking-[-0.01em]">{f.title}</b>
                <p className="text-[13.8px] leading-normal text-ink-2">{f.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-4 rounded-[22px] border border-[#f0e7d8] bg-white py-5">
            {stats.map((s, i) => (
              <div key={s.value} className={cn("flex items-start gap-3.5 px-6", i > 0 && "border-l border-[#f0e7d8]")}>
                <IconTile icon={s.icon} tone={s.tone} size="lg" />
                <div>
                  <b className="block text-[30px] leading-none font-bold tracking-[-0.03em] whitespace-nowrap" style={{ color: hexTone[s.tone] }}>
                    {s.value}
                  </b>
                  <span className="mt-1 block text-[13.5px] leading-snug text-ink-2">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bhavi AI ─── */}
      <section id="bhavi" className="bg-night-glow py-24 text-[#e6e2ff]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-[minmax(0,1fr)_600px] items-center gap-16 px-8">
          <div>
            <div className="text-[12.5px] font-bold tracking-[0.14em] text-marigold-300 uppercase">✦ Meet Bhavi</div>
            <h2 className="mt-3.5 font-serif text-[50px] leading-[1.05] font-semibold tracking-[-0.025em] text-white">
              An AI assistant that <em className="text-[#ffc14d]">knows your school.</em>
            </h2>
            <p className="mt-4 max-w-[520px] text-[18px] leading-relaxed text-[#c7c0f0]">
              Bhavi reads your school&apos;s attendance, marks and notices — and answers questions from parents, teachers and principals in seconds.
            </p>
            <ul className="mt-5">
              {bhaviPoints.map((p, i) => (
                <li key={p.title} className={cn("flex gap-4 py-3.5", i < bhaviPoints.length - 1 && "border-b border-white/10")}>
                  <span className="grid size-[42px] shrink-0 place-items-center rounded-xl bg-white/10 text-[#ffc14d]">
                    <Icon name={p.icon} className="size-5" />
                  </span>
                  <div>
                    <b className="text-base text-white">{p.title}</b>
                    <p className="mt-0.5 text-sm text-[#bdb6ea]">{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <BhaviShowcase />
        </div>
      </section>

      {/* ─── Go live in 3 weeks ─── */}
      <section className="py-24">
        <div className="mx-auto grid max-w-[1280px] grid-cols-[400px_minmax(0,1fr)] items-center gap-14 px-8">
          <SectionIntro kicker="Go live in 3 weeks" title="From registers to app — without the headache.">
            We do the setup. Your staff keep teaching. Free on every plan.
          </SectionIntro>
          <div className="grid grid-cols-3 gap-4">
            {goLiveSteps.map((step) => (
              <div key={step.week} className="rounded-[22px] border border-[#f0e7d8] bg-white p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold tracking-[0.1em] uppercase" style={{ color: hexTone[step.tone] }}>
                    {step.week}
                  </span>
                  <IconTile icon={step.icon} tone={step.tone} />
                </div>
                <b className="mt-2.5 mb-1.5 block text-[17px] tracking-[-0.01em]">{step.title}</b>
                <p className="text-[13.8px] leading-normal text-ink-2">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Call to action ─── */}
      <section className="pb-24">
        <div className="mx-auto max-w-[1280px] px-8">
          <div className="flex items-center justify-between gap-8 rounded-[30px] bg-cta px-16 py-14 text-white">
            <div>
              <h2 className="font-serif text-[44px] leading-tight font-semibold tracking-[-0.02em]">See it with your school&apos;s data.</h2>
              <p className="mt-2.5 text-[17px] text-[#d9d3ff]">30-minute demo · Hindi or English · Free 30-day pilot</p>
            </div>
            <div className="flex shrink-0 gap-3">
              <Button size="lg" variant="marigold" href="/book-demo">
                Book a free demo
              </Button>
              <Button size="lg" variant="glass" href="/demo">
                Try the live demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionIntro({ kicker, title, children, center = false }: { kicker: string; title: string; children?: ReactNode; center?: boolean }) {
  return (
    <div className={cn(center && "text-center")}>
      <div className="text-[12.5px] font-bold tracking-[0.14em] text-brand-600 uppercase">{kicker}</div>
      <h2 className={cn("mt-3.5 font-serif text-[46px] leading-[1.08] font-semibold tracking-[-0.025em]", center ? "mx-auto max-w-[900px]" : "max-w-[640px]")}>{title}</h2>
      {children ? <p className={cn("mt-3.5 text-[18px] leading-relaxed text-ink-2", center ? "mx-auto max-w-[720px]" : "max-w-[560px]")}>{children}</p> : null}
    </div>
  );
}

/** Right side of the hero: dashboard, phone with notifications and a Hindi chat — all built from components. */
function HeroVisual() {
  return (
    <div className="relative h-[640px]">
      <div className="bg-sun absolute -top-6 -right-[70px] size-[400px] rounded-full opacity-90" />
      <div className="absolute top-[200px] left-10 h-[420px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(108_77_255/0.3),transparent)] blur-[10px]" />
      <div className="absolute top-1 left-[34px] z-10 flex items-center gap-3 rounded-2xl border border-white/90 bg-white/90 py-2 pr-4 pl-2.5 shadow-float backdrop-blur">
        <Ring parts={[{ value: 92, color: "#12B886" }]} size={46} stroke={6}>
          <Icon name="Check" className="size-4 text-mint-500" />
        </Ring>
        <div>
          <div className="text-[14.5px] font-bold">7-B attendance done · 35 of 38</div>
          <div className="text-xs font-semibold text-mint-700">Parents notified at 8:06 AM</div>
        </div>
      </div>
      <div className="absolute top-[74px] left-0 w-[420px]">
        <HeroDashboardCard />
      </div>
      <div className="absolute top-10 -right-10 origin-top-right scale-[0.76]">
        <PhoneFrame dark screenClassName="bg-phone-screen">
          <LockScreenNotifications />
        </PhoneFrame>
      </div>
      <div className="absolute top-[408px] left-[30px] w-[392px] rounded-[20px] border border-white/90 bg-white/90 px-[18px] py-4 shadow-float backdrop-blur">
        <div className="mb-2.5 flex items-center gap-2 text-xs font-semibold text-brand-600">
          <Icon name="Sparkles" className="size-3.5" /> Ask Bhavi · हिन्दी
        </div>
        <div className="ml-10 w-fit rounded-[16px_16px_4px_16px] bg-brand-600 px-3.5 py-2.5 text-[15px] text-white">आरव का गणित में प्रदर्शन कैसा है?</div>
        <div className="mt-2 rounded-[16px_16px_16px_4px] border border-line bg-white px-3.5 py-2.5 text-[14.5px] leading-relaxed text-ink-2">
          आरव ने अर्धवार्षिक परीक्षा में गणित में <b className="text-ink">92/100</b> अंक प्राप्त किए — कक्षा के शीर्ष 10% में! 🎉
        </div>
        <div className="mt-2.5 flex items-center gap-2 text-xs text-ink-3">
          <Avatar src="/avatars/priya.svg" size={20} /> Priya, parent · answered in 2 seconds
        </div>
      </div>
    </div>
  );
}
