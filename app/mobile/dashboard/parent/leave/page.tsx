import type { Metadata } from "next";
import { LeaveForm } from "@/components/blocks/LeaveForm";
import { LeaveHistoryList } from "@/components/blocks/parent";
import { Card, CardHeader } from "@/components/ui/Card";
import { childToday, kids, leaveHistory, school } from "@/lib/demo-data";
import { PageNote } from "../../../_components/Greeting";

export const metadata: Metadata = { title: "Leave" };

/** PHONE · Leave (/dashboard/parent/leave) */
export default function ParentLeavePage() {
  const child = kids[0];
  return (
    <>
      <PageNote>Apply for {child.firstName}&apos;s leave — his class teacher is notified instantly.</PageNote>
      <LeaveForm layout="mobile" />
      <Card padding="sm">
        <CardHeader title="Leave history" right={school.year} />
        <LeaveHistoryList items={leaveHistory} teacherAvatar={childToday.classTeacher.avatar} />
      </Card>
    </>
  );
}
