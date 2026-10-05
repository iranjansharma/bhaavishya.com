import type { Metadata } from "next";
import { DemoBookingForm } from "@/components/blocks/DemoBookingForm";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { IconTile } from "@/components/ui/Pill";
import { demoForm } from "@/lib/site-content";

export const metadata: Metadata = { title: "Book a demo" };

/** PHONE · Book a demo (/book-demo) */
export default function BookDemoPage() {
  return (
    <div className="px-4 pt-6 pb-12">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">
        <Icon name="Video" className="size-3.5" /> Free 30-minute demo
      </span>
      <h1 className="mt-3.5 font-serif text-[32px] leading-[1.1] font-semibold tracking-[-0.02em]">
        See Bhavishya with your <em className="text-brand-600">own school&apos;s data.</em>
      </h1>
      <p className="mt-2.5 text-[15px] leading-relaxed text-ink-2">A private demo with your classes and sections — in Hindi or English.</p>
      <div className="mt-5">
        <DemoBookingForm layout="mobile" />
      </div>
      <ul className="mt-6 flex flex-col gap-1">
        {demoForm.benefits.map((b) => (
          <li key={b.title} className="flex gap-3 py-2">
            <IconTile icon={b.icon} tone={b.tone} />
            <div>
              <b className="text-[14.5px]">{b.title}</b>
              <p className="text-[13px] text-ink-2">{b.text}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center gap-3 rounded-[20px] border border-[#f0e7d8] bg-white p-4">
        <Avatar src={demoForm.host.avatar} size={46} />
        <div>
          <div className="font-serif text-[15px] leading-snug">“{demoForm.host.quote}”</div>
          <div className="mt-1 text-xs text-ink-3">
            <b className="text-ink-2">{demoForm.host.name}</b> · Your demo host
          </div>
        </div>
      </div>
    </div>
  );
}
