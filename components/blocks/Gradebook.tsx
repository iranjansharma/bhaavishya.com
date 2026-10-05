"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { gradeFor, gradeTone } from "@/lib/grades";
import { cn } from "@/lib/utils";

type Row = { roll: number; name: string; avatar: string; theory: number; internal: number };

const REMARKS: Record<string, string> = {
  A1: "Outstanding",
  A2: "Excellent work",
  B1: "Good progress",
  B2: "Steady progress",
  C1: "Needs regular practice",
  C2: "Practise fractions daily",
  D: "Remedial class advised",
  E: "Remedial + parent meeting",
};

/**
 * Editable marks: change Theory or Internal and the total, grade and remark update.
 * layout="table" for computers, "cards" for phones.
 * TODO: save changes to your database (debounced) and publish when the teacher is ready.
 */
export function Gradebook({ rows, layout, pageSize = 11 }: { rows: Row[]; layout: "table" | "cards"; pageSize?: number }) {
  const [values, setValues] = useState(rows);
  const [filter, setFilter] = useState<"all" | "risk">("all");

  const withTotals = useMemo(
    () =>
      values.map((r) => {
        const total = r.theory + r.internal;
        const grade = gradeFor(total);
        return { ...r, total, grade, remark: REMARKS[grade] };
      }),
    [values],
  );
  const atRisk = withTotals.filter((r) => r.total <= 50);
  const [limit, setLimit] = useState(pageSize);
  const list = filter === "risk" ? atRisk : withTotals;
  const shown = list.slice(0, limit);

  const update = (roll: number, field: "theory" | "internal", raw: string) => {
    const max = field === "theory" ? 80 : 20;
    const n = Math.max(0, Math.min(max, Number(raw.replace(/\D/g, "")) || 0));
    setValues((current) => current.map((r) => (r.roll !== roll ? r : field === "theory" ? { ...r, theory: n } : { ...r, internal: n })));
  };

  const filters = (
    <div className="flex flex-wrap items-center gap-2">
      <FilterChip on={filter === "all"} onClick={() => setFilter("all")}>
        All · {withTotals.length}
      </FilterChip>
      <FilterChip on={filter === "risk"} onClick={() => setFilter("risk")}>
        <Icon name="TriangleAlert" className="size-3.5" /> 50 or below · {atRisk.length}
      </FilterChip>
      <span className="ml-auto text-xs text-ink-3">
        1–{shown.length} of {list.length}
      </span>
    </div>
  );

  const more =
    list.length > shown.length ? (
      <button
        type="button"
        onClick={() => setLimit((n) => n + pageSize)}
        className="mx-auto inline-flex h-9 items-center gap-1.5 rounded-xl border border-line-2 bg-white px-4 text-[13px] font-semibold text-ink-2 hover:border-ink-4"
      >
        Show {Math.min(pageSize, list.length - shown.length)} more
        <Icon name="ChevronDown" className="size-4" />
      </button>
    ) : null;

  if (layout === "cards") {
    return (
      <div className="flex flex-col gap-3">
        {filters}
        <ul className="flex flex-col gap-2.5">
          {shown.map((r) => (
            <li key={r.roll} className="rounded-2xl border border-line bg-white p-3.5 shadow-card">
              <div className="flex items-center gap-2.5">
                <Avatar src={r.avatar} size={34} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 truncate text-[13.5px] font-semibold">
                    {r.name}
                    {r.total <= 50 ? <Icon name="TriangleAlert" className="size-3.5 text-coral-500" label="50 or below" /> : null}
                  </div>
                  <div className="text-[11.5px] text-ink-3">
                    Roll {String(r.roll).padStart(2, "0")} · {r.remark}
                  </div>
                </div>
                <Pill tone={gradeTone(r.grade)}>{r.grade}</Pill>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <MarkInput label="Theory /80" value={r.theory} onChange={(v) => update(r.roll, "theory", v)} />
                <MarkInput label="Internal /20" value={r.internal} onChange={(v) => update(r.roll, "internal", v)} />
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-ink-3">Total</span>
                  <span className="grid h-10 place-items-center rounded-[10px] bg-canvas text-[15px] font-bold tabular-nums">{r.total}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {more}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {filters}
      <table className="w-full border-separate border-spacing-0 text-[13px]">
        <thead>
          <tr className="text-left text-[11px] font-bold tracking-[0.06em] text-ink-3 uppercase [&>th]:border-b [&>th]:border-line [&>th]:bg-[#faf9fd] [&>th]:px-3 [&>th]:py-2.5">
            <th className="rounded-tl-[10px]">Roll</th>
            <th>Student</th>
            <th>Theory /80</th>
            <th>Internal /20</th>
            <th>Total</th>
            <th>Grade</th>
            <th className="rounded-tr-[10px]">Remark</th>
          </tr>
        </thead>
        <tbody>
          {shown.map((r) => (
            <tr key={r.roll} className="[&>td]:border-b [&>td]:border-line [&>td]:px-3 [&>td]:py-2 last:[&>td]:border-0">
              <td className="text-ink-3 tabular-nums">{String(r.roll).padStart(2, "0")}</td>
              <td>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <Avatar src={r.avatar} size={28} />
                  <b className="font-semibold">{r.name}</b>
                  {r.total <= 50 ? <Icon name="TriangleAlert" className="size-3.5 text-coral-500" label="50 or below" /> : null}
                </div>
              </td>
              <td>
                <CellInput value={r.theory} label={`${r.name} theory`} onChange={(v) => update(r.roll, "theory", v)} />
              </td>
              <td>
                <CellInput value={r.internal} label={`${r.name} internal`} onChange={(v) => update(r.roll, "internal", v)} />
              </td>
              <td className="font-bold tabular-nums">{r.total}</td>
              <td>
                <Pill tone={gradeTone(r.grade)}>{r.grade}</Pill>
              </td>
              <td className="text-xs whitespace-nowrap text-ink-2">{r.remark}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {more}
    </div>
  );
}

function FilterChip({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-[12.5px] font-medium whitespace-nowrap",
        on ? "border-brand-200 bg-brand-50 text-brand-600" : "border-line-2 bg-white text-ink-2",
      )}
    >
      {children}
    </button>
  );
}

function CellInput({ value, label, onChange }: { value: number; label: string; onChange: (value: string) => void }) {
  return (
    <input
      inputMode="numeric"
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-8 w-[62px] rounded-[9px] border border-line-2 bg-white text-center font-semibold tabular-nums outline-none focus:border-brand-600 focus:ring-3 focus:ring-brand-600/15"
    />
  );
}

function MarkInput({ label, value, onChange }: { label: string; value: number; onChange: (value: string) => void }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[11px] font-semibold text-ink-3">{label}</span>
      <input
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 rounded-[10px] border border-line-2 bg-white text-center text-[15px] font-semibold tabular-nums outline-none focus:border-brand-600 focus:ring-3 focus:ring-brand-600/15"
      />
    </label>
  );
}
