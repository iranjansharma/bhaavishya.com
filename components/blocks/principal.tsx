import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { Progress } from "@/components/ui/Progress";
import { Sparkline, heatColor } from "@/components/charts";
import type { Approval, TeacherRow } from "@/lib/demo-data";
import { cn } from "@/lib/utils";
import { DecisionButtons } from "./interactive";

/* Principal-section blocks shared by the desktop and mobile versions. */

/** Today's attendance for every class and section, coloured from red (low) to green (high). */
export function AttendanceHeatmap({
  data,
  compact = false,
}: {
  data: { sections: string[]; grid: Array<Array<number | null>>; lowest: { section: string; classNo: number } };
  compact?: boolean;
}) {
  const cell = compact ? "h-[26px] rounded-md text-[10px]" : "h-[30px] rounded-lg text-[11.5px]";
  return (
    <div className={cn("grid items-center", compact ? "grid-cols-[16px_repeat(12,minmax(0,1fr))] gap-[3px]" : "grid-cols-[22px_repeat(12,minmax(0,1fr))] gap-[5px]")}>
      <span />
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} className="text-center text-[11px] font-semibold text-ink-3">
          {i + 1}
        </span>
      ))}
      {data.sections.map((section, r) => (
        <Row key={section} section={section} values={data.grid[r]} cell={cell} lowest={data.lowest} />
      ))}
    </div>
  );
}

function Row({
  section,
  values,
  cell,
  lowest,
}: {
  section: string;
  values: Array<number | null>;
  cell: string;
  lowest: { section: string; classNo: number };
}) {
  return (
    <>
      <span className="text-[11px] font-semibold text-ink-3">{section}</span>
      {values.map((v, i) =>
        v === null ? (
          <span key={i} className={cn(cell, "bg-[repeating-linear-gradient(45deg,#f4f2f9,#f4f2f9_4px,#fbfafd_4px,#fbfafd_8px)]")} title="No section" />
        ) : (
          <span
            key={i}
            title={`${i + 1}-${section}: ${v}%`}
            className={cn(
              cell,
              "grid place-items-center font-bold text-white",
              lowest.section === section && lowest.classNo === i + 1 && "ring-2 ring-coral-500 ring-offset-2",
            )}
            style={{ background: heatColor(v) }}
          >
            {v}
          </span>
        ),
      )}
    </>
  );
}

/** Teacher leave requests waiting for the principal. */
export function ApprovalList({ items, more }: { items: Approval[]; more?: string }) {
  return (
    <div>
      <ul className="divide-y divide-line">
        {items.map((a) => (
          <li key={a.id} className="flex items-center gap-3 py-2.5">
            <Avatar src={a.avatar} size={34} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-semibold">{a.name}</div>
              <div className="truncate text-xs text-ink-2">{a.detail}</div>
              <div className="truncate text-[11px] text-ink-3">{a.note}</div>
            </div>
            <DecisionButtons stacked />
          </li>
        ))}
      </ul>
      {more ? (
        <div className="mt-1.5 flex items-center justify-between rounded-[10px] bg-[#faf9fd] px-2.5 py-2 text-xs">
          <span className="text-ink-2">{more}</span>
          <span className="font-semibold text-brand-600">Review</span>
        </div>
      ) : null}
    </div>
  );
}

