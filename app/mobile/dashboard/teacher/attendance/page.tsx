import type { Metadata } from "next";
import { AttendanceMarker } from "@/components/blocks/AttendanceMarker";
import { Segmented } from "@/components/ui/Segmented";
import { classStudents, demoDate } from "@/lib/demo-data";
import { PageNote } from "../../../_components/Greeting";

export const metadata: Metadata = { title: "Attendance" };

/** PHONE · Mark attendance (/dashboard/teacher/attendance) */
export default function TeacherAttendancePage() {
  return (
    <>
      <PageNote>
        {demoDate.short} · Period 1 (8:00 AM) · {classStudents.length} students. Everyone starts as present — tap the few who aren&apos;t.
      </PageNote>
      <div className="no-scrollbar -mx-4 overflow-x-auto px-4">
        <Segmented options={["7-B", "7-A", "8-A", "6-C"]} defaultValue="7-B" />
      </div>
      <AttendanceMarker students={classStudents} layout="list" />
    </>
  );
}
