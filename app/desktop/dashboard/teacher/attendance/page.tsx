import type { Metadata } from "next";
import { AttendanceMarker } from "@/components/blocks/AttendanceMarker";
import { T } from "@/components/i18n/language";
import { Segmented } from "@/components/ui/Segmented";
import { classStudents, demoDate } from "@/lib/demo-data";
import { PageHeader } from "../../../_components/PageHeader";

export const metadata: Metadata = { title: "Attendance" };

/** DESKTOP · Mark attendance (/dashboard/teacher/attendance) */
export default function TeacherAttendancePage() {
  return (
    <>
      <PageHeader
        title={<T k="nav.attendance" />}
        subtitle={`Class 7-B · ${demoDate.long} · Period 1 (8:00 AM) · ${classStudents.length} students`}
        actions={<Segmented options={["7-B", "7-A", "8-A", "6-C"]} defaultValue="7-B" />}
      />
      <AttendanceMarker students={classStudents} layout="grid" />
    </>
  );
}
