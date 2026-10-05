import type { Metadata } from "next";
import { LeaveForm } from "@/components/blocks/LeaveForm";
import { LeaveHistoryList } from "@/components/blocks/parent";
import { T } from "@/components/i18n/language";
import { Card, CardHeader } from "@/components/ui/Card";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { childToday, kids, leaveHistory, school } from "@/lib/demo-data";
import { PageHeader } from "../../../_components/PageHeader";

export const metadata: Metadata = { title: "Leave" };

const STEPS: Array<{ icon: IconName; title: string; text: string; color: string }> = [
  { icon: "Send", title: "You apply", text: "with a note or photo", color: "text-marigold-500" },
  { icon: "UserCheck", title: "Teacher approves", text: "in one tap", color: "text-mint-500" },
  { icon: "BellRing", title: "You're notified", text: "WhatsApp + app", color: "text-brand-600" },
];

/** DESKTOP · Leave (/dashboard/parent/leave) */
export default function ParentLeavePage() {
  const child = kids[0];
  return (
    <>
      <PageHeader
        title={<T k="nav.leave" />}
        subtitle={`Apply for ${child.firstName}'s leave — his class teacher is notified instantly.`}
        actions={
          <Pill tone="grey" icon="CalendarDays">
            3.5 days of leave in {school.year}
          </Pill>
        }
      />
      <div className="grid grid-cols-[1.3fr_1fr] items-start gap-[18px]">
        <LeaveForm layout="desktop" />
        <div className="flex flex-col gap-[18px]">
          <Card className="bg-linear-to-br from-marigold-50 to-white">
            <div className="mb-3 text-[11.5px] font-bold tracking-[0.08em] text-ink-3 uppercase">How it works</div>
            <div className="flex items-start justify-between gap-2">
              {STEPS.map((step, i) => (
                <div key={step.title} className="flex items-start gap-2">
                  <div className="flex w-[104px] flex-col items-center gap-1.5 text-center text-xs text-ink-2">
                    <span className={`grid size-[34px] place-items-center rounded-[10px] bg-white shadow-card ${step.color}`}>
                      <Icon name={step.icon} className="size-4" />
                    </span>
                    <b className="text-ink">{step.title}</b>
                    {step.text}
                  </div>
                  {i < STEPS.length - 1 ? <Icon name="ChevronRight" className="mt-2.5 size-4 text-ink-4" /> : null}
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <CardHeader title="Leave history" right={school.year} />
            <LeaveHistoryList items={leaveHistory} teacherAvatar={childToday.classTeacher.avatar} />
          </Card>
        </div>
      </div>
    </>
  );
}
