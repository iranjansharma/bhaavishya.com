import type { Metadata } from "next";
import { AttendanceCalendar, CalendarLegend, DateList } from "@/components/blocks/parent";
import { Ring } from "@/components/charts";
import { T } from "@/components/i18n/language";
import { Button } from "@/components/ui/Button";
import { MiniStat } from "@/components/ui/bits";
import { Card, CardHeader } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { Progress } from "@/components/ui/Progress";
import { attendanceMonth, childAttendance, kids, school, upcomingDates } from "@/lib/demo-data";
import { PageHeader } from "../../../_components/PageHeader";

export const metadata: Metadata = { title: "Attendance & holidays" };

/** DESKTOP · Attendance & holidays (/dashboard/parent/attendance) */
export default function ParentAttendancePage() {
  const child = kids[0];
  const m = attendanceMonth;
  return (
    <>
      <PageHeader
        title={<T k="nav.attendanceHolidays" />}
        subtitle={`${child.name} · Class ${child.className} · Academic year ${school.year}`}
        actions={
          <>
            <Pill tone="mint" icon="CircleCheck">
              Today: present · 8:06 AM
            </Pill>
            <Button href="/dashboard/parent/leave" icon="CalendarPlus">
              Apply for leave
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-[1.75fr_1fr] gap-[18px]">
        <Card>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <button type="button" aria-label="Previous month" className="grid size-8 place-items-center rounded-[10px] border border-line-2 bg-white">
                <Icon name="ChevronLeft" className="size-4" />
              </button>
              <h3 className="text-[17px] font-semibold">{m.title}</h3>
              <button type="button" aria-label="Next month" className="grid size-8 place-items-center rounded-[10px] border border-line-2 bg-white">
                <Icon name="ChevronRight" className="size-4" />
              </button>
            </div>
            <CalendarLegend />
          </div>
          <AttendanceCalendar days={m.days} />
        </Card>

        <div className="flex flex-col gap-[18px]">
          <Card>
            <CardHeader className="mb-3" title="September" right={`${m.schoolDays} school days`} />
            <div className="flex items-center gap-4">
              <Ring
                size={104}
                stroke={12}
                parts={[
                  { value: (m.present - m.late) * (100 / m.schoolDays), color: "#12B886" },
                  { value: m.late * (100 / m.schoolDays), color: "#FFB020" },
                  { value: m.absent * (100 / m.schoolDays), color: "#EF4E5A" },
                ]}
              >
                <div>
                  <b className="text-[21px] tracking-[-0.02em]">{m.percent}%</b>
                  <div className="text-[11px] text-ink-3">present</div>
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
          <Card>
            <CardHeader className="mb-2.5" title="This term · Apr–Oct" right={<b className="text-xl text-ink">{childAttendance.percent}%</b>} />
            <Progress value={childAttendance.percent} tone="mint" size="lg" />
            <div className="mt-2 flex justify-between text-xs text-ink-3">
              <span>
                {childAttendance.present} of {childAttendance.total} days
              </span>
              <span>Class average {childAttendance.classAverage}%</span>
            </div>
          </Card>
          <Card className="flex-1">
            <CardHeader
              className="mb-1"
              title="Upcoming holidays"
              right={
                <button type="button" className="inline-flex items-center gap-1 text-[13px] font-semibold text-brand-600">
                  <Icon name="Download" className="size-3.5" /> Holiday list
                </button>
              }
            />
            <DateList items={upcomingDates.filter((d) => d.kind === "holiday")} />
          </Card>
        </div>
      </div>
    </>
  );
}
