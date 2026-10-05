import type { ReactNode } from "react";
import type { Metadata } from "next";
import { ActionButton } from "@/components/blocks/interactive";
import { Star, TeacherCards } from "@/components/blocks/principal";
import { Avatar, AvatarStack } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chips";
import { Icon } from "@/components/ui/Icon";
import { Progress } from "@/components/ui/Progress";
import { Segmented } from "@/components/ui/Segmented";
import { needsAttention, teacherOfMonth, teacherRoster, teacherStats } from "@/lib/demo-data";
import { PageNote } from "../../../_components/Greeting";

export const metadata: Metadata = { title: "Teachers" };

/** PHONE · Teachers (/dashboard/principal/teachers) */
export default function PrincipalTeachersPage() {
  const s = teacherStats;
  return (
    <>
      <PageNote>Attendance and performance · {s.total} teachers</PageNote>
      <div className="flex items-center justify-between gap-2">
        <Segmented options={["Today", "This week", "This term"]} size="sm" />
        <Button size="sm" icon="UserPlus">
          Add
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <StatBox label="Present today" value={s.present} suffix={`/${s.total}`}>
          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-ink-3">
            <AvatarStack srcs={teacherRoster.filter((t) => t.today.label === "Present").map((t) => t.avatar).slice(0, 3)} size={18} />
            {s.late} late · {s.onLeave} on leave
          </div>
        </StatBox>
        <StatBox label="Syllabus done" value={`${s.syllabus}%`}>
          <Progress value={s.syllabus} size="sm" marker={70} className="mt-2" />
          <div className="mt-1.5 truncate text-[11px] text-ink-3">Target {s.syllabusTarget}</div>
        </StatBox>
        <StatBox label="Average result" value={`${s.averageResult}%`}>
          <div className="mt-1 text-[11px] font-semibold text-mint-700">▲ 2.1 vs last year</div>
        </StatBox>
        <StatBox label="Parent rating" value={s.rating} suffix=" /5">
          <div className="mt-1 flex">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} />
            ))}
          </div>
        </StatBox>
      </div>

      <label className="flex h-11 items-center gap-2 rounded-xl border border-line-2 bg-white px-3.5 text-[13.5px] text-ink-3">
        <Icon name="Search" className="size-4" />
        <input placeholder="Search teacher or subject" className="min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-ink-3" />
      </label>
      <div className="no-scrollbar -mx-4 overflow-x-auto px-4">
        <ChipGroup
          wrap={false}
          options={[`All ${s.total}`, `Present ${s.present}`, `On leave ${s.onLeave}`, `Late ${s.late}`]}
          defaultValue={`All ${s.total}`}
          size="sm"
          label="Filter teachers"
        />
      </div>

      <TeacherCards rows={teacherRoster} />

      <Card padding="sm" className="bg-[radial-gradient(90%_70%_at_100%_0%,rgb(255_176_32/0.25),transparent_60%)] text-center">
        <div className="text-[11px] font-bold tracking-[0.08em] text-ink-3 uppercase">Teacher of the month</div>
        <div className="relative mx-auto mt-3 w-fit">
          <Avatar src={teacherOfMonth.avatar} size={68} />
          <span className="absolute -right-1.5 -bottom-0.5 grid size-7 place-items-center rounded-full border-[3px] border-white bg-marigold-400 text-night-950">
            <Icon name="Trophy" className="size-3.5" />
          </span>
        </div>
        <div className="mt-2.5 text-[15px] font-semibold">{teacherOfMonth.name}</div>
        <div className="text-xs text-ink-3">{teacherOfMonth.role}</div>
        <div className="mt-3 grid grid-cols-3 text-sm">
          <div>
            <b>{teacherOfMonth.attendance}</b>
            <div className="text-[11px] text-ink-3">Attendance</div>
          </div>
          <div>
            <b>{teacherOfMonth.syllabus}</b>
            <div className="text-[11px] text-ink-3">Syllabus</div>
          </div>
          <div>
            <b>{teacherOfMonth.rating}</b>
            <div className="text-[11px] text-ink-3">Parents</div>
          </div>
        </div>
        <div className="mt-3">
          <ActionButton label="Send appreciation" doneLabel="Appreciation sent" variant="soft" icon="PartyPopper" size="md" full />
        </div>
      </Card>

      <Card padding="sm">
        <CardHeader
          className="mb-1"
          title={
            <>
              <Icon name="Sparkles" className="size-4 text-brand-600" /> Needs attention
            </>
          }
        />
        <ul className="divide-y divide-line">
          {needsAttention.map((n) => (
            <li key={n.name} className="flex items-start gap-2.5 py-2.5">
              <Avatar src={n.avatar} size={32} />
              <div className="min-w-0 text-xs">
                <b className="text-[13px]">{n.name}</b>
                <div className="text-ink-2">{n.note}</div>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <ActionButton label="Export teacher report" doneLabel="Exported" variant="secondary" icon="Download" size="md" full />
    </>
  );
}

function StatBox({ label, value, suffix, children }: { label: string; value: ReactNode; suffix?: string; children?: ReactNode }) {
  return (
    <div className="min-w-0 rounded-xl border border-line bg-white px-3 py-2.5 shadow-card">
      <div className="text-[11px] font-semibold text-ink-3">{label}</div>
      <div className="mt-0.5 text-[22px] leading-tight font-bold tracking-[-0.02em] tabular-nums">
        {value}
        {suffix ? <span className="text-[13px] font-semibold tracking-normal text-ink-3">{suffix}</span> : null}
      </div>
      {children}
    </div>
  );
}
