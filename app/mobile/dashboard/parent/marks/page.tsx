import type { Metadata } from "next";
import { MarksList } from "@/components/blocks/parent";
import { LineChart, Sparkline } from "@/components/charts";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { MiniStat } from "@/components/ui/bits";
import { Card, CardHeader } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { Segmented } from "@/components/ui/Segmented";
import { bhaviMarksSummary, childResult, examProgress, exams, kids, marks, school, teacherRemark } from "@/lib/demo-data";
import { PageNote } from "../../../_components/Greeting";

export const metadata: Metadata = { title: "Marks & report card" };

/** PHONE · Marks & report card (/dashboard/parent/marks) */
export default function ParentMarksPage() {
  const child = kids[0];
  return (
    <>
      <PageNote>
        {child.name} · Class {child.className} · {school.year}
      </PageNote>
      <div className="no-scrollbar -mx-4 overflow-x-auto px-4">
        <Segmented options={exams} defaultValue="Half-yearly" />
      </div>

      <Card padding="sm">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-semibold text-ink-3">Overall · {childResult.exam}</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-[34px] leading-none font-bold tracking-[-0.03em]">{childResult.percent}%</span>
              <Pill tone="mint">Grade {childResult.grade}</Pill>
            </div>
            <div className="mt-1.5 text-xs font-semibold text-mint-700">▲ {childResult.change}% vs Unit Test 2</div>
          </div>
          <Sparkline id="mm-trend" values={childResult.trend} color="#5134E8" width={90} height={36} />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <MiniStat label="In his class" value={childResult.rankNote} note={`Class of ${childResult.classSize}`} />
          <MiniStat label="Total" value={`${childResult.total}/${childResult.max}`} note={`Class avg ${childResult.classAverage}%`} />
        </div>
      </Card>

      <Card padding="sm">
        <CardHeader title="Subjects" right={<span className="text-xs text-ink-3">▏ = class average</span>} />
        <MarksList rows={marks} />
      </Card>

      <Card padding="sm">
        <CardHeader className="mb-1" title="Progress across exams" />
        <LineChart
          id="mm-progress"
          labels={["UT-1", "UT-2", "Half-yearly"]}
          series={[
            { values: examProgress.child, color: "#5134E8", area: true, dots: true },
            { values: examProgress.classAverage, color: "#B9B1E6", dashed: true, dots: true, width: 2.2 },
          ]}
          min={60}
          max={100}
          ticks={[60, 80, 100]}
          tickSuffix="%"
          width={340}
          height={180}
          padding={[12, 26, 26, 40]}
        />
        <div className="mt-1 flex justify-center gap-4 text-xs text-ink-3">
          <span className="inline-flex items-center gap-1">
            <i className="inline-block size-2 rounded-full bg-brand-600" /> {child.firstName}
          </span>
          <span className="inline-flex items-center gap-1">
            <i className="inline-block size-2 rounded-full bg-[#b9b1e6]" /> Class average
          </span>
        </div>
      </Card>

      <section className="rounded-2xl bg-ai p-4 text-[#e6e2ff] shadow-card">
        <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.04em] text-marigold-300 uppercase">
          <Icon name="Sparkles" className="size-3.5" /> Bhavi&apos;s summary
        </div>
        <p className="mt-2 text-[13.5px] leading-relaxed">{bhaviMarksSummary}</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button size="sm" variant="marigold" icon="Bell">
            Daily reminder
          </Button>
          <Button size="sm" variant="glass" href="/dashboard/parent/ask">
            Ask a follow-up
          </Button>
        </div>
      </section>

      <Card padding="sm">
        <CardHeader className="mb-2.5" title="Class teacher's remarks" />
        <div className="flex items-start gap-3">
          <Avatar src={teacherRemark.avatar} size={36} />
          <p className="font-serif text-[15px] leading-relaxed text-ink-2">“{teacherRemark.text}”</p>
        </div>
      </Card>

      <Button variant="secondary" size="lg" icon="Download" full>
        Download report card (PDF)
      </Button>
    </>
  );
}
