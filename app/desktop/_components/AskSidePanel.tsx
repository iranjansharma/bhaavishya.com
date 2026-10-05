import { Card, CardHeader } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import type { Role } from "@/lib/roles";

const SOURCES: Record<Role, string[]> = {
  parent: ["Aarav's attendance and marks", "Homework and class notices", "School calendar and holidays", "Fees and receipts"],
  teacher: ["Your classes and timetable", "Attendance and marks for your students", "Homework submissions", "Leave requests sent to you"],
  principal: ["Whole-school attendance", "Marks and syllabus progress", "Teacher attendance and leave", "Announcements and read rates"],
};

/** Right-hand panel on the desktop Ask Bhavi page. */
export function AskSidePanel({ role }: { role: Role }) {
  return (
    <div className="flex flex-col gap-[18px]">
      <Card>
        <CardHeader
          className="mb-3"
          title={
            <>
              <Icon name="Database" className="size-4 text-brand-600" /> What Bhavi can see
            </>
          }
        />
        <ul className="flex flex-col gap-2 text-[13px] text-ink-2">
          {SOURCES[role].map((s) => (
            <li key={s} className="flex items-start gap-2">
              <Icon name="Check" className="mt-0.5 size-4 text-mint-500" />
              {s}
            </li>
          ))}
        </ul>
      </Card>
      <Card>
        <CardHeader
          className="mb-3"
          title={
            <>
              <Icon name="ShieldCheck" className="size-4 text-mint-500" /> Private by design
            </>
          }
        />
        <ul className="flex flex-col gap-2.5 text-[12.5px] leading-snug text-ink-2">
          <li>Bhavi only reads what your role is allowed to see.</li>
          <li>Parents only ever get answers about their own child.</li>
          <li>Nothing is sent to parents until a person approves it.</li>
        </ul>
      </Card>
    </div>
  );
}
