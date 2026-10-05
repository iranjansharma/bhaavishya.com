import type { Metadata } from "next";
import { MarksTable } from "@/components/blocks/parent";
import { LineChart } from "@/components/charts";
import { T } from "@/components/i18n/language";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { MiniStat, Stat } from "@/components/ui/bits";
import { Card, CardHeader } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Segmented } from "@/components/ui/Segmented";
import { bhaviMarksSummary, childResult, examProgress, exams, kids, marks, school, subjects, teacherRemark } from "@/lib/demo-data";
import { PageHeader } from "../../../_components/PageHeader";

export const metadata: Metadata = { title: "Marks & report card" };

/** DESKTOP · Marks & report card (/dashboard/parent/marks) */
export default function ParentMarksPage() {
  const child = kids[0];
  const best = [...marks].sort((a, b) => b.halfYearly - a.halfYearly)[0];
  const focus = [...marks].sort((a, b) => a.halfYearly - b.halfYearly)[0];

  return (
    <>
      <PageHeader
        title={<T k="nav.marks" />}
        subtitle={`${child.name} · Class ${child.className} · Academic year ${school.year}`}
        actions={
          <>
            <Segmented options={exams} defaultValue="Half-yearly" />
            {/* Link this to the generated report-card PDF */}
            <Button variant="secondary" icon="Download">
              Report card PDF
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-4 gap-[18px]">
        <Card>
          <Stat
            icon="Target"
            tone="brand"
            label="Overall"
            value={`${childResult.percent}%`}
            suffix={` · ${childResult.total}/${childResult.max}`}
            change={`Grade ${childResult.grade}`}
            foot={<span className="font-semibold text-mint-700">▲ {childResult.change}% vs Unit Test 2</span>}
          />
        </Card>
        <Card>
          <Stat icon="Trophy" tone="marigold" label="In his class" value={childResult.rankNote} foot={`Class of ${childResult.classSize} · average ${childResult.classAverage}%`} />
        </Card>
        <Card>
          <Stat icon="Star" tone="teal" label="Best subject" value={best.halfYearly} suffix=" /100" foot={`${subjects[best.subject].name} · Grade A1`} />
        </Card>
        <Card>
          <Stat icon="Crosshair" tone="coral" label="Needs focus" value={focus.halfYearly} suffix=" /100" foot={`${subjects[focus.subject].name} · class average ${focus.classAverage}`} />
        </Card>
      </div>

      <div className="grid grid-cols-[1.6fr_1fr] gap-[18px]">
        <Card>
          <CardHeader
            className="mb-3"
            title="Half-yearly examination · September 2026"
            right={
              <span className="flex items-center gap-1.5 text-xs text-ink-3">
                <span className="inline-block h-3 w-0.5 rounded-full bg-ink/55" /> class average
              </span>
            }
          />
          <MarksTable rows={marks} />
        </Card>
        <Card>
          <CardHeader
            className="mb-2"
            title="Progress across exams"
            right={
              <span className="flex gap-2.5 text-xs text-ink-3">
                <span className="inline-flex items-center gap-1">
                  <i className="inline-block size-2 rounded-full bg-brand-600" />
                  {child.firstName}
                </span>
                <span className="inline-flex items-center gap-1">
                  <i className="inline-block size-2 rounded-full bg-[#b9b1e6]" />
                  Class average
                </span>
              </span>
            }
          />
          <LineChart
            id="pm-progress"
            labels={examProgress.labels}
            series={[
              { values: examProgress.child, color: "#5134E8", area: true, dots: true },
              { values: examProgress.classAverage, color: "#B9B1E6", dashed: true, dots: true, width: 2.2 },
            ]}
            min={60}
            max={100}
            ticks={[60, 70, 80, 90, 100]}
            tickSuffix="%"
            width={380}
            height={210}
            padding={[12, 34, 28, 44]}
          />
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <MiniStat label="Since Unit Test 1" value="+8.3%" tone="mint" />
            <MiniStat label="Most improved" value="Maths +14" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-[18px]">
        <Card>
          <CardHeader className="mb-3" title="Class teacher's remarks" right={teacherRemark.teacher} />
          <div className="flex items-start gap-3">
            <Avatar src={teacherRemark.avatar} size={40} />
            <p className="font-serif text-[15.5px] leading-relaxed text-ink-2">“{teacherRemark.text}”</p>
          </div>
        </Card>
        <section className="rounded-2xl bg-ai p-5 text-[#e6e2ff] shadow-card">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[11.5px] font-bold tracking-[0.04em] text-marigold-300 uppercase">
              <Icon name="Sparkles" className="size-3.5" /> Bhavi&apos;s summary
            </span>
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs font-semibold text-white">EN · हिं</span>
          </div>
          <p className="mt-2.5 text-sm leading-relaxed">{bhaviMarksSummary}</p>
          <div className="mt-3 flex gap-2">
            <Button size="xs" variant="marigold" icon="Bell">
              Set a daily reading reminder
            </Button>
            <Button size="xs" variant="glass" href="/dashboard/parent/ask">
              Ask a follow-up
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
