import type { Metadata } from "next";
import Link from "next/link";
import { AnnouncementList, DateList, HomeworkList, TimetableList } from "@/components/blocks/parent";
import { Ring, Sparkline } from "@/components/charts";
import { Greeting } from "@/components/i18n/language";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardLink } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { announcements, childAttendance, childResult, childToday, demoDate, fees, homeworkDue, kids, timetableToday, upcomingDates, users } from "@/lib/demo-data";
import { formatINR } from "@/lib/utils";
import { PageHeader } from "../../_components/PageHeader";

export const metadata: Metadata = { title: "Parent · Home" };

/** DESKTOP · Parent home (/dashboard/parent) */
export default function ParentHomePage() {
  const child = kids[0];
  return (
    <>
      <PageHeader
        greeting
        title={<Greeting name={users.parent.firstName} />}
        subtitle={`${demoDate.long} · Here's how ${child.firstName}'s day is going.`}
        actions={
          <div className="flex gap-2">
            {kids.map((k, i) => (
              <span
                key={k.id}
                className={
                  i === 0
                    ? "flex h-[42px] items-center gap-2 rounded-full border border-marigold-400 bg-white pr-3.5 pl-1.5 text-[13.5px] font-semibold ring-3 ring-marigold-50"
                    : "flex h-[42px] items-center gap-2 rounded-full border border-line-2 bg-white pr-3.5 pl-1.5 text-[13.5px] font-semibold text-ink-2"
                }
              >
                <Avatar src={k.avatar} size={30} />
                {k.firstName} · {k.className}
              </span>
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-4 gap-[18px]">
        <Card className="bg-linear-to-br from-marigold-50 to-white to-70%">
          <div className="flex items-center gap-3">
            <Avatar src={child.avatar} size={58} />
            <div>
              <div className="text-[17px] font-bold">{child.name}</div>
              <div className="text-xs text-ink-3">
                Class {child.className} · Roll no. {child.roll}
              </div>
            </div>
          </div>
          <Pill tone="mint" icon="CircleCheck" className="mt-3">
            {childToday.status}
          </Pill>
          <div className="mt-2.5 flex items-center gap-2 text-xs text-ink-2">
            <Avatar src={childToday.classTeacher.avatar} size={22} />
            Class teacher · <b>{childToday.classTeacher.name}</b>
          </div>
        </Card>

        <Card>
          <CardHeader title="Attendance" right="This term" />
          <div className="mt-2 flex items-center gap-4">
            <Ring parts={[{ value: childAttendance.percent, color: "#12B886" }]} size={92} stroke={10}>
              <b className="text-[19px] tracking-[-0.02em]">{childAttendance.percent}%</b>
            </Ring>
            <div className="flex flex-col gap-1.5 text-xs text-ink-2">
              <span>
                <b className="text-ink">{childAttendance.present}</b> of {childAttendance.total} days
              </span>
              <span>
                <b className="text-ink">{childAttendance.late}</b> late arrivals
              </span>
              <CardLink href="/dashboard/parent/attendance">Calendar</CardLink>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Half-yearly result" right={<Pill tone="brand">New</Pill>} />
          <div className="mt-1.5 flex items-baseline gap-2.5">
            <span className="text-[32px] font-bold tracking-[-0.03em]">{childResult.percent}%</span>
            <Pill tone="mint">Grade {childResult.grade}</Pill>
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-xs font-semibold text-mint-700">▲ {childResult.change}% vs Unit Test 2</span>
            <Sparkline id="ph-result" values={childResult.trend} color="#5134E8" width={86} height={30} />
          </div>
          <div className="mt-1.5">
            <CardLink href="/dashboard/parent/marks">Open report card</CardLink>
          </div>
        </Card>

        <Card>
          <CardHeader title="Homework" right={<Pill tone="coral">2 due</Pill>} />
          <div className="mt-1">
            <HomeworkList items={homeworkDue} />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-[1fr_1.15fr] gap-[18px]">
        <Card>
          <CardHeader title="Today at school" right="Monday timetable" />
          <TimetableList slots={timetableToday} />
        </Card>
        <Card>
          <CardHeader title="Announcements" right={<CardLink href="/dashboard/parent">View all</CardLink>} />
          <AnnouncementList items={announcements} />
        </Card>
      </div>

      <div className="grid grid-cols-[1fr_0.8fr_1.1fr] gap-[18px]">
        <Card>
          <CardHeader title="Holidays & events" right={<CardLink href="/dashboard/parent/attendance">Calendar</CardLink>} />
          <DateList items={upcomingDates.slice(0, 3)} />
        </Card>
        <Card>
          <CardHeader title="Fees" right={<Pill tone="coral">{fees.dueIn}</Pill>} />
          <div className="mt-2 flex items-end justify-between">
            <div>
              <div className="text-xs font-semibold text-ink-3">{fees.term}</div>
              <div className="text-[28px] leading-tight font-bold tracking-[-0.03em]">{formatINR(fees.amount)}</div>
            </div>
            <div className="text-right text-xs text-ink-2">
              Due
              <br />
              {fees.due}
            </div>
          </div>
          {/* Connect to your payment gateway (e.g. Razorpay) */}
          <Button full className="mt-3" icon="IndianRupee">
            Pay now · UPI or card
          </Button>
        </Card>
        <Link href="/dashboard/parent/ask" className="block rounded-2xl bg-ai p-5 text-[#edeaff] shadow-card">
          <div className="flex items-center gap-1.5 text-[11.5px] font-bold tracking-[0.04em] text-marigold-300 uppercase">
            <Icon name="Sparkles" className="size-3.5" /> Ask Bhavi
          </div>
          <div className="mt-2 font-serif text-[19px] leading-snug text-white">Ask anything about {child.firstName}&apos;s school day.</div>
          <div className="mt-3 flex h-10 items-center gap-2 rounded-xl bg-white px-3 text-[13px] text-ink-3">
            <Icon name="Mic" className="size-4" />
            <span className="flex-1">English या हिन्दी में पूछें…</span>
            <Icon name="Send" className="size-4 text-brand-600" />
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold text-white">How is {child.firstName} doing in Hindi?</span>
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold text-white">What&apos;s due this week?</span>
          </div>
        </Link>
      </div>
    </>
  );
}
