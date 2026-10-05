import type { Metadata } from "next";
import { Gradebook } from "@/components/blocks/Gradebook";
import { ActionButton } from "@/components/blocks/interactive";
import { GradeDistribution } from "@/components/blocks/teacher";
import { T } from "@/components/i18n/language";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Kicker, MiniStat } from "@/components/ui/bits";
import { Card, CardHeader } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { classStudents, mathsGradebook, mathsSummary } from "@/lib/demo-data";
import { PageHeader } from "../../../_components/PageHeader";

export const metadata: Metadata = { title: "Gradebook" };

/** DESKTOP · Gradebook (/dashboard/teacher/gradebook) */
export default function TeacherGradebookPage() {
  return (
    <>
      <PageHeader
        title={<T k="nav.gradebook" />}
        subtitle="Half-yearly examination · Mathematics · Class 7-B · Theory /80 + Internal /20"
        actions={
          <>
            <Pill tone="grey" icon="Cloud">
              Auto-saved 10:42 AM
            </Pill>
            <Button variant="secondary">Save draft</Button>
            <ActionButton label="Publish to parents" doneLabel="Published" icon="Send" size="md" />
          </>
        }
      />
      <div className="grid grid-cols-[minmax(0,1.85fr)_minmax(0,1fr)] items-start gap-[18px]">
        <Card padding="sm">
          <Gradebook rows={mathsGradebook} layout="table" />
        </Card>
        <div className="flex flex-col gap-[18px]">
          <Card>
            <CardHeader className="mb-3" title="Class summary" right={`${classStudents.length} students`} />
            <div className="grid grid-cols-2 gap-2">
              <MiniStat label="Average" value={mathsSummary.average} />
              <MiniStat label="Pass rate" value={`${mathsSummary.passRate}%`} tone="mint" />
              <MiniStat label="Highest" value={mathsSummary.highest.marks} note={mathsSummary.highest.name} />
              <MiniStat label="Lowest" value={mathsSummary.lowest} tone="coral" note="1 student" />
            </div>
            <Kicker className="mt-4 mb-1">Grade distribution</Kicker>
            <GradeDistribution distribution={mathsSummary.distribution} />
          </Card>
          <section className="rounded-2xl bg-ai p-5 text-[#e6e2ff] shadow-card">
            <div className="flex items-center gap-1.5 text-[11.5px] font-bold tracking-[0.04em] text-marigold-300 uppercase">
              <Icon name="Sparkles" className="size-3.5" /> Bhavi noticed
            </div>
            <p className="mt-2 text-[13.5px] leading-relaxed">
              {mathsSummary.atRisk.length} students scored 50 or below — most lost marks on <b className="text-white">fractions and decimals</b> (Q 7–12). I&apos;ve
              drafted a remark for each.
            </p>
            <div className="mt-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
              <div className="flex items-center gap-2">
                <Avatar src="/avatars/ishaan-verma.svg" size={26} />
                <b className="text-[13px] text-white">Ishaan Verma · 44</b>
                <span className="ml-auto rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-semibold text-marigold-300">✦ Draft</span>
              </div>
              <p className="mt-1.5 text-[12.5px] leading-normal text-[#d8d2ff]">
                “Ishaan understands the concepts but loses marks on fractions. Ten practice sums a day will help.”
              </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <ActionButton label="Create remedial group" doneLabel="Group created" variant="marigold" icon="Users" />
              <Button size="sm" variant="glass">
                Review all remarks
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
