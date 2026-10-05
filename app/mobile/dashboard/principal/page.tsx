import type { Metadata } from "next";
import { ActionButton } from "@/components/blocks/interactive";
import { ApprovalList, AttendanceHeatmap, TeachersOnLeave } from "@/components/blocks/principal";
import { LineChart } from "@/components/charts";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { IconTile, Pill } from "@/components/ui/Pill";
import {
  approvals,
  attendanceByClass,
  attendanceTrend,
  demoDate,
  moreApprovals,
  principalInsights,
  principalKpis,
  teachersOnLeave,
  users,
} from "@/lib/demo-data";
import { GreetingHeader } from "../../_components/Greeting";

export const metadata: Metadata = { title: "Principal · Overview" };

/** PHONE · Principal overview (/dashboard/principal) */
export default function PrincipalOverviewPage() {
  return (
    <>
      <GreetingHeader name={users.principal.firstName} subtitle={`${demoDate.long} · at 10:15 AM`} />

      <div className="no-scrollbar -mx-4 flex snap-x scroll-px-4 gap-2.5 overflow-x-auto px-4 pb-1">
        {principalKpis.map((k) => (
          <div key={k.label} className="w-[152px] shrink-0 snap-start rounded-2xl border border-line bg-white p-3.5 shadow-card">
            <div className="flex items-center gap-2 text-xs font-semibold text-ink-3">
              <IconTile icon={k.icon} tone={k.tone} size="sm" />
              <span className="min-w-0 leading-tight">{k.label}</span>
            </div>
            <div className="mt-2.5 text-[24px] leading-none font-bold tracking-[-0.03em] tabular-nums">
              {k.value}
              {k.suffix ? <span className="text-[13px] font-semibold tracking-normal text-ink-3">{k.suffix}</span> : null}
            </div>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[11.5px] text-ink-3">
              {k.change ? <Pill tone="mint">{k.change}</Pill> : null}
              <span className="truncate">{k.foot}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button icon="Megaphone" href="/dashboard/principal/announcements">
          Announcement
        </Button>
        <ActionButton label="Daily report" doneLabel="Report ready" variant="secondary" icon="Download" size="md" />
      </div>

      <Card padding="sm">
        <CardHeader className="mb-1" title="Student attendance" right="Last 4 weeks" />
        <div className="mb-1 flex gap-3 text-xs text-ink-3">
          <span className="inline-flex items-center gap-1">
            <i className="inline-block size-2 rounded-full bg-brand-600" /> 2026–27
          </span>
          <span className="inline-flex items-center gap-1">
            <i className="inline-block size-2 rounded-full bg-[#c9c2ee]" /> 2025–26
          </span>
        </div>
        <LineChart
          id="mpo-trend"
          labels={attendanceTrend.labels}
          series={[
            { values: attendanceTrend.thisYear, color: "#5134E8", area: true, endDot: true },
            { values: attendanceTrend.lastYear, color: "#C9C2EE", dashed: true, width: 2 },
          ]}
          min={88}
          max={98}
          ticks={[88, 90, 92, 94, 96, 98]}
          tickSuffix="%"
          width={340}
          height={190}
          padding={[12, 18, 26, 38]}
        />
      </Card>

      <Card padding="sm">
        <CardHeader
          className="mb-3"
          title="By class · today"
          right={
            <span className="flex items-center gap-1.5 text-[11px] text-ink-3">
              <i className="inline-block h-2 w-9 rounded-full bg-linear-to-r from-coral-500 via-marigold-400 to-mint-500" />
              84–98%
            </span>
          }
        />
        <AttendanceHeatmap data={attendanceByClass} compact />
        <div className="mt-3 flex items-start gap-2 rounded-[10px] bg-coral-50 px-2.5 py-2 text-xs font-semibold text-coral-700">
          <Icon name="TriangleAlert" className="mt-px size-3.5 shrink-0" /> 9-C is at 86% today — lowest in school for the 5th day
        </div>
      </Card>

      <section className="rounded-2xl bg-ai p-4 text-[#edeaff] shadow-card">
        <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.04em] text-marigold-300 uppercase">
          <Icon name="Sparkles" className="size-3.5" /> Bhavi insights
        </div>
        <ul className="mt-2.5 flex flex-col gap-2.5 text-[13px] leading-snug">
          {principalInsights.map((insight) => (
            <li key={insight.title} className="flex items-start gap-2.5">
              <Icon name={insight.icon} className="mt-px size-4 shrink-0 text-[#ffc14d]" />
              <span>
                <b className="text-white">{insight.title}</b> {insight.body}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-3.5 grid grid-cols-2 gap-2">
          <ActionButton label="Resend notice" doneLabel="Sent to 112" variant="marigold" />
          <Button size="sm" variant="glass" href="/dashboard/principal/ask">
            Ask Bhavi why
          </Button>
        </div>
      </section>

      <Card padding="sm">
        <CardHeader
          title={
            <>
              Approvals <Pill tone="coral">7</Pill>
            </>
          }
          right="Teacher leave"
        />
        <ApprovalList items={approvals} more={moreApprovals} />
      </Card>

      <Card padding="sm">
        <CardHeader title="Teachers on leave today" right={`${teachersOnLeave.length}`} />
        <TeachersOnLeave items={teachersOnLeave} />
      </Card>
    </>
  );
}