/** Teachers on leave today and who is covering. */
export function TeachersOnLeave({ items }: { items: Array<{ avatar: string; name: string; detail: string; substitute?: { name: string; avatar: string } }> }) {
  return (
    <ul className="divide-y divide-line">
      {items.map((t) => (
        <li key={t.name} className="flex items-start gap-3 py-2.5">
          <Avatar src={t.avatar} size={34} />
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold">{t.name}</div>
            <div className="text-xs text-ink-3">{t.detail}</div>
            {t.substitute ? (
              <div className="mt-1 flex items-center gap-1.5 text-xs text-ink-2">
                <Icon name="ArrowRight" className="size-3.5 text-ink-3" />
                <Avatar src={t.substitute.avatar} size={20} />
                {t.substitute.name}
                <Icon name="CircleCheck" className="size-3.5 text-mint-500" label="Covered" />
              </div>
            ) : (
              <Pill tone="marigold" icon="TriangleAlert" className="mt-1">
                No substitute · assign
              </Pill>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

const TODAY_TONE = { Present: "mint", Late: "marigold", "On leave": "ocean" } as const;

/** One row per teacher (computers). */
export function TeacherTable({ rows }: { rows: TeacherRow[] }) {
  return (
    <table className="w-full border-separate border-spacing-0 text-[13px]">
      <thead>
        <tr className="text-left text-[11px] font-bold tracking-[0.06em] whitespace-nowrap text-ink-3 uppercase [&>th]:border-b [&>th]:border-line [&>th]:bg-[#faf9fd] [&>th]:px-2.5 [&>th]:py-2.5">
          <th className="rounded-tl-[10px]">Teacher</th>
          <th>Today</th>
          <th>Attendance</th>
          <th>Syllabus</th>
          <th>Avg result</th>
          <th>Rating</th>
          <th className="rounded-tr-[10px]">Trend</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((t, i) => (
          <tr key={t.name} className="whitespace-nowrap [&>td]:border-b [&>td]:border-line [&>td]:px-2.5 [&>td]:py-2 last:[&>td]:border-0">
            <td>
              <div className="flex items-center gap-2.5">
                <Avatar src={t.avatar} size={32} />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-ink-3">
                    {t.subject} · {t.classes} classes
                  </div>
                </div>
              </div>
            </td>
            <td>
              <Pill tone={TODAY_TONE[t.today.label]}>{t.today.label}</Pill>
              <div className="mt-0.5 text-[11px] text-ink-3">{t.today.detail}</div>
            </td>
            <td className="font-semibold tabular-nums">{t.attendance}%</td>
            <td>
              <div className="flex items-center gap-2">
                <Progress value={t.syllabus} size="sm" tone={t.syllabus < 60 ? "coral" : t.syllabus < 68 ? "marigold" : "mint"} className="w-14" />
                <span className="w-8 text-xs font-semibold tabular-nums">{t.syllabus}%</span>
              </div>
            </td>
            <td className="tabular-nums">
              <b>{t.result}</b> <span className={cn("text-xs", t.improving ? "text-mint-700" : "text-coral-700")}>{t.improving ? "▲" : "▼"}</span>
            </td>
            <td>
              <span className="inline-flex items-center gap-1 font-bold tabular-nums">
                <Star /> {t.rating}
              </span>
            </td>
            <td>
              <Sparkline id={`trend-${i}`} values={t.trend} color={t.improving ? "#12B886" : "#EF4E5A"} width={64} height={24} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** One card per teacher (phones). */
export function TeacherCards({ rows }: { rows: TeacherRow[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {rows.map((t, i) => (
        <li key={t.name} className="rounded-2xl border border-line bg-white p-3.5 shadow-card">
          <div className="flex items-center gap-2.5">
            <Avatar src={t.avatar} size={38} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13.5px] font-semibold">{t.name}</div>
              <div className="text-xs text-ink-3">
                {t.subject} · {t.classes} classes
              </div>
            </div>
            <div className="text-right">
              <Pill tone={TODAY_TONE[t.today.label]}>{t.today.label}</Pill>
              <div className="mt-0.5 text-[11px] text-ink-3">{t.today.detail}</div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <Metric label="Attendance" value={`${t.attendance}%`} />
            <Metric label="Avg result" value={`${t.result} ${t.improving ? "▲" : "▼"}`} tone={t.improving ? "text-mint-700" : "text-coral-700"} />
            <Metric label="Rating" value={`★ ${t.rating}`} />
          </div>
          <div className="mt-3 flex items-center gap-2.5">
            <span className="text-[11px] font-semibold text-ink-3">Syllabus</span>
            <Progress value={t.syllabus} size="sm" tone={t.syllabus < 60 ? "coral" : t.syllabus < 68 ? "marigold" : "mint"} className="flex-1" />
            <span className="text-xs font-semibold tabular-nums">{t.syllabus}%</span>
            <Sparkline id={`mtrend-${i}`} values={t.trend} color={t.improving ? "#12B886" : "#EF4E5A"} width={56} height={20} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-[10px] bg-[#faf9fd] px-1 py-1.5">
      <div className={cn("text-[13.5px] font-bold tabular-nums", tone)}>{value}</div>
      <div className="text-[10.5px] text-ink-3">{label}</div>
    </div>
  );
}

export function Star() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 text-[#f5a524]" fill="currentColor" aria-hidden>
      <path d="M12 2.5l2.9 6.2 6.6.7-5 4.5 1.5 6.6L12 17.2l-6 3.3 1.5-6.6-5-4.5 6.6-.7z" />
    </svg>
  );
}

/** How many parents read recent announcements. */
export function ReadRates({ items, stacked = false }: { items: Array<{ title: string; read: number }>; stacked?: boolean }) {
  return (
    <div className={cn("grid gap-2.5", stacked ? "grid-cols-1" : "grid-cols-3")}>
      {items.map((item) => (
        <div key={item.title} className="rounded-xl border border-line bg-[#faf9fd] px-3 py-2.5">
          <div className="truncate text-xs font-semibold">{item.title}</div>
          <div className="mt-1.5 flex items-center gap-2">
            <Progress value={item.read} size="sm" tone="mint" className="flex-1" />
            <b className="text-xs tabular-nums">{item.read}%</b>
          </div>
        </div>
      ))}
    </div>
  );
}
