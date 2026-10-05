import type { Metadata } from "next";
import Link from "next/link";
import { AnnouncementList, DateList, HomeworkList, TimetableList } from "@/components/blocks/parent";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardLink } from "@/components/ui/Card";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { announcements, childAttendance, childResult, childToday, demoDate, fees, homeworkDue, kids, timetableToday, upcomingDates, users } from "@/lib/demo-data";
import { formatINR } from "@/lib/utils";
import { GreetingHeader } from "../../_components/Greeting";

export const metadata: Metadata = { title: "Parent · Home" };

const SHORTCUTS: Array<{ label: string; href: string; icon: IconName; cls: string }> = [
  { label: "Marks", href: "/dashboard/parent/marks", icon: "ChartColumn", cls: "bg-brand-50 text-brand-600" },
  { label: "Attendance", href: "/dashboard/parent/attendance", icon: "CalendarCheck", cls: "bg-mint-50 text-mint-500" },
  { label: "Leave", href: "/dashboard/parent/leave", icon: "CalendarX", cls: "bg-coral-50 text-coral-500" },
  { label: "Certificates", href: "/dashboard/parent/certificates", icon: "Award", cls: "bg-marigold-50 text-marigold-500" },
];

/** PHONE · Parent home (/dashboard/parent) */
export default function ParentHomePage() {
  const child = kids[0];
  return (
    <>
      <GreetingHeader name={users.parent.firstName} subtitle={demoDate.long} />

      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        {kids.map((k, i) => (
          <span
            key={k.id}
            className={
              i === 0
                ? "flex h-10 shrink-0 items-center gap-2 rounded-full border border-marigold-400 bg-white pr-3.5 pl-1 text-[13px] font-semibold ring-3 ring-marigold-50"
                : "flex h-10 shrink-0 items-center gap-2 rounded-full border border-line-2 bg-white pr-3.5 pl-1 text-[13px] font-semibold text-ink-2"
            }
          >
            <Avatar src={k.avatar} size={30} />
            {k.firstName} · {k.className}
          </span>
        ))}
      </div>

      <section className="rounded-[22px] bg-ai p-4 text-white shadow-card">
        <div className="flex items-center gap-3">
          <Avatar src={child.avatar} size={46} />
          <div className="min-w-0 flex-1">
            <b className="text-[16px]">{child.name}</b>
            <div className="text-xs text-[#d3ccff]">
              Class {child.className} · Roll {child.roll}
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 rounded-[10px] bg-mint-500/20 px-2.5 py-1.5 text-xs font-semibold text-[#c9ffe9]">
          <Icon name="CircleCheck" className="size-3.5" /> {childToday.status}
        </div>
        <div className="mt-3 grid grid-cols-3 text-center">
          <Link href="/dashboard/parent/attendance">
            <b className="text-[18px]">{childAttendance.percent}%</b>
            <div className="text-[11px] text-[#c7bfff]">Attendance</div>
          </Link>
          <Link href="/dashboard/parent/marks">
            <b className="text-[18px]">{childResult.percent}%</b>
            <div className="text-[11px] text-[#c7bfff]">Half-yearly</div>
          </Link>
          <div>
            <b className="text-[18px]">2</b>
            <div className="text-[11px] text-[#c7bfff]">Homework due</div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-4 gap-2">
        {SHORTCUTS.map((s) => (
          <Link key={s.href} href={s.href} className="flex flex-col items-center gap-1.5 rounded-2xl bg-white px-1 py-3 text-[11.5px] font-semibold text-ink-2 shadow-card">
            <span className={`grid size-10 place-items-center rounded-xl ${s.cls}`}>
              <Icon name={s.icon} className="size-5" />
            </span>
            {s.label}
          </Link>
        ))}
      </div>

      <Card padding="sm">
        <CardHeader title="Announcements" right={<Pill tone="coral">2 new</Pill>} />
        <AnnouncementList items={announcements} />
      </Card>

      <Card padding="sm">
        <CardHeader title="Today at school" right="Monday" />
        <TimetableList slots={timetableToday} compact />
      </Card>

      <Card padding="sm">
        <CardHeader title="Homework" right={<Pill tone="coral">2 due</Pill>} />
        <HomeworkList items={homeworkDue} />
      </Card>

      <Card padding="sm">
        <CardHeader title="Fees" right={<Pill tone="coral">{fees.dueIn}</Pill>} />
        <div className="mt-2 flex items-end justify-between">
          <div>
            <div className="text-xs font-semibold text-ink-3">{fees.term}</div>
            <div className="text-[26px] leading-tight font-bold tracking-[-0.03em]">{formatINR(fees.amount)}</div>
          </div>
          <div className="text-right text-xs text-ink-2">Due {fees.due}</div>
        </div>
        <Button full className="mt-3" icon="IndianRupee">
          Pay now · UPI or card
        </Button>
      </Card>

      <Card padding="sm">
        <CardHeader title="Holidays & events" right={<CardLink href="/dashboard/parent/attendance">Calendar</CardLink>} />
        <DateList items={upcomingDates.slice(0, 3)} />
      </Card>
    </>
  );
}
