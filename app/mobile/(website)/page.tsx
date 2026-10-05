import type { ReactNode } from "react";
import { BhaviShowcase, ParentAppScreen, ParentMini, PrincipalMini, TeacherMini } from "@/components/blocks/previews";
import { Ring } from "@/components/charts";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { IconTile } from "@/components/ui/Pill";
import { PhoneFrame } from "@/components/ui/Phone";
import { bhaviPoints, features, goLiveSteps, hero, roleCards, stats, trustPoints } from "@/lib/site-content";
import { hexTone } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { StickyCta } from "../_components/StickyCta";

/** PHONE · Home page (/) — all text comes from lib/site-content.ts */
export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden px-5 pt-6 pb-10">
        <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#efe6d6] bg-white py-1 pr-2.5 pl-1 text-[11.5px] font-semibold text-ink-2">
          <span className="rounded-full bg-night-900 px-2 py-0.5 text-[10px] tracking-[0.04em] text-white">{hero.badge}</span>
          <span className="truncate">{hero.eyebrow}</span>
        </span>
        <h1 className="mt-4 font-serif text-[38px] leading-[1.08] font-semibold tracking-[-0.025em]">
          {hero.title} <em className="text-brand-600">{hero.titleAccent}</em>
        </h1>
        <p className="mt-3.5 text-[16px] leading-relaxed text-ink-2">{hero.lead}</p>
        <div className="mt-6 flex flex-col gap-2.5">
          <Button size="lg" href={hero.primary.href} iconRight="ArrowRight" full>
            {hero.primary.label}
          </Button>
          <Button size="lg" variant="secondary" href={hero.secondary.href} icon="CirclePlay" full>
            {hero.secondary.label}
          </Button>
        </div>
        <p className="mx-auto mt-2.5 max-w-[300px] text-center text-xs leading-relaxed text-ink-3">
          <Icon name="MousePointerClick" className="mr-1 inline-block size-3.5 align-[-3px]" />
          {hero.note}
        </p>

        {/* Phone with the parent app, plus two floating cards */}
        <div className="relative mt-8 flex h-[520px] justify-center">
          <div className="bg-sun absolute top-6 -right-16 size-64 rounded-full opacity-90" />
          <div className="absolute top-40 -left-10 size-72 rounded-full bg-[radial-gradient(closest-side,rgb(108_77_255/0.28),transparent)]" />
          <div className="origin-top scale-[0.84]">
            <PhoneFrame>
              <ParentAppScreen />
            </PhoneFrame>
          </div>
          <div className="absolute top-14 -left-1 flex items-center gap-2.5 rounded-2xl border border-white/90 bg-white/95 py-2 pr-3.5 pl-2 shadow-float">
            <Ring parts={[{ value: 92, color: "#12B886" }]} size={38} stroke={5}>
              <Icon name="Check" className="size-3.5 text-mint-500" />
            </Ring>
            <div className="leading-tight">
              <div className="text-[12.5px] font-bold">7-B attendance done</div>
              <div className="text-[11px] font-semibold text-mint-700">Parents notified 8:06</div>
            </div>
          </div>
          <div className="absolute right-0 bottom-6 w-[220px] rounded-2xl border border-white/90 bg-white/95 p-3 shadow-float">
            <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-brand-600">
              <Icon name="Sparkles" className="size-3" /> Ask Bhavi · हिन्दी
            </div>
            <div className="text-[12.5px] leading-snug text-ink-2">
              आरव ने गणित में <b className="text-ink">92/100</b> अंक प्राप्त किए — कक्षा के शीर्ष 10% में! 🎉
            </div>
          </div>
        </div>

        <div className="no-scrollbar -mx-5 mt-2 flex gap-2 overflow-x-auto px-5">
          {trustPoints.map((t) => (
            <span key={t.label} className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#efe4d2] bg-white px-3 py-1.5 text-[12.5px] font-semibold text-ink-2">
              <Icon name={t.icon} className="size-4 text-brand-600" />
              {t.label}
            </span>
          ))}
        </div>
      </section>

      {/* ─── One app, every role ─── */}
      <section id="roles" className="scroll-mt-16 px-5 py-10">
        <SectionIntro kicker="One app · every role" title="One app for everyone who runs a school.">
          Parents, teachers and the principal each get their own section — inside the same app.
        </SectionIntro>
        <div className="mt-6 flex flex-col gap-4">
          {roleCards.map((card) => (
            <article key={card.role} className="overflow-hidden rounded-3xl border border-[#f0e7d8] bg-white shadow-[0_24px_50px_-32px_rgb(60_40_0/0.35)]">
              <div
                className={cn(
                  "h-[230px] p-5",
                  card.role === "principal" && "bg-linear-to-br from-[#ede8ff] to-[#d9d0ff]",
                  card.role === "teacher" && "bg-linear-to-br from-[#ddf6ec] to-[#bdebd8]",
                  card.role === "parent" && "bg-linear-to-br from-[#fff1d2] to-[#ffdf9e]",
                )}
              >
                {card.role === "principal" ? <PrincipalMini id="m-pm" /> : card.role === "teacher" ? <TeacherMini /> : <ParentMini />}
              </div>
              <div className="px-5 pt-4 pb-5">
                <span className={cn("inline-flex items-center gap-1.5 text-[11.5px] font-bold tracking-[0.06em] uppercase", card.tone === "brand" ? "text-brand-600" : card.tone === "mint" ? "text-mint-700" : "text-marigold-700")}>
                  <Icon name={card.icon} className="size-4" />
                  {card.label}
                </span>
                <h3 className="mt-1.5 mb-3 font-serif text-[22px] leading-tight font-semibold">{card.title}</h3>
                <ul className="flex flex-col gap-2">
                  {card.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-[14px] text-ink-2">
                      <Icon
                        name="CircleCheck"
                        className={cn("mt-0.5 size-[17px]", card.tone === "brand" ? "text-brand-600" : card.tone === "mint" ? "text-mint-500" : "text-marigold-500")}
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="product" className="scroll-mt-16 px-5 pb-10">
        <SectionIntro kicker="Everything in one place" title="Replace five apps, three registers and a WhatsApp group." />
        <div className="mt-6 grid grid-cols-2 gap-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-[18px] border border-[#f0e7d8] bg-white p-3.5">
              <IconTile icon={f.icon} tone={f.tone} />
              <b className="mt-2.5 mb-1 block text-[14px] leading-tight">{f.title}</b>
              <p className="text-[12.5px] leading-snug text-ink-2">{f.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div key={s.value} className="rounded-[18px] border border-[#f0e7d8] bg-white p-3.5">
              <b className="block text-[26px] leading-none font-bold tracking-[-0.03em]" style={{ color: hexTone[s.tone] }}>
                {s.value}
              </b>
              <span className="mt-1.5 block text-[12.5px] leading-snug text-ink-2">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Bhavi AI ─── */}
      <section id="bhavi" className="bg-night-glow px-5 py-12 text-[#e6e2ff]">
        <div className="text-[11.5px] font-bold tracking-[0.14em] text-marigold-300 uppercase">✦ Meet Bhavi</div>
        <h2 className="mt-3 font-serif text-[32px] leading-[1.1] font-semibold tracking-[-0.02em] text-white">
          An AI assistant that <em className="text-[#ffc14d]">knows your school.</em>
        </h2>
        <p className="mt-3 text-[15.5px] leading-relaxed text-[#c7c0f0]">Bhavi answers questions from parents, teachers and principals in seconds — in their own language.</p>
        <div className="mt-6">
          <BhaviShowcase compact />
        </div>
        <ul className="mt-6 flex flex-col">
          {bhaviPoints.map((p, i) => (
            <li key={p.title} className={cn("flex gap-3.5 py-3", i < bhaviPoints.length - 1 && "border-b border-white/10")}>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-[#ffc14d]">
                <Icon name={p.icon} className="size-5" />
              </span>
              <div>
                <b className="text-[15px] text-white">{p.title}</b>
                <p className="mt-0.5 text-[13.5px] text-[#bdb6ea]">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── Go live in 3 weeks ─── */}
      <section className="px-5 py-12">
        <SectionIntro kicker="Go live in 3 weeks" title="From registers to app — without the headache.">
          We do the setup. Your staff keep teaching. Free on every plan.
        </SectionIntro>
        <ol className="relative mt-6 flex flex-col gap-3 pl-6 before:absolute before:top-4 before:bottom-4 before:left-[9px] before:w-0.5 before:bg-sand">
          {goLiveSteps.map((step) => (
            <li key={step.week} className="relative rounded-[20px] border border-[#f0e7d8] bg-white p-4">
              <span className="absolute top-5 -left-[21px] size-3.5 rounded-full border-[3px] border-cream" style={{ background: hexTone[step.tone] }} />
              <div className="text-[11px] font-extrabold tracking-[0.1em] uppercase" style={{ color: hexTone[step.tone] }}>
                {step.week}
              </div>
              <b className="mt-1 block text-[16px]">{step.title}</b>
              <p className="mt-1 text-[13.5px] leading-snug text-ink-2">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ─── Call to action ─── */}
      <section className="px-5 pb-12">
        <div className="rounded-[26px] bg-cta px-6 py-8 text-white">
          <h2 className="font-serif text-[30px] leading-tight font-semibold">See it with your school&apos;s data.</h2>
          <p className="mt-2 text-[14.5px] text-[#d9d3ff]">30-minute demo · Hindi or English · Free 30-day pilot</p>
          <Button size="lg" variant="marigold" href="/book-demo" full className="mt-5">
            Book a free demo
          </Button>
        </div>
      </section>

      <StickyCta />
    </>
  );
}

function SectionIntro({ kicker, title, children }: { kicker: string; title: string; children?: ReactNode }) {
  return (
    <div>
      <div className="text-[11.5px] font-bold tracking-[0.14em] text-brand-600 uppercase">{kicker}</div>
      <h2 className="mt-2.5 font-serif text-[30px] leading-[1.1] font-semibold tracking-[-0.02em]">{title}</h2>
      {children ? <p className="mt-2.5 text-[15.5px] leading-relaxed text-ink-2">{children}</p> : null}
    </div>
  );
}
