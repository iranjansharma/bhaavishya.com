"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ChipGroup } from "@/components/ui/Chips";
import { FieldLabel, TextField } from "@/components/ui/bits";
import { Icon } from "@/components/ui/Icon";
import { Toggle } from "@/components/ui/Toggle";
import { demoForm } from "@/lib/site-content";
import { cn } from "@/lib/utils";

/**
 * "Book a demo" form. Shows a confirmation when booked.
 * TODO: send the form to your CRM / Google Sheet / email, then confirm on WhatsApp.
 */
export function DemoBookingForm({ layout }: { layout: "desktop" | "mobile" }) {
  const mobile = layout === "mobile";
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState(1);
  const [booked, setBooked] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // The confirmation is shorter than the form, so bring it into view after booking.
  useEffect(() => {
    if (booked) root.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [booked]);

  const chosenDay = demoForm.days[day];
  const chosenSlot = demoForm.slots[slot];
  const when = `${chosenDay.label}, ${chosenDay.date} ${chosenDay.month} · ${chosenSlot.time}`;

  if (booked) {
    return (
      <div
        ref={root}
        className={cn(
          "flex scroll-mt-24 flex-col items-center rounded-[26px] bg-white text-center shadow-[0_40px_80px_-40px_rgb(23_17_61/0.45)] ring-1 ring-[#efe6d6]",
          mobile ? "px-5 py-8" : "px-10 py-14",
        )}
      >
        <span className="grid size-16 place-items-center rounded-full bg-mint-50 text-mint-500">
          <Icon name="CalendarCheck" className="size-8" />
        </span>
        <h3 className="mt-4 font-serif text-2xl font-semibold">You&apos;re booked!</h3>
        <p className="mt-1 text-ink-2">{when} (IST)</p>
        <p className="mt-3 max-w-sm text-sm text-ink-3">We&apos;ve sent the meeting link on WhatsApp. Your host will call you 10 minutes before the demo.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button variant="secondary" icon="CalendarPlus">
            Add to calendar
          </Button>
          <Button href="/demo" iconRight="ArrowRight">
            Explore the live demo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setBooked(true);
      }}
      className={cn("rounded-[26px] bg-white shadow-[0_40px_80px_-40px_rgb(23_17_61/0.45)] ring-1 ring-[#efe6d6]", mobile ? "p-5" : "p-7")}
    >
      <div className={cn("flex justify-between gap-3", mobile ? "flex-col" : "items-start")}>
        <div>
          <div className="font-serif text-2xl font-semibold">Book your demo</div>
          <div className="text-[13px] text-ink-3">Takes 30 seconds · we&apos;ll confirm on WhatsApp</div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600">
          <Icon name="Clock" className="size-3.5" /> 30 minutes · online
        </span>
      </div>

      <div className={cn("mt-5 grid gap-3", mobile ? "grid-cols-1" : "grid-cols-2")}>
        <TextField label="Your name" name="name" defaultValue="Rakesh Patil" />
        <TextField label="School name" name="school" defaultValue="Sahyadri Valley School" />
        <TextField label="Mobile (WhatsApp)" name="phone" type="tel" prefix="+91" defaultValue="98765 43210" />
        <TextField label="City" name="city" defaultValue="Nashik, Maharashtra" />
      </div>

      <div className="mt-4">
        <FieldLabel>You are the</FieldLabel>
        <ChipGroup options={demoForm.roles} defaultValue="Owner / Trustee" size="sm" label="Your role" />
      </div>
      <div className={cn("mt-4 grid gap-4", mobile ? "grid-cols-1" : "grid-cols-2")}>
        <div>
          <FieldLabel>Students</FieldLabel>
          <ChipGroup options={demoForm.sizes} defaultValue="800–1,500" size="sm" label="Number of students" />
        </div>
        <div>
          <FieldLabel>Board</FieldLabel>
          <ChipGroup options={demoForm.boards} defaultValue="CBSE" size="sm" label="Board" />
        </div>
      </div>

      <div className="my-5 h-px bg-line" />

      <FieldLabel>Pick a day</FieldLabel>
      <div className={cn("flex gap-2", mobile ? "no-scrollbar -mx-5 overflow-x-auto px-5" : "")} role="radiogroup" aria-label="Day">
        {demoForm.days.map((d, i) => (
          <button
            key={d.date}
            type="button"
            role="radio"
            aria-checked={day === i}
            onClick={() => setDay(i)}
            className={cn(
              "flex shrink-0 flex-col items-center rounded-xl border py-2 transition-colors",
              mobile ? "w-[62px]" : "flex-1",
              day === i ? "border-brand-600 bg-brand-600 text-white shadow-glow" : "border-line-2 bg-white text-ink-2 hover:border-ink-4",
            )}
          >
            <span className={cn("text-[11px] font-semibold", day === i ? "text-white/80" : "text-ink-3")}>{d.label}</span>
            <span className="text-lg leading-tight font-bold">{d.date}</span>
            <span className={cn("text-[10.5px] font-semibold uppercase", day === i ? "text-white/80" : "text-ink-3")}>{d.month}</span>
          </button>
        ))}
      </div>

      <div className="mt-4">
        <FieldLabel hint="India time (IST)">Pick a time</FieldLabel>
        <div className={cn("grid gap-2", mobile ? "grid-cols-2" : "grid-cols-3")} role="radiogroup" aria-label="Time">
          {demoForm.slots.map((s, i) => (
            <button
              key={s.time}
              type="button"
              role="radio"
              aria-checked={slot === i}
              disabled={!s.available}
              onClick={() => setSlot(i)}
              className={cn(
                "h-10 rounded-[10px] border text-[13px] font-semibold transition-colors",
                !s.available && "border-line text-ink-4 line-through",
                s.available && slot === i && "border-brand-600 bg-brand-50 text-brand-600 ring-3 ring-brand-600/10",
                s.available && slot !== i && "border-line-2 bg-white text-ink-2 hover:border-ink-4",
              )}
            >
              {s.time}
            </button>
          ))}
        </div>
      </div>

      <Toggle label="I'd like a Hindi-speaking host" defaultOn className="mt-4" />

      <Button type="submit" size="lg" full iconRight="ArrowRight" className="mt-5">
        {mobile ? `Confirm · ${chosenDay.label} ${chosenDay.date} ${chosenDay.month}, ${chosenSlot.time}` : `Confirm demo · ${when}`}
      </Button>
    </form>
  );
}
