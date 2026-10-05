import type { Metadata } from "next";
import Link from "next/link";
import { ActionButton, DecisionButtons } from "@/components/blocks/interactive";
import { ScheduleTimeline } from "@/components/blocks/teacher";
import { Avatar, AvatarStack } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardLink } from "@/components/ui/Card";
import { Icon, type IconName } from "@/components/ui/Icon";
import { IconTile, Pill } from "@/components/ui/Pill";
import { Progress } from "@/components/ui/Progress";
import { demoDate, leaveRequests, mathsSummary, teacherSchedule, teacherToday, users } from "@/lib/demo-data";
import type { Tone } from "@/lib/tones";
import { GreetingHeader } from "../../_components/Greeting";

export const metadata: Metadata = { title: "Teacher · Today" };

/** PHONE · Teacher's day (/dashboard/teacher) */
export default function TeacherTodayPage() {
  const t = teacherToday;
  return (
    <>
      <GreetingHeader name={users.teacher.firstName} subtitle={`${demoDate.long} · 5 classes`} />

      <section className="rounded-[22px] bg-linear-to-br from-mint-700 to-mint-500 p-4 text-white shadow-card">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.06em] text-white/85 uppercase">
            <Icon name="Clock" className="size-3.5" /> Next class · in 5 min
          </span>
          <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold">Room 204</span>
        </div>
        <div className="mt-2 text-[26px] leading-tight font-bold tracking-[-0.02em]">{t.nextClass.title}</div>
        <div className="text-[13px] text-white/85">10:20 AM · Chapter 5 · Decimals</div>
        <div className="mt-3.5 grid grid-cols-2 gap-2">
          <Button size="sm" variant="glass" icon="UserCheck" href="/dashboard/teacher/attendance">
            Take attendance
          </Button>
          <Button size="sm" variant="glass" icon="FileText">
            Lesson plan
          </Button>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-2.5">
        <KpiTile
          href="/dashboard/teacher/attendance"
          icon="UserCheck"
          tone="mint"
          label="7-B today"
          value={`${t.attendance.percent}%`}
          foot={`${t.attendance.present}/${t.attendance.total} · sent ${t.attendance.sentAt}`}
        />
        <KpiTile icon="CalendarX" tone="coral" label="Leave requests" value={String(leaveRequests.length)} suffix=" waiting" foot="Oldest 20 min ago" href="#leave-requests" />
        <KpiTile
          href="/dashboard/teacher/homework"
          icon="NotebookPen"
          tone="brand"
          label="Homework"
          value={String(t.homework.submitted)}
          suffix={`/${t.homework.total}`}
          foot={t.homework.title}
        />
        <KpiTile
          href="/dashboard/teacher/gradebook"
          icon="BookOpen"
          tone="marigold"
          label="7-B Maths avg"
          value={String(mathsSummary.average)}
          foot={`Pass rate ${mathsSummary.passRate}%`}
        />
      </div>

      <Card padding="sm">
        <CardHeader className="mb-2" title="Today's schedule" right="Monday" />
        <ScheduleTimeline items={teacherSchedule} />
      </Card>

      <Card padding="sm">
        <div id="leave-requests" className="scroll-mt-20" />
        <CardHeader
          title={
            <>
              Leave requests <Pill tone="coral">{leaveRequests.length}</Pill>
            </>
          }
          right="From parents"
        />
        <ul className="divide-y divide-line">
          {leaveRequests.map((r) => (
            <li key={r.id} className="py-3">
              <div className="flex items-start gap-3">
                <Avatar src={r.avatar} size={36} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <b className="truncate text-[13.5px]">{r.student}</b>
                    <span className="shrink-0 text-[11px] text-ink-3">{r.received}</span>
                  </div>
                  <div className="text-xs font-semibold text-ink-2">{r.dates}</div>
                  <p className="mt-0.5 text-xs text-ink-3">{r.reason}</p>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 pl-12">
                {r.attachment ? (
                  <span className="inline-flex min-w-0 items-center gap-1 text-xs font-semibold text-ocean-700">
                    <Icon name="Paperclip" className="size-3.5 shrink-0" />
                    <span className="truncate">{r.attachment}</span>
                  </span>
                ) : (
                  <span />
                )}
                <DecisionButtons />
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <Card padding="sm">
        <CardHeader title={`${t.homework.title} · 7-B`} right={<CardLink href="/dashboard/teacher/homework">Check</CardLink>} />
        <div className="mt-3 flex items-center gap-3">
          <Progress value={(t.homework.submitted / t.homework.total) * 100} tone="mint" className="flex-1" />
          <b className="text-[13px] tabular-nums">
            {t.homework.submitted}/{t.homework.total}
          </b>
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-3">
          <Icon name="Sparkles" className="size-3.5 text-brand-600" /> Bhavi pre-checked 9 new photos · 2 need a look
        </p>
      </Card>

      <section className="rounded-2xl bg-ai p-4 text-[#edeaff] shadow-card">
        <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.04em] text-marigold-300 uppercase">
          <Icon name="Sparkles" className="size-3.5" /> Bhavi suggests
        </div>
        <p className="mt-2 font-serif text-[17px] leading-snug text-white">
          {mathsSummary.atRisk.length} students scored 50 or below in Maths — most lost marks in <i>fractions &amp; decimals.</i>
        </p>
        <div className="mt-3">
          <AvatarStack srcs={mathsSummary.atRisk.map((s) => s.avatar)} size={28} />
        </div>
        <div className="mt-3.5 grid grid-cols-2 gap-2">
          <ActionButton label="Remedial group" doneLabel="Group created" variant="marigold" icon="Users" />
          <Button size="sm" variant="glass" href="/dashboard/teacher/ask">
            Note to parents
          </Button>
        </div>
      </section>
    </>
  );
}

function KpiTile({
  href,
  icon,
  tone,
  label,
  value,
  suffix,
  foot,
}: {
  href: string;
  icon: IconName;
  tone: Tone;
  label: string;
  value: string;
  suffix?: string;
  foot: string;
}) {
  return (
    <Link href={href} className="block min-w-0 rounded-2xl border border-line bg-white p-3.5 shadow-card">
      <div className="flex items-center gap-2 text-xs font-semibold text-ink-3">
        <IconTile icon={icon} tone={tone} size="sm" />
        <span className="truncate">{label}</span>
      </div>
      <div className="mt-2.5 text-[24px] leading-none font-bold tracking-[-0.03em] tabular-nums">
        {value}
        {suffix ? <span className="text-[13px] font-semibold tracking-normal text-ink-3">{suffix}</span> : null}
      </div>
      <div className="mt-1.5 truncate text-[11.5px] text-ink-3">{foot}</div>
    </Link>
  );
}
