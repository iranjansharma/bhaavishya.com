import type { Metadata } from "next";
import { PricingPlans } from "@/components/blocks/PricingPlans";
import { pricingFaq } from "@/lib/site-content";

export const metadata: Metadata = { title: "Pricing" };

/** PHONE · Pricing (/pricing) — plans and prices live in lib/site-content.ts */
export default function PricingPage() {
  return (
    <div className="px-4 pt-7 pb-12">
      <div className="text-center">
        <div className="text-[11.5px] font-bold tracking-[0.14em] text-brand-600 uppercase">Pricing</div>
        <h1 className="mt-2 font-serif text-[32px] leading-[1.1] font-semibold tracking-[-0.02em]">Simple pricing that grows with your school</h1>
        <p className="mt-2.5 text-[15px] text-ink-2">Pay per student, per year. Free onboarding and a 30-day pilot on every plan.</p>
      </div>
      <div className="mt-6">
        <PricingPlans layout="mobile" />
      </div>
      <h2 className="mt-10 font-serif text-[26px] font-semibold">Good to know</h2>
      <div className="mt-3 divide-y divide-sand rounded-[20px] border border-sand bg-white">
        {pricingFaq.map((item) => (
          <details key={item.q} className="group px-4 py-3.5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[15px] font-semibold">
              {item.q}
              <span className="text-xl text-ink-3 transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-2 text-[14px] text-ink-2">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
