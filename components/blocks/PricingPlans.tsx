"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Segmented } from "@/components/ui/Segmented";
import { GST_RATE, MONTHLY_MARKUP, diamondPlan, plans, type Plan } from "@/lib/site-content";
import { cn, formatINR, formatNumber } from "@/lib/utils";

type Billing = "yearly" | "monthly";

const TIER: Record<Plan["id"], string> = { silver: "tier-silver", gold: "tier-gold", platinum: "tier-platinum" };

const monthlyPrice = (plan: Plan) => Math.round((plan.pricePerYear * MONTHLY_MARKUP) / 12);

/** Silver / Gold / Platinum cards, a yearly–monthly switch and a price calculator. Prices: lib/site-content.ts */
export function PricingPlans({ layout }: { layout: "desktop" | "mobile" }) {
  const [billing, setBilling] = useState<Billing>("yearly");
  const mobile = layout === "mobile";

  return (
    <div className="flex flex-col gap-6">
      <div className={cn("flex items-center gap-3", mobile ? "flex-col" : "justify-center")}>
        <Segmented
          options={["Yearly · save 15%", "Monthly"]}
          value={billing === "yearly" ? "Yearly · save 15%" : "Monthly"}
          onChange={(v) => setBilling(v === "Monthly" ? "monthly" : "yearly")}
          className="bg-[#f3ebdd]"
        />
        <span className="inline-flex items-center gap-1.5 text-[13px] text-ink-3">
          <Icon name="ShieldCheck" className="size-3.5" /> No setup fee · Cancel anytime
        </span>
      </div>

      <div className={cn("grid items-stretch", mobile ? "grid-cols-1 gap-4" : "grid-cols-3 gap-5")}>
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} billing={billing} mobile={mobile} />
        ))}
      </div>

      <div className={cn("grid gap-4", mobile ? "grid-cols-1" : "grid-cols-[1.25fr_1fr]")}>
        <div className={cn("flex gap-4 rounded-[22px] border border-[#efe6d6] bg-white p-5", mobile ? "flex-col items-start" : "items-center")}>
          <span className="tier-diamond inline-flex h-[30px] items-center gap-1.5 rounded-full px-3 text-xs font-extrabold tracking-[0.12em]">
            <Icon name="Gem" className="size-3.5" />
            {diamondPlan.name.toUpperCase()}
          </span>
          <div className="min-w-0 flex-1">
            <b className="text-[15px]">{diamondPlan.title}</b>
            <div className="text-[13px] text-ink-3">{diamondPlan.text}</div>
          </div>
          <Button href={diamondPlan.cta.href} variant="dark">
            {diamondPlan.cta.label}
          </Button>
        </div>
        <Estimator billing={billing} />
      </div>
    </div>
  );
}

function PlanCard({ plan, billing, mobile }: { plan: Plan; billing: Billing; mobile: boolean }) {
  const popular = plan.popular;
  const price = billing === "yearly" ? plan.pricePerYear : monthlyPrice(plan);
  const note =
    billing === "yearly"
      ? `≈ ${formatINR(plan.pricePerYear / 12)} per student a month · billed yearly`
      : `Billed monthly · ${formatINR(monthlyPrice(plan) * 12)} a year`;

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-[26px] p-6",
        popular
          ? cn("bg-gold-card text-[#e8e4ff] shadow-[0_40px_70px_-30px_rgb(23_17_61/0.6)]", !mobile && "-translate-y-2.5")
          : "border border-[#efe6d6] bg-white shadow-[0_26px_50px_-36px_rgb(60_40_0/0.4)]",
      )}
    >
      {popular ? (
        <span className="absolute top-5 right-5 rounded-full bg-marigold-400 px-3 py-1 text-[11.5px] font-extrabold text-night-950">★ Most popular</span>
      ) : null}
      <span className={cn("inline-flex h-[30px] w-fit items-center gap-1.5 rounded-full px-3 text-xs font-extrabold tracking-[0.12em]", TIER[plan.id])}>
        <Icon name="Gem" className="size-3.5" />
        {plan.name.toUpperCase()}
      </span>
      <div className="mt-4 flex items-end gap-2">
        <b className="text-[46px] leading-none font-bold tracking-[-0.035em] tabular-nums">{formatINR(price)}</b>
        <span className={cn("pb-1.5 text-sm leading-tight", popular ? "text-[#beb6ee]" : "text-ink-3")}>
          per student
          <br />
          per {billing === "yearly" ? "year" : "month"}
        </span>
      </div>
      <div className={cn("mt-1.5 text-[12.5px]", popular ? "text-[#a9a0e0]" : "text-ink-3")}>{note}</div>
      <p className={cn("mt-1.5 text-sm", popular ? "text-[#cfc8f5]" : "text-ink-2")}>{plan.description}</p>
      <Button href={plan.cta.href} variant={popular ? "marigold" : plan.id === "platinum" ? "primary" : "secondary"} full className="mt-4">
        {plan.cta.label}
      </Button>
      <div className={cn("mt-5 text-xs font-bold tracking-[0.06em] uppercase", popular ? "text-[#a9a0e0]" : "text-ink-3")}>{plan.includesLabel}</div>
      <ul className="mt-2.5 flex flex-col gap-2">
        {plan.features.map((f) => (
          <li key={f} className={cn("flex gap-2.5 text-[13.5px] leading-snug", popular ? "text-[#e8e4ff]" : "text-ink-2")}>
            <Icon name="CircleCheck" className={cn("mt-px size-[17px]", popular ? "text-marigold-400" : "text-mint-500")} />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Estimator({ billing }: { billing: Billing }) {
  const [students, setStudents] = useState(850);
  const [planId, setPlanId] = useState<Plan["id"]>("gold");
  const plan = plans.find((p) => p.id === planId) ?? plans[1];
  const perPeriod = billing === "yearly" ? plan.pricePerYear * students : monthlyPrice(plan) * students;

  return (
    <div className="rounded-[22px] bg-night-900 p-5 text-white">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold tracking-wide text-[#beb6ee]">ESTIMATE FOR YOUR SCHOOL</span>
        <Icon name="Calculator" className="size-5 text-[#beb6ee]" />
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5" role="radiogroup" aria-label="Plan">
        {plans.map((p) => (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={planId === p.id}
            onClick={() => setPlanId(p.id)}
            className={cn("rounded-full px-3 py-1 text-xs font-semibold", planId === p.id ? "bg-white text-night-900" : "bg-white/10 text-white/80")}
          >
            {p.name}
          </button>
        ))}
      </div>
      <label className="mt-3 block">
        <span className="flex justify-between text-[13px] text-[#cfc8f5]">
          Students <b className="text-white tabular-nums">{formatNumber(students)}</b>
        </span>
        <input
          type="range"
          min={100}
          max={3000}
          step={50}
          value={students}
          onChange={(e) => setStudents(Number(e.target.value))}
          className="mt-2 w-full accent-marigold-400"
        />
      </label>
      <div className="mt-2 text-[15px]">
        {formatNumber(students)} × {plan.name} ={" "}
        <b className="text-lg text-marigold-400">
          {formatINR(perPeriod)} / {billing === "yearly" ? "year" : "month"}
        </b>
      </div>
      <div className="text-xs text-[#a9a0e0]">
        + {Math.round(GST_RATE * 100)}% GST ·{" "}
        {billing === "yearly" ? `about ${formatINR(perPeriod / 12)} a month` : `${formatINR(perPeriod * 12)} a year`}
      </div>
    </div>
  );
}
