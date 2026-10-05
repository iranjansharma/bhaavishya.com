import type { ReactNode } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { Histogram } from "@/components/charts";
import type { ScheduleItem, Submission } from "@/lib/demo-data";
import type { Grade } from "@/lib/grades";
import { cn } from "@/lib/utils";

/* Teacher-section blocks shared by the desktop and mobile versions. */

/** Today's classes as a vertical timeline. */
export function ScheduleTimeline({ items }: { items: ScheduleItem[] }) {
  return (
    <ol className="relative pl-6 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-0.5 before:bg-line-2">
      {items.map((item) => (
        <li key={item.time} className="relative py-1.5">
          <span
            className={cn(
              "absolute top-3 -left-[22px] size-3 rounded-full border-[2.5px]",
              item.status === "done" && "border-mint-500 bg-mint-500",
              item.status === "now" && "border-mint-500 bg-mint-500 ring-4 ring-mint-100",
              item.status === "next" && "border-ink-4 bg-white",
            )}
          />
          <div className="flex items-center gap-3">
            <span className="w-10 shrink-0 text-xs font-semibold text-ink-3 tabular-nums">{item.time}</span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13.5px] font-semibold">{item.title}</div>
              <div className="truncate text-xs text-ink-3">{item.note}</div>
            </div>
            {item.status === "now" ? <Pill tone="mint">Next</Pill> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

const GRADE_COLOURS: Record<Grade, string> = {
  A1: "#12B886",
  A2: "#12B886",
  B1: "#6C4DFF",
  B2: "#6C4DFF",
  C1: "#FFB020",
  C2: "#FFB020",
  D: "#EF4E5A",
  E: "#EF4E5A",
};

/** How many students got each grade. */
export function GradeDistribution({ distribution, height = 120 }: { distribution: Array<{ grade: Grade; count: number }>; height?: number }) {
  return <Histogram height={height} items={distribution.map((d) => ({ label: d.grade, value: d.count, color: GRADE_COLOURS[d.grade] }))} />;
}

const PAPER: Record<Submission["paper"], string> = {
  kraft: "bg-[radial-gradient(120%_90%_at_30%_20%,#ddb88e,#b98c5f_75%)]",
  grey: "bg-[radial-gradient(120%_90%_at_30%_20%,#eceae5,#cbc6bc_75%)]",
  blue: "bg-[radial-gradient(120%_90%_at_30%_20%,#9db7c9,#6f8da3_75%)]",
};

const STATUS: Record<Submission["status"], { label: string; tone: "mint" | "marigold" | "coral" | "brand"; icon?: "Check" | "Star" | "TriangleAlert" }> = {
  checked: { label: "Checked", tone: "mint", icon: "Check" },
  great: { label: "Great work", tone: "marigold", icon: "Star" },
  flag: { label: "Q1 needs a look", tone: "coral", icon: "TriangleAlert" },
  new: { label: "New", tone: "brand" },
};

/**
 * A homework photo. The demo draws a notebook page; in the real app this is the photo
 * the student uploaded (an <img> from your file storage).
 */
export function SubmissionCard({ submission }: { submission: Submission }) {
  const status = STATUS[submission.status];
  return (
    <figure className="flex min-w-0 flex-col gap-2">
      <div className={cn("relative h-[150px] overflow-hidden rounded-xl", PAPER[submission.paper])}>
        <div
          className="notebook absolute inset-x-3.5 top-2.5 bottom-9 overflow-hidden rounded-[3px] py-1.5 pr-2 pl-6 font-serif text-[11.3px] leading-4 text-[#1f3a8a] italic shadow-[0_10px_18px_-8px_rgb(40_20_0/0.5)] before:absolute before:top-0 before:bottom-0 before:left-[17px] before:w-[1.5px] before:bg-[#f0a0a0]"
          style={{ transform: `rotate(${submission.tilt}deg)` }}
        >
          {submission.lines.map((line, i) => (
            <div key={i} className={cn("relative", submission.status === "flag" && i === 0 && "text-coral-700 line-through decoration-coral-700")}>
              {line}
            </div>
          ))}
          {submission.stamp ? <span className="absolute right-2 bottom-1.5 -rotate-6 font-serif text-[15px] font-bold text-[#c0262d] italic">{submission.stamp}</span> : null}
        </div>
        <span className="absolute bottom-2 left-2">
          <Pill tone={status.tone} icon={status.icon} className="shadow-[0_2px_6px_rgb(0_0_0/0.18)]">
            {status.label}
          </Pill>
        </span>
      </div>
      <figcaption className="flex min-w-0 items-center gap-1.5">
        <Avatar src={submission.avatar} size={24} />
        <div className="min-w-0">
          <div className="truncate text-xs font-semibold">{submission.student}</div>
          <div className="text-[11px] text-ink-3">{submission.time} · 1 photo</div>
        </div>
      </figcaption>
    </figure>
  );
}

/** Thumbnail of an attached worksheet PDF (demo drawing). */
export function WorksheetThumb() {
  return (
    <div className="h-full overflow-hidden rounded-md bg-white px-2.5 py-2 text-[9.5px] text-ink-2 shadow-[0_8px_18px_-8px_rgb(25_23_44/0.35)]">
      <div className="text-[7.5px] font-bold tracking-[0.08em] text-ink-3">GREENFIELD · CLASS 7 · MATHS</div>
      <div className="mt-0.5 mb-1 font-serif text-xs font-semibold whitespace-nowrap text-ink">Decimals · Set 6</div>
      <ol className="flex list-decimal flex-col gap-1 pl-3.5">
        <li>0.25 + 0.6 = ______</li>
        <li>3.4 − 1.75 = ______</li>
        <li>0.3 × 0.2 = ______</li>
      </ol>
    </div>
  );
}

/** An attachment on a homework post: a thumbnail with the file name on top. */
export function AttachmentTile({ label, icon, children, className }: { label: string; icon: "FileText" | "Camera"; children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative h-[140px] overflow-hidden rounded-xl border border-line bg-[#f4f2f9] p-2.5 pb-10", className)}>
      {children}
      <span className="absolute bottom-2.5 left-2.5 inline-flex max-w-[calc(100%-20px)] items-center gap-1 truncate rounded-full bg-night-900 px-2 py-0.5 text-[11px] font-semibold text-white">
        <Icon name={icon} className="size-3 shrink-0" />
        <span className="truncate">{label}</span>
      </span>
    </div>
  );
}

/** Thumbnail of a photo of the blackboard (demo drawing). */
export function BoardThumb() {
  return (
    <div className="h-full overflow-hidden rounded-md border-[6px] border-[#8b5a2b] bg-[radial-gradient(90%_80%_at_40%_30%,#2e5a4c,#1f3f35)] px-2.5 py-1 font-serif text-[11px] leading-[1.38] text-[#f3f0e6] italic shadow-[0_8px_18px_-8px_rgb(25_23_44/0.45)]">
      <div className="text-[13px] underline decoration-[#f3f0e6]/60 underline-offset-[3px]">Decimals</div>
      <div>0.25 + 0.6</div>
      <div>= 0.25 + 0.60</div>
      <div>= 0.85 ✓</div>
    </div>
  );
}
