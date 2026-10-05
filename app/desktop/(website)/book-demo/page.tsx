import type { Metadata } from "next";
import { DemoBookingForm } from "@/components/blocks/DemoBookingForm";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { IconTile } from "@/components/ui/Pill";
import { demoForm } from "@/lib/site-content";

export const metadata: Metadata = { title: "Book a demo" };

/** DESKTOP · Book a demo (/book-demo) */
export default function BookDemoPage() {
  return (
    <div className="mx-auto grid max-w-[1280px] grid-cols-[minmax(0,1fr)_640px] items-start gap-14 px-8 pt-9 pb-20">
      <div className="pt-6">
        <span className="inline-flex h-[30px] items-center gap-1.5 rounded-full bg-brand-50 px-3 text-[12.5px] font-semibold text-brand-600">
          <Icon name="Video" className="size-3.5" /> Free 30-minute demo · online or at your school
        </span>
        <h1 className="mt-5 font-serif text-[54px] leading-[1.05] font-semibold tracking-[-0.025em]">
          See Bhavishya with your <em className="text-brand-600">own school&apos;s data.</em>
        </h1>
        <p className="mt-4 max-w-[560px] text-[18px] leading-relaxed text-ink-2">
          We&apos;ll set up a private demo using your classes and sections, walk you through the whole app, and answer your questions — in Hindi or English.
        </p>
        <ul className="mt-6 flex flex-col gap-1">
          {demoForm.benefits.map((b) => (
            <li key={b.title} className="flex gap-3.5 py-2.5">
              <IconTile icon={b.icon} tone={b.tone} size="lg" />
              <div>
                <b className="text-[15.5px]">{b.title}</b>
                <p className="mt-0.5 text-[13.8px] text-ink-2">{b.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center gap-4 rounded-[20px] border border-[#f0e7d8] bg-white px-5 py-4 shadow-card">
          <Avatar src={demoForm.host.avatar} size={52} />
          <div>
            <div className="font-serif text-[16.5px] leading-snug">“{demoForm.host.quote}”</div>
            <div className="mt-1 text-[13px] text-ink-3">
              <b className="text-ink-2">{demoForm.host.name}</b> · Your demo host
            </div>
          </div>
        </div>
      </div>
      <DemoBookingForm layout="desktop" />
    </div>
  );
}
