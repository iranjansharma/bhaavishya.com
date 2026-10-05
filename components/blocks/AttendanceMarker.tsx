"use client";

import { useMemo, useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { AttendanceMark, Student } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const MARK_STYLE: Record<Exclude<AttendanceMark, "V">, string> = {
  P: "bg-mint-500 text-white",
  A: "bg-coral-500 text-white",
  L: "bg-marigold-400 text-night-950",
};

const CARD_STYLE: Record<AttendanceMark, string> = {
  P: "border-line bg-white",
  A: "border-coral-100 bg-linear-to-b from-[#fff5f5] to-white",
  L: "border-[#fde3b0] bg-linear-to-b from-[#fff9ec] to-white",
  V: "border-ocean-100 bg-linear-to-b from-[#f1f6ff] to-white",
};

/**
 * Take attendance: everyone starts as Present, the teacher taps the exceptions.
 * layout="grid" for computers, "list" for phones.
 * TODO: on submit, save the marks and send parent alerts from your server.
 */
export function AttendanceMarker({ students, layout }: { students: Student[]; layout: "grid" | "list" }) {
  const [marks, setMarks] = useState<Record<number, AttendanceMark>>(() => Object.fromEntries(students.map((s) => [s.roll, s.mark])));
  const [sent, setSent] = useState(false);

  const tally = useMemo(() => {
    const values = Object.values(marks);
    const count = (m: AttendanceMark) => values.filter((v) => v === m).length;
    const present = count("P") + count("L");
    return { P: count("P"), A: count("A"), L: count("L"), V: count("V"), present, percent: (present / students.length) * 100 };
  }, [marks, students.length]);

  const setMark = (roll: number, mark: AttendanceMark) => {
    setSent(false);
    setMarks((current) => ({ ...current, [roll]: mark }));
  };
  const allPresent = () => {
    setSent(false);
    setMarks((current) => Object.fromEntries(Object.entries(current).map(([roll, m]) => [roll, m === "V" ? "V" : "P"])) as Record<number, AttendanceMark>);
  };

  const summary = (
    <div className={cn("flex items-center gap-4", layout === "list" && "flex-wrap gap-y-2")}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
        <Legend color="bg-mint-500" label="Present" value={tally.P} />
        <Legend color="bg-marigold-400" label="Late" value={tally.L} />
        <Legend color="bg-coral-500" label="Absent" value={tally.A} />
        <Legend color="bg-ocean-500" label="On leave" value={tally.V} />
      </div>
      <div className="flex min-w-[120px] flex-1 overflow-hidden rounded-full bg-track" style={{ height: 10 }}>
        <span className="bg-mint-500" style={{ width: `${(tally.P / students.length) * 100}%` }} />
        <span className="bg-marigold-400" style={{ width: `${(tally.L / students.length) * 100}%` }} />
        <span className="bg-coral-500" style={{ width: `${(tally.A / students.length) * 100}%` }} />
        <span className="bg-ocean-500" style={{ width: `${(tally.V / students.length) * 100}%` }} />
      </div>
      <b className="text-xl tracking-tight tabular-nums">{tally.percent.toFixed(1)}%</b>
    </div>
  );

  const markAll = (
    <Button variant="secondary" size={layout === "list" ? "sm" : "md"} icon="CheckCheck" onClick={allPresent}>
      Mark all present
    </Button>
  );
  const submit = (
    <Button variant="mint" size="md" icon={sent ? "Check" : "Send"} onClick={() => setSent(true)}>
      {sent ? "Sent · parents notified" : layout === "list" ? "Submit" : "Submit & notify parents"}
    </Button>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className={cn("rounded-2xl border border-line bg-white shadow-card", layout === "list" ? "p-4" : "flex items-center justify-between gap-6 px-5 py-3.5")}>
        {summary}
        {layout === "list" ? (
          <div className="mt-3">{markAll}</div>
        ) : (
          <div className="flex items-center gap-2">
            {markAll}
            {submit}
          </div>
        )}
      </div>

      {layout === "grid" ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2.5">
          {students.map((s) => (
            <div key={s.roll} className={cn("flex min-w-0 flex-col gap-2 rounded-[14px] border p-2.5 shadow-card", CARD_STYLE[marks[s.roll]])}>
              <div className="flex min-w-0 items-center gap-2">
                <Avatar src={s.avatar} size={30} />
                <div className="min-w-0">
                  <div className="truncate text-[12.5px] font-semibold">{s.name}</div>
                  <div className="truncate text-[11px] text-ink-3">{marks[s.roll] === "L" && s.note ? s.note : `Roll ${String(s.roll).padStart(2, "0")}`}</div>
                </div>
              </div>
              <MarkButtons value={marks[s.roll]} onChange={(m) => setMark(s.roll, m)} />
            </div>
          ))}
        </div>
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white shadow-card">
          {students.map((s) => (
            <li key={s.roll} className={cn("flex items-center gap-3 px-3.5 py-2.5", marks[s.roll] === "A" && "bg-[#fff7f7]", marks[s.roll] === "L" && "bg-[#fffaf0]")}>
              <span className="w-5 text-right text-[11px] font-semibold text-ink-3 tabular-nums">{s.roll}</span>
              <Avatar src={s.avatar} size={34} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13.5px] font-semibold">{s.name}</div>
                {marks[s.roll] === "L" && s.note ? <div className="text-[11px] text-marigold-700">{s.note}</div> : null}
              </div>
              <MarkButtons value={marks[s.roll]} onChange={(m) => setMark(s.roll, m)} compact />
            </li>
          ))}
        </ul>
      )}

      {layout === "list" ? (
        /* Phones: the submit bar stays above the tab bar while the teacher scrolls the class list. */
        <div className="sticky bottom-[calc(76px+env(safe-area-inset-bottom))] z-20 flex items-center gap-3 rounded-2xl border border-line bg-white/95 py-2.5 pr-2.5 pl-4 shadow-lift backdrop-blur-md">
          <div className="min-w-0 flex-1 leading-tight">
            <b className="text-[15px] tabular-nums">
              {tally.present}/{students.length} present
            </b>
            <div className="truncate text-[11.5px] text-ink-3">
              {tally.A} absent · {tally.L} late · {tally.V} on leave
            </div>
          </div>
          {submit}
        </div>
      ) : null}

      <div className="flex items-start gap-2.5 rounded-[14px] border border-mint-100 bg-mint-50 px-4 py-3 text-[13px] font-semibold text-mint-700">
        <Icon name="BellRing" className="mt-px size-4" />
        <span>When you submit, parents of absent and late students get an instant alert in their own language — on the app, WhatsApp and SMS.</span>
      </div>
    </div>
  );
}

