import type { Metadata } from "next";
import { PricingPlans } from "@/components/blocks/PricingPlans";
import { pricingFaq } from "@/lib/site-content";

export const metadata: Metadata = { title: "Pricing" };

/** DESKTOP · Pricing (/pricing) — plans and prices live in lib/site-content.ts */
export default function PricingPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-8 pt-10 pb-20">
      <div className="text-center">
        <div className="text-[12.5px] font-bold tracking-[0.14em] text-brand-600 uppercase">Pricing</div>
        <h1 className="mt-2.5 font-serif text-[46px] leading-tight font-semibold tracking-[-0.025em]">Simple pricing that grows with your school</h1>
        <p className="mt-2 text-[17px] text-ink-2">Pay per student, per year. Free onboarding, data migration and a 30-day pilot on every plan.</p>
      </div>
      <div className="mt-8">
        <PricingPlans layout="desktop" />
      </div>

      <div className="mt-16 grid grid-cols-[320px_minmax(0,1fr)] gap-12">
        <div>
          <div className="text-[12.5px] font-bold tracking-[0.14em] text-brand-600 uppercase">Questions</div>
          <h2 className="mt-2.5 font-serif text-[32px] leading-tight font-semibold">Good to know</h2>
        </div>
        <div className="divide-y divide-sand rounded-[22px] border border-sand bg-white">
          {pricingFaq.map((item) => (
            <details key={item.q} className="group px-6 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-[15px] font-semibold">
                {item.q}
                <span className="text-xl text-ink-3 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-[14.5px] text-ink-2">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
