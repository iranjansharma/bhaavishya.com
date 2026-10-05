import type { Metadata } from "next";
import { AttendanceCalendar, CalendarLegend, DateList } from "@/components/blocks/parent";
import { Ring } from "@/components/charts";
import { Button } from "@/components/ui/Button";
import { MiniStat } from "@/components/ui/bits";
import { Card, CardHeader } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { Progress } from "@/components/ui/Progress";
import { attendanceMonth, childAttendance, upcomingDates } from "@/lib/demo-data";

export const metadata: Metadata = { title: "Attendance & holidays" };

/** PHONE · Attendance & holidays (/dashboard/parent/attendance) */
export default function ParentAttendancePage() {
  const m = attendanceMonth;
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <Pill tone="mint" icon="CircleCheck">
          Today: present · 8:06 AM
        </Pill>
        <Button size="sm" href="/dashboard/parent/leave" icon="CalendarPlus">
          Apply for leave
        </Button>
      </div>

      <Card padding="sm">
        <div className="mb-3 flex items-center justify-between">
          <button type="button" aria-label="Previous month" className="grid size-8 place-items-center rounded-[10px] border border-line-2">
            <Icon name="ChevronLeft" className="size-4" />
          </button>
          <h2 className="text-[16px] font-semibold">{m.title}</h2>
          <button type="button" aria-label="Next month" className="grid size-8 place-items-center rounded-[10px] border border-line-2">
            <Icon name="ChevronRight" className="size-4" />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <Ring
            size={96}
            stroke={11}
            parts={[
              { value: (m.present - m.late) * (100 / m.schoolDays), color: "#12B886" },
              { value: m.late * (100 / m.schoolDays), color: "#FFB020" },
              { value: m.absent * (100 / m.schoolDays), color: "#EF4E5A" },
            ]}
          >
            <div>
              <b className="text-[19px] tracking-[-0.02em]">{m.percent}%</b>
              <div className="text-[10.5px] text-ink-3">present</div>
            </div>
          </Ring>
          <div className="grid flex-1 grid-cols-2 gap-2">
            <MiniStat label="Present" value={m.present} />
            <MiniStat label="Absent" value={m.absent} tone="coral" />
            <MiniStat label="Late" value={m.late} tone="marigold" />
            <MiniStat label="Holiday" value={m.holidays} />
          </div>
        </div>
      </Card>

      <Card padding="sm">
        <AttendanceCalendar days={m.days} compact />
        <CalendarLegend className="mt-3 justify-center" />
        <p className="mt-2 text-center text-[11.5px] text-ink-3">Exam days have a purple ring · 10–11 Sep: sick leave (approved)</p>
      </Card>

      <Card padding="sm">
        <CardHeader className="mb-2.5" title="This term · Apr–Oct" right={<b className="text-lg text-ink">{childAttendance.percent}%</b>} />
        <Progress value={childAttendance.percent} tone="mint" size="lg" />
        <div className="mt-2 flex justify-between text-xs text-ink-3">
          <span>
            {childAttendance.present} of {childAttendance.total} days
          </span>
          <span>Class avg {childAttendance.classAverage}%</span>
        </div>
      </Card>

      <Card padding="sm">
        <CardHeader
          title="Upcoming holidays"
          right={
            <button type="button" className="inline-flex items-center gap-1 text-[13px] font-semibold text-brand-600">
              <Icon name="Download" className="size-3.5" /> List
            </button>
          }
        />
        <DateList items={upcomingDates.filter((d) => d.kind === "holiday")} />
      </Card>
    </>
  );
}