function MarkButtons({ value, onChange, compact = false }: { value: AttendanceMark; onChange: (mark: AttendanceMark) => void; compact?: boolean }) {
  if (value === "V") {
    return (
      <span className={cn("inline-flex items-center gap-1.5 text-[11px] font-bold text-ocean-700", compact ? "" : "h-6")}>
        <Icon name="CalendarCheck" className="size-3.5" />
        On leave
      </span>
    );
  }
  return (
    <div className={cn("grid grid-cols-3 gap-1", compact ? "w-[108px]" : "")} role="radiogroup" aria-label="Attendance">
      {(["P", "A", "L"] as const).map((m) => (
        <button
          key={m}
          type="button"
          role="radio"
          aria-checked={value === m}
          aria-label={m === "P" ? "Present" : m === "A" ? "Absent" : "Late"}
          onClick={() => onChange(m)}
          className={cn(
            "grid place-items-center rounded-[7px] text-[11.5px] font-extrabold transition-colors",
            compact ? "h-8" : "h-6",
            value === m ? MARK_STYLE[m] : "bg-[#f3f1f9] text-[#a9a6c0] hover:text-ink-2",
          )}
        >
          {m}
        </button>
      ))}
    </div>
  );
}

function Legend({ color, label, value }: { color: string; label: string; value: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <span className={cn("size-2 rounded-full", color)} />
      {label} <b className="tabular-nums">{value}</b>
    </span>
  );
}
