import type { ReactNode } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { DateBadge } from "@/components/ui/bits";
import { Icon } from "@/components/ui/Icon";
import { IconTile, Pill } from "@/components/ui/Pill";
import { Progress } from "@/components/ui/Progress";
import {
  subjects,
  type Announcement,
  type CalendarDay,
  type CalendarEntry,
  type HomeworkItem,
  type LeaveRecord,
  type MarkRow,
  type SubjectKey,
  type TimetableSlot,
} from "@/lib/demo-data";
import { gradeFor, gradeTone } from "@/lib/grades";
import { cn } from "@/lib/utils";
import { RsvpButtons } from "./interactive";

/* Parent-section blocks shared by the desktop and mobile versions. */

export function SubjectIcon({ subject, size = "md" }: { subject: SubjectKey; size?: "sm" | "md" }) {
  const s = subjects[subject];
  return <IconTile icon={s.icon} tone={s.tone} size={size} />;
}

/** Today's timetable. */
export function TimetableList({ slots, compact = false }: { slots: TimetableSlot[]; compact?: boolean }) {
  return (
    <ul className="divide-y divide-line">
      {slots.map((slot) => (
        <li key={slot.time} className={cn("flex items-center gap-3", compact ? "py-2" : "py-2.5")}>
          <span className="w-10 shrink-0 text-xs font-semibold text-ink-3 tabular-nums">{slot.time}</span>
          <SubjectIcon subject={slot.subject} size="sm" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13.5px] font-semibold">{subjects[slot.subject].name}</div>
            <div className="truncate text-xs text-ink-3">{slot.teacher}</div>
          </div>
          {slot.status === "done" ? (
            <Pill tone="mint" icon="Check">
              Done
            </Pill>
          ) : slot.status === "now" ? (
            <Pill tone="marigold">● Now{slot.room ? ` · ${slot.room}` : ""}</Pill>
          ) : (
            <span className="text-xs text-ink-3">{slot.room}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

/** School announcements. The pinned one gets RSVP buttons. */
export function AnnouncementList({ items }: { items: Announcement[] }) {
  return (
    <ul className="divide-y divide-line">
      {items.map((a) => (
        <li key={a.id} className="flex items-start gap-3 py-3">
          <IconTile icon={a.icon} tone={a.pinned ? "marigold" : "grey"} size="md" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <span className="text-[13.5px] font-semibold">{a.title}</span>
              <span className="text-[11px] text-ink-3">
                {a.from} · {a.when}
              </span>
            </div>
            <div className="mt-0.5 text-xs text-ink-2">{a.body}</div>
            {a.pinned ? <RsvpButtons className="mt-2" /> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Upcoming holidays and events with a date square. */
export function DateList({ items }: { items: CalendarEntry[] }) {
  return (
    <ul className="divide-y divide-line">
      {items.map((d) => (
        <li key={`${d.day}-${d.month}`} className="flex items-center gap-3 py-2">
          <DateBadge day={d.day} month={d.month} tone={d.kind === "holiday" ? "marigold" : "brand"} />
          <div className="min-w-0">
            <div className="truncate text-[13.5px] font-semibold">{d.title}</div>
            <div className="truncate text-xs text-ink-3">{d.note}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function HomeworkList({ items }: { items: HomeworkItem[] }) {
  return (
    <ul className="divide-y divide-line">
      {items.map((h) => (
        <li key={h.title} className="flex items-center gap-3 py-2">
          <SubjectIcon subject={h.subject} size="sm" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 truncate text-[13px] font-semibold">
              {h.title}
              {h.attachment ? <Icon name="Paperclip" className="size-3.5 text-ink-3" /> : null}
            </div>
            <div className="text-[11.5px] text-ink-3">{h.due}</div>
          </div>
          {h.done ? <Icon name="CircleCheck" className="size-[18px] text-mint-500" label="Done" /> : null}
        </li>
      ))}
    </ul>
  );
}

/** Subject marks as a table (desktop). */
export function MarksTable({ rows }: { rows: MarkRow[] }) {
  return (
    <table className="w-full border-separate border-spacing-0 text-[13px]">
      <thead>
        <tr className="text-left text-[11px] font-bold tracking-[0.06em] text-ink-3 uppercase">
          <th className="rounded-tl-[10px] border-b border-line bg-[#faf9fd] px-3 py-2.5">Subject</th>
          <th className="border-b border-line bg-[#faf9fd] px-3 py-2.5">Marks / 100</th>
          <th className="border-b border-line bg-[#faf9fd] px-3 py-2.5 text-center">Class avg</th>
          <th className="rounded-tr-[10px] border-b border-line bg-[#faf9fd] px-3 py-2.5 text-center">Grade</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => {
          const s = subjects[r.subject];
          const grade = gradeFor(r.halfYearly);
          return (
            <tr key={r.subject} className="[&>td]:border-b [&>td]:border-line last:[&>td]:border-0">
              <td className="px-3 py-2">
                <div className="flex items-center gap-2.5">
                  <SubjectIcon subject={r.subject} size="sm" />
                  <div>
                    <div className="font-semibold whitespace-nowrap">{s.name}</div>
                    <div className="text-[11px] text-ink-3">{r.teacher}</div>
                  </div>
                </div>
              </td>
              <td className="w-[46%] px-3 py-2">
                <div className="flex items-center gap-3">
                  <Progress value={r.halfYearly} marker={r.classAverage} tone={s.tone} className="flex-1" />
                  <b className="w-6 text-right tabular-nums">{r.halfYearly}</b>
                </div>
              </td>
              <td className="px-3 py-2 text-center text-ink-3 tabular-nums">{r.classAverage}</td>
              <td className="px-3 py-2 text-center">
                <Pill tone={gradeTone(grade)}>{grade}</Pill>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/** Subject marks as stacked rows (phones). */
export function MarksList({ rows }: { rows: MarkRow[] }) {
  return (
    <ul className="divide-y divide-line">
      {rows.map((r) => {
        const s = subjects[r.subject];
        const grade = gradeFor(r.halfYearly);
        return (
          <li key={r.subject} className="py-3">
            <div className="flex items-center gap-3">
              <SubjectIcon subject={r.subject} size="sm" />
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-semibold">{s.name}</div>
                <div className="text-[11px] text-ink-3">
                  {r.teacher} · class avg {r.classAverage}
                </div>
              </div>
              <b className="text-[17px] tabular-nums">{r.halfYearly}</b>
              <Pill tone={gradeTone(grade)}>{grade}</Pill>
            </div>
            <Progress value={r.halfYearly} marker={r.classAverage} tone={s.tone} size="sm" className="mt-2.5 ml-10" />
          </li>
        );
      })}
    </ul>
  );
}

const DAY_STYLE: Record<CalendarDay["status"], string> = {
  present: "border-line bg-white",
  absent: "border-coral-100 bg-coral-50",
  late: "border-[#fde3b0] bg-[#fff8ea]",
  holiday: "border-[#ffd98a] bg-linear-to-br from-[#fff3d6] to-marigold-100",
  weekend: "border-line bg-[#faf9fd] text-ink-4",
  outside: "border-dashed border-line bg-transparent text-ink-4",
};

/** Month calendar with attendance, holidays and exams. `compact` for phones. */
export function AttendanceCalendar({ days, compact = false }: { days: CalendarDay[]; compact?: boolean }) {
  const weekdays = compact ? ["M", "T", "W", "T", "F", "S", "S"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className={cn("grid grid-cols-7", compact ? "gap-1" : "gap-1.5")}>
      {weekdays.map((w, i) => (
        <div key={i} className={cn("text-[11px] font-bold tracking-[0.06em] text-ink-3 uppercase", compact ? "text-center" : "px-1 pb-1")}>
          {w}
        </div>
      ))}
      {days.map((d, i) => {
        if (compact) {
          const dot =
            d.status === "absent" ? "bg-coral-500" : d.status === "late" ? "bg-marigold-400" : d.status === "holiday" ? "bg-marigold-300" : d.status === "present" ? "bg-mint-500" : "";
          return (
            <div
              key={i}
              className={cn(
                "flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border text-[12.5px] font-semibold",
                DAY_STYLE[d.status],
                d.tag === "exam" && "ring-2 ring-brand-200",
              )}
            >
              {d.date}
              {dot ? <span className={cn("size-1.5 rounded-full", dot)} /> : <span className="size-1.5" />}
            </div>
          );
        }
        return (
          <div key={i} className={cn("flex h-[104px] flex-col gap-1 rounded-[13px] border p-2 text-[11.5px]", DAY_STYLE[d.status])}>
            <div className="flex items-center justify-between">
              <span className="text-[13.5px] font-bold">{d.date}</span>
              {d.status === "present" ? <Icon name="CircleCheck" className="size-4 text-mint-500" /> : null}
            </div>
            {d.status === "weekend" ? <span>Weekend</span> : null}
            {d.status === "absent" ? <DayTag className="bg-coral-500 text-white">Absent</DayTag> : null}
            {d.status === "late" ? <DayTag className="bg-marigold-400 text-night-950">Late</DayTag> : null}
            {d.status === "holiday" ? (
              <DayTag className="bg-white text-marigold-700">
                <Icon name="PartyPopper" className="size-3" />
                Holiday
              </DayTag>
            ) : null}
            {d.tag === "exam" ? (
              <DayTag className="bg-brand-50 text-brand-600">
                <Icon name="PenLine" className="size-3" />
                Exam
              </DayTag>
            ) : null}
            {d.tag === "event" ? <DayTag className="bg-rose-50 text-rose-500">Event</DayTag> : null}
            {d.label ? (
              <span className={cn("leading-tight font-semibold", d.status === "absent" ? "text-coral-700" : d.status === "holiday" ? "text-marigold-700" : "text-ink-2")}>
                {d.label}
              </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function DayTag({ children, className }: { children: ReactNode; className: string }) {
  return <span className={cn("inline-flex w-fit items-center gap-1 rounded-md px-1.5 py-0.5 text-[10.5px] font-bold", className)}>{children}</span>;
}

export function CalendarLegend({ className }: { className?: string }) {
  const items = [
    ["Present", "bg-mint-500"],
    ["Absent", "bg-coral-500"],
    ["Late", "bg-marigold-400"],
    ["Holiday", "bg-marigold-300"],
    ["Exam", "bg-brand-600"],
  ];
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-2", className)}>
      {items.map(([label, color]) => (
        <span key={label} className="inline-flex items-center gap-1.5">
          <span className={cn("size-2 rounded-full", color)} />
          {label}
        </span>
      ))}
    </div>
  );
}

/** Past leave requests with the teacher's reply. */
export function LeaveHistoryList({ items, teacherAvatar }: { items: LeaveRecord[]; teacherAvatar: string }) {
  return (
    <ul className="divide-y divide-line">
      {items.map((leave) => {
        const ok = leave.status === "approved";
        return (
          <li key={leave.title + leave.dates} className="flex items-start gap-3 py-3">
            <IconTile icon={ok ? "CalendarCheck" : "CalendarX"} tone={ok ? "mint" : "coral"} size="md" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <b className="text-[13px]">{leave.title}</b>
                <Pill tone={ok ? "mint" : "coral"} icon={ok ? "Check" : "X"}>
                  {ok ? "Approved" : "Declined"}
                </Pill>
              </div>
              <div className="text-xs text-ink-3">{leave.dates} · by Mrs. Kavita Iyer</div>
              {leave.note ? (
                <div className="mt-1.5 flex items-center gap-2 rounded-[10px] bg-[#faf9fd] px-2.5 py-1.5">
                  <Avatar src={teacherAvatar} size={22} />
                  <span className="text-xs text-ink-2">“{leave.note}”</span>
                </div>
              ) : null}
              {leave.attachment ? (
                <div className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-ocean-700">
                  <Icon name="Paperclip" className="size-3.5" />
                  {leave.attachment}
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
