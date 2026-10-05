"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Chip, ChipGroup } from "@/components/ui/Chips";
import { FieldLabel, FileChip, TextArea, TextField } from "@/components/ui/bits";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { Toggle } from "@/components/ui/Toggle";
import { childToday, kids, leaveDraft, leaveTypes } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

/**
 * Parent's leave request. Shows a confirmation when sent.
 * TODO: post the form to your API, upload attachments to storage, notify the class teacher.
 */
export function LeaveForm({ layout }: { layout: "desktop" | "mobile" }) {
  const [sent, setSent] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // The confirmation is shorter than the form, so bring it into view after sending.
  useEffect(() => {
    if (sent) root.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [sent]);
  const mobile = layout === "mobile";
  const child = kids[0];

  if (sent) {
    return (
      <div ref={root} className="flex scroll-mt-24 flex-col items-center rounded-2xl border border-line bg-white px-6 py-10 text-center shadow-card">
        <span className="grid size-14 place-items-center rounded-full bg-mint-50 text-mint-500">
          <Icon name="CircleCheck" className="size-7" />
        </span>
        <h3 className="mt-4 text-lg font-bold">Request sent to {childToday.classTeacher.name}</h3>
        <p className="mt-1 max-w-sm text-sm text-ink-2">You&apos;ll get a notification on the app and WhatsApp when it&apos;s approved — usually within 2 hours.</p>
        <Button variant="secondary" className="mt-5" onClick={() => setSent(false)}>
          Apply for another leave
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className={cn("flex flex-col gap-4 rounded-2xl border border-line bg-white shadow-card", mobile ? "p-4" : "p-6")}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[17px] font-semibold">New leave request</h3>
        <span className="flex items-center gap-2 text-xs text-ink-3">
          <Avatar src={child.avatar} size={24} />
          For {child.firstName} · {child.className}
        </span>
      </div>

      <div>
        <FieldLabel>Type of leave</FieldLabel>
        <ChipGroup options={leaveTypes} defaultValue="Sick leave" size={mobile ? "sm" : "md"} label="Type of leave" />
      </div>

      <div className={cn("grid items-end gap-3", mobile ? "grid-cols-2" : "grid-cols-[1fr_1fr_auto]")}>
        <TextField label="From" name="from" defaultValue={leaveDraft.from} icon="Calendar" />
        <TextField label="To" name="to" defaultValue={leaveDraft.to} icon="Calendar" />
        <div className={cn(mobile ? "col-span-2" : "pb-2.5")}>
          <Pill tone="brand">{leaveDraft.days}</Pill>
        </div>
      </div>

      <Toggle label="Half day only" />

      <TextArea label="Reason" name="reason" defaultValue={leaveDraft.reason} rows={mobile ? 4 : 3} />

      <div>
        <FieldLabel hint="optional">Attachments</FieldLabel>
        <div className={cn("flex gap-2.5", mobile ? "flex-col" : "items-stretch")}>
          <FileChip
            className="flex-1"
            name={leaveDraft.attachment.name}
            meta={`${leaveDraft.attachment.size} · uploaded`}
            right={<Icon name="CircleCheck" className="size-[18px] text-mint-500" />}
          />
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-[1.5px] border-dashed border-brand-200 bg-brand-50 px-4 py-3 text-[13px] font-semibold text-brand-600">
            <Icon name="ImagePlus" className="size-[18px]" />
            Add photo or PDF
            <input type="file" accept="image/*,application/pdf" className="sr-only" />
          </label>
        </div>
      </div>

      <div>
        <FieldLabel>What {child.firstName} will miss</FieldLabel>
        <div className="flex flex-col gap-2">
          {leaveDraft.missed.map((day) => (
            <div key={day.day} className="flex flex-wrap items-center gap-1.5">
              <span className="w-[74px] shrink-0 text-xs font-semibold whitespace-nowrap text-ink-2">{day.day}</span>
              {day.classes.map((c) => (
                <Chip key={c} size="sm" warn={c === leaveDraft.warning} icon={c === leaveDraft.warning ? "TriangleAlert" : undefined}>
                  {c}
                </Chip>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-brand-100 bg-brand-50 px-3.5 py-3 text-[13px] text-ink-2">
        <Icon name="Sparkles" className="size-4 text-brand-600" />
        <span className="flex-1">
          <b className="text-ink">Bhavi will keep {child.firstName} on track</b> — you&apos;ll get the homework and class notes for the missed days each evening.
        </span>
        <Toggle defaultOn />
      </div>

      <div className={cn("flex gap-3 border-t border-line pt-4", mobile ? "flex-col" : "items-center justify-between")}>
        <div className="flex items-center gap-2.5">
          <Avatar src={childToday.classTeacher.avatar} size={34} />
          <div>
            <div className="text-[13px] font-semibold">Goes to {childToday.classTeacher.name}</div>
            <div className="text-xs text-ink-3">Class teacher · usually replies within 2 hours</div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className={mobile ? "flex-1" : undefined}>
            Save draft
          </Button>
          <Button type="submit" iconRight="Send" className={mobile ? "flex-1" : undefined}>
            Submit request
          </Button>
        </div>
      </div>
    </form>
  );
}
