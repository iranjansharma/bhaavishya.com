import type { Metadata } from "next";
import { ActionButton } from "@/components/blocks/interactive";
import { Star, TeacherTable } from "@/components/blocks/principal";
import { T } from "@/components/i18n/language";
import { Avatar, AvatarStack } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Stat } from "@/components/ui/bits";
import { Card, CardHeader } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chips";
import { Icon } from "@/components/ui/Icon";
import { Progress } from "@/components/ui/Progress";
import { Segmented } from "@/components/ui/Segmented";
import { demoDate, needsAttention, teacherOfMonth, teacherRoster, teacherStats } from "@/lib/demo-data";
import { PageHeader } from "../../../_components/PageHeader";

export const metadata: Metadata = { title: "Teachers" };

/** DESKTOP · Teachers (/dashboard/principal/teachers) */
export default function PrincipalTeachersPage() {
  const s = teacherStats;
  return (
    <>
      <PageHeader
        title={<T k="nav.teachers" />}
        subtitle={`Attendance and performance · ${s.total} teachers · ${demoDate.long}`}
        actions={
          <>
            <Segmented options={["Today", "This week", "This term"]} />
            <ActionButton label="Export" doneLabel="Exported" variant="secondary" icon="Download" size="md" />
            <Button icon="UserPlus">Add teacher</Button>
          </>
        }
      />

      <div className="grid grid-cols-4 gap-[18px]">
        <Card padding="sm">
          <Stat
            label="Present today"
            value={s.present}
            suffix={`/${s.total}`}
            foot={
              <span className="flex items-center gap-2">
                <AvatarStack srcs={teacherRoster.filter((t) => t.today.label === "Present").map((t) => t.avatar)} size={22} />+{s.present - 5} · {s.late} late
              </span>
            }
          />
        </Card>
        <Card padding="sm">
          <Stat
            label="Syllabus completed"
            value={`${s.syllabus}%`}
            foot={
              <span className="flex w-full items-center gap-2">
                <Progress value={s.syllabus} size="sm" className="flex-1" /> target {s.syllabusTarget}
              </span>
            }
          />
        </Card>
        <Card padding="sm">
          <Stat label="Average class result" value={`${s.averageResult}%`} change="▲ 2.1" foot="half-yearly vs last year" />
        </Card>
        <Card padding="sm">
          <Stat
            label="Parent rating"
            value={s.rating}
            suffix=" /5"
            foot={
              <span className="flex items-center gap-1.5">
                <span className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} />
                  ))}
                </span>
                from parent feedback
              </span>
            }
          />
        </Card>
      </div>

      <div className="grid grid-cols-[minmax(0,2.55fr)_minmax(0,1fr)] items-start gap-[18px]">
        <Card padding="sm">
          <div className="mb-3 flex items-center gap-2">
            <Chip active size="sm">
              {`All ${s.total}`}
            </Chip>
            <Chip size="sm">{`Present ${s.present}`}</Chip>
            <Chip size="sm">{`On leave ${s.onLeave}`}</Chip>
            <Chip size="sm">{`Late ${s.late}`}</Chip>
            <label className="ml-auto flex h-[34px] w-[220px] items-center gap-2 rounded-xl border border-line-2 px-3 text-[13px] text-ink-3">
              <Icon name="Search" className="size-4" />
              <input placeholder="Search teacher" className="min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-ink-3" />
            </label>
          </div>
          <TeacherTable rows={teacherRoster} />
        </Card>

        <div className="flex flex-col gap-[18px]">
          <Card className="bg-[radial-gradient(90%_70%_at_100%_0%,rgb(255_176_32/0.25),transparent_60%)] text-center">
            <div className="text-[11.5px] font-bold tracking-[0.08em] text-ink-3 uppercase">Teacher of the month</div>
            <div className="relative mx-auto mt-3 w-fit">
              <Avatar src={teacherOfMonth.avatar} size={76} />
              <span className="absolute -right-1.5 -bottom-0.5 grid size-7 place-items-center rounded-full border-[3px] border-white bg-marigold-400 text-night-950">
                <Icon name="Trophy" className="size-3.5" />
              </span>
            </div>
            <div className="mt-2.5 text-[15px] font-semibold">{teacherOfMonth.name}</div>
            <div className="text-xs text-ink-3">{teacherOfMonth.role}</div>
            <div className="mt-3 flex justify-around text-sm">
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
              <ActionButton label="Send appreciation" doneLabel="Appreciation sent" variant="soft" icon="PartyPopper" full />
            </div>
          </Card>
          <Card>
            <CardHeader
              className="mb-2"
              title={
                <>
                  <Icon name="Sparkles" className="size-4 text-brand-600" /> Needs attention
                </>
              }
            />
            <ul className="divide-y divide-line">
              {needsAttention.map((n) => (
                <li key={n.name} className="flex items-start gap-2.5 py-2.5">
                  <Avatar src={n.avatar} size={30} />
                  <div className="text-xs">
                    <b className="text-[13px]">{n.name}</b>
                    <div className="text-ink-2">{n.note}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
