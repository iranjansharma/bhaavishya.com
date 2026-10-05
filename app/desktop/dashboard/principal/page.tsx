import type { Metadata } from "next";
import { ActionButton } from "@/components/blocks/interactive";
import { ApprovalList, AttendanceHeatmap, TeachersOnLeave } from "@/components/blocks/principal";
import { LineChart } from "@/components/charts";
import { Greeting } from "@/components/i18n/language";
import { Button } from "@/components/ui/Button";
import { Stat } from "@/components/ui/bits";
import { Card, CardHeader } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import {
  approvals,
  attendanceByClass,
  attendanceTrend,
  demoDate,
  moreApprovals,
  principalInsights,
  principalKpis,
  school,
  teachersOnLeave,
  users,
} from "@/lib/demo-data";
import { PageHeader } from "../../_components/PageHeader";

export const metadata: Metadata = { title: "Principal · Overview" };

/** DESKTOP · Principal overview (/dashboard/principal) */
export default function PrincipalOverviewPage() {
  return (
    <>
      <PageHeader
        greeting
        title={<Greeting name={users.principal.firstName} />}
        subtitle={`${demoDate.long} · ${school.name} at 10:15 AM`}
        actions={
          <>
            <ActionButton label="Daily report" doneLabel="Report ready" variant="secondary" icon="Download" size="md" />
            <Button icon="Megaphone" href="/dashboard/principal/announcements">
              New announcement
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-5 gap-[18px]">
        {principalKpis.map((k) => (
          <Card key={k.label} padding="sm">
            <Stat icon={k.icon} tone={k.tone} label={k.label} value={k.value} suffix={k.suffix} change={k.change} foot={k.foot} />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-[1.42fr_1fr] gap-[18px]">
        <Card>
          <CardHeader
            className="mb-1.5"
            title="Student attendance · last 4 weeks"
            right={
              <span className="flex gap-3 text-xs text-ink-3">
                <span className="inline-flex items-center gap-1">
                  <i className="inline-block size-2 rounded-full bg-brand-600" />
                  2026–27
                </span>
                <span className="inline-flex items-center gap-1">
                  <i className="inline-block size-2 rounded-full bg-[#c9c2ee]" />
                  2025–26
                </span>
              </span>
            }
          />
          <LineChart
            id="po-trend"
            labels={attendanceTrend.labels}
            series={[
              { values: attendanceTrend.thisYear, color: "#5134E8", area: true, endDot: true },
              { values: attendanceTrend.lastYear, color: "#C9C2EE", dashed: true, width: 2 },
            ]}
            min={88}
            max={98}
            ticks={[88, 90, 92, 94, 96, 98]}
            tickSuffix="%"
            width={640}
            height={210}
          />
        </Card>
        <Card>
          <CardHeader
            className="mb-3"
            title="Attendance by class · today"
            right={
              <span className="flex items-center gap-1.5 text-[11px] text-ink-3">
                <i className="inline-block h-2 w-11 rounded-full bg-linear-to-r from-coral-500 via-marigold-400 to-mint-500" />
                84–98%
              </span>
            }
          />
          <AttendanceHeatmap data={attendanceByClass} />
          <div className="mt-3 flex items-center gap-2 rounded-[10px] bg-coral-50 px-2.5 py-2 text-xs font-semibold text-coral-700">
            <Icon name="TriangleAlert" className="size-3.5" /> 9-C is at 86% today — lowest in school for the 5th day
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-[18px]">
        <section className="rounded-2xl bg-ai p-5 text-[#edeaff] shadow-card">
          <div className="flex items-center gap-1.5 text-[11.5px] font-bold tracking-[0.04em] text-marigold-300 uppercase">
            <Icon name="Sparkles" className="size-3.5" /> Bhavi insights
          </div>
          <ul className="mt-2.5 flex flex-col gap-2.5 text-[13px] leading-snug">
            {principalInsights.map((insight) => (
              <li key={insight.title} className="flex items-start gap-2.5">
                <Icon name={insight.icon} className="mt-px size-4 text-[#ffc14d]" />
                <span>
                  <b className="text-white">{insight.title}</b> {insight.body}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex gap-2">
            <ActionButton label="Resend on WhatsApp" doneLabel="Sent to 112 parents" variant="marigold" size="xs" />
            <Button size="xs" variant="glass" href="/dashboard/principal/ask">
              Ask Bhavi why
            </Button>
          </div>
        </section>
        <Card>
          <CardHeader
            title={
              <>
                Approvals <Pill tone="coral">7</Pill>
              </>
            }
          />
          <ApprovalList items={approvals} more={moreApprovals} />
        </Card>
        <Card>
          <CardHeader title="Teachers on leave today" right={`${teachersOnLeave.length}`} />
          <TeachersOnLeave items={teachersOnLeave} />
        </Card>
      </div>
    </>
  );
}
