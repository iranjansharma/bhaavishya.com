import type { Metadata } from "next";
import { DecisionButtons } from "@/components/blocks/interactive";
import { GradeDistribution, ScheduleTimeline } from "@/components/blocks/teacher";
import { Greeting } from "@/components/i18n/language";
import { Avatar, AvatarStack } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { MiniStat, Stat } from "@/components/ui/bits";
import { Card, CardHeader } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { demoDate, leaveRequests, mathsSummary, teacherSchedule, teacherToday, users } from "@/lib/demo-data";
import { PageHeader } from "../../_components/PageHeader";

export const metadata: Metadata = { title: "Teacher · Today" };

/** DESKTOP · Teacher's day (/dashboard/teacher) */
export default function TeacherTodayPage() {
  return (
    <>
      <PageHeader
        greeting
        title={<Greeting name={users.teacher.firstName} />}
        subtitle={`${demoDate.long} · 5 classes today · 1 free period`}
        actions={
          <>
            <Button variant="secondary" icon="Plus" href="/dashboard/teacher/homework">
              Post homework
            </Button>
            <Button icon="Sparkles" href="/dashboard/teacher/ask">
              Ask Bhavi
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-4 gap-[18px]">
        <Card className="bg-linear-to-br from-mint-50 to-white to-70%">
          <Stat icon="Clock" tone="mint" label="Next class" value={teacherToday.nextClass.title} foot={teacherToday.nextClass.note} />
        </Card>
        <Card>
          <Stat
            icon="UserCheck"
            tone="mint"
            label="7-B attendance"
            value={`${teacherToday.attendance.percent}%`}
            suffix={` · ${teacherToday.attendance.present}/${teacherToday.attendance.total}`}
            change={`Sent ${teacherToday.attendance.sentAt}`}
            foot="parents notified"
          />
        </Card>
        <Card>
          <Stat icon="CalendarX" tone="coral" label="Leave requests" value={leaveRequests.length} suffix=" waiting" foot="Oldest received 20 min ago" />
        </Card>
        <Card>
          <Stat
            icon="NotebookPen"
            tone="brand"
            label="Homework"
            value={teacherToday.homework.submitted}
            suffix={`/${teacherToday.homework.total}`}
            foot={`${teacherToday.homework.title} submitted`}
          />
        </Card>
      </div>

      <div className="grid grid-cols-[1fr_1.15fr] gap-[18px]">
        <Card>
          <CardHeader className="mb-2" title="Today's schedule" right="Monday" />
          <ScheduleTimeline items={teacherSchedule} />
        </Card>
        <Card>
          <CardHeader
            title={
              <>
                Leave requests <Pill tone="coral">{leaveRequests.length}</Pill>
              </>
            }
          />
          <ul className="divide-y divide-line">
            {leaveRequests.map((r) => (
              <li key={r.id} className="flex items-start gap-3 py-3">
                <Avatar src={r.avatar} size={36} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <b className="text-[13px]">{r.student}</b>
                    {r.attachment ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-ocean-700">
                        <Icon name="Paperclip" className="size-3.5" />
                        {r.attachment}
                      </span>
                    ) : (
                      <span className="text-[11px] text-ink-3">Parent · {r.received}</span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-ink-2">{r.dates}</div>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <span className="truncate text-xs text-ink-3">{r.reason}</span>
                    <DecisionButtons />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid grid-cols-[1.15fr_1fr] gap-[18px]">
        <Card>
          <CardHeader
            title="7-B Maths · half-yearly"
            right={
              <span className="flex gap-2">
                <Pill tone="brand">Average {mathsSummary.average}</Pill>
                <Pill tone="mint">Pass {mathsSummary.passRate}%</Pill>
              </span>
            }
          />
          <div className="mt-3 grid grid-cols-[minmax(0,1fr)_150px] items-end gap-4">
            <GradeDistribution distribution={mathsSummary.distribution} height={130} />
            <div className="flex flex-col gap-2">
              <MiniStat label={`Highest · ${mathsSummary.highest.name}`} value={mathsSummary.highest.marks} />
              <MiniStat label="50 or below" value={`${mathsSummary.atRisk.length} students`} tone="coral" />
            </div>
          </div>
        </Card>
        <section className="rounded-2xl bg-ai p-5 text-[#edeaff] shadow-card">
          <div className="flex items-center gap-1.5 text-[11.5px] font-bold tracking-[0.04em] text-marigold-300 uppercase">
            <Icon name="Sparkles" className="size-3.5" /> Bhavi suggests
          </div>
          <p className="mt-2 font-serif text-[19px] leading-snug text-white">
            {mathsSummary.atRisk.length} students scored 50 or below — most lost marks in <i>fractions &amp; decimals.</i>
          </p>
          <div className="mt-3">
            <AvatarStack srcs={mathsSummary.atRisk.map((s) => s.avatar)} size={30} />
          </div>
          <div className="mt-4 flex gap-2">
            <Button size="sm" variant="marigold" icon="Users">
              Create remedial group
            </Button>
            <Button size="sm" variant="glass" href="/dashboard/teacher/ask">
              Draft note to parents
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
